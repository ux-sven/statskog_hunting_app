import { useSyncExternalStore } from 'react';
import { createClients, usingFakeInatur } from '../api/config';
import { ApiError, NetworkError } from '../api/inatur/client';
import type { InaturUser, OrganicSalesPagePreview } from '../api/inatur/types';
import type { SubareaFeature } from '../api/jaktdatabasen/types';
import { network } from '../api/fake/network';
import { addDays, isoDay, startOfDay } from '../domain/format';
import type { Activation, ActivationSlot, Cabin, CaptureReport, HuntStatus, HuntingLicense, Offer } from '../domain/license';
import { applyLocal, emptyFilter, filterSpecies, type OfferFilter } from '../domain/filter';
import type { SpeciesGroup, SpeciesId } from '../domain/species';
import { toActivation, toCabin, toFishingLicense, toLicense, toOffer } from './adapters';

export type ThemeMode = 'light' | 'dark' | 'system';
export type LoadState = 'idle' | 'loading' | 'ready' | 'error';

/** Brukerens valg i onboarding og innstillinger. Lagres på telefonen. */
interface Settings {
  themeMode: ThemeMode;
  showOffersTab: boolean;
  showHuntingTab: boolean;
  showFishingTab: boolean;
  onboardingDone: boolean;
}

/** Offline-kopi av data fra Inatur og Jaktdatabasen. */
interface Cache {
  user?: InaturUser;
  offers: Offer[];
  cabins: Cabin[];
  subareas: SubareaFeature[];
  licenses: HuntingLicense[];
  fishing: HuntingLicense[];
  activations: Activation[];
  reports: CaptureReport[];
  syncedAt?: string;
}

/** Nedlastet offline kartområde. */
export interface OfflineArea {
  id: string;
  name: string;
  salesPageId?: string;
  center: [number, number];
  sizeMb: number;
  downloadedAt: string;
}

const KEYS = { settings: 'jf.settings', token: 'jf.auth', cache: 'jf.cache.v1', outbox: 'jf.outbox', areas: 'jf.offline-areas' };

const read = <T,>(key: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v, (k, val) => (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(val) && k !== 'syncedAt' && k !== 'downloadedAt' ? new Date(val) : val)) as T) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key: string, value: unknown) => {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* privat modus o.l. */
  }
};

export const errorMessage = (e: unknown) =>
  e instanceof NetworkError
    ? 'Du er uten dekning. Prøv igjen når du har nett.'
    : e instanceof ApiError
      ? e.status === 401
        ? 'Du må logge inn på nytt.'
        : e.message
      : 'Noe gikk galt. Prøv igjen.';

/**
 * Appens tilstand og datalag. Skjermene leser herfra og kaller metodene;
 * butikken snakker med Inatur og Jaktdatabasen, mellomlagrer for bruk uten
 * nett og sender fangstrapporter som venter når nettet er tilbake.
 */
export class AppStore {
  settings: Settings = read(KEYS.settings, {
    themeMode: 'light',
    showOffersTab: true,
    showHuntingTab: true,
    showFishingTab: true,
    onboardingDone: false,
  });
  token: string | null = read<string | null>(KEYS.token, null);
  cache: Cache = read<Cache>(KEYS.cache, { offers: [], cabins: [], subareas: [], licenses: [], fishing: [], activations: [], reports: [] });
  outbox: CaptureReport[] = read<CaptureReport[]>(KEYS.outbox, []);
  offlineAreas: OfflineArea[] = read<OfflineArea[]>(KEYS.areas, []);

  filter: OfferFilter = emptyFilter();
  search = '';
  offerResult: Offer[] = [];
  offersState: LoadState = 'idle';
  mineState: LoadState = 'idle';
  error: string | null = null;
  online = network.isOnline();
  readonly fake = usingFakeInatur;

  private clients = createClients(() => this.token);
  private version = 0;
  private listeners = new Set<() => void>();
  private offerRequest = 0;

