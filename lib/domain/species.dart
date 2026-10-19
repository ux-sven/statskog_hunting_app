// GENERERT fra Figma-rammen «Arter» (💠 Components). Ikke rediger for hånd.

/// Hva slags aktivitet arten hører til.
enum SpeciesGroup { fish, game }

/// Arter i jakt- og fisketilbudene. Brukes av filtre, tilbudskort,
/// fangstrapport og [SpeciesIcon].
///
/// [label] er visningsnavnet. Enum-navnene er ASCII fordi Dart krever det.
enum Species {
  /// Figma: «innlandsfiske» (node 3226:4659). Samlekategori.
  innlandsfiske('Innlandsfiske', SpeciesGroup.fish),
  /// Figma: «sjøørret» (node 3226:4667).
  sjoorret('Sjøørret', SpeciesGroup.fish),
  /// Figma: «ørret» (node 3226:4671).
  orret('Ørret', SpeciesGroup.fish),
  /// Figma: «abbor» (node 3226:4663).
  abbor('Abbor', SpeciesGroup.fish),
  /// Figma: «brunørret» (node 3226:4653).
  brunorret('Brunørret', SpeciesGroup.fish),
  /// Figma: «gjedde» (node 3226:4670).
  gjedde('Gjedde', SpeciesGroup.fish),
  /// Figma: «harr» (node 3226:4649).
  harr('Harr', SpeciesGroup.fish),
  /// Figma: «karpefisk» (node 3226:4651).
  karpefisk('Karpefisk', SpeciesGroup.fish),
  /// Figma: «kreps» (node 3226:4664).
  kreps('Kreps', SpeciesGroup.fish),
  /// Figma: «lake» (node 3226:4660).
  lake('Lake', SpeciesGroup.fish),
  /// Figma: «gjørs» (node 3226:4661).
  gjors('Gjørs', SpeciesGroup.fish),
  /// Figma: «sik» (node 3226:4669).
  sik('Sik', SpeciesGroup.fish),
  /// Figma: «røye» (node 3226:4657).
  roye('Røye', SpeciesGroup.fish),
  /// Figma: «småviltjakt» (node 3226:4656). Samlekategori.
  smaviltjakt('Småviltjakt', SpeciesGroup.game),
  /// Figma: «fjellrype» (node 3226:4666).
  fjellrype('Fjellrype', SpeciesGroup.game),
  /// Figma: «gjess» (node 3226:4654).
  gjess('Gjess', SpeciesGroup.game),
  /// Figma: «grevling» (node 3226:4652).
  grevling('Grevling', SpeciesGroup.game),
  /// Figma: «hare» (node 3226:4650).
  hare('Hare', SpeciesGroup.game),
  /// Figma: «jerpe» (node 3226:4648).
  jerpe('Jerpe', SpeciesGroup.game),
  /// Figma: «lirype» (node 3226:4655).
  lirype('Lirype', SpeciesGroup.game),
  /// Figma: «mår» (node 3226:4658).
  mar('Mår', SpeciesGroup.game),
  /// Figma: «orrfugl» (node 3226:4647).
  orrfugl('Orrfugl', SpeciesGroup.game),
  /// Figma: «ringdue» (node 3226:4646).
  ringdue('Ringdue', SpeciesGroup.game),
  /// Figma: «rødrev» (node 3226:4665).
  rodrev('Rødrev', SpeciesGroup.game),
  /// Figma: «røy» (node 3226:4645).
  roy('Røy', SpeciesGroup.game),
  /// Figma: «røyskatt» (node 3226:4644).
  royskatt('Røyskatt', SpeciesGroup.game),
  /// Figma: «rådyr» (node 3226:4668).
  radyr('Rådyr', SpeciesGroup.game),
  /// Figma: «tiur» (node 3226:4643).
  tiur('Tiur', SpeciesGroup.game),
  /// Figma: «villsvin» (node 3226:4662).
  villsvin('Villsvin', SpeciesGroup.game);

  const Species(this.label, this.group);

  final String label;
  final SpeciesGroup group;

  String get assetPath => 'assets/species/$name.svg';

  /// Samlekategoriene «Innlandsfiske» og «Småviltjakt».
  bool get isCategory => this == innlandsfiske || this == smaviltjakt;

  static List<Species> get fish =>
      values.where((s) => s.group == SpeciesGroup.fish && !s.isCategory).toList();

  static List<Species> get game =>
      values.where((s) => s.group == SpeciesGroup.game && !s.isCategory).toList();
}
