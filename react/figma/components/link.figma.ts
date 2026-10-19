// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=1286-3402
// source=src/components/Link.tsx
// component=Link
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Text')
const state = instance.getEnum('State', { 'Normal': 'normal', 'Hover': 'normal', 'Visited': 'visited', 'Inactive': 'inactive' })
const inList = instance.getEnum('Used in list', { 'No': false, 'Yes': true })
const iconInst = instance.getBoolean('Show Icon') ? instance.getInstanceSwap('Icon') : null
let icon
if (iconInst && iconInst.type === 'INSTANCE') icon = iconInst.executeTemplate().example

export default {
  example: figma.code`<Link\n  text="${text}"\n  href="https://www.inatur.no"${icon ? figma.code`\n  icon={${icon}}` : ''}${inList ? '\n  inList' : ''}${state === 'visited' ? '\n  visited' : ''}${state === 'inactive' ? '\n  disabled' : ''}\n/>`,
  imports: ["import { Link, Icon } from './components'"],
  id: 'react-link',
  metadata: { nestable: true },
}
