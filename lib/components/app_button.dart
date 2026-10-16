import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../theme/tokens.dart';

/// Visuell stil – tilsvarer Figma-egenskapen `Style` på «Button Medium».
enum AppButtonStyle { primary, secondary, tertiary }

/// Knapp fra designsystemet («Button Medium» i Figma, brukt som «Buy Button»).
///
/// Figma → kode:
/// - `Style` (Primary/Secondary/Tertiary) → [style]
/// - `Label` + `Show Label` → [label] (null = kun ikon)
/// - `Left Icon` + `Left Icon Type` → [leadingIcon]
/// - `Right Icon` + `Right Icon Type` → [trailingIcon]
/// - `State=disabled` → [onPressed] er `null`
/// - `State=pressed/focus` håndteres av Flutter selv (WidgetState)
/// - `State=visited` har ingen motpart i appen og er ikke implementert
class AppButton extends StatelessWidget {
  const AppButton({
    super.key,
    this.label,
    this.style = AppButtonStyle.primary,
    this.leadingIcon,
    this.trailingIcon,
    required this.onPressed,
  }) : assert(label != null || leadingIcon != null || trailingIcon != null,
            'AppButton trenger label eller ikon');

  final String? label;
  final AppButtonStyle style;
  final Widget? leadingIcon;
  final Widget? trailingIcon;

  /// `null` gir deaktivert knapp (Figma `State=disabled`).
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: onPressed,
      style: _buttonStyle(),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (leadingIcon != null) leadingIcon!,
          if (leadingIcon != null && label != null)
            const SizedBox(width: AppSpacing.buttonGap),
          if (label != null) Text(label!),
          if (trailingIcon != null && label != null)
            const SizedBox(width: AppSpacing.buttonGap),
          if (trailingIcon != null) trailingIcon!,
        ],
      ),
    );
  }

  ButtonStyle _buttonStyle() {
    final c = _colors[style]!;
    return ButtonStyle(
      padding: const WidgetStatePropertyAll(EdgeInsets.symmetric(
        vertical: AppSpacing.buttonPaddingVertical,
        horizontal: AppSpacing.buttonPaddingHorizontal,
      )),
      textStyle: WidgetStatePropertyAll(
        GoogleFonts.openSans(fontSize: 16, height: 22 / 16),
      ),
      shape: WidgetStateProperty.resolveWith((states) {
        final side = c.border.resolve(states);
        return RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppSpacing.buttonRadius),
          side: side == null
              ? BorderSide.none
              : BorderSide(
                  color: side,
                  width: states.contains(WidgetState.focused) ? 2 : 1,
                ),
        );
      }),
      backgroundColor: WidgetStateProperty.resolveWith(c.background.resolve),
      foregroundColor: WidgetStateProperty.resolveWith(c.foreground.resolve),
      iconColor: WidgetStateProperty.resolveWith(c.foreground.resolve),
      overlayColor: const WidgetStatePropertyAll(Colors.transparent),
    );
  }
}

/// Farge per tilstand, i samme rekkefølge som Figma-variantene.
class _StateColors {
  const _StateColors({
    required this.normal,
    required this.pressed,
    required this.focus,
    required this.disabled,
  });

  final Color? normal, pressed, focus, disabled;

  Color? resolve(Set<WidgetState> states) {
    if (states.contains(WidgetState.disabled)) return disabled;
    if (states.contains(WidgetState.pressed)) return pressed;
    if (states.contains(WidgetState.focused)) return focus;
    return normal;
  }
}

class _ButtonColors {
  const _ButtonColors(this.background, this.foreground, this.border);
  final _StateColors background, foreground, border;
}

const _colors = <AppButtonStyle, _ButtonColors>{
  AppButtonStyle.primary: _ButtonColors(
    _StateColors(
      normal: AppColors.ctaPrimaryDefault,
      pressed: AppColors.ctaPrimarySelected,
      focus: AppColors.ctaPrimaryHover,
      disabled: AppColors.ctaPrimaryDisabled,
    ),
    _StateColors(
      normal: AppColors.textInvert,
      pressed: AppColors.textPrimary,
      focus: AppColors.textInvert,
      disabled: AppColors.textInvert,
    ),
    _StateColors(
      normal: null,
      pressed: null,
      focus: AppColors.ctaPrimarySelected,
      disabled: null,
    ),
  ),
  AppButtonStyle.secondary: _ButtonColors(
    _StateColors(
      normal: AppColors.surfacePrimary,
      pressed: AppColors.surfacePrimary,
      focus: AppColors.surfaceSecondary,
      disabled: AppColors.surfacePrimary,
    ),
    _StateColors(
      normal: AppColors.ctaPrimaryDefault,
      pressed: AppColors.ctaPrimaryHover,
      focus: AppColors.ctaPrimaryVisited,
      disabled: AppColors.ctaPrimaryDisabled,
    ),
    _StateColors(
      normal: AppColors.ctaPrimaryDefault,
      pressed: AppColors.ctaPrimaryHover,
      focus: AppColors.ctaPrimaryVisited,
      disabled: AppColors.ctaPrimaryDisabled,
    ),
  ),
  AppButtonStyle.tertiary: _ButtonColors(
    _StateColors(
      normal: AppColors.surfaceSecondary,
      pressed: AppColors.surfaceSecondary,
      focus: AppColors.surfaceSecondary,
      disabled: null,
    ),
    _StateColors(
      normal: AppColors.ctaPrimaryDefault,
      pressed: AppColors.ctaPrimarySelected,
      focus: AppColors.ctaPrimarySelected,
      disabled: AppColors.ctaPrimaryDisabled,
    ),
    _StateColors(
      normal: null,
      pressed: null,
      focus: AppColors.ctaPrimarySelected,
      disabled: AppColors.ctaPrimaryDisabled,
    ),
  ),
};
