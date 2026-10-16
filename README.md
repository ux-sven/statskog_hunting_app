# Jakt & fiske – Flutter-skjelett for Figma Code Connect

Første test av koblingen mellom designet i Figma («Jakt & Fiske (Design 2024)») og Flutter-koden.

## Innhold
- `lib/theme/tokens.dart` – fargetokens fra Figma-variablene (Light-modus)
- `lib/components/app_button.dart` – `AppButton`, kodeversjonen av «Button Medium» / «Buy Button»
- `lib/main.dart` – komponentvisning, for visuell sammenligning med Figma
- `figma/app_button.figma.ts` – Code Connect-mal som viser Dart-kode i Dev Mode
- `figma.config.json` – Code Connect-oppsett (label: Flutter)

## Kom i gang
```bash
flutter create . --project-name jakt_fiske --platforms ios,android   # genererer ios/ og android/
flutter pub get
flutter test
flutter run
```

## Mapping Figma → Flutter (AppButton)
| Figma | Flutter |
|---|---|
| Style = Primary/Secondary/Tertiary | `style: AppButtonStyle.primary/secondary/tertiary` |
| Label + Show Label | `label:` (utelatt = kun ikon) |
| Left Icon + Left Icon Type | `leadingIcon:` |
| Right Icon + Right Icon Type | `trailingIcon:` |
| State = disabled | `onPressed: null` |
| State = pressed/focus | håndteres av Flutter (WidgetState) |
| State = visited | ikke implementert (ingen motpart i appen) |
