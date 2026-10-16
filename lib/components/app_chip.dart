import 'package:flutter/material.dart';

import '../theme/tokens.dart';
import '../theme/typography.dart';
import 'internal/interactive.dart';

/// Chip / filterbrikke (siden «Chips» i Figma).
///
/// Figma → kode:
/// - «Chips Small / Medium / Large» → [size]
/// - `Label` → [label]
/// - `Property 1=selected` → [selected]
/// - `Property 1=disabled` → [onSelected] er `null`
/// - `Property 1=hover/focus` følger ekte interaksjon
/// - `Show Icon` + `Icon` (lukkeknappen til høyre) → [onDeleted]
class AppChip extends StatelessWidget {
  const AppChip({
    super.key,
    required this.label,
    this.size = AppSize.small,
    this.selected = false,
    this.onSelected,
    this.onDeleted,
    this.enabled = true,
  });

  final String label;
  final AppSize size;
  final bool selected;
  final ValueChanged<bool>? onSelected;

  /// Viser lukkeknappen (×) når satt.
  final VoidCallback? onDeleted;

  /// `false` gir Figma `Property 1=disabled`.
  final bool enabled;

  double get _height => switch (size) {
        AppSize.small => 32,
        AppSize.medium => 38,
        AppSize.large => 42,
      };

  double get _radius => size == AppSize.medium ? AppRadius.m : AppRadius.xxl;

  TextStyle get _text => switch (size) {
        AppSize.small => AppType.bodySmall,
        AppSize.medium => AppType.bodyLarge,
        AppSize.large => AppType.subtitleLarge,
      };

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    return InteractiveBuilder(
      onTap: enabled && onSelected != null ? () => onSelected!(!selected) : null,
      selected: selected,
      semanticLabel: label,
      builder: (context, states) {
        final disabled = !enabled;
        final focused = states.contains(WidgetState.focused);
        final hovered = states.contains(WidgetState.hovered);
        final Color bg = selected
            ? p.surfaceInvert
            : (hovered ? p.surfaceSecondary : p.surfacePrimary);
        final Color border = disabled
            ? p.borderPrimary
            : (selected || focused ? p.borderInvert : p.borderSecondary);
        final Color fg = disabled
            ? p.ctaPrimaryDisabled
            : selected
                ? p.textInvert
                : (hovered || focused ? p.ctaPrimaryHover : p.textPrimary);
        return Container(
          height: _height,
          decoration: BoxDecoration(
            color: bg,
            borderRadius: BorderRadius.circular(_radius),
            border: Border.all(color: border, width: focused ? 2 : 1),
          ),
          clipBehavior: Clip.antiAlias,
          child: Row(mainAxisSize: MainAxisSize.min, children: [
            Padding(
              padding: EdgeInsets.only(
                  left: AppSpacing.s, right: onDeleted == null ? AppSpacing.s : 4),
              child: Text(label, style: _text.copyWith(color: fg)),
            ),
            if (onDeleted != null)
              Semantics(
                button: true,
                label: 'Fjern $label',
                child: GestureDetector(
                  behavior: HitTestBehavior.opaque,
                  onTap: enabled ? onDeleted : null,
                  child: Container(
                    width: size == AppSize.large ? 36 : 28,
                    height: double.infinity,
                    color: selected ? p.surfaceSecondary : null,
                    alignment: Alignment.center,
                    child: Icon(Icons.close,
                        size: size == AppSize.large ? 20 : 16,
                        color: disabled ? p.ctaPrimaryDisabled : p.ctaPrimaryDefault),
                  ),
                ),
              ),
          ]),
        );
      },
    );
  }
}
