// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=3293-8103
// source=src/features/filter/FilterCheckboxTile.tsx
// component=FilterCheckboxTile
import figma from 'figma'
const instance = figma.selectedInstance

const showChevron = instance.getBoolean('Show chevron')
const showFilter = instance.getBoolean('Show selected filter')

export default {
  example: figma.code`<FilterCheckboxTile\n  label="Agder"\n  checked={false}\n  onChange={(checked) => {}}${showFilter ? '\n  activeSubFilters={1}\n  onClearSubFilters={() => {}}' : ''}${showChevron ? '\n  onOpen={() => {}}' : ''}\n/>`,
  imports: ["import { FilterCheckboxTile } from './features'"],
  id: 'react-filter-checkbox-tile',
  metadata: { nestable: true },
}
