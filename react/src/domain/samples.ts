// Faste eksempler til komponentkatalogen og Code Connect-sjekken.
import { addDays, startOfDay } from './format';
import type { Activation, ActivationSlot, Cabin, HuntingLicense, Offer } from './license';
import { asset } from '../components/cx';

const today = startOfDay(new Date());

export const sampleOffer: Offer = {
  id: 'sp-radyr-loten',
  title: 'Rådyrjakt hos Statskog - Stendammen i Løten',
  group: 'game',
  county: 'Innlandet',
  municipality: 'Løten',
  counties: ['Innlandet'],
  municipalities: ['Løten'],
  speciesText: 'Rådyr',
  speciesIds: ['radyr'],
  cardTypes: ['dagskort', 'ukeskort'],
  unavailableCardTypes: ['sesongkort'],
  priceFrom: 660,
  image: asset('images/tilbud_radyr.jpg'),
  inaturUrl: 'https://www.inatur.no',
};

export const sampleCabin: Cabin = {
  id: 'cab-luspen',
  title: 'Øvre Luspen skogstue - tømmerhytte med sjel ved Unkervatnet i Hattfjelldal',
  image: asset('images/hytte.jpg'),
  beds: 4,
  county: 'Nordland',
  municipality: 'Hattfjelldal',
  priceFrom: 650,
  inaturUrl: 'https://www.inatur.no',
  amenities: ['Vedovn'],
};

export const sampleLicense: HuntingLicense = {
  id: '1721894',
  cardNumber: '1721894',
  cardType: 'sesongkort',
  title: 'Nordlandskortet for småvilt - Statskog Nordland (Salten og Helgeland)',
  salesPageId: 'sp-nordlandskortet',
  group: 'game',
  validDates: [addDays(today, -90), addDays(today, 180)],
  speciesText: 'Småvilt, Lirype, Fjellrype, Tiur, Orrfugl, Jerpe, Hare',
  hunterNumber: '654321',
  holderName: 'Ola Nordmann',
  phone: '987 65 432',
  email: 'ola@eksempel.no',
  price: 1200,
  canBeActivated: true,
};

export const sampleActivation: Activation = {
  id: 'a1',
  permitId: '1721894',
  licenseTitle: sampleLicense.title,
  cardNumber: '1721894',
  subareaId: 'sp-nordlandskortet-3',
  subareaName: 'Hatt 3',
  county: 'Nordland',
  municipality: 'Hattfjelldal',
  date: addDays(today, 2),
};

export const sampleSlots: ActivationSlot[] = [4, 2, 0, 0, 10, 6, 0, 1, 0, 3].map((used, i) => ({ date: addDays(today, i), used, capacity: 10, available: true }));
