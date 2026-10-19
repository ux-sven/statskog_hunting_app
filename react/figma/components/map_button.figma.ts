// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=916-1127
// source=src/components/MapControls.tsx
// component=MapButton
import figma from 'figma'
const instance = figma.selectedInstance

const showLabel = instance.getBoolean('Show label')
const label = instance.getString('Label')
const iconInst = true ? instance.getInstanceSwap('Icon') : null
let icon
if (iconInst && iconInst.type === 'INSTANCE') icon = iconInst.executeTemplate().example

export default {
  example: figma.code`<MapButton\n  icon={${icon || '<Icon name="layers" />'}}${showLabel ? figma.code`\n  label="${label}"` : ''}\n  tooltip="Kartlag"\n  onClick={() => {}}\n/>`,
  imports: ["import { MapButton, Icon } from './components'"],
  id: 'react-map-button',
  metadata: { nestable: true },
}
