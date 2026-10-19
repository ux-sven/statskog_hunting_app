# Statskog jakt & fiske – Flutter-komponenter

Flutter-implementasjon av komponentsidene i Figma-filen
[«Jakt & Fiske (Design 2024)»](https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-),
koblet til Figma med Code Connect (etikett **Flutter**).

## React-versjon (`react/`)

Samme design og funksjoner bygget som web-app (React + TypeScript + Vite + Tailwind + ArcGIS JS),
for å teste Figma Code Layers og Code Connect for React. Se [react/README.md](react/README.md).
Code Connect-malene for React ligger i `react/figma/` og bruker label «React», så Flutter- og
React-snutter vises side om side i Dev Mode.

## Design tokens

Farger, avstander, radier og typografi genereres fra Figma-variablene for både Flutter og React.
Se [tokens/README.md](tokens/README.md).

## Kom i gang
```bash
flutter create . --project-name jakt_fiske --platforms ios,android,web   # genererer plattformmapper
flutter pub get
flutter test
flutter run            # åpner komponentkatalogen (lib/main.dart), med bryter for mørk modus
```

## Struktur
| Fil | Innhold |
|---|---|
| `lib/theme/tokens.dart` | `AppPalette` (Token Colors, Light + Dark), `AppSpacing`, `AppRadius`, `AppSize` |
| `lib/theme/typography.dart` | `AppType` – Display/Headline (Cormorant Garamond), Subtitle/Body/Button (Open Sans) |
| `lib/theme/app_theme.dart` | `AppTheme.light()` / `AppTheme.dark()` |
| `lib/components/components.dart` | Designsystemet – `import 'package:jakt_fiske/components/components.dart';` |
| `lib/jakt_fiske.dart` | Designsystemet + domenekomponentene i `lib/features/*/widgets` – `import 'package:jakt_fiske/jakt_fiske.dart';` |
| `lib/features/<område>/widgets` | Domenekomponenter (gjenbrukes, har Code Connect) |
| `lib/features/<område>/screens` | Skjermer bygget av komponentene – tilsvarer «Innholdskomponenter» i Figma, ingen Code Connect |
| `figma/*.figma.ts`, `figma/icons/`, `figma/content/` | Code Connect-maler: komponentsider, ikoner/arter og 💠 Components-siden |
| `test/` | Widgettester, røyktest av katalogen og kompileringstest av alle Code Connect-snutter |

## Figma-side → Flutter
| Figma-side | Komponentsett | Flutter |
|---|---|---|
| Buttons | Button Large / Medium / Small, Button Vertical Large / Medium / Small | `AppButton(size:, orientation:, style:)` |
| Checkbox | Checkbox, checkbox icon | `AppCheckbox` |
| Chips | Chips Small / Medium / Large | `AppChip(size:)` |
| Links | Simple Text Link | `AppLink` |
| Map | Map Button, Zoom, User Location, Main Map Navigation, Secondary Map Navigation, cabin poi | `MapButton`, `MapZoomControl`, `UserLocationButton`, `MainMapNavigation`, `SecondaryMapNavigation`, `CabinPoi` |
| Radiobutton | radiobutton, radiobutton icon | `AppRadio<T>` |
| Search | Searchbar | `AppSearchBar` |
| Tab Bar | Tab Bar Button Small / Medium, Tab Bar Small / Medium | `AppTabButton`, `AppTabBar` |
| TableView | TableView Header / Cell Small / Medium / Large, Table Navigation | `AppTableHeaderCell`, `AppTableCell`, `AppTablePagination` |
| Text Input | Inputfield Small / Medium / Large | `AppTextField(size:)` |

## 💠 Components → Flutter
Siden skiller mellom byggesteiner (koblet med Code Connect) og eksempelvisninger, som ligger i seksjonen **Innholdskomponenter** og bygges som skjermer. Se prosjektdokumentet «Komponentvurdering_Components-siden».

