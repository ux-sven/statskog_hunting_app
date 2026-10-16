import 'package:flutter/material.dart';

import '../theme/tokens.dart';
import '../theme/typography.dart';
import 'app_button.dart';
import 'app_checkbox.dart';
import 'app_link.dart';

EdgeInsets _cellPadding(AppSize size) => switch (size) {
      AppSize.small => const EdgeInsets.all(8),
      AppSize.medium => const EdgeInsets.all(16),
      AppSize.large => const EdgeInsets.all(24),
    };

TextStyle _cellText(AppSize size) => switch (size) {
      AppSize.small => AppType.bodySmall,
      AppSize.medium => AppType.bodyMedium,
      AppSize.large => AppType.bodyLarge,
    };

/// Sorteringstilstand for en kolonne.
enum AppSortState { unsorted, ascending, descending }

/// Kolonneoverskrift («TableView Header Small / Medium / Large»).
///
/// Figma → kode:
/// - Settnavn → [size]
/// - `Label` → [label]
/// - `Content=Number` → [numeric] (høyrejustert)
/// - `Show Sort` → [onSort] satt; [sortState] gir ikonet
/// - `Show Filter` → [onFilter] satt
/// - `Style=Checkbox` / `Show Checkbox` → [checkboxValue] + [onCheckboxChanged]
class AppTableHeaderCell extends StatelessWidget {
  const AppTableHeaderCell({
    super.key,
    this.label,
    this.size = AppSize.medium,
    this.numeric = false,
    this.sortState = AppSortState.unsorted,
    this.onSort,
    this.onFilter,
    this.checkboxValue,
    this.onCheckboxChanged,
  });

  final String? label;
  final AppSize size;
  final bool numeric;
  final AppSortState sortState;
  final VoidCallback? onSort;
  final VoidCallback? onFilter;
  final bool? checkboxValue;
  final ValueChanged<bool?>? onCheckboxChanged;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final hasCheckbox = onCheckboxChanged != null;
    return Container(
      padding: hasCheckbox && label == null ? const EdgeInsets.all(8) : _cellPadding(size),
      decoration: BoxDecoration(
        color: p.surfaceTableviewHeader,
        border: Border.all(color: p.borderSecondary),
      ),
      child: Row(
        mainAxisAlignment: numeric ? MainAxisAlignment.end : MainAxisAlignment.start,
        children: [
          if (hasCheckbox)
            AppCheckbox(value: checkboxValue, tristate: true, onChanged: onCheckboxChanged),
          if (hasCheckbox && label != null) const SizedBox(width: AppSpacing.xs),
          if (label != null)
            Flexible(
              child: Text(label!,
                  style: _cellText(size)
                      .copyWith(color: p.textPrimary, fontWeight: FontWeight.w700)),
            ),
          if (onSort != null)
            IconButton(
              visualDensity: VisualDensity.compact,
              tooltip: 'Sorter',
              onPressed: onSort,
              icon: Icon(
                switch (sortState) {
                  AppSortState.unsorted => Icons.unfold_more,
                  AppSortState.ascending => Icons.arrow_upward,
                  AppSortState.descending => Icons.arrow_downward,
                },
                size: 16,
                color: p.ctaPrimaryDefault,
              ),
            ),
          if (onFilter != null)
            IconButton(
              visualDensity: VisualDensity.compact,
              tooltip: 'Filtrer',
              onPressed: onFilter,
              icon: Icon(Icons.filter_list, size: 16, color: p.ctaPrimaryDefault),
            ),
        ],
      ),
    );
  }
}

/// Innhold i en tabellcelle – Figma `Content`.
enum AppTableCellContent { text, number, link, input, icon, status }

/// Tabellcelle («TableView Cell Small / Medium / Large»).
///
/// Figma → kode:
/// - Settnavn → [size]
/// - `Style=Odd` → [odd] (annenhver rad)
/// - `Content` → [content]
/// - `Label` → [text]
/// - `Show checkbox` → [checkboxValue] + [onCheckboxChanged]
class AppTableCell extends StatelessWidget {
  const AppTableCell({
    super.key,
    required this.text,
    this.size = AppSize.medium,
    this.odd = false,
    this.content = AppTableCellContent.text,
    this.onTap,
    this.icon,
    this.statusColor,
    this.checkboxValue,
    this.onCheckboxChanged,
    this.input,
  });

  final String text;
  final AppSize size;
  final bool odd;
  final AppTableCellContent content;

  /// Brukes når [content] er `link`.
  final VoidCallback? onTap;

  /// Brukes når [content] er `icon`.
  final Widget? icon;

