import 'package:flutter/material.dart';

import '../../../components/components.dart';
import '../../../domain/format.dart';
import '../../../domain/license.dart';
import '../../cards/widgets/card_parts.dart';

/// Bilde øverst i tilbudskortet («Offer images»). Variantene i Figma er
/// eksempelbilder – her kommer bildet fra tilbudet.
class OfferImage extends StatelessWidget {
  const OfferImage({super.key, this.imageUrl, this.imageAsset, this.height = 150});

  final String? imageUrl;
  final String? imageAsset;
  final double height;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final placeholder = Container(
      color: p.surfaceSecondary,
      alignment: Alignment.center,
      child: AppIcon(AppIcons.noMap, color: p.textTertiary, size: 32),
    );
    Widget image;
    if (imageAsset != null) {
      image = Image.asset(imageAsset!, fit: BoxFit.cover,
          errorBuilder: (_, __, ___) => placeholder);
    } else if (imageUrl != null) {
      image = Image.network(imageUrl!, fit: BoxFit.cover,
          errorBuilder: (_, __, ___) => placeholder);
    } else {
      image = placeholder;
    }
    return SizedBox(height: height, width: double.infinity, child: image);
  }
}

/// Tilbud om jakt- eller fiskekort («Offer Card» `Property 1=Buy`).
///
/// De andre variantene av «Offer Card» (Not Activated, Activated, Info View)
/// er et kjøpt kort og ligger i [LicenseCard].
class OfferCard extends StatelessWidget {
  const OfferCard({
    super.key,
    required this.offer,
    required this.onBuy,
    this.onInfo,
    this.onShowInMap,
  });

  final Offer offer;
  final VoidCallback? onBuy;
  final VoidCallback? onInfo;
  final VoidCallback? onShowInMap;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final badges = [
      for (final t in offer.cardTypes) CardTypeBadge(t, size: 26),
      for (final t in offer.unavailableCardTypes) CardTypeBadge(t, size: 26, inactive: true),
    ];
    return CardFrame(
      padding: EdgeInsets.zero,
      child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
        OfferImage(imageUrl: offer.imageUrl, imageAsset: offer.imageAsset),
        Padding(
          padding: const EdgeInsets.all(AppSpacing.s),
          child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
            Text(offer.title,
                style: AppType.subtitleLarge.copyWith(color: p.textPrimary, fontWeight: FontWeight.w500)),
            const SizedBox(height: AppSpacing.s),
            MetaRow.parts(
              icon: AppIcons.location,
              parts: [offer.county, offer.municipality],
              dotColor: p.borderInvert,
            ),
            const SizedBox(height: AppSpacing.s),
            MetaRow(
              icon: AppIcons.priceTag,
              text: offer.priceFrom == null ? 'Se priser' : 'Pris fra ${formatKroner(offer.priceFrom!)}',
              leading: badges.isEmpty
                  ? null
                  : Wrap(spacing: AppSpacing.xs, children: badges),
            ),
            const SizedBox(height: AppSpacing.s),
            MetaRow(icon: speciesGroupIcon(offer.group), text: offer.speciesText),
            const SizedBox(height: AppSpacing.s),
            CardActions(
              primary: AppButton(label: 'Kjøp', expand: true, onPressed: onBuy),
              iconActions: [
                if (onInfo != null) CardIconAction.info(onInfo),
                if (onShowInMap != null) CardIconAction.map(onShowInMap),
              ],
            ),
          ]),
        ),
      ]),
    );
  }
}