  constructor() {
    const onNet = () => {
      const was = this.online;
      this.online = network.isOnline();
      if (!was && this.online) void this.sync();
      this.notify();
    };
    network.subscribe(onNet);
    if (typeof window !== 'undefined') {
      window.addEventListener('online', onNet);
      window.addEventListener('offline', onNet);
      setInterval(() => this.outbox.length && this.online && void this.flushOutbox(), 30000);
    }
  }

  // ---------- Abonnement (React) ----------
  subscribe = (fn: () => void) => {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  };
  getVersion = () => this.version;
  private notify() {
    this.version++;
    this.listeners.forEach((l) => l());
  }
  private saveCache() {
    write(KEYS.cache, this.cache);
  }

  // ---------- Innstillinger ----------
  updateSettings(patch: Partial<Settings>) {
    this.settings = { ...this.settings, ...patch };
    write(KEYS.settings, this.settings);
    this.notify();
  }
  setThemeMode(m: ThemeMode) {
    this.updateSettings({ themeMode: m });
  }

  // ---------- Innlogging ----------
  get loggedIn() {
    return !!this.token;
  }
  get user() {
    return this.cache.user;
  }

  async login(username: string, password: string) {
    const res = await this.clients.inatur.login(username, password);
    this.token = res.access_token;
    write(KEYS.token, this.token);
    this.notify();
    await this.refreshMine();
  }

  logout() {
    this.token = null;
    write(KEYS.token, null);
    this.cache = { ...this.cache, user: undefined, licenses: [], fishing: [], activations: [], reports: this.cache.reports };
    this.saveCache();
    this.notify();
  }

  /** Lagrer interessene fra onboarding på Inatur-brukeren (hvis innlogget) og i menyen. */
  async setInterests(i: { hunting: boolean; fishing: boolean; offers: boolean }) {
    this.updateSettings({ showHuntingTab: i.hunting, showFishingTab: i.fishing, showOffersTab: i.offers });
    const u = this.cache.user;
    if (u && this.online) {
      try {
        this.cache.user = await this.clients.inatur.updateInterests(u, { ...u.interests, smallGame: i.hunting, otherFishing: i.fishing });
        this.saveCache();
      } catch {
        /* ikke kritisk */
      }
    }
  }

  // ---------- Oppstart og synk ----------
  /** Henter alt som trengs ved oppstart. Bruker offline-kopien hvis det mangler nett. */
  async start() {
    await Promise.all([this.loadMapData(), this.loadOffers()]);
    if (this.loggedIn) await this.refreshMine();
    void this.flushOutbox();
  }

  /** Oppdaterer alt (dra ned / «Prøv igjen» / når nettet kommer tilbake). */
  async sync() {
    await Promise.all([this.loadMapData(), this.loadOffers(), this.loggedIn ? this.refreshMine() : Promise.resolve()]);
    await this.flushOutbox();
  }

  get syncedAt() {
    return this.cache.syncedAt ? new Date(this.cache.syncedAt) : undefined;
  }

  // ---------- Kart og tilbud ----------
  /** Alle tilbud og hytter med posisjon (til kartet), og delområdene fra Jaktdatabasen. */
  async loadMapData() {
    try {
      const [pages, subareas, cabinPoints, offerPoints] = await Promise.all([
        this.clients.inatur.salesPages({}),
        this.clients.jaktdb.subareas(),
        this.clients.jaktdb.points(2),
        this.clients.jaktdb.points(3),
      ]);
      const loc = new Map([...cabinPoints.features, ...offerPoints.features].map((f) => [f.properties.salesPageId, f.geometry.coordinates]));
      this.cache.offers = pages.items.filter((p): p is OrganicSalesPagePreview => p.type === 'organicSalesPagePreview').map((p) => toOffer(p, loc.get(p.id)));
      this.cache.cabins = pages.items.flatMap((p) => (p.type === 'cabinSalesPagePreview' ? [toCabin(p, loc.get(p.id))] : []));
      this.cache.subareas = subareas.features;
      this.saveCache();
    } catch (e) {
      if (!(e instanceof NetworkError)) this.error = errorMessage(e);
    }
    this.notify();
  }

