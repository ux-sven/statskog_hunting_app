// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=1286-4243
// source=src/components/TabBar.tsx
// component=TabButton
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const state = instance.getEnum('Property 1', { 'Default': 'default', 'Hover': 'default', 'Focus': 'default', 'Disabled': 'disabled', 'Active': 'active' })
const iconInst = instance.getBoolean('Use Icon') ? instance.getInstanceSwap('Icon') : null
let icon
if (iconInst && iconInst.type === 'INSTANCE') icon = iconInst.executeTemplate().example

export default {
  example: figma.code`<TabButton\n  label="${label}"\n  size="medium"${icon ? figma.code`\n  icon={${icon}}` : ''}${state === 'active' ? '\n  active' : ''}${state === 'disabled' ? '' : '\n  onClick={() => {}}'}\n/>`,
  imports: ["import { TabButton, Icon } from './components'"],
  id: 'react-tab-button-medium',
  metadata: { nestable: true, props: { label, active: state === 'active', disabled: state === 'disabled' } },
}
