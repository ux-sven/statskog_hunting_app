// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=901-1097
// source=lib/components/app_table.dart
// component=AppTableCell
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Label')
const odd = instance.getEnum('Style', { 'Normal': false, 'Odd': true })
const content = instance.getEnum('Content', {
  'Text': 'AppTableCellContent.text',
  'Number': 'AppTableCellContent.number',
  'Link': 'AppTableCellContent.link',
  'Input': 'AppTableCellContent.input',
  'Icon': 'AppTableCellContent.icon',
  'Status': 'AppTableCellContent.status',
})
const showCheckbox = instance.getBoolean('Show checkbox')

export default {
  example: figma.code`AppTableCell(
  text: '${text}',
  size: AppSize.small,${odd ? '\n  odd: true,' : ''}
  content: ${content},${content === 'AppTableCellContent.link' ? '\n  onTap: () {},' : ''}${showCheckbox ? '\n  checkboxValue: false,' : ''}${showCheckbox ? '\n  onCheckboxChanged: (value) {},' : ''}
)`,
  imports: ["import 'package:jakt_fiske/components/components.dart';"],
  id: 'app-table-cell-small',
  metadata: { nestable: true },
}
