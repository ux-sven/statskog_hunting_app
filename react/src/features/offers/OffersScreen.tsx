import { useEffect, useMemo, useState } from 'react';
import { Sheet, SheetMapToggle, type SheetSnap } from '../../components/Sheet';
import { SheetHeader } from '../../components/SheetHeader';
import { SearchFilterBar, type ActiveFilter } from '../../components/SearchFilterBar';
import { SegmentedControl } from '../../components/SegmentedControl';
import { Select } from '../../components/Select';
import { Notice } from '../../components/Notice';
import { Button } from '../../components/Button';
import { useNav } from '../../app/AppContext';
import { Skeleton, SyncStatus } from '../../app/widgets';
import { useStore } from '../../data/AppStore';
import { activeFilterCount, emptyFilter, huntTypes, sortLabels, type OfferFilter, type SortOrder } from '../../domain/filter';
import type { Cabin, Offer } from '../../domain/license';
import { speciesById, type SpeciesId } from '../../domain/species';
import { MapView } from '../../map/MapView';
import type { SubareaFeature } from '../../api/jaktdatabasen/types';
import { OfflineDownloadScreen } from '../settings/OfflineMapsScreens';
import { OfferFilterSheet } from '../filter/OfferFilterSheet';
import { CabinCard } from './CabinCard';
import { InaturSheet } from './InaturSheet';
import { OfferCard } from './OfferCard';
import { SearchResults } from './SearchResults';

const filterChips = (f: OfferFilter): ActiveFilter[] => [
  ...(f.group === 'fish'
    ? f.fishSpecies.map((s) => ({ id: `s:${s}`, label: speciesById(s as SpeciesId).label }))
    : f.huntTypes.map((h) => ({ id: `h:${h}`, label: huntTypes.find((x) => x.id === h)!.label }))),
  ...f.counties.map((c) => ({ id: `c:${c}`, label: c })),
  ...f.municipalities.map((m) => ({ id: `m:${m}`, label: m })),
  ...(f.cardKinds.length === 1 ? [{ id: 'k', label: f.cardKinds[0] === 'dagskort' ? 'Dagskort' : 'Periodekort' }] : []),
  ...(f.from || f.to ? [{ id: 'd', label: `${f.from ?? '…'} – ${f.to ?? '…'}` }] : []),
  ...(f.includeExpired ? [{ id: 'x', label: 'Med utløpte' }] : []),
];

const removeChip = (f: OfferFilter, id: string): OfferFilter => {
  const [k, v] = id.split(':');
  if (k === 's') return { ...f, fishSpecies: f.fishSpecies.filter((x) => x !== v) };
  if (k === 'h') return { ...f, huntTypes: f.huntTypes.filter((x) => x !== v) };
  if (k === 'c') return { ...f, counties: f.counties.filter((x) => x !== v) };
  if (k === 'm') return { ...f, municipalities: f.municipalities.filter((x) => x !== v) };
  if (k === 'k') return { ...f, cardKinds: ['dagskort', 'periodekort'] };
  if (k === 'd') return { ...f, from: undefined, to: undefined };
  return { ...f, includeExpired: false };
};

/**
 * Tilbud: søk og filter øverst, kart, og en skuff med tilbudene som kan dras
 * opp til hele skjermen (Figma «Jaktkart», «Jaktkart fullskjerm», «Fiskekart»,
 * «Jaktkart - klikk i kart», «Hytte - klikk i kart», «Search Results»).
 */
