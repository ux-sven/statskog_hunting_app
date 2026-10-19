import '../domain/license.dart';
import '../domain/species.dart';

/// Grensesnittene skjermene bruker. I prototypen fylles de av [DemoStore];
/// senere av Inatur API (tilbud, kort, aktiveringer) og Jaktdatabasen
/// (fangstrapport, felt) med lokal lagring for bruk uten nett.

abstract interface class OfferRepository {
  /// Tilbud fra Inatur `GET /v1/sales-pages`.
  List<Offer> offers(SpeciesGroup group, {String query = '', Set<Species> species = const {}});
}

abstract interface class LicenseRepository {
  /// Kjøpte kort fra Inatur `GET /v1/permits`.
  List<HuntingLicense> licenses(SpeciesGroup group);

  /// Aktiveringer fra Inatur `GET /v1/activations`.
  List<Activation> activations();

  /// Kapasitet per dag for aktivering.
  List<ActivationSlot> activationSlots(HuntingLicense license);

  /// Inatur `POST /v1/activations` – krever nett.
  Future<void> activate(HuntingLicense license, Set<DateTime> days);

  /// Inatur `DELETE /v1/activations/{id}` – krever nett.
  Future<void> removeActivation(Activation activation);
}

/// En levert eller ventende fangstrapport (til Jaktdatabasen).
class CaptureReport {
  const CaptureReport({
    required this.activation,
    required this.catches,
    required this.hunted,
    required this.createdAt,
    this.synced = false,
  });

  final Activation activation;
  final Map<Species, int> catches;
  final bool hunted;
  final DateTime createdAt;

  /// `false` mens rapporten venter på nett.
  final bool synced;

  int get total => catches.values.fold(0, (a, b) => a + b);

  CaptureReport copyWith({bool? synced}) => CaptureReport(
        activation: activation,
        catches: catches,
        hunted: hunted,
        createdAt: createdAt,
        synced: synced ?? this.synced,
      );
}

abstract interface class CaptureReportRepository {
  List<CaptureReport> reports();

  /// Lagres lokalt og sendes til Jaktdatabasen når appen er på nett.
  Future<void> submit(CaptureReport report);
}
