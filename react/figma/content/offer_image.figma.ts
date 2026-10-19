// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=3304-3970
// source=src/features/offers/OfferCard.tsx
// component=OfferImage
import figma from 'figma'
const instance = figma.selectedInstance

export default {
  example: figma.code`<OfferImage src={offer.image} />`,
  imports: ["import { OfferImage } from './features'"],
  id: 'react-offer-image',
  metadata: { nestable: true },
}
