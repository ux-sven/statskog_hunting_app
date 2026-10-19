import { useEffect, useRef, useState, type ReactNode } from 'react';
import '@arcgis/core/assets/esri/themes/light/view.css';
import type MapViewT from '@arcgis/core/views/MapView';
import type GraphicsLayerT from '@arcgis/core/layers/GraphicsLayer';
import type GraphicT from '@arcgis/core/Graphic';
import type { GraphicHit } from '@arcgis/core/views/types';
import { MapButton } from '../components/MapControls';
import { asset, cx } from '../components/cx';
import { Icon } from '../icons/Icon';
import type { Cabin, Offer } from '../domain/license';
import type { SubareaFeature } from '../api/jaktdatabasen/types';

type Mods = {
  Map: typeof import('@arcgis/core/Map').default;
  MapView: typeof import('@arcgis/core/views/MapView').default;
  Basemap: typeof import('@arcgis/core/Basemap').default;
  WebTileLayer: typeof import('@arcgis/core/layers/WebTileLayer').default;
  GraphicsLayer: typeof import('@arcgis/core/layers/GraphicsLayer').default;
  Graphic: typeof import('@arcgis/core/Graphic').default;
  Extent: typeof import('@arcgis/core/geometry/Extent').default;
};
let modsPromise: Promise<Mods> | null = null;
/** ArcGIS lastes først når et kart vises, og bare én gang. */
const loadMods = () =>
  (modsPromise ??= Promise.all([
    import('@arcgis/core/Map'),
    import('@arcgis/core/views/MapView'),
    import('@arcgis/core/Basemap'),
    import('@arcgis/core/layers/WebTileLayer'),
    import('@arcgis/core/layers/GraphicsLayer'),
    import('@arcgis/core/Graphic'),
    import('@arcgis/core/geometry/Extent'),
  ]).then(([a, b, c, d, e, f, g]) => ({ Map: a.default, MapView: b.default, Basemap: c.default, WebTileLayer: d.default, GraphicsLayer: e.default, Graphic: f.default, Extent: g.default })));

export type Basemap = 'topo' | 'graa';
const tiles: Record<Basemap, string> = {
  topo: 'https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{level}/{row}/{col}.png',
  graa: 'https://cache.kartverket.no/v1/wmts/1.0.0/topograatone/default/webmercator/{level}/{row}/{col}.png',
};

const cssVar = (n: string, fallback: string) => (typeof document !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue(n).trim() || fallback : fallback);
const hexA = (hex: string, a: number) => {
  const h = hex.replace('#', '').slice(0, 6);
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), a];
};
/** Jaktgrenser i kartet (magenta som i designet). */
const BOUNDARY = '#a3127a';

export interface MapViewProps {
  /** Tilbud som vises med grenser (delområdene) og markør. */
  offers?: Offer[];
  cabins?: Cabin[];
  /** Delområder fra Jaktdatabasen. */
  subareas?: SubareaFeature[];
  /** Delområder som kan velges (aktivering). Andre vises bare som grenser. */
  selectableSubareas?: boolean;
  selectedSubareaId?: string;
  /** Antall aktiveringer per delområde (0–10) for «jakttrykk». */
  pressure?: Map<string, number>;
  selectedOfferId?: string;
  onSelectOffer?: (o: Offer) => void;
  onSelectCabin?: (c: Cabin) => void;
  onSelectSubarea?: (s: SubareaFeature) => void;
  /** Zoom til disse delområdene (eller punktet). */
  focus?: { subareas?: SubareaFeature[]; point?: [number, number]; zoom?: number };
  /** Plass i bunnen som dekkes av skuffen (px). Knapper og senter flyttes opp. */
  bottomInset?: number;
  /** Plass øverst (søkefelt over kartet). */
  topInset?: number;
  /** Knapp nede til venstre: last ned offline kart. */
  onDownload?: () => void;
  /** Innhold øverst til venstre, f.eks. jakttrykk-velgeren. */
  topLeft?: ReactNode;
  className?: string;
}

/**
 * Kart med ArcGIS Maps SDK for JavaScript. Bakgrunnskart fra Kartverket.
 * Grenser og delområder kommer fra Jaktdatabasen, tilbud og hytter fra Inatur.
 */
