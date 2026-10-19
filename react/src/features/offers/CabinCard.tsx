import { Button } from '../../components/Button';
import { MetaRow } from '../../components/MetaRow';
import { Icon } from '../../icons/Icon';
import { formatKroner } from '../../domain/format';
import type { Cabin } from '../../domain/license';
import { OfferImage } from './OfferCard';

/** Hytte valgt i kartet (Figma «Hytte - klikk i kart»). */
export function CabinCard({ cabin, onBook }: { cabin: Cabin; onBook?: () => void }) {
  return (
    <article className="overflow-hidden rounded-large border border-border-secondary bg-surface-primary">
      <OfferImage src={cabin.image} />
      <div className="flex flex-col gap-s p-s">
        <h3 className="m-0 type-subtitle-large font-medium text-text-primary">{cabin.title}</h3>
        <MetaRow icon="sleepingInBed" text={`${cabin.beds} sengeplasser`} />
        <MetaRow icon="key" text="Utleiehytte" />
        <MetaRow icon="dayOff" text="Åpen hele året" />
        <MetaRow icon="priceTag" text={`Fra ${formatKroner(cabin.priceFrom)} per natt`} />
        <Button label="Bestill overnatting" expand trailingIcon={<Icon name="externalLink" />} onClick={onBook} />
      </div>
    </article>
  );
}
