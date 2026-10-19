// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=916-875
// source=src/components/MapControls.tsx
// component=MapZoomControl
import figma from 'figma'
const instance = figma.selectedInstance

export default {
  example: figma.code`<MapZoomControl onZoomIn={() => {}} onZoomOut={() => {}} />`,
  imports: ["import { MapZoomControl } from './components'"],
  id: 'react-map-zoom',
  metadata: { nestable: true },
}
