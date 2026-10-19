import 'package:flutter/material.dart';

import '../theme/tokens.dart';
import '../theme/typography.dart';

/// Segmentert valg, f.eks. «Småviltjakt | Fiske» eller «Jaktkort | Aktiveringer».
///
/// Tilsvarer «Segmented Control» fra iOS-biblioteket i Figma (bibliotekkomponent,
/// derfor ikke koblet med Code Connect fra denne filen).
class AppSegmentedControl extends StatelessWidget {
  const AppSegmentedControl({
    super.key,
    required this.segments,
    required this.selectedIndex,
    required this.onChanged,
  });

  final List<String> segments;
  final int selectedIndex;
  final ValueChanged<int> onChanged;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final base = AppType.bodySmall.copyWith(fontSize: 13, height: 18 / 13, letterSpacing: -0.08);
    return Container(
      height: 32,
      padding: const EdgeInsets.all(2.5),
      decoration: BoxDecoration(
        color: p.surfaceSecondary,
        border: Border.all(color: p.borderTertiary),
        borderRadius: BorderRadius.circular(9),
      ),
      child: Row(children: [
        for (final (i, label) in segments.indexed)
          Expanded(
            child: Semantics(
              button: true,
              selected: i == selectedIndex,
              child: GestureDetector(
                behavior: HitTestBehavior.opaque,
                onTap: () => onChanged(i),
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 150),
                  alignment: Alignment.center,
                  padding: const EdgeInsets.symmetric(horizontal: 10),
                  decoration: i == selectedIndex
                      ? BoxDecoration(
                          color: p.surfaceInvert,
                          borderRadius: BorderRadius.circular(7),
                          border: Border.all(color: p.surfacePrimary, width: 0.5),
                          boxShadow: const [
                            BoxShadow(color: Color(0x1F000000), offset: Offset(0, 3), blurRadius: 8),
                            BoxShadow(color: Color(0x0A000000), offset: Offset(0, 3), blurRadius: 1),
                          ],
                        )
                      : null,
                  child: Text(
                    label,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: i == selectedIndex
                        ? base.copyWith(color: p.textInvert, fontWeight: FontWeight.w600)
                        : base.copyWith(color: p.textPrimary),
                  ),
                ),
              ),
            ),
          ),
      ]),
    );
  }
}
