import 'package:flutter/material.dart';

import '../theme/tokens.dart';
import '../theme/typography.dart';
import 'internal/interactive.dart';

/// Radioknapp (siden «Radiobutton» i Figma).
///
/// Figma → kode:
/// - «radiobutton» `State=Selected` → `value == groupValue`
/// - `State=Unselected` → `value != groupValue`
/// - `State=Disabled` → [onChanged] er `null`
/// - `State=Hover` følger ekte hover
/// - `Label` + `Show Label` → [label]
/// - «radiobutton icon» (uten tekst) → [AppRadio] uten [label]
class AppRadio<T> extends StatelessWidget {
  const AppRadio({
    super.key,
    required this.value,
    required this.groupValue,
    required this.onChanged,
    this.label,
  });

  final T value;
  final T? groupValue;
  final ValueChanged<T>? onChanged;
  final String? label;

  bool get _selected => value == groupValue;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    return InteractiveBuilder(
      onTap: onChanged == null ? null : () => onChanged!(value),
      selected: _selected,
      semanticLabel: label,
      isButton: false,
      builder: (context, states) {
        final disabled = states.contains(WidgetState.disabled);
        final hovered = states.contains(WidgetState.hovered);
        final Color ring = disabled
            ? p.borderSecondary
            : (_selected || hovered ? p.ctaPrimaryDefault : p.borderTertiary);
        final circle = Container(
          width: 18,
          height: 18,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(color: ring, width: 2),
          ),
          alignment: Alignment.center,
          child: _selected
              ? Container(
                  width: 9,
                  height: 9,
                  decoration: BoxDecoration(shape: BoxShape.circle, color: ring),
                )
              : null,
        );
        if (label == null) return circle;
        return Row(mainAxisSize: MainAxisSize.min, children: [
          circle,
          const SizedBox(width: AppSpacing.xs),
          Flexible(
            child: Text(label!,
                style: AppType.bodySmall
                    .copyWith(color: disabled ? p.textTertiary : p.textPrimary)),
          ),
        ]);
      },
    );
  }
}
