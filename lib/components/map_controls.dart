import 'package:flutter/material.dart';

import '../theme/tokens.dart';
import '../theme/typography.dart';
import 'internal/interactive.dart';

/// Kontroller som ligger oppå kartet (siden «Map» i Figma).
///
/// Kartet selv (ArcGIS MapView) er ikke en del av designsystemet; disse
/// widgetene legges i en `Stack` over kartvisningen.

List<BoxShadow> _shadow(AppPalette p) =>
    [BoxShadow(color: p.shadeSecondary, blurRadius: 14, offset: const Offset(0, 2))];

/// Rund kartknapp («Map Button», `Type=Rounded`).
///
/// - `Icon` → [icon]
/// - `Label` + `Show label` (`State=Anim Label`) → [label]
/// - `State=Hover` følger ekte hover
class MapButton extends StatelessWidget {
  const MapButton({
    super.key,
    required this.icon,
    required this.onPressed,
    this.label,
    this.tooltip,
  });

  final Widget icon;
  final VoidCallback? onPressed;
  final String? label;
  final String? tooltip;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    final button = InteractiveBuilder(
      onTap: onPressed,
      semanticLabel: label ?? tooltip,
      builder: (context, states) => AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        height: 44,
        constraints: const BoxConstraints(minWidth: 44),
        padding: const EdgeInsets.all(11),
        decoration: BoxDecoration(
          color: states.contains(WidgetState.hovered)
              ? p.surfaceSecondary
              : p.surfacePrimary,
          borderRadius: BorderRadius.circular(AppRadius.full),
          boxShadow: _shadow(p),
        ),
        child: IconTheme.merge(
          data: IconThemeData(size: 22, color: p.ctaPrimaryDefault),
          child: Row(mainAxisSize: MainAxisSize.min, children: [
            icon,
            if (label != null) ...[
              const SizedBox(width: AppSpacing.xs),
              Text(label!,
                  style: AppType.bodyXtraSmall.copyWith(
                      fontWeight: FontWeight.w600, color: p.ctaPrimaryDefault)),
            ],
          ]),
        ),
      ),
    );
    return tooltip == null ? button : Tooltip(message: tooltip!, child: button);
  }
}

/// Zoom inn/ut («Zoom», `Style=Rounded`).
class MapZoomControl extends StatelessWidget {
  const MapZoomControl({super.key, required this.onZoomIn, required this.onZoomOut});

  final VoidCallback? onZoomIn;
  final VoidCallback? onZoomOut;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    Widget half(IconData icon, VoidCallback? onTap, String label, BorderRadius r) =>
        InteractiveBuilder(
          onTap: onTap,
          semanticLabel: label,
          builder: (context, states) => Container(
            width: 40,
            height: 42,
            decoration: BoxDecoration(
              color: states.contains(WidgetState.hovered)
                  ? p.surfaceSecondary
                  : p.surfacePrimary,
              borderRadius: r,
            ),
            child: Icon(icon, size: 22, color: p.ctaPrimaryDefault),
          ),
        );
    return DecoratedBox(
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20), boxShadow: _shadow(p)),
      child: Column(mainAxisSize: MainAxisSize.min, children: [
        half(Icons.add, onZoomIn, 'Zoom inn',
            const BorderRadius.vertical(top: Radius.circular(20))),
        const SizedBox(height: 4),
        half(Icons.remove, onZoomOut, 'Zoom ut',
            const BorderRadius.vertical(bottom: Radius.circular(20))),
      ]),
    );
  }
}

/// Tilstand for posisjonsknappen («User Location», `Property 1`).
enum UserLocationMode { notActive, active, north }

/// Viser og følger brukerens posisjon («User Location»).
class UserLocationButton extends StatelessWidget {
  const UserLocationButton({super.key, required this.mode, required this.onPressed});

  final UserLocationMode mode;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    final icon = switch (mode) {
      UserLocationMode.notActive => Icons.location_searching,
      UserLocationMode.active => Icons.navigation,
      UserLocationMode.north => Icons.explore,
    };
    return MapButton(
      icon: Icon(icon),
      onPressed: onPressed,
      tooltip: switch (mode) {
        UserLocationMode.notActive => 'Vis min posisjon',
        UserLocationMode.active => 'Følger posisjon',
        UserLocationMode.north => 'Følger posisjon med nord opp',
      },
    );
  }
}

