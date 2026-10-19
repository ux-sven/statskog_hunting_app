import 'package:flutter/material.dart';

import '../icons/app_icon.dart';
import '../icons/app_icons.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import 'app_button.dart';

/// Teller med minus/pluss (telleren i «Filter option cell» `Counter` og
/// «Capture Item Counter»).
class CountStepper extends StatelessWidget {
  const CountStepper({
    super.key,
    required this.value,
    required this.onChanged,
    this.min = 0,
    this.max,
    this.size = AppSize.large,
  });

  final int value;
  final ValueChanged<int>? onChanged;
  final int min;
  final int? max;
  final AppSize size;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final canDec = onChanged != null && value > min;
    final canInc = onChanged != null && (max == null || value < max!);
    return Row(mainAxisSize: MainAxisSize.min, children: [
      Semantics(
        label: 'Færre',
        child: AppButton(
          size: size,
          squareSize: 46,
          style: AppButtonStyle.secondary,
          leadingIcon: const AppIcon(AppIcons.minus),
          onPressed: canDec ? () => onChanged!(value - 1) : null,
        ),
      ),
      SizedBox(
        width: 52, // 21 + tall + 21 i Figma
        child: Text('$value',
            textAlign: TextAlign.center,
            style: AppType.bodyLarge.copyWith(color: p.textPrimary)),
      ),
      Semantics(
        label: 'Flere',
        child: AppButton(
          size: size,
          squareSize: 46,
          style: AppButtonStyle.secondary,
          leadingIcon: const AppIcon(AppIcons.plus),
          onPressed: canInc ? () => onChanged!(value + 1) : null,
        ),
      ),
    ]);
  }
}
