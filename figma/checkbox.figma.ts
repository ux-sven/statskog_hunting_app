// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=901-1040
// source=lib/components/app_checkbox.dart
// component=AppCheckbox
import figma from 'figma'
const instance = figma.selectedInstance

const showLabel = instance.getBoolean('Show Label')
const label = instance.getString('Label')
const state = instance.getEnum('State', {
  'Selected': 'selected',
  'Unselected': 'unselected',
  'Hover unselected': 'unselected',
  'Intermediate': 'intermediate',
  'Inactive': 'inactive',
})
const value = state === 'selected' ? 'true' : state === 'intermediate' ? 'null' : 'false'

export default {
  example: figma.code`AppCheckbox(
  value: ${value},${state === 'intermediate' ? '\n  tristate: true,' : ''}${showLabel ? figma.code`\n  label: '${label}',` : ''}
  onChanged: ${state === 'inactive' ? 'null' : '(value) {}'},
)`,
  imports: ["import 'package:jakt_fiske/components/components.dart';"],
  id: 'app-checkbox',
  metadata: { nestable: true },
}
