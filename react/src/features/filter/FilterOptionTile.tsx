import type { ReactNode } from 'react';
import { cx } from '../../components/cx';
import { CheckboxBox } from '../../components/Checkbox';
import { CountStepper } from '../../components/CountStepper';
import { Icon } from '../../icons/Icon';
import type { SpeciesId } from '../../domain/species';
import { SpeciesTile } from './SpeciesTile';

interface Base {
  label: string;
  /** Valgfri art; uten art vises bare teksten. */
  species?: SpeciesId;
}

/**
 * Rad i filter- og fangstlister («Filter option cell»). Variantene i Figma er
 * fire ulike mønstre, derfor `kind`:
 * - `Default` / `selected` → `kind: 'check'`
 * - `Default Variant` / `Selected Variant` → `kind: 'check'` + `checkboxFirst`
 * - `Select Item Closed` / `Select Item Active` → `kind: 'select'`
 * - `Counter` → `kind: 'counter'`
 * - `Report Counter` → `kind: 'summary'`
 */
export type FilterOptionTileProps = Base &
  (
    | { kind: 'check'; selected: boolean; onChange?: (v: boolean) => void; checkboxFirst?: boolean }
    | { kind: 'select'; expanded: boolean; onClick?: () => void }
    | { kind: 'counter'; count: number; onChange?: (v: number) => void }
    | { kind: 'summary'; value: string }
  );

export function FilterOptionTile(props: FilterOptionTileProps) {
  const { label, species } = props;
  const small = props.kind !== 'check';
  const name = (trailing = false): ReactNode =>
    species ? (
      <SpeciesTile species={species} label={label} layout={trailing ? 'horizontalTrailing' : small ? 'small' : 'horizontal'} className={trailing ? 'flex-1' : ''} />
    ) : (
      <span className="type-body-large text-text-primary text-left">{label}</span>
    );
  const pad = 'flex w-full items-center gap-xs px-m';

  switch (props.kind) {
    case 'check': {
      const { selected, onChange, checkboxFirst } = props;
      return (
        <button
          type="button"
          role="checkbox"
          aria-checked={selected}
          disabled={!onChange}
          onClick={() => onChange?.(!selected)}
          className={cx(pad, 'group cursor-pointer', species ? 'min-h-[64px]' : 'min-h-[48px]', selected ? 'bg-surface-secondary' : 'bg-surface-primary hover:bg-surface-secondary')}
        >
          {checkboxFirst ? (
            <>
              <CheckboxBox checked={selected} disabled={!onChange} />
              {name(true)}
            </>
          ) : (
            <>
              <span className="flex flex-1">{name()}</span>
              <CheckboxBox checked={selected} disabled={!onChange} />
            </>
          )}
        </button>
      );
    }
    case 'select':
      return (
        <button
          type="button"
          aria-expanded={props.expanded}
          onClick={props.onClick}
          className={cx(pad, 'min-h-[36px] cursor-pointer', props.expanded ? 'bg-surface-secondary' : 'bg-surface-primary hover:bg-surface-secondary')}
        >
          <span className="flex flex-1">{name()}</span>
          <Icon name={props.expanded ? 'chevronUp' : 'chevronRight'} className="text-text-primary" />
        </button>
      );
    case 'counter':
      return (
        <div className={cx(pad, 'min-h-[62px] bg-surface-primary py-xs')}>
          <span className="flex flex-1">{name()}</span>
          <CountStepper value={props.count} onChange={props.onChange} label={label} />
        </div>
      );
    case 'summary':
      return (
        <div className={cx(pad, 'min-h-[36px] bg-surface-primary')}>
          <span className="flex flex-1">{name()}</span>
          <span className="type-body-large text-text-primary">{props.value}</span>
        </div>
      );
  }
}
