// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=3770-25523
// source=lib/components/section_header.dart
// component=SectionHeader
import figma from 'figma'
const instance = figma.selectedInstance

let title = 'Stedstreff'
if (typeof instance.findText === 'function') {
  const t = instance.findText('Stedstreff')
  if (t && t.textContent) title = t.textContent
}

export default {
  example: figma.code`SectionHeader(
  title: '${title.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ')}',
  expanded: true,
  onToggle: () {},
)`,
  imports: ["import 'package:jakt_fiske/jakt_fiske.dart';"],
  id: 'section-header',
  metadata: { nestable: true },
}
