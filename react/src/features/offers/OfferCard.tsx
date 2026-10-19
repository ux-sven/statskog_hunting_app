import { useState } from 'react';
import { Button } from '../../components/Button';
import { CardTypeBadge } from '../../components/CardTypeBadge';
import { MetaRow } from '../../components/MetaRow';
import { Icon } from '../../icons/Icon';
import { formatKroner } from '../../domain/format';
import type { Offer } from '../../domain/license';
import { CardActions, cardAction, speciesGroupIcon } from '../cards/CardParts';

/** Bilde øverst i tilbudskortet («Offer images»). Variantene i Figma er eksempelbilder. */
export function OfferImage({ src, alt = '', height = 150 }: { src?: string; alt?: string; height?: number }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className="grid w-full place-items-center bg-surface-secondary text-text-tertiary" style={{ height }}>
        <Icon name="noMap" size={32} />
      </div>
    );
  }
  return <img src={src} alt={alt} onError={() => setFailed(true)} className="block w-full object-cover" style={{ height }} />;
}

export interface OfferCardProps {
  offer: Offer;
  onBuy?: () => void;
  onInfo?: () => void;
  onShowInMap?: () => void;
}

/**
 * Tilbud om jakt- eller fiskekort («Offer Card» `Property 1=Buy`). De andre
 * variantene av «Offer Card» er et kjøpt kort og ligger i `LicenseCard`.
 */
export function OfferCard({ offer, onBuy, onInfo, onShowInMap }: OfferCardProps) {
  const badges = [
    ...offer.cardTypes.map((t) => <CardTypeBadge key={t} type={t} size={26} />),
    ...(offer.unavailableCardTypes ?? []).map((t) => <CardTypeBadge key={`x${t}`} type={t} size={26} inactive />),
  ];
  return (
    <article className="overflow-hidden rounded-large border border-border-secondary bg-surface-primary">
      <OfferImage src={offer.image} />
      <div className="flex flex-col gap-s p-s">
        <h3 className="m-0 type-subtitle-large font-medium text-text-primary">{offer.title}</h3>
        <MetaRow icon="location" text={[offer.county, offer.municipality]} dotClassName="bg-border-invert" />
        <MetaRow
          icon="priceTag"
          text={offer.priceFrom == null ? 'Se priser' : `Pris fra ${formatKroner(offer.priceFrom)}`}
          leading={badges.length ? <span className="flex flex-wrap gap-xs">{badges}</span> : undefined}
        />
        <MetaRow icon={speciesGroupIcon(offer.group)} text={offer.speciesText} />
        <CardActions
          primary={<Button label="Kjøp" expand onClick={onBuy} />}
          iconActions={[...(onInfo ? [cardAction.info(onInfo)] : []), ...(onShowInMap ? [cardAction.map(onShowInMap)] : [])]}
        />
      </div>
    </article>
  );
}
