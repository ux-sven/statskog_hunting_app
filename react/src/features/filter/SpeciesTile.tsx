import { SpeciesIcon } from '../../icons/SpeciesIcon';
import { speciesById, type SpeciesId } from '../../domain/species';
import { cx } from '../../components/cx';

/** «Art» `Property 1`: Vertical, Horisontal, Horisontal Variant, Horisontal Small. */
export type SpeciesTileLayout = 'vertical' | 'horizontal' | 'horizontalTrailing' | 'small';

export interface SpeciesTileProps {
  /** Figma `Arttype` (ikonbytte). */
  species: SpeciesId;
  /** Figma `Artsnavn`. Standard: artens navn. */
  label?: string;
  layout?: SpeciesTileLayout;
  className?: string;
}

/** Art med illustrasjon og navn («Art» på Components-siden). */
export function SpeciesTile({ species, label, layout = 'vertical', className }: SpeciesTileProps) {
  const name = label ?? speciesById(species).label;
  if (layout === 'vertical') {
    return (
      <span className={cx('inline-flex flex-col items-center', className)}>
        <SpeciesIcon species={species} size={72} decorative />
        <span className="type-body-small text-center text-text-primary">{name}</span>
      </span>
    );
  }
  if (layout === 'horizontalTrailing') {
    return (
      <span className={cx('flex items-center gap-s', className)}>
        <span className="flex-1 type-body-large text-text-primary">{name}</span>
        <SpeciesIcon species={species} size={64} decorative />
      </span>
    );
  }
  const small = layout === 'small';
  return (
    <span className={cx('inline-flex items-center', small ? 'gap-xs' : 'gap-s', className)}>
      <SpeciesIcon species={species} size={small ? 36 : 64} decorative />
      <span className="type-body-large text-text-primary">{name}</span>
    </span>
  );
}
