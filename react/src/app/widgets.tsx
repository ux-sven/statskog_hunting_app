import type { ReactNode } from 'react';
import { Icon } from '../icons/Icon';
import { Button } from '../components/Button';
import { Notice } from '../components/Notice';
import { useNav } from './AppContext';
import { useStore } from '../data/AppStore';
import { formatTime } from '../domain/format';

/** Stor sidetittel («Innstillinger», «Fangstrapportering»). */
export function ScreenTitle({ title, trailing }: { title: string; trailing?: ReactNode }) {
  return (
    <div className="flex items-center px-m pt-m pb-xs">
      <h1 className="m-0 flex-1 type-headline-h1 font-normal text-text-primary">{title}</h1>
      {trailing}
    </div>
  );
}

/** Topp med tilbakeknapp på sider som åpnes over bunnmenyen («< Offline kart»). */
export function BackHeader({ title, onBack }: { title: string; onBack?: () => void }) {
  const nav = useNav();
  return (
    <header className="relative flex h-[52px] shrink-0 items-center justify-center border-b border-border-primary bg-surface-primary px-[52px]">
      <button type="button" aria-label="Tilbake" onClick={onBack ?? nav.pop} className="absolute left-xs grid size-[44px] place-items-center rounded-small text-cta-primary-default hover:bg-surface-secondary cursor-pointer">
        <Icon name="chevronRoundedLeft" />
      </button>
      <h1 className="m-0 truncate text-[17px] leading-[22px] font-semibold text-text-primary">{title}</h1>
    </header>
  );
}

/** Side som åpnes over bunnmenyen: topp, innhold som ruller og ev. knapper nederst. */
export function PushedScreen({ title, children, footer, onBack, className }: { title: string; children: ReactNode; footer?: ReactNode; onBack?: () => void; className?: string }) {
  return (
    <div className="flex h-full flex-col bg-surface-secondary">
      <BackHeader title={title} onBack={onBack} />
      <div className={`min-h-0 flex-1 overflow-y-auto ${className ?? ''}`}>{children}</div>
      {footer && <div className="shrink-0 border-t border-border-primary bg-surface-primary">{footer}</div>}
    </div>
  );
}

/** To tekstknapper side om side nederst («Fjern alle filtre | Vis tilbud», «Avbryt | Last ned»). */
export function FooterActions({ left, right }: { left: { label: string; onClick: () => void; disabled?: boolean }; right: { label: string; onClick: () => void; disabled?: boolean } }) {
  const cls = 'h-[56px] flex-1 type-body-large text-cta-primary-default hover:bg-surface-secondary disabled:text-cta-primary-disabled cursor-pointer';
  return (
    <div className="flex divide-x divide-border-primary">
      <button type="button" className={cls} onClick={left.onClick} disabled={left.disabled}>
        {left.label}
      </button>
      <button type="button" className={`${cls} font-semibold`} onClick={right.onClick} disabled={right.disabled}>
        {right.label}
      </button>
    </div>
  );
}

/** Vises når en fane krever innlogging (Figma «Jaktkart uten innlogging»). */
export function LoginPrompt({ text }: { text: string }) {
  const nav = useNav();
  return (
    <div className="flex flex-col gap-s p-m">
      <Notice icon="account" text={text} />
      <Button label="Logg inn med Inatur" expand onClick={nav.login} />
    </div>
  );
}

/** «Sist oppdatert …» og «Venter på dekning» (synkstatus). */
export function SyncStatus() {
  const store = useStore();
  if (store.online && !store.pendingReports) return store.syncedAt ? <p className="m-0 px-m pt-xs type-body-xsmall text-text-secondary">Sist oppdatert {formatTime(store.syncedAt)}</p> : null;
  return (
    <p className="m-0 flex items-center gap-[4px] px-m pt-xs type-body-xsmall text-text-secondary">
      <Icon name="synchronize" size={14} />
      {store.online ? 'Sender…' : `Uten dekning${store.syncedAt ? ` – data fra ${formatTime(store.syncedAt)}` : ''}`}
    </p>
  );
}

/** Lasteindikator i lister. */
export function Skeleton({ rows = 2 }: { rows?: number }) {
  return (
    <div aria-busy="true" aria-label="Laster" className="flex flex-col gap-s">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="h-[260px] animate-pulse rounded-large bg-surface-secondary" />
      ))}
    </div>
  );
}
