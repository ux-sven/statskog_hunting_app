// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=916-875
// source=lib/components/map_controls.dart
// component=MapZoomControl
import figma from 'figma'
const instance = figma.selectedInstance


export default {
  example: figma.code`MapZoomControl(
  onZoomIn: () {},
  onZoomOut: () {},
)`,
  imports: ["import 'package:jakt_fiske/components/components.dart';"],
  id: 'map-zoom',
  metadata: { nestable: true },
}
