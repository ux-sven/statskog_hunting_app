import { useEffect, useRef, useState } from 'react';
import '@arcgis/core/assets/esri/themes/light/view.css';
import { MainMapNavigation, SecondaryMapNavigation } from '../components/MapControls';
import { asset } from '../components/cx';
import type { Offer } from '../domain/license';
import type MapViewT from '@arcgis/core/views/MapView';
import type { GraphicHit } from '@arcgis/core/views/types';

export interface OffersMapProps {
  /** Tilbud som vises som punkter. */
  offers?: Offer[];
  /** Senter (lengdegrad, breddegrad). Standard: hele Norge. */
  focus?: [number, number];
  zoom?: number;
  onSelectOffer?: (offer: Offer) => void;
}

/**
 * Kart med ArcGIS Maps SDK for JavaScript (@arcgis/core). Bakgrunnskartet er
 * Kartverkets topografiske WMTS (åpent, uten nøkkel). I appen skal jaktfelt
 * komme fra Jaktdatabasen (ArcGIS-tjeneste) som et FeatureLayer.
 *
 * ArcGIS lastes først når kartet vises, slik at resten av appen starter raskt.
 */
export function OffersMap({ offers = [], focus, zoom, onSelectOffer }: OffersMapProps) {
  const el = useRef<HTMLDivElement>(null);
  const viewRef = useRef<MapViewT | null>(null);
  const [failed, setFailed] = useState(false);
  const offerKey = offers.map((o) => o.id).join(',');

  useEffect(() => {
    let destroyed = false;
    let view: MapViewT | undefined;
    (async () => {
      try {
        const [{ default: Map }, { default: MapView }, { default: Basemap }, { default: WebTileLayer }, { default: GraphicsLayer }, { default: Graphic }] = await Promise.all([
          import('@arcgis/core/Map'),
          import('@arcgis/core/views/MapView'),
          import('@arcgis/core/Basemap'),
          import('@arcgis/core/layers/WebTileLayer'),
          import('@arcgis/core/layers/GraphicsLayer'),
          import('@arcgis/core/Graphic'),
        ]);
        if (destroyed || !el.current) return;
        const topo = new WebTileLayer({
          urlTemplate: 'https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{level}/{row}/{col}.png',
          copyright: '© Kartverket',
        });
        const points = new GraphicsLayer();
        const color = getComputedStyle(document.documentElement).getPropertyValue('--cta-primary-default').trim() || '#00594c';
        for (const o of offers) {
          if (!o.location) continue;
          points.add(
            new Graphic({
              geometry: { type: 'point', longitude: o.location[0], latitude: o.location[1] },
              symbol: { type: 'simple-marker', color, size: 14, outline: { color: 'white', width: 2 } },
              attributes: { id: o.id },
            }),
          );
        }
        view = new MapView({
          container: el.current,
          map: new Map({ basemap: new Basemap({ baseLayers: [topo] }), layers: [points] }),
          center: focus ?? [14, 64.5],
          zoom: zoom ?? 4,
          ui: { components: [] },
          constraints: { snapToZoom: false },
        });
        viewRef.current = view;
        view.on('click', async (e) => {
          const hit = await view!.hitTest(e, { include: [points] });
          const g = hit.results.find((r) => r.type === 'graphic') as GraphicHit | undefined;
          const o = g && offers.find((x) => x.id === g.graphic.attributes?.id);
          if (o) onSelectOffer?.(o);
        });
      } catch (err) {
        console.warn('Kartet kunne ikke lastes', err);
        if (!destroyed) setFailed(true);
      }
    })();
    return () => {
      destroyed = true;
      view?.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerKey, focus?.[0], focus?.[1]]);

  const zoomBy = (d: number) => {
    const v = viewRef.current;
    if (v) v.goTo({ zoom: v.zoom + d });
  };

  return (
    <div className="relative size-full overflow-hidden bg-surface-secondary">
      {failed ? (
        <img src={asset('images/kart_oversikt.jpg')} alt="Kart" className="size-full object-cover" />
      ) : (
        <div ref={el} className="size-full" aria-label="Kart" />
      )}
      <MainMapNavigation
        className="absolute top-0 right-0"
        onHome={() => viewRef.current?.goTo({ center: focus ?? [14, 64.5], zoom: zoom ?? 4 })}
        onZoomIn={() => zoomBy(1)}
        onZoomOut={() => zoomBy(-1)}
      />
      <span className="pointer-events-none absolute bottom-[2px] left-[4px] type-body-xsmall text-[10px] text-text-secondary">© Kartverket · Esri</span>
      <SecondaryMapNavigation className="absolute top-0 left-0" onMapLayers={() => {}} />
    </div>
  );
}
