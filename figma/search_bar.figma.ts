// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=901-897
// source=lib/components/app_search_bar.dart
// component=AppSearchBar
import figma from 'figma'
const instance = figma.selectedInstance

const placeholder = instance.getString('SearchField text')
const rounded = instance.getEnum('Style', { 'Square': false, 'Rounded': true })
const showIcon = instance.getBoolean('Icon visible')
const position = instance.getEnum('Icon Position', {
  'Left': 'SearchIconPosition.left',
  'Right': 'SearchIconPosition.right',
})
const showClear = instance.getBoolean('Clear visible')
const showButton = instance.getBoolean('Button visible')
// State (Placeholder/Hover/Active) følger fokus og hover. Søke- og tømmeikonet
// (Search Icon / Clear Text Icon) er faste i komponenten.

export default {
  example: figma.code`AppSearchBar(
  placeholder: '${placeholder}',${rounded ? '\n  rounded: true,' : ''}
  iconPosition: ${showIcon ? position : 'null'},${!showClear ? '\n  showClear: false,' : ''}${!showButton ? '\n  buttonLabel: null,' : ''}
  onSubmitted: (query) {},
)`,
  imports: ["import 'package:jakt_fiske/components/components.dart';"],
  id: 'app-search-bar',
  metadata: { nestable: true },
}
