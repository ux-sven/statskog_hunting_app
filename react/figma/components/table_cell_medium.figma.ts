// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=1286-1959
// source=src/components/Table.tsx
// component=TableCell
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Label')
const odd = instance.getEnum('Style', { 'Normal': false, 'Odd': true })
const content = instance.getEnum('Content', { 'Text': 'text', 'Number': 'number', 'Link': 'link', 'Input': 'input', 'Icon': 'icon', 'Status': 'status' })
const showCheckbox = instance.getBoolean('Show checkbox')

export default {
  example: figma.code`<TableCell\n  text="${text}"${odd ? '\n  odd' : ''}${content !== 'text' ? figma.code`\n  content="${content}"` : ''}${content === 'link' ? '\n  onClick={() => {}}' : ''}${content === 'icon' ? '\n  icon={<Icon name="accuracy" />}' : ''}${content === 'input' ? '\n  input={<TextField size="small" defaultValue="' + text + '" />}' : ''}${showCheckbox ? '\n  checked={false}\n  onCheckedChange={(checked) => {}}' : ''}\n/>`,
  imports: ["import { TableCell, TextField, Icon } from './components'"],
  id: 'react-table-cell-medium',
  metadata: { nestable: true },
}
