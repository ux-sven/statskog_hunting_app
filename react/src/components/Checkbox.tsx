import { cx } from './cx';

export interface CheckboxProps {
  /** `true` = Figma `State=Selected`, `false` = `Unselected`, `null` = `Intermediate`. */
  checked: boolean | null;
  /** Uten `onChange` får du `State=Inactive`. */
  onChange?: (next: boolean | null) => void;
  /** Figma `Label` + `Show Label`. Uten label: «checkbox icon». */
  label?: string;
  /** Tillater tre tilstander (avkrysset → mellomtilstand → tom). */
  tristate?: boolean;
  className?: string;
}

/** Avkrysningsboks (siden «Checkbox» i Figma). Hover følger ekte interaksjon. */
export function Checkbox({ checked, onChange, label, tristate = false, className }: CheckboxProps) {
  const disabled = !onChange;
  const toggle = () => {
    if (!onChange) return;
    if (tristate) onChange(checked === false ? true : checked === true ? null : false);
    else onChange(!(checked ?? false));
  };
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked === null ? 'mixed' : checked}
      disabled={disabled}
      onClick={toggle}
      className={cx('group inline-flex items-center gap-xs text-left cursor-pointer disabled:cursor-not-allowed', className)}
    >
      <CheckboxBox checked={checked} disabled={disabled} />
      {label && <span className={cx('type-body-small', disabled ? 'text-text-tertiary' : 'text-text-primary')}>{label}</span>}
    </button>
  );
}

/** Selve boksen, uten knapp – til rader der hele raden er klikkbar. */
export function CheckboxBox({ checked, disabled = false }: { checked: boolean | null; disabled?: boolean }) {
  const on = checked !== false;
  return (
    <span
      className={cx(
        'grid place-items-center size-[18px] shrink-0 rounded-[3px] border-2 text-text-invert',
        disabled
          ? cx('border-cta-primary-disabled', on && 'bg-cta-primary-disabled')
          : on
            ? 'border-cta-primary-default bg-cta-primary-default'
            : 'border-border-tertiary group-hover:border-cta-primary-default',
      )}
    >
      {checked === true && (
        <svg viewBox="0 0 24 24" className="size-[14px]" aria-hidden>
          <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" fill="currentColor" />
        </svg>
      )}
      {checked === null && <span className="block h-[2px] w-[9px] bg-text-invert" />}
    </span>
  );
}
