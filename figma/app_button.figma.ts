// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=1199-994
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

// pressed/focus/visited er kjøretidstilstander i Flutter, ikke props.
// Bare disabled påvirker koden (onPressed: null).
const onPressed = instance.getEnum('State', {
  'normal': '() {}',
  'pressed': '() {}',
  'focus': '() {}',
  'visited': '() {}',
  'disabled': 'null',
})

const hasLeft = instance.getBoolean('Left Icon')
const hasRight = instance.getBoolean('Right Icon')
const leftIcon = hasLeft ? instance.getInstanceSwap('Left Icon Type') : null
const rightIcon = hasRight ? instance.getInstanceSwap('Right Icon Type') : null

let leftCode
if (leftIcon && leftIcon.type === 'INSTANCE') {
  leftCode = leftIcon.executeTemplate().example
}
let rightCode
if (rightIcon && rightIcon.type === 'INSTANCE') {
  rightCode = rightIcon.executeTemplate().example
}

export default {
  example: figma.code`AppButton(
  ${showLabel ? figma.code`label: '${label}',
  ` : ''}style: ${style},
  ${leftCode ? figma.code`leadingIcon: ${leftCode},
  ` : ''}${rightCode ? figma.code`trailingIcon: ${rightCode},
  ` : ''}onPressed: ${onPressed},
)`,
  imports: ["import 'package:jakt_fiske/components/app_button.dart';"],
  id: 'app-button',
  metadata: { nestable: true },
}
