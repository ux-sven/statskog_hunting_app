// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=916-1127
// source=lib/components/map_controls.dart
// component=MapButton
import figma from 'figma'
const instance = figma.selectedInstance

const showLabel = instance.getBoolean('Show label')
const label = instance.getString('Label')
const iconCodeInst = instance.getInstanceSwap('Icon')
let iconCode
if (iconCodeInst && iconCodeInst.type === 'INSTANCE') {
  iconCode = iconCodeInst.executeTemplate().example
}
// State (Default/Hover/Anim …) følger interaksjon og animasjon i Flutter.

export default {
  example: figma.code`MapButton(
  icon: ${iconCode ? iconCode : 'const Icon(Icons.add)'},${showLabel ? figma.code`\n  label: '${label}',` : ''}
  onPressed: () {},
)`,
  imports: ["import 'package:jakt_fiske/components/components.dart';"],
  id: 'map-button',
  metadata: { nestable: true },
}
