import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:jakt_fiske/app/app.dart';
import 'package:jakt_fiske/data/demo_store.dart';

void main() {
  Future<DemoStore> start(WidgetTester tester) async {
    tester.view.physicalSize = const Size(402, 874);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.reset);
    final store = DemoStore();
    await tester.pumpWidget(JaktFiskeApp(store: store));
    await tester.pumpAndSettle();
    return store;
  }

  testWidgets('Tilbud vises og kan byttes til fiske', (tester) async {
    await start(tester);
    expect(find.text('Tilbud småviltjakt'), findsOneWidget);
    await tester.tap(find.text('Fiske').first);
    await tester.pumpAndSettle();
    expect(find.text('Tilbud fiske'), findsOneWidget);
  });

  testWidgets('Aktivere jaktkort og se aktiveringen', (tester) async {
    final store = await start(tester);
    final before = store.activations().length;
    await tester.tap(find.text('Jaktkort').last);
    await tester.pumpAndSettle();
    expect(find.text('Mine jaktkort'), findsOneWidget);
    await tester.tap(find.text('Aktiver').first);
    await tester.pumpAndSettle();
    expect(find.text('Velg dager du skal jakte'), findsOneWidget);
    // Velg første ledige dag (i morgen = dag 2 i listen).
    final tomorrow = DateTime.now().add(const Duration(days: 1));
    await tester.tap(find.text('${tomorrow.day}').first);
    await tester.pump();
    await tester.tap(find.text('Aktiver 1 dag'));
    await tester.pumpAndSettle();
    expect(store.activations().length, before + 1);
    expect(find.text('Fjern aktivering'), findsWidgets);
  });

  testWidgets('Fangstrapport uten dekning venter og sendes når nett kommer', (tester) async {
    final store = await start(tester);
    store.setOffline(true);
    await tester.pumpAndSettle();
    expect(find.text('Uten dekning – viser lagrede data'), findsOneWidget);
    await tester.tap(find.text('Fangstrapport').last);
    await tester.pumpAndSettle();
    await tester.tap(find.text('Fangstrapport').first);
    await tester.pumpAndSettle();
    expect(find.text('Hva fikk du?'), findsOneWidget);
    await tester.tap(find.text('Send rapport uten fangst'));
    await tester.pumpAndSettle();
    expect(store.pendingReports, 1);
    store.setOffline(false);
    expect(store.pendingReports, 0);
  });
}
