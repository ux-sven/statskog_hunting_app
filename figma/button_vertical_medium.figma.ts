// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=1199-1285
// source=lib/components/app_button.dart
// component=AppButton
import figma from 'figma'
const instance = figma.selectedInstance

const showLabel = instance.getBoolean('Show Label')
const label = instance.getString('Label')
const style = instance.getEnum('Style', {
  'Primary': 'AppButtonStyle.primary',
  'Secondary': 'AppButtonStyle.secondary',
  'Tertiary': 'AppButtonStyle.tertiary',
})
// hover/pressed/focus følger ekte interaksjon i Flutter.
const state = instance.getEnum('State', {
  'normal': 'normal',
  'hover': 'hover',
  'disabled': 'disabled',
  'pressed': 'pressed',
  'visited': 'visited',
  'focus': 'focus',
})
const leftCodeInst = instance.getBoolean('Left Icon') ? instance.getInstanceSwap('Left Icon Type') : null
let leftCode
if (leftCodeInst && leftCodeInst.type === 'INSTANCE') {
  leftCode = leftCodeInst.executeTemplate().example
}
const rightCodeInst = instance.getBoolean('Right Icon') ? instance.getInstanceSwap('Right Icon Type') : null
let rightCode
if (rightCodeInst && rightCodeInst.type === 'INSTANCE') {
  rightCode = rightCodeInst.executeTemplate().example
}

export default {
  example: figma.code`AppButton(${showLabel ? figma.code`\n  label: '${label}',` : ''}
  style: ${style},
  size: AppSize.medium,
  orientation: AppButtonOrientation.vertical,${leftCode ? figma.code`\n  leadingIcon: ${leftCode},` : ''}${rightCode ? figma.code`\n  trailingIcon: ${rightCode},` : ''}${state === 'visited' ? '\n  visited: true,' : ''}
  onPressed: ${state === 'disabled' ? 'null' : '() {}'},
)`,
  imports: ["import 'package:jakt_fiske/components/components.dart';"],
  id: 'app-button-vertical-medium',
  metadata: { nestable: true },
}