  get offers() {
    return this.cache.offers;
  }
  get cabins() {
    return this.cache.cabins;
  }
  offerById(id?: string) {
    return this.cache.offers.find((o) => o.id === id);
  }
  subareasFor(salesPageId?: string) {
    return this.cache.subareas.filter((f) => !salesPageId || f.properties.salesPageId === salesPageId);
  }

  setFilter(f: OfferFilter) {
    this.filter = f;
    void this.loadOffers();
  }
  setSearch(s: string) {
    this.search = s;
    void this.loadOffers();
  }

  /** Søk i tilbud hos Inatur med filteret. Uten nett: filtrer offline-kopien. */
  async loadOffers() {
    const f = this.filter;
    const id = ++this.offerRequest;
    this.offersState = 'loading';
    this.notify();
    const category = f.group === 'fish' ? 'freshwaterFishing' : 'smallGame';
    try {
      const res = await Promise.all(
        (f.group === 'fish' ? ['freshwaterFishing'] : ['smallGame', 'bigGame']).map((c) =>
          this.clients.inatur.salesPages({
            category: c as typeof category,
            searchTerm: this.search || undefined,
            species: filterSpecies(f),
            county: f.counties,
            municipality: f.municipalities,
            fromDate: f.from,
            toDate: f.to,
            includeExpiredOffers: f.includeExpired || undefined,
          }),
        ),
      );
      if (id !== this.offerRequest) return;
      const loc = new Map(this.cache.offers.map((o) => [o.id, o.location]));
      const items = res.flatMap((r) => r.items).filter((p): p is OrganicSalesPagePreview => p.type === 'organicSalesPagePreview');
      this.offerResult = applyLocal(items.map((p) => toOffer(p, loc.get(p.id))), f);
      this.offersState = 'ready';
    } catch (e) {
      if (id !== this.offerRequest) return;
      // Uten nett: samme filter på offline-kopien.
      this.offerResult = this.filterLocal(f, this.search);
      this.offersState = e instanceof NetworkError ? 'ready' : 'error';
      if (!(e instanceof NetworkError)) this.error = errorMessage(e);
    }
    this.notify();
  }

  /** Filtrerer offline-kopien (uten nett, og for antall treff i filteret). */
  filterLocal(f: OfferFilter, search = '') {
    const q = search.trim().toLowerCase();
    const species = filterSpecies(f);
    return applyLocal(
      this.cache.offers.filter(
        (o) =>
          o.group === f.group &&
          (!q || `${o.title} ${o.counties.join(' ')} ${o.municipalities.join(' ')} ${o.speciesText}`.toLowerCase().includes(q)) &&
          (!species.length || o.speciesIds.some((s) => species.includes(s))) &&
          (!f.counties.length || o.counties.some((c) => f.counties.includes(c))) &&
          (!f.municipalities.length || o.municipalities.some((m) => f.municipalities.includes(m))),
      ),
      f,
    );
  }

  /** Søk etter tilbud i begge grupper (søkeresultatet i Figma «Search Results»). */
  searchAll(term: string): { game: Offer[]; fish: Offer[] } {
    const q = term.trim().toLowerCase();
    const hit = (o: Offer) => `${o.title} ${o.counties.join(' ')} ${o.municipalities.join(' ')} ${o.speciesText}`.toLowerCase().includes(q);
    const all = this.cache.offers.filter(hit);
    return { game: all.filter((o) => o.group === 'game'), fish: all.filter((o) => o.group === 'fish') };
  }

