import 'package:flutter/material.dart';

import '../../../components/components.dart';
import '../../../domain/format.dart';
import '../../../domain/license.dart';

/// Én dag i dagvelgeren («Activation Day»).
///
/// Figma → kode:
/// - `Default` → `selected: false`
/// - `Selected` → `selected: true`
/// - `disabled` → [onTap] er `null` (dagen er full eller ikke tilgjengelig)
class DayCell extends StatelessWidget {
  const DayCell({
    super.key,
    required this.slot,
    this.selected = false,
    this.onTap,
  });

  final ActivationSlot slot;
  final bool selected;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final disabled = onTap == null;
    final Color fg = disabled
        ? p.ctaPrimaryDisabled
        : selected
            ? p.textInvert
            : p.textPrimary;
    final small = AppType.bodySmall.copyWith(color: fg);
    Widget band(String text) => Padding(
          // Figma har 16 px sidepolstring, men teksten skal ikke brytes i 80 px.
          padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 4),
          child: Text(text, style: small, textAlign: TextAlign.center, maxLines: 1, softWrap: false),
        );

    final d = slot.date;
    return Semantics(
      button: true,
      selected: selected,
      enabled: !disabled,
      label: '${weekdayShort(d)} ${d.day}. ${monthShort(d)}, ${slot.used} av ${slot.capacity} brukt',
      excludeSemantics: true,
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          width: 80,
          clipBehavior: Clip.antiAlias,
          decoration: BoxDecoration(
            color: disabled
                ? p.surfacePrimary
                : selected
                    ? p.surfaceTertiary
                    : p.surfaceSecondary,
            borderRadius: BorderRadius.circular(AppRadius.s),
            border: Border.all(
              color: disabled
                  ? p.borderPrimary
                  : selected
                      ? p.borderInvert
                      : p.ctaPrimaryDefault,
              width: selected ? 2 : 1,
            ),
          ),
          child: Column(mainAxisSize: MainAxisSize.min, children: [
            band(weekdayShort(d)),
            Container(
              width: double.infinity,
              color: selected ? null : p.surfacePrimary,
              padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 4),
              child: Column(children: [
                Text('${d.day}',
                    style: AppType.bodyLarge.copyWith(color: fg, fontWeight: FontWeight.w700, height: 17 / 16)),
                Text(monthShort(d),
                    style: small.copyWith(
                        color: disabled || selected ? fg : p.textSecondary)),
              ]),
            ),
            band('${slot.used} / ${slot.capacity}'),
          ]),
        ),
      ),
    );
  }
}

/// Velg dager for aktivering – vannrett liste med [DayCell]
/// («Activation Options» er et eksempel på denne med ti dager).
class DayPicker extends StatelessWidget {
  const DayPicker({
    super.key,
    required this.slots,
    required this.selected,
    required this.onToggle,
  });

  final List<ActivationSlot> slots;
  final Set<DateTime> selected;
  final ValueChanged<DateTime> onToggle;

  static DateTime _day(DateTime d) => DateTime(d.year, d.month, d.day);

  @override
  Widget build(BuildContext context) {
    final sel = {for (final d in selected) _day(d)};
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
        for (final (i, s) in slots.indexed) ...[
          if (i > 0) const SizedBox(width: AppSpacing.xs),
          DayCell(
            slot: s,
            selected: sel.contains(_day(s.date)),
            // En valgt dag kan alltid velges bort, også når den er full.
            onTap: s.available && (!s.isFull || sel.contains(_day(s.date)))
                ? () => onToggle(_day(s.date))
                : null,
          ),
        ],
      ]),
    );
  }
}
