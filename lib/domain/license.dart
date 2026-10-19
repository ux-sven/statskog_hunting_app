import 'card_type.dart';
import 'species.dart';

/// Et tilbud om jakt- eller fiskekort (vises med `OfferCard`).
class Offer {
  const Offer({
    required this.title,
    required this.group,
    required this.county,
    required this.municipality,
    required this.speciesText,
    this.cardTypes = const [],
    this.unavailableCardTypes = const [],
    this.priceFrom,
    this.imageUrl,
    this.imageAsset,
  });

  final String title;
  final SpeciesGroup group;
  final String county;
  final String municipality;

  /// Arter/jaktformer som tekst, f.eks. «Innlandsfiske, Ørret, Gjedde».
  final String speciesText;
  final List<CardType> cardTypes;

  /// Korttyper som finnes, men ikke kan kjøpes nå («Card Inactive»).
  final List<CardType> unavailableCardTypes;
  final int? priceFrom;
  final String? imageUrl;
  final String? imageAsset;
}

/// Et kjøpt jakt- eller fiskekort.
class HuntingLicense {
  const HuntingLicense({
    required this.cardNumber,
    required this.cardType,
    required this.title,
    required this.group,
    required this.validDates,
    required this.speciesText,
    required this.hunterNumber,
    required this.holderName,
    this.phone,
    this.email,
    this.price,
    this.activatedDate,
  });

  final String cardNumber;
  final CardType cardType;
  final String title;
  final SpeciesGroup group;

  /// Dagene kortet gjelder (eller start og slutt for lengre kort).
  final List<DateTime> validDates;
  final String speciesText;
  final String hunterNumber;
  final String holderName;
  final String? phone;
  final String? email;
  final int? price;

  /// Dagen kortet er aktivert for, hvis det er aktivert.
  final DateTime? activatedDate;

  bool get isActivated => activatedDate != null;
}

/// En aktivering av et jaktkort for en dag.
class Activation {
  const Activation({
    required this.licenseTitle,
    required this.cardNumber,
    required this.county,
    required this.municipality,
    required this.date,
  });

  final String licenseTitle;
  final String cardNumber;
  final String county;
  final String municipality;
  final DateTime date;
}

/// Kapasitet for aktivering en gitt dag (Figma «Activation Day»).
class ActivationSlot {
  const ActivationSlot({
    required this.date,
    required this.used,
    required this.capacity,
    this.available = true,
  });

  final DateTime date;
  final int used;
  final int capacity;
  final bool available;

  bool get isFull => used >= capacity;
}
