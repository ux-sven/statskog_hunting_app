// Eksempeldata for den falske tjenesten. Datoer regnes fra i dag, så
// prototypen alltid ser aktuell ut.
import type { CabinSalesPagePreview, FishingPermit, InaturUser, OrganicSalesPagePreview, PermitActivation, UnactivatedPermit } from '../inatur/types';
import type { SubareaFeature } from '../jaktdatabasen/types';

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const day = (offset: number) => {
  const n = new Date();
  return iso(new Date(n.getFullYear(), n.getMonth(), n.getDate() + offset));
};
const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;
const inatur = (slug: string) => `https://www.inatur.no/${slug}`;
const statskog = { id: 's1', name: 'Statskog SF' };
const sp = (...ids: Array<[string, string]>) => ids.map(([id, text]) => ({ id, text }));

type Organic = Omit<OrganicSalesPagePreview, 'type' | 'lastPublished' | 'firstPublished' | 'seller' | 'soldOut' | 'expired'> &
  Partial<Pick<OrganicSalesPagePreview, 'seller' | 'soldOut' | 'expired'>> & { location: [number, number] };

const organic: Organic[] = [
  {
    id: 'sp-radyr-loten', title: 'Rådyrjakt hos Statskog - Stendammen i Løten', thumbnailUrl: img('tilbud_radyr.jpg'), inaturUrl: inatur('jakt/radyr-stendammen'),
    priceFrom: 660, species: sp(['radyr', 'Rådyr']), counties: ['Innlandet'], municipalities: ['Løten'], salesPageType: 'bigGame',
    productTypes: ['dagskort', 'ukeskort', 'sesongkort'], soldOutProductTypes: ['sesongkort'], location: [11.35, 60.82],
    shortDescription: 'Rådyrjakt i variert skogsterreng ved Stendammen, kort vei fra Hamar.',
  },
  {
    id: 'sp-skogsfugl-lier', title: 'Skogsfugljakt hos Statskog - Børresen i Finnemarka', thumbnailUrl: img('tilbud_skogsfugl.jpg'), inaturUrl: inatur('jakt/skogsfugl-borresen'),
    priceFrom: 365, species: sp(['smaviltjakt', 'Småvilt'], ['roy', 'Røy'], ['tiur', 'Tiur'], ['orrfugl', 'Orrfugl'], ['jerpe', 'Jerpe']), counties: ['Buskerud'], municipalities: ['Lier'],
    salesPageType: 'smallGame', productTypes: ['dagskort', 'ukeskort', 'sesongkort'], soldOutProductTypes: ['sesongkort'], location: [10.12, 59.83],
  },
  {
    id: 'sp-hersjoen-selbu', title: 'Småviltjakt i Hersjøen-Kråssådal utmarkslag', thumbnailUrl: img('tilbud_rype.jpg'), inaturUrl: inatur('jakt/hersjoen-krassadal'),
    priceFrom: 300, species: sp(['lirype', 'Lirype'], ['fjellrype', 'Fjellrype'], ['orrfugl', 'Orrfugl'], ['hare', 'Hare']), counties: ['Trøndelag'], municipalities: ['Selbu'],
    salesPageType: 'smallGame', productTypes: ['dagskort', 'sesongkort'], location: [11.12, 63.17],
    seller: { id: 's2', name: 'Hersjøen-Kråssådal utmarkslag' },
  },
  {
    id: 'sp-holden-snasa', title: 'Rype og skogsfugljakt på Holden - Statskog Snåsa', thumbnailUrl: img('tilbud_rype.jpg'), inaturUrl: inatur('jakt/holden-snasa'),
    priceFrom: 340, species: sp(['smaviltjakt', 'Småvilt'], ['lirype', 'Lirype'], ['fjellrype', 'Fjellrype'], ['roy', 'Røy'], ['tiur', 'Tiur'], ['orrfugl', 'Orrfugl'], ['jerpe', 'Jerpe']),
    counties: ['Trøndelag'], municipalities: ['Snåsa'], salesPageType: 'smallGame', productTypes: ['dagskort', 'ukeskort'], location: [12.55, 64.22],
  },
  {
    id: 'sp-nordlandskortet', title: 'Nordlandskortet for småvilt - Statskog Nordland (Salten og Helgeland)', thumbnailUrl: img('tilbud_rype.jpg'), inaturUrl: inatur('jakt/nordlandskortet'),
    priceFrom: 450, species: sp(['smaviltjakt', 'Småvilt'], ['lirype', 'Lirype'], ['fjellrype', 'Fjellrype'], ['tiur', 'Tiur'], ['orrfugl', 'Orrfugl'], ['jerpe', 'Jerpe'], ['hare', 'Hare'], ['rodrev', 'Rødrev'], ['grevling', 'Grevling'], ['royskatt', 'Røyskatt'], ['mar', 'Mår'], ['ringdue', 'Ringdue']),
    counties: ['Nordland'], municipalities: ['Hattfjelldal', 'Grane', 'Saltdal'], salesPageType: 'smallGame', productTypes: ['dagskort', 'ukeskort', 'sesongkort'], location: [14.15, 65.6],
  },
  {
    id: 'sp-steinkjer', title: 'Småviltjakt på statsallmenningene hos Steinkjer fjellstyre', thumbnailUrl: img('tilbud_skogsfugl.jpg'), inaturUrl: inatur('jakt/steinkjer-fjellstyre'),
    priceFrom: 280, species: sp(['lirype', 'Lirype'], ['fjellrype', 'Fjellrype'], ['hare', 'Hare']), counties: ['Trøndelag'], municipalities: ['Steinkjer'],
    salesPageType: 'smallGame', productTypes: ['dagskort', 'sesongkort'], location: [11.75, 64.05], seller: { id: 's3', name: 'Steinkjer fjellstyre' },
  },
  {
    id: 'sp-vefsn-hund', title: 'Hundetrening hos Statskog - Eiteråldal nord i Vefsn', thumbnailUrl: img('tilbud_skogsfugl.jpg'), inaturUrl: inatur('jakt/hundetrening-vefsn'),
    priceFrom: 100, species: sp(['andre', 'Andre']), counties: ['Nordland'], municipalities: ['Vefsn'], salesPageType: 'smallGame', productTypes: ['dagskort', 'ukeskort', 'sesongkort'], soldOutProductTypes: ['sesongkort'], location: [13.55, 65.75],
  },
  {
    id: 'sp-norgeskort-fiske', title: 'Statskog Norgeskort for innlandsfiske', thumbnailUrl: img('tilbud_fiske.png'), inaturUrl: inatur('fiske/norgeskortet'),
    priceFrom: 75, species: sp(['innlandsfiske', 'Innlandsfiske'], ['orret', 'Ørret'], ['gjedde', 'Gjedde'], ['abbor', 'Abbor'], ['roye', 'Røye'], ['sik', 'Sik'], ['harr', 'Harr'], ['karpefisk', 'Karpefisk'], ['brunorret', 'Brunørret']),
    counties: ['Nordland', 'Troms', 'Finnmark', 'Trøndelag', 'Innlandet', 'Buskerud', 'Telemark', 'Agder', 'Rogaland', 'Vestland', 'Møre og Romsdal', 'Akershus', 'Østfold'],
    municipalities: ['Hattfjelldal', 'Saltdal', 'Engerdal', 'Snåsa'], salesPageType: 'freshwaterFishing', productTypes: ['dagskort', 'ukeskort', 'aarskort'], location: [14.6, 66.1],
  },
  {
    id: 'sp-malangen', title: 'Fiskekort Malangen grunneierlag', thumbnailUrl: img('tilbud_orret.jpg'), inaturUrl: inatur('fiske/malangen'),
    priceFrom: 75, species: sp(['innlandsfiske', 'Innlandsfiske'], ['orret', 'Ørret'], ['roye', 'Røye'], ['sik', 'Sik'], ['harr', 'Harr']), counties: ['Troms'], municipalities: ['Balsfjord'],
    salesPageType: 'freshwaterFishing', productTypes: ['dagskort', 'ukeskort', 'aarskort'], location: [19.2, 69.25], seller: { id: 's4', name: 'Malangen grunneierlag' },
  },
  {
    id: 'sp-femund', title: 'Fiske i Femund - Statskog', thumbnailUrl: img('tilbud_fjellvann.jpg'), inaturUrl: inatur('fiske/femund'),
    priceFrom: 120, species: sp(['orret', 'Ørret'], ['roye', 'Røye'], ['harr', 'Harr'], ['gjedde', 'Gjedde'], ['abbor', 'Abbor']), counties: ['Innlandet'], municipalities: ['Engerdal'],
    salesPageType: 'freshwaterFishing', productTypes: ['dagskort', 'sesongkort'], location: [11.92, 62.2],
  },
];

