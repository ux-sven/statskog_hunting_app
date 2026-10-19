import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:jakt_fiske/components/components.dart';

Widget _wrap(Widget child) => MaterialApp(
      theme: AppTheme.light(),
      home: Scaffold(body: Center(child: child)),
    );

void main() {
  testWidgets('AppButton viser label og kaller onPressed', (tester) async {
    var taps = 0;
    await tester.pumpWidget(_wrap(AppButton(label: 'Kjøp', onPressed: () => taps++)));
    await tester.tap(find.text('Kjøp'));
    expect(taps, 1);
  });

  testWidgets('AppButton uten onPressed er deaktivert', (tester) async {
    await tester.pumpWidget(_wrap(const AppButton(label: 'Kjøp', onPressed: null)));
    await tester.tap(find.text('Kjøp'));
    expect(find.text('Kjøp'), findsOneWidget);
  });

  testWidgets('AppCheckbox veksler verdi', (tester) async {
    bool? value = false;
    await tester.pumpWidget(_wrap(StatefulBuilder(
      builder: (context, setState) => AppCheckbox(
        value: value,
        label: 'Med hund',
        onChanged: (v) => setState(() => value = v),
      ),
    )));
    await tester.tap(find.text('Med hund'));
    expect(value, isTrue);
  });

  testWidgets('AppChip kan velges og fjernes', (tester) async {
    var selected = false;
    var deleted = false;
    await tester.pumpWidget(_wrap(AppChip(
      label: 'Rype',
      onSelected: (v) => selected = v,
      onDeleted: () => deleted = true,
    )));
    await tester.tap(find.text('Rype'));
    await tester.tap(find.byWidgetPredicate(
        (w) => w is AppIcon && w.icon == AppIcons.deleteClose));
    expect(selected, isTrue);
    expect(deleted, isTrue);
  });

  testWidgets('AppTablePagination går til neste side', (tester) async {
    var page = 1;
    await tester.pumpWidget(_wrap(AppTablePagination(
      currentPage: page,
      pageCount: 5,
      onPageChanged: (n) => page = n,
    )));
    await tester.tap(find.byWidgetPredicate(
        (w) => w is AppIcon && w.icon == AppIcons.chevronRoundedRight));
    expect(page, 2);
  });
}
