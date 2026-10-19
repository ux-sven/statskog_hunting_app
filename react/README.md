# Statskog Jakt & fiske – React-versjon

Opplæringsprosjekt: samme design og funksjoner som Flutter-appen i roten av repoet,
bygget som web-app for å teste **Figma Code Layers** og **Code Connect for React**.

## Kom i gang

```bash
cd react
npm ci
npm run dev          # http://localhost:5173  (komponentkatalog: /#katalog)
npm run build        # typesjekk + bygg til dist/
npm run check:figma  # kjører alle Code Connect-malene og typesjekker eksemplene
npm run tokens       # genererer tokens på nytt fra ../tokens/figma-variables.json
```

## Teknologi

React 19, TypeScript, Vite, Tailwind CSS 4 og ArcGIS Maps SDK for JavaScript (`@arcgis/core`).
Bakgrunnskartet er Kartverkets topografiske WMTS (åpent, uten nøkkel).

## Falsk Inatur-tjeneste

Vi har ikke tilgang til Inatur API ennå. Appen snakker derfor med en falsk tjeneste i nettleseren
(`src/api/fake`) som svarer på de samme adressene og med samme dataformat som
[Inatur API](https://dev.inatur.no/reference) og Jaktdatabasen (ArcGIS Feature Service).

* Klientene (`src/api/inatur/client.ts`, `src/api/jaktdatabasen/client.ts`) er ekte HTTP-klienter.
  De bytter til de ekte tjenestene når `VITE_INATUR_BASE_URL` og `VITE_JAKTDB_BASE_URL` er satt (se `.env.example`).
* Antakelser om API-et er samlet i `src/data/adapters.ts` og merket «IKKE i spesifikasjonen» i `src/api/inatur/types.ts`.
* Innstillinger → Prototype → Utvikler: simuler uten dekning, treg eller ustabil tjeneste, og tilbakestill eksempeldata.
* Innlogging: hvilket som helst brukernavn og passord (passordet «feil» gir feil).
* Uten nett vises lagrede data, fangstrapporter legges i kø og sendes når nettet kommer tilbake.

## Skuffer

`Sheet` er skuffen over kartet (Figma «Map Navigation Bar» `Drawer` og `Drawer Small`). Den har tre høyder
(`peek`, `half`, `full`). Dra i toppen, trykk på håndtaket, eller bruk piltastene når håndtaket har fokus.
`ModalSheet` er modalene (`Default` og `Modal Stack`), og `AlertDialog` er varslene.

## Struktur

| Mappe | Innhold |
| --- | --- |
| `src/styles` | Tokens fra Figma (lys/mørk) som CSS-variabler, Tailwind-tema og typografi (`type-*`) |
| `src/components` | Designsystemet – én komponent per Figma-side (Button, Chip, TextField, Table, MapControls …) |
| `src/features` | Innholdskomponenter (seksjonen «Innholdskomponenter» i Figma) og skjermer |
| `src/api` | Klienter for Inatur API og Jaktdatabasen, den falske tjenesten og stedsnavnsøk (Kartverket) |
| `src/data` | `AppStore` (tilstand, offline-kopi, kø for fangstrapporter) og `adapters.ts` (API → domene) |
| `src/map` | ArcGIS-kartet |
| `src/catalog` | Komponentkatalog (Innstillinger → Komponentkatalog, eller `#katalog`) |
| `figma/` | Code Connect-maler (label «React») – samme Figma-noder som Flutter-malene |
| `.figma/make/` | Skript som lar Figma kjøre prosjektet som Code Layer |

## Figma → kode

* Figma-varianter for hover/fokus/trykket er **ekte interaksjon** i koden (CSS `:hover`, `:focus-visible`, `:active`), ikke props.
* Farger, mål og typografi genereres fra Figma-variablene (se `../tokens/README.md`). Ikke rediger `tokens.css`, `theme.css` eller `typography.css` for hånd.
* Code Connect-malene ligger i `figma/` og er pushet med Figma MCP. Både Flutter- og React-snutter vises i Dev Mode – velg språk øverst.
