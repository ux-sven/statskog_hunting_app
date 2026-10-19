import type { CSSProperties } from 'react';
import { asset, cx } from '../components/cx';
import { multicolorIcons, type IconName } from './iconNames';

export interface IconProps {
  /** Navnet på ikonet fra Figma (samme som `AppIcons` i Flutter). */
  name: IconName;
  /** Størrelse i px. Standard: CSS-variabelen --icon-size fra omgivelsene, ellers 24. */
  size?: number;
  /** Farge. Standard `currentColor`, dvs. tekstfargen rundt ikonet. */
  color?: string;
  /** Lesbar tekst for skjermleser. Uten label er ikonet dekorativt. */
  label?: string;
  className?: string;
}

/**
 * Ikon fra Figma-ikonsettet. Ensfargede ikoner farges med `color`
 * (CSS-maske); flerfargede ikoner vises som bilde.
 */
export function Icon({ name, size, color, label, className }: IconProps) {
  const dim = size ?? 'var(--icon-size, 24px)';
  const url = asset(`icons/${name}.svg`);
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };
  if (multicolorIcons.has(name)) {
    return <img src={url} style={{ width: dim, height: dim }} alt={label ?? ''} className={cx('shrink-0', className)} />;
  }
  const style: CSSProperties = {
    width: dim,
    height: dim,
    backgroundColor: color ?? 'currentColor',
    WebkitMask: `url("${url}") center / contain no-repeat`,
    mask: `url("${url}") center / contain no-repeat`,
  };
  return <span {...a11y} className={cx('inline-block shrink-0', className)} style={style} />;
}
