// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=3611-39972
// source=src/features/cards/DayPicker.tsx
// component=DayPicker
import figma from 'figma'
const instance = figma.selectedInstance

export default {
  example: figma.code`<DayPicker\n  slots={store.activationSlots(license)}\n  selected={days}\n  onToggle={(day) => {}}\n/>`,
  imports: ["import { DayPicker } from './features'"],
  id: 'react-day-picker',
  metadata: { nestable: true },
}
