import { cx, type Size } from './cx';
import { Icon } from '../icons/Icon';

export interface ChipProps {
  /** Figma `Label`. */
  label: string;
  /** «Chips Small / Medium / Large». */
  size?: Size;
  /** Figma `Property 1=selected`. */
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  /** Viser lukkeknappen (Figma `Show Icon`). */
  onDelete?: () => void;
  /** `false` gir Figma `Property 1=disabled`. */
  enabled?: boolean;
  className?: string;
}

const height = { small: 'h-[32px]', medium: 'h-[38px]', large: 'h-[42px]' } as const;
const text = { small: 'type-body-small', medium: 'type-body-large', large: 'type-subtitle-large' } as const;

/** Chip / filterbrikke (siden «Chips» i Figma). Hover og fokus følger ekte interaksjon. */
export function Chip({ label, size = 'small', selected = false, onSelectedChange, onDelete, enabled = true, className }: ChipProps) {
  const radius = size === 'medium' ? 'rounded-medium' : 'rounded-xxlarge';
  return (
    <span
      className={cx(
        'group/chip inline-flex max-w-full items-stretch overflow-hidden border',
        height[size],
        radius,
        !enabled
          ? 'border-border-primary bg-surface-primary'
          : selected
            ? 'border-border-invert bg-surface-invert'
            : 'border-border-secondary bg-surface-primary hover:bg-surface-secondary has-[button:focus-visible]:border-border-invert has-[button:focus-visible]:[outline:1px_solid_var(--border-invert)]',
        className,
      )}
    >
      <button
        type="button"
        aria-pressed={selected}
        disabled={!enabled || !onSelectedChange}
        onClick={() => onSelectedChange?.(!selected)}
        className={cx(
          'min-w-0 truncate pl-s focus-visible:outline-none',
          onDelete ? 'pr-[4px]' : 'pr-s',
          text[size],
          !enabled
            ? 'text-cta-primary-disabled'
            : selected
              ? 'text-text-invert'
              : 'text-text-primary group-hover/chip:text-cta-primary-hover',
          enabled && onSelectedChange ? 'cursor-pointer' : 'cursor-default',
        )}
      >
        {label}
      </button>
      {onDelete && (
        <button
          type="button"
          aria-label={`Fjern ${label}`}
          disabled={!enabled}
          onClick={onDelete}
          className={cx(
            'grid shrink-0 place-items-center cursor-pointer',
            size === 'large' ? 'w-[36px]' : 'w-[28px]',
            selected && 'bg-surface-secondary',
            enabled ? 'text-cta-primary-default' : 'text-cta-primary-disabled',
          )}
        >
          <Icon name="deleteClose" size={size === 'large' ? 20 : 16} />
        </button>
      )}
    </span>
  );
}
