// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=3866-166032
// source=lib/components/app_notice.dart
// component=AppNotice
import figma from 'figma'
const instance = figma.selectedInstance

let text = 'Last ned offline kartområder med jaktgrenser dersom du skal jakte i områder uten mobildekning.'
if (typeof instance.findText === 'function') {
  const t = instance.findText('Title')
  if (t && t.textContent) text = t.textContent
}
const dart = text.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')
let action
const btn = instance.findInstance('Button Medium')
if (btn && btn.type === 'INSTANCE') action = btn.executeTemplate().example

export default {
  example: figma.code`AppNotice.callout(
  text: '${dart}',${action ? figma.code`\n  action: ${action},` : ''}
)`,
  imports: ["import 'package:jakt_fiske/jakt_fiske.dart';"],
  id: 'app-notice-callout',
  metadata: { nestable: true },
}
