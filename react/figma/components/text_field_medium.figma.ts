// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=1199-1638
// source=src/components/TextField.tsx
// component=TextField
import figma from 'figma'
const instance = figma.selectedInstance

const showLabel = instance.getBoolean('Label')
const label = instance.getString('Label Text')
const value = instance.getString('Input Text')
const display = instance.getEnum('Type', { 'Input': false, 'Display': true })
// hover/focus/Active følger ekte interaksjon (CSS :hover og :focus-within).
const state = instance.getEnum('State', { 'Active': 'normal', 'normal': 'normal', 'hover': 'normal', 'focus': 'normal', 'error': 'error', 'disabled': 'disabled' })
const showClear = instance.getBoolean('Show Clear Text')
const dropdown = instance.getBoolean('Is Dropdown')
const preInst = instance.getBoolean('Show Pre Icon') ? instance.getInstanceSwap('Pre Icon') : null
let pre
if (preInst && preInst.type === 'INSTANCE') pre = preInst.executeTemplate().example
const postInst = instance.getBoolean('Show Post Icon') ? instance.getInstanceSwap('Post Icon') : null
let post
if (postInst && postInst.type === 'INSTANCE') post = postInst.executeTemplate().example

export default {
  example: figma.code`<TextField${showLabel ? figma.code`\n  label="${label}"` : ''}\n  defaultValue="${value}"${display ? '\n  readOnlyDisplay' : ''}${pre ? figma.code`\n  preIcon={${pre}}` : ''}${post ? figma.code`\n  postIcon={${post}}` : ''}${showClear ? '\n  showClear' : ''}${dropdown ? '\n  onDropdown={() => {}}' : ''}${state === 'error' ? '\n  errorText="Feilmelding"' : ''}${state === 'disabled' ? '\n  disabled' : ''}\n/>`,
  imports: ["import { TextField, Icon } from './components'"],
  id: 'react-text-field-medium',
  metadata: { nestable: true },
}
