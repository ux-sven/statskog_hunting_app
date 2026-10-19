// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=3770-25523
// source=src/components/SectionHeader.tsx
// component=SectionHeader
import figma from 'figma'
const instance = figma.selectedInstance

let title = 'Stedstreff'
if (typeof instance.findText === 'function') {
  const t = instance.findText('Stedstreff')
  if (t && t.textContent) title = t.textContent
}
title = title.replace(/"/g, '&quot;').replace(/\n/g, ' ')

export default {
  example: figma.code`<ExpandableSection title="${title}">\n  <ListTile title="Treff 1" />\n</ExpandableSection>`,
  imports: ["import { ExpandableSection, ListTile } from './components'"],
  id: 'react-section-header',
  metadata: { nestable: true },
}
