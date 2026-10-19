import type { CardType } from './cardType';
import type { SpeciesGroup } from './species';

/** Et tilbud om jakt- eller fiskekort (vises med `OfferCard`). */
export interface Offer {
  id: string;
  title: string;
  group: SpeciesGroup;
  county: string;
  municipality: string;
  /** Arter/jaktformer som tekst, f.eks. «Innlandsfiske, Ørret, Gjedde». */
  speciesText: string;
  cardTypes: CardType[];
  /** Korttyper som finnes, men ikke kan kjøpes nå («Card Inactive»). */
  unavailableCardTypes?: CardType[];
  priceFrom?: number;
  image?: string;
  /** Posisjon (lengdegrad, breddegrad) for kartet. */
  location?: [number, number];
}

/** Et kjøpt jakt- eller fiskekort. */
export interface HuntingLicense {
  cardNumber: string;
  cardType: CardType;
  title: string;
  group: SpeciesGroup;
  /** Dagene kortet gjelder (eller start og slutt for lengre kort). */
  validDates: Date[];
  speciesText: string;
  hunterNumber: string;
  holderName: string;
  phone?: string;
  email?: string;
  price?: number;
  /** Dagen kortet er aktivert for, hvis det er aktivert. */
  activatedDate?: Date;
}

/** En aktivering av et jaktkort for en dag. */
export interface Activation {
  id: string;
  licenseTitle: string;
  cardNumber: string;
  county: string;
  municipality: string;
  date: Date;
}

/** Kapasitet for aktivering en gitt dag (Figma «Activation Day»). */
export interface ActivationSlot {
  date: Date;
  used: number;
  capacity: number;
  available: boolean;
}

export const isFull = (s: ActivationSlot) => s.used >= s.capacity;
