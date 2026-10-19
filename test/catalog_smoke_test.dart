import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:jakt_fiske/catalog/component_catalog.dart';
import 'package:jakt_fiske/components/components.dart';

void main() {
  for (final dark in [false, true]) {
    testWidgets('Komponentkatalogen bygges uten feil (mørk: $dark)', (tester) async {
      tester.view.physicalSize = const Size(1400, 12000);
      tester.view.devicePixelRatio = 1;
      addTearDown(tester.view.reset);
      await tester.pumpWidget(MaterialApp(
        theme: dark ? AppTheme.dark() : AppTheme.light(),
        home: const Scaffold(body: ComponentCatalogBody()),
      ));
      final e = tester.takeException();
      if (e is FlutterError) debugPrint(e.toStringDeep());
      expect(e, isNull);
      expect(find.text('Buttons'), findsOneWidget);
      expect(find.text('Text Input'), findsOneWidget);
    });
  }
}
