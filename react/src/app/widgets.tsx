import type { ReactNode } from 'react';
import { Link } from '../components/Link';
import { Icon } from '../icons/Icon';
import { useNav } from './AppContext';
import { OffersMap } from '../map/OffersMap';

/** Stor sidetittel («Tilbud småviltjakt», «Innstillinger»). */
export function ScreenTitle({ title, trailing }: { title: string; trailing?: ReactNode }) {
  return (
    <div className="flex items-center px-m pt-m pb-xs">
      <h1 className="m-0 flex-1 type-headline-h1 text-text-primary">{title}</h1>
      {trailing}
    </div>
  );
}

/** Topp med tilbakeknapp på skjermer som åpnes over bunnmenyen. */
export function BackHeader({ title, backLabel = 'Tilbake', onBack }: { title: string; backLabel?: string; onBack?: () => void }) {
  const nav = useNav();
  return (
    <header className="flex items-center gap-m border-b border-border-primary bg-surface-primary px-m py-s">
      <Link text={backLabel} icon={<Icon name="chevronLeftSmall" />} onClick={onBack ?? nav.pop} />
      <h1 className="m-0 min-w-0 flex-1 truncate type-body-large font-bold text-text-primary">{title}</h1>
    </header>
  );
}

/** Skjerm som åpnes over bunnmenyen: topp, innhold som ruller og ev. knapp nederst. */
export function PushedScreen({ title, children, footer, backLabel }: { title: string; children: ReactNode; footer?: ReactNode; backLabel?: string }) {
  return (
    <div className="flex h-full flex-col bg-surface-primary">
      <BackHeader title={title} backLabel={backLabel} />
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      {footer && <div className="p-m">{footer}</div>}
    </div>
  );
}

/** Åpner et kart over et kort i et ark nederst. */
export function useMapSheet() {
  const nav = useNav();
  return (title: string, focus?: [number, number]) =>
    nav.openSheet(
      <div className="flex h-[70dvh] flex-col">
        <p className="m-0 px-m pb-s type-subtitle-large text-text-primary">{title}</p>
        <div className="min-h-0 flex-1">
          <OffersMap focus={focus} zoom={11} />
        </div>
      </div>,
    );
}
