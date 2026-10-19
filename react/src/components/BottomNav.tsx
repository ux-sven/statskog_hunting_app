import { cx } from './cx';
import { Icon } from '../icons/Icon';
import type { IconName } from '../icons/iconNames';

export interface BottomNavItem {
  icon: IconName;
  label: string;
}

export interface BottomNavProps {
  /** Figma `Show Tab Button 3/4/5` → hvilke elementer som tas med. */
  items: BottomNavItem[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

/** Bunnmenyen («Tab Bar - iPhone»). Valgt fane har grå bakgrunn og fet tekst. */
export function BottomNav({ items, selectedIndex, onChange }: BottomNavProps) {
  return (
    <nav aria-label="Hovedmeny" className="flex border-t border-border-primary bg-surface-primary pt-[6px] pb-[max(6px,env(safe-area-inset-bottom))]">
      {items.map((it, i) => {
        const on = i === selectedIndex;
        return (
          <button
            key={it.label}
            type="button"
            aria-current={on ? 'page' : undefined}
            onClick={() => onChange(i)}
            className={cx('flex h-[48px] min-w-0 flex-1 flex-col items-center justify-center gap-[2px] cursor-pointer', on && 'bg-surface-secondary')}
          >
            <Icon name={it.icon} size={26} className="text-cta-primary-default" />
            <span className={cx('max-w-full truncate text-[10px] leading-[12px]', on ? 'font-extrabold text-text-primary' : 'font-medium text-cta-primary-default')}>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
