// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=3611-39972
// source=lib/features/cards/widgets/day_picker.dart
// component=DayPicker
import figma from 'figma'

export default {
  example: figma.code`DayPicker(
  slots: slots,
  selected: selectedDays,
  onToggle: (day) {},
)`,
  imports: ["import 'package:jakt_fiske/jakt_fiske.dart';"],
  id: 'day-picker',
  metadata: { nestable: true },
}
