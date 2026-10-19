// Jaktdatabasen – Statskogs ArcGIS-tjenester på kartportal.statskog.no.
// Tjenestene er ikke avklart ennå (åpne spørsmål 4–8). Formatet følger
// ArcGIS REST: «query» gir GeoJSON, «applyEdits» tar imot nye objekter.

/** Et delområde (jaktfelt) som kan aktiveres. */
export interface SubareaFeature {
  type: 'Feature';
  geometry: { type: 'Polygon'; coordinates: number[][][] };
  properties: {
    subareaId: string;
    name: string;
    municipality: string;
    county: string;
    /** Inatur-salgssiden delområdet hører til (felles nøkkel, åpent spørsmål 6). */
    salesPageId: string;
  };
}

/** Et punkt koblet til en Inatur-salgsside (hytte eller tilbud). */
export interface PointFeature {
  type: 'Feature';
  geometry: { type: 'Point'; coordinates: [number, number] };
  properties: { salesPageId: string };
}

export interface FeatureCollection<F> {
  type: 'FeatureCollection';
  features: F[];
}

/** Fangstrapport slik appen sender den. Feltene må avklares med Statskog. */
export interface CatchReportPayload {
  clientId: string;
  permitId: string;
  activationId?: string;
  date: string;
  subareaId?: string;
  status: 'catch' | 'noCatch' | 'notHunted';
  catches: Array<{ species: string; count: number }>;
  createdAt: string;
}
