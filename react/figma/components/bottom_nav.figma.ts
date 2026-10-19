// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=3482-26910
// source=src/components/BottomNav.tsx
// component=BottomNav
import figma from 'figma'
const instance = figma.selectedInstance
const items = ["  { icon: 'priceTag', label: 'Tilbud' },", "  { icon: 'accuracy', label: 'Jaktkort' },"]
if (instance.getBoolean('Show Tab Button 3')) items.push("  { icon: 'fishingHook', label: 'Fiskekort' },")
if (instance.getBoolean('Show Tab Button 4')) items.push("  { icon: 'report', label: 'Fangstrapport' },")
if (instance.getBoolean('Show Tab Button 5')) items.push("  { icon: 'settings', label: 'Innstillinger' },")
const list = items.join('\n')
export default {
  example: figma.code`<BottomNav\n  items={[\n${list}\n  ]}\n  selectedIndex={tab}\n  onChange={setTab}\n/>`,
  imports: ["import { BottomNav } from './components'"],
  id: 'react-bottom-nav',
  metadata: { nestable: true },
}
