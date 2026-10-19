// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=4117-31860
// source=lib/features/cards/widgets/activation_card.dart
// component=ActivationCard
import figma from 'figma'
const instance = figma.selectedInstance

const report = instance.getEnum('Property 1', { 'Default': false, 'Variant2': true })

export default {
  example: figma.code`ActivationCard(
  activation: activation,${report ? '\n  onReportCapture: () {},' : '\n  onRemove: () {},'}
  onReceipt: () {},
  onShowInMap: () {},
)`,
  imports: ["import 'package:jakt_fiske/jakt_fiske.dart';"],
  id: 'activation-card',
  metadata: { nestable: true },
}
