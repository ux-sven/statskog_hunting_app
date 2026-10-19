// Falsk Inatur API og Jaktdatabasen. Svarer på de samme adressene og med de
// samme dataformatene som de ekte tjenestene, slik at appen kan bygges før vi
// har tilgang. Byttes ut ved å sette VITE_INATUR_BASE_URL (se api/config.ts).
import type { PermitActivation, SalesPagePreview, UnactivatedPermit } from '../inatur/types';
import type { CatchReportPayload } from '../jaktdatabasen/types';
import { network } from './network';
import { cabins, pseudoCount, salesPages, seedActivations, seedFishingPermits, seedPermits, seedUser, subareaFeatures } from './data';

export const FAKE_INATUR = 'https://fake.inatur.no/api/external';
export const FAKE_JAKTDB = 'https://fake.kartportal.statskog.no/server/rest/services/Jakt/FeatureServer';

interface ServerState {
  user: typeof seedUser;
  permits: UnactivatedPermit[];
  activations: PermitActivation[];
  catchReports: CatchReportPayload[];
  tokens: string[];
  nextId: number;
}

const KEY = 'jf.fake.server';
const fresh = (): ServerState => ({
  user: structuredClone(seedUser),
  permits: seedPermits(),
  activations: seedActivations(),
  catchReports: [],
  tokens: [],
  nextId: 10,
});
const load = (): ServerState => {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    if (s?.permits) return s;
  } catch {
    /* ingen lagring */
  }
  return fresh();
};
let state = load();
const save = () => {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ingen lagring */
  }
};

/** Tilbakestill den falske tjenesten til eksempeldataene. */
export const resetFakeServer = () => {
  state = fresh();
  save();
};

const json = (body: unknown, status = 200) =>
  new Response(status === 204 ? null : JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
const problem = (status: number, title: string) => json({ status, title }, status);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const norm = (s: string) => s.toLowerCase().normalize('NFKD');

const paginate = <T,>(all: T[], page = 1, size = 20) => ({
  items: all.slice((page - 1) * size, page * size),
  pagination: { totalCount: all.length, currentPage: page, totalPages: Math.max(1, Math.ceil(all.length / size)) },
});

function salesPagesRoute(q: URLSearchParams) {
  const category = q.get('category');
  const term = norm(q.get('searchTerm') ?? '');
  const species = q.getAll('species');
  const counties = q.getAll('county');
  const munis = q.getAll('municipality');
  let all: SalesPagePreview[] = category === 'cabin' ? cabins.map(({ location: _l, ...c }) => c) : [...salesPages, ...(category ? [] : cabins.map(({ location: _l, ...c }) => c))];
  all = all.filter((p) => {
    if (category && category !== 'cabin' && (p.type !== 'organicSalesPagePreview' || p.salesPageType !== category)) return false;
    const c = p.type === 'organicSalesPagePreview' ? p.counties : [p.county];
    const m = p.type === 'organicSalesPagePreview' ? p.municipalities : [p.municipality];
    const s = p.type === 'organicSalesPagePreview' ? p.species : [];
    if (term && !norm(`${p.title} ${c.join(' ')} ${m.join(' ')} ${s.map((x) => x.text).join(' ')}`).includes(term)) return false;
    if (species.length && !s.some((x) => species.includes(x.id))) return false;
    if (counties.length && !c.some((x) => counties.includes(x))) return false;
    if (munis.length && !m.some((x) => munis.includes(x))) return false;
    return true;
  });
  const page = paginate(all, Number(q.get('page') ?? 1));
  return json({ ...page, links: { pagination: {} }, totalCount: all.length });
}

async function inatur(req: Request, url: URL): Promise<Response> {
  const path = url.pathname.replace(new URL(FAKE_INATUR).pathname, '');
  const q = url.searchParams;
  const m = req.method;

  if (m === 'POST' && path === '/oauth/token') {
    const form = new URLSearchParams(await req.text());
    if (!form.get('username') || !form.get('password')) return problem(400, 'Skriv inn brukernavn og passord');
    if (form.get('password') === 'feil') return problem(401, 'Feil brukernavn eller passord');
    const token = `fake-${crypto.randomUUID()}`;
    state.tokens.push(token);
    save();
    return json({ access_token: token, token_type: 'Bearer', expires_in: 3600 });
  }
  if (m === 'GET' && path === '/v1/sales-pages') return salesPagesRoute(q);

  // Alt under krever innlogging.
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token || !state.tokens.includes(token)) return problem(401, 'Ikke innlogget');

  if (path === '/v1/user') {
    if (m === 'PUT') {
      const body = await req.json();
      state.user = { ...state.user, interests: body.interests ?? state.user.interests };
      save();
    }
    return json(state.user);
  }
  if (m === 'GET' && path === '/v1/permits') return json({ ...paginate(state.permits), links: { pagination: {}, salesPages: {} } });
  if (m === 'GET' && path === '/v1/activations') return json({ ...paginate(state.activations, 1, 100), links: { pagination: {} } });
  if (m === 'POST' && path === '/v1/activations') {
    const permitId = q.get('permitId') ?? '';
    const subareaId = q.get('subareaId') ?? '';
    const date = q.get('date') ?? '';
    const permit = state.permits.find((p) => p.id === permitId);
    if (!permit) return problem(404, 'Fant ikke jaktkortet');
    if (!subareaFeatures.some((f) => f.properties.subareaId === subareaId)) return problem(400, 'Ukjent delområde');
    if (state.activations.some((a) => a.permitId === permitId && a.activatedDate === date)) return problem(409, 'Kortet er allerede aktivert denne dagen');
    const used = pseudoCount(subareaId, date) + state.activations.filter((a) => a.subarea === subareaId && a.activatedDate === date).length;
    if (used >= 10) return problem(409, 'Delområdet er fullt denne dagen');
    const activationId = `a${state.nextId++}`;
    state.activations.push({ activationId, permitId, activatedDate: date, salesPageTitle: permit.salesPage.title, permitName: permit.permitName, subarea: subareaId });
    save();
    return json({ activationId });
  }
  const del = path.match(/^\/v1\/activations\/([^/]+)$/);
  if (m === 'DELETE' && del) {
    const before = state.activations.length;
    state.activations = state.activations.filter((a) => a.activationId !== del[1]);
    if (state.activations.length === before) return problem(404, 'Fant ikke aktiveringen');
    save();
    return json(null, 204);
  }
  if (m === 'GET' && path === '/v1/fishing-permits') return json({ items: seedFishingPermits() });

  const sub = path.match(/^\/v1\/sales-pages\/([^/]+)\/activations\/subareas$/);
  if (m === 'GET' && sub) {
    const items = subareaFeatures.filter((f) => f.properties.salesPageId === sub[1]).map((f) => ({ id: f.properties.subareaId, name: f.properties.name, municipality: f.properties.municipality, capacityPerDay: 10 }));
    return json({ items });
  }
  const counts = path.match(/^\/v1\/sales-pages\/([^/]+)\/activations$/);
  if (m === 'GET' && counts) {
    const ids = q.getAll('subareaIds');
    const from = new Date(q.get('fromDate') ?? '');
    const to = new Date(q.get('toDate') ?? '');
    const items = [];
    for (const id of ids) {
      for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
        const date = d.toISOString().slice(0, 10);
        const count = Math.min(10, pseudoCount(id, date) + state.activations.filter((a) => a.subarea === id && a.activatedDate === date).length);
        items.push({ subareaId: id, date, count });
      }
    }
    return json({ items });
  }
  return problem(404, `Ukjent adresse ${m} ${path}`);
}

