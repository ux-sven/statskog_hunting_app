// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=4117-31860
// source=src/features/cards/ActivationCard.tsx
// component=ActivationCard
import figma from 'figma'
const instance = figma.selectedInstance

const report = instance.getEnum('Property 1', { 'Default': false, 'Variant2': true })

export default {
  example: figma.code`<ActivationCard\n  activation={activation}${report ? '\n  onReportCapture={() => {}}' : '\n  onRemove={() => {}}'}\n  onReceipt={() => {}}\n  onShowInMap={() => {}}\n/>`,
  imports: ["import { ActivationCard } from './features'"],
  id: 'react-activation-card',
  metadata: { nestable: true },
}
