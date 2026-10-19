// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=3293-8103
// source=lib/features/filter/widgets/filter_checkbox_tile.dart
// component=FilterCheckboxTile
import figma from 'figma'
const instance = figma.selectedInstance

const showChevron = instance.getBoolean('Show chevron')
const showFilter = instance.getBoolean('Show selected filter')

export default {
  example: figma.code`FilterCheckboxTile(
  label: 'Agder',
  value: false,
  onChanged: (value) {},${showFilter ? '\n  activeSubFilters: 1,\n  onClearSubFilters: () {},' : ''}${showChevron ? '\n  onOpen: () {},' : ''}
)`,
  imports: ["import 'package:jakt_fiske/jakt_fiske.dart';"],
  id: 'filter-checkbox-tile',
  metadata: { nestable: true },
}
