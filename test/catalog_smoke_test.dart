import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:jakt_fiske/main.dart';

void main() {
  for (final dark in [false, true]) {
    testWidgets('Komponentkatalogen bygges uten feil (mørk: $dark)', (tester) async {
      tester.view.physicalSize = const Size(1400, 4000);
      tester.view.devicePixelRatio = 1;
      addTearDown(tester.view.reset);
      await tester.pumpWidget(const JaktFiskeApp());
      if (dark) {
        await tester.tap(find.byType(Switch));
        await tester.pumpAndSettle();
      }
      expect(tester.takeException(), isNull);
      expect(find.text('Buttons'), findsOneWidget);
      expect(find.text('Text Input'), findsOneWidget);
    });
  }
}
