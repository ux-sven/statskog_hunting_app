import { useId } from 'react';
import { cx } from './cx';
import { Icon } from '../icons/Icon';

export interface SelectProps<T extends string> {
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (v: T) => void;
  /** Tekst som vises og leses opp, f.eks. «Sorter etter». */
  label: string;
  /** Vis etiketten i feltet i stedet for valgt verdi (som «Sorter etter ▾» i Figma). */
  showLabel?: boolean;
  className?: string;
}

/** Nedtrekksliste («Inputfield Small» med `Is Dropdown`). Bruker systemets velger, som er best på mobil. */
export function Select<T extends string>({ value, options, onChange, label, showLabel = false, className }: SelectProps<T>) {
  const id = useId();
  const current = options.find((o) => o.value === value)?.label;
  return (
    <label htmlFor={id} className={cx('relative inline-flex h-[38px] items-center gap-xs rounded-medium border border-border-secondary bg-surface-primary pr-xs pl-s text-text-primary hover:border-cta-primary-hover focus-within:border-cta-primary-selected', className)}>
      <span className="type-body-small whitespace-nowrap">{showLabel ? label : current}</span>
      <Icon name="chevronDownSmall" size={18} className="text-text-secondary" />
      <select id={id} value={value} aria-label={label} onChange={(e) => onChange(e.target.value as T)} className="absolute inset-0 cursor-pointer opacity-0">
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
