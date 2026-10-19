import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:jakt_fiske/features/filter/screens/filter_list_screen.dart';
import 'package:jakt_fiske/jakt_fiske.dart';

Widget _wrap(Widget child) => MaterialApp(
      theme: AppTheme.light(),
      home: Scaffold(body: child),
    );

void main() {
  testWidgets('FilterOptionTile.check veksler ved trykk på raden', (tester) async {
    var selected = false;
    await tester.pumpWidget(_wrap(FilterOptionTile.check(
      label: 'Ørret',
      species: Species.orret,
      selected: selected,
      onChanged: (v) => selected = v,
    )));
    await tester.tap(find.text('Ørret'));
    expect(selected, isTrue);
  });

  testWidgets('FilterOptionTile.counter øker og stopper på min', (tester) async {
    var count = 0;
    await tester.pumpWidget(_wrap(StatefulBuilder(
      builder: (context, setState) => FilterOptionTile.counter(
        label: 'Lirype',
        species: Species.lirype,
        count: count,
        onChanged: (v) => setState(() => count = v),
      ),
    )));
    await tester.tap(find.byWidgetPredicate((w) => w is AppIcon && w.icon == AppIcons.minus));
    expect(count, 0);
    await tester.tap(find.byWidgetPredicate((w) => w is AppIcon && w.icon == AppIcons.plus));
    await tester.pump();
    expect(count, 1);
    expect(find.text('1'), findsOneWidget);
  });

  testWidgets('AppSegmentedControl melder valgt indeks', (tester) async {
    var index = 0;
    await tester.pumpWidget(_wrap(AppSegmentedControl(
      segments: const ['Småviltjakt', 'Fiske'],
      selectedIndex: index,
      onChanged: (i) => index = i,
    )));
    await tester.tap(find.text('Fiske'));
    expect(index, 1);
  });

  testWidgets('ExpandableSection skjuler innhold', (tester) async {
    await tester.pumpWidget(_wrap(const ExpandableSection(
      title: 'Stedstreff',
      children: [Text('Namsskogan')],
    )));
    expect(find.text('Namsskogan'), findsOneWidget);
    await tester.tap(find.text('Stedstreff'));
    await tester.pump();
    expect(find.text('Namsskogan'), findsNothing);
  });

  testWidgets('AppListTile.toggle og slett', (tester) async {
    var on = false;
    var deleted = false;
    await tester.pumpWidget(_wrap(Column(children: [
      AppListTile.toggle(title: 'Vis tilbud', value: on, onChanged: (v) => on = v),
      AppListTile(title: 'Namsskogan', onTap: () {}, onDelete: () => deleted = true),
    ])));
    await tester.tap(find.byType(AppToggle));
    await tester.tap(find.bySemanticsLabel('Slett Namsskogan'));
    expect(on, isTrue);
    expect(deleted, isTrue);
  });

  testWidgets('FilterListScreen holder på valg', (tester) async {
    Set<String> result = {};
    await tester.pumpWidget(_wrap(FilterListScreen<String>(
      title: 'Område',
      items: const ['Agder', 'Oslo'],
      labelOf: (s) => s,
      onChanged: (s) => result = s,
    )));
    await tester.tap(find.text('Oslo'));
    await tester.pump();
    expect(result, {'Oslo'});
  });

  testWidgets('CardTypeBadge og AppNotice bygger', (tester) async {
    await tester.pumpWidget(_wrap(const Column(children: [
      CardTypeBadge(CardType.sesongkort),
      CardTypeBadge(CardType.dagskort, inactive: true),
      AppNotice(text: 'Husk å aktivere jaktkortet.'),
    ])));
    expect(find.byType(CardTypeBadge), findsNWidgets(2));
    expect(find.text('Husk å aktivere jaktkortet.'), findsOneWidget);
  });
}
