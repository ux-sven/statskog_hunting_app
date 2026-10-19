// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=901-1015
// source=src/components/Checkbox.tsx
// component=Checkbox
import figma from 'figma'
const instance = figma.selectedInstance

const state = instance.getEnum('Property 2', { 'active': 'true', 'indeterminate': 'null', 'hover': 'false', 'default': 'false', 'disabled': 'disabled' })

export default {
  example: figma.code`<Checkbox\n  checked={${state === 'disabled' ? 'false' : state}}${state === 'null' ? '\n  tristate' : ''}${state === 'disabled' ? '' : '\n  onChange={(checked) => {}}'}\n/>`,
  imports: ["import { Checkbox } from './components'"],
  id: 'react-checkbox-icon',
  metadata: { nestable: true },
}
