# Statskog jakt & fiske – Flutter-komponenter

Flutter-implementasjon av komponentsidene i Figma-filen
[«Jakt & Fiske (Design 2024)»](https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-),
koblet til Figma med Code Connect (etikett **Flutter**).

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
| `lib/components/components.dart` | Eksporterer alt – bruk `import 'package:jakt_fiske/components/components.dart';` |
| `figma/*.figma.ts` | Code Connect-maler (én per komponentsett) |
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
