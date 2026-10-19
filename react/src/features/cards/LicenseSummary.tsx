import { Button } from '../../components/Button';
import { KeyValueRow, MetaRow } from '../../components/MetaRow';
import { cx } from '../../components/cx';
import { formatDate, formatKroner } from '../../domain/format';
import type { HuntingLicense } from '../../domain/license';

/** «Hunting Card» `Property 1`: `Mini`, `Activate` (med pris) og `Full`. */
export type LicenseSummaryVariant = 'mini' | 'withPrice' | 'full';

export interface LicenseSummaryProps {
  license: HuntingLicense;
  variant?: LicenseSummaryVariant;
  onActivate?: () => void;
  onDocumentation?: () => void;
  onShowInMap?: () => void;
}

/** Oppsummering av et jaktkort med navnet i en grå boks («Hunting Card»). */
export function LicenseSummary({ license: l, variant = 'mini', onActivate, onDocumentation, onShowInMap }: LicenseSummaryProps) {
  const full = variant === 'full';
  const small = 'type-body-small text-text-primary';
  const nameBox = (
    <div className={cx('rounded-medium border border-border-secondary bg-surface-secondary px-m py-xs text-text-primary', full ? 'type-subtitle-large' : 'type-body-large')}>{l.title}</div>
  );
  const rows = (
    <>
      <MetaRow icon="schedule" text={l.validDates.map(formatDate)} textClassName={small} />
      {variant !== 'mini' && l.price != null && <MetaRow icon="priceTag" text={`kr ${formatKroner(l.price)}`} textClassName={small} />}
      <MetaRow icon="accuracy" text={l.speciesText} textClassName={small} />
    </>
  );
  if (!full) {
    return (
      <div className="flex flex-col border-b border-border-secondary bg-surface-primary p-m">
        <p className="m-0 mb-[4px] type-body-large whitespace-pre text-text-primary">Kortnr   {l.cardNumber}</p>
        {nameBox}
        <div className="mt-s flex flex-col gap-s">{rows}</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col rounded-large border-2 border-border-secondary bg-surface-primary p-[14px]">
      {nameBox}
      <div className="mt-xs flex flex-col gap-xs border-b border-text-primary pt-xs pb-xs">{rows}</div>
      <p className="m-0 mt-s flex gap-xs type-body-large">
        <span className="text-text-secondary">{l.hunterNumber}</span>
        <span className="text-text-primary">{l.holderName}</span>
      </p>
      <dl className="m-0">
        {l.phone && <KeyValueRow label="Telefon" value={l.phone} />}
        {l.email && <KeyValueRow label="Epost" value={l.email} />}
      </dl>
      <div className="mt-xs flex gap-s">
        <Button label="Dokumentasjon" size="small" variant="secondary" expand onClick={onDocumentation} className="flex-1" />
        <Button label="Vis i kart" size="small" variant="secondary" expand onClick={onShowInMap} className="flex-1" />
      </div>
      <Button label="Aktiver jaktkort" expand onClick={onActivate} className="mt-s" />
    </div>
  );
}
