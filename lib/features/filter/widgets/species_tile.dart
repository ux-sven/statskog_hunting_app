import 'package:flutter/material.dart';

import '../../../components/components.dart';

/// Hvordan art-illustrasjon og navn er plassert («Art» `Property 1`).
enum SpeciesTileLayout {
  /// Illustrasjon (72) over navnet – `Vertical`.
  vertical,

  /// Illustrasjon (64) til venstre for navnet – `Horisontal`.
  horizontal,

  /// Navnet til venstre og illustrasjonen (64) til høyre – `Horisontal Variant`.
  horizontalTrailing,

  /// Liten illustrasjon (36) til venstre – `Horisontal Small`.
  small,
}

/// Art med illustrasjon og navn («Art» på Components-siden).
///
/// Figma → kode:
/// - `Arttype` (ikonbytte) → [species]
/// - `Artsnavn` → [label] (standard: artens navn)
/// - `Property 1` → [layout]
class SpeciesTile extends StatelessWidget {
  const SpeciesTile({
    super.key,
    required this.species,
    this.label,
    this.layout = SpeciesTileLayout.vertical,
  });

  final Species species;
  final String? label;
  final SpeciesTileLayout layout;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final name = label ?? species.label;
    switch (layout) {
      case SpeciesTileLayout.vertical:
        return Column(mainAxisSize: MainAxisSize.min, children: [
          SpeciesIcon(species, size: 72),
          Text(name,
              textAlign: TextAlign.center,
              style: AppType.bodySmall.copyWith(color: p.textPrimary)),
        ]);
      case SpeciesTileLayout.horizontalTrailing:
        return Row(children: [
          Expanded(child: Text(name, style: AppType.bodyLarge.copyWith(color: p.textPrimary))),
          const SizedBox(width: AppSpacing.s),
          SpeciesIcon(species, size: 64),
        ]);
      case SpeciesTileLayout.horizontal:
      case SpeciesTileLayout.small:
        final small = layout == SpeciesTileLayout.small;
        return Row(mainAxisSize: MainAxisSize.min, children: [
          SpeciesIcon(species, size: small ? 36 : 64),
          SizedBox(width: small ? AppSpacing.xs : AppSpacing.s),
          Flexible(child: Text(name, style: AppType.bodyLarge.copyWith(color: p.textPrimary))),
        ]);
    }
  }
}
