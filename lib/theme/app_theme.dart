import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'tokens.dart';

/// Material-tema bygget på Figma-tokens. Komponentene henter farger fra
/// [AppPalette]-utvidelsen, så både lys og mørk modus fungerer.
abstract final class AppTheme {
  static ThemeData light() => _build(AppPalette.light, Brightness.light);
  static ThemeData dark() => _build(AppPalette.dark, Brightness.dark);

  static ThemeData _build(AppPalette p, Brightness brightness) {
    final scheme = ColorScheme.fromSeed(
      seedColor: p.ctaPrimaryDefault,
      brightness: brightness,
    ).copyWith(
      primary: p.ctaPrimaryDefault,
      onPrimary: p.textInvert,
      surface: p.surfacePrimary,
      onSurface: p.textPrimary,
      error: p.attentionError,
      outline: p.borderSecondary,
    );
    return ThemeData(
      colorScheme: scheme,
      scaffoldBackgroundColor: p.surfacePrimary,
      textTheme: GoogleFonts.openSansTextTheme(
        ThemeData(brightness: brightness).textTheme,
      ).apply(bodyColor: p.textPrimary, displayColor: p.textPrimary),
      extensions: [p],
    );
  }
}
