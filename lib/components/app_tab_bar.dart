import 'package:flutter/material.dart';

import '../theme/tokens.dart';
import '../theme/typography.dart';
import 'internal/interactive.dart';

/// Én fane i [AppTabBar].
class AppTab {
  const AppTab({required this.label, this.icon, this.enabled = true});
  final String label;
  final Widget? icon;
  final bool enabled;
}

/// Fanerad (siden «Tab Bar» i Figma: «Tab Bar Small / Medium»).
///
/// Figma → kode:
/// - Settnavn → [size] (`AppSize.small` eller `AppSize.medium`)
/// - `Show Button 1–8` + knappenes `Label` → [tabs]
/// - Knappen med `Property 1=Active` → [selectedIndex]
class AppTabBar extends StatelessWidget {
  const AppTabBar({
    super.key,
    required this.tabs,
    required this.selectedIndex,
    required this.onChanged,
    this.size = AppSize.small,
  });

  final List<AppTab> tabs;
  final int selectedIndex;
  final ValueChanged<int> onChanged;
  final AppSize size;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.s),
      decoration: BoxDecoration(
        color: p.surfacePrimary,
        border: Border(bottom: BorderSide(color: p.borderSecondary)),
      ),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(children: [
          for (var i = 0; i < tabs.length; i++)
            AppTabButton(
              label: tabs[i].label,
              icon: tabs[i].icon,
              size: size,
              active: i == selectedIndex,
              onPressed: tabs[i].enabled ? () => onChanged(i) : null,
            ),
        ]),
      ),
    );
  }
}

/// Enkeltknapp i fanerad («Tab Bar Button Small / Medium»).
///
/// - `Label` → [label]; `Use Icon` + `Icon` → [icon]
/// - `Property 1=Active` → [active]
/// - `Property 1=Disabled` → [onPressed] er `null`
/// - `Property 1=Hover/Focus` følger ekte interaksjon
class AppTabButton extends StatelessWidget {
  const AppTabButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.icon,
    this.active = false,
    this.size = AppSize.small,
  });

  final String label;
  final Widget? icon;
  final bool active;
  final AppSize size;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final medium = size != AppSize.small;
    final text = medium ? AppType.subtitleLarge : AppType.bodyLarge;
    return InteractiveBuilder(
      onTap: onPressed,
      selected: active,
      semanticLabel: label,
      builder: (context, states) {
        final disabled = states.contains(WidgetState.disabled);
        final focused = states.contains(WidgetState.focused);
        final hovered = states.contains(WidgetState.hovered);
        final Color fg = disabled
            ? p.ctaPrimaryDisabled
            : active
                ? p.textPrimary
                : (focused ? p.ctaPrimarySelected : p.ctaPrimaryDefault);
        return Container(
          padding: medium
              ? const EdgeInsets.symmetric(vertical: 16, horizontal: 24)
              : const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
          decoration: BoxDecoration(
            color: active || hovered || focused ? p.surfaceSecondary : null,
            border: active
                ? Border(bottom: BorderSide(color: p.ctaPrimarySelected, width: 2))
                : focused
                    ? Border.all(color: p.ctaPrimarySelected)
                    : null,
          ),
          child: Row(mainAxisSize: MainAxisSize.min, children: [
            if (icon != null) ...[
              IconTheme.merge(data: IconThemeData(color: fg, size: 18), child: icon!),
              const SizedBox(width: AppSpacing.s),
            ],
            Text(label,
                style: text.copyWith(
                    color: fg,
                    fontWeight: active ? FontWeight.w600 : FontWeight.w400)),
          ]),
        );
      },
    );
  }
}
