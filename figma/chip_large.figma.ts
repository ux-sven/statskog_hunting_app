// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=1288-838
// source=lib/components/app_chip.dart
// component=AppChip
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const removable = instance.getBoolean('Show Icon')
// hover/focus følger ekte interaksjon i Flutter. Ikonet er lukkeknappen (×).
const state = instance.getEnum('Property 1', {
  'normal': 'normal',
  'hover': 'normal',
  'focus': 'normal',
  'disabled': 'disabled',
  'selected': 'selected',
})

export default {
  example: figma.code`AppChip(
  label: '${label}',
  size: AppSize.large,${state === 'selected' ? '\n  selected: true,' : ''}${state === 'disabled' ? '\n  enabled: false,' : ''}
  onSelected: (selected) {},${removable ? '\n  onDeleted: () {},' : ''}
)`,
  imports: ["import 'package:jakt_fiske/components/components.dart';"],
  id: 'app-chip-large',
  metadata: { nestable: true },
}
