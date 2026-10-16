// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=901-1061
// source=lib/components/app_radio.dart
// component=AppRadio
import figma from 'figma'
const instance = figma.selectedInstance

const state = instance.getEnum('Property 2', {
  'Default': 'unselected',
  'Hover': 'unselected',
  'Selected': 'selected',
  'Disabled': 'disabled',
})

export default {
  example: figma.code`AppRadio<String>(
  value: 'verdi',
  groupValue: ${state === 'selected' ? "'verdi'" : 'valgtVerdi'},
  onChanged: ${state === 'disabled' ? 'null' : '(value) {}'},
)`,
  imports: ["import 'package:jakt_fiske/components/components.dart';"],
  id: 'app-radio-icon',
  metadata: { nestable: true },
}