/// Hovednavigasjon i kartet («Main Map Navigation»).
///
/// - `Show Home` → [onHome] satt
/// - `Show Zoom` → [onZoomIn]/[onZoomOut] satt
/// - `Show Compass North` → [onCompassNorth] satt
/// - `Show User location` → [userLocationMode] satt
class MainMapNavigation extends StatelessWidget {
  const MainMapNavigation({
    super.key,
    this.onHome,
    this.onZoomIn,
    this.onZoomOut,
    this.onCompassNorth,
    this.userLocationMode,
    this.onUserLocation,
  });

  final VoidCallback? onHome;
  final VoidCallback? onZoomIn;
  final VoidCallback? onZoomOut;
  final VoidCallback? onCompassNorth;
  final UserLocationMode? userLocationMode;
  final VoidCallback? onUserLocation;

  @override
  Widget build(BuildContext context) {
    final items = <Widget>[
      if (onHome != null)
        MapButton(icon: const Icon(Icons.home), onPressed: onHome, tooltip: 'Hjem'),
      if (onZoomIn != null || onZoomOut != null)
        MapZoomControl(onZoomIn: onZoomIn, onZoomOut: onZoomOut),
      if (onCompassNorth != null)
        MapButton(
            icon: const Icon(Icons.gps_fixed),
            onPressed: onCompassNorth,
            tooltip: 'Nord opp'),
      if (userLocationMode != null)
        UserLocationButton(mode: userLocationMode!, onPressed: onUserLocation),
    ];
    return _MapControlColumn(children: items);
  }
}

/// Verktøy i kartet («Secondary Map Navigation»). Hvert `Show …`-flagg i
/// Figma tilsvarer at callbacken er satt.
class SecondaryMapNavigation extends StatelessWidget {
  const SecondaryMapNavigation({
    super.key,
    this.onMapLayers,
    this.onBasemaps,
    this.onLegend,
    this.onMeasure,
    this.onPrint,
    this.onDraw,
    this.onTools,
    this.on3D,
  });

  final VoidCallback? onMapLayers,
      onBasemaps,
      onLegend,
      onMeasure,
      onPrint,
      onDraw,
      onTools,
      on3D;

  @override
  Widget build(BuildContext context) {
    Widget b(IconData i, VoidCallback? f, String t) =>
        MapButton(icon: Icon(i), onPressed: f, tooltip: t);
    return _MapControlColumn(children: [
      if (onMapLayers != null) b(Icons.layers_outlined, onMapLayers, 'Kartlag'),
      if (onBasemaps != null) b(Icons.map_outlined, onBasemaps, 'Bakgrunnskart'),
      if (onLegend != null) b(Icons.list_alt, onLegend, 'Tegnforklaring'),
      if (onMeasure != null) b(Icons.straighten, onMeasure, 'Mål'),
      if (onPrint != null) b(Icons.print_outlined, onPrint, 'Skriv ut'),
      if (onDraw != null) b(Icons.edit_outlined, onDraw, 'Tegn'),
      if (onTools != null) b(Icons.handyman_outlined, onTools, 'Verktøy'),
      if (on3D != null) b(Icons.view_in_ar_outlined, on3D, '3D'),
    ]);
  }
}

class _MapControlColumn extends StatelessWidget {
  const _MapControlColumn({required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    final spaced = <Widget>[];
    for (final c in children) {
      if (spaced.isNotEmpty) spaced.add(const SizedBox(height: AppSpacing.xs));
      spaced.add(c);
    }
    return Padding(
      padding: const EdgeInsets.all(AppSpacing.m),
      child: Column(mainAxisSize: MainAxisSize.min, children: spaced),
    );
  }
}

/// Hytte-markør i kartet («cabin poi»).
class CabinPoi extends StatelessWidget {
  const CabinPoi({super.key, this.onTap});
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    return Semantics(
      button: onTap != null,
      label: 'Hytte',
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          width: 30,
          height: 30,
          padding: const EdgeInsets.all(4),
          decoration: BoxDecoration(
            color: p.surfacePrimary,
            shape: BoxShape.circle,
            border: Border.all(color: p.borderInvert),
          ),
          child: Icon(Icons.cabin, size: 20, color: p.ctaPrimaryDefault),
        ),
      ),
    );
  }
}
