import { cx } from './cx';
import { Icon } from '../icons/Icon';
import type { IconName } from '../icons/iconNames';

export interface ToggleProps {
  checked: boolean;
  onChange?: (v: boolean) => void;
  label?: string;
}

/** Av/på-bryter (Figma «Toggle», iOS-stil). */
export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={!onChange}
      onClick={() => onChange?.(!checked)}
      className={cx(
        'relative h-[31px] w-[51px] shrink-0 rounded-full p-[2px] transition-colors cursor-pointer',
        checked ? 'bg-cta-primary-selected' : 'bg-cta-primary-disabled',
      )}
    >
      <span
        className={cx(
          'block size-[27px] rounded-full bg-white transition-transform shadow-[0_3px_8px_rgb(0_0_0/0.15),0_3px_1px_rgb(0_0_0/0.06)]',
          checked && 'translate-x-[20px]',
        )}
      />
    </button>
  );
}

interface BaseProps {
  /** Figma `Main Text`. */
  title: string;
  /** Figma `Show SubText` + `Sub Text`. */
  subtitle?: string;
  /** Figma `Show Icon` + `Icon Type`. */
  icon?: IconName;
  /** Figma `Show separator`. */
  showSeparator?: boolean;
}

export interface ListTileProps extends BaseProps {
  /** `stacked` = `Cell Type=Default Cell`, `inline` = `Default Cell 2`. */
  layout?: 'stacked' | 'inline';
  /** Figma `Show Accessory View`. */
  onClick?: () => void;
  /** Figma `State=Delete`: rød slett-knapp til høyre. */
  onDelete?: () => void;
  /** Figma `Accessory Icon`. */
  trailingIcon?: IconName;
  /** Figma `State=Toggle`. */
  toggle?: { checked: boolean; onChange?: (v: boolean) => void };
}

/** Rad i en liste, f.eks. i Innstillinger («Mobile TableView Cell»). */
export function ListTile({ title, subtitle, icon, layout = 'stacked', onClick, onDelete, trailingIcon = 'chevronRight', toggle, showSeparator = true }: ListTileProps) {
  const labels =
    layout === 'stacked' ? (
      <span className="flex flex-col text-left">
        <span className="type-body-medium text-text-primary">{title}</span>
        {subtitle && <span className="type-body-small text-text-secondary">{subtitle}</span>}
      </span>
    ) : (
      <span className="flex items-center gap-xs text-left">
        <span className="flex-1 type-body-medium text-text-primary">{title}</span>
        {subtitle && <span className="type-body-small text-text-secondary">{subtitle}</span>}
      </span>
    );
  const content = (
    <>
      {icon && <Icon name={icon} size={20} className="text-attention-success" />}
      <span className="min-w-0 flex-1 py-xs">{labels}</span>
      {!toggle && onClick && <Icon name={trailingIcon} size={16} className="text-cta-primary-default" />}
    </>
  );
  const rowCls = 'flex min-h-[48px] flex-1 items-center gap-xs pr-m';
  return (
    <div className="bg-surface-primary pl-m">
      <div className="flex min-h-[48px] items-stretch">
        {onClick && !toggle ? (
          <button type="button" onClick={onClick} className={cx(rowCls, 'cursor-pointer hover:bg-surface-secondary')}>
            {content}
          </button>
        ) : toggle ? (
          <label className={cx(rowCls, 'cursor-pointer')}>
            {content}
            <Toggle checked={toggle.checked} onChange={toggle.onChange} label={title} />
          </label>
        ) : (
          <div className={rowCls}>{content}</div>
        )}
        {onDelete && (
          <button type="button" aria-label={`Slett ${title}`} onClick={onDelete} className="ml-xs grid place-items-center bg-attention-error px-m text-text-invert cursor-pointer">
            <Icon name="trash" size={16} />
          </button>
        )}
      </div>
      {showSeparator && <div className="h-px bg-border-primary" />}
    </div>
  );
}
