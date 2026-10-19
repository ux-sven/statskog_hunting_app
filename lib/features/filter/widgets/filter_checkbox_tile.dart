import 'package:flutter/material.dart';

import '../../../components/components.dart';

/// Filtervalg med avkrysning og eventuelt underfilter
/// («Filter checkbox option cell»).
///
/// Figma → kode:
/// - Checkbox-etiketten → [label], [value], [onChanged]
/// - `Show selected filter` (brikken «(1) Aktivt filter») → [activeSubFilters] > 0
/// - `Show chevron` → [onOpen] satt (åpner underliste, f.eks. kommuner i et fylke)
class FilterCheckboxTile extends StatelessWidget {
  const FilterCheckboxTile({
    super.key,
    required this.label,
    required this.value,
    required this.onChanged,
    this.activeSubFilters = 0,
    this.onClearSubFilters,
    this.onOpen,
  });

  final String label;
  final bool? value;
  final ValueChanged<bool?>? onChanged;
  final int activeSubFilters;
  final VoidCallback? onClearSubFilters;
  final VoidCallback? onOpen;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    return Material(
      color: p.surfacePrimary,
      child: InkWell(
        onTap: onOpen,
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.m),
          child: Row(children: [
            Expanded(
              child: Align(
                alignment: Alignment.centerLeft,
                child: AppCheckbox(value: value, label: label, tristate: value == null, onChanged: onChanged),
              ),
            ),
            if (activeSubFilters > 0) ...[
              const SizedBox(width: AppSpacing.s),
              Flexible(
                child: AppChip(
                  label: '($activeSubFilters) Aktivt filter',
                  size: AppSize.medium,
                  onDeleted: onClearSubFilters,
                ),
              ),
            ],
            if (onOpen != null) ...[
              const SizedBox(width: AppSpacing.s),
              AppIcon(AppIcons.chevronRight, size: 16, color: p.textPrimary),
            ],
          ]),
        ),
      ),
    );
  }
}
