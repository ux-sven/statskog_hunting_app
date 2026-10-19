import { cx } from './cx';

export interface RadioProps<T> {
  value: T;
  /** Valgt verdi i gruppen. `value === groupValue` gir Figma `State=Selected`. */
  groupValue: T | null | undefined;
  /** Uten `onChange` får du `State=Disabled`. */
  onChange?: (value: T) => void;
  /** Figma `Label` + `Show Label`. Uten label: «radiobutton icon». */
  label?: string;
  name?: string;
  className?: string;
}

/** Radioknapp (siden «Radiobutton» i Figma). */
export function Radio<T>({ value, groupValue, onChange, label, className }: RadioProps<T>) {
  const selected = value === groupValue;
  const disabled = !onChange;
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={() => onChange?.(value)}
      className={cx('group inline-flex items-center gap-xs text-left cursor-pointer disabled:cursor-not-allowed', className)}
    >
      <span
        className={cx(
          'grid place-items-center size-[18px] shrink-0 rounded-full border-2',
          disabled
            ? 'border-border-secondary text-border-secondary'
            : selected
              ? 'border-cta-primary-default text-cta-primary-default'
              : 'border-border-tertiary group-hover:border-cta-primary-default',
        )}
      >
        {selected && <span className="block size-[9px] rounded-full bg-current" />}
      </span>
      {label && <span className={cx('type-body-small', disabled ? 'text-text-tertiary' : 'text-text-primary')}>{label}</span>}
    </button>
  );
}
