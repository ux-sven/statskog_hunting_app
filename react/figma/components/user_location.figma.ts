// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=4286-62708
// source=src/components/MapControls.tsx
// component=UserLocationButton
import figma from 'figma'
const instance = figma.selectedInstance

const mode = instance.getEnum('Property 1', { 'Not Active': 'notActive', 'Active': 'active', 'North': 'north' })

export default {
  example: figma.code`<UserLocationButton mode="${mode}" onClick={() => {}} />`,
  imports: ["import { UserLocationButton } from './components'"],
  id: 'react-user-location',
  metadata: { nestable: true },
}
