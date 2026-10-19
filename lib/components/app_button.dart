import 'package:flutter/material.dart';

import '../theme/tokens.dart';
import '../theme/typography.dart';
import 'internal/interactive.dart';

/// Visuell stil – Figma-egenskapen `Style`.
enum AppButtonStyle { primary, secondary, tertiary }

/// Retning – Figma-settene «Button …» (horisontal) og «Button Vertical …».
enum AppButtonOrientation { horizontal, vertical }

/// Knapp fra designsystemet (siden «Buttons» i Figma).
///
/// Dekker seks komponentsett:
/// Button Large / Medium / Small og Button Vertical Large / Medium / Small.
///
/// Figma → kode:
/// - Settnavn → [size] og [orientation]
/// - `Style` → [style]
/// - `Label` + `Show Label` → [label] (null = kun ikon)
/// - `Left Icon` + `Left Icon Type` → [leadingIcon] (over teksten i vertikal)
/// - `Right Icon` + `Right Icon Type` → [trailingIcon]
/// - `State=disabled` → [onPressed] er `null`
/// - `State=hover/pressed/focus` følger ekte interaksjon
/// - `State=visited` → [visited]
class AppButton extends StatelessWidget {
  const AppButton({
    super.key,
    this.label,
    this.style = AppButtonStyle.primary,
    this.size = AppSize.medium,
    this.orientation = AppButtonOrientation.horizontal,
    this.leadingIcon,
    this.trailingIcon,
    this.visited = false,
    this.expand = false,
    this.squareSize,
    required this.onPressed,
  }) : assert(label != null || leadingIcon != null || trailingIcon != null,
            'AppButton trenger label eller ikon');

  final String? label;
  final AppButtonStyle style;
  final AppSize size;
  final AppButtonOrientation orientation;
  final Widget? leadingIcon;
  final Widget? trailingIcon;

  /// Figma `State=visited` (f.eks. allerede valgt side i paginering).
  final bool visited;

  /// Fyller tilgjengelig bredde.
  final bool expand;

  /// Fast kvadratisk størrelse for ikonknapper uten tekst, f.eks. 46 i tellere
  /// («Button Large» med overstyrt størrelse i «Filter option cell» `Counter`).
  final double? squareSize;

  /// `null` gir deaktivert knapp (Figma `State=disabled`).
  final VoidCallback? onPressed;

  bool get _vertical => orientation == AppButtonOrientation.vertical;

  EdgeInsets get _padding => switch ((size, _vertical)) {
        (AppSize.large, _) => const EdgeInsets.symmetric(vertical: 24, horizontal: 32),
        (AppSize.medium, false) => const EdgeInsets.symmetric(vertical: 16, horizontal: 24),
        (AppSize.medium, true) => const EdgeInsets.symmetric(vertical: 16, horizontal: 32),
        (AppSize.small, false) => const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
        (AppSize.small, true) => const EdgeInsets.symmetric(vertical: 12, horizontal: 24),
      };

  double get _gap => _vertical
      ? (size == AppSize.small ? 0 : 8)
      : (size == AppSize.small ? 12 : 16);

  double get iconSize => switch (size) {
        AppSize.small => 14,
        AppSize.medium => 18,
        AppSize.large => 22,
      };

