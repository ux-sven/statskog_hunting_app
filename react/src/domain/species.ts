export type SpeciesGroup = 'fish' | 'game';

export const speciesList = [
  { id: 'innlandsfiske', label: 'Innlandsfiske', group: 'fish' },
  { id: 'sjoorret', label: 'Sjøørret', group: 'fish' },
  { id: 'orret', label: 'Ørret', group: 'fish' },
  { id: 'abbor', label: 'Abbor', group: 'fish' },
  { id: 'brunorret', label: 'Brunørret', group: 'fish' },
  { id: 'gjedde', label: 'Gjedde', group: 'fish' },
  { id: 'harr', label: 'Harr', group: 'fish' },
  { id: 'karpefisk', label: 'Karpefisk', group: 'fish' },
  { id: 'kreps', label: 'Kreps', group: 'fish' },
  { id: 'lake', label: 'Lake', group: 'fish' },
  { id: 'gjors', label: 'Gjørs', group: 'fish' },
  { id: 'sik', label: 'Sik', group: 'fish' },
  { id: 'roye', label: 'Røye', group: 'fish' },
  { id: 'smaviltjakt', label: 'Småviltjakt', group: 'game' },
  { id: 'fjellrype', label: 'Fjellrype', group: 'game' },
  { id: 'gjess', label: 'Gjess', group: 'game' },
  { id: 'grevling', label: 'Grevling', group: 'game' },
  { id: 'hare', label: 'Hare', group: 'game' },
  { id: 'jerpe', label: 'Jerpe', group: 'game' },
  { id: 'lirype', label: 'Lirype', group: 'game' },
  { id: 'mar', label: 'Mår', group: 'game' },
  { id: 'orrfugl', label: 'Orrfugl', group: 'game' },
  { id: 'ringdue', label: 'Ringdue', group: 'game' },
  { id: 'rodrev', label: 'Rødrev', group: 'game' },
  { id: 'roy', label: 'Røy', group: 'game' },
  { id: 'royskatt', label: 'Røyskatt', group: 'game' },
  { id: 'radyr', label: 'Rådyr', group: 'game' },
  { id: 'tiur', label: 'Tiur', group: 'game' },
  { id: 'villsvin', label: 'Villsvin', group: 'game' },
] as const;

export type SpeciesId = (typeof speciesList)[number]['id'];

export interface Species {
  id: SpeciesId;
  label: string;
  group: SpeciesGroup;
}

/** Kategorier («Innlandsfiske», «Småviltjakt») – ikke en art. */
export const isCategory = (id: SpeciesId) => id === 'innlandsfiske' || id === 'smaviltjakt';

export const speciesById = (id: SpeciesId): Species =>
  speciesList.find((s) => s.id === id) as Species;

export const fishSpecies = (): Species[] =>
  speciesList.filter((s) => s.group === 'fish' && !isCategory(s.id)) as Species[];

export const gameSpecies = (): Species[] =>
  speciesList.filter((s) => s.group === 'game' && !isCategory(s.id)) as Species[];