export function OffersScreen() {
  const store = useStore();
  const nav = useNav();
  const f = store.filter;
  const [query, setQuery] = useState(store.search);
  const [searching, setSearching] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [snap, setSnap] = useState<SheetSnap>('half');
  const [selected, setSelected] = useState<Offer | Cabin | null>(null);
  const [buy, setBuy] = useState<Offer | Cabin | null>(null);
  const [sheetH, setSheetH] = useState(0);
  const [focus, setFocus] = useState<{ point?: [number, number]; zoom?: number; subareas?: SubareaFeature[] }>();

  // Søk mot Inatur etter en kort pause i skrivingen.
  useEffect(() => {
    const t = setTimeout(() => query !== store.search && store.setSearch(query), 300);
    return () => clearTimeout(t);
  }, [query, store]);

  const list = store.offerResult;
  const mapOffers = list;
  const subareas = useMemo(() => {
    const ids = new Set(mapOffers.map((o) => o.id));
    return store.subareasFor().filter((s) => ids.has(s.properties.salesPageId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapOffers.map((o) => o.id).join(), store.cache.subareas.length]);

  // Zoom til treffene når filteret eller søket endres.
  const resultKey = list.map((o) => o.id).join();
  useEffect(() => {
    if (!activeFilterCount(f) && !store.search) return;
    const pts = list.flatMap((o) => (o.location ? [o.location] : []));
    if (pts.length === 1) setFocus({ point: pts[0], zoom: 8 });
    else if (pts.length > 1) setFocus({ subareas: subareas });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultKey]);

  const select = (item: Offer | Cabin) => {
    setSelected(item);
    setSearching(false);
    if (item.location) setFocus({ point: item.location, zoom: 'group' in item ? 9 : 11 });
  };
  const setGroup = (i: number) => store.setFilter({ ...emptyFilter(i ? 'fish' : 'game'), sort: f.sort });
  const title = f.group === 'game' ? 'Tilbud' : 'Tilbud';

  return (
    <div className="flex h-full flex-col">
      <SearchFilterBar
        query={query}
        onQueryChange={(q) => {
          setQuery(q);
          setSearching(q.length > 0);
        }}
        onSubmit={() => setSearching(query.length > 0)}
        onFocus={() => query && setSearching(true)}
        onFilter={() => setFilterOpen(true)}
        filterCount={activeFilterCount(f)}
        sort={
          <Select<SortOrder>
            label="Sorter etter"
            showLabel={f.sort === 'relevans'}
            value={f.sort}
            onChange={(sort) => store.setFilter({ ...f, sort })}
            options={(Object.keys(sortLabels) as SortOrder[]).map((v) => ({ value: v, label: sortLabels[v] }))}
            className="shrink-0"
          />
        }
        activeFilters={filterChips(f)}
        onRemoveFilter={(id) => store.setFilter(removeChip(f, id))}
      />
      <div className="relative min-h-0 flex-1">
        <MapView
          offers={mapOffers}
          cabins={store.cabins}
          subareas={subareas}
          selectedOfferId={selected && 'group' in selected ? selected.id : undefined}
          onSelectOffer={select}
          onSelectCabin={select}
          focus={focus}
          bottomInset={snap === 'full' ? 0 : sheetH}
          onDownload={() => nav.push(<OfflineDownloadScreen />)}
        />
        {searching && query && (
          <SearchResults
            query={query}
            onPlace={(p) => {
              setSearching(false);
              setSnap('peek');
              setFocus({ point: p.point, zoom: 11 });
            }}
            onOffer={select}
            onBuy={setBuy}
          />
        )}
        {selected ? (
          <Sheet
            key={selected.id}
            label={selected.title}
            header={<SheetHeader variant="drawerSmall" title={selected.title} onClose={() => setSelected(null)} />}
            snapPoints={['half', 'full']}
            defaultSnap="half"
            onClose={() => setSelected(null)}
            onHeightChange={setSheetH}
          >
            <div className="px-s pb-l">
              {'group' in selected ? (
                <OfferCard offer={selected} onBuy={() => setBuy(selected)} onInfo={() => setBuy(selected)} onShowInMap={() => selected.location && setFocus({ point: selected.location, zoom: 10 })} />
              ) : (
                <CabinCard cabin={selected} onBook={() => setBuy(selected)} />
              )}
            </div>
          </Sheet>
        ) : (
          <Sheet header={<SheetHeader variant="drawer" title={title} action={<SheetMapToggle />} />} snap={snap} onSnapChange={setSnap} onHeightChange={setSheetH}>
            <div className="sticky top-0 z-[1] bg-surface-primary px-s pb-s">
              <SegmentedControl label="Aktivitet" segments={['Småviltjakt', 'Fiske']} selectedIndex={f.group === 'fish' ? 1 : 0} onChange={setGroup} />
            </div>
            <SyncStatus />
            <div className="flex flex-col gap-s p-s pb-l">
              {store.offersState === 'loading' && !list.length && <Skeleton />}
              {store.offersState === 'error' && (
                <Notice text="Klarte ikke å hente tilbud fra Inatur." icon="information" />
              )}
              {store.offersState !== 'loading' && !list.length && (
                <>
                  <Notice text="Ingen tilbud passer søket. Prøv et annet søk eller fjern filtre." />
                  {activeFilterCount(f) > 0 && <Button label="Fjern alle filtre" variant="secondary" onClick={() => store.setFilter({ ...emptyFilter(f.group), sort: f.sort })} />}
                </>
              )}
              {list.map((o) => (
                <OfferCard key={o.id} offer={o} onBuy={() => setBuy(o)} onInfo={() => setBuy(o)} onShowInMap={() => select(o)} />
              ))}
            </div>
          </Sheet>
        )}
      </div>
      <OfferFilterSheet
        open={filterOpen}
        value={f}
        onClose={() => setFilterOpen(false)}
        countFor={(d) => store.filterLocal(d, store.search).length}
        onApply={(d) => {
          store.setFilter(d);
          setFilterOpen(false);
          setSnap('half');
        }}
      />
      <InaturSheet item={buy} onClose={() => setBuy(null)} />
    </div>
  );
}
