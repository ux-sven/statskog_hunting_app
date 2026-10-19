import 'package:flutter/material.dart';

import '../../../components/components.dart';
import '../../../domain/format.dart';
import '../../../domain/license.dart';
import 'card_parts.dart';

enum _LicenseView { card, details }

/// Kjøpt jakt- eller fiskekort («Offer Card» `Not Activated`, `Activated`
/// og `Info View`).
///
/// - [LicenseCard] – kortet i en liste. Aktivert eller ikke styres av
///   [HuntingLicense.activatedDate]: aktivert dato vises i grønt og
///   «Rapporter fangst» vises når [onReportCapture] er satt.
/// - [LicenseCard.details] – detaljvisning med «Utstedt til», lenker og
///   nedlasting av offline kart (`Info View`).
class LicenseCard extends StatelessWidget {
  const LicenseCard({
    super.key,
    required this.license,
    this.onActivate,
    this.onInfo,
    this.onShowInMap,
    this.onReportCapture,
  })  : _view = _LicenseView.card,
        onRules = null,
        onReceipt = null,
        onOfferInfo = null,
        onDownloadOfflineMap = null;

  const LicenseCard.details({
    super.key,
    required this.license,
    this.onActivate,
    this.onShowInMap,
    this.onRules,
    this.onReceipt,
    this.onOfferInfo,
    this.onDownloadOfflineMap,
  })  : _view = _LicenseView.details,
        onInfo = null,
        onReportCapture = null;

  final HuntingLicense license;
  final VoidCallback? onActivate;
  final VoidCallback? onInfo;
  final VoidCallback? onShowInMap;
  final VoidCallback? onReportCapture;
  final VoidCallback? onRules;
  final VoidCallback? onReceipt;
  final VoidCallback? onOfferInfo;
  final VoidCallback? onDownloadOfflineMap;
  final _LicenseView _view;

  Widget _summary(BuildContext context, {required bool showHolder}) {
    final p = AppPalette.of(context);
    final l = license;
    final activated = l.isActivated && _view == _LicenseView.card;
    return Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
      CardNumberHeader(cardNumber: l.cardNumber, cardType: l.cardType),
      const SizedBox(height: 4),
      Text(l.title,
          style: AppType.subtitleLarge.copyWith(color: p.textPrimary, fontWeight: FontWeight.w500)),
      const SizedBox(height: AppSpacing.s),
      activated
          ? MetaRow(
              icon: AppIcons.schedule,
              text: formatDate(l.activatedDate!),
              iconColor: p.attentionSuccess,
              style: AppType.bodyLarge.copyWith(
                  color: p.attentionSuccess, fontWeight: FontWeight.w700),
            )
          : MetaRow.parts(
              icon: AppIcons.schedule,
              parts: [for (final d in l.validDates) formatDate(d)],
              style: AppType.bodySmall.copyWith(color: p.textPrimary),
            ),
      const SizedBox(height: AppSpacing.s),
      MetaRow(icon: speciesGroupIcon(l.group), text: l.speciesText),
      if (showHolder) ...[
        const SizedBox(height: AppSpacing.s),
        MetaRow(icon: AppIcons.account, text: '${l.hunterNumber} ${l.holderName}'),
      ],
    ]);
  }

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    if (_view == _LicenseView.card) {
      return CardFrame(
        child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
          _summary(context, showHolder: true),
          const SizedBox(height: AppSpacing.s),
          CardActions(
            // Uten onActivate (f.eks. fiskekort som ikke aktiveres) vises ingen hovedknapp.
            primary: onActivate == null
                ? null
                : AppButton(
                    label: 'Aktiver', style: AppButtonStyle.accent, expand: true, onPressed: onActivate),
            iconActions: [
              if (onInfo != null) CardIconAction.info(onInfo),
              if (onShowInMap != null) CardIconAction.map(onShowInMap),
            ],
          ),
          if (license.isActivated && onReportCapture != null) ...[
            const SizedBox(height: AppSpacing.s),
            AppButton(label: 'Rapporter fangst', expand: true, onPressed: onReportCapture),
          ],
        ]),
      );
    }

    final l = license;
    return ColoredBox(
      color: p.surfacePrimary,
      child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.m, vertical: AppSpacing.s),
          child: _summary(context, showHolder: false),
        ),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.m, vertical: AppSpacing.s),
          decoration: BoxDecoration(
            color: p.surfaceSecondary,
            border: Border.symmetric(horizontal: BorderSide(color: p.borderPrimary)),
          ),
          child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: Text('Utstedt til',
                  style: AppType.subtitleSmall.copyWith(color: p.textSecondary, fontWeight: FontWeight.w600)),
            ),
            KeyValueRow(label: 'Jegernummer', value: l.hunterNumber),
            KeyValueRow(label: 'Navn', value: l.holderName),
            if (l.phone != null) KeyValueRow(label: 'Telefon', value: l.phone!),
            if (l.email != null) KeyValueRow(label: 'Epost', value: l.email!),
          ]),
        ),
        if (onRules != null)
          AppListTile(title: 'Kvoter og regler', trailingIcon: AppIcons.link, onTap: onRules),
        if (onReceipt != null)
          AppListTile(title: 'Kvittering for kjøp', trailingIcon: AppIcons.receipt, onTap: onReceipt),
        if (onOfferInfo != null)
          AppListTile(
              title: 'Tilbudsinfo (på Inatur)', trailingIcon: AppIcons.information, onTap: onOfferInfo),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.m, vertical: AppSpacing.s),
          child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
            CardActions(
              primary: AppButton(
                  label: 'Aktiver', style: AppButtonStyle.accent, expand: true, onPressed: onActivate),
              iconActions: [if (onShowInMap != null) CardIconAction.map(onShowInMap)],
            ),
            if (onDownloadOfflineMap != null) ...[
              const SizedBox(height: AppSpacing.s),
              AppButton(
                label: 'Last ned offline kart',
                style: AppButtonStyle.secondary,
                leadingIcon: const AppIcon(AppIcons.downloadFromCloud),
                expand: true,
                onPressed: onDownloadOfflineMap,
              ),
            ],
          ]),
        ),
      ]),
    );
  }
}
