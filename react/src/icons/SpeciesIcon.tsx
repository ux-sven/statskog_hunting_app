import type { CSSProperties } from 'react';
import { asset, cx } from '../components/cx';
import { speciesById, type SpeciesId } from '../domain/species';

export interface SpeciesIconProps {
  species: SpeciesId;
  /** Standard 48. */
  size?: number;
  /** Standard border-invert (grønn), som i Figma. */
  color?: string;
  className?: string;
  /** Skjul for skjermleser når navnet står ved siden av. */
  decorative?: boolean;
}

/** Artsillustrasjon (Figma-komponentene «ørret», «orrfugl» …). */
export function SpeciesIcon({ species, size = 48, color, className, decorative = false }: SpeciesIconProps) {
  const url = asset(`species/${species}.svg`);
  const style: CSSProperties = {
    width: size,
    height: size,
    backgroundColor: color ?? 'var(--border-invert)',
    WebkitMask: `url("${url}") center / contain no-repeat`,
    mask: `url("${url}") center / contain no-repeat`,
  };
  return (
    <span
      {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': speciesById(species).label })} className={cx('inline-block shrink-0', className)} style={style} />
  );
}
