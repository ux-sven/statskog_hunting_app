// Fylker (2024) og et utvalg kommuner. I produksjon hentes listene fra
// Kartverkets kommuneinfo-API (ws.geonorge.no/kommuneinfo/v1).
export const counties: Record<string, string[]> = {
  Agder: ['Arendal', 'Bykle', 'Kristiansand', 'Valle'],
  Akershus: ['Asker', 'Bærum', 'Eidsvoll', 'Nannestad'],
  Buskerud: ['Drammen', 'Hol', 'Lier', 'Ringerike'],
  Finnmark: ['Alta', 'Karasjok', 'Kautokeino', 'Sør-Varanger'],
  Innlandet: ['Engerdal', 'Løten', 'Rendalen', 'Trysil'],
  'Møre og Romsdal': ['Molde', 'Rauma', 'Sunndal', 'Surnadal'],
  Nordland: ['Fauske', 'Grane', 'Hattfjelldal', 'Saltdal', 'Vefsn'],
  Oslo: ['Oslo'],
  Rogaland: ['Bjerkreim', 'Sirdal', 'Suldal'],
  Telemark: ['Bamble', 'Drangedal', 'Fyresdal', 'Hjartdal', 'Kragerø', 'Kviteseid', 'Midt-Telemark', 'Nissedal', 'Nome', 'Notodden', 'Porsgrunn'],
  Troms: ['Balsfjord', 'Bardu', 'Målselv', 'Storfjord'],
  Trøndelag: ['Selbu', 'Snåsa', 'Steinkjer', 'Røros', 'Tydal'],
  Vestfold: ['Larvik', 'Sandefjord'],
  Vestland: ['Aurland', 'Eidfjord', 'Ulvik', 'Voss'],
  Østfold: ['Aremark', 'Halden', 'Marker'],
};
export const countyNames = Object.keys(counties).sort((a, b) => a.localeCompare(b, 'nb'));
