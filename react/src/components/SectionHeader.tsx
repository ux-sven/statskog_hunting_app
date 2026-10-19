import { useState, type ReactNode } from 'react';
import { cx } from './cx';
import { Icon } from '../icons/Icon';

export interface SectionHeaderProps {
  title: string;
  /** Pilen peker opp når seksjonen er åpen. */
  expanded?: boolean;
  /** Uten `onToggle` vises ingen pil. */
  onToggle?: () => void;
}

/** Overskrift for en seksjon som kan åpnes og lukkes («Search Results Section Header»). */
export function SectionHeader({ title, expanded = true, onToggle }: SectionHeaderProps) {
  const row = (
    <>
      <span className="flex-1 type-subtitle-large text-left">{title}</span>
      {onToggle && <Icon name={expanded ? 'chevronRoundedUp' : 'chevronRoundedDown'} />}
    </>
  );
  const cls = 'flex w-full items-center px-xs py-[4px] text-text-primary';
  return (
    <h3 className="m-0 font-normal">
      {onToggle ? (
        <button type="button" aria-expanded={expanded} onClick={onToggle} className={cx(cls, 'cursor-pointer hover:bg-surface-secondary')}>
          {row}
        </button>
      ) : (
        <div className={cls}>{row}</div>
      )}
    </h3>
  );
}

export interface ExpandableSectionProps {
  title: string;
  children: ReactNode;
  initiallyExpanded?: boolean;
  className?: string;
}

/**
 * Seksjon med `SectionHeader` og innhold som kan skjules. Brukes for søketreff
 * (sted, jakt, fiske) og andre grupperte lister.
 */
export function ExpandableSection({ title, children, initiallyExpanded = true, className }: ExpandableSectionProps) {
  const [open, setOpen] = useState(initiallyExpanded);
  return (
    <section className={cx('flex flex-col gap-xs', className)}>
      <SectionHeader title={title} expanded={open} onToggle={() => setOpen(!open)} />
      {open && children}
    </section>
  );
}
