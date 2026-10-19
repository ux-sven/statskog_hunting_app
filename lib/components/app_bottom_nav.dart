import 'package:flutter/material.dart';

import '../icons/app_icon.dart';
import '../icons/app_icons.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';

/// Et valg i bunnmenyen («Tab Button» på Components-siden).
class AppBottomNavItem {
  const AppBottomNavItem({required this.icon, required this.label});
  final AppIcons icon;
  final String label;
}

/// Bunnmenyen («Tab Bar - iPhone»).
///
/// Figma → kode:
/// - `Show Tab Button 3/4/5` → hvilke [items] som tas med
/// - Valgt fane har grå bakgrunn og fet tekst
class AppBottomNav extends StatelessWidget {
  const AppBottomNav({
    super.key,
    required this.items,
    required this.selectedIndex,
    required this.onChanged,
  });

  final List<AppBottomNavItem> items;
  final int selectedIndex;
  final ValueChanged<int> onChanged;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final bottom = MediaQuery.paddingOf(context).bottom;
    return Container(
      padding: EdgeInsets.only(top: 6, bottom: bottom > 0 ? bottom : 6),
      decoration: BoxDecoration(
        color: p.surfacePrimary,
        border: Border(top: BorderSide(color: p.borderPrimary)),
      ),
      child: Row(children: [
        for (final (i, item) in items.indexed)
          Expanded(
            child: Semantics(
              button: true,
              selected: i == selectedIndex,
              child: InkWell(
                onTap: () => onChanged(i),
                child: Container(
                  height: 48,
                  color: i == selectedIndex ? p.surfaceSecondary : null,
                  child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                    AppIcon(item.icon, size: 26, color: p.ctaPrimaryDefault),
                    const SizedBox(height: 2),
                    Text(
                      item.label,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: AppType.bodyXtraSmall.copyWith(
                        fontSize: 10,
                        height: 1.2,
                        color: i == selectedIndex ? p.textPrimary : p.ctaPrimaryDefault,
                        fontWeight: i == selectedIndex ? FontWeight.w800 : FontWeight.w500,
                      ),
                    ),
                  ]),
                ),
              ),
            ),
          ),
      ]),
    );
  }
}
