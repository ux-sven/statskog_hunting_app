// Typer for Inatur API (https://dev.inatur.no/reference, OpenAPI 3.0).
// Bare feltene appen bruker er tatt med. Navnene følger spesifikasjonen.

export type SalesPageType = 'smallGame' | 'bigGame' | 'freshwaterFishing' | 'salmonFishing';

export interface PaginationData {
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export interface Paginated<T> {
  items: T[];
  pagination: PaginationData;
}

/** `SalesPages.OrganicSalesPagePreview` – tilbud om jakt eller fiske. */
export interface OrganicSalesPagePreview {
  type: 'organicSalesPagePreview';
  id: string;
  title: string;
  thumbnailUrl: string;
  inaturUrl: string;
  lastPublished: string;
  firstPublished: string;
  shortDescription?: string;
  priceFrom: number;
  seller: { id: string; name: string };
  species: Array<{ id: string; text: string }>;
  counties: string[];
  municipalities: string[];
  salesPageType: SalesPageType;
  soldOut: boolean;
  expired: boolean;
  /**
   * IKKE i spesifikasjonen: korttypene som selges (dagskort, ukeskort …).
   * Designet viser dem i tilbudskortet, men forhåndsvisningen fra Inatur har
   * dem ikke. Avklares med Inatur (åpent spørsmål).
   */
  productTypes?: string[];
  /** IKKE i spesifikasjonen: korttyper som er utsolgt nå. */
  soldOutProductTypes?: string[];
}

/** `SalesPages.Cabin.SalesPagePreview` – hytte til leie. */
export interface CabinSalesPagePreview {
  type: 'cabinSalesPagePreview';
  id: string;
  title: string;
  thumbnailUrl: string;
  inaturUrl: string;
  lastPublished: string;
  firstPublished: string;
  shortDescription?: string;
  priceFrom: number;
  seller: { id: string; name: string };
  distanceFromRoad: { summer?: number; winter?: number };
  amenities: string[];
  totalBeds: number;
  municipality: string;
  county: string;
}

export type SalesPagePreview = OrganicSalesPagePreview | CabinSalesPagePreview;

export interface SalesPagesQuery {
  category?: SalesPageType | 'cabin';
  searchTerm?: string;
  species?: string[];
  county?: string[];
  municipality?: string[];
  fromDate?: string;
  toDate?: string;
  includeExpiredOffers?: boolean;
  page?: number;
}

export interface PhoneNumber {
  countryCode: string;
  number: string;
}

/** `Permits.UnactivatedPermit` – kjøpt jaktkort som kan aktiveres. */
export interface UnactivatedPermit {
  id: string;
  dates: string[];
  salesPage: { id: string; title: string };
  price: number;
  permitName: string;
  canBeActivated: boolean;
  phone?: PhoneNumber;
}

/** `Permits.Activation`. */
export interface PermitActivation {
  activationId: string;
  permitId: string;
  activatedDate: string;
  salesPageTitle: string;
  permitName: string;
  subarea: string;
}

/** `CustomerFishingPermitsApi.Item`. */
export interface FishingPermit {
  permitNumber: string;
  permitName: string;
  period: { start: string; end: string };
  fisher: string;
  salesPage: { id: string; name: string; thumbnailUrl: string };
  isReportDelivered: boolean;
  reportItems: Array<{ species: string; count: number; weightKg?: number }>;
}

/** `Users.User`. */
export interface InaturUser {
  id: string;
  name: string;
  email: string;
  created: string;
  phoneNumber?: PhoneNumber;
  huntingNumber?: string;
  birthDate?: string;
  interests: { bigGame: boolean; smallGame: boolean; salmonFishing: boolean; otherFishing: boolean; cabins: boolean };
}

/**
 * `GET /v1/sales-pages/{id}/activations/subareas` og `…/activations`.
 * Responsen er ikke typet i spesifikasjonen («items: object»). Formen under
 * er antatt og må avklares med Inatur.
 */
export interface SubareaInfo {
  id: string;
  name: string;
  municipality: string;
  capacityPerDay: number;
}
export interface SubareaDayCount {
  subareaId: string;
  date: string;
  count: number;
}

export interface TokenResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token?: string;
}
