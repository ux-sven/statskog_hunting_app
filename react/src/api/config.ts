import { InaturClient } from './inatur/client';
import { HuntingDatabaseClient } from './jaktdatabasen/client';
import { FAKE_INATUR, FAKE_JAKTDB, fakeFetch } from './fake/server';

/**
 * Velger ekte eller falsk tjeneste. Uten miljøvariabler brukes den falske.
 *
 *   VITE_INATUR_BASE_URL=https://inatur-test.inatur.no/api/external
 *   VITE_JAKTDB_BASE_URL=https://kartportal.statskog.no/server/rest/services/…/FeatureServer
 */
const inaturUrl = import.meta.env.VITE_INATUR_BASE_URL as string | undefined;
const jaktdbUrl = import.meta.env.VITE_JAKTDB_BASE_URL as string | undefined;

export const usingFakeInatur = !inaturUrl;

export const createClients = (getToken: () => string | null) => ({
  inatur: new InaturClient({ baseUrl: inaturUrl ?? FAKE_INATUR, fetch: inaturUrl ? undefined : fakeFetch, getToken }),
  jaktdb: new HuntingDatabaseClient({ baseUrl: jaktdbUrl ?? FAKE_JAKTDB, fetch: jaktdbUrl ? undefined : fakeFetch }),
});
