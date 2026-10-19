// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=3611-39941
// source=lib/features/cards/widgets/day_picker.dart
// component=DayCell
import figma from 'figma'
const instance = figma.selectedInstance

const state = instance.getEnum('Property 1', {
  'Default': 'default',
  'Selected': 'selected',
  'disabled': 'disabled',
})

export default {
  example: figma.code`DayCell(
  slot: slot,${state === 'selected' ? '\n  selected: true,' : ''}
  onTap: ${state === 'disabled' ? 'null' : '() {}'},
)`,
  imports: ["import 'package:jakt_fiske/jakt_fiske.dart';"],
  id: 'day-cell',
  metadata: { nestable: true },
}
