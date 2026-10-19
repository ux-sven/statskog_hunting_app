// url=https://www.figma.com/design/DuojxX6O5xijF27TpYo3uX/Jakt---Fiske--Design-2024-?node-id=1287-712
// source=src/components/Chip.tsx
// component=Chip
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const removable = instance.getBoolean('Show Icon')
// hover/focus følger ekte interaksjon. Ikonet er lukkeknappen (×).
const state = instance.getEnum('Property 1', { 'normal': 'normal', 'hover': 'normal', 'focus': 'normal', 'disabled': 'disabled', 'selected': 'selected' })

export default {
  example: figma.code`<Chip\n  label="${label}"${state === 'selected' ? '\n  selected' : ''}${state === 'disabled' ? '\n  enabled={false}' : ''}\n  onSelectedChange={(selected) => {}}${removable ? '\n  onDelete={() => {}}' : ''}\n/>`,
  imports: ["import { Chip } from './components'"],
  id: 'react-chip-small',
  metadata: { nestable: true },
}
