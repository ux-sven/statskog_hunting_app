// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=1286-2340
// source=src/components/Table.tsx
// component=TablePagination
import figma from 'figma'
const instance = figma.selectedInstance

const compact = instance.getEnum('Property 1', { 'Variant 1': false, 'Variant 2': true })
const size = instance.getEnum('Size', { 'Small': 'small', 'Medium': 'medium', 'Large': 'large' })

export default {
  example: figma.code`<TablePagination${size !== 'medium' ? figma.code`\n  size="${size}"` : ''}${compact ? '\n  compact' : ''}\n  currentPage={page}\n  pageCount={8}\n  onPageChange={setPage}\n/>`,
  imports: ["import { TablePagination } from './components'"],
  id: 'react-table-pagination',
  metadata: { nestable: true },
}
