// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=901-1090
// source=lib/components/app_table.dart
// component=AppTableHeaderCell
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const style = instance.getEnum('Style', { 'Normal': 'normal', 'Checkbox': 'checkbox' })
const content = instance.getEnum('Content', { 'Text': 'text', 'Number': 'number', 'Checkbox': 'checkbox' })
const isCheckboxColumn = style === 'checkbox'
const showCheckbox = isCheckboxColumn || instance.getBoolean('Show Checkbox')
const showSort = !isCheckboxColumn && instance.getBoolean('Show Sort')
const showFilter = !isCheckboxColumn && instance.getBoolean('Show Filter')

export default {
  example: figma.code`AppTableHeaderCell(
  size: AppSize.small,${!isCheckboxColumn ? figma.code`\n  label: '${label}',` : ''}${content === 'number' ? '\n  numeric: true,' : ''}${showSort ? '\n  onSort: () {},' : ''}${showFilter ? '\n  onFilter: () {},' : ''}${showCheckbox ? '\n  checkboxValue: false,' : ''}${showCheckbox ? '\n  onCheckboxChanged: (value) {},' : ''}
)`,
  imports: ["import 'package:jakt_fiske/components/components.dart';"],
  id: 'app-table-header-small',
  metadata: { nestable: true },
}
