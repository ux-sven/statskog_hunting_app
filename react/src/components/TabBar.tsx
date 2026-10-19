import type { ReactNode } from 'react';
import { cx } from './cx';

export interface Tab {
  label: string;
  icon?: ReactNode;
  enabled?: boolean;
}

export interface TabButtonProps {
  /** Figma `Label`. */
  label: string;
  /** Figma `Use Icon` + `Icon`. */
  icon?: ReactNode;
  /** Figma `Property 1=Active`. */
  active?: boolean;
  /** «Tab Bar Button Small / Medium». */
  size?: 'small' | 'medium';
  /** Uten `onClick` får du `Property 1=Disabled`. */
  onClick?: () => void;
}

/** Enkeltknapp i fanerad («Tab Bar Button Small / Medium»). Hover og fokus følger ekte interaksjon. */
export function TabButton({ label, icon, active = false, size = 'small', onClick }: TabButtonProps) {
  const medium = size === 'medium';
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      disabled={!onClick}
      onClick={onClick}
      className={cx(
        'inline-flex shrink-0 items-center gap-s whitespace-nowrap cursor-pointer [--icon-size:18px]',
        medium ? 'px-l py-m type-subtitle-large' : 'px-m py-s type-body-large',
        'focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_1px_var(--cta-primary-selected)]',
        'disabled:cursor-not-allowed disabled:text-cta-primary-disabled',
        active
          ? 'bg-surface-secondary font-semibold text-text-primary shadow-[inset_0_-2px_0_var(--cta-primary-selected)]'
          : 'text-cta-primary-default hover:bg-surface-secondary focus-visible:bg-surface-secondary focus-visible:text-cta-primary-selected',
      )}
    >
      {icon}
      {label}
    </button>
  );
}

export interface TabBarProps {
  /** Figma `Show Button 1–8` + knappenes `Label`. */
  tabs: Tab[];
  /** Knappen med `Property 1=Active`. */
  selectedIndex: number;
  onChange: (index: number) => void;
  /** «Tab Bar Small / Medium». */
  size?: 'small' | 'medium';
  className?: string;
}

/** Fanerad (siden «Tab Bar» i Figma). */
export function TabBar({ tabs, selectedIndex, onChange, size = 'small', className }: TabBarProps) {
  return (
    <div role="tablist" className={cx('flex overflow-x-auto border-b border-border-secondary bg-surface-primary px-s', className)}>
      {tabs.map((t, i) => (
        <TabButton
          key={t.label}
          label={t.label}
          icon={t.icon}
          size={size}
          active={i === selectedIndex}
          onClick={t.enabled === false ? undefined : () => onChange(i)}
        />
      ))}
    </div>
  );
}
