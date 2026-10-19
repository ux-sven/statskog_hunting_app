import 'package:flutter/material.dart';

import '../components/components.dart';

/// Stor sidetittel («Tilbud småviltjakt», «Innstillinger»).
class ScreenTitle extends StatelessWidget {
  const ScreenTitle(this.title, {super.key, this.trailing});

  final String title;
  final Widget? trailing;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    return Padding(
      padding: const EdgeInsets.fromLTRB(AppSpacing.m, AppSpacing.m, AppSpacing.m, AppSpacing.xs),
      child: Row(children: [
        Expanded(
          child: Semantics(
            header: true,
            child: Text(title, style: AppType.headlineH1.copyWith(color: p.textPrimary)),
          ),
        ),
        if (trailing != null) trailing!,
      ]),
    );
  }
}

/// Topp med tilbakeknapp på skjermer som åpnes over bunnmenyen.
/// Erstattes av SheetHeader («Map Navigation Bar») når den er bygget.
class BackHeader extends StatelessWidget {
  const BackHeader({super.key, required this.title, this.backLabel = 'Tilbake'});

  final String title;
  final String backLabel;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    return Container(
      padding: const EdgeInsets.fromLTRB(AppSpacing.m, AppSpacing.s, AppSpacing.m, AppSpacing.s),
      decoration: BoxDecoration(
        color: p.surfacePrimary,
        border: Border(bottom: BorderSide(color: p.borderPrimary)),
      ),
      child: Row(children: [
        AppLink(
          text: backLabel,
          icon: const AppIcon(AppIcons.chevronLeftSmall),
          onTap: () => Navigator.maybePop(context),
        ),
        const SizedBox(width: AppSpacing.m),
        Expanded(
          child: Text(title,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: AppType.bodyLarge.copyWith(color: p.textPrimary, fontWeight: FontWeight.w700)),
        ),
      ]),
    );
  }
}

/// Kartflate i prototypen. I appen er dette ArcGIS Maps SDK for Flutter
/// (MapView med felt fra Jaktdatabasen); på web vises et bilde.
class MapPlaceholder extends StatelessWidget {
  const MapPlaceholder({super.key, this.detailed = false, this.onLayers});

  /// Nærbilde med jaktfelt i stedet for oversiktskart.
  final bool detailed;
  final VoidCallback? onLayers;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    return Stack(fit: StackFit.expand, children: [
      Image.asset(
        detailed ? 'assets/images/eksempel/kart_jaktfelt.jpg' : 'assets/images/eksempel/kart_oversikt.jpg',
        fit: BoxFit.cover,
        semanticLabel: 'Kart',
      ),
      Positioned(
        top: AppSpacing.s,
        right: AppSpacing.s,
        child: MapButton(
          icon: const AppIcon(AppIcons.layers),
          tooltip: 'Kartlag',
          onPressed: onLayers ?? () {},
        ),
      ),
      Positioned(
        left: AppSpacing.s,
        bottom: AppSpacing.s,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.xs, vertical: 2),
          decoration: BoxDecoration(
            color: p.surfacePrimary.withValues(alpha: 0.85),
            borderRadius: BorderRadius.circular(AppRadius.s),
          ),
          child: Text('Prototype – kartet blir ArcGIS i appen',
              style: AppType.bodyXtraSmall.copyWith(color: p.textSecondary)),
        ),
      ),
    ]);
  }
}

/// Viser en kort melding nederst.
void showAppMessage(BuildContext context, String text) {
  ScaffoldMessenger.of(context)
    ..hideCurrentSnackBar()
    ..showSnackBar(SnackBar(content: Text(text), behavior: SnackBarBehavior.floating));
}

/// Åpner et kart over et kort i et ark nederst.
Future<void> showMapSheet(BuildContext context, String title) {
  return showModalBottomSheet(
    context: context,
    isScrollControlled: true,
    showDragHandle: true,
    builder: (context) => SizedBox(
      height: MediaQuery.sizeOf(context).height * 0.7,
      child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(AppSpacing.m, 0, AppSpacing.m, AppSpacing.s),
          child: Text(title, style: AppType.subtitleLarge),
        ),
        const Expanded(child: MapPlaceholder(detailed: true)),
      ]),
    ),
  );
}
