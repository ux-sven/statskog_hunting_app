import type { SpeciesGroup } from './species';
import type { Offer } from './license';

/** Jakttyper i filteret («Hva vil du jakte?»). Hver gir flere arter til API-et. */
export const huntTypes = [
  { id: 'rype', label: 'Rype', icon: 'lirype', species: ['lirype', 'fjellrype'] },
  { id: 'skogsfugl', label: 'Skogsfugl', icon: 'tiur', species: ['tiur', 'roy', 'orrfugl', 'jerpe'] },
  { id: 'smavilt', label: 'Småvilt', icon: 'hare', species: ['smaviltjakt', 'hare', 'rodrev', 'grevling', 'mar', 'royskatt', 'ringdue', 'gjess'] },
] as const;
export type HuntType = (typeof huntTypes)[number]['id'];

export type CardKind = 'dagskort' | 'periodekort';
export type SortOrder = 'relevans' | 'prisLav' | 'prisHoy' | 'navn';
export const sortLabels: Record<SortOrder, string> = { relevans: 'Relevans', prisLav: 'Lavest pris', prisHoy: 'Høyest pris', navn: 'Navn' };

/** Filtervalgene for tilbud (Figma «Filter Open Fish / Hunt»). */
export interface OfferFilter {
  group: SpeciesGroup;
  /** Fiskearter («Velg arter»). */
  fishSpecies: string[];
  /** Jakttyper (Rype, Skogsfugl, Småvilt). */
  huntTypes: HuntType[];
  counties: string[];
  municipalities: string[];
  cardKinds: CardKind[];
  from?: string;
  to?: string;
  includeExpired: boolean;
  sort: SortOrder;
}

export const emptyFilter = (group: SpeciesGroup = 'game'): OfferFilter => ({
  group,
  fishSpecies: [],
  huntTypes: [],
  counties: [],
  municipalities: [],
  cardKinds: ['dagskort', 'periodekort'],
  includeExpired: false,
  sort: 'relevans',
});

/** Arter som sendes til Inatur (`species=`). */
export const filterSpecies = (f: OfferFilter) =>
  f.group === 'fish' ? f.fishSpecies : f.huntTypes.flatMap((h) => huntTypes.find((x) => x.id === h)!.species);

/** Antall aktive filtervalg (vises som «Filter (3)»). */
export const activeFilterCount = (f: OfferFilter) =>
  (f.group === 'fish' ? f.fishSpecies.length : f.huntTypes.length) + f.counties.length + f.municipalities.length + (f.cardKinds.length === 1 ? 1 : 0) + (f.from || f.to ? 1 : 0) + (f.includeExpired ? 1 : 0);

/** Filtrering og sortering som Inatur ikke gjør (korttype, rekkefølge). */
export const applyLocal = (offers: Offer[], f: OfferFilter) => {
  let out = offers;
  if (f.cardKinds.length === 1) {
    const day = f.cardKinds[0] === 'dagskort';
    out = out.filter((o) => (day ? o.cardTypes.includes('dagskort') : o.cardTypes.some((t) => t !== 'dagskort')));
  }
  const by = {
    relevans: () => 0,
    prisLav: (a: Offer, b: Offer) => (a.priceFrom ?? 0) - (b.priceFrom ?? 0),
    prisHoy: (a: Offer, b: Offer) => (b.priceFrom ?? 0) - (a.priceFrom ?? 0),
    navn: (a: Offer, b: Offer) => a.title.localeCompare(b.title, 'nb'),
  }[f.sort];
  return [...out].sort(by);
};
