// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=901-1072
// source=lib/components/app_radio.dart
// component=AppRadio
import figma from 'figma'
const instance = figma.selectedInstance

const showLabel = instance.getBoolean('Show Label')
const label = instance.getString('Label')
const state = instance.getEnum('State', {
  'Unselected': 'unselected',
  'Hover': 'unselected',
  'Selected': 'selected',
  'Disabled': 'disabled',
})

export default {
  example: figma.code`AppRadio<String>(
  value: 'verdi',
  groupValue: ${state === 'selected' ? "'verdi'" : 'valgtVerdi'},${showLabel ? figma.code`\n  label: '${label}',` : ''}
  onChanged: ${state === 'disabled' ? 'null' : '(value) {}'},
)`,
  imports: ["import 'package:jakt_fiske/components/components.dart';"],
  id: 'app-radio',
  metadata: { nestable: true },
}
