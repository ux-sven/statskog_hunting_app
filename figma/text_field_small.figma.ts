// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=1199-1694
// source=lib/components/app_text_field.dart
// component=AppTextField
import figma from 'figma'
const instance = figma.selectedInstance

const showLabel = instance.getBoolean('Label')
const label = instance.getString('Label Text')
const value = instance.getString('Input Text')
const display = instance.getEnum('Type', { 'Input': false, 'Display': true })
// hover/focus/Active følger ekte interaksjon i Flutter.
const state = instance.getEnum('State', {
  'Active': 'normal',
  'normal': 'normal',
  'hover': 'normal',
  'focus': 'normal',
  'error': 'error',
  'disabled': 'disabled',
})
const showClear = instance.getBoolean('Show Clear Text')
const dropdown = instance.getBoolean('Is Dropdown')
const preCodeInst = instance.getBoolean('Show Pre Icon') ? instance.getInstanceSwap('Pre Icon') : null
let preCode
if (preCodeInst && preCodeInst.type === 'INSTANCE') {
  preCode = preCodeInst.executeTemplate().example
}
const postCodeInst = instance.getBoolean('Show Post Icon') ? instance.getInstanceSwap('Post Icon') : null
let postCode
if (postCodeInst && postCodeInst.type === 'INSTANCE') {
  postCode = postCodeInst.executeTemplate().example
}

export default {
  example: figma.code`AppTextField(
  size: AppSize.small,${showLabel ? figma.code`\n  label: '${label}',` : ''}
  initialValue: '${value}',${display ? '\n  readOnlyDisplay: true,' : ''}${preCode ? figma.code`\n  preIcon: ${preCode},` : ''}${postCode ? figma.code`\n  postIcon: ${postCode},` : ''}${showClear ? '\n  showClear: true,' : ''}${dropdown ? '\n  onTapDropdown: () {},' : ''}${state === 'error' ? '\n  errorText: \'Feilmelding\',' : ''}${state === 'disabled' ? '\n  enabled: false,' : ''}
)`,
  imports: ["import 'package:jakt_fiske/components/components.dart';"],
  id: 'app-text-field-small',
  metadata: { nestable: true },
}