  double get _focusWidth => size == AppSize.large ? 4 : 2;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    return InteractiveBuilder(
      onTap: onPressed,
      semanticLabel: label,
      builder: (context, states) {
        final c = _colors(p, states);
        final focused = states.contains(WidgetState.focused) &&
            !states.contains(WidgetState.disabled);
        // Ikonknapper uten tekst får samme høyde som knapper med tekst.
        final lineHeight = AppType.button(size).fontSize! *
            (AppType.button(size).height ?? 1);
        Widget iconBox(Widget icon) => label == null
            ? SizedBox(height: lineHeight, child: Center(child: icon))
            : icon;
        final children = <Widget>[
          if (leadingIcon != null) iconBox(leadingIcon!),
          if (label != null) Text(label!),
          if (trailingIcon != null) iconBox(trailingIcon!),
        ];
        final spaced = <Widget>[];
        for (var i = 0; i < children.length; i++) {
          if (i > 0) {
            spaced.add(SizedBox(
                width: _vertical ? 0 : _gap, height: _vertical ? _gap : 0));
          }
          spaced.add(children[i]);
        }
        return AnimatedContainer(
          duration: const Duration(milliseconds: 120),
          padding: squareSize != null ? EdgeInsets.zero : _padding,
          width: squareSize,
          height: squareSize,
          alignment: squareSize != null ? Alignment.center : null,
          decoration: BoxDecoration(
            color: c.background,
            borderRadius: BorderRadius.circular(AppRadius.s),
            border: c.border == null
                ? null
                : Border.all(color: c.border!, width: focused ? _focusWidth : 1),
          ),
          child: IconTheme.merge(
            data: IconThemeData(color: c.foreground, size: iconSize),
            child: DefaultTextStyle.merge(
              style: AppType.button(size).copyWith(color: c.foreground),
              textAlign: TextAlign.center,
              child: Flex(
                direction: _vertical ? Axis.vertical : Axis.horizontal,
                mainAxisSize: expand ? MainAxisSize.max : MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.center,
                children: spaced,
              ),
            ),
          ),
        );
      },
    );
  }

  _ButtonColors _colors(AppPalette p, Set<WidgetState> s) {
    final v = visited;
    switch (style) {
      case AppButtonStyle.primary:
        return _ButtonColors(
          background: resolveState(s,
              normal: v ? p.ctaPrimaryVisited : p.ctaPrimaryDefault,
              hovered: p.ctaPrimaryHover,
              focused: p.ctaPrimaryHover,
              pressed: p.ctaPrimarySelected,
              disabled: p.ctaPrimaryDisabled),
          foreground: resolveState(s,
              normal: p.textInvert, pressed: p.textPrimary),
          border: resolveState<Color?>(s,
              normal: null, focused: p.ctaPrimarySelected, disabled: null),
        );
      case AppButtonStyle.secondary:
        return _ButtonColors(
          // Figma har små avvik mellom størrelsene for Secondary (focus og
          // pressed). Her brukes én felles regel – se README «Avvik i Figma».
          background: _vertical ? null : p.surfacePrimary,
          foreground: resolveState(s,
              normal: v ? p.ctaPrimaryHover : p.ctaPrimaryDefault,
              hovered: p.ctaPrimaryHover,
              focused: p.ctaPrimarySelected,
              pressed: p.ctaPrimaryHover,
              disabled: p.ctaPrimaryDisabled),
          border: resolveState<Color?>(s,
              normal: v ? p.ctaPrimaryVisited : p.ctaPrimaryDefault,
              hovered: p.ctaPrimaryHover,
              focused: p.ctaPrimarySelected,
              pressed: p.ctaPrimaryHover,
              disabled: p.ctaPrimaryDisabled),
        );
      case AppButtonStyle.tertiary:
        return _ButtonColors(
          background: resolveState<Color?>(s,
              normal: v || _vertical ? null : p.surfaceSecondary,
              hovered: p.surfaceSecondary,
              focused: p.surfaceSecondary,
              pressed: p.surfaceSecondary,
              disabled: null),
          foreground: resolveState(s,
              normal: v ? p.ctaPrimaryVisited : p.ctaPrimaryDefault,
              hovered: p.ctaPrimaryHover,
              focused: p.ctaPrimarySelected,
              pressed: p.ctaPrimarySelected,
              disabled: p.ctaPrimaryDisabled),
          border: resolveState<Color?>(s,
              normal: null,
              focused: p.ctaPrimarySelected,
              disabled: p.ctaPrimaryDisabled),
        );
    }
  }
}

class _ButtonColors {
  const _ButtonColors({this.background, required this.foreground, this.border});
  final Color? background;
  final Color foreground;
  final Color? border;
}
