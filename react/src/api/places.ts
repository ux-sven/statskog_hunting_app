// Stedsnavnsøk i Kartverkets åpne API (ws.geonorge.no/stedsnavn). Brukes til
// «Stedstreff» i søket. Inatur har ikke stedssøk.
export interface Place {
  name: string;
  type: string;
  municipality: string;
  county: string;
  point: [number, number];
}

export async function searchPlaces(q: string, signal?: AbortSignal): Promise<Place[]> {
  if (q.trim().length < 2) return [];
  const url = `https://ws.geonorge.no/stedsnavn/v1/navn?sok=${encodeURIComponent(q.trim())}*&fuzzy=true&utkoordsys=4258&treffPerSide=5&side=1`;
  const res = await fetch(url, { signal });
  if (!res.ok) return [];
  const j = await res.json();
  return (j.navn ?? []).map((n: { skrivemåte: string; navneobjekttype: string; kommuner?: Array<{ kommunenavn: string; fylkesnavn?: string }>; fylker?: Array<{ fylkesnavn: string }>; representasjonspunkt: { øst: number; nord: number } }) => ({
    name: n.skrivemåte,
    type: n.navneobjekttype,
    municipality: n.kommuner?.[0]?.kommunenavn ?? '',
    county: n.fylker?.[0]?.fylkesnavn ?? n.kommuner?.[0]?.fylkesnavn ?? '',
    point: [n.representasjonspunkt.øst, n.representasjonspunkt.nord],
  }));
}
