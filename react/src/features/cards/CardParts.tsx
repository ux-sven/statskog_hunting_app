import type { ReactNode } from 'react';
import { cx } from '../../components/cx';
import { Button } from '../../components/Button';
import { CardTypeBadge } from '../../components/CardTypeBadge';
import { Icon } from '../../icons/Icon';
import type { IconName } from '../../icons/iconNames';
import { cardTypes, type CardType } from '../../domain/cardType';
import type { SpeciesGroup } from '../../domain/species';

/** Ramme med avrundede hjørner rundt et kort. */
export function CardFrame({ children, className }: { children: ReactNode; className?: string }) {
  return <article className={cx('overflow-hidden rounded-large border border-border-secondary bg-surface-primary p-s', className)}>{children}</article>;
}

export interface CardIconAction {
  icon: IconName;
  label: string;
  onClick?: () => void;
}

export const cardAction = {
  /** Info-knapp («Information»). */
  info: (onClick?: () => void): CardIconAction => ({ icon: 'information', label: 'Mer informasjon', onClick }),
  /** Vis i kart («Map/Location Pin»). */
  map: (onClick?: () => void): CardIconAction => ({ icon: 'locationPin', label: 'Vis i kart', onClick }),
  /** Kvittering («Receipt»). */
  receipt: (onClick?: () => void): CardIconAction => ({ icon: 'receipt', label: 'Kvittering', onClick }),
};

/** Handlingsrad: hovedknapp som fyller bredden og kvadratiske ikonknapper (54). */
export function CardActions({ primary, iconActions = [] }: { primary?: ReactNode; iconActions?: CardIconAction[] }) {
  return (
    <div className="flex items-center gap-s">
      <div className="flex min-w-0 flex-1">{primary}</div>
      {iconActions.map((a) => (
        <Button key={a.label} size="large" square={54} variant="secondary" aria-label={a.label} title={a.label} leadingIcon={<Icon name={a.icon} />} onClick={a.onClick} />
      ))}
    </div>
  );
}

/** «Kortnr 1721894 … Dagskort [symbol]» */
export function CardNumberHeader({ cardNumber, cardType }: { cardNumber: string; cardType?: CardType }) {
  return (
    <div className="flex items-center gap-[4px] type-body-large text-text-secondary">
      <span className="flex-1">Kortnr {cardNumber}</span>
      {cardType && (
        <>
          <span>{cardTypes[cardType].label}</span>
          <CardTypeBadge type={cardType} size={26} />
        </>
      )}
    </div>
  );
}

/** Ikon for artsgruppen: fiskekrok for fiske, sikte for jakt. */
export const speciesGroupIcon = (g: SpeciesGroup): IconName => (g === 'fish' ? 'fishingHook' : 'accuracy');
