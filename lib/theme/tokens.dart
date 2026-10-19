// GENERERT av tools/tokens/build.mjs fra tokens/figma-variables.json. Ikke rediger for hånd.
import 'package:flutter/material.dart';

/// Fargetokens fra Figma-samlingen «Token Colors» (modus Light og Dark).
/// Navnene speiler Figma: `cta/cta-primary-default` → [ctaPrimaryDefault].
///
/// Komponentene leser fargene med `AppPalette.of(context)`, så de følger
/// lys/mørk modus automatisk.
@immutable
class AppPalette extends ThemeExtension<AppPalette> {
  const AppPalette({
    required this.textPrimary,
    required this.textSecondary,
    required this.textTertiary,
    required this.textBrand,
    required this.textInvert,
    required this.surfacePrimary,
    required this.surfaceSecondary,
    required this.surfaceTertiary,
    required this.surfaceInvert,
    required this.surfaceTableviewHeader,
    required this.surfaceTableviewOdd,
    required this.borderPrimary,
    required this.borderSecondary,
    required this.borderTertiary,
    required this.borderInvert,
    required this.attentionSuccess,
    required this.attentionWarning,
    required this.attentionError,
    required this.ctaPrimaryDefault,
    required this.ctaPrimaryHover,
    required this.ctaPrimaryDisabled,
    required this.ctaPrimaryVisited,
    required this.ctaPrimarySelected,
    required this.ctaSecondaryDefault,
    required this.ctaSecondaryPressed,
    required this.ctaSecondarySelected,
    required this.ctaSecondaryDisabled,
    required this.shadePrimary,
    required this.shadeSecondary,
  });

  /// Figma: `text/text-primary` (color/brand/black/100)
  final Color textPrimary;
  /// Figma: `text/text-secondary` (color/brand/black/80)
  final Color textSecondary;
  /// Figma: `text/text-tertiary` (ultimate colors/gray/400)
  final Color textTertiary;
  /// Figma: `text/text-brand` (color/brand/green/100)
  final Color textBrand;
  /// Figma: `text/text-invert` (ultimate colors/white/white)
  final Color textInvert;
  /// Figma: `surface/surface-primary` (ultimate colors/white/white)
  final Color surfacePrimary;
  /// Figma: `surface/surface-secondary` (color/brand/grey/10)
  final Color surfaceSecondary;
  /// Figma: `surface/surface-tertiary` (color/brand/blue/100)
  final Color surfaceTertiary;
  /// Figma: `surface/surface-invert` (color/brand/green/100)
  final Color surfaceInvert;
  /// Figma: `surface/surface-tableview-header` (color/brand/green/20)
  final Color surfaceTableviewHeader;
  /// Figma: `surface/surface-tableview-odd` (color/brand/grey/20)
  final Color surfaceTableviewOdd;
  /// Figma: `border/border-primary` (color/brand/grey/20)
  final Color borderPrimary;
  /// Figma: `border/border-secondary` (color/brand/green/20)
  final Color borderSecondary;
  /// Figma: `border/border-tertiary` (color/brand/blue/100)
  final Color borderTertiary;
  /// Figma: `border/border-invert` (color/brand/green/80)
  final Color borderInvert;
  /// Figma: `attention/success` (color/dark tones/green)
  final Color attentionSuccess;
  /// Figma: `attention/warning` (color/brand/orange/100)
  final Color attentionWarning;
  /// Figma: `attention/error` (color/dark tones/red)
  final Color attentionError;
  /// Figma: `cta/cta-primary-default` (color/brand/green/100)
  final Color ctaPrimaryDefault;
  /// Figma: `cta/cta-primary-hover` (color/brand/green/100)
  final Color ctaPrimaryHover;
  /// Figma: `cta/cta-primary-disabled` (color/brand/grey/60)
  final Color ctaPrimaryDisabled;
  /// Figma: `cta/cta-primary-visited` (color/brand/green/80)
  final Color ctaPrimaryVisited;
  /// Figma: `cta/cta-primary-selected` (color/brand/orange/60)
  final Color ctaPrimarySelected;
  /// Figma: `cta/cta-secondary-default` (color/brand/orange/60)
  final Color ctaSecondaryDefault;
  /// Figma: `cta/cta-secondary-pressed` (color/brand/orange/70)
  final Color ctaSecondaryPressed;
  /// Figma: `cta/cta-secondary-selected` (color/brand/orange/80)
  final Color ctaSecondarySelected;
  /// Figma: `cta/cta-secondary-disabled` (color/brand/grey/60)
  final Color ctaSecondaryDisabled;
  /// Figma: `shade-primary` (color/shade/transparent-dark-strong)
  final Color shadePrimary;
  /// Figma: `shade-secondary` (color/shade/transparent-dark-medium)
  final Color shadeSecondary;

