import { createContext, useCallback, useContext, useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react';
import { cx } from './cx';
import { Icon } from '../icons/Icon';

/**
 * Høydene skuffen kan stå på:
 * - `peek`: bare toppen (håndtak og tittel) – kartet er nesten helt synlig
 * - `half`: omtrent halve flaten
 * - `full`: hele flaten (kartet er skjult)
 */
export type SheetSnap = 'peek' | 'half' | 'full';
const ORDER: SheetSnap[] = ['peek', 'half', 'full'];

interface SheetCtx {
  snap: SheetSnap;
  setSnap: (s: SheetSnap) => void;
  /** Synlig høyde i piksler (for å legge kartknapper over skuffen). */
  height: number;
}
const Ctx = createContext<SheetCtx | null>(null);

/** Gir tilgang til skuffen rundt, f.eks. for kartknappen som lukker den ned. */
export function useSheet() {
  return useContext(Ctx);
}

export interface SheetProps {
  /** Toppen av skuffen, typisk `<SheetHeader variant="drawer" />`. Her kan man dra. */
  header: ReactNode;
  children: ReactNode;
  /** Høydene skuffen kan stå på. Standard: alle tre. */
  snapPoints?: SheetSnap[];
  /** Styrt høyde. Uten denne styrer skuffen seg selv fra `defaultSnap`. */
  snap?: SheetSnap;
  defaultSnap?: SheetSnap;
  onSnapChange?: (s: SheetSnap) => void;
  /** Kalles når skuffen dras ned forbi laveste høyde (skuffer som kan lukkes). */
  onClose?: () => void;
  /** Andel av flaten for `half`. Standard 0,55. */
  halfRatio?: number;
  /** Høyde for `peek` når toppen ikke kan måles. */
  peekHeight?: number;
  /** Synlig høyde endres – bruk til å flytte kartknapper. */
  onHeightChange?: (px: number) => void;
  /** Lesbart navn for skjermleser (ellers tittelen i toppen). */
  label?: string;
  className?: string;
  /** Innhold som ligger fast nederst i skuffen (f.eks. «Send inn»). */
  footer?: ReactNode;
}

/**
 * Skuff over kartet (Figma: «Drawer»-variantene av «Map Navigation Bar» med
 * innhold under). Dra i toppen for å endre høyde, trykk på håndtaket for neste
 * høyde, eller bruk piltastene. Ligger absolutt i nærmeste posisjonerte forelder.
 */
export function Sheet({
  header,
  children,
  snapPoints = ORDER,
  snap: controlled,
  defaultSnap = 'half',
  onSnapChange,
  onClose,
  halfRatio = 0.55,
  peekHeight = 104,
  onHeightChange,
  label,
  className,
  footer,
}: SheetProps) {
  const [inner, setInner] = useState<SheetSnap>(defaultSnap);
  const snap = controlled ?? inner;
  const setSnap = useCallback(
    (s: SheetSnap) => {
      if (!snapPoints.includes(s)) return;
      if (controlled === undefined) setInner(s);
      onSnapChange?.(s);
    },
    [controlled, onSnapChange, snapPoints],
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [area, setArea] = useState(0);
  const [headH, setHeadH] = useState(0);
  const [drag, setDrag] = useState<number | null>(null);
  const start = useRef<{ y: number; h: number; t: number; moved: boolean; id: number } | null>(null);
  const id = useId();

  // Mål flaten skuffen ligger i, og toppen av skuffen.
  useLayoutEffect(() => {
    const parent = rootRef.current?.parentElement;
    if (!parent) return;
    const ro = new ResizeObserver(() => {
      setArea(parent.clientHeight);
      setHeadH(headRef.current?.offsetHeight ?? 0);
    });
    ro.observe(parent);
    if (headRef.current) ro.observe(headRef.current);
    return () => ro.disconnect();
  }, []);

  const heightOf = useCallback(
    (s: SheetSnap) => {
      const peek = Math.max(headH + 34, peekHeight);
      if (s === 'peek') return Math.min(peek, area);
      if (s === 'half') return Math.max(peek, Math.round(area * halfRatio));
      return area;
    },
    [area, headH, halfRatio, peekHeight],
  );

  const height = drag ?? heightOf(snap);
  useEffect(() => {
    if (area) onHeightChange?.(height);
  }, [height, area, onHeightChange]);

  const step = (dir: 1 | -1) => {
    const i = snapPoints.indexOf(snap);
    const next = snapPoints[Math.min(snapPoints.length - 1, Math.max(0, i + dir))];
    if (next === snap && dir === -1 && onClose) onClose();
    else setSnap(next);
  };

  const onDown = (e: PointerEvent) => {
    // Knapper i toppen skal fortsatt kunne trykkes.
    if ((e.target as HTMLElement).closest('button, a, input, select, [role="tab"]')) return;
    start.current = { y: e.clientY, h: height, t: performance.now(), moved: false, id: e.pointerId };
  };
  const onMove = (e: PointerEvent) => {
    const s = start.current;
    if (!s || s.id !== e.pointerId) return;
    const dy = e.clientY - s.y;
    if (!s.moved && Math.abs(dy) < 5) return;
    if (!s.moved) {
      s.moved = true;
      (e.currentTarget as Element).setPointerCapture(e.pointerId);
    }
    setDrag(Math.max(heightOf('peek') * 0.5, Math.min(area, s.h - dy)));
  };
  const onUp = (e: PointerEvent) => {
    const s = start.current;
    start.current = null;
    if (!s) return;
    if (!s.moved) {
      // Trykk på håndtaket: neste høyde opp, eller ned igjen fra toppen.
      if ((e.target as HTMLElement).closest('[data-sheet-handle]')) step(snap === snapPoints[snapPoints.length - 1] ? -1 : 1);
      return;
    }
    const h = drag ?? s.h;
    const v = (s.y - e.clientY) / Math.max(1, performance.now() - s.t); // px/ms, positiv = opp
    setDrag(null);
    if (onClose && h < heightOf(snapPoints[0]) * 0.75) return onClose();
    const nearest = (px: number) => snapPoints.reduce((best, p) => (Math.abs(heightOf(p) - px) < Math.abs(heightOf(best) - px) ? p : best), snapPoints[0]);
    const from = nearest(s.h);
    let target = nearest(h);
    // Et tydelig dra (eller raskt sveip) flytter minst ett steg i den retningen.
    const dir = h > s.h ? 1 : -1;
    if (target === from && (Math.abs(h - s.h) > 48 || Math.abs(v) > 0.5)) {
      const i = snapPoints.indexOf(from) + dir;
      if (i < 0 && onClose) return onClose();
      target = snapPoints[Math.max(0, Math.min(snapPoints.length - 1, i))];
    }
    setSnap(target);
  };

  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, () => void> = {
      ArrowUp: () => step(1),
      ArrowDown: () => step(-1),
      Home: () => setSnap(snapPoints[snapPoints.length - 1]),
      End: () => setSnap(snapPoints[0]),
      Enter: () => step(snap === snapPoints[snapPoints.length - 1] ? -1 : 1),
      ' ': () => step(snap === snapPoints[snapPoints.length - 1] ? -1 : 1),
      Escape: () => onClose?.(),
    };
    if (map[e.key]) {
      e.preventDefault();
      map[e.key]();
    }
  };

  const full = height >= area - 1 && area > 0;
  const pct = area ? Math.round((height / area) * 100) : 0;
  const snapLabel = { peek: 'liten', half: 'halv', full: 'hel skjerm' }[snap];

  return (
    <Ctx.Provider value={{ snap, setSnap, height }}>
      <section
        ref={rootRef}
        aria-labelledby={label ? undefined : `${id}-h`}
        aria-label={label}
        className={cx(
          'absolute inset-x-0 bottom-0 z-[5] flex flex-col bg-surface-primary shadow-[0_-2px_14px_var(--shade-secondary)]',
          full ? 'rounded-none' : 'rounded-t-[27px]',
          drag === null && 'transition-[height,border-radius] duration-250 ease-[cubic-bezier(.2,.8,.2,1)]',
          className,
        )}
        style={{ height: area ? height : `${halfRatio * 100}%` }}
      >
        <div
          ref={headRef}
          id={`${id}-h`}
          className="relative shrink-0 cursor-grab touch-none select-none active:cursor-grabbing"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={() => {
            start.current = null;
            setDrag(null);
          }}
        >
          {/* Håndtaket: tastaturstyring og trykk (vindusdeler-mønsteret i WAI-ARIA). */}
          <div
            data-sheet-handle
            role="separator"
            aria-orientation="horizontal"
            aria-label={`Høyde på skuffen: ${snapLabel}. Bruk piltastene for å endre.`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            tabIndex={0}
            onKeyDown={onKey}
            className="absolute top-0 left-1/2 z-10 h-[28px] w-[96px] -translate-x-1/2 cursor-pointer rounded-medium focus-visible:outline-2"
          />
          {header}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain" inert={snap === 'peek' && drag === null ? true : undefined}>
          {children}
        </div>
        {footer && snap !== 'peek' && <div className="shrink-0 border-t border-border-primary bg-surface-primary p-m">{footer}</div>}
      </section>
    </Ctx.Provider>
  );
}

/** Kartknapp i skuffetoppen: åpner kartet (skuffen ned) eller listen (skuffen opp). */
export function SheetMapToggle() {
  const s = useSheet();
  if (!s) return null;
  const open = s.snap === 'full';
  return (
    <button
      type="button"
      aria-label={open ? 'Vis kartet' : 'Vis hele listen'}
      onClick={() => s.setSnap(open ? 'half' : 'full')}
      className="grid h-[38px] w-[54px] shrink-0 place-items-center rounded-small bg-surface-secondary text-cta-primary-default hover:bg-border-primary cursor-pointer"
    >
      <Icon name={open ? 'map' : 'noMap'} size={22} />
    </button>
  );
}
