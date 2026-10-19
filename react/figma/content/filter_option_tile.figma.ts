// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=3230-2281
// source=src/features/filter/FilterOptionTile.tsx
// component=FilterOptionTile
import figma from 'figma'
const instance = figma.selectedInstance

const kind = instance.getEnum('Property 1', {
  'Default': 'check',
  'selected': 'checkSelected',
  'Default Variant': 'checkFirst',
  'Selected Variant': 'checkFirstSelected',
  'Select Item Closed': 'select',
  'Select Item Active': 'selectOpen',
  'Counter': 'counter',
  'Report Counter': 'summary',
})
// Art og navn hentes fra den nestede «Art»-instansen.
let species = 'orret'
let label = 'Ørret'
const art = instance.findInstance('Art')
if (art && art.type === 'INSTANCE') {
  const props = (art.executeTemplate().metadata || {}).props || {}
  if (props.species) species = String(props.species).replace(/^Species\./, '')
  if (props.label) label = props.label
}
const head = '\n  label="' + label + '"\n  species="' + species + '"'
let body
if (kind === 'counter') body = '<FilterOptionTile\n  kind="counter"' + head + '\n  count={count}\n  onChange={setCount}\n/>'
else if (kind === 'summary') body = '<FilterOptionTile\n  kind="summary"' + head + '\n  value="2 stk"\n/>'
else if (kind === 'select' || kind === 'selectOpen') body = '<FilterOptionTile\n  kind="select"' + head + '\n  expanded={' + (kind === 'selectOpen') + '}\n  onClick={() => {}}\n/>'
else {
  const selected = kind === 'checkSelected' || kind === 'checkFirstSelected'
  const first = kind === 'checkFirst' || kind === 'checkFirstSelected'
  body = '<FilterOptionTile\n  kind="check"' + head + '\n  selected={' + selected + '}' + (first ? '\n  checkboxFirst' : '') + '\n  onChange={(selected) => {}}\n/>'
}

export default {
  example: figma.code`${body}`,
  imports: ["import { FilterOptionTile } from './features'"],
  id: 'react-filter-option-tile',
  metadata: { nestable: true },
}
