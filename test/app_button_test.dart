import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:jakt_fiske/components/app_button.dart';

void main() {
  testWidgets('AppButton viser label og er deaktivert uten onPressed',
      (tester) async {
    await tester.pumpWidget(const MaterialApp(
      home: Scaffold(body: AppButton(label: 'Kjøp', onPressed: null)),
    ));
    expect(find.text('Kjøp'), findsOneWidget);
    final button = tester.widget<TextButton>(find.byType(TextButton));
    expect(button.onPressed, isNull);
  });
}
