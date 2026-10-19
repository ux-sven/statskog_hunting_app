// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=901-1072
// source=src/components/Radio.tsx
// component=Radio
import figma from 'figma'
const instance = figma.selectedInstance

const showLabel = instance.getBoolean('Show Label')
const label = instance.getString('Label')
const state = instance.getEnum('State', { 'Unselected': 'unselected', 'Hover': 'unselected', 'Selected': 'selected', 'Disabled': 'disabled' })

export default {
  example: figma.code`<Radio\n  value="a"\n  groupValue={${state === 'selected' ? '"a"' : 'value'}}${showLabel ? figma.code`\n  label="${label}"` : ''}${state === 'disabled' ? '' : '\n  onChange={setValue}'}\n/>`,
  imports: ["import { Radio } from './components'"],
  id: 'react-radio',
  metadata: { nestable: true },
}
