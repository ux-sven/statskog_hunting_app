// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=4086-45551
// source=src/components/CardTypeBadge.tsx
// component=CardTypeBadge
import figma from 'figma'
const instance = figma.selectedInstance

const type = instance.getEnum('Property 1', {
  'Dagskort': 'dagskort', 'Ukeskort': 'ukeskort', 'Manedskort': 'manedskort', 'Aarskort': 'aarskort',
  'Sesongkort': 'sesongkort', 'Tilleggskort': 'tilleggskort', 'Alt kort 1': 'alternativ1', 'Alt kort 2': 'alternativ2', 'Alt kort 3': 'alternativ3',
})

export default {
  example: figma.code`<CardTypeBadge type="${type}" />`,
  imports: ["import { CardTypeBadge } from './components'"],
  id: 'react-card-type-badge',
  metadata: { nestable: true, props: { type } },
}
