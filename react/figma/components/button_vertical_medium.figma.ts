// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=1199-1285
// source=src/components/Button.tsx
// component=Button
import figma from 'figma'
const instance = figma.selectedInstance

const showLabel = instance.getBoolean('Show Label')
const label = instance.getString('Label')
const variant = instance.getEnum('Style', { 'Primary': 'primary', 'Secondary': 'secondary', 'Tertiary': 'tertiary' })
// hover/pressed/focus følger ekte interaksjon (CSS :hover, :active, :focus-visible).
const state = instance.getEnum('State', { 'normal': 'normal', 'disabled': 'disabled', 'pressed': 'normal', 'visited': 'visited', 'focus': 'normal' })
const leftInst = instance.getBoolean('Left Icon') ? instance.getInstanceSwap('Left Icon Type') : null
let left
if (leftInst && leftInst.type === 'INSTANCE') left = leftInst.executeTemplate().example
const rightInst = instance.getBoolean('Right Icon') ? instance.getInstanceSwap('Right Icon Type') : null
let right
if (rightInst && rightInst.type === 'INSTANCE') right = rightInst.executeTemplate().example

export default {
  example: figma.code`<Button${showLabel ? figma.code`\n  label="${label}"` : ''}${variant !== 'primary' ? figma.code`\n  variant="${variant}"` : ''}\n  vertical${left ? figma.code`\n  leadingIcon={${left}}` : ''}${right ? figma.code`\n  trailingIcon={${right}}` : ''}${state === 'visited' ? '\n  visited' : ''}${state === 'disabled' ? '\n  disabled' : '\n  onClick={() => {}}'}\n/>`,
  imports: ["import { Button, Icon } from './components'"],
  id: 'react-button-vertical-medium',
  metadata: { nestable: true },
}
