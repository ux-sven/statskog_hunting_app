import 'package:flutter/material.dart';

import '../theme/tokens.dart';
import '../theme/typography.dart';
import 'internal/interactive.dart';

/// Avkrysningsboks (siden «Checkbox» i Figma).
///
/// Figma → kode:
/// - «Checkbox» `State=Selected` → `value: true`
/// - `State=Unselected` → `value: false`
/// - `State=Intermediate` → `value: null` (krever [tristate])
/// - `State=Inactive` → [onChanged] er `null`
/// - `State=Hover unselected` følger ekte hover
/// - `Label` + `Show Label` → [label]
/// - «checkbox icon» (uten tekst) → [AppCheckbox] uten [label]
class AppCheckbox extends StatelessWidget {
  const AppCheckbox({
    super.key,
    required this.value,
    required this.onChanged,
    this.label,
    this.tristate = false,
  });

  final bool? value;
  final ValueChanged<bool?>? onChanged;
  final String? label;
  final bool tristate;

  void _toggle() {
    if (onChanged == null) return;
    if (tristate) {
      onChanged!(switch (value) { false => true, true => null, null => false });
    } else {
      onChanged!(!(value ?? false));
    }
  }

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    return InteractiveBuilder(
      onTap: onChanged == null ? null : _toggle,
      selected: value ?? false,
      semanticLabel: label,
      isButton: false,
      builder: (context, states) {
        final disabled = states.contains(WidgetState.disabled);
        final hovered = states.contains(WidgetState.hovered);
        final checked = value != false;
        final Color border = disabled
            ? p.ctaPrimaryDisabled
            : (checked || hovered ? p.ctaPrimaryDefault : p.borderTertiary);
        final Color? fill =
            checked ? (disabled ? p.ctaPrimaryDisabled : p.ctaPrimaryDefault) : null;
        final box = Container(
          width: 18,
          height: 18,
          decoration: BoxDecoration(
            color: fill,
            borderRadius: BorderRadius.circular(3),
            border: Border.all(color: border, width: 2),
          ),
          child: switch (value) {
            true => Icon(Icons.check, size: 14, color: p.textInvert),
            null => Center(
                child: Container(width: 9, height: 2, color: p.textInvert)),
            false => null,
          },
        );
        if (label == null) return box;
        return Row(mainAxisSize: MainAxisSize.min, children: [
          box,
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
