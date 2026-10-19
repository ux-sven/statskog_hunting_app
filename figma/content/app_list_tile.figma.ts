// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=901-1137
// source=lib/components/app_list_tile.dart
// component=AppListTile
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Main Text')
const subtitle = instance.getBoolean('Show SubText') ? instance.getString('Sub Text') : null
const separator = instance.getBoolean('Show separator')
const inline = instance.getEnum('Cell Type', { 'Default Cell': false, 'Default Cell 2': true })
const state = instance.getEnum('State', { 'Normal': 'normal', 'Delete': 'delete', 'Toggle': 'toggle' })
const accessory = instance.getBoolean('Show Accessory View')
// Ikonet leses fra Code Connect-id-en til ikonet (appicon-<navn>).
let icon = null
if (instance.getBoolean('Show Icon')) {
  const sw = instance.getInstanceSwap('Icon Type')
  if (sw && sw.type === 'INSTANCE' && typeof sw.codeConnectId === 'function') {
    const id = sw.codeConnectId()
    if (id && id.indexOf('appicon-') === 0) icon = 'AppIcons.' + id.slice(8)
  }
}
const q = (s) => "'" + String(s).replace(/'/g, "\\'") + "'"
let lines = ['title: ' + q(title) + ',']
if (subtitle !== null) lines.push('subtitle: ' + q(subtitle) + ',')
if (icon) lines.push('icon: ' + icon + ',')
let ctor = 'AppListTile'
if (state === 'toggle') {
  ctor = 'AppListTile.toggle'
  lines.push('value: true,', 'onChanged: (value) {},')
} else {
  if (inline) lines.push('layout: AppListTileLayout.inline,')
  if (accessory) lines.push('onTap: () {},')
  if (state === 'delete') lines.push('onDelete: () {},')
}
if (!separator) lines.push('showSeparator: false,')
const body = ctor + '(\n  ' + lines.join('\n  ') + '\n)'

export default {
  example: figma.code`${body}`,
  imports: ["import 'package:jakt_fiske/jakt_fiske.dart';"],
  id: 'app-list-tile',
  metadata: { nestable: true },
}
