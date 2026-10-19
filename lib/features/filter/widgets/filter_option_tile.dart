import 'package:flutter/material.dart';

import '../../../components/components.dart';
import 'species_tile.dart';

enum _Kind { check, select, counter, summary }

/// Rad i filter- og fangstlister («Filter option cell»).
///
/// Variantene i Figma er fire ulike mønstre, derfor navngitte konstruktører:
/// - `Default` / `selected` → [FilterOptionTile.check]
/// - `Default Variant` / `Selected Variant` → [FilterOptionTile.check] med
///   `checkboxFirst: true`
/// - `Select Item Closed` / `Select Item Active` → [FilterOptionTile.select]
/// - `Counter` → [FilterOptionTile.counter]
/// - `Report Counter` → [FilterOptionTile.summary]
///
/// [species] er valgfri; uten art vises bare teksten.
class FilterOptionTile extends StatelessWidget {
  /// Avkrysning. Valgt rad får grå bakgrunn.
  const FilterOptionTile.check({
    super.key,
    required this.label,
    required bool selected,
    required ValueChanged<bool>? onChanged,
    this.species,
    this.checkboxFirst = false,
  })  : _kind = _Kind.check,
        _selected = selected,
        _onChanged = onChanged,
        _onTap = null,
        _count = 0,
        _onCount = null,
        _summary = null;

  /// Rad som åpner noe mer (pil til høyre, opp når åpen).
  const FilterOptionTile.select({
    super.key,
    required this.label,
    required bool expanded,
    required VoidCallback? onTap,
    this.species,
  })  : _kind = _Kind.select,
        _selected = expanded,
        _onTap = onTap,
        _onChanged = null,
        checkboxFirst = false,
        _count = 0,
        _onCount = null,
        _summary = null;

  /// Rad med teller, f.eks. antall felt per art i fangstrapport.
  const FilterOptionTile.counter({
    super.key,
    required this.label,
    required int count,
    required ValueChanged<int>? onChanged,
    this.species,
  })  : _kind = _Kind.counter,
        _count = count,
        _onCount = onChanged,
        _selected = false,
        _onChanged = null,
        _onTap = null,
        checkboxFirst = false,
        _summary = null;

  /// Rad med en verdi til høyre, f.eks. «2 stk» i innsendt rapport.
  const FilterOptionTile.summary({
    super.key,
    required this.label,
    required String value,
    this.species,
  })  : _kind = _Kind.summary,
        _summary = value,
        _selected = false,
        _onChanged = null,
        _onTap = null,
        checkboxFirst = false,
        _count = 0,
        _onCount = null;

  final String label;
  final Species? species;
  final bool checkboxFirst;
  final _Kind _kind;
  final bool _selected;
  final ValueChanged<bool>? _onChanged;
  final VoidCallback? _onTap;
  final int _count;
  final ValueChanged<int>? _onCount;
  final String? _summary;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final text = AppType.bodyLarge.copyWith(color: p.textPrimary);
    final small = _kind != _Kind.check;

    Widget name({bool trailingIcon = false}) {
      if (species == null) return Text(label, style: text);
      return SpeciesTile(
        species: species!,
        label: label,
        layout: trailingIcon
            ? SpeciesTileLayout.horizontalTrailing
            : (small ? SpeciesTileLayout.small : SpeciesTileLayout.horizontal),
      );
    }

    final Widget row;
    switch (_kind) {
      case _Kind.check:
        final box = AppCheckbox(
          value: _selected,
          onChanged: _onChanged == null ? null : (v) => _onChanged(v ?? false),
        );
        row = checkboxFirst
            ? Row(children: [
                box,
                const SizedBox(width: AppSpacing.xs),
                Expanded(child: name(trailingIcon: true)),
              ])
            : Row(children: [Expanded(child: Align(alignment: Alignment.centerLeft, child: name())), box]);
      case _Kind.select:
        row = Row(children: [
          Expanded(child: Align(alignment: Alignment.centerLeft, child: name())),
          AppIcon(_selected ? AppIcons.chevronUp : AppIcons.chevronRight, color: p.textPrimary),
        ]);
      case _Kind.counter:
        row = Row(children: [
          Expanded(child: Align(alignment: Alignment.centerLeft, child: name())),
          CountStepper(value: _count, onChanged: _onCount),
        ]);
      case _Kind.summary:
        row = Row(children: [
          Expanded(child: Align(alignment: Alignment.centerLeft, child: name())),
          Text(_summary!, style: text),
        ]);
    }

    final highlighted = (_kind == _Kind.check || _kind == _Kind.select) && _selected;
    final double minHeight = switch (_kind) {
      _Kind.check => species == null ? 48 : 64,
      _Kind.counter => 62,
      _ => 36,
    };
    final VoidCallback? tap = switch (_kind) {
      _Kind.check => _onChanged == null ? null : () => _onChanged(!_selected),
      _Kind.select => _onTap,
      _ => null,
    };

    return Material(
      color: highlighted ? p.surfaceSecondary : p.surfacePrimary,
      child: InkWell(
        onTap: tap,
        child: ConstrainedBox(
          constraints: BoxConstraints(minHeight: minHeight),
          child: Padding(
            padding: EdgeInsets.symmetric(
                horizontal: AppSpacing.m,
                vertical: _kind == _Kind.counter ? AppSpacing.xs : 0),
            child: Align(alignment: Alignment.centerLeft, child: row),
          ),
        ),
      ),
    );
  }
}
