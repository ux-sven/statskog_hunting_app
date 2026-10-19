// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=901-897
// source=src/components/SearchBar.tsx
// component=SearchBar
import figma from 'figma'
const instance = figma.selectedInstance

const placeholder = instance.getString('SearchField text')
const rounded = instance.getEnum('Style', { 'Square': false, 'Rounded': true })
const showIcon = instance.getBoolean('Icon visible')
const position = instance.getEnum('Icon Position', { 'Left': 'left', 'Right': 'right' })
const showClear = instance.getBoolean('Clear visible')
const showButton = instance.getBoolean('Button visible')

export default {
  example: figma.code`<SearchBar\n  placeholder="${placeholder}"${rounded ? '\n  rounded' : ''}${!showIcon ? '\n  iconPosition={null}' : position === 'right' ? '\n  iconPosition="right"' : ''}${!showClear ? '\n  showClear={false}' : ''}${!showButton ? '\n  buttonLabel={null}' : ''}\n  onChange={(value) => {}}\n  onSubmit={(value) => {}}\n/>`,
  imports: ["import { SearchBar } from './components'"],
  id: 'react-search-bar',
  metadata: { nestable: true },
}
