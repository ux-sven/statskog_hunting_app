import { Button } from './Button';
import { Icon } from '../icons/Icon';
import type { Size } from './cx';

export interface CountStepperProps {
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  size?: Size;
  /** Hva som telles, for skjermleser («Lirype»). */
  label?: string;
}

/** Teller med minus/pluss («Filter option cell» `Counter` og «Capture Item Counter»). */
export function CountStepper({ value, onChange, min = 0, max, size = 'large', label }: CountStepperProps) {
  const canDec = !!onChange && value > min;
  const canInc = !!onChange && (max === undefined || value < max);
  return (
    <div className="inline-flex items-center" role="group" aria-label={label}>
      <Button size={size} square={46} variant="secondary" aria-label="Færre" leadingIcon={<Icon name="minus" />} disabled={!canDec} onClick={() => onChange?.(value - 1)} />
      <output aria-live="polite" className="w-[52px] text-center type-body-large text-text-primary">
        {value}
      </output>
      <Button size={size} square={46} variant="secondary" aria-label="Flere" leadingIcon={<Icon name="plus" />} disabled={!canInc} onClick={() => onChange?.(value + 1)} />
    </div>
  );
}