export const offerLocations: Record<string, [number, number]> = Object.fromEntries(organic.map((o) => [o.id, o.location]));

export const salesPages: OrganicSalesPagePreview[] = organic.map(({ location: _l, ...o }) => ({
  type: 'organicSalesPagePreview',
  lastPublished: '2026-08-01T08:00:00Z',
  firstPublished: '2024-06-01T08:00:00Z',
  seller: statskog,
  soldOut: false,
  expired: false,
  ...o,
}));

export const cabins: Array<CabinSalesPagePreview & { location: [number, number] }> = [
  {
    type: 'cabinSalesPagePreview', id: 'cab-luspen', title: 'Øvre Luspen skogstue - tømmerhytte med sjel ved Unkervatnet i Hattfjelldal',
    thumbnailUrl: img('hytte.jpg'), inaturUrl: inatur('hytte/ovre-luspen'), lastPublished: '2026-08-01T08:00:00Z', firstPublished: '2023-01-01T08:00:00Z',
    priceFrom: 650, seller: statskog, distanceFromRoad: { summer: 0.2, winter: 1.5 }, amenities: ['Vedovn', 'Båt'], totalBeds: 4, municipality: 'Hattfjelldal', county: 'Nordland', location: [14.05, 65.52],
  },
  {
    type: 'cabinSalesPagePreview', id: 'cab-krasadal', title: 'Kråssådalsbu - enkel jakthytte i Selbufjellet',
    thumbnailUrl: img('hytte.jpg'), inaturUrl: inatur('hytte/krassadalsbu'), lastPublished: '2026-08-01T08:00:00Z', firstPublished: '2023-01-01T08:00:00Z',
    priceFrom: 400, seller: { id: 's2', name: 'Hersjøen-Kråssådal utmarkslag' }, distanceFromRoad: { summer: 2.5, winter: 4 }, amenities: ['Vedovn'], totalBeds: 6, municipality: 'Selbu', county: 'Trøndelag', location: [11.2, 63.12],
  },
];

