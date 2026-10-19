import 'package:flutter/material.dart';

import '../icons/app_icon.dart';
import '../icons/app_icons.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';

/// Linje med ikon og tekst, som går igjen i tilbuds-, jakt- og aktiveringskort
/// (sted, periode, pris, arter, jeger). I Figma er dette rammer i hvert kort,
/// ikke en egen komponent.
///
/// - [MetaRow] – én tekst
/// - [MetaRow.parts] – flere deler med prikk mellom («Telemark • Vinje»,
///   «13.12.2024 • 14.12.2024»), brytes over flere linjer ved behov
class MetaRow extends StatelessWidget {
  const MetaRow({
    super.key,
    required this.icon,
    required String text,
    this.style,
    this.iconColor,
    this.leading,
  })  : parts = null,
        dotColor = null,
        emphasizeLast = false,
        _text = text;

  const MetaRow.parts({
    super.key,
    required this.icon,
    required List<String> this.parts,
    this.style,
    this.iconColor,
    this.dotColor,
    this.emphasizeLast = false,
    this.leading,
  }) : _text = null;

  final AppIcons icon;
  final List<String>? parts;
  final TextStyle? style;
  final Color? iconColor;

  /// Prikkfarge mellom delene (standard: tekstfargen).
  final Color? dotColor;

  /// Siste del i fet skrift («Trøndelag • **Selbu**»).
  final bool emphasizeLast;

  /// Innhold mellom ikonet og teksten, f.eks. korttypesymboler i prislinjen.
  final Widget? leading;
  final String? _text;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final st = style ?? AppType.bodySmall.copyWith(color: p.textSecondary);
    final Widget content;
    if (parts == null) {
      content = Text(_text!, style: st);
    } else {
      final dot = Container(
        width: 4,
        height: 4,
        decoration: BoxDecoration(color: dotColor ?? st.color, shape: BoxShape.circle),
      );
      final items = <Widget>[];
      for (final (i, part) in parts!.indexed) {
        if (i > 0) items.add(Padding(padding: const EdgeInsets.symmetric(vertical: 9), child: dot));
        final last = i == parts!.length - 1;
        items.add(Text(part,
            style: emphasizeLast && last ? st.copyWith(fontWeight: FontWeight.w700) : st));
      }
      content = Wrap(
        spacing: AppSpacing.xs,
        crossAxisAlignment: WrapCrossAlignment.center,
        children: items,
      );
    }
    return Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
      SizedBox.square(
        dimension: 26,
        child: Center(child: AppIcon(icon, size: 24, color: iconColor ?? p.textPrimary)),
      ),
      const SizedBox(width: AppSpacing.s),
      if (leading != null) ...[leading!, const SizedBox(width: AppSpacing.s)],
      Expanded(
        child: Padding(
          // Midtstill første tekstlinje mot ikonet (26 px).
          padding: EdgeInsets.only(top: ((26 - (st.fontSize! * (st.height ?? 1.4))) / 2).clamp(0, 6)),
          child: content,
        ),
      ),
    ]);
  }
}

/// Nøkkel og verdi på samme linje («Jegernummer … 654321»).
class KeyValueRow extends StatelessWidget {
  const KeyValueRow({super.key, required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(children: [
        Text(label, style: AppType.bodySmall.copyWith(color: p.textSecondary)),
        const SizedBox(width: AppSpacing.xs),
        Expanded(
          child: Text(value,
              textAlign: TextAlign.right,
              style: AppType.bodySmall.copyWith(color: p.textPrimary)),
        ),
      ]),
    );
  }
}
