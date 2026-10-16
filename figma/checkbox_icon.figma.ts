// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=901-1015
// source=lib/components/app_checkbox.dart
// component=AppCheckbox
import figma from 'figma'
const instance = figma.selectedInstance

const state = instance.getEnum('Property 2', {
  'active': 'true',
  'indeterminate': 'null',
  'hover': 'false',
  'default': 'false',
  'disabled': 'disabled',
})

export default {
  example: figma.code`AppCheckbox(
  value: ${state === 'disabled' ? 'false' : state},${state === 'null' ? '\n  tristate: true,' : ''}
  onChanged: ${state === 'disabled' ? 'null' : '(value) {}'},
)`,
  imports: ["import 'package:jakt_fiske/components/components.dart';"],
  id: 'app-checkbox-icon',
  metadata: { nestable: true },
}