// ---------- Delområder (Jaktdatabasen) ----------
const square = (cx: number, cy: number, w: number, h: number): number[][][] => {
  // Litt skjeve firkanter, så det ser ut som jaktfelt.
  const j = (i: number) => (Math.sin(cx * 7 + cy * 3 + i) * w) / 6;
  return [[[cx - w / 2 + j(1), cy - h / 2], [cx + w / 2, cy - h / 2 + j(2) / 3], [cx + w / 2 + j(3), cy + h / 2], [cx - w / 2, cy + h / 2 + j(4) / 3], [cx - w / 2 + j(1), cy - h / 2]]];
};

const grid = (salesPageId: string, county: string, muni: string, prefix: string, names?: string[]): SubareaFeature[] => {
  const [lon, lat] = offerLocations[salesPageId];
  const w = 0.16;
  const h = 0.07;
  const cells: Array<[number, number]> = [[-0.5, 0.5], [0.5, 0.5], [-0.5, -0.5], [0.5, -0.5]];
  return cells.map(([dx, dy], i) => ({
    type: 'Feature',
    geometry: { type: 'Polygon', coordinates: square(lon + dx * w, lat + dy * h, w * 0.98, h * 0.98) },
    properties: { subareaId: `${salesPageId}-${i + 1}`, name: names?.[i] ?? `${prefix} ${i + 1}`, municipality: muni, county, salesPageId },
  }));
};

export const subareaFeatures: SubareaFeature[] = [
  ...grid('sp-radyr-loten', 'Innlandet', 'Løten', 'Stendammen'),
  ...grid('sp-skogsfugl-lier', 'Buskerud', 'Lier', 'Børresen'),
  ...grid('sp-hersjoen-selbu', 'Trøndelag', 'Selbu', '', ['Hersjøen', 'Kråssådal', 'Selbuskogen', 'Lødølja']),
  ...grid('sp-holden-snasa', 'Trøndelag', 'Snåsa', 'Holden'),
  ...grid('sp-nordlandskortet', 'Nordland', 'Hattfjelldal', 'Hatt'),
  ...grid('sp-steinkjer', 'Trøndelag', 'Steinkjer', 'Statsallmenning'),
  ...grid('sp-vefsn-hund', 'Nordland', 'Vefsn', 'Eiteråldal'),
  ...grid('sp-norgeskort-fiske', 'Nordland', 'Saltdal', 'Fiskefelt'),
  ...grid('sp-malangen', 'Troms', 'Balsfjord', 'Malangen'),
  ...grid('sp-femund', 'Innlandet', 'Engerdal', 'Femund'),
];

