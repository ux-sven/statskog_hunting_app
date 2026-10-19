/// Korttyper for jakt- og fiskekort (Figma «Card», `Property 1`).
enum CardType {
  dagskort('Dagskort', 'dagskort'),
  ukeskort('Ukeskort', 'ukeskort'),
  manedskort('Månedskort', 'manedskort'),
  aarskort('Årskort', 'aarskort'),
  sesongkort('Sesongkort', 'sesongkort'),
  tilleggskort('Tilleggskort', 'tilleggskort'),

  /// Alternative symboler uten tall (Figma «Alt kort 1–3»).
  alternativ1('Kort', 'altKort1'),
  alternativ2('Kort', 'altKort2'),
  alternativ3('Kort', 'altKort3');

  const CardType(this.label, this._asset);

  final String label;
  final String _asset;

  String get assetPath => 'assets/cards/$_asset.svg';
}
