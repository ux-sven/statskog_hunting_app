import { useId, useState, type ReactNode, type InputHTMLAttributes } from 'react';
import { cx, type Size } from './cx';
import { Icon } from '../icons/Icon';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'value' | 'defaultValue'> {
  /** Figma `Label` + `Label Text`. */
  label?: string;
  value?: string;
  /** Figma `Input Text`. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** «Inputfield Small / Medium / Large». */
  size?: Size;
  /** Figma `Show Pre Icon` + `Pre Icon`. */
  preIcon?: ReactNode;
  /** Figma `Show Post Icon` + `Post Icon`. */
  postIcon?: ReactNode;
  /** Figma `Show Clear Text`. */
  showClear?: boolean;
  /** Figma `State=error`. */
  errorText?: string;
  /** Figma `Type=Display`: kun etikett og verdi. */
  readOnlyDisplay?: boolean;
  /** Figma `Is Dropdown`: feltet åpner en liste. */
  onDropdown?: () => void;
}

const height = { small: 'h-[38px]', medium: 'h-[55px]', large: 'h-[72px]' } as const;
const labelText = { small: 'type-body-xsmall', medium: 'type-body-small', large: 'type-body-medium' } as const;
const inputText = { small: 'type-body-small', medium: 'type-body-medium', large: 'type-body-large' } as const;

/** Tekstfelt (siden «Text Input» i Figma). `State=hover/focus` følger ekte interaksjon. */
export function TextField({
  label,
  value,
  defaultValue = '',
  onChange,
  size = 'medium',
  preIcon,
  postIcon,
  showClear = false,
  errorText,
  readOnlyDisplay = false,
  onDropdown,
  disabled,
  className,
  ...rest
}: TextFieldProps) {
  const id = useId();
  const [inner, setInner] = useState(defaultValue);
  const text = value ?? inner;
  const set = (v: string) => {
    if (value === undefined) setInner(v);
    onChange?.(v);
  };
  const labelEl = label && (
    <label htmlFor={id} className={cx(labelText[size], 'text-text-secondary')}>
      {label}
    </label>
  );
  if (readOnlyDisplay) {
    return (
      <div className={cx('flex flex-col', className)}>
        {labelEl}
        <span id={id} className={cx(inputText[size], 'text-text-primary')}>
          {text}
        </span>
      </div>
    );
  }
  const hasError = !!errorText;
  return (
    <div className={cx('flex flex-col gap-[2px]', className)}>
      {labelEl}
      <div
        className={cx(
          'flex items-center gap-xs border bg-surface-primary px-s text-text-secondary [--icon-size:18px] transition-colors',
          height[size],
          size === 'small' ? 'rounded-medium' : 'rounded-small',
          disabled
            ? 'border-border-secondary'
            : hasError
              ? 'border-attention-error'
              : 'border-border-secondary hover:border-cta-primary-hover focus-within:border-cta-primary-selected focus-within:hover:border-cta-primary-selected focus-within:shadow-[inset_0_0_0_1px_var(--cta-primary-selected)]',
        )}
      >
        {preIcon}
        <input
          id={id}
          value={text}
          disabled={disabled}
          readOnly={!!onDropdown}
          onClick={onDropdown}
          onChange={(e) => set(e.target.value)}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? `${id}-err` : undefined}
          className={cx(
            'min-w-0 flex-1 bg-transparent caret-cta-primary-default placeholder:text-text-tertiary focus:outline-none',
            inputText[size],
            disabled ? 'text-text-tertiary' : 'text-text-primary',
            onDropdown && 'cursor-pointer',
          )}
          {...rest}
        />
        {showClear && text && !disabled && (
          <button type="button" aria-label="Tøm feltet" onClick={() => set('')} className="grid place-items-center cursor-pointer">
            <Icon name="cancel" />
          </button>
        )}
        {onDropdown && <Icon name="chevronDownSmall" />}
        {postIcon}
      </div>
      {hasError && (
        <span id={`${id}-err`} className="mt-[2px] type-body-xsmall text-attention-error">
          {errorText}
        </span>
      )}
    </div>
  );
}
