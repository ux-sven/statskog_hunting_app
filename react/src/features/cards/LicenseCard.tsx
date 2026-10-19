import { Button } from '../../components/Button';
import { ListTile } from '../../components/ListTile';
import { KeyValueRow, MetaRow } from '../../components/MetaRow';
import { Icon } from '../../icons/Icon';
import { formatDate } from '../../domain/format';
import type { HuntingLicense } from '../../domain/license';
import { CardActions, CardFrame, CardNumberHeader, cardAction, speciesGroupIcon } from './CardParts';

function Summary({ license: l, showHolder, showActivated, period = false }: { license: HuntingLicense; showHolder: boolean; showActivated: boolean; period?: boolean }) {
  return (
    <div className="flex flex-col">
      <CardNumberHeader cardNumber={l.cardNumber} cardType={l.cardType} />
      <h3 className="m-0 mt-[4px] mb-s type-subtitle-large font-medium text-text-primary">{l.title}</h3>
      <div className="flex flex-col gap-s">
        {period ? (
          <MetaRow
            icon="schedule"
            text={l.validDates.map(formatDate).join(' til ')}
            iconClassName={l.expired ? 'text-text-secondary' : 'text-attention-success'}
            textClassName={l.expired ? 'type-body-large text-text-secondary' : 'type-body-large font-bold text-attention-success'}
          />
        ) : showActivated && l.activatedDate ? (
          <MetaRow icon="schedule" text={formatDate(l.activatedDate)} iconClassName="text-attention-success" textClassName="type-body-large font-bold text-attention-success" />
        ) : (
          <MetaRow icon="schedule" text={l.validDates.map(formatDate)} textClassName="type-body-small text-text-primary" />
        )}
        <MetaRow icon={speciesGroupIcon(l.group)} text={l.speciesText} />
        {showHolder && <MetaRow icon="account" text={`${l.hunterNumber} ${l.holderName}`} />}
      </div>
    </div>
  );
}

export interface LicenseCardProps {
  license: HuntingLicense;
  /** Uten `onActivate` (f.eks. fiskekort som ikke aktiveres) vises ingen hovedknapp. */
  onActivate?: () => void;
  onInfo?: () => void;
  onShowInMap?: () => void;
  /** «Rapporter fangst» vises når kortet er aktivert (jakt) eller alltid (fiske). */
  onReportCapture?: () => void;
  /**
   * `hunting`: «Aktiver» og ikonknapper (Figma «Offer Card» `Not Activated`/`Activated`).
   * `fishing`: «Mer info» og «Vis i kart» med tekst, og «Rapporter fangst» (Figma «Mine fiskekort»).
   */
  variant?: 'hunting' | 'fishing';
}

/**
 * Kjøpt jakt- eller fiskekort i en liste («Offer Card» `Not Activated` og
 * `Activated`). Aktivert eller ikke styres av `license.activatedDate`.
 */
export function LicenseCard({ license, onActivate, onInfo, onShowInMap, onReportCapture, variant = 'hunting' }: LicenseCardProps) {
  if (variant === 'fishing') {
    return (
      <CardFrame className="flex flex-col gap-s">
        <Summary license={license} showHolder showActivated={false} period />
        <div className="flex gap-s">
          {onInfo && <Button label="Mer info" variant="secondary" leadingIcon={<Icon name="information" />} onClick={onInfo} className="flex-1" />}
          {onShowInMap && <Button label="Vis i kart" variant="secondary" leadingIcon={<Icon name="locationPin" />} onClick={onShowInMap} className="flex-1" />}
        </div>
        {onReportCapture && <Button label={license.reportDelivered ? 'Fangstrapport levert' : 'Rapporter fangst'} expand onClick={onReportCapture} disabled={license.reportDelivered} />}
      </CardFrame>
    );
  }
  return (
    <CardFrame className="flex flex-col gap-s">
      <Summary license={license} showHolder showActivated />
      <CardActions
        primary={onActivate && <Button label="Aktiver" variant="accent" expand onClick={onActivate} />}
        iconActions={[...(onInfo ? [cardAction.info(onInfo)] : []), ...(onShowInMap ? [cardAction.map(onShowInMap)] : [])]}
      />
      {license.activatedDate && onReportCapture && <Button label="Rapporter fangst" expand onClick={onReportCapture} />}
    </CardFrame>
  );
}

export interface LicenseDetailsProps {
  license: HuntingLicense;
  onActivate?: () => void;
  onShowInMap?: () => void;
  onRules?: () => void;
  onReceipt?: () => void;
  onOfferInfo?: () => void;
  onDownloadOfflineMap?: () => void;
}

/** Detaljvisning av et kort med «Utstedt til», lenker og offline kart («Offer Card» `Info View`). */
export function LicenseDetails({ license: l, onActivate, onShowInMap, onRules, onReceipt, onOfferInfo, onDownloadOfflineMap }: LicenseDetailsProps) {
  return (
    <div className="flex flex-col bg-surface-primary">
      <div className="px-m py-s">
        <Summary license={l} showHolder={false} showActivated={false} />
      </div>
      <dl className="m-0 border-y border-border-primary bg-surface-secondary px-m py-s">
        <p className="m-0 py-[4px] type-subtitle-small font-semibold text-text-secondary">Utstedt til</p>
        <KeyValueRow label="Jegernummer" value={l.hunterNumber} />
        <KeyValueRow label="Navn" value={l.holderName} />
        {l.phone && <KeyValueRow label="Telefon" value={l.phone} />}
        {l.email && <KeyValueRow label="Epost" value={l.email} />}
      </dl>
      {onRules && <ListTile title="Kvoter og regler" trailingIcon="link" onClick={onRules} />}
      {onReceipt && <ListTile title="Kvittering for kjøp" trailingIcon="receipt" onClick={onReceipt} />}
      {onOfferInfo && <ListTile title="Tilbudsinfo (på Inatur)" trailingIcon="information" onClick={onOfferInfo} />}
      <div className="flex flex-col gap-s px-m py-s">
        <CardActions primary={<Button label="Aktiver" variant="accent" expand onClick={onActivate} disabled={!onActivate} />} iconActions={onShowInMap ? [cardAction.map(onShowInMap)] : []} />
        {onDownloadOfflineMap && <Button label="Last ned offline kart" variant="secondary" leadingIcon={<Icon name="downloadFromCloud" />} expand onClick={onDownloadOfflineMap} />}
      </div>
    </div>
  );
}
