import type { CardType } from './cardType';
import type { SpeciesGroup, SpeciesId } from './species';

/** Et tilbud om jakt- eller fiskekort (Inatur salgsside). Vises med `OfferCard`. */
export interface Offer {
  id: string;
  title: string;
  group: SpeciesGroup;
  county: string;
  municipality: string;
  counties: string[];
  municipalities: string[];
  /** Arter/jaktformer som tekst, f.eks. «Innlandsfiske, Ørret, Gjedde». */
  speciesText: string;
  speciesIds: string[];
  cardTypes: CardType[];
  /** Korttyper som finnes, men ikke kan kjøpes nå («Card Inactive»). */
  unavailableCardTypes?: CardType[];
  priceFrom?: number;
  image?: string;
  inaturUrl?: string;
  soldOut?: boolean;
  /** Posisjon (lengdegrad, breddegrad) for kartet. */
  location?: [number, number];
}

/** Hytte til leie (Inatur salgsside av typen hytte). */
export interface Cabin {
  id: string;
  title: string;
  image?: string;
  beds: number;
  county: string;
  municipality: string;
  priceFrom: number;
  inaturUrl: string;
  amenities: string[];
  location?: [number, number];
}

/** Et kjøpt jakt- eller fiskekort. */
export interface HuntingLicense {
  /** Inatur permit-id (jakt) eller kortnummer (fiske). */
  id: string;
  cardNumber: string;
  cardType: CardType;
  /** Navnet på kortet fra Inatur, f.eks. «Årskort for en person». */
  permitName?: string;
  title: string;
  salesPageId?: string;
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
  canBeActivated?: boolean;
  /** Kortet er utløpt (vises under «Vis utgåtte»). */
  expired?: boolean;
  reportDelivered?: boolean;
}

/** En aktivering av et jaktkort for en dag i et delområde. */
export interface Activation {
  id: string;
  permitId: string;
  licenseTitle: string;
  cardNumber: string;
  subareaId: string;
  subareaName: string;
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

/** Status for jakt i fangstrapporten (Figma «Status for jakt»). */
export type HuntStatus = 'catch' | 'noCatch' | 'notHunted';

/** En fangstrapport, levert eller ventende. */
export interface CaptureReport {
  id: string;
  permitId: string;
  activationId?: string;
  licenseTitle: string;
  subareaName?: string;
  date: Date;
  status: HuntStatus;
  catches: Partial<Record<SpeciesId, number>>;
  createdAt: Date;
  /** `false` mens rapporten venter på nett. */
  synced: boolean;
}

export const reportTotal = (r: CaptureReport) => Object.values(r.catches).reduce<number>((a, b) => a + (b ?? 0), 0);
