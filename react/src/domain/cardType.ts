/** Korttyper for jakt- og fiskekort (Figma «Card», `Property 1`). */
export const cardTypes = {
  dagskort: { label: 'Dagskort', asset: 'dagskort' },
  ukeskort: { label: 'Ukeskort', asset: 'ukeskort' },
  manedskort: { label: 'Månedskort', asset: 'manedskort' },
  aarskort: { label: 'Årskort', asset: 'aarskort' },
  sesongkort: { label: 'Sesongkort', asset: 'sesongkort' },
  tilleggskort: { label: 'Tilleggskort', asset: 'tilleggskort' },
  /** Alternative symboler uten tall (Figma «Alt kort 1–3»). */
  alternativ1: { label: 'Kort', asset: 'altKort1' },
  alternativ2: { label: 'Kort', asset: 'altKort2' },
  alternativ3: { label: 'Kort', asset: 'altKort3' },
} as const;

export type CardType = keyof typeof cardTypes;