  /// Bakgrunn for `status` (standard: attention/warning).
  final Color? statusColor;

  final bool? checkboxValue;
  final ValueChanged<bool?>? onCheckboxChanged;

  /// Eget felt når [content] er `input` (f.eks. [AppTextField]).
  final Widget? input;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final style = _cellText(size).copyWith(color: p.textPrimary);
    final Widget child = switch (content) {
      AppTableCellContent.text => Text(text, style: style),
      AppTableCellContent.number =>
        Align(alignment: Alignment.centerRight, child: Text(text, style: style)),
      AppTableCellContent.link => AppLink(text: text, onTap: onTap),
      AppTableCellContent.input => input ?? Text(text, style: style),
      AppTableCellContent.icon => Row(mainAxisSize: MainAxisSize.min, children: [
          if (icon != null) ...[
            IconTheme.merge(
                data: IconThemeData(color: p.ctaPrimaryDefault, size: 18), child: icon!),
            const SizedBox(width: AppSpacing.xs),
          ],
          Flexible(child: Text(text, style: style)),
        ]),
      AppTableCellContent.status => Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
          decoration: BoxDecoration(
            color: statusColor ?? p.attentionWarning,
            borderRadius: BorderRadius.circular(2),
          ),
          child: Text(text, style: style.copyWith(color: p.textInvert)),
        ),
    };
    final hasCheckbox = onCheckboxChanged != null;
    return Container(
      padding: content == AppTableCellContent.input
          ? (size == AppSize.small
              ? const EdgeInsets.all(8)
              : const EdgeInsets.symmetric(vertical: 8, horizontal: 12))
          : _cellPadding(size),
      color: odd ? p.surfaceTableviewOdd : p.surfacePrimary,
      child: Row(children: [
        if (hasCheckbox) ...[
          AppCheckbox(value: checkboxValue ?? false, onChanged: onCheckboxChanged),
          const SizedBox(width: AppSpacing.s),
        ],
        Expanded(child: child),
      ]),
    );
  }
}

/// Paginering under tabell («Table Navigation»).
///
/// Figma → kode:
/// - `Size` → [size]
/// - `Property 1=Variant 1` (sideknapper) → [AppTablePagination]
/// - `Property 1=Variant 2` («Side 1 av 8») → [AppTablePagination.compact]
class AppTablePagination extends StatelessWidget {
  const AppTablePagination({
    super.key,
    required this.currentPage,
    required this.pageCount,
    required this.onPageChanged,
    this.size = AppSize.medium,
  }) : compact = false;

  const AppTablePagination.compact({
    super.key,
    required this.currentPage,
    required this.pageCount,
    required this.onPageChanged,
    this.size = AppSize.medium,
  }) : compact = true;

  /// 1-basert.
  final int currentPage;
  final int pageCount;
  final ValueChanged<int> onPageChanged;
  final AppSize size;
  final bool compact;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final textStyle = _cellText(size).copyWith(color: p.textPrimary);
    final prev = AppButton(
      size: size,
      style: AppButtonStyle.secondary,
      leadingIcon: const Icon(Icons.chevron_left),
      onPressed: currentPage > 1 ? () => onPageChanged(currentPage - 1) : null,
    );
    final next = AppButton(
      size: size,
      style: AppButtonStyle.secondary,
      leadingIcon: const Icon(Icons.chevron_right),
      onPressed:
          currentPage < pageCount ? () => onPageChanged(currentPage + 1) : null,
    );

    if (compact) {
      return Row(mainAxisSize: MainAxisSize.min, children: [
        prev,
        const SizedBox(width: AppSpacing.xs),
        Text('Side $currentPage av $pageCount', style: textStyle),
        const SizedBox(width: AppSpacing.xs),
        next,
      ]);
    }

    // Viser første side, nabosider og siste side, med «…» imellom.
    final pages = <int?>[];
    for (var i = 1; i <= pageCount; i++) {
      if (i == 1 || i == pageCount || (i - currentPage).abs() <= 1) {
        pages.add(i);
      } else if (pages.isNotEmpty && pages.last != null) {
        pages.add(null);
      }
    }
    return Wrap(spacing: 2, crossAxisAlignment: WrapCrossAlignment.center, children: [
      prev,
      for (final n in pages)
        n == null
            ? Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8),
                child: Text('…', style: textStyle.copyWith(color: p.ctaPrimaryDefault)),
              )
            : AppButton(
                size: size,
                style: n == currentPage
                    ? AppButtonStyle.primary
                    : AppButtonStyle.secondary,
                label: '$n',
                onPressed: () => onPageChanged(n),
              ),
      next,
    ]);
  }
}
