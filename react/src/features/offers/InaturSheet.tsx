import { ModalSheet } from '../../components/ModalSheet';
import { Button } from '../../components/Button';
import { MetaRow } from '../../components/MetaRow';
import { CardTypeBadge } from '../../components/CardTypeBadge';
import { Icon } from '../../icons/Icon';
import { asset } from '../../components/cx';
import { formatKroner } from '../../domain/format';
import type { Cabin, Offer } from '../../domain/license';
import { OfferImage } from './OfferCard';

/**
 * Kjøp og bestilling skjer på inatur.no (Figma «Inatur Buy Hunting Card»).
 * Appen viser kort info og åpner Inatur. Etter kjøpet dukker kortet opp under
 * Jaktkort/Fiskekort når appen henter `/v1/permits` på nytt.
 */
export function InaturSheet({ item, onClose }: { item: Offer | Cabin | null; onClose: () => void }) {
  const offer = item && 'group' in item ? item : null;
  return (
    <ModalSheet open={!!item} onClose={onClose} title={offer ? 'Kjøp kort hos Inatur' : 'Bestill hos Inatur'} variant="page">
      {item && (
        <div className="flex flex-col">
          <div className="flex items-center gap-s bg-surface-invert px-m py-s">
            <img src={asset('images/inatur_logo.svg')} alt="Inatur" className="h-[28px]" />
            <span className="type-body-xsmall text-text-invert">Finn, kjøp og bestill jakt, fiske og hytter i hele Norge</span>
          </div>
          <OfferImage src={item.image} height={180} />
          <div className="flex flex-col gap-s p-m">
            <h3 className="m-0 type-headline-h2 font-normal text-text-primary">{item.title}</h3>
            {offer ? (
              <>
                <MetaRow icon="location" text={offer.counties.length > 3 ? [offer.county] : [offer.counties.join(', '), offer.municipalities.join(', ')]} dotClassName="bg-border-invert" />
                <MetaRow
                  icon="priceTag"
                  text={offer.priceFrom ? `Pris fra ${formatKroner(offer.priceFrom)}` : 'Se priser'}
                  leading={
                    <span className="flex gap-xs">
                      {offer.cardTypes.map((t) => (
                        <CardTypeBadge key={t} type={t} size={26} />
                      ))}
                      {offer.unavailableCardTypes?.map((t) => (
                        <CardTypeBadge key={t} type={t} size={26} inactive />
                      ))}
                    </span>
                  }
                />
                <MetaRow icon={offer.group === 'fish' ? 'fishingHook' : 'accuracy'} text={offer.speciesText} />
              </>
            ) : (
              <MetaRow icon="sleepingInBed" text={`${(item as Cabin).beds} sengeplasser`} />
            )}
            <p className="m-0 type-body-medium text-text-primary">
              {offer ? 'Kjøpet fullføres på inatur.no. Kortet dukker opp under ' + (offer.group === 'fish' ? 'Fiskekort' : 'Jaktkort') + ' i appen når kjøpet er gjennomført.' : 'Bestillingen fullføres på inatur.no.'}
            </p>
            <Button label="Gå til inatur.no" expand trailingIcon={<Icon name="externalLink" />} onClick={() => window.open(item.inaturUrl, '_blank', 'noopener')} />
          </div>
        </div>
      )}
    </ModalSheet>
  );
}
