// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=3611-40890
// source=lib/components/app_notice.dart
// component=AppNotice
import figma from 'figma'
const instance = figma.selectedInstance

let text = 'Du har ingen aktiveringer.'
if (typeof instance.findText === 'function') {
  const t = instance.findText('Title')
  if (t && t.textContent) text = t.textContent
}
const dart = text.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')

export default {
  example: figma.code`const AppNotice(text: '${dart}')`,
  imports: ["import 'package:jakt_fiske/jakt_fiske.dart';"],
  id: 'app-notice',
  metadata: { nestable: true },
}
