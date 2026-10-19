import 'package:flutter/material.dart';

import '../domain/card_type.dart';
import '../domain/license.dart';
import '../domain/species.dart';
import 'repositories.dart';

/// Eksempeldata og tilstand for prototypen. Implementerer de samme
/// grensesnittene som de ekte datakildene skal gjøre.
class DemoStore extends ChangeNotifier
    implements OfferRepository, LicenseRepository, CaptureReportRepository {
  DemoStore();

  ThemeMode themeMode = ThemeMode.light;

  /// Simulerer at telefonen er uten dekning (valg i Innstillinger).
  bool offline = false;

  bool showOffersTab = true;
  bool showHuntingTab = true;
  bool showFishingTab = true;

  void setThemeMode(ThemeMode m) {
    themeMode = m;
    notifyListeners();
  }

  void setOffline(bool v) {
    offline = v;
    if (!v) {
      // Kommer på nett: send det som venter.
      for (var i = 0; i < _reports.length; i++) {
        _reports[i] = _reports[i].copyWith(synced: true);
      }
    }
    notifyListeners();
  }

  void setTabVisible({bool? offers, bool? hunting, bool? fishing}) {
    showOffersTab = offers ?? showOffersTab;
    showHuntingTab = hunting ?? showHuntingTab;
    showFishingTab = fishing ?? showFishingTab;
    notifyListeners();
  }

  // ---------- Tilbud ----------

  final List<Offer> _offers = const [
    Offer(
      title: 'Rådyrjakt hos Statskog - Stendammen i Løten',
      group: SpeciesGroup.game,
      county: 'Innlandet',
      municipality: 'Løten',
      speciesText: 'Rådyr',
      cardTypes: [CardType.dagskort, CardType.ukeskort],
      unavailableCardTypes: [CardType.sesongkort],
      priceFrom: 660,
      imageAsset: 'assets/images/eksempel/tilbud_radyr.jpg',
    ),
    Offer(
      title: 'Skogsfugljakt hos Statskog - Børresen i Finnemarka',
      group: SpeciesGroup.game,
      county: 'Buskerud',
      municipality: 'Lier',
      speciesText: 'Orrfugl, Tiur, Jerpe',
      cardTypes: [CardType.dagskort, CardType.ukeskort],
      unavailableCardTypes: [CardType.sesongkort],
      priceFrom: 365,
      imageAsset: 'assets/images/eksempel/tilbud_skogsfugl.jpg',
    ),
    Offer(
      title: 'Småviltjakt i Hersjøen-Kråssådal utmarkslag',
      group: SpeciesGroup.game,
      county: 'Trøndelag',
      municipality: 'Selbu',
      speciesText: 'Lirype, Fjellrype, Orrfugl, Hare',
      cardTypes: [CardType.dagskort, CardType.sesongkort],
      priceFrom: 300,
      imageAsset: 'assets/images/eksempel/tilbud_rype.jpg',
    ),
    Offer(
      title: 'Fiskekort Malangen grunneierlag',
      group: SpeciesGroup.fish,
      county: 'Troms',
      municipality: 'Balsfjord',
      speciesText: 'Innlandsfiske, Ørret, Røye, Sik, Harr',
      cardTypes: [CardType.dagskort, CardType.ukeskort, CardType.aarskort],
      priceFrom: 75,
      imageAsset: 'assets/images/eksempel/tilbud_orret.jpg',
    ),
    Offer(
      title: 'Fiske i Femund - Statskog',
      group: SpeciesGroup.fish,
      county: 'Innlandet',
      municipality: 'Engerdal',
      speciesText: 'Ørret, Røye, Harr, Gjedde, Abbor',
      cardTypes: [CardType.dagskort, CardType.sesongkort],
      priceFrom: 120,
      imageAsset: 'assets/images/eksempel/tilbud_fjellvann.jpg',
    ),
  ];

  static const _speciesWords = {
    Species.radyr: 'Rådyr',
    Species.orrfugl: 'Orrfugl',
    Species.tiur: 'Tiur',
    Species.jerpe: 'Jerpe',
    Species.lirype: 'Lirype',
    Species.fjellrype: 'Fjellrype',
    Species.hare: 'Hare',
  };

  @override
  List<Offer> offers(SpeciesGroup group, {String query = '', Set<Species> species = const {}}) {
    final q = query.trim().toLowerCase();
    return _offers.where((o) {
      if (o.group != group) return false;
      if (q.isNotEmpty &&
          !('${o.title} ${o.county} ${o.municipality} ${o.speciesText}').toLowerCase().contains(q)) {
        return false;
      }
      if (species.isNotEmpty &&
          !species.any((s) => o.speciesText.contains(_speciesWords[s] ?? s.label))) {
        return false;
      }
      return true;
    }).toList();
  }

  // ---------- Kort og aktiveringer ----------

  static DateTime get _today {
    final n = DateTime.now();
    return DateTime(n.year, n.month, n.day);
  }

  late final List<HuntingLicense> _licenses = [
    HuntingLicense(
      cardNumber: '1721894',
      cardType: CardType.sesongkort,
      title: 'Småviltjakt i Hersjøen-Kråssådal utmarkslag',
      group: SpeciesGroup.game,
      validDates: [_today, _today.add(const Duration(days: 60))],
      speciesText: 'Lirype, Fjellrype, Orrfugl, Hare',
      hunterNumber: '654321',
      holderName: 'Ola Nordmann',
      phone: '987 65 432',
      email: 'ola@eksempel.no',
      price: 1200,
    ),
    HuntingLicense(
      cardNumber: '1721950',
      cardType: CardType.dagskort,
      title: 'Skogsfugljakt hos Statskog - Børresen i Finnemarka',
      group: SpeciesGroup.game,
      validDates: [for (var i = 3; i < 6; i++) _today.add(Duration(days: i))],
      speciesText: 'Orrfugl, Tiur, Jerpe',
      hunterNumber: '654321',
      holderName: 'Ola Nordmann',
      price: 365,
    ),
    HuntingLicense(
      cardNumber: '1722001',
      cardType: CardType.ukeskort,
      title: 'Fiskekort Malangen grunneierlag',
      group: SpeciesGroup.fish,
      validDates: [_today, _today.add(const Duration(days: 6))],
      speciesText: 'Innlandsfiske, Ørret, Røye, Sik, Harr',
      hunterNumber: '654321',
      holderName: 'Ola Nordmann',
      price: 300,
    ),
  ];

  late final List<Activation> _activations = [
    Activation(
      licenseTitle: 'Småviltjakt i Hersjøen-Kråssådal utmarkslag',
      cardNumber: '1721894',
      county: 'Trøndelag',
      municipality: 'Selbu',
      date: _today.subtract(const Duration(days: 1)),
    ),
  ];

  @override
  List<HuntingLicense> licenses(SpeciesGroup group) =>
      _licenses.where((l) => l.group == group).toList();

  @override
  List<Activation> activations() => [..._activations]..sort((a, b) => b.date.compareTo(a.date));

  @override
  List<ActivationSlot> activationSlots(HuntingLicense license) {
    final booked = {
      for (final a in _activations)
        if (a.cardNumber == license.cardNumber) a.date,
    };
    return [
      for (var i = 0; i < 10; i++)
        () {
          final d = _today.add(Duration(days: i));
          final used = const [4, 2, 0, 0, 10, 6, 0, 1, 0, 3][i] + (booked.contains(d) ? 1 : 0);
          return ActivationSlot(date: d, used: used.clamp(0, 10), capacity: 10, available: !booked.contains(d));
        }(),
    ];
  }

  @override
  Future<void> activate(HuntingLicense license, Set<DateTime> days) async {
    if (offline) throw const OfflineException('Aktivering krever nett.');
    final o = _offers.where((o) => o.title == license.title).firstOrNull;
    for (final d in days) {
      _activations.add(Activation(
        licenseTitle: license.title,
        cardNumber: license.cardNumber,
        county: o?.county ?? 'Trøndelag',
        municipality: o?.municipality ?? 'Selbu',
        date: d,
      ));
    }
    notifyListeners();
  }

  @override
  Future<void> removeActivation(Activation activation) async {
    if (offline) throw const OfflineException('Å fjerne en aktivering krever nett.');
    _activations.remove(activation);
    notifyListeners();
  }

  // ---------- Fangstrapport ----------

  final List<CaptureReport> _reports = [];

  @override
  List<CaptureReport> reports() => [..._reports]..sort((a, b) => b.createdAt.compareTo(a.createdAt));

  bool isReported(Activation a) => _reports.any((r) => identical(r.activation, a));

  @override
  Future<void> submit(CaptureReport report) async {
    _reports.add(report.copyWith(synced: !offline));
    notifyListeners();
  }

  int get pendingReports => _reports.where((r) => !r.synced).length;
}

class OfflineException implements Exception {
  const OfflineException(this.message);
  final String message;
  @override
  String toString() => message;
}

/// Gjør [DemoStore] tilgjengelig i widget-treet.
class AppScope extends InheritedNotifier<DemoStore> {
  const AppScope({super.key, required DemoStore store, required super.child})
      : super(notifier: store);

  static DemoStore of(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<AppScope>()!.notifier!;
}
