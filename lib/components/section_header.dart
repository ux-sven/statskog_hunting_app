import 'package:flutter/material.dart';

import '../icons/app_icon.dart';
import '../icons/app_icons.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';

/// Overskrift for en seksjon som kan åpnes og lukkes
/// («Search Results Section Header»).
class SectionHeader extends StatelessWidget {
  const SectionHeader({
    super.key,
    required this.title,
    this.expanded = true,
    this.onToggle,
  });

  final String title;

  /// Pilen peker opp når seksjonen er åpen.
  final bool expanded;

  /// Uten [onToggle] vises ingen pil.
  final VoidCallback? onToggle;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final row = Padding(
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.xs, vertical: 4),
      child: Row(children: [
        Expanded(
          child: Text(title, style: AppType.subtitleLarge.copyWith(color: p.textPrimary)),
        ),
        if (onToggle != null)
          AppIcon(expanded ? AppIcons.chevronRoundedUp : AppIcons.chevronRoundedDown,
              color: p.textPrimary),
      ]),
    );
    if (onToggle == null) return Semantics(header: true, child: row);
    return Semantics(
      header: true,
      button: true,
      expanded: expanded,
      child: InkWell(onTap: onToggle, child: row),
    );
  }
}

/// Seksjon med [SectionHeader] og innhold som kan skjules.
///
/// Brukes for søketreff (sted, jakt, fiske) og andre grupperte lister – listene
/// i Figma («Hunting/Fishing/Location Search Results Section») er eksempler på
/// denne med ulikt innhold.
class ExpandableSection extends StatefulWidget {
  const ExpandableSection({
    super.key,
    required this.title,
    required this.children,
    this.initiallyExpanded = true,
    this.spacing = AppSpacing.xs,
  });

  final String title;
  final List<Widget> children;
  final bool initiallyExpanded;
  final double spacing;

  @override
  State<ExpandableSection> createState() => _ExpandableSectionState();
}

class _ExpandableSectionState extends State<ExpandableSection> {
  late bool _expanded = widget.initiallyExpanded;

  @override
  Widget build(BuildContext context) {
    return Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
      SectionHeader(
        title: widget.title,
        expanded: _expanded,
        onToggle: () => setState(() => _expanded = !_expanded),
      ),
      if (_expanded)
        for (final c in widget.children) ...[SizedBox(height: widget.spacing), c],
    ]);
  }
}
