import 'package:flutter/material.dart';

import '../theme/tokens.dart';
import '../theme/typography.dart';
import 'internal/interactive.dart';

/// Tekstlenke (siden «Links» i Figma, settet «Simple Text Link»).
///
/// Figma → kode:
/// - `Text` → [text]
/// - `Show Icon` + `Icon` → [icon] (standard: ekstern lenke)
/// - `Used in list=Yes` → [inList] (padding, understrek kun ved hover)
/// - `State=Visited` → [visited]
/// - `State=Inactive` → [onTap] er `null`
/// - `State=Hover` følger ekte hover
class AppLink extends StatelessWidget {
  const AppLink({
    super.key,
    required this.text,
    required this.onTap,
    this.icon,
    this.inList = false,
    this.visited = false,
  });

  final String text;
  final VoidCallback? onTap;
  final Widget? icon;
  final bool inList;
  final bool visited;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    return InteractiveBuilder(
      onTap: onTap,
      semanticLabel: text,
      builder: (context, states) {
        final disabled = states.contains(WidgetState.disabled);
        final hovered = states.contains(WidgetState.hovered);
        final Color color = disabled
            ? p.ctaPrimaryDisabled
            : visited
                ? p.ctaPrimaryVisited
                : (hovered ? p.ctaPrimaryHover : p.ctaPrimaryDefault);
        final underline = !disabled && (!inList || hovered);
        final content = Row(mainAxisSize: MainAxisSize.min, children: [
          Flexible(
            child: Text(
              text,
              style: AppType.bodyMedium.copyWith(
                color: color,
                decoration: underline ? TextDecoration.underline : null,
                decorationColor: color,
              ),
            ),
          ),
          if (icon != null) ...[
            const SizedBox(width: 4),
            IconTheme.merge(
                data: IconThemeData(size: 14, color: color), child: icon!),
          ],
        ]);
        return inList
            ? Padding(
                padding: const EdgeInsets.symmetric(
                    vertical: AppSpacing.xs, horizontal: AppSpacing.s),
                child: content)
            : content;
      },
    );
  }
}
