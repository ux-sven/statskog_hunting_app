// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=916-1463
// source=src/components/MapControls.tsx
// component=SecondaryMapNavigation
import figma from 'figma'
const instance = figma.selectedInstance

const flags = [
  ['Show Map Layers', 'onMapLayers'],
  ['Show Basemaps', 'onBasemaps'],
  ['Show Legend', 'onLegend'],
  ['Show Measure', 'onMeasure'],
  ['Show Print', 'onPrint'],
  ['Show Draw', 'onDraw'],
  ['Show Tools', 'onTools'],
  ['Show 3D', 'on3D'],
]
let args = ''
for (const [prop, name] of flags) {
  if (instance.getBoolean(prop)) args += '\n  ' + name + '={() => {}}'
}

export default {
  example: figma.code`<SecondaryMapNavigation${args}\n/>`,
  imports: ["import { SecondaryMapNavigation } from './components'"],
  id: 'react-secondary-map-navigation',
  metadata: { nestable: true },
}
