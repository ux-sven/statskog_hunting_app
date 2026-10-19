import { useEffect, useState } from 'react';
import { ExpandableSection } from '../../components/SectionHeader';
import { Notice } from '../../components/Notice';
import { searchPlaces, type Place } from '../../api/places';
import type { Offer } from '../../domain/license';
import { useStore } from '../../data/AppStore';
import { OfferCard } from './OfferCard';

export interface SearchResultsProps {
  query: string;
  onPlace: (p: Place) => void;
  onOffer: (o: Offer) => void;
  onBuy: (o: Offer) => void;
}

/** Søkeresultat med stedstreff og tilbud (Figma «Search Results»). */
export function SearchResults({ query, onPlace, onOffer, onBuy }: SearchResultsProps) {
  const store = useStore();
  const [places, setPlaces] = useState<Place[]>([]);
  useEffect(() => {
    const ctrl = new AbortController();
    const t = setTimeout(() => searchPlaces(query, ctrl.signal).then(setPlaces).catch(() => setPlaces([])), 250);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [query]);
  const { game, fish } = store.searchAll(query);
  const none = !places.length && !game.length && !fish.length;
  return (
    <div className="absolute inset-0 z-20 overflow-y-auto bg-surface-primary pb-l" role="region" aria-label="Søkeresultat">
      {none && <Notice className="m-s" text={`Ingen treff på «${query}».`} />}
      {places.length > 0 && (
        <ExpandableSection title={`Stedstreff (${places.length} treff)`} className="border-b border-border-primary py-xs">
          <ul className="m-0 list-none p-0">
            {places.map((p) => (
              <li key={`${p.name}${p.point}`}>
                <button type="button" onClick={() => onPlace(p)} className="flex w-full flex-col border-b border-surface-tertiary px-s py-xs text-left hover:bg-surface-secondary cursor-pointer">
                  <span className="type-body-medium text-text-primary">
                    {p.name} ({p.type})
                  </span>
                  <span className="type-body-small text-text-secondary">{p.municipality || p.county}</span>
                </button>
              </li>
            ))}
          </ul>
        </ExpandableSection>
      )}
      {[
        ['Småviltjakt', game],
        ['Fiske', fish],
      ].map(([title, list]) =>
        (list as Offer[]).length ? (
          <ExpandableSection key={title as string} title={`${title} (${(list as Offer[]).length} treff)`} className="py-xs">
            <div className="flex flex-col gap-s px-s">
              {(list as Offer[]).map((o) => (
                <OfferCard key={o.id} offer={o} onBuy={() => onBuy(o)} onInfo={() => onBuy(o)} onShowInMap={() => onOffer(o)} />
              ))}
            </div>
          </ExpandableSection>
        ) : null,
      )}
    </div>
  );
}