export function MapView(p: MapViewProps) {
  const el = useRef<HTMLDivElement>(null);
  const view = useRef<MapViewT | null>(null);
  const layers = useRef<{ areas: GraphicsLayerT; points: GraphicsLayerT } | null>(null);
  const mods = useRef<Mods | null>(null);
  const props = useRef(p);
  props.current = p;
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [basemap, setBasemap] = useState<Basemap>('topo');
  const [locating, setLocating] = useState(false);

  // Opprett kartet én gang.
  useEffect(() => {
    let dead = false;
    let v: MapViewT | undefined;
    loadMods()
      .then((m) => {
        if (dead || !el.current) return;
        mods.current = m;
        const areas = new m.GraphicsLayer({ title: 'Jaktfelt' });
        const points = new m.GraphicsLayer({ title: 'Tilbud og hytter' });
        layers.current = { areas, points };
        v = new m.MapView({
          container: el.current,
          map: new m.Map({ basemap: new m.Basemap({ baseLayers: [new m.WebTileLayer({ urlTemplate: tiles.topo, copyright: '© Kartverket' })] }), layers: [areas, points] }),
          center: [14, 64.5],
          zoom: 4,
          ui: { components: [] },
          constraints: { snapToZoom: false, minZoom: 3 },
          padding: { bottom: props.current.bottomInset ?? 0, top: props.current.topInset ?? 0, left: 0, right: 0 },
        });
        view.current = v;
        v.on('click', async (e) => {
          const hit = await v!.hitTest(e, { include: [points, areas] });
          const g = (hit.results.find((r) => r.type === 'graphic') as GraphicHit | undefined)?.graphic;
          const a = g?.attributes as { kind?: string; id?: string } | undefined;
          const cur = props.current;
          if (a?.kind === 'offer') {
            const o = cur.offers?.find((x) => x.id === a.id);
            if (o) cur.onSelectOffer?.(o);
          } else if (a?.kind === 'cabin') {
            const c = cur.cabins?.find((x) => x.id === a.id);
            if (c) cur.onSelectCabin?.(c);
          } else if (a?.kind === 'subarea') {
            const s = cur.subareas?.find((x) => x.properties.subareaId === a.id);
            if (s && cur.selectableSubareas) cur.onSelectSubarea?.(s);
            else if (s) {
              const o = cur.offers?.find((x) => x.id === s.properties.salesPageId);
              if (o) cur.onSelectOffer?.(o);
            }
          }
        });
        setReady(true);
      })
      .catch((err) => {
        console.warn('Kartet kunne ikke lastes', err);
        if (!dead) setFailed(true);
      });
    return () => {
      dead = true;
      v?.destroy();
      view.current = null;
    };
  }, []);

  // Bakgrunnskart.
  useEffect(() => {
    const m = mods.current;
    const v = view.current;
    if (!ready || !m || !v) return;
    v.map!.basemap = new m.Basemap({ baseLayers: [new m.WebTileLayer({ urlTemplate: tiles[basemap], copyright: '© Kartverket' })] });
  }, [basemap, ready]);

  // Plass til skuffen og søkefeltet.
  useEffect(() => {
    if (view.current) view.current.padding = { bottom: p.bottomInset ?? 0, top: p.topInset ?? 0, left: 0, right: 0 };
  }, [p.bottomInset, p.topInset, ready]);

  // Tegn grenser og punkter på nytt når data endres.
  const offerKey = p.offers?.map((o) => o.id).join() ?? '';
  const cabinKey = p.cabins?.map((c) => c.id).join() ?? '';
  const subKey = p.subareas?.map((s) => s.properties.subareaId).join() ?? '';
  const pressureKey = p.pressure ? [...p.pressure].join() : '';
  useEffect(() => {
    const m = mods.current;
    const l = layers.current;
    if (!ready || !m || !l) return;
    const brand = cssVar('--cta-primary-default', '#00594c');
    const accent = cssVar('--cta-primary-selected', '#ffb284');
    const areas: GraphicT[] = [];
    for (const s of p.subareas ?? []) {
      const id = s.properties.subareaId;
      const sel = id === p.selectedSubareaId;
      const used = p.pressure?.get(id);
      const fill =
        used !== undefined
          ? hexA(used >= 10 ? '#af3029' : used >= 7 ? '#ff7f32' : used >= 3 ? '#ffd27a' : '#66800b', sel ? 0.55 : 0.32)
          : sel
            ? hexA(accent, 0.45)
            : p.selectableSubareas
              ? hexA(brand, 0.08)
              : [0, 0, 0, 0];
      areas.push(
        new m.Graphic({
          geometry: { type: 'polygon', rings: s.geometry.coordinates, spatialReference: { wkid: 4326 } } as never,
          symbol: { type: 'simple-fill', color: fill, outline: { color: sel ? brand : BOUNDARY, width: sel ? 3 : 1.5 } } as never,
          attributes: { kind: 'subarea', id },
        }),
      );
      if (p.selectableSubareas) {
        const ring = s.geometry.coordinates[0];
        const cx = ring.reduce((a, c) => a + c[0], 0) / ring.length;
        const cy = ring.reduce((a, c) => a + c[1], 0) / ring.length;
        areas.push(
          new m.Graphic({
            geometry: { type: 'point', longitude: cx, latitude: cy } as never,
            symbol: { type: 'text', text: s.properties.name, color: '#2a2a2a', haloColor: 'white', haloSize: 1.5, font: { size: 11, weight: 'bold', family: 'Open Sans' } } as never,
            attributes: { kind: 'subarea', id },
          }),
        );
      }
    }
    l.areas.removeAll();
    l.areas.addMany(areas);

    const pts: GraphicT[] = [];
    for (const o of p.offers ?? []) {
      if (!o.location) continue;
      const sel = o.id === p.selectedOfferId;
      pts.push(
        new m.Graphic({
          geometry: { type: 'point', longitude: o.location[0], latitude: o.location[1] } as never,
          symbol: { type: 'simple-marker', color: sel ? accent : brand, size: sel ? 18 : 13, outline: { color: 'white', width: 2 } } as never,
          attributes: { kind: 'offer', id: o.id },
        }),
      );
    }
    for (const c of p.cabins ?? []) {
      if (!c.location) continue;
      pts.push(
        new m.Graphic({
          geometry: { type: 'point', longitude: c.location[0], latitude: c.location[1] } as never,
          symbol: { type: 'picture-marker', url: asset('icons/cabinPoi.svg'), width: 26, height: 26 } as never,
          attributes: { kind: 'cabin', id: c.id },
        }),
      );
    }
    l.points.removeAll();
    l.points.addMany(pts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, offerKey, cabinKey, subKey, p.selectedSubareaId, p.selectedOfferId, p.selectableSubareas, pressureKey]);

  // Zoom til fokus.
  const focusKey = p.focus ? `${p.focus.subareas?.map((s) => s.properties.subareaId).join()}|${p.focus.point}|${p.focus.zoom}` : '';
  useEffect(() => {
    const v = view.current;
    if (!ready || !v || !p.focus) return;
    const f = p.focus;
    if (f.subareas?.length) {
      const all = f.subareas.flatMap((s) => s.geometry.coordinates[0]);
      const xs = all.map((c) => c[0]);
      const ys = all.map((c) => c[1]);
      const E = mods.current!.Extent;
      v.goTo(new E({ xmin: Math.min(...xs), ymin: Math.min(...ys), xmax: Math.max(...xs), ymax: Math.max(...ys), spatialReference: { wkid: 4326 } }).expand(1.3), { duration: 600 }).catch((e) => console.warn('goTo', e));
    } else if (f.point) {
      v.goTo({ center: f.point, zoom: f.zoom ?? 10 }, { duration: 600 }).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, focusKey]);

  const locate = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        view.current?.goTo({ center: [pos.coords.longitude, pos.coords.latitude], zoom: 12 }).catch(() => {});
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  const bottom = (p.bottomInset ?? 0) + 12;
  return (
    <div className={cx('relative size-full overflow-hidden bg-surface-secondary', p.className)}>
      {failed ? <img src={asset('images/kart_oversikt.jpg')} alt="" className="size-full object-cover" /> : <div ref={el} className="size-full" role="application" aria-label="Kart" />}
      <div className="pointer-events-none absolute inset-x-0 flex items-start justify-between p-s" style={{ top: p.topInset ?? 0 }}>
        <div className="pointer-events-auto">{p.topLeft}</div>
        <div className="pointer-events-auto">
          <MapButton icon={<Icon name="layers" />} tooltip={basemap === 'topo' ? 'Bytt til gråtonekart' : 'Bytt til topografisk kart'} onClick={() => setBasemap(basemap === 'topo' ? 'graa' : 'topo')} />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 flex items-end justify-between px-s transition-[bottom] duration-250" style={{ bottom }}>
        <div className="pointer-events-auto">{p.onDownload && <MapButton icon={<Icon name="downloadFromCloud" />} tooltip="Last ned offline kart" onClick={p.onDownload} />}</div>
        <div className="pointer-events-auto">
          <MapButton icon={<Icon name={locating ? 'nearMeOutlined' : 'nearMe'} />} tooltip="Vis min posisjon" onClick={locate} />
        </div>
      </div>
      <span className="pointer-events-none absolute left-[56px] text-[10px] text-text-secondary/80" style={{ bottom: bottom - 10 }}>
        © Kartverket · Esri
      </span>
    </div>
  );
}
