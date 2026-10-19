import { useSyncExternalStore } from 'react';
import { asset } from '../components/cx';
import { addDays, startOfDay } from '../domain/format';
import type { Activation, ActivationSlot, HuntingLicense, Offer } from '../domain/license';
import { speciesById, type SpeciesGroup, type SpeciesId } from '../domain/species';
import { OfflineError, type CaptureReport, type CaptureReportRepository, type LicenseRepository, type OfferRepository } from './repositories';

export type ThemeMode = 'light' | 'dark' | 'system';

const today = () => startOfDay(new Date());

const demoOffers: Offer[] = [
  {
    id: 'o1',
    title: 'Rådyrjakt hos Statskog - Stendammen i Løten',
    group: 'game',
    county: 'Innlandet',
    municipality: 'Løten',
    speciesText: 'Rådyr',
    cardTypes: ['dagskort', 'ukeskort'],
    unavailableCardTypes: ['sesongkort'],
    priceFrom: 660,
    image: asset('images/tilbud_radyr.jpg'),
    location: [11.35, 60.82],
  },
  {
    id: 'o2',
    title: 'Skogsfugljakt hos Statskog - Børresen i Finnemarka',
    group: 'game',
    county: 'Buskerud',
    municipality: 'Lier',
    speciesText: 'Orrfugl, Tiur, Jerpe',
    cardTypes: ['dagskort', 'ukeskort'],
    unavailableCardTypes: ['sesongkort'],
    priceFrom: 365,
    image: asset('images/tilbud_skogsfugl.jpg'),
    location: [10.12, 59.83],
  },
  {
    id: 'o3',
    title: 'Småviltjakt i Hersjøen-Kråssådal utmarkslag',
    group: 'game',
    county: 'Trøndelag',
    municipality: 'Selbu',
    speciesText: 'Lirype, Fjellrype, Orrfugl, Hare',
    cardTypes: ['dagskort', 'sesongkort'],
    priceFrom: 300,
    image: asset('images/tilbud_rype.jpg'),
    location: [11.12, 63.17],
  },
  {
    id: 'o4',
    title: 'Fiskekort Malangen grunneierlag',
    group: 'fish',
    county: 'Troms',
    municipality: 'Balsfjord',
    speciesText: 'Innlandsfiske, Ørret, Røye, Sik, Harr',
    cardTypes: ['dagskort', 'ukeskort', 'aarskort'],
    priceFrom: 75,
    image: asset('images/tilbud_orret.jpg'),
    location: [19.2, 69.25],
  },
  {
    id: 'o5',
    title: 'Fiske i Femund - Statskog',
    group: 'fish',
    county: 'Innlandet',
    municipality: 'Engerdal',
    speciesText: 'Ørret, Røye, Harr, Gjedde, Abbor',
    cardTypes: ['dagskort', 'sesongkort'],
    priceFrom: 120,
    image: asset('images/tilbud_fjellvann.jpg'),
    location: [11.92, 62.2],
  },
];

/**
 * Eksempeldata og tilstand for prototypen. Implementerer de samme
 * grensesnittene som de ekte datakildene skal gjøre.
 */
export class DemoStore implements OfferRepository, LicenseRepository, CaptureReportRepository {
  themeMode: ThemeMode = 'light';
  /** Simulerer at telefonen er uten dekning (valg i Innstillinger). */
  offline = false;
  showOffersTab = true;
  showHuntingTab = true;
  showFishingTab = true;

  private version = 0;
  private listeners = new Set<() => void>();
  private reportList: CaptureReport[] = [];
  private nextId = 2;

  private licenseList: HuntingLicense[] = [
    {
      cardNumber: '1721894',
      cardType: 'sesongkort',
      title: 'Småviltjakt i Hersjøen-Kråssådal utmarkslag',
      group: 'game',
      validDates: [today(), addDays(today(), 60)],
      speciesText: 'Lirype, Fjellrype, Orrfugl, Hare',
      hunterNumber: '654321',
      holderName: 'Ola Nordmann',
      phone: '987 65 432',
      email: 'ola@eksempel.no',
      price: 1200,
    },
    {
      cardNumber: '1721950',
      cardType: 'dagskort',
      title: 'Skogsfugljakt hos Statskog - Børresen i Finnemarka',
      group: 'game',
      validDates: [3, 4, 5].map((i) => addDays(today(), i)),
      speciesText: 'Orrfugl, Tiur, Jerpe',
      hunterNumber: '654321',
      holderName: 'Ola Nordmann',
      price: 365,
    },
    {
      cardNumber: '1722001',
      cardType: 'ukeskort',
      title: 'Fiskekort Malangen grunneierlag',
      group: 'fish',
      validDates: [today(), addDays(today(), 6)],
      speciesText: 'Innlandsfiske, Ørret, Røye, Sik, Harr',
      hunterNumber: '654321',
      holderName: 'Ola Nordmann',
      price: 300,
    },
  ];

