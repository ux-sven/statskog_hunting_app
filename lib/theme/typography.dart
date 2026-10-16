import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';

import 'tokens.dart';

/// Typografi fra Figma-samlingen «Typography» (modus Mobile).
/// Display/Headline: Cormorant Garamond. Subtitle/Body/Button: Open Sans.
abstract final class AppType {
  static TextStyle _open(double size, double lineHeight,
          {FontWeight weight = FontWeight.w400}) =>
      GoogleFonts.openSans(
          fontSize: size, height: lineHeight / size, fontWeight: weight);

  static TextStyle _garamond(double size, double lineHeight,
          {FontWeight weight = FontWeight.w400}) =>
      GoogleFonts.cormorantGaramond(
          fontSize: size, height: lineHeight / size, fontWeight: weight);

  // Display
  static TextStyle get displayLarge => _garamond(80, 152);
  static TextStyle get displayMedium => _garamond(44, 92);
  static TextStyle get displaySmall => _garamond(36, 72);

  // Headline
  static TextStyle get headlineH1 => _garamond(30, 46);
  static TextStyle get headlineH2 => _garamond(24, 38);
  static TextStyle get headlineH3 => _garamond(20, 30);

  // Subtitle
  static TextStyle get subtitleLarge => _open(18, 28);
  static TextStyle get subtitleSmall => _open(16, 28);

  // Body
  static TextStyle get bodyLarge => _open(16, 24);
  static TextStyle get bodyMedium => _open(15, 23);
  static TextStyle get bodySmall => _open(14, 22);
  static TextStyle get bodyXtraSmall => _open(12, 20);

  // Button
  static TextStyle get buttonLarge => _open(18, 24);
  static TextStyle get buttonMedium => _open(16, 22);
  static TextStyle get buttonSmall => _open(14, 20);

  /// Knappetekst per størrelse.
  static TextStyle button(AppSize size) => switch (size) {
        AppSize.small => buttonSmall,
        AppSize.medium => buttonMedium,
        AppSize.large => buttonLarge,
      };
}
