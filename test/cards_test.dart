import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:jakt_fiske/jakt_fiske.dart';

Widget _wrap(Widget child) => MaterialApp(
      theme: AppTheme.light(),
      home: Scaffold(body: SingleChildScrollView(child: SizedBox(width: 340, child: child))),
    );

final _license = HuntingLicense(
  cardNumber: '1721894',
  cardType: CardType.dagskort,
  title: 'Jaktkort Malangen grunneierlag',
  group: SpeciesGroup.game,
  validDates: [DateTime(2024, 12, 13), DateTime(2024, 12, 14)],
  speciesText: 'Lirype, Hare',
  hunterNumber: '654321',
  holderName: 'Ola Nordmann',
  phone: '987 65 432',
);

void main() {
  test('formatering', () {
    expect(formatDate(DateTime(2024, 3, 5)), '05.03.2024');
    expect(formatKroner(75), '75,-');
    expect(formatKroner(1250), '1 250,-');
    expect(weekdayShort(DateTime(2024, 11, 18)), 'Man');
    expect(monthShort(DateTime(2024, 11, 18)), 'nov');
  });

  testWidgets('OfferCard viser tilbud og kaller Kjøp', (tester) async {
    var bought = false;
    await tester.pumpWidget(_wrap(OfferCard(
      offer: const Offer(
        title: 'Fiskekort Malangen',
        group: SpeciesGroup.fish,
        county: 'Telemark',
        municipality: 'Vinje',
        speciesText: 'Ørret',
        cardTypes: [CardType.dagskort],
        priceFrom: 75,
      ),
      onBuy: () => bought = true,
      onShowInMap: () {},
    )));
    expect(find.text('Pris fra 75,-'), findsOneWidget);
    expect(find.text('Vinje'), findsOneWidget);
    await tester.tap(find.text('Kjøp'));
    expect(bought, isTrue);
  });

  testWidgets('LicenseCard: datoer, aktivert og fangstrapport', (tester) async {
    await tester.pumpWidget(_wrap(LicenseCard(license: _license, onActivate: () {})));
    expect(find.text('13.12.2024'), findsOneWidget);
    expect(find.text('14.12.2024'), findsOneWidget);
    expect(find.text('Rapporter fangst'), findsNothing);

    final active = HuntingLicense(
      cardNumber: '1',
      cardType: CardType.ukeskort,
      title: 'Kort',
      group: SpeciesGroup.game,
      validDates: [DateTime(2024, 12, 13)],
      speciesText: 'Hare',
      hunterNumber: '1',
      holderName: 'A',
      activatedDate: DateTime(2024, 12, 13),
    );
    await tester.pumpWidget(_wrap(LicenseCard(license: active, onReportCapture: () {})));
    expect(find.text('Rapporter fangst'), findsOneWidget);
  });

  testWidgets('LicenseCard.details viser «Utstedt til» og lenker', (tester) async {
    await tester.pumpWidget(_wrap(LicenseCard.details(
      license: _license,
      onRules: () {},
      onDownloadOfflineMap: () {},
    )));
    expect(find.text('Utstedt til'), findsOneWidget);
    expect(find.text('987 65 432'), findsOneWidget);
    expect(find.text('Kvoter og regler'), findsOneWidget);
    expect(find.text('Kvittering for kjøp'), findsNothing);
    expect(find.text('Last ned offline kart'), findsOneWidget);
  });

  testWidgets('ActivationCard bytter hovedknapp', (tester) async {
    final a = Activation(
      licenseTitle: 'Småviltjakt',
      cardNumber: '1',
      county: 'Trøndelag',
      municipality: 'Selbu',
      date: DateTime(2024, 12, 13),
    );
    await tester.pumpWidget(_wrap(ActivationCard(activation: a, onRemove: () {})));
    expect(find.text('Fjern aktivering'), findsOneWidget);
    await tester.pumpWidget(_wrap(ActivationCard(activation: a, onRemove: () {}, onReportCapture: () {})));
    expect(find.text('Fangstrapport'), findsOneWidget);
    expect(find.text('Fjern aktivering'), findsNothing);
  });

  testWidgets('DayPicker: full dag kan ikke velges, valgt dag kan velges bort', (tester) async {
    final toggled = <DateTime>[];
    await tester.pumpWidget(_wrap(DayPicker(
      slots: [
        ActivationSlot(date: DateTime(2024, 11, 18), used: 1, capacity: 10),
        ActivationSlot(date: DateTime(2024, 11, 19), used: 10, capacity: 10),
        ActivationSlot(date: DateTime(2024, 11, 20), used: 10, capacity: 10),
      ],
      selected: {DateTime(2024, 11, 20)},
      onToggle: toggled.add,
    )));
    await tester.tap(find.text('18'));
    await tester.tap(find.text('19'));
    await tester.tap(find.text('20'));
    expect(toggled, [DateTime(2024, 11, 18), DateTime(2024, 11, 20)]);
  });

  testWidgets('LicenseSummary viser pris kun med pris-variant', (tester) async {
    final l = HuntingLicense(
      cardNumber: '1',
      cardType: CardType.dagskort,
      title: 'Rådyrjakt',
      group: SpeciesGroup.game,
      validDates: [DateTime(2024, 12, 13)],
      speciesText: 'Rådyr',
      hunterNumber: '1',
      holderName: 'A',
      price: 300,
    );
    await tester.pumpWidget(_wrap(LicenseSummary(license: l)));
    expect(find.text('kr 300,-'), findsNothing);
    await tester.pumpWidget(_wrap(LicenseSummary(license: l, variant: LicenseSummaryVariant.withPrice)));
    expect(find.text('kr 300,-'), findsOneWidget);
    await tester.pumpWidget(_wrap(LicenseSummary(license: l, variant: LicenseSummaryVariant.full)));
    expect(find.text('Aktiver jaktkort'), findsOneWidget);
  });
}
