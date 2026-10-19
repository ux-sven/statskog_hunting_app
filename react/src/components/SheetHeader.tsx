import type { ReactNode } from 'react';
import { cx } from './cx';
import { Icon } from '../icons/Icon';
import { Button } from './Button';

/** Dra-håndtaket øverst i skuffen (60 × 4, «drag handle» i Figma). */
export function DragHandle({ className }: { className?: string }) {
  return <span aria-hidden className={cx('block h-[4px] w-[60px] rounded-medium bg-border-secondary', className)} />;
}

/** Lukkeknappen (×) i skuffer og modaler. */
export function CloseButton({ onClick, label = 'Lukk', size = 'medium' }: { onClick: () => void; label?: string; size?: 'small' | 'medium' }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cx('grid shrink-0 place-items-center rounded-small text-cta-primary-default hover:bg-surface-secondary cursor-pointer', size === 'small' ? 'size-[34px]' : 'size-[46px]')}
    >
      <Icon name="close" size={size === 'small' ? 18 : 22} />
    </button>
  );
}

export type SheetHeaderVariant = 'default' | 'modalStack' | 'drawer' | 'drawerSmall';

export interface SheetHeaderProps {
  /**
   * Figma «Map Navigation Bar» `Property 1`:
   * - `default`: × til venstre og tittel i midten (toppen av en modal)
   * - `modalStack`: som `default`, men med avrundede hjørner og visningen bak
   * - `drawer`: håndtak, stor tittel og handlingsknapp til høyre (skuffen over kartet)
   * - `drawerSmall`: bare håndtak og × (skuff med ett valgt objekt fra kartet)
   *
   * `Property 1=Search` er `SearchFilterBar`.
   */
  variant?: SheetHeaderVariant;
  title?: string;
  /** Lukkeknappen (×). */
  onClose?: () => void;
  /** «Back Button» i `drawer`. */
  onBack?: () => void;
  backLabel?: string;
  /** «Action Button» til høyre, f.eks. kartknappen eller «Ferdig». */
  action?: ReactNode;
  /** Id på tittelen, for `aria-labelledby`. */
  titleId?: string;
  className?: string;
}

/** Topp i skuffer og modaler (Figma «Map Navigation Bar»). */
export function SheetHeader({ variant = 'drawer', title, onClose, onBack, backLabel = 'Tilbake', action, titleId, className }: SheetHeaderProps) {
  if (variant === 'drawer') {
    return (
      <div className={cx('flex flex-col items-center gap-xs px-m pt-s', className)}>
        <DragHandle />
        <div className="flex min-h-[46px] w-full items-center gap-xs">
          {onBack && <Button variant="tertiary" size="small" label={backLabel} leadingIcon={<Icon name="chevronLeftSmall" />} onClick={onBack} className="!bg-transparent !px-0" />}
          <h2 id={titleId} className="m-0 min-w-0 flex-1 truncate type-headline-h1 font-normal text-text-primary">
            {title}
          </h2>
          {action}
        </div>
      </div>
    );
  }
  if (variant === 'drawerSmall') {
    return (
      <div className={cx('relative flex h-[50px] items-start justify-center px-xs pt-s', className)}>
        <DragHandle />
        {title && (
          <h2 id={titleId} className="sr-only">
            {title}
          </h2>
        )}
        <div className="absolute top-[8px] left-xs">{action}</div>
        {onClose && (
          <div className="absolute top-[8px] right-xs">
            <CloseButton onClick={onClose} size="small" />
          </div>
        )}
      </div>
    );
  }
  return (
    <div className={cx('flex items-center gap-s bg-surface-primary p-s', variant === 'modalStack' && 'rounded-t-[27px]', className)}>
      {onClose ? <CloseButton onClick={onClose} /> : <span className="size-[46px]" />}
      <h2 id={titleId} className="m-0 min-w-0 flex-1 truncate text-center text-[17px] leading-[22px] font-semibold text-text-primary">
        {title}
      </h2>
      <span className="flex min-w-[46px] justify-end">{action}</span>
    </div>
  );
}
