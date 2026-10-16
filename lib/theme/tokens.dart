import 'package:flutter/painting.dart';

/// Fargetokens hentet fra Figma-variablene «Token Colors» (Light-modus) i
/// «Jakt & Fiske (Design 2024)». Navnene speiler Figma: `cta/cta-primary-default`
/// blir `ctaPrimaryDefault`.
///
/// TODO: Generer denne filen automatisk fra Figma-variablene (inkl. Dark-modus)
/// når koblingen er verifisert.
abstract final class AppColors {
  // text/*
  static const textPrimary = Color(0xFF2A2A2A);
  static const textInvert = Color(0xFFFFFFFF);

  // surface/*
  static const surfacePrimary = Color(0xFFFFFFFF);
  static const surfaceSecondary = Color(0xFFF6F6F7);

  // cta/*
  static const ctaPrimaryDefault = Color(0xFF00594C);
  static const ctaPrimaryHover = Color(0xFF00594C);
  static const ctaPrimaryVisited = Color(0xFF337A70);
  static const ctaPrimarySelected = Color(0xFFFFB284);
  static const ctaPrimaryDisabled = Color(0xFFC7CCCE);
}

/// Dimensjoner brukt av knappekomponenten (fra Figma: padding 16/24, gap 16, radius 4).
abstract final class AppSpacing {
  static const buttonPaddingVertical = 16.0;
  static const buttonPaddingHorizontal = 24.0;
  static const buttonGap = 16.0;
  static const buttonRadius = 4.0;
}
