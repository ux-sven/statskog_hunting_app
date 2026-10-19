import 'package:flutter/material.dart';

import '../../../components/components.dart';
import '../widgets/filter_checkbox_tile.dart';
import '../widgets/filter_option_tile.dart';

/// Felles filterliste for alle filtervisningene i Figma
/// («Filter Art Fisk», «Filter Art Småvilt», «Filter Fylke», «Filter Kommune»,
/// «Filter Jaktkort»). Disse er eksempler – én skjerm med ulik datakilde.
///
/// Med [speciesOf] vises rader med artsillustrasjon ([FilterOptionTile.check]),
/// ellers rader med avkrysning og ev. pil til underliste ([FilterCheckboxTile]).
class FilterListScreen<T> extends StatefulWidget {
  const FilterListScreen({
    super.key,
    required this.title,
    required this.items,
    required this.labelOf,
    this.speciesOf,
    this.initialSelection = const {},
    this.onOpenItem,
    this.subFilterCount,
    this.onChanged,
    this.onBack,
    this.backLabel = 'Filtrer søket',
  });

  final String title;
  final List<T> items;
  final String Function(T) labelOf;
  final Species? Function(T)? speciesOf;
  final Set<T> initialSelection;

  /// Åpner underliste for et valg (f.eks. kommuner i et fylke).
  final void Function(T)? onOpenItem;

  /// Antall aktive underfiltre for et valg.
  final int Function(T)? subFilterCount;
  final ValueChanged<Set<T>>? onChanged;
  final VoidCallback? onBack;
  final String backLabel;

  @override
  State<FilterListScreen<T>> createState() => _FilterListScreenState<T>();
}

class _FilterListScreenState<T> extends State<FilterListScreen<T>> {
  late final Set<T> _selected = {...widget.initialSelection};

  void _set(T item, bool on) {
    setState(() => on ? _selected.add(item) : _selected.remove(item));
    widget.onChanged?.call({..._selected});
  }

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    return ColoredBox(
      color: p.surfacePrimary,
      child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
        // Midlertidig topp – erstattes av SheetHeader («Map Navigation Bar»
        // `Modal Stack`) når den er bygget.
        Padding(
          padding: const EdgeInsets.fromLTRB(AppSpacing.m, AppSpacing.m, AppSpacing.m, AppSpacing.xs),
          child: Row(children: [
            AppLink(
              text: widget.backLabel,
              icon: const AppIcon(AppIcons.chevronLeftSmall),
              onTap: widget.onBack ?? () => Navigator.maybePop(context),
            ),
            const SizedBox(width: AppSpacing.m),
            Text(widget.title,
                style: AppType.bodyLarge.copyWith(color: p.textPrimary, fontWeight: FontWeight.w700)),
          ]),
        ),
        Expanded(
          child: ListView.separated(
            itemCount: widget.items.length,
            separatorBuilder: (_, __) => Container(height: 1, color: p.borderTertiary),
            itemBuilder: (context, i) {
              final item = widget.items[i];
              final selected = _selected.contains(item);
              if (widget.speciesOf != null) {
                return FilterOptionTile.check(
                  label: widget.labelOf(item),
                  species: widget.speciesOf!(item),
                  selected: selected,
                  onChanged: (v) => _set(item, v),
                );
              }
              return FilterCheckboxTile(
                label: widget.labelOf(item),
                value: selected,
                onChanged: (v) => _set(item, v ?? false),
                activeSubFilters: widget.subFilterCount?.call(item) ?? 0,
                onOpen: widget.onOpenItem == null ? null : () => widget.onOpenItem!(item),
              );
            },
          ),
        ),
      ]),
    );
  }
}