  // ---------- Mine kort ----------
  /** Henter bruker, kort, fiskekort og aktiveringer fra Inatur. */
  async refreshMine() {
    if (!this.token) return;
    this.mineState = 'loading';
    this.notify();
    try {
      const api = this.clients.inatur;
      const [user, permits, activations, fishing] = await Promise.all([api.user(), api.permits(), api.activations(), api.fishingPermits()]);
      if (!this.cache.subareas.length) this.cache.subareas = (await this.clients.jaktdb.subareas()).features;
      const subs = new Map(this.cache.subareas.map((f) => [f.properties.subareaId, f]));
      this.cache.user = user;
      this.cache.licenses = permits.items.map((p) => toLicense(p, user, this.offerById(p.salesPage.id)));
      this.cache.fishing = fishing.items.map((f) => toFishingLicense(f, user, this.offerById(f.salesPage.id)));
      this.cache.activations = activations.items.map((a) => toActivation(a, subs));
      this.cache.syncedAt = new Date().toISOString();
      this.saveCache();
      this.mineState = 'ready';
      this.error = null;
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) this.logout();
      // Uten nett: vis offline-kopien.
      this.mineState = this.cache.licenses.length || e instanceof NetworkError ? 'ready' : 'error';
      if (!(e instanceof NetworkError)) this.error = errorMessage(e);
    }
    this.notify();
  }

  licenses(group: SpeciesGroup) {
    const list = group === 'game' ? this.cache.licenses : this.cache.fishing;
    const today = startOfDay(new Date()).getTime();
    // Aktivert i dag gir grønn dato og «Rapporter fangst» på kortet.
    return list.map((l) => {
      const act = this.cache.activations.find((a) => a.permitId === l.id && a.date.getTime() === today);
      return act ? { ...l, activatedDate: act.date } : l;
    });
  }
  activations() {
    return [...this.cache.activations].sort((a, b) => b.date.getTime() - a.date.getTime());
  }
  licenseById(id: string) {
    return [...this.cache.licenses, ...this.cache.fishing].find((l) => l.id === id);
  }

  /** Kapasitet per dag i et delområde, ti dager frem (dagvelgeren). */
  async activationSlots(license: HuntingLicense, subareaId: string, days = 10): Promise<ActivationSlot[]> {
    const from = startOfDay(new Date());
    const to = addDays(from, days - 1);
    const valid = (d: Date) => {
      const v = license.validDates;
      if (license.cardType === 'dagskort') return v.some((x) => x.getTime() === d.getTime());
      return d >= v[0] && d <= v[v.length - 1];
    };
    const mine = new Set(this.cache.activations.filter((a) => a.permitId === license.id).map((a) => a.date.getTime()));
    let counts: Map<string, number>;
    try {
      const res = await this.clients.inatur.activationCounts(license.salesPageId ?? '', [subareaId], isoDay(from), isoDay(to));
      counts = new Map(res.items.map((i) => [i.date, i.count]));
    } catch {
      counts = new Map();
    }
    return Array.from({ length: days }, (_, i) => {
      const date = addDays(from, i);
      return { date, used: counts.get(isoDay(date)) ?? 0, capacity: 10, available: valid(date) && !mine.has(date.getTime()) };
    });
  }

  /** Jakttrykk: antall aktiveringer per delområde en gitt dag. */
  async pressure(salesPageId: string, subareaIds: string[], date: Date) {
    try {
      const res = await this.clients.inatur.activationCounts(salesPageId, subareaIds, isoDay(date), isoDay(date));
      return new Map(res.items.map((i) => [i.subareaId, i.count]));
    } catch {
      return new Map<string, number>();
    }
  }

  /** Aktiverer et jaktkort for valgte dager i et delområde. Krever nett. */
  async activate(license: HuntingLicense, subareaId: string, days: Date[]) {
    for (const d of days) await this.clients.inatur.activate(license.id, subareaId, isoDay(d));
    await this.refreshMine();
  }

  async removeActivation(a: Activation) {
    await this.clients.inatur.removeActivation(a.id);
    await this.refreshMine();
  }

  // ---------- Fangstrapport ----------
  /** Aktiveringer fra i dag og bakover som ikke er rapportert. */
  toReport() {
    const today = startOfDay(new Date()).getTime();
    return this.activations().filter((a) => a.date.getTime() <= today && !this.isReported(a.id));
  }
  isReported(activationId: string) {
    return [...this.cache.reports, ...this.outbox].some((r) => r.activationId === activationId);
  }
  reports() {
    return [...this.outbox, ...this.cache.reports].sort((a, b) => b.date.getTime() - a.date.getTime());
  }
  get pendingReports() {
    return this.outbox.length;
  }

  /** Lagrer rapporten på telefonen og sender den til Jaktdatabasen når det er nett. */
  async submitReport(r: { permitId: string; activationId?: string; licenseTitle: string; subareaName?: string; date: Date; status: HuntStatus; catches: Partial<Record<SpeciesId, number>> }) {
    const report: CaptureReport = { ...r, id: crypto.randomUUID(), createdAt: new Date(), synced: false };
    this.outbox = [...this.outbox, report];
    write(KEYS.outbox, this.outbox);
    this.notify();
    await this.flushOutbox();
    return this.outbox.every((x) => x.id !== report.id);
  }

  private flushing = false;
  async flushOutbox() {
    if (this.flushing || !this.outbox.length) return;
    this.flushing = true;
    try {
      const batch = [...this.outbox];
      const res = await this.clients.jaktdb.addCatchReports(
        batch.map((r) => ({
          clientId: r.id,
          permitId: r.permitId,
          activationId: r.activationId,
          date: isoDay(r.date),
          status: r.status,
          catches: Object.entries(r.catches).filter(([, n]) => n).map(([species, count]) => ({ species, count: count! })),
          createdAt: r.createdAt.toISOString(),
        })),
      );
      const ok = new Set(batch.filter((_, i) => res.addResults[i]?.success).map((r) => r.id));
      this.cache.reports = [...batch.filter((r) => ok.has(r.id)).map((r) => ({ ...r, synced: true })), ...this.cache.reports];
      this.outbox = this.outbox.filter((r) => !ok.has(r.id));
      write(KEYS.outbox, this.outbox);
      this.saveCache();
    } catch {
      /* prøver igjen senere */
    } finally {
      this.flushing = false;
      this.notify();
    }
  }

  // ---------- Offline kart ----------
  /** Simulerer nedlasting av et kartområde (ArcGIS offline map area i appen). */
  async downloadArea(name: string, center: [number, number], salesPageId?: string) {
    if (!this.online) throw new NetworkError();
    await new Promise((r) => setTimeout(r, 1200));
    const area: OfflineArea = { id: crypto.randomUUID(), name, center, salesPageId, sizeMb: Math.round(40 + Math.random() * 80), downloadedAt: new Date().toISOString() };
    this.offlineAreas = [...this.offlineAreas, area];
    write(KEYS.areas, this.offlineAreas);
    this.notify();
    return area;
  }
  renameArea(id: string, name: string) {
    this.offlineAreas = this.offlineAreas.map((a) => (a.id === id ? { ...a, name } : a));
    write(KEYS.areas, this.offlineAreas);
    this.notify();
  }
  deleteArea(id: string) {
    this.offlineAreas = this.offlineAreas.filter((a) => a.id !== id);
    write(KEYS.areas, this.offlineAreas);
    this.notify();
  }
  /** Tømmer offline-kopien og køen (utviklerpanelet). */
  resetLocal() {
    this.cache = { offers: [], cabins: [], subareas: [], licenses: [], fishing: [], activations: [], reports: [] };
    this.outbox = [];
    this.offlineAreas = [];
    [KEYS.cache, KEYS.outbox, KEYS.areas].forEach((k) => write(k, null));
    this.notify();
  }
}

export const appStore = new AppStore();

/** Henter butikken og tegner komponenten på nytt når data endres. */
export function useStore(store: AppStore = appStore) {
  useSyncExternalStore(store.subscribe, store.getVersion);
  return store;
}
