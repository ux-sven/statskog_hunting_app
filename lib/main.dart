import 'package:flutter/material.dart';

import 'components/components.dart';

void main() => runApp(const JaktFiskeApp());

/// Komponentkatalog: viser alle komponentene fra designsystemet, side for side
/// som i Figma, slik at de kan sammenlignes visuelt.
class JaktFiskeApp extends StatefulWidget {
  const JaktFiskeApp({super.key});

  @override
  State<JaktFiskeApp> createState() => _JaktFiskeAppState();
}

class _JaktFiskeAppState extends State<JaktFiskeApp> {
  ThemeMode _mode = ThemeMode.light;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Jakt & fiske – komponenter',
      theme: AppTheme.light(),
      darkTheme: AppTheme.dark(),
      themeMode: _mode,
      home: ComponentCatalog(
        dark: _mode == ThemeMode.dark,
        onToggleDark: (v) =>
            setState(() => _mode = v ? ThemeMode.dark : ThemeMode.light),
      ),
    );
  }
}

class ComponentCatalog extends StatefulWidget {
  const ComponentCatalog({super.key, required this.dark, required this.onToggleDark});
  final bool dark;
  final ValueChanged<bool> onToggleDark;

  @override
  State<ComponentCatalog> createState() => _ComponentCatalogState();
}

class _ComponentCatalogState extends State<ComponentCatalog> {
  bool? _check = true;
  bool _check2 = false;
  String _radio = 'jakt';
  final _chips = <String>{'Rype'};
  int _tab = 0;
  int _page = 2;
  UserLocationMode _loc = UserLocationMode.notActive;

