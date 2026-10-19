// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=901-1090
// source=src/components/Table.tsx
// component=TableHeaderCell
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
  example: figma.code`<TableHeaderCell\n  size="small"${!isCheckboxColumn ? figma.code`\n  label="${label}"` : ''}${content === 'number' ? '\n  numeric' : ''}${showSort ? '\n  sortState="unsorted"\n  onSort={() => {}}' : ''}${showFilter ? '\n  onFilter={() => {}}' : ''}${showCheckbox ? '\n  checked={false}\n  onCheckedChange={(checked) => {}}' : ''}\n/>`,
  imports: ["import { TableHeaderCell } from './components'"],
  id: 'react-table-header-small',
  metadata: { nestable: true },
}
