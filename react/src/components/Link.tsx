import type { ReactNode } from 'react';
import { cx } from './cx';

export interface LinkProps {
  /** Figma `Text`. */
  text: string;
  href?: string;
  onClick?: () => void;
  /** Figma `Show Icon` + `Icon`, f.eks. `<Icon name="externalLink" />`. */
  icon?: ReactNode;
  /** Figma `Used in list=Yes`: padding, understrek bare ved hover. */
  inList?: boolean;
  /** Figma `State=Visited`. */
  visited?: boolean;
  /** Figma `State=Inactive`. */
  disabled?: boolean;
  className?: string;
}

/** Tekstlenke (siden «Links» i Figma, settet «Simple Text Link»). */
export function Link({ text, href, onClick, icon, inList = false, visited = false, disabled = false, className }: LinkProps) {
  const cls = cx(
    'inline-flex items-center gap-[4px] type-body-medium [--icon-size:14px] decoration-current',
    disabled
      ? 'text-cta-primary-disabled pointer-events-none'
      : cx(
          visited ? 'text-cta-primary-visited' : 'text-cta-primary-default hover:text-cta-primary-hover',
          inList ? 'hover:underline' : 'underline',
          'cursor-pointer',
        ),
    inList && 'px-s py-xs',
    className,
  );
  const content = (
    <>
      <span>{text}</span>
      {icon}
    </>
  );
  return href && !disabled ? (
    <a href={href} className={cls} onClick={onClick} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
      {content}
    </a>
  ) : (
    <button type="button" className={cls} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}
