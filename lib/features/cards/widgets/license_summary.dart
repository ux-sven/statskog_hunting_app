import 'package:flutter/material.dart';

import '../../../components/components.dart';
import '../../../domain/format.dart';
import '../../../domain/license.dart';

/// Visning av [LicenseSummary] («Hunting Card» `Property 1`).
enum LicenseSummaryVariant {
  /// Kortnr, navn, periode og arter – `Mini`.
  mini,

  /// Som [mini] med pris – `Activate`.
  withPrice,

  /// Alt om kortet med jeger og knapper – `Full`. Toppen med «Kortnr» og
  /// lukkeknapp i Figma kommer fra arket (Map Navigation Bar `Drawer`).
  full,
}

/// Oppsummering av et jaktkort med navnet i en grå boks («Hunting Card»).
class LicenseSummary extends StatelessWidget {
  const LicenseSummary({
    super.key,
    required this.license,
    this.variant = LicenseSummaryVariant.mini,
    this.onActivate,
    this.onDocumentation,
    this.onShowInMap,
  });

  final HuntingLicense license;
  final LicenseSummaryVariant variant;
  final VoidCallback? onActivate;
  final VoidCallback? onDocumentation;
  final VoidCallback? onShowInMap;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final l = license;
    final full = variant == LicenseSummaryVariant.full;
    final small = AppType.bodySmall.copyWith(color: p.textPrimary);

    final nameBox = Container(
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.m, vertical: AppSpacing.xs),
      decoration: BoxDecoration(
        color: p.surfaceSecondary,
        border: Border.all(color: p.borderSecondary),
        borderRadius: BorderRadius.circular(AppRadius.m),
      ),
      child: Text(l.title,
          style: (full ? AppType.subtitleLarge : AppType.bodyLarge).copyWith(color: p.textPrimary)),
    );

    final rows = <Widget>[
      MetaRow.parts(
          icon: AppIcons.schedule,
          parts: [for (final d in l.validDates) formatDate(d)],
          style: small),
      if (variant != LicenseSummaryVariant.mini && l.price != null)
        MetaRow(icon: AppIcons.priceTag, text: 'kr ${formatKroner(l.price!)}', style: small),
      MetaRow(icon: AppIcons.accuracy, text: l.speciesText, style: small),
    ];

    if (!full) {
      return Container(
        padding: const EdgeInsets.all(AppSpacing.m),
        decoration: BoxDecoration(
          color: p.surfacePrimary,
          border: Border(bottom: BorderSide(color: p.borderSecondary)),
        ),
        child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
          Text('Kortnr   ${l.cardNumber}', style: AppType.bodyLarge.copyWith(color: p.textPrimary)),
          const SizedBox(height: 4),
          nameBox,
          for (final r in rows) ...[const SizedBox(height: AppSpacing.s), r],
        ]),
      );
    }

    return Container(
      // 16 i Figma minus rammen på 2, som Flutter legger utenpå polstringen.
      padding: const EdgeInsets.all(AppSpacing.m - 2),
      decoration: BoxDecoration(
        color: p.surfacePrimary,
        borderRadius: BorderRadius.circular(AppRadius.l),
        border: Border.all(color: p.borderSecondary, width: 2),
      ),
      child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
        nameBox,
        const SizedBox(height: AppSpacing.xs),
        Container(
          padding: const EdgeInsets.only(bottom: AppSpacing.xs),
          decoration: BoxDecoration(border: Border(bottom: BorderSide(color: p.textPrimary))),
          child: Column(children: [
            for (final r in rows) Padding(padding: const EdgeInsets.only(top: AppSpacing.xs), child: r),
          ]),
        ),
        const SizedBox(height: AppSpacing.s),
        Row(children: [
          Text(l.hunterNumber, style: AppType.bodyLarge.copyWith(color: p.textSecondary)),
          const SizedBox(width: AppSpacing.xs),
          Expanded(child: Text(l.holderName, style: AppType.bodyLarge.copyWith(color: p.textPrimary))),
        ]),
        if (l.phone != null) KeyValueRow(label: 'Telefon', value: l.phone!),
        if (l.email != null) KeyValueRow(label: 'Epost', value: l.email!),
        const SizedBox(height: AppSpacing.xs),
        Row(children: [
          Expanded(
            child: AppButton(
                label: 'Dokumentasjon',
                size: AppSize.small,
                style: AppButtonStyle.secondary,
                expand: true,
                onPressed: onDocumentation),
          ),
          const SizedBox(width: AppSpacing.s),
          Expanded(
            child: AppButton(
                label: 'Vis i kart',
                size: AppSize.small,
                style: AppButtonStyle.secondary,
                expand: true,
                onPressed: onShowInMap),
          ),
        ]),
        const SizedBox(height: AppSpacing.s),
        AppButton(label: 'Aktiver jaktkort', expand: true, onPressed: onActivate),
      ]),
    );
  }
}
