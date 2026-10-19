import { Checkbox } from '../../components/Checkbox';
import { Chip } from '../../components/Chip';
import { Icon } from '../../icons/Icon';

export interface FilterCheckboxTileProps {
  label: string;
  checked: boolean | null;
  onChange?: (v: boolean | null) => void;
  /** Figma `Show selected filter` (brikken «(1) Aktivt filter»). */
  activeSubFilters?: number;
  onClearSubFilters?: () => void;
  /** Figma `Show chevron`: åpner underliste, f.eks. kommuner i et fylke. */
  onOpen?: () => void;
}

/** Filtervalg med avkrysning og eventuelt underfilter («Filter checkbox option cell»). */
export function FilterCheckboxTile({ label, checked, onChange, activeSubFilters = 0, onClearSubFilters, onOpen }: FilterCheckboxTileProps) {
  return (
    <div className="flex items-center gap-s bg-surface-primary p-m">
      <div className="flex min-w-0 flex-1">
        <Checkbox checked={checked} label={label} tristate={checked === null} onChange={onChange} />
      </div>
      {activeSubFilters > 0 && <Chip label={`(${activeSubFilters}) Aktivt filter`} size="medium" onDelete={onClearSubFilters} className="min-w-0" />}
      {onOpen && (
        <button type="button" aria-label={`Åpne ${label}`} onClick={onOpen} className="grid size-[32px] place-items-center text-text-primary cursor-pointer hover:bg-surface-secondary rounded-small">
          <Icon name="chevronRight" size={16} />
        </button>
      )}
    </div>
  );
}
