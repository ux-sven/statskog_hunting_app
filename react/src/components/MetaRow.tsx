import { Fragment, type ReactNode } from 'react';
import { cx } from './cx';
import { Icon } from '../icons/Icon';
import type { IconName } from '../icons/iconNames';

export interface MetaRowProps {
  icon: IconName;
  /** Én tekst, eller flere deler med prikk mellom («Telemark • Vinje»). */
  text: string | string[];
  /** Tekststil (Tailwind-klasser). Standard: body-small, text-secondary. */
  textClassName?: string;
  iconClassName?: string;
  /** Siste del i fet skrift («Trøndelag • **Selbu**»). */
  emphasizeLast?: boolean;
  /** Prikkfarge mellom delene (standard: tekstfargen). */
  dotClassName?: string;
  /** Innhold mellom ikonet og teksten, f.eks. korttypesymboler i prislinjen. */
  leading?: ReactNode;
  className?: string;
}

/**
 * Linje med ikon og tekst i tilbuds-, jakt- og aktiveringskort (sted, periode,
 * pris, arter, jeger). I Figma er dette rammer i hvert kort, ikke en egen komponent.
 */
export function MetaRow({ icon, text, textClassName = 'type-body-small text-text-secondary', iconClassName = 'text-text-primary', emphasizeLast, dotClassName = 'bg-current', leading, className }: MetaRowProps) {
  const parts = Array.isArray(text) ? text : [text];
  return (
    <div className={cx('flex items-start gap-s', className)}>
      <span className="grid size-[26px] shrink-0 place-items-center">
        <Icon name={icon} size={24} className={iconClassName} />
      </span>
      {leading}
      <div className={cx('flex min-h-[26px] min-w-0 flex-1 flex-wrap items-center gap-x-xs', textClassName)}>
        {parts.map((p, i) => (
          <Fragment key={i}>
            {i > 0 && <span aria-hidden className={cx('size-[4px] rounded-full', dotClassName)} />}
            <span className={emphasizeLast && i === parts.length - 1 ? 'font-bold' : undefined}>{p}</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/** Nøkkel og verdi på samme linje («Jegernummer … 654321»). */
export function KeyValueRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-xs py-[4px] type-body-small">
      <dt className="text-text-secondary">{label}</dt>
      <dd className="m-0 flex-1 text-right text-text-primary">{value}</dd>
    </div>
  );
}
