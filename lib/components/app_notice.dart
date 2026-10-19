import 'package:flutter/material.dart';

import '../icons/app_icon.dart';
import '../icons/app_icons.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';

/// Melding/påminnelse til brukeren.
///
/// Figma → kode:
/// - «instructions» → [AppNotice] (ikon til venstre, tekst, tynn ramme)
/// - «Offline Reminder» → [AppNotice.callout] (sentrert tekst med knapp,
///   kartbakgrunn)
class AppNotice extends StatelessWidget {
  const AppNotice({
    super.key,
    required this.text,
    this.icon = AppIcons.information,
  })  : action = null,
        background = null,
        _callout = false;

  const AppNotice.callout({
    super.key,
    required this.text,
    this.action,
    this.background = const AssetImage('assets/images/offline_reminder_bg.png'),
  })  : icon = null,
        _callout = true;

  final String text;
  final AppIcons? icon;

  /// Knapp under teksten i [AppNotice.callout], typisk en [AppButton].
  final Widget? action;

  /// Bakgrunnsbilde i [AppNotice.callout]. `null` gir ingen bakgrunn.
  final ImageProvider? background;
  final bool _callout;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final style = AppType.bodyLarge.copyWith(color: p.textPrimary);

    if (!_callout) {
      return Container(
        padding: const EdgeInsets.symmetric(horizontal: AppSpacing.m, vertical: AppSpacing.xs),
        decoration: BoxDecoration(
          color: p.surfaceSecondary,
          border: Border.all(color: p.borderTertiary),
          borderRadius: BorderRadius.circular(AppRadius.s),
        ),
        child: Row(children: [
          AppIcon(icon!, color: p.textPrimary),
          const SizedBox(width: AppSpacing.m),
          Expanded(child: Text(text, style: style)),
        ]),
      );
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 25, vertical: 17),
      decoration: BoxDecoration(
        color: p.surfacePrimary,
        border: Border.all(color: p.borderTertiary),
        borderRadius: BorderRadius.circular(AppRadius.l),
        image: background == null
            ? null
            : DecorationImage(image: background!, fit: BoxFit.cover),
      ),
      child: Column(mainAxisSize: MainAxisSize.min, children: [
        Text(text, style: style, textAlign: TextAlign.center),
        if (action != null) ...[const SizedBox(height: AppSpacing.xs), action!],
      ]),
    );
  }
}
