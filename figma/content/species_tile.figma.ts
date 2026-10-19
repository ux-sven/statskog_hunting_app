// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=3227-4706
// source=lib/features/filter/widgets/species_tile.dart
// component=SpeciesTile
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Artsnavn')
const layout = instance.getEnum('Property 1', {
  'Vertical': 'vertical',
  'Horisontal': 'horizontal',
  'Horisontal Small': 'small',
  'Horisontal Variant': 'horizontalTrailing',
})
// Arten leses fra Code Connect-id-en til artsikonet (species-<navn>).
let species = 'Species.orret'
const sw = instance.getInstanceSwap('Arttype')
if (sw && sw.type === 'INSTANCE' && typeof sw.codeConnectId === 'function') {
  const id = sw.codeConnectId()
  if (id && id.indexOf('species-') === 0) species = 'Species.' + id.slice(8)
}

export default {
  example: figma.code`SpeciesTile(
  species: ${species},
  label: '${label}',${layout !== 'vertical' ? '\n  layout: SpeciesTileLayout.' + layout + ',' : ''}
)`,
  imports: ["import 'package:jakt_fiske/jakt_fiske.dart';"],
  id: 'species-tile',
  metadata: { nestable: true, props: { species, label } },
}
