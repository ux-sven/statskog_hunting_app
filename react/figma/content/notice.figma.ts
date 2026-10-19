// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=3611-40890
// source=src/components/Notice.tsx
// component=Notice
import figma from 'figma'
const instance = figma.selectedInstance
const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')

let text = 'Du har ingen aktiveringer.'
if (typeof instance.findText === 'function') {
  const t = instance.findText('Title')
  if (t && t.textContent) text = t.textContent
}

export default {
  example: figma.code`<Notice text={"${esc(text)}"} />`,
  imports: ["import { Notice } from './components'"],
  id: 'react-notice',
  metadata: { nestable: true },
}