  @override
  Widget build(BuildContext context) {
    final p = AppPalette.of(context);
    Widget section(String title, List<Widget> children) => Padding(
          padding: const EdgeInsets.only(bottom: AppSpacing.l),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(title, style: AppType.headlineH2.copyWith(color: p.textBrand)),
            const SizedBox(height: AppSpacing.xs),
            Wrap(
              spacing: AppSpacing.s,
              runSpacing: AppSpacing.s,
              crossAxisAlignment: WrapCrossAlignment.center,
              children: children,
            ),
          ]),
        );

    return Scaffold(
      appBar: AppBar(
        title: const Text('Komponenter'),
        actions: [
          const Text('Mørk'),
          Switch(value: widget.dark, onChanged: widget.onToggleDark),
        ],
      ),
      body: ListView(padding: const EdgeInsets.all(AppSpacing.m), children: [
        section('Buttons', [
          for (final size in AppSize.values)
            for (final style in AppButtonStyle.values)
              AppButton(
                label: 'Kjøp',
                size: size,
                style: style,
                leadingIcon: const AppIcon(AppIcons.priceTag),
                onPressed: () {},
              ),
          const AppButton(label: 'Deaktivert', onPressed: null),
          AppButton(
            label: 'Kart',
            orientation: AppButtonOrientation.vertical,
            leadingIcon: const AppIcon(AppIcons.map),
            onPressed: () {},
          ),
        ]),
        section('Ikoner', [
          for (final icon in AppIcons.values)
            Tooltip(
              message: icon.name,
              child: AppIcon(icon, color: p.ctaPrimaryDefault),
            ),
        ]),
        section('Arter', [
          for (final s in Species.values)
            Column(mainAxisSize: MainAxisSize.min, children: [
              SpeciesIcon(s),
              Text(s.label, style: AppType.bodyXtraSmall),
            ]),
        ]),
        section('Checkbox', [
          AppCheckbox(
              value: _check,
              tristate: true,
              label: 'Med hund',
              onChanged: (v) => setState(() => _check = v)),
          AppCheckbox(
              value: _check2,
              label: 'Jaktet alene',
              onChanged: (v) => setState(() => _check2 = v ?? false)),
          const AppCheckbox(value: false, label: 'Inaktiv', onChanged: null),
        ]),
        section('Chips', [
          for (final art in ['Rype', 'Skogsfugl', 'Hare'])
            AppChip(
              label: art,
              selected: _chips.contains(art),
              onSelected: (s) =>
                  setState(() => s ? _chips.add(art) : _chips.remove(art)),
              onDeleted: () => setState(() => _chips.remove(art)),
            ),
          const AppChip(label: 'Deaktivert', enabled: false),
        ]),
        section('Links', [
          AppLink(text: 'Kvoter og regler', onTap: () {}),
          AppLink(
              text: 'Tilbudsinfo på Inatur',
              icon: const AppIcon(AppIcons.externalLink),
              onTap: () {}),
          AppLink(text: 'Besøkt lenke', visited: true, onTap: () {}),
          const AppLink(text: 'Inaktiv', onTap: null),
        ]),
        section('Map', [
          MainMapNavigation(
            onHome: () {},
            onZoomIn: () {},
            onZoomOut: () {},
            onCompassNorth: () {},
            userLocationMode: _loc,
            onUserLocation: () => setState(() => _loc = UserLocationMode
                .values[(_loc.index + 1) % UserLocationMode.values.length]),
          ),
          SecondaryMapNavigation(
              onMapLayers: () {}, onBasemaps: () {}, onMeasure: () {}),
          MapButton(
              icon: const AppIcon(AppIcons.mapPlus), label: 'Action', onPressed: () {}),
          CabinPoi(onTap: () {}),
        ]),
        section('Radiobutton', [
          for (final v in ['jakt', 'fiske'])
            AppRadio<String>(
                value: v,
                groupValue: _radio,
                label: v == 'jakt' ? 'Småviltjakt' : 'Fiske',
                onChanged: (x) => setState(() => _radio = x)),
          const AppRadio<String>(
              value: 'x', groupValue: null, label: 'Inaktiv', onChanged: null),
        ]),
        section('Search', [
          const SizedBox(width: 360, child: AppSearchBar(placeholder: 'Søk etter tilbud')),
          const SizedBox(
              width: 360,
              child: AppSearchBar(
                  placeholder: 'Søk etter sted',
                  rounded: true,
                  iconPosition: SearchIconPosition.right,
                  buttonLabel: null)),
        ]),
        section('Tab Bar', [
          AppTabBar(
            tabs: const [
              AppTab(label: 'Alle jaktkort'),
              AppTab(label: 'Mine aktiveringer'),
            ],
            selectedIndex: _tab,
            onChanged: (i) => setState(() => _tab = i),
          ),
        ]),
        section('TableView', [
          SizedBox(
            width: 480,
            child: Table(children: [
              const TableRow(children: [
                AppTableHeaderCell(label: 'Dato', size: AppSize.small),
                AppTableHeaderCell(label: 'Art', size: AppSize.small),
                AppTableHeaderCell(label: 'Antall', size: AppSize.small, numeric: true),
              ]),
              for (final (i, r) in const [
                ('12.11.2024', 'Orrfugl', '2'),
                ('09.11.2024', 'Lirype', '1'),
                ('02.11.2024', 'Hare', '1'),
              ].indexed)
                TableRow(children: [
                  AppTableCell(text: r.$1, size: AppSize.small, odd: i.isOdd),
                  AppTableCell(text: r.$2, size: AppSize.small, odd: i.isOdd),
                  AppTableCell(
                      text: r.$3,
                      size: AppSize.small,
                      odd: i.isOdd,
                      content: AppTableCellContent.number),
                ]),
            ]),
          ),
          AppTablePagination(
              currentPage: _page,
              pageCount: 12,
              size: AppSize.small,
              onPageChanged: (n) => setState(() => _page = n)),
        ]),
        section('Text Input', [
          const SizedBox(
              width: 267,
              child: AppTextField(label: 'Jegernummer', initialValue: '654321')),
          const SizedBox(
              width: 267,
              child: AppTextField(
                  label: 'E-post',
                  initialValue: 'feil@',
                  errorText: 'Ugyldig e-postadresse')),
          const SizedBox(
              width: 267,
              child: AppTextField(
                  label: 'Kortnr', initialValue: '1721894', readOnlyDisplay: true)),
        ]),
      ]),
    );
  }
}
