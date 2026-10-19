import type { ReactNode } from 'react';
import { Button } from './Button';
import { Chip } from './Chip';
import { SearchBar } from './SearchBar';
import { Icon } from '../icons/Icon';

export interface ActiveFilter {
  id: string;
  label: string;
}

export interface SearchFilterBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  onSubmit?: (q: string) => void;
  onFocus?: () => void;
  /** «Filter»-knappen. Antall aktive filtre vises i teksten. */
  onFilter: () => void;
  filterCount?: number;
  /** «Sorter etter»-nedtrekk, f.eks. `<Select />`. */
  sort?: ReactNode;
  /** Aktive filtre som brikker («Active filter 1–8»). */
  activeFilters?: ActiveFilter[];
  onRemoveFilter?: (id: string) => void;
}

/** Søk og filter over kartet (Figma «Map Navigation Bar» `Property 1=Search`). */
export function SearchFilterBar({ query, onQueryChange, onSubmit, onFocus, onFilter, filterCount = 0, sort, activeFilters = [], onRemoveFilter }: SearchFilterBarProps) {
  return (
    <div className="relative z-10 shrink-0 bg-surface-primary">
      <div className="px-s pt-s" onFocusCapture={onFocus}>
        <SearchBar rounded buttonLabel={null} value={query} onChange={onQueryChange} onSubmit={onSubmit} placeholder="Søk" />
      </div>
      <div className="flex items-center gap-s overflow-x-auto px-s py-s [scrollbar-width:none]">
        <Button label={filterCount ? `Filter (${filterCount})` : 'Filter'} variant="tertiary" size="medium" leadingIcon={<Icon name="filter" />} onClick={onFilter} className="shrink-0 !px-s !py-[8px]" />
        {sort}
        {activeFilters.map((f) => (
          <Chip key={f.id} label={f.label} size="medium" selected onDelete={onRemoveFilter ? () => onRemoveFilter(f.id) : undefined} className="shrink-0" />
        ))}
      </div>
    </div>
  );
}
