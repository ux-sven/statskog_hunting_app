import type { ReactNode } from 'react';
import { asset, cx } from './cx';
import { Icon } from '../icons/Icon';
import type { IconName } from '../icons/iconNames';

export interface NoticeProps {
  text: string;
  /** Ikonet til venstre («instructions»). */
  icon?: IconName;
  className?: string;
}

/** Melding til brukeren («instructions»): ikon til venstre, tekst, tynn ramme. */
export function Notice({ text, icon = 'information', className }: NoticeProps) {
  return (
    <div className={cx('flex items-center gap-m rounded-small border border-border-tertiary bg-surface-secondary px-m py-xs text-text-primary', className)}>
      <Icon name={icon} />
      <p className="type-body-large m-0 flex-1">{text}</p>
    </div>
  );
}

export interface CalloutProps {
  text: string;
  /** Knapp under teksten, typisk en `Button`. */
  action?: ReactNode;
  /** Bakgrunnsbilde. `null` gir ingen bakgrunn. */
  background?: string | null;
  className?: string;
}

/** Påminnelse med sentrert tekst og knapp på kartbakgrunn («Offline Reminder»). */
export function Callout({ text, action, background = asset('images/offline_reminder_bg.png'), className }: CalloutProps) {
  return (
    <div
      className={cx('flex flex-col items-center gap-xs rounded-large border border-border-tertiary bg-surface-primary bg-cover bg-center px-[25px] py-[17px]', className)}
      style={background ? { backgroundImage: `url("${background}")` } : undefined}
    >
      <p className="type-body-large m-0 text-center text-text-primary">{text}</p>
      {action}
    </div>
  );
}
