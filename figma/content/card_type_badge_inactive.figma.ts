// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=4086-54509
// source=lib/components/card_type_badge.dart
// component=CardTypeBadge
import figma from 'figma'
const instance = figma.selectedInstance

let type = 'dagskort'
const card = instance.findInstance('Card')
if (card && card.type === 'INSTANCE') {
  const props = (card.executeTemplate().metadata || {}).props || {}
  if (props.type) type = props.type
}

export default {
  example: figma.code`const CardTypeBadge(CardType.${type}, inactive: true)`,
  imports: ["import 'package:jakt_fiske/jakt_fiske.dart';"],
  id: 'card-type-badge-inactive',
  metadata: { nestable: true },
}
