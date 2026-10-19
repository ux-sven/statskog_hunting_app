import 'package:flutter/material.dart';

import '../../../app/widgets.dart';
import '../../../catalog/component_catalog.dart';
import '../../../data/demo_store.dart';
import '../../../jakt_fiske.dart';

/// Innstillinger (eksempelvisningen «Settings»).
class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final store = AppScope.of(context);
    final p = AppPalette.of(context);

    Widget group(String title, List<Widget> tiles) => Padding(
          padding: const EdgeInsets.fromLTRB(AppSpacing.m, AppSpacing.m, AppSpacing.m, 0),
          child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
            if (title.isNotEmpty) ...[
              Text(title, style: AppType.headlineH2.copyWith(color: p.textPrimary)),
              const SizedBox(height: AppSpacing.xs),
            ],
            ClipRRect(
              borderRadius: BorderRadius.circular(AppRadius.m),
              child: Column(children: tiles),
            ),
          ]),
        );

    final themeLabel = switch (store.themeMode) {
      ThemeMode.light => 'Lys',
      ThemeMode.dark => 'Mørk',
      ThemeMode.system => 'Som på enhet',
    };

    return ColoredBox(
      color: p.surfaceSecondary,
      child: ListView(
        padding: const EdgeInsets.only(bottom: AppSpacing.l),
        children: [
          const ScreenTitle('Innstillinger'),
          group('Generelt', [
            AppListTile(title: 'Min profil', icon: AppIcons.account, onTap: () {}),
            AppListTile(title: 'Varslinger', icon: AppIcons.notification, onTap: () {}),
            AppListTile(
              title: 'Mørk / Lys modus',
              subtitle: themeLabel,
              layout: AppListTileLayout.inline,
              icon: AppIcons.modeSwitch,
              showSeparator: false,
              onTap: () => store.setThemeMode(switch (store.themeMode) {
                ThemeMode.light => ThemeMode.dark,
                ThemeMode.dark => ThemeMode.system,
                ThemeMode.system => ThemeMode.light,
              }),
            ),
          ]),
          group('Oppsett meny', [
            AppListTile.toggle(
                title: 'Vis tilbud i menyen',
                icon: AppIcons.priceTag,
                value: store.showOffersTab,
                onChanged: (v) => store.setTabVisible(offers: v)),
            AppListTile.toggle(
                title: 'Vis mine jaktkort i menyen',
                icon: AppIcons.accuracy,
                value: store.showHuntingTab,
                onChanged: (v) => store.setTabVisible(hunting: v)),
            AppListTile.toggle(
                title: 'Vis mine fiskekort i menyen',
                icon: AppIcons.fishingHook,
                value: store.showFishingTab,
                showSeparator: false,
                onChanged: (v) => store.setTabVisible(fishing: v)),
          ]),
          group('Offline kart', [
            AppListTile(
                title: 'Last ned offline områder',
                icon: AppIcons.downloadFromCloud,
                onTap: () => showAppMessage(context, 'Velg område i kartet for å laste ned.')),
            AppListTile(title: 'Mine nedlastede områder', icon: AppIcons.map, onTap: () {}, showSeparator: false),
          ]),
          group('Prototype', [
            AppListTile.toggle(
                title: 'Simuler uten dekning',
                subtitle: 'Fangstrapporter venter, aktivering krever nett',
                icon: AppIcons.noMap,
                value: store.offline,
                onChanged: store.setOffline),
            AppListTile(
              title: 'Komponentkatalog',
              icon: AppIcons.editFolder,
              showSeparator: false,
              onTap: () => Navigator.of(context).push(MaterialPageRoute(
                builder: (_) => const Scaffold(
                  body: SafeArea(
                    child: Column(children: [
                      BackHeader(title: 'Komponentkatalog'),
                      Expanded(child: ComponentCatalogBody()),
                    ]),
                  ),
                ),
              )),
            ),
          ]),
          group('', [
            AppListTile(
                title: 'Logg ut',
                icon: AppIcons.logout,
                showSeparator: false,
                onTap: () => showAppMessage(context, 'Innlogging med Inatur kommer i neste versjon.')),
          ]),
        ],
      ),
    );
  }
}
