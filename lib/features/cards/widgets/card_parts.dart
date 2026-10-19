import 'package:flutter/material.dart';

import '../../../components/components.dart';

/// Felles deler for kortene (tilbud, jaktkort, aktivering). Holdes samlet her
/// slik at kortene ser like ut uten å kopiere layout.

/// Ramme med avrundede hjørner rundt et kort.
class CardFrame extends StatelessWidget {
  const CardFrame({
    super.key,
    required this.child,
    this.borderColor,
    this.borderWidth = 1,
    this.padding = const EdgeInsets.all(AppSpacing.s),
  });

  final Widget child;
  final Color? borderColor;
  final double borderWidth;
  final EdgeInsetsGeometry padding;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    return Container(
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(
        color: p.surfacePrimary,
        borderRadius: BorderRadius.circular(AppRadius.l),
        border: Border.all(color: borderColor ?? p.borderSecondary, width: borderWidth),
      ),
      child: Padding(padding: padding, child: child),
    );
  }
}

/// Handlingsrad: hovedknapp som fyller bredden og kvadratiske ikonknapper (54).
class CardActions extends StatelessWidget {
  const CardActions({
    super.key,
    this.primary,
    this.iconActions = const [],
  });

  /// Hovedknappen, typisk en [AppButton] med `expand: true`.
  final Widget? primary;
  final List<CardIconAction> iconActions;

  @override
  Widget build(BuildContext context) {
    return Row(children: [
      if (primary != null) Expanded(child: primary!) else const Spacer(),
      for (final a in iconActions) ...[
        const SizedBox(width: AppSpacing.s),
        Tooltip(
          message: a.label,
          child: Semantics(
            label: a.label,
            child: AppButton(
              size: AppSize.large,
              squareSize: 54,
              style: AppButtonStyle.secondary,
              leadingIcon: AppIcon(a.icon),
              onPressed: a.onPressed,
            ),
          ),
        ),
      ],
    ]);
  }
}

/// En kvadratisk ikonknapp i [CardActions].
class CardIconAction {
  const CardIconAction(this.icon, this.label, this.onPressed);

  /// Info-knapp («Information»).
  const CardIconAction.info(VoidCallback? onPressed)
      : this(AppIcons.information, 'Mer informasjon', onPressed);

  /// Vis i kart («Map/Location Pin»).
  const CardIconAction.map(VoidCallback? onPressed)
      : this(AppIcons.locationPin, 'Vis i kart', onPressed);

  /// Kvittering («Receipt»).
  const CardIconAction.receipt(VoidCallback? onPressed)
      : this(AppIcons.receipt, 'Kvittering', onPressed);

  final AppIcons icon;
  final String label;
  final VoidCallback? onPressed;
}

/// «Kortnr 1721894 … Dagskort [symbol]»
class CardNumberHeader extends StatelessWidget {
  const CardNumberHeader({super.key, required this.cardNumber, this.cardType});

  final String cardNumber;
  final CardType? cardType;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final st = AppType.bodyLarge.copyWith(color: p.textSecondary);
    return Row(children: [
      Expanded(child: Text('Kortnr $cardNumber', style: st)),
      if (cardType != null) ...[
        Text(cardType!.label, style: st),
        const SizedBox(width: 4),
        CardTypeBadge(cardType!, size: 26),
      ],
    ]);
  }
}

/// Ikon for artsgruppen: fiskekrok for fiske, sikte for jakt.
AppIcons speciesGroupIcon(SpeciesGroup group) =>
    group == SpeciesGroup.fish ? AppIcons.fishingHook : AppIcons.accuracy;
