// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=916-1265
// source=lib/components/map_controls.dart
// component=MainMapNavigation
import figma from 'figma'
const instance = figma.selectedInstance

const home = instance.getBoolean('Show Home')
const zoom = instance.getBoolean('Show Zoom')
const north = instance.getBoolean('Show Compass North')
const location = instance.getBoolean('Show User location')

export default {
  example: figma.code`MainMapNavigation(${home ? '\n  onHome: () {},' : ''}${zoom ? '\n  onZoomIn: () {},' : ''}${zoom ? '\n  onZoomOut: () {},' : ''}${north ? '\n  onCompassNorth: () {},' : ''}${location ? '\n  userLocationMode: UserLocationMode.notActive,' : ''}${location ? '\n  onUserLocation: () {},' : ''}
)`,
  imports: ["import 'package:jakt_fiske/components/components.dart';"],
  id: 'main-map-navigation',
  metadata: { nestable: true },
}
