import { cx } from './cx';

export interface SegmentedControlProps {
  segments: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  /** Lesbar tekst for skjermleser. */
  label?: string;
  className?: string;
}

/**
 * Segmentert valg, f.eks. «Småviltjakt | Fiske» eller «Jaktkort | Aktiveringer».
 * Tilsvarer «Segmented Control» fra iOS-biblioteket i Figma.
 */
export function SegmentedControl({ segments, selectedIndex, onChange, label, className }: SegmentedControlProps) {
  return (
    <div role="tablist" aria-label={label} className={cx('flex h-[32px] rounded-[9px] border border-border-tertiary bg-surface-secondary p-[2.5px]', className)}>
      {segments.map((s, i) => {
        const on = i === selectedIndex;
        return (
          <button
            key={s}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(i)}
            className={cx(
              'min-w-0 flex-1 truncate rounded-[7px] px-[10px] text-[13px] leading-[18px] tracking-[-0.08px] transition-colors cursor-pointer',
              on
                ? 'border-[0.5px] border-surface-primary bg-surface-invert font-semibold text-text-invert shadow-[0_3px_8px_rgb(0_0_0/0.12),0_3px_1px_rgb(0_0_0/0.04)]'
                : 'text-text-primary',
            )}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}
