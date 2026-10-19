import { Button } from '../../components/Button';
import { MetaRow } from '../../components/MetaRow';
import { formatDate } from '../../domain/format';
import type { Activation } from '../../domain/license';
import { CardActions, CardFrame, cardAction } from './CardParts';

export interface ActivationCardProps {
  activation: Activation;
  /** Figma `Default`: «Fjern aktivering» (oransje). */
  onRemove?: () => void;
  /** Figma `Variant2`: «Fangstrapport». Vinner hvis begge er satt. */
  onReportCapture?: () => void;
  onReceipt?: () => void;
  onShowInMap?: () => void;
}

/** En aktivering av jaktkortet («Activation Card»). */
export function ActivationCard({ activation: a, onRemove, onReportCapture, onReceipt, onShowInMap }: ActivationCardProps) {
  const st = 'type-body-large text-text-secondary';
  const primary = onReportCapture ? (
    <Button label="Fangstrapport" expand onClick={onReportCapture} />
  ) : onRemove ? (
    <Button label="Fjern aktivering" variant="accent" expand onClick={onRemove} />
  ) : undefined;
  return (
    <CardFrame className="flex flex-col gap-s !border-surface-tertiary">
      <MetaRow icon="contact" text={`${a.licenseTitle} (${a.cardNumber})`} textClassName={st} />
      <MetaRow icon="location" text={[a.county, a.municipality]} textClassName={st} dotClassName="bg-border-invert" emphasizeLast />
      <MetaRow icon="schedule" text={formatDate(a.date)} textClassName="type-body-large font-bold text-text-primary" />
      <CardActions
        primary={primary}
        iconActions={[...(onReceipt ? [cardAction.receipt(onReceipt)] : []), ...(onShowInMap ? [cardAction.map(onShowInMap)] : [])]}
      />
    </CardFrame>
  );
}
