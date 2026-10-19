// GENERERT av tools/tokens/build.mjs fra tokens/figma-variables.json. Ikke rediger for hånd.
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';

import 'tokens.dart';

/// Typografi fra Figma-samlingen «Typography» (modus Mobile).
abstract final class AppType {
  static TextStyle _style(String family, double size, double lineHeight) =>
      GoogleFonts.getFont(family, fontSize: size, height: lineHeight / size, fontWeight: FontWeight.w400);

  /// Cormorant Garamond 80/152
  static TextStyle get displayLarge => _style('Cormorant Garamond', 80.0, 152.0);
  /// Cormorant Garamond 44/92
  static TextStyle get displayMedium => _style('Cormorant Garamond', 44.0, 92.0);
  /// Cormorant Garamond 36/72
  static TextStyle get displaySmall => _style('Cormorant Garamond', 36.0, 72.0);
  /// Cormorant Garamond 30/46
  static TextStyle get headlineH1 => _style('Cormorant Garamond', 30.0, 46.0);
  /// Cormorant Garamond 24/38
  static TextStyle get headlineH2 => _style('Cormorant Garamond', 24.0, 38.0);
  /// Cormorant Garamond 20/30
  static TextStyle get headlineH3 => _style('Cormorant Garamond', 20.0, 30.0);
  /// Open Sans 18/28
  static TextStyle get subtitleLarge => _style('Open Sans', 18.0, 28.0);
  /// Open Sans 16/28
  static TextStyle get subtitleSmall => _style('Open Sans', 16.0, 28.0);
  /// Open Sans 16/24
  static TextStyle get bodyLarge => _style('Open Sans', 16.0, 24.0);
  /// Open Sans 15/23
  static TextStyle get bodyMedium => _style('Open Sans', 15.0, 23.0);
  /// Open Sans 14/22
  static TextStyle get bodySmall => _style('Open Sans', 14.0, 22.0);
  /// Open Sans 12/20
  static TextStyle get bodyXtraSmall => _style('Open Sans', 12.0, 20.0);
  /// Open Sans 18/24
  static TextStyle get buttonLarge => _style('Open Sans', 18.0, 24.0);
  /// Open Sans 16/22
  static TextStyle get buttonMedium => _style('Open Sans', 16.0, 22.0);
  /// Open Sans 14/20
  static TextStyle get buttonSmall => _style('Open Sans', 14.0, 20.0);

  /// Knappetekst per størrelse.
  static TextStyle button(AppSize size) => switch (size) {
        AppSize.small => buttonSmall,
        AppSize.medium => buttonMedium,
        AppSize.large => buttonLarge,
      };
}
