// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=4286-62708
// source=lib/components/map_controls.dart
// component=UserLocationButton
import figma from 'figma'
const instance = figma.selectedInstance

const mode = instance.getEnum('Property 1', {
  'Not Active': 'UserLocationMode.notActive',
  'Active': 'UserLocationMode.active',
  'North': 'UserLocationMode.north',
})

export default {
  example: figma.code`UserLocationButton(
  mode: ${mode},
  onPressed: () {},
)`,
  imports: ["import 'package:jakt_fiske/components/components.dart';"],
  id: 'user-location-button',
  metadata: { nestable: true },
}