| Figma | Flutter |
|---|---|
| Art | `SpeciesTile(species:, layout:)` |
| Filter option cell | `FilterOptionTile.check / .select / .counter / .summary` |
| Filter checkbox option cell | `FilterCheckboxTile` (Code Connect venter på publisering) |
| Card, Card Inactive | `CardTypeBadge(CardType.x, inactive:)` |
| instructions, Offline Reminder | `AppNotice`, `AppNotice.callout` |
| Search Results Section Header | `SectionHeader`, `ExpandableSection` |
| Mobile TableView Cell (Archive) | `AppListTile`, `AppListTile.toggle`, `AppToggle` |
| Segmented Control (iOS-bibliotek) | `AppSegmentedControl` |
| Telleren i Counter / Capture Item Counter | `CountStepper` |
| Offer Card `Buy` | `OfferCard(offer:)` (+ `OfferImage`) |
| Offer Card `Not Activated` / `Activated` / `Info View` | `LicenseCard(license:)`, `LicenseCard.details` |
| Hunting Card `Mini` / `Activate` / `Full` | `LicenseSummary(variant:)` |
| Activation Card | `ActivationCard(onRemove: / onReportCapture:)` |
| Activation Day, Activation Options | `DayCell`, `DayPicker` |
| Ikon + tekst-linjene i kortene | `MetaRow`, `MetaRow.parts`, `KeyValueRow` |
| Oransje «Aktiver»-knapp (Primary med overstyrt fyll) | `AppButton(style: AppButtonStyle.accent)` |
| Filter, Filter Art Fisk/Småvilt, Filter Fylke/Kommune/Jaktkort | Eksempel: én `FilterListScreen<T>` |

Prinsipper:
- **Tilstander** som hover, pressed og focus i Figma er ikke egne props; de følger ekte interaksjon (`InteractiveBuilder`).
  `disabled` = callback er `null`. `visited` og `selected` er egne props der det gir mening.
- **Farger** hentes alltid fra `AppPalette.of(context)`, aldri hardkodet, så lys og mørk modus fungerer.
- **Ikoner**: Figma-ikonene (Navigation/Home osv.) er ikke koblet ennå. I koden brukes Material-ikoner.

## Ikke implementert (bevisst)
- **Map Tool Bar, Map Measure Bar, Map Basic**: verktøy for redigering og måling, og et kartbilde. De brukes ikke i jakt- og fiskeflytene. Selve kartet blir ArcGIS `MapView`.
- **Sider merket «coming soon»** i Figma: Accordion, File Upload, Info Tags, Messages, Toggle switch.

## Avvik i Figma som bør ryddes
- **Button Secondary** har ulike farger for focus og pressed i Small, Medium og Large. Koden bruker én regel: focus gir `cta-primary-selected`, pressed gir `cta-primary-hover`.
- **TableView Cell Large** har to varianter som begge heter `Style=Odd, Content=Input`. Den ene skulle vært `Normal`. Settet har derfor feil i Figma og kan ikke publiseres eller kobles.
- **Checkbox og radio** bruker ikke-tokeniserte farger i ikonlagene (#bcb3e2, #c9ced6). Koden bruker `border-tertiary`, `cta-primary-default` og `cta-primary-disabled`, som er det skjermbildene viser.
- Komponentsettene **Chips Medium, Map Button og Main Map Navigation** er ikke publisert i biblioteket, så de mangler Code Connect-kobling.

## Prototypen på GitHub Pages

`.github/workflows/pages.yml` bygger React-appen i `react/` ved hver push til `main` (når noe i `react/` er endret) og publiserer den på https://ux-sven.github.io/statskog_hunting_app/. Komponentkatalogen ligger på samme adresse med `#katalog` til slutt.

- Slå på én gang: Settings → Pages → Source: «GitHub Actions».
- Kan også kjøres for hånd under Actions → «Publiser prototype til GitHub Pages» → Run workflow.
- Siden er offentlig og bruker alltid den falske Inatur-tjenesten. Sett aldri ekte nøkler eller `VITE_*`-adresser i bygget, de blir lesbare i nettleseren.
