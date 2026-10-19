// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=901-1061
// source=src/components/Radio.tsx
// component=Radio
import figma from 'figma'
const instance = figma.selectedInstance

const state = instance.getEnum('Property 2', { 'Default': 'unselected', 'Hover': 'unselected', 'Selected': 'selected', 'Disabled': 'disabled' })

export default {
  example: figma.code`<Radio\n  value="a"\n  groupValue={${state === 'selected' ? '"a"' : 'value'}}${state === 'disabled' ? '' : '\n  onChange={setValue}'}\n/>`,
  imports: ["import { Radio } from './components'"],
  id: 'react-radio-icon',
  metadata: { nestable: true },
}