  private activationList: Activation[] = [
    {
      id: 'a1',
      licenseTitle: 'Småviltjakt i Hersjøen-Kråssådal utmarkslag',
      cardNumber: '1721894',
      county: 'Trøndelag',
      municipality: 'Selbu',
      date: addDays(today(), -1),
    },
  ];

  // ---------- Abonnement (for React) ----------

  subscribe = (fn: () => void) => {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  };
  getVersion = () => this.version;
  private notify() {
    this.version++;
    this.listeners.forEach((l) => l());
  }

  setThemeMode(m: ThemeMode) {
    this.themeMode = m;
    this.notify();
  }

  setOffline(v: boolean) {
    this.offline = v;
    // Kommer på nett: send det som venter.
    if (!v) this.reportList = this.reportList.map((r) => ({ ...r, synced: true }));
    this.notify();
  }

  setTabVisible(t: { offers?: boolean; hunting?: boolean; fishing?: boolean }) {
    this.showOffersTab = t.offers ?? this.showOffersTab;
    this.showHuntingTab = t.hunting ?? this.showHuntingTab;
    this.showFishingTab = t.fishing ?? this.showFishingTab;
    this.notify();
  }

  // ---------- Tilbud ----------

  offers(group: SpeciesGroup, { query = '', species = new Set<SpeciesId>() } = {}) {
    const q = query.trim().toLowerCase();
    return demoOffers.filter((o) => {
      if (o.group !== group) return false;
      if (q && !`${o.title} ${o.county} ${o.municipality} ${o.speciesText}`.toLowerCase().includes(q)) return false;
      if (species.size && ![...species].some((s) => o.speciesText.includes(speciesById(s).label))) return false;
      return true;
    });
  }

  allOffers() {
    return demoOffers;
  }

  // ---------- Kort og aktiveringer ----------

  licenses(group: SpeciesGroup) {
    return this.licenseList.filter((l) => l.group === group);
  }

  activations() {
    return [...this.activationList].sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  activationSlots(license: HuntingLicense): ActivationSlot[] {
    const booked = new Set(this.activationList.filter((a) => a.cardNumber === license.cardNumber).map((a) => a.date.getTime()));
    const used = [4, 2, 0, 0, 10, 6, 0, 1, 0, 3];
    return used.map((u, i) => {
      const date = addDays(today(), i);
      const mine = booked.has(date.getTime());
      return { date, used: Math.min(10, u + (mine ? 1 : 0)), capacity: 10, available: !mine };
    });
  }

  async activate(license: HuntingLicense, days: Date[]) {
    if (this.offline) throw new OfflineError('Aktivering krever nett.');
    const o = demoOffers.find((o) => o.title === license.title);
    for (const d of days) {
      this.activationList.push({
        id: `a${this.nextId++}`,
        licenseTitle: license.title,
        cardNumber: license.cardNumber,
        county: o?.county ?? 'Trøndelag',
        municipality: o?.municipality ?? 'Selbu',
        date: d,
      });
    }
    this.notify();
  }

  async removeActivation(activation: Activation) {
    if (this.offline) throw new OfflineError('Å fjerne en aktivering krever nett.');
    this.activationList = this.activationList.filter((a) => a.id !== activation.id);
    this.notify();
  }

  // ---------- Fangstrapport ----------

  reports() {
    return [...this.reportList].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  isReported(a: Activation) {
    return this.reportList.some((r) => r.activation.id === a.id);
  }

  async submit(report: Omit<CaptureReport, 'synced'>) {
    this.reportList.push({ ...report, synced: !this.offline });
    this.notify();
  }

  get pendingReports() {
    return this.reportList.filter((r) => !r.synced).length;
  }
}

export const demoStore = new DemoStore();

/** Henter butikken og tegner komponenten på nytt når data endres. */
export function useStore(store: DemoStore = demoStore) {
  useSyncExternalStore(store.subscribe, store.getVersion);
  return store;
}
