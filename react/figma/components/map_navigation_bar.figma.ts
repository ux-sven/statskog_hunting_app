// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=3271-5448
// source=src/components/SheetHeader.tsx
// component=SheetHeader
import figma from 'figma'
const instance = figma.selectedInstance
const variant = instance.getEnum('Property 1', { 'Default': 'default', 'Search': 'search', 'Modal Stack': 'modalStack', 'Drawer': 'drawer', 'Drawer Small': 'drawerSmall' })
let title = 'Headline'
if (typeof instance.findText === 'function') {
  const t = instance.findText('Title')
  if (t && t.textContent) title = t.textContent
}
title = title.replace(/"/g, '&quot;')
let body
if (variant === 'search') {
  body = '<SearchFilterBar\n  query={query}\n  onQueryChange={setQuery}\n  onFilter={() => setFilterOpen(true)}\n  sort={<Select label="Sorter etter" showLabel value={sort} onChange={setSort} options={sortOptions} />}\n  activeFilters={activeFilters}\n  onRemoveFilter={removeFilter}\n/>'
} else if (variant === 'drawer') {
  body = '<Sheet header={<SheetHeader variant="drawer" title="' + title + '" action={<SheetMapToggle />} />}>\n  {children}\n</Sheet>'
} else if (variant === 'drawerSmall') {
  body = '<Sheet\n  snapPoints={[\'half\', \'full\']}\n  onClose={() => setSelected(null)}\n  header={<SheetHeader variant="drawerSmall" title="' + title + '" onClose={() => setSelected(null)} />}\n>\n  {children}\n</Sheet>'
} else {
  body = '<ModalSheet\n  open={open}\n  onClose={() => setOpen(false)}\n  title="' + title + '"\n  variant="' + (variant === 'modalStack' ? 'stack' : 'page') + '"\n>\n  {children}\n</ModalSheet>'
}
export default {
  example: figma.code`${body}`,
  imports: ["import { ModalSheet, SearchFilterBar, Select, Sheet, SheetHeader, SheetMapToggle } from './components'"],
  id: 'react-map-navigation-bar',
  metadata: { nestable: true },
}
