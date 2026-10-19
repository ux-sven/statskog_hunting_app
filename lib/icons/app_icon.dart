import 'package:flutter/widgets.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../domain/species.dart';
import '../theme/tokens.dart';
import 'app_icons.dart';

/// Ikon fra designsystemet.
///
/// Farge og størrelse hentes fra omgivende [IconTheme] når de ikke er satt.
/// Komponentene (knapper, lenker, kartknapper …) setter riktig farge for
/// hver tilstand, så [AppIcon] trenger normalt ingen argumenter utover ikonet:
///
/// ```dart
/// AppButton(label: 'Kjøp', leadingIcon: const AppIcon(AppIcons.priceTag), onPressed: …)
/// ```
class AppIcon extends StatelessWidget {
  const AppIcon(this.icon, {super.key, this.size, this.color, this.semanticLabel});

  final AppIcons icon;
  final double? size;
  final Color? color;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final theme = IconTheme.of(context);
    final s = size ?? theme.size ?? 24;
    final c = color ?? theme.color ?? AppPalette.of(context).textPrimary;
    return SvgPicture.asset(
      icon.assetPath,
      width: s,
      height: s,
      fit: BoxFit.contain,
      colorFilter: icon.multicolor ? null : ColorFilter.mode(c, BlendMode.srcIn),
      semanticsLabel: semanticLabel,
      excludeFromSemantics: semanticLabel == null,
    );
  }
}

/// Artsillustrasjon fra Figma-rammen «Arter» (120 × 120 i Figma).
///
/// Standardfarge er `border-invert` (#337A70 i lys modus), som i Figma.
class SpeciesIcon extends StatelessWidget {
  const SpeciesIcon(this.species, {super.key, this.size = 48, this.color});

  final Species species;
  final double size;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    final c = color ?? AppPalette.of(context).borderInvert;
    return SvgPicture.asset(
      species.assetPath,
      width: size,
      height: size,
      colorFilter: ColorFilter.mode(c, BlendMode.srcIn),
      semanticsLabel: species.label,
    );
  }
}
