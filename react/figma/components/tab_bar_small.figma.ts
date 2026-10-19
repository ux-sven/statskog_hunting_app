// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=1286-4352
// source=src/components/TabBar.tsx
// component=TabBar
import figma from 'figma'
const instance = figma.selectedInstance

// Fanene leses fra knappene «Tab Bar Button Small 1–8» i komponenten.
let tabs = ''
let selected = 0
let count = 0
for (let i = 1; i <= 8; i++) {
  if (!instance.getBoolean('Show Button ' + i)) continue
  const btn = instance.findInstance('Tab Bar Button Small ' + i)
  if (!btn || btn.type !== 'INSTANCE') continue
  const props = btn.executeTemplate().metadata.props || {}
  if (props.active) selected = count
  tabs += '\n    { label: \'' + props.label + '\'' + (props.disabled ? ', enabled: false' : '') + ' },'
  count++
}

export default {
  example: figma.code`<TabBar\n  tabs={[${tabs}\n  ]}\n  selectedIndex={${selected}}\n  onChange={(index) => {}}\n/>`,
  imports: ["import { TabBar } from './components'"],
  id: 'react-tab-bar-small',
  metadata: { nestable: true },
}
