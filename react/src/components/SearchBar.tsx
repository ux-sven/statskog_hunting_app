import { useState } from 'react';
import { cx } from './cx';
import { Icon } from '../icons/Icon';
import { Button } from './Button';

export interface SearchBarProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  /** Figma `SearchField text`. */
  placeholder?: string;
  /** Figma `Style=Rounded`. */
  rounded?: boolean;
  /** Figma `Icon Position` + `Icon visible` (`null` = uten ikon). */
  iconPosition?: 'left' | 'right' | null;
  /** Figma `Clear visible`. Vises når feltet har tekst. */
  showClear?: boolean;
  /** Figma `Button visible` + knappetekst (`null` = uten knapp). */
  buttonLabel?: string | null;
  className?: string;
}

/**
 * Søkefelt (siden «Search» i Figma, settet «Searchbar»).
 * `State=Placeholder/Hover/Active` følger ekte hover og fokus.
 */
export function SearchBar({
  value,
  defaultValue = '',
  onChange,
  onSubmit,
  placeholder = 'Søk',
  rounded = false,
  iconPosition = 'left',
  showClear = true,
  buttonLabel = 'Søk',
  className,
}: SearchBarProps) {
  const [inner, setInner] = useState(defaultValue);
  const text = value ?? inner;
  const set = (v: string) => {
    if (value === undefined) setInner(v);
    onChange?.(v);
  };
  const searchIcon = <Icon name="search" size={18} className="text-text-tertiary" />;
  return (
    <form
      role="search"
      className={cx('flex items-center gap-xs', className)}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(text);
      }}
    >
      <label
        className={cx(
          'flex h-[46px] min-w-0 flex-1 items-center gap-xs border px-s transition-colors',
          rounded ? 'rounded-full' : 'rounded-small',
          'border-transparent bg-surface-secondary hover:border-cta-primary-default hover:bg-surface-primary',
          'focus-within:border-border-secondary focus-within:bg-surface-primary focus-within:hover:border-border-secondary',
        )}
      >
        {iconPosition === 'left' && searchIcon}
        <input
          type="search"
          value={text}
          placeholder={placeholder}
          aria-label={placeholder}
          onChange={(e) => set(e.target.value)}
          className="min-w-0 flex-1 bg-transparent type-body-small text-text-primary caret-cta-primary-default placeholder:text-text-secondary focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {showClear && text && (
          <button type="button" aria-label="Tøm søk" onClick={() => set('')} className="grid place-items-center text-text-secondary cursor-pointer">
            <Icon name="cancel" size={18} />
          </button>
        )}
        {iconPosition === 'right' && searchIcon}
      </label>
      {buttonLabel && <Button type="submit" label={buttonLabel} />}
    </form>
  );
}
