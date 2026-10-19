// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=4086-54509
// source=src/components/CardTypeBadge.tsx
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
  example: figma.code`<CardTypeBadge type="${type}" inactive />`,
  imports: ["import { CardTypeBadge } from './components'"],
  id: 'react-card-type-badge-inactive',
  metadata: { nestable: true },
}
