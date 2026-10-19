// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=3477-20308
// source=src/features/offers/OfferCard.tsx
// component=OfferCard
import figma from 'figma'
const instance = figma.selectedInstance

// Buy er et tilbud (OfferCard). De andre variantene er et kjøpt kort (LicenseCard).
const variant = instance.getEnum('Property 1', { 'Buy': 'buy', 'Not Activated': 'notActivated', 'Activated': 'activated', 'Info View': 'details' })
let body
if (variant === 'buy') body = '<OfferCard\n  offer={offer}\n  onBuy={() => {}}\n  onInfo={() => {}}\n  onShowInMap={() => {}}\n/>'
else if (variant === 'details') body = '<LicenseDetails\n  license={license}\n  onActivate={() => {}}\n  onShowInMap={() => {}}\n  onRules={() => {}}\n  onReceipt={() => {}}\n  onOfferInfo={() => {}}\n  onDownloadOfflineMap={() => {}}\n/>'
else body = '<LicenseCard\n  license={license} // aktivert når license.activatedDate er satt\n  onActivate={() => {}}\n  onInfo={() => {}}\n  onShowInMap={() => {}}' + (variant === 'activated' ? '\n  onReportCapture={() => {}}' : '') + '\n/>'

export default {
  example: figma.code`${body}`,
  imports: ["import { OfferCard, LicenseCard, LicenseDetails } from './features'"],
  id: 'react-offer-card',
  metadata: { nestable: true },
}
