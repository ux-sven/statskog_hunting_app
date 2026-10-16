// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=1286-4243
// source=lib/components/app_tab_bar.dart
// component=AppTabButton
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const state = instance.getEnum('Property 1', {
  'Default': 'default',
  'Hover': 'default',
  'Focus': 'default',
  'Disabled': 'disabled',
  'Active': 'active',
})
const iconCodeInst = instance.getBoolean('Use Icon') ? instance.getInstanceSwap('Icon') : null
let iconCode
if (iconCodeInst && iconCodeInst.type === 'INSTANCE') {
  iconCode = iconCodeInst.executeTemplate().example
}

export default {
  example: figma.code`AppTabButton(
  label: '${label}',
  size: AppSize.medium,${iconCode ? figma.code`\n  icon: ${iconCode},` : ''}${state === 'active' ? '\n  active: true,' : ''}
  onPressed: ${state === 'disabled' ? 'null' : '() {}'},
)`,
  imports: ["import 'package:jakt_fiske/components/components.dart';"],
  id: 'app-tab-button-medium',
  metadata: { nestable: true, props: { label: label, active: state === 'active', disabled: state === 'disabled' } },
}
