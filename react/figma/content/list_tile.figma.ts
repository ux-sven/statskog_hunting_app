// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=901-1137
// source=src/components/ListTile.tsx
// component=ListTile
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Main Text')
const subtitle = instance.getBoolean('Show SubText') ? instance.getString('Sub Text') : null
const separator = instance.getBoolean('Show separator')
const inline = instance.getEnum('Cell Type', { 'Default Cell': false, 'Default Cell 2': true })
const state = instance.getEnum('State', { 'Normal': 'normal', 'Delete': 'delete', 'Toggle': 'toggle' })
const accessory = instance.getBoolean('Show Accessory View')
// Ikonet leses fra Code Connect-id-en til ikonet.
let icon = null
if (instance.getBoolean('Show Icon')) {
  const sw = instance.getInstanceSwap('Icon Type')
  if (sw && sw.type === 'INSTANCE' && typeof sw.codeConnectId === 'function') {
    const m = (sw.codeConnectId() || '').match(/^(?:react-)?appicon-(.+)$/)
    if (m) icon = m[1]
  }
}
const q = (s) => '"' + String(s).replace(/"/g, '&quot;') + '"'
const lines = ['title=' + q(title)]
if (subtitle !== null) lines.push('subtitle=' + q(subtitle))
if (icon) lines.push('icon="' + icon + '"')
if (state === 'toggle') lines.push('toggle={{ checked: true, onChange: (v) => {} }}')
else {
  if (inline) lines.push('layout="inline"')
  if (accessory) lines.push('onClick={() => {}}')
  if (state === 'delete') lines.push('onDelete={() => {}}')
}
if (!separator) lines.push('showSeparator={false}')
const body = '<ListTile\n  ' + lines.join('\n  ') + '\n/>'

export default {
  example: figma.code`${body}`,
  imports: ["import { ListTile } from './components'"],
  id: 'react-list-tile',
  metadata: { nestable: true },
}
