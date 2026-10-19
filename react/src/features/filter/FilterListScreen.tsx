import { useState } from 'react';
import { Link } from '../../components/Link';
import { Icon } from '../../icons/Icon';
import type { SpeciesId } from '../../domain/species';
import { FilterOptionTile } from './FilterOptionTile';
import { FilterCheckboxTile } from './FilterCheckboxTile';

export interface FilterListScreenProps<T> {
  title: string;
  items: T[];
  labelOf: (item: T) => string;
  keyOf: (item: T) => string;
  /** Med art vises rader med artsillustrasjon, ellers avkrysning og ev. pil. */
  speciesOf?: (item: T) => SpeciesId;
  initialSelection?: Set<T>;
  /** Åpner underliste for et valg (f.eks. kommuner i et fylke). */
  onOpenItem?: (item: T) => void;
  /** Antall aktive underfiltre for et valg. */
  subFilterCount?: (item: T) => number;
  onChange?: (selection: Set<T>) => void;
  onBack: () => void;
  backLabel?: string;
}

/**
 * Felles filterliste for alle filtervisningene i Figma («Filter Art Fisk»,
 * «Filter Art Småvilt», «Filter Fylke», «Filter Kommune», «Filter Jaktkort»).
 * Disse er eksempler – én skjerm med ulik datakilde.
 */
export function FilterListScreen<T>({ title, items, labelOf, keyOf, speciesOf, initialSelection, onOpenItem, subFilterCount, onChange, onBack, backLabel = 'Filtrer søket' }: FilterListScreenProps<T>) {
  const [selected, setSelected] = useState(() => new Set(initialSelection));
  const set = (item: T, on: boolean) => {
    const next = new Set(selected);
    if (on) next.add(item);
    else next.delete(item);
    setSelected(next);
    onChange?.(next);
  };
  return (
    <div className="flex h-full flex-col bg-surface-primary">
      <header className="flex items-center gap-m px-m pt-m pb-xs">
        <Link text={backLabel} icon={<Icon name="chevronLeftSmall" />} onClick={onBack} />
        <h1 className="m-0 type-body-large font-bold text-text-primary">{title}</h1>
      </header>
      <ul className="m-0 min-h-0 flex-1 list-none divide-y divide-border-tertiary overflow-y-auto p-0">
        {items.map((item) => (
          <li key={keyOf(item)}>
            {speciesOf ? (
              <FilterOptionTile kind="check" label={labelOf(item)} species={speciesOf(item)} selected={selected.has(item)} onChange={(v) => set(item, v)} />
            ) : (
              <FilterCheckboxTile
                label={labelOf(item)}
                checked={selected.has(item)}
                onChange={(v) => set(item, !!v)}
                activeSubFilters={subFilterCount?.(item) ?? 0}
                onOpen={onOpenItem && (() => onOpenItem(item))}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
