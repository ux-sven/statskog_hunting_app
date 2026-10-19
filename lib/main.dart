import 'package:flutter/material.dart';

import 'features/filter/screens/filter_list_screen.dart';
import 'jakt_fiske.dart';

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
  int _seg = 0;
  bool _toggle = true;
  bool _fish = false;
  bool _art = true;
  bool _selectOpen = false;
  int _count = 2;
  bool? _fylke = false;
  final _days = <DateTime>{DateTime(2024, 11, 19)};

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
        section('Korttyper', [
          for (final t in CardType.values) Tooltip(message: t.label, child: CardTypeBadge(t)),
          const Tooltip(message: 'Inaktivt', child: CardTypeBadge(CardType.dagskort, inactive: true)),
        ]),
        section('Meldinger', [
          const SizedBox(
              width: 358,
              child: AppNotice(
                  text: 'Du har ingen aktiveringer.\nHusk å aktivere jaktkortet ditt før du går på jakt.')),
          SizedBox(
            width: 366,
            child: AppNotice.callout(
              text: 'Last ned offline kartområder med jaktgrenser dersom du skal jakte i områder uten mobildekning.',
              action: AppButton(
                label: 'Last ned her',
                style: AppButtonStyle.secondary,
                leadingIcon: const AppIcon(AppIcons.downloadFromCloud),
                onPressed: () {},
              ),
            ),
          ),
        ]),
        section('Segmentert valg og seksjoner', [
          SizedBox(
            width: 343,
            child: AppSegmentedControl(
                segments: const ['Småviltjakt', 'Fiske'],
                selectedIndex: _seg,
                onChanged: (i) => setState(() => _seg = i)),
          ),
          const SizedBox(
            width: 386,
            child: ExpandableSection(title: 'Stedstreff', children: [
              Text('Treff 1'),
              Text('Treff 2'),
            ]),
          ),
        ]),
        section('Listerader', [
          SizedBox(
            width: 358,
            child: Column(children: [
              AppListTile(title: 'Min profil', icon: AppIcons.account, onTap: () {}),
              AppListTile(
                  title: 'Mørk / Lys modus',
                  subtitle: 'Som på enhet',
                  layout: AppListTileLayout.inline,
                  icon: AppIcons.modeSwitch,
                  onTap: () {}),
              AppListTile.toggle(
                  title: 'Vis tilbud i menyen',
                  icon: AppIcons.priceTag,
                  value: _toggle,
                  onChanged: (v) => setState(() => _toggle = v)),
              AppListTile(
                  title: 'Namsskogan',
                  subtitle: '12 MB',
                  icon: AppIcons.map,
                  onTap: () {},
                  onDelete: () {},
                  showSeparator: false),
            ]),
          ),
        ]),
        section('Art og filterrader', [
          for (final l in SpeciesTileLayout.values)
            SizedBox(width: 160, child: SpeciesTile(species: Species.orret, layout: l)),
          SizedBox(
            width: 402,
            child: Column(children: [
              FilterOptionTile.check(
                  label: 'Ørret', species: Species.orret, selected: _fish,
                  onChanged: (v) => setState(() => _fish = v)),
              FilterOptionTile.check(
                  label: 'Ørret', species: Species.orret, selected: _art, checkboxFirst: true,
                  onChanged: (v) => setState(() => _art = v)),
              FilterOptionTile.select(
                  label: 'Ørret', species: Species.orret, expanded: _selectOpen,
                  onTap: () => setState(() => _selectOpen = !_selectOpen)),
              FilterOptionTile.counter(
                  label: 'Ørret', species: Species.orret, count: _count,
                  onChanged: (v) => setState(() => _count = v)),
              const FilterOptionTile.summary(label: 'Ørret', species: Species.orret, value: '2 stk'),
              FilterCheckboxTile(
                  label: 'Agder', value: _fylke, activeSubFilters: 1,
                  onChanged: (v) => setState(() => _fylke = v),
                  onClearSubFilters: () {}, onOpen: () {}),
            ]),
          ),
        ]),
        section('Eksempelvisninger', [
          AppButton(
            label: 'Filter: Art småvilt',
            style: AppButtonStyle.secondary,
            onPressed: () => Navigator.of(context).push(MaterialPageRoute(
              builder: (_) => Scaffold(
                body: SafeArea(
                  child: FilterListScreen<Species>(
                    title: 'Art',
                    items: Species.game.where((s) => !s.isCategory).toList(),
                    labelOf: (s) => s.label,
                    speciesOf: (s) => s,
                  ),
                ),
              ),
            )),
          ),
          AppButton(
            label: 'Filter: Område',
            style: AppButtonStyle.secondary,
            onPressed: () => Navigator.of(context).push(MaterialPageRoute(
              builder: (_) => Scaffold(
                body: SafeArea(
                  child: FilterListScreen<String>(
                    title: 'Område',
                    items: const ['Agder', 'Akershus', 'Buskerud', 'Finnmark', 'Innlandet',
                      'Møre og Romsdal', 'Nordland', 'Oslo', 'Rogaland', 'Telemark', 'Troms',
                      'Trøndelag', 'Vestfold', 'Vestland', 'Østfold', 'Svalbard'],
                    labelOf: (s) => s,
                    onOpenItem: (_) {},
                    subFilterCount: (s) => s == 'Nordland' ? 2 : 0,
                  ),
                ),
              ),
            )),
          ),
        ]),
        section('Kort', [
          SizedBox(
            width: 318,
            child: OfferCard(offer: _offer, onBuy: () {}, onInfo: () {}, onShowInMap: () {}),
          ),
          SizedBox(
            width: 318,
            child: LicenseCard(license: _license, onActivate: () {}, onInfo: () {}, onShowInMap: () {}),
          ),
          SizedBox(
            width: 318,
            child: LicenseCard(
                license: _activeLicense,
                onActivate: () {},
                onInfo: () {},
                onShowInMap: () {},
                onReportCapture: () {}),
          ),
          SizedBox(
            width: 318,
            child: LicenseCard.details(
              license: _license,
              onActivate: () {},
              onShowInMap: () {},
              onRules: () {},
              onReceipt: () {},
              onOfferInfo: () {},
              onDownloadOfflineMap: () {},
            ),
          ),
          SizedBox(
            width: 316,
            child: Column(children: [
              LicenseSummary(license: _huntingLicense),
              LicenseSummary(license: _huntingLicense, variant: LicenseSummaryVariant.withPrice),
            ]),
          ),
          SizedBox(
            width: 316,
            child: LicenseSummary(
                license: _huntingLicense,
                variant: LicenseSummaryVariant.full,
                onActivate: () {},
                onDocumentation: () {},
                onShowInMap: () {}),
          ),
          SizedBox(
            width: 350,
            child: Column(children: [
              ActivationCard(activation: _activation, onRemove: () {}, onReceipt: () {}, onShowInMap: () {}),
              const SizedBox(height: AppSpacing.m),
              ActivationCard(
                  activation: _activation, onReportCapture: () {}, onReceipt: () {}, onShowInMap: () {}),
            ]),
          ),
          SizedBox(
            width: 904,
            child: DayPicker(
              slots: [
                for (var i = 0; i < 10; i++)
                  ActivationSlot(
                    date: DateTime(2024, 11, 18 + i),
                    used: const [4, 2, 0, 0, 0, 10, 6, 0, 0, 0][i],
                    capacity: 10,
                    available: i != 5,
                  ),
              ],
              selected: _days,
              onToggle: (d) => setState(() => _days.contains(d) ? _days.remove(d) : _days.add(d)),
            ),
          ),
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

// Eksempeldata for katalogen.
const _offer = Offer(
  title: 'Fiskekort Malangen grunneierlag',
  group: SpeciesGroup.fish,
  county: 'Telemark',
  municipality: 'Vinje',
  speciesText: 'Innlandsfiske, Ørret, Gjedde, Abbor, Røye, Sik, Harr, Karpefisk, Brunørret, Andre',
  cardTypes: [CardType.dagskort, CardType.ukeskort],
  unavailableCardTypes: [CardType.sesongkort],
  priceFrom: 75,
  imageAsset: 'assets/images/eksempel/tilbud_fiske.png',
);

final _license = HuntingLicense(
  cardNumber: '1721894',
  cardType: CardType.dagskort,
  title: 'Jaktkort Malangen grunneierlag',
  group: SpeciesGroup.game,
  validDates: [DateTime(2024, 12, 13), DateTime(2024, 12, 14), DateTime(2024, 12, 15)],
  speciesText: 'Lirype, Fjellrype, Orrfugl, Hare',
  hunterNumber: '654321',
  holderName: 'Ola Nordmann',
  phone: '987 65 432',
  email: 'ola@eksempel.no',
);

final _activeLicense = HuntingLicense(
  cardNumber: '1721894',
  cardType: CardType.dagskort,
  title: 'Jaktkort Malangen grunneierlag',
  group: SpeciesGroup.game,
  validDates: [DateTime(2024, 12, 13)],
  speciesText: 'Lirype, Fjellrype, Orrfugl, Hare',
  hunterNumber: '654321',
  holderName: 'Ola Nordmann',
  activatedDate: DateTime(2024, 12, 13),
);

final _huntingLicense = HuntingLicense(
  cardNumber: '1721894',
  cardType: CardType.dagskort,
  title: 'Rådyrjakt ordinær felt 1. Ålseterfeltet - Løiten Almenning',
  group: SpeciesGroup.game,
  validDates: [DateTime(2024, 12, 13), DateTime(2024, 12, 14), DateTime(2024, 12, 15)],
  speciesText: 'Lirype, Fjellrype, Orrfugl, Hare',
  hunterNumber: '654321',
  holderName: 'Ola Nordmann',
  phone: '987 65 432',
  email: 'ola@eksempel.no',
  price: 300,
);

final _activation = Activation(
  licenseTitle: 'Småviltjakt i Hersjøen-Kråssådal utmarkslag',
  cardNumber: '1721894',
  county: 'Trøndelag',
  municipality: 'Selbu',
  date: DateTime(2024, 12, 13),
);
