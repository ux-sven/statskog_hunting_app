import { cx } from '../../components/cx';
import { monthShort, weekdayShort } from '../../domain/format';
import { isFull, type ActivationSlot } from '../../domain/license';

export interface DayCellProps {
  slot: ActivationSlot;
  /** Figma `Selected`. */
  selected?: boolean;
  /** Uten `onClick` får du Figma `disabled` (dagen er full eller ikke tilgjengelig). */
  onClick?: () => void;
}

/** Én dag i dagvelgeren («Activation Day»). */
export function DayCell({ slot, selected = false, onClick }: DayCellProps) {
  const d = slot.date;
  const disabled = !onClick;
  const fg = disabled ? 'text-cta-primary-disabled' : selected ? 'text-text-invert' : 'text-text-primary';
  const band = 'px-[4px] py-[4px] type-body-small whitespace-nowrap text-center';
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      aria-label={`${weekdayShort(d)} ${d.getDate()}. ${monthShort(d)}, ${slot.used} av ${slot.capacity} brukt`}
      className={cx(
        'flex w-[80px] shrink-0 flex-col overflow-hidden rounded-small cursor-pointer disabled:cursor-not-allowed',
        fg,
        disabled
          ? 'border border-border-primary bg-surface-primary'
          : selected
            ? 'border-2 border-border-invert bg-surface-tertiary'
            : 'border border-cta-primary-default bg-surface-secondary hover:bg-surface-primary',
      )}
    >
      <span className={band}>{weekdayShort(d)}</span>
      <span className={cx('flex flex-col items-center px-[4px] py-[4px]', !selected && 'bg-surface-primary')}>
        <span className="type-body-large font-bold leading-[17px]">{d.getDate()}</span>
        <span className={cx('type-body-small', !disabled && !selected && 'text-text-secondary')}>{monthShort(d)}</span>
      </span>
      <span className={band}>
        {slot.used} / {slot.capacity}
      </span>
    </button>
  );
}

export interface DayPickerProps {
  slots: ActivationSlot[];
  /** Valgte dager, som tidsstempel for midnatt (`Date.getTime()`). */
  selected: Set<number>;
  onToggle: (day: Date) => void;
}

/** Velg dager for aktivering – vannrett liste med `DayCell` («Activation Options» er et eksempel). */
export function DayPicker({ slots, selected, onToggle }: DayPickerProps) {
  return (
    <div className="flex gap-xs overflow-x-auto pb-[4px]" role="group" aria-label="Velg dager">
      {slots.map((s) => {
        const on = selected.has(s.date.getTime());
        // En valgt dag kan alltid velges bort, også når den er full.
        const enabled = s.available && (!isFull(s) || on);
        return <DayCell key={s.date.getTime()} slot={s} selected={on} onClick={enabled ? () => onToggle(s.date) : undefined} />;
      })}
    </div>
  );
}