  static const light = AppPalette(
    textPrimary: Color(0xFF2A2A2A),
    textSecondary: Color(0xFF555555),
    textTertiary: Color(0xFF98A2B3),
    textBrand: Color(0xFF00594C),
    textInvert: Color(0xFFFFFFFF),
    surfacePrimary: Color(0xFFFFFFFF),
    surfaceSecondary: Color(0xFFF6F6F7),
    surfaceTertiary: Color(0xFF00A7B5),
    surfaceInvert: Color(0xFF00594C),
    surfaceTableviewHeader: Color(0xFFCCDEDB),
    surfaceTableviewOdd: Color(0xFFECEEEF),
    borderPrimary: Color(0xFFECEEEF),
    borderSecondary: Color(0xFFCCDEDB),
    borderTertiary: Color(0xFF00A7B5),
    borderInvert: Color(0xFF337A70),
    attentionSuccess: Color(0xFF66800B),
    attentionWarning: Color(0xFFFF7F32),
    attentionError: Color(0xFFAF3029),
    ctaPrimaryDefault: Color(0xFF00594C),
    ctaPrimaryHover: Color(0xFF00594C),
    ctaPrimaryDisabled: Color(0xFFC7CCCE),
    ctaPrimaryVisited: Color(0xFF337A70),
    ctaPrimarySelected: Color(0xFFFFB284),
    ctaSecondaryDefault: Color(0xFFFFB284),
    ctaSecondaryPressed: Color(0xFFFFA670),
    ctaSecondarySelected: Color(0xFFFF995B),
    ctaSecondaryDisabled: Color(0xFFC7CCCE),
    shadePrimary: Color(0x400B0B0B),
    shadeSecondary: Color(0x2E0B0B0B),
  );

  static const dark = AppPalette(
    textPrimary: Color(0xFFFCFCFD),
    textSecondary: Color(0xFFE4E7EC),
    textTertiary: Color(0xFF98A2B3),
    textBrand: Color(0xFFFFE5D6),
    textInvert: Color(0xFF2A2A2A),
    surfacePrimary: Color(0xFF404040),
    surfaceSecondary: Color(0xFF555555),
    surfaceTertiary: Color(0xFF99DCE1),
    surfaceInvert: Color(0xFFCCDEDB),
    surfaceTableviewHeader: Color(0xFF337A70),
    surfaceTableviewOdd: Color(0xFFA2AAAD),
    borderPrimary: Color(0xFF555555),
    borderSecondary: Color(0xFF7F7F7F),
    borderTertiary: Color(0xFF33B9C4),
    borderInvert: Color(0xFFCCDEDB),
    attentionSuccess: Color(0xFF6CE9A6),
    attentionWarning: Color(0xFFFF995B),
    attentionError: Color(0xFFFDA29B),
    ctaPrimaryDefault: Color(0xFFFFA670),
    ctaPrimaryHover: Color(0xFFFFB284),
    ctaPrimaryDisabled: Color(0xFFDADDDE),
    ctaPrimaryVisited: Color(0xFFFFB284),
    ctaPrimarySelected: Color(0xFF7FD3DA),
    ctaSecondaryDefault: Color(0xFF99DCE1),
    ctaSecondaryPressed: Color(0xFF66CAD3),
    ctaSecondarySelected: Color(0xFF99BDB7),
    ctaSecondaryDisabled: Color(0xFFDADDDE),
    shadePrimary: Color(0x40FFFFFF),
    shadeSecondary: Color(0x2EFFFFFF),
  );

