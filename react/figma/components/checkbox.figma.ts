// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=901-1040
// source=src/components/Checkbox.tsx
// component=Checkbox
import figma from 'figma'
const instance = figma.selectedInstance

const showLabel = instance.getBoolean('Show Label')
const label = instance.getString('Label')
const state = instance.getEnum('State', { 'Selected': 'true', 'Unselected': 'false', 'Hover unselected': 'false', 'Intermediate': 'null', 'Inactive': 'inactive' })

export default {
  example: figma.code`<Checkbox\n  checked={${state === 'inactive' ? 'false' : state}}${state === 'null' ? '\n  tristate' : ''}${showLabel ? figma.code`\n  label="${label}"` : ''}${state === 'inactive' ? '' : '\n  onChange={(checked) => {}}'}\n/>`,
  imports: ["import { Checkbox } from './components'"],
  id: 'react-checkbox',
  metadata: { nestable: true },
}
