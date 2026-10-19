// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=3341-6905
// source=src/features/cards/LicenseSummary.tsx
// component=LicenseSummary
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('Property 1', { 'Mini': 'mini', 'Activate': 'withPrice', 'Full': 'full' })

export default {
  example: figma.code`<LicenseSummary\n  license={license}${variant !== 'mini' ? figma.code`\n  variant="${variant}"` : ''}${variant === 'full' ? '\n  onActivate={() => {}}\n  onDocumentation={() => {}}\n  onShowInMap={() => {}}' : ''}\n/>`,
  imports: ["import { LicenseSummary } from './features'"],
  id: 'react-license-summary',
  metadata: { nestable: true },
}