  /// Henter paletten fra temaet, med Light som reserve.
  static AppPalette of(BuildContext context) =>
      Theme.of(context).extension<AppPalette>() ?? light;

  @override
  AppPalette copyWith() => this;

  @override
  AppPalette lerp(ThemeExtension<AppPalette>? other, double t) {
    if (other is! AppPalette) return this;
    Color l(Color a, Color b) => Color.lerp(a, b, t)!;
    return AppPalette(
      textPrimary: l(textPrimary, other.textPrimary),
      textSecondary: l(textSecondary, other.textSecondary),
      textTertiary: l(textTertiary, other.textTertiary),
      textBrand: l(textBrand, other.textBrand),
      textInvert: l(textInvert, other.textInvert),
      surfacePrimary: l(surfacePrimary, other.surfacePrimary),
      surfaceSecondary: l(surfaceSecondary, other.surfaceSecondary),
      surfaceTertiary: l(surfaceTertiary, other.surfaceTertiary),
      surfaceInvert: l(surfaceInvert, other.surfaceInvert),
      surfaceTableviewHeader: l(surfaceTableviewHeader, other.surfaceTableviewHeader),
      surfaceTableviewOdd: l(surfaceTableviewOdd, other.surfaceTableviewOdd),
      borderPrimary: l(borderPrimary, other.borderPrimary),
      borderSecondary: l(borderSecondary, other.borderSecondary),
      borderTertiary: l(borderTertiary, other.borderTertiary),
      borderInvert: l(borderInvert, other.borderInvert),
      attentionSuccess: l(attentionSuccess, other.attentionSuccess),
      attentionWarning: l(attentionWarning, other.attentionWarning),
      attentionError: l(attentionError, other.attentionError),
      ctaPrimaryDefault: l(ctaPrimaryDefault, other.ctaPrimaryDefault),
      ctaPrimaryHover: l(ctaPrimaryHover, other.ctaPrimaryHover),
      ctaPrimaryDisabled: l(ctaPrimaryDisabled, other.ctaPrimaryDisabled),
      ctaPrimaryVisited: l(ctaPrimaryVisited, other.ctaPrimaryVisited),
      ctaPrimarySelected: l(ctaPrimarySelected, other.ctaPrimarySelected),
      ctaSecondaryDefault: l(ctaSecondaryDefault, other.ctaSecondaryDefault),
      ctaSecondaryPressed: l(ctaSecondaryPressed, other.ctaSecondaryPressed),
      ctaSecondarySelected: l(ctaSecondarySelected, other.ctaSecondarySelected),
      ctaSecondaryDisabled: l(ctaSecondaryDisabled, other.ctaSecondaryDisabled),
      shadePrimary: l(shadePrimary, other.shadePrimary),
      shadeSecondary: l(shadeSecondary, other.shadeSecondary),
    );
  }
}

/// «Token Dimensions/spacing/*» fra Figma.
abstract final class AppSpacing {
  static const none = 0.0;
  static const xs = 8.0;
  static const s = 12.0;
  static const m = 16.0;
  static const l = 24.0;
  static const xl = 32.0;
  static const xxl = 48.0;
  static const xxxl = 64.0;
}

/// «Token Dimensions/radius/*» fra Figma.
abstract final class AppRadius {
  static const none = 0.0;
  static const s = 4.0;
  static const m = 8.0;
  static const l = 12.0;
  static const xl = 16.0;
  static const xxl = 24.0;
  static const xxxl = 24.0;

  /// Helt avrundet (pille/sirkel). Finnes ikke som variabel i Figma.
  static const full = 999.0;
}

/// Felles størrelsesskala. Figma har Small / Medium / Large på de fleste sider.
enum AppSize { small, medium, large }