async function jaktdb(req: Request, url: URL): Promise<Response> {
  const path = url.pathname.replace(new URL(FAKE_JAKTDB).pathname, '');
  if (path === '/0/query') {
    const where = url.searchParams.get('where') ?? '1=1';
    const ids = [...where.matchAll(/'([^']+)'/g)].map((x) => x[1]);
    const features = ids.length ? subareaFeatures.filter((f) => ids.includes(f.properties.salesPageId)) : subareaFeatures;
    return json({ type: 'FeatureCollection', features });
  }
  if (path === '/2/query') {
    return json({
      type: 'FeatureCollection',
      features: cabins.map((c) => ({ type: 'Feature', geometry: { type: 'Point', coordinates: c.location }, properties: { salesPageId: c.id } })),
    });
  }
  if (path === '/3/query') {
    // Tilbudenes posisjon (midtpunkt), til markører i kartet.
    const { offerLocations } = await import('./data');
    return json({
      type: 'FeatureCollection',
      features: Object.entries(offerLocations).map(([id, coords]) => ({ type: 'Feature', geometry: { type: 'Point', coordinates: coords }, properties: { salesPageId: id } })),
    });
  }
  if (req.method === 'POST' && path === '/1/applyEdits') {
    const form = new URLSearchParams(await req.text());
    const adds = JSON.parse(form.get('adds') ?? '[]') as Array<{ attributes: CatchReportPayload }>;
    const results = adds.map((a) => {
      if (state.catchReports.some((r) => r.clientId === a.attributes.clientId)) return { success: true, objectId: 0 }; // samme rapport sendt to ganger
      state.catchReports.push(a.attributes);
      return { success: true, objectId: state.catchReports.length };
    });
    save();
    return json({ addResults: results });
  }
  return problem(404, `Ukjent adresse ${path}`);
}

/** Erstatning for `fetch` som svarer fra den falske tjenesten. */
export const fakeFetch: typeof fetch = async (input, init) => {
  const req = new Request(input, init);
  const url = new URL(req.url);
  const { latencyMs, offline, errorRate } = network.get();
  await sleep(latencyMs * (0.6 + Math.random() * 0.8));
  if (req.signal.aborted) throw new DOMException('Avbrutt', 'AbortError');
  if (offline) throw new TypeError('Failed to fetch');
  if (errorRate > 0 && Math.random() < errorRate) return problem(503, 'Tjenesten er midlertidig utilgjengelig');
  if (req.url.startsWith(FAKE_INATUR)) return inatur(req, url);
  if (req.url.startsWith(FAKE_JAKTDB)) return jaktdb(req, url);
  return fetch(input, init);
};

/** For utviklerpanelet: hva den falske tjenesten har mottatt. */
export const fakeServerState = () => state;
