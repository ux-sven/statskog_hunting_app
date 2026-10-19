import { useRef, useState, type PointerEvent } from 'react';
import { Button } from '../../components/Button';
import { Chip } from '../../components/Chip';
import { Notice } from '../../components/Notice';
import { SearchBar } from '../../components/SearchBar';
import { SegmentedControl } from '../../components/SegmentedControl';
import { cx } from '../../components/cx';
import { Icon } from '../../icons/Icon';
import { fishSpecies, gameSpecies, type SpeciesGroup, type SpeciesId } from '../../domain/species';
import type { Offer } from '../../domain/license';
import { useStore } from '../../data/DemoStore';
import { useNav } from '../../app/AppContext';
import { ScreenTitle, useMapSheet } from '../../app/widgets';
import { OffersMap } from '../../map/OffersMap';
import { FilterListScreen } from '../filter/FilterListScreen';
import { OfferCard } from './OfferCard';

/** Arket kan stå på tre høyder (andel av kartflaten). */
const snaps = [0.18, 0.62, 1];

/**
 * Tilbud med kart øverst og liste i et ark som kan dras opp
 * (eksempelvisningene «Hunting Map View» / «Hunting Offers View»).
 */
export function OffersScreen() {
  const store = useStore();
  const nav = useNav();
  const showMap = useMapSheet();
  const [group, setGroup] = useState<SpeciesGroup>('game');
  const [query, setQuery] = useState('');
  const [species, setSpecies] = useState<Set<SpeciesId>>(new Set());
  const [snap, setSnap] = useState(1);
  const offers = store.offers(group, { query, species });
  const listRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ y: number; h: number } | null>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const [dragH, setDragH] = useState<number | null>(null);

  const openFilter = () => {
    let selection = new Set(species);
    const list = group === 'game' ? gameSpecies() : fishSpecies();
    nav.push(
      <FilterListScreen
        title="Art"
        items={list.map((s) => s.id)}
        keyOf={(s) => s}
        labelOf={(s) => list.find((x) => x.id === s)!.label}
        speciesOf={(s) => s}
        initialSelection={species}
        onChange={(s) => (selection = s)}
        onBack={() => {
          setSpecies(new Set(selection));
          nav.pop();
        }}
      />,
    );
  };

  const buy = (o: Offer) =>
    nav.openSheet(
      <div className="flex flex-col gap-xs px-m pb-l">
        <h2 className="m-0 type-headline-h2 text-text-primary">Kjøp hos Inatur</h2>
        <p className="m-0 type-body-medium text-text-primary">Kjøpet av «{o.title}» fullføres på inatur.no. Kortet dukker opp under Jaktkort når kjøpet er gjennomført.</p>
        <Button label="Gå til inatur.no" trailingIcon={<Icon name="externalLink" />} expand className="mt-xs" onClick={nav.closeSheet} />
      </div>,
    );

  // Dra i håndtaket for å endre høyden på arket.
  const onDown = (e: PointerEvent) => {
    const area = areaRef.current!.clientHeight;
    drag.current = { y: e.clientY, h: snaps[snap] * area };
    (e.target as Element).setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent) => {
    if (!drag.current) return;
    setDragH(Math.max(60, drag.current.h - (e.clientY - drag.current.y)));
  };
  const onUp = () => {
    if (!drag.current) return;
    const area = areaRef.current!.clientHeight;
    const frac = (dragH ?? drag.current.h) / area;
    let best = 0;
    snaps.forEach((s, i) => Math.abs(s - frac) < Math.abs(snaps[best] - frac) && (best = i));
    if (dragH === null) best = (snap + 1) % snaps.length; // trykk = neste høyde
    setSnap(best);
    setDragH(null);
    drag.current = null;
  };

  const title = group === 'game' ? 'Tilbud småviltjakt' : 'Tilbud fiske';
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col gap-s bg-surface-primary px-m py-s">
        <SearchBar rounded buttonLabel={null} onChange={setQuery} />
        <div className="flex items-center gap-xs">
          <Button label={species.size ? `Filter (${species.size})` : 'Filter'} variant="tertiary" leadingIcon={<Icon name="filter" />} onClick={openFilter} />
          {species.size > 0 && <Chip label="Nullstill" size="medium" onSelectedChange={() => setSpecies(new Set())} onDelete={() => setSpecies(new Set())} />}
        </div>
      </div>
      <div ref={areaRef} className="relative min-h-0 flex-1">
        <div className="absolute inset-0">
          <OffersMap offers={store.allOffers().filter((o) => o.group === group)} onSelectOffer={(o) => buy(o)} />
        </div>
        <section
          aria-label={title}
          className={cx('absolute inset-x-0 bottom-0 flex flex-col rounded-t-xlarge bg-surface-secondary shadow-[0_0_12px_var(--shade-secondary)]', dragH === null && 'transition-[height] duration-200')}
          style={{ height: dragH ?? `${snaps[snap] * 100}%` }}
        >
          <button
            type="button"
            aria-label="Endre høyde på listen"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            className="flex w-full touch-none justify-center pt-xs pb-[4px] cursor-grab"
          >
            <span className="h-[4px] w-[48px] rounded-full bg-border-secondary" />
          </button>
          <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto pb-l">
            <ScreenTitle title={title} />
            <div className="px-s">
              <SegmentedControl
                label="Aktivitet"
                segments={['Småviltjakt', 'Fiske']}
                selectedIndex={group === 'game' ? 0 : 1}
                onChange={(i) => {
                  setGroup(i === 0 ? 'game' : 'fish');
                  setSpecies(new Set());
                }}
              />
            </div>
            <div className="flex flex-col gap-s p-s">
              {offers.length === 0 && <Notice text="Ingen tilbud passer søket. Prøv et annet søk eller nullstill filteret." />}
              {offers.map((o) => (
                <OfferCard key={o.id} offer={o} onBuy={() => buy(o)} onInfo={() => buy(o)} onShowInMap={() => showMap(o.title, o.location)} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
