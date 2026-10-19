import { useEffect, useId, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cx } from './cx';
import { SheetHeader } from './SheetHeader';

export const OVERLAY_ROOT_ID = 'overlay-root';

/** Flaten modaler legges i (inne i telefonrammen). */
export function OverlayRoot() {
  return <div id={OVERLAY_ROOT_ID} className="pointer-events-none absolute inset-0 z-40" />;
}

const portal = (node: ReactNode) => {
  const el = typeof document !== 'undefined' ? document.getElementById(OVERLAY_ROOT_ID) : null;
  return el ? createPortal(node, el) : node;
};

/** Låser fokus i dialogen og gir det tilbake når den lukkes. */
function useFocusTrap(open: boolean, ref: React.RefObject<HTMLElement | null>, onEscape?: () => void) {
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const el = ref.current;
    const focusables = () => [...(el?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') ?? [])].filter((x) => !x.hasAttribute('disabled'));
    requestAnimationFrame(() => (focusables()[0] ?? el)?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onEscape?.();
      if (e.key !== 'Tab') return;
      const f = focusables();
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) {
        e.preventDefault();
        f[f.length - 1].focus();
      } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
        e.preventDefault();
        f[0].focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [open, ref, onEscape]);
}

export interface ModalSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** `stack`: «Modal Stack» med visningen bak synlig øverst. `page`: hele skjermen («Default»). */
  variant?: 'stack' | 'page';
  /** Knapp til høyre i toppen. */
  action?: ReactNode;
  children: ReactNode;
  /** Fast nederst, f.eks. «Fjern alle filtre | Vis tilbud». */
  footer?: ReactNode;
  /** Skjul toppen (f.eks. når innholdet har sin egen navigasjon). */
  hideHeader?: boolean;
}

/**
 * Modal som glir opp nederfra og dekker skjermen (Figma «Map Navigation Bar»
 * `Default` og `Modal Stack`). Dra toppen ned eller trykk × for å lukke.
 */
export function ModalSheet({ open, onClose, title, variant = 'stack', action, children, footer, hideHeader }: ModalSheetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const [dy, setDy] = useState(0);
  const start = useRef<number | null>(null);
  const [shown, setShown] = useState(false);
  useFocusTrap(open, ref, onClose);
  useEffect(() => {
    if (!open) return setShown(false);
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, [open]);
  if (!open) return null;

  const down = (e: PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    start.current = e.clientY;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
  };
  const move = (e: PointerEvent) => start.current !== null && setDy(Math.max(0, e.clientY - start.current));
  const up = () => {
    start.current = null;
    if (dy > 120) onClose();
    setDy(0);
  };

  return portal(
    <div className="pointer-events-auto absolute inset-0 flex flex-col justify-end">
      <div aria-hidden className={cx('absolute inset-0 bg-shade-primary transition-opacity duration-200', shown ? 'opacity-100' : 'opacity-0')} onClick={onClose} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-t`}
        tabIndex={-1}
        className={cx(
          'relative flex flex-col bg-surface-primary shadow-[0_-2px_14px_var(--shade-secondary)] focus:outline-none',
          variant === 'stack' ? 'mt-[22px] h-[calc(100%-22px)] rounded-t-[27px]' : 'h-full',
          start.current === null && 'transition-transform duration-250 ease-[cubic-bezier(.2,.8,.2,1)]',
        )}
        style={{ transform: shown ? `translateY(${dy}px)` : 'translateY(100%)' }}
      >
        {variant === 'stack' && <div aria-hidden className="absolute -top-[10px] inset-x-[24px] h-[24px] rounded-t-[27px] bg-surface-tertiary/25" />}
        {!hideHeader && (
          <div className="shrink-0 touch-none" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
            <SheetHeader variant={variant === 'stack' ? 'modalStack' : 'default'} title={title} titleId={`${id}-t`} onClose={onClose} action={action} />
          </div>
        )}
        {hideHeader && (
          <h2 id={`${id}-t`} className="sr-only">
            {title}
          </h2>
        )}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
        {footer && <div className="shrink-0 border-t border-border-primary bg-surface-primary">{footer}</div>}
      </div>
    </div>,
  );
}

export interface AlertDialogProps {
  open: boolean;
  title: string;
  message: string;
  cancelLabel?: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}

/** Varsel med to knapper side om side (Figma «Alert» `Buttons=2 (Side by Side)`, iOS-stil). */
export function AlertDialog({ open, title, message, cancelLabel = 'Ikke nå', confirmLabel, onCancel, onConfirm }: AlertDialogProps) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  useFocusTrap(open, ref, onCancel);
  if (!open) return null;
  return portal(
    <div className="pointer-events-auto absolute inset-0 grid place-items-center bg-shade-primary p-xl">
      <div
        ref={ref}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={`${id}-t`}
        aria-describedby={`${id}-d`}
        className="w-full max-w-[270px] overflow-hidden rounded-[14px] bg-surface-primary/95 text-center shadow-map backdrop-blur"
      >
        <div className="px-m pt-m pb-s">
          <h2 id={`${id}-t`} className="m-0 text-[17px] leading-[22px] font-semibold text-text-primary">
            {title}
          </h2>
          <p id={`${id}-d`} className="m-0 mt-[2px] text-[13px] leading-[18px] text-text-primary">
            {message}
          </p>
        </div>
        <div className="grid grid-cols-2 border-t border-border-primary">
          <button type="button" onClick={onCancel} className="h-[44px] border-r border-border-primary text-[17px] text-cta-primary-default hover:bg-surface-secondary cursor-pointer">
            {cancelLabel}
          </button>
          <button type="button" onClick={onConfirm} className="h-[44px] text-[17px] font-semibold text-cta-primary-default hover:bg-surface-secondary cursor-pointer">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
  );
}
