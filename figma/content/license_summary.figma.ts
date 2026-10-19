// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=3341-6905
// source=lib/features/cards/widgets/license_summary.dart
// component=LicenseSummary
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('Property 1', {
  'Mini': 'mini',
  'Activate': 'withPrice',
  'Full': 'full',
})
const extra = variant === 'full'
  ? '\n  onActivate: () {},\n  onDocumentation: () {},\n  onShowInMap: () {},'
  : ''

export default {
  example: figma.code`LicenseSummary(
  license: license,${variant !== 'mini' ? '\n  variant: LicenseSummaryVariant.' + variant + ',' : ''}${extra}
)`,
  imports: ["import 'package:jakt_fiske/jakt_fiske.dart';"],
  id: 'license-summary',
  metadata: { nestable: true },
}
