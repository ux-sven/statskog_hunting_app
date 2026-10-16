// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=1286-3402
// source=lib/components/app_link.dart
// component=AppLink
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Text')
const state = instance.getEnum('State', {
  'Normal': 'normal',
  'Hover': 'normal',
  'Visited': 'visited',
  'Inactive': 'inactive',
})
const inList = instance.getEnum('Used in list', { 'No': false, 'Yes': true })
const iconCodeInst = instance.getBoolean('Show Icon') ? instance.getInstanceSwap('Icon') : null
let iconCode
if (iconCodeInst && iconCodeInst.type === 'INSTANCE') {
  iconCode = iconCodeInst.executeTemplate().example
}

export default {
  example: figma.code`AppLink(
  text: '${text}',${iconCode ? figma.code`\n  icon: ${iconCode},` : ''}${inList ? '\n  inList: true,' : ''}${state === 'visited' ? '\n  visited: true,' : ''}
  onTap: ${state === 'inactive' ? 'null' : '() {}'},
)`,
  imports: ["import 'package:jakt_fiske/components/components.dart';"],
  id: 'app-link',
  metadata: { nestable: true },
}