// ---------- Brukerens data ----------
export const seedUser: InaturUser = {
  id: 'u1',
  name: 'Ola Nordmann',
  email: 'ola@eksempel.no',
  created: '2019-05-01',
  phoneNumber: { countryCode: '+47', number: '98765432' },
  huntingNumber: '654321',
  birthDate: '1985-03-12',
  interests: { bigGame: false, smallGame: true, salmonFishing: false, otherFishing: true, cabins: false },
};

export const seedPermits = (): UnactivatedPermit[] => [
  {
    id: '1721894', dates: [day(-90), day(180)], salesPage: { id: 'sp-nordlandskortet', title: 'Nordlandskortet for småvilt - Statskog Nordland (Salten og Helgeland)' },
    price: 1200, permitName: 'Sesongkort', canBeActivated: true,
  },
  {
    id: '1721895', dates: [day(-3), day(-2), day(-1), day(0), day(1)], salesPage: { id: 'sp-hersjoen-selbu', title: 'Småviltjakt i Hersjøen-Kråssådal utmarkslag' },
    price: 600, permitName: 'Dagskort', canBeActivated: true,
  },
  {
    id: '1721950', dates: [day(3), day(4), day(5)], salesPage: { id: 'sp-skogsfugl-lier', title: 'Skogsfugljakt hos Statskog - Børresen i Finnemarka' },
    price: 365, permitName: 'Dagskort', canBeActivated: true,
  },
];

export const seedActivations = (): PermitActivation[] => [
  { activationId: 'a1', permitId: '1721895', activatedDate: day(-1), salesPageTitle: 'Småviltjakt i Hersjøen-Kråssådal utmarkslag', permitName: 'Dagskort', subarea: 'sp-hersjoen-selbu-2' },
  { activationId: 'a2', permitId: '1721894', activatedDate: day(-6), salesPageTitle: 'Nordlandskortet for småvilt - Statskog Nordland (Salten og Helgeland)', permitName: 'Sesongkort', subarea: 'sp-nordlandskortet-3' },
  { activationId: 'a3', permitId: '1721894', activatedDate: day(2), salesPageTitle: 'Nordlandskortet for småvilt - Statskog Nordland (Salten og Helgeland)', permitName: 'Sesongkort', subarea: 'sp-nordlandskortet-3' },
];

export const seedFishingPermits = (): FishingPermit[] => {
  const y = new Date().getFullYear();
  return [
    {
      permitNumber: '1722001', permitName: 'Årskort for en person', period: { start: `${y}-01-01`, end: `${y}-12-31` }, fisher: 'Ola Nordmann',
      salesPage: { id: 'sp-norgeskort-fiske', name: 'Statskog Norgeskort for innlandsfiske', thumbnailUrl: img('tilbud_fiske.png') }, isReportDelivered: false, reportItems: [],
    },
    {
      permitNumber: '1719044', permitName: 'Ukeskort', period: { start: `${y - 1}-07-01`, end: `${y - 1}-07-07` }, fisher: 'Ola Nordmann',
      salesPage: { id: 'sp-malangen', name: 'Fiskekort Malangen grunneierlag', thumbnailUrl: img('tilbud_orret.jpg') }, isReportDelivered: true,
      reportItems: [{ species: 'Ørret', count: 3, weightKg: 1.8 }],
    },
  ];
};

/** Fast «tilfeldig» antall aktiveringer per delområde og dag. */
export const pseudoCount = (subareaId: string, date: string) => {
  let h = 0;
  for (const c of subareaId + date) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const r = h % 100;
  return r < 35 ? 0 : r < 60 ? (h >> 3) % 4 : r < 85 ? 3 + ((h >> 5) % 5) : r < 93 ? 8 + ((h >> 7) % 2) : 10;
};
