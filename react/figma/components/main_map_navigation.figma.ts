// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=916-1265
// source=src/components/MapControls.tsx
// component=MainMapNavigation
import figma from 'figma'
const instance = figma.selectedInstance

const home = instance.getBoolean('Show Home')
const zoom = instance.getBoolean('Show Zoom')
const north = instance.getBoolean('Show Compass North')
const location = instance.getBoolean('Show User location')

export default {
  example: figma.code`<MainMapNavigation${home ? '\n  onHome={() => {}}' : ''}${zoom ? '\n  onZoomIn={() => {}}\n  onZoomOut={() => {}}' : ''}${north ? '\n  onCompassNorth={() => {}}' : ''}${location ? '\n  userLocationMode="notActive"\n  onUserLocation={() => {}}' : ''}\n/>`,
  imports: ["import { MainMapNavigation } from './components'"],
  id: 'react-main-map-navigation',
  metadata: { nestable: true },
}
