// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=4086-45551
// source=lib/components/card_type_badge.dart
// component=CardTypeBadge
import figma from 'figma'
const instance = figma.selectedInstance

const type = instance.getEnum('Property 1', {
  'Dagskort': 'dagskort',
  'Ukeskort': 'ukeskort',
  'Manedskort': 'manedskort',
  'Aarskort': 'aarskort',
  'Sesongkort': 'sesongkort',
  'Tilleggskort': 'tilleggskort',
  'Alt kort 1': 'alternativ1',
  'Alt kort 2': 'alternativ2',
  'Alt kort 3': 'alternativ3',
})

export default {
  example: figma.code`const CardTypeBadge(CardType.${type})`,
  imports: ["import 'package:jakt_fiske/jakt_fiske.dart';"],
  id: 'card-type-badge',
  metadata: { nestable: true, props: { type } },
}
