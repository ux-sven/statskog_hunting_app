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
```

## Teknologi

React 19, TypeScript, Vite, Tailwind CSS 4 og ArcGIS Maps SDK for JavaScript (`@arcgis/core`).
Bakgrunnskartet er Kartverkets topografiske WMTS (åpent, uten nøkkel).

## Struktur

| Mappe | Innhold |
| --- | --- |
| `src/styles` | Tokens fra Figma (lys/mørk) som CSS-variabler, Tailwind-tema og typografi (`type-*`) |
| `src/components` | Designsystemet – én komponent per Figma-side (Button, Chip, TextField, Table, MapControls …) |
| `src/features` | Innholdskomponenter (seksjonen «Innholdskomponenter» i Figma) og skjermer |
| `src/data` | `DemoStore` med eksempeldata – samme grensesnitt som Inatur API/Jaktdatabasen skal fylle |
| `src/map` | ArcGIS-kartet |
| `src/catalog` | Komponentkatalog (Innstillinger → Komponentkatalog, eller `#katalog`) |
| `figma/` | Code Connect-maler (label «React») – samme Figma-noder som Flutter-malene |
| `.figma/make/` | Skript som lar Figma kjøre prosjektet som Code Layer |

## Figma → kode

* Figma-varianter for hover/fokus/trykket er **ekte interaksjon** i koden (CSS `:hover`, `:focus-visible`, `:active`), ikke props.
* Farger og mål kommer fra tokens, så endringer i Figma-variablene oppdateres ett sted (`src/styles/tokens.css`).
* Code Connect-malene ligger i `figma/` og er pushet med Figma MCP. Både Flutter- og React-snutter vises i Dev Mode – velg språk øverst.
