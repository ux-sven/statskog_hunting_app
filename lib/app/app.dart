import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

import '../data/demo_store.dart';
import '../features/cards/screens/my_cards_screen.dart';
import '../features/offers/screens/offers_screen.dart';
import '../features/report/screens/reporting_home_screen.dart';
import '../features/settings/screens/settings_screen.dart';
import '../jakt_fiske.dart';

/// Statskog Jakt & fiske – appen.
class JaktFiskeApp extends StatefulWidget {
  const JaktFiskeApp({super.key, this.store});

  /// Datakilde. I prototypen [DemoStore] med eksempeldata.
  final DemoStore? store;

  @override
  State<JaktFiskeApp> createState() => _JaktFiskeAppState();
}

class _JaktFiskeAppState extends State<JaktFiskeApp> {
  late final DemoStore _store = widget.store ?? DemoStore();

  @override
  Widget build(BuildContext context) {
    return AppScope(
      store: _store,
      child: ListenableBuilder(
        listenable: _store,
        builder: (context, _) => MaterialApp(
          title: 'Statskog Jakt & fiske',
          debugShowCheckedModeBanner: false,
          theme: AppTheme.light(),
          darkTheme: AppTheme.dark(),
          themeMode: _store.themeMode,
          locale: const Locale('nb'),
          supportedLocales: const [Locale('nb'), Locale('en')],
          localizationsDelegates: GlobalMaterialLocalizations.delegates,
          // På brede skjermer (web/Figma) vises appen i telefonbredde.
          builder: (context, child) => ColoredBox(
            color: AppPalette.of(context).surfaceTertiary.withValues(alpha: 0.15),
            child: Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 440),
                child: child,
              ),
            ),
          ),
          home: const AppShell(),
        ),
      ),
    );
  }
}

class _Tab {
  const _Tab(this.item, this.builder);
  final AppBottomNavItem item;
  final WidgetBuilder builder;
}

/// Bunnmeny og hovedskjermene.
class AppShell extends StatefulWidget {
  const AppShell({super.key});

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  String _current = 'Tilbud';

  @override
  Widget build(BuildContext context) {
    final store = AppScope.of(context);
    final tabs = <_Tab>[
      if (store.showOffersTab)
        _Tab(const AppBottomNavItem(icon: AppIcons.priceTag, label: 'Tilbud'), (_) => const OffersScreen()),
      if (store.showHuntingTab)
        _Tab(const AppBottomNavItem(icon: AppIcons.accuracy, label: 'Jaktkort'),
            (_) => const MyCardsScreen(group: SpeciesGroup.game)),
      if (store.showFishingTab)
        _Tab(const AppBottomNavItem(icon: AppIcons.fishingHook, label: 'Fiskekort'),
            (_) => const MyCardsScreen(group: SpeciesGroup.fish)),
      _Tab(const AppBottomNavItem(icon: AppIcons.report, label: 'Fangstrapport'),
          (_) => const ReportingHomeScreen()),
      _Tab(const AppBottomNavItem(icon: AppIcons.settings, label: 'Innstillinger'),
          (_) => const SettingsScreen()),
    ];
    var index = tabs.indexWhere((t) => t.item.label == _current);
    if (index < 0) index = 0;
    final p = AppPalette.of(context);

    return Scaffold(
      backgroundColor: p.surfacePrimary,
      body: SafeArea(
        bottom: false,
        child: Column(children: [
          if (store.offline)
            Container(
              width: double.infinity,
              color: p.attentionWarning,
              padding: const EdgeInsets.symmetric(vertical: 4, horizontal: AppSpacing.m),
              child: Text('Uten dekning – viser lagrede data',
                  textAlign: TextAlign.center,
                  style: AppType.bodySmall.copyWith(color: p.textInvert)),
            ),
          Expanded(
            child: KeyedSubtree(key: ValueKey(tabs[index].item.label), child: tabs[index].builder(context)),
          ),
        ]),
      ),
      bottomNavigationBar: AppBottomNav(
        items: [for (final t in tabs) t.item],
        selectedIndex: index,
        onChanged: (i) => setState(() => _current = tabs[i].item.label),
      ),
    );
  }
}
