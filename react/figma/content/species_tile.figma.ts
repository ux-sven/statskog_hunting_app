// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=3227-4706
// source=src/features/filter/SpeciesTile.tsx
// component=SpeciesTile
import figma from 'figma'
const instance = figma.selectedInstance
// Arten leses fra Code Connect-id-en til artsikonet.
const speciesOf = (sw) => {
  if (sw && sw.type === 'INSTANCE' && typeof sw.codeConnectId === 'function') {
    const id = sw.codeConnectId() || ''
    const m = id.match(/^(?:react-)?species(?:icon)?-(.+)$/)
    if (m) return m[1]
  }
  return null
}

const label = instance.getString('Artsnavn')
const layout = instance.getEnum('Property 1', { 'Vertical': 'vertical', 'Horisontal': 'horizontal', 'Horisontal Small': 'small', 'Horisontal Variant': 'horizontalTrailing' })
const species = speciesOf(instance.getInstanceSwap('Arttype')) || 'orret'

export default {
  example: figma.code`<SpeciesTile\n  species="${species}"\n  label="${label}"${layout !== 'vertical' ? figma.code`\n  layout="${layout}"` : ''}\n/>`,
  imports: ["import { SpeciesTile } from './features'"],
  id: 'react-species-tile',
  metadata: { nestable: true, props: { species, label } },
}
