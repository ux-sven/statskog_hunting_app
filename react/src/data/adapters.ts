// Oversetter fra Inatur- og Jaktdatabasen-formatet til appens domenemodeller.
// Her samles antakelsene om API-et, så de er enkle å rette når vi får tilgang.
import type { CabinSalesPagePreview, FishingPermit, InaturUser, OrganicSalesPagePreview, PermitActivation, UnactivatedPermit } from '../api/inatur/types';
import type { SubareaFeature } from '../api/jaktdatabasen/types';
import { cardTypes, type CardType } from '../domain/cardType';
import { parseDay } from '../domain/format';
import type { Activation, Cabin, HuntingLicense, Offer } from '../domain/license';

const isCardType = (s: string): s is CardType => s in cardTypes;

/** «Årskort for en person» → «aarskort». */
export const cardTypeFromName = (name: string): CardType => {
  const n = name.toLowerCase();
  if (n.includes('dag')) return 'dagskort';
  if (n.includes('uke')) return 'ukeskort';
  if (n.includes('måned')) return 'manedskort';
  if (n.includes('år')) return 'aarskort';
  if (n.includes('sesong')) return 'sesongkort';
  if (n.includes('tillegg')) return 'tilleggskort';
  return 'alternativ1';
};

export const toOffer = (p: OrganicSalesPagePreview, location?: [number, number]): Offer => ({
  id: p.id,
  title: p.title,
  group: p.salesPageType === 'freshwaterFishing' || p.salesPageType === 'salmonFishing' ? 'fish' : 'game',
  counties: p.counties,
  municipalities: p.municipalities,
  county: p.counties.length > 1 ? `${p.counties[0]} +${p.counties.length - 1}` : (p.counties[0] ?? ''),
  municipality: p.municipalities.length > 1 ? `${p.municipalities[0]} +${p.municipalities.length - 1}` : (p.municipalities[0] ?? ''),
  speciesText: p.species.map((s) => s.text).join(', '),
  speciesIds: p.species.map((s) => s.id),
  cardTypes: (p.productTypes ?? []).filter(isCardType).filter((t) => !p.soldOutProductTypes?.includes(t)),
  unavailableCardTypes: (p.soldOutProductTypes ?? []).filter(isCardType),
  priceFrom: p.priceFrom,
  image: p.thumbnailUrl,
  inaturUrl: p.inaturUrl,
  soldOut: p.soldOut,
  location,
});

export const toCabin = (c: CabinSalesPagePreview, location?: [number, number]): Cabin => ({
  id: c.id,
  title: c.title,
  image: c.thumbnailUrl,
  beds: c.totalBeds,
  county: c.county,
  municipality: c.municipality,
  priceFrom: c.priceFrom,
  inaturUrl: c.inaturUrl,
  amenities: c.amenities,
  location,
});

const phone = (u?: InaturUser) => (u?.phoneNumber ? u.phoneNumber.number.replace(/(\d{3})(\d{2})(\d{3})/, '$1 $2 $3') : undefined);

/**
 * Inatur `permits` har ikke kortnummer, jegernummer eller innehaver. Vi bruker
 * permit-id som kortnummer og henter jegeren fra `/v1/user` (åpent spørsmål 3).
 */
export const toLicense = (p: UnactivatedPermit, user: InaturUser | undefined, offer?: Offer): HuntingLicense => {
  const dates = p.dates.map(parseDay).sort((a, b) => a.getTime() - b.getTime());
  const type = cardTypeFromName(p.permitName);
  const long = type !== 'dagskort' && dates.length > 1;
  const end = dates[dates.length - 1];
  return {
    id: p.id,
    cardNumber: p.id,
    cardType: type,
    permitName: p.permitName,
    title: p.salesPage.title,
    salesPageId: p.salesPage.id,
    group: 'game',
    validDates: long ? [dates[0], end] : dates,
    speciesText: offer?.speciesText ?? '',
    hunterNumber: user?.huntingNumber ?? '',
    holderName: user?.name ?? '',
    phone: phone(user),
    email: user?.email,
    price: p.price,
    canBeActivated: p.canBeActivated,
    expired: end ? end.getTime() < new Date().setHours(0, 0, 0, 0) : false,
  };
};

export const toFishingLicense = (f: FishingPermit, user: InaturUser | undefined, offer?: Offer): HuntingLicense => {
  const end = parseDay(f.period.end);
  return {
    id: f.permitNumber,
    cardNumber: f.permitNumber,
    cardType: cardTypeFromName(f.permitName),
    permitName: f.permitName,
    title: f.salesPage.name,
    salesPageId: f.salesPage.id,
    group: 'fish',
    validDates: [parseDay(f.period.start), end],
    speciesText: offer?.speciesText ?? '',
    hunterNumber: user?.huntingNumber ?? '',
    holderName: f.fisher,
    phone: phone(user),
    email: user?.email,
    expired: end.getTime() < new Date().setHours(0, 0, 0, 0),
    reportDelivered: f.isReportDelivered,
  };
};

export const toActivation = (a: PermitActivation, subareas: Map<string, SubareaFeature>): Activation => {
  const s = subareas.get(a.subarea)?.properties;
  return {
    id: a.activationId,
    permitId: a.permitId,
    licenseTitle: a.salesPageTitle,
    cardNumber: a.permitId,
    subareaId: a.subarea,
    subareaName: s?.name ?? a.subarea,
    county: s?.county ?? '',
    municipality: s?.municipality ?? '',
    date: parseDay(a.activatedDate),
  };
};
