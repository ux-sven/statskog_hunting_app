import 'package:flutter/material.dart';

import '../../../components/components.dart';
import '../../../domain/format.dart';
import '../../../domain/license.dart';
import 'card_parts.dart';

/// En aktivering av jaktkortet («Activation Card»).
///
/// Figma → kode:
/// - `Default` («Fjern aktivering», oransje) → [onRemove] satt
/// - `Variant2` («Fangstrapport») → [onReportCapture] satt
///
/// Er begge satt, vises «Fangstrapport».
class ActivationCard extends StatelessWidget {
  const ActivationCard({
    super.key,
    required this.activation,
    this.onRemove,
    this.onReportCapture,
    this.onReceipt,
    this.onShowInMap,
  });

  final Activation activation;
  final VoidCallback? onRemove;
  final VoidCallback? onReportCapture;
  final VoidCallback? onReceipt;
  final VoidCallback? onShowInMap;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final a = activation;
    final st = AppType.bodyLarge.copyWith(color: p.textSecondary);
    final Widget? primary = onReportCapture != null
        ? AppButton(label: 'Fangstrapport', expand: true, onPressed: onReportCapture)
        : onRemove != null
            ? AppButton(
                label: 'Fjern aktivering',
                style: AppButtonStyle.accent,
                expand: true,
                onPressed: onRemove)
            : null;
    return CardFrame(
      borderColor: p.surfaceTertiary,
      child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
        MetaRow(icon: AppIcons.contact, text: '${a.licenseTitle} (${a.cardNumber})', style: st),
        const SizedBox(height: AppSpacing.s),
        MetaRow.parts(
          icon: AppIcons.location,
          parts: [a.county, a.municipality],
          style: st,
          dotColor: p.borderInvert,
          emphasizeLast: true,
        ),
        const SizedBox(height: AppSpacing.s),
        MetaRow(
          icon: AppIcons.schedule,
          text: formatDate(a.date),
          style: AppType.bodyLarge.copyWith(color: p.textPrimary, fontWeight: FontWeight.w700),
        ),
        const SizedBox(height: AppSpacing.s),
        CardActions(
          primary: primary,
          iconActions: [
            if (onReceipt != null) CardIconAction.receipt(onReceipt),
            if (onShowInMap != null) CardIconAction.map(onShowInMap),
          ],
        ),
      ]),
    );
  }
}
