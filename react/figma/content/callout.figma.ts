// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=3866-166032
// source=src/components/Notice.tsx
// component=Callout
import figma from 'figma'
const instance = figma.selectedInstance
const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')

let text = 'Last ned offline kartområder med jaktgrenser dersom du skal jakte i områder uten mobildekning.'
if (typeof instance.findText === 'function') {
  const t = instance.findText('Title')
  if (t && t.textContent) text = t.textContent
}
let action
const btn = instance.findInstance('Button Medium')
if (btn && btn.type === 'INSTANCE') action = btn.executeTemplate().example

export default {
  example: figma.code`<Callout\n  text={"${esc(text)}"}${action ? figma.code`\n  action={${action}}` : ''}\n/>`,
  imports: ["import { Callout, Button, Icon } from './components'"],
  id: 'react-callout',
  metadata: { nestable: true },
}
