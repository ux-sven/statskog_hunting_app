import 'package:flutter/material.dart';

import '../icons/app_icon.dart';
import '../icons/app_icons.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';

/// Hvordan teksten i en [AppListTile] er plassert.
enum AppListTileLayout {
  /// Hovedtekst med undertekst under (Figma `Cell Type=Default Cell`).
  stacked,

  /// Hovedtekst til venstre, undertekst til høyre (Figma `Cell Type=Default Cell 2`).
  inline,
}

/// Rad i en liste, f.eks. i Innstillinger og Offline kart
/// («Mobile TableView Cell», ligger på Archive-siden i Figma).
///
/// Figma → kode:
/// - `Main Text` → [title]
/// - `Show SubText` + `Sub Text` → [subtitle]
/// - `Show Icon` + `Icon Type` → [icon]
/// - `Show Accessory View` → [onTap] satt; `Accessory Icon` → [trailingIcon]
/// - `State=Toggle` → [AppListTile.toggle]
/// - `State=Delete` → [onDelete] (rød slett-knapp til høyre)
/// - `Show separator` → [showSeparator]
class AppListTile extends StatelessWidget {
  const AppListTile({
    super.key,
    required this.title,
    this.subtitle,
    this.icon,
    this.layout = AppListTileLayout.stacked,
    this.onTap,
    this.onDelete,
    this.trailingIcon = AppIcons.chevronRight,
    this.showSeparator = true,
  })  : toggleValue = null,
        onToggle = null;

  const AppListTile.toggle({
    super.key,
    required this.title,
    required bool value,
    required ValueChanged<bool>? onChanged,
    this.subtitle,
    this.icon,
    this.showSeparator = true,
  })  : toggleValue = value,
        onToggle = onChanged,
        layout = AppListTileLayout.stacked,
        onTap = null,
        onDelete = null,
        trailingIcon = AppIcons.chevronRight;

  final String title;
  final String? subtitle;
  final AppIcons? icon;
  final AppListTileLayout layout;
  final VoidCallback? onTap;
  final VoidCallback? onDelete;

  /// Ikonet til høyre når raden kan trykkes (Figma `Accessory Icon`).
  final AppIcons trailingIcon;
  final bool showSeparator;
  final bool? toggleValue;
  final ValueChanged<bool>? onToggle;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final main = AppType.bodyMedium.copyWith(color: p.textPrimary);
    final sub = AppType.bodySmall.copyWith(color: p.textSecondary);
    final isToggle = toggleValue != null;

    final Widget labels = layout == AppListTileLayout.stacked
        ? Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(title, style: main),
              if (subtitle != null) Text(subtitle!, style: sub),
            ],
          )
        : Row(children: [
            Expanded(child: Text(title, style: main)),
            if (subtitle != null) Text(subtitle!, style: sub),
          ]);

    final content = Row(children: [
      if (icon != null) ...[
        AppIcon(icon!, size: 20, color: p.attentionSuccess),
        const SizedBox(width: AppSpacing.xs),
      ],
      Expanded(
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: AppSpacing.xs),
          child: labels,
        ),
      ),
      if (isToggle) ...[
        const SizedBox(width: AppSpacing.xs),
        AppToggle(value: toggleValue!, onChanged: onToggle),
        const SizedBox(width: AppSpacing.m),
      ] else ...[
        if (onTap != null) ...[
          const SizedBox(width: AppSpacing.xs),
          AppIcon(trailingIcon, size: 16, color: p.ctaPrimaryDefault),
        ],
        if (onDelete == null) const SizedBox(width: AppSpacing.m),
      ],
    ]);

    Widget row = ConstrainedBox(
      constraints: const BoxConstraints(minHeight: 48),
      child: IntrinsicHeight(
        child: Row(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
          Expanded(child: content),
          if (onDelete != null) ...[
            const SizedBox(width: AppSpacing.xs),
            Semantics(
              button: true,
              label: 'Slett $title',
              child: GestureDetector(
                onTap: onDelete,
                child: Container(
                  color: p.attentionError,
                  padding: const EdgeInsets.symmetric(horizontal: AppSpacing.m),
                  alignment: Alignment.center,
                  child: AppIcon(AppIcons.trash, size: 16, color: p.textInvert),
                ),
              ),
            ),
          ],
        ]),
      ),
    );

    if (onTap != null) row = InkWell(onTap: onTap, child: row);
    if (isToggle && onToggle != null) {
      row = InkWell(onTap: () => onToggle!(!toggleValue!), child: row);
    }

    return Material(
      color: p.surfacePrimary,
      child: Padding(
        padding: const EdgeInsets.only(left: AppSpacing.m),
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          row,
          if (showSeparator) Container(height: 1, color: p.borderPrimary),
        ]),
      ),
    );
  }
}

/// Av/på-bryter (Figma «Toggle», iOS-stil).
class AppToggle extends StatelessWidget {
  const AppToggle({super.key, required this.value, required this.onChanged});

  final bool value;
  final ValueChanged<bool>? onChanged;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    return Semantics(
      toggled: value,
      enabled: onChanged != null,
      child: GestureDetector(
        onTap: onChanged == null ? null : () => onChanged!(!value),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 150),
          width: 51,
          height: 31,
          padding: const EdgeInsets.all(2),
          alignment: value ? Alignment.centerRight : Alignment.centerLeft,
          decoration: BoxDecoration(
            color: value ? p.ctaPrimarySelected : p.ctaPrimaryDisabled,
            borderRadius: BorderRadius.circular(AppRadius.full),
          ),
          child: Container(
            width: 27,
            height: 27,
            decoration: const BoxDecoration(
              color: Colors.white,
              shape: BoxShape.circle,
              boxShadow: [
                BoxShadow(color: Color(0x26000000), offset: Offset(0, 3), blurRadius: 8),
                BoxShadow(color: Color(0x0F000000), offset: Offset(0, 3), blurRadius: 1),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
