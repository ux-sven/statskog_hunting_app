// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=3611-39941
// source=src/features/cards/DayPicker.tsx
// component=DayCell
import figma from 'figma'
const instance = figma.selectedInstance

const state = instance.getEnum('Property 1', { 'Default': 'default', 'Selected': 'selected', 'disabled': 'disabled' })

export default {
  example: figma.code`<DayCell\n  slot={slot}${state === 'selected' ? '\n  selected' : ''}${state === 'disabled' ? '' : '\n  onClick={() => {}}'}\n/>`,
  imports: ["import { DayCell } from './features'"],
  id: 'react-day-cell',
  metadata: { nestable: true },
}
