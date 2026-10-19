# Design tokens fra Figma

`figma-variables.json` er en eksport av variablene i Figma-fila «Jakt & Fiske (Design 2024)»
(samlingene «Token Colors», «Token Dimensions» og «Typography»). Den er eneste kilde for
farger, avstander, radier og typografi i både Flutter- og React-versjonen.

## Oppdatere etter endringer i Figma

1. **Hent fra Figma.** Be Claude «hente tokens fra Figma». Claude kjører
   `tools/tokens/export-figma-variables.js` i Figma-fila via Figma MCP (`use_figma`, kun lesing)
   og skriver resultatet til `tokens/figma-variables.json`.
2. **Generer kode.** `node tools/tokens/build.mjs` (eller `npm run tokens` i `react/`) skriver:
   - `react/src/styles/tokens.css`, `theme.css`, `typography.css`
   - `lib/theme/tokens.dart`, `lib/theme/typography.dart`
3. **Sjekk.** `flutter analyze && flutter test`, og i `react/`: `npm run build && npm run check:figma`.
   Hvis et token er fjernet eller har fått nytt navn i Figma, feiler typesjekken der det brukes.
4. **Se over endringen** med `git diff tokens/` og commit.

`node tools/tokens/build.mjs --check` (eller `npm run check:tokens`) feiler hvis de genererte
filene ikke stemmer med JSON-fila, og kan brukes i CI.

## Navneregler

| Figma | CSS | Dart |
| --- | --- | --- |
| `cta/cta-primary-default` | `--cta-primary-default`, `bg-cta-primary-default` | `AppPalette.ctaPrimaryDefault` |
| `attention/success` | `--attention-success` | `attentionSuccess` |
| `spacing/2xl` | `--spacing-xxl`, `p-xxl` | `AppSpacing.xxl` |
| `radius/m` | `--radius-medium`, `rounded-medium` | `AppRadius.m` |
| `font-size/body-small` + `line-height/body-small` | `type-body-small` | `AppType.bodySmall` |

Lys og mørk modus kommer fra modusene i «Token Colors». Primitivene (aliasene) står i JSON-fila
for sporbarhet, men koden bruker bare de løste verdiene.
