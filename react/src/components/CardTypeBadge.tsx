import { cardTypes, type CardType } from '../domain/cardType';

// SVG-ene leses inn som tekst ved bygging, og de faste fargene byttes til
// temafarger slik at symbolet fungerer i mørk modus.
const raw = import.meta.glob<string>('../assets/cards/*.svg', { query: '?raw', import: 'default', eager: true });
const svgs: Record<string, string> = Object.fromEntries(
  Object.entries(raw).map(([path, s]) => [
    path.replace(/^.*\/(\w+)\.svg$/, '$1'),
    s
      .replace(/fill="#F6F6F7"/gi, 'style="fill:var(--surface-secondary)"')
      .replace(/fill="#555555"/gi, 'style="fill:var(--text-secondary)"')
      .replace(/\sid="[^"]*"/g, '')
      .replace(/width="48" height="48"/, 'width="100%" height="100%"'),
  ]),
);

export interface CardTypeBadgeProps {
  /** «Card» `Property 1`. */
  type: CardType;
  /** «Card Inactive»: diagonal strek over symbolet. */
  inactive?: boolean;
  size?: number;
}

/** Symbol for korttype («Card» og «Card Inactive» på Components-siden). */
export function CardTypeBadge({ type, inactive = false, size = 48 }: CardTypeBadgeProps) {
  const { label, asset } = cardTypes[type];
  return (
    <span
      role="img"
      aria-label={inactive ? `${label} (inaktivt)` : label}
      className="relative inline-block shrink-0"
      style={{ width: size, height: size }}
    >
      <span className="block size-full" dangerouslySetInnerHTML={{ __html: svgs[asset] }} />
      {inactive && (
        // Strek fra nedre venstre til øvre høyre hjørne, med lys kant over.
        <svg viewBox="0 0 48 48" className="absolute inset-0 size-full" aria-hidden>
          <line x1="3.9" y1="38.4" x2="47.9" y2="4.4" strokeWidth="2.5" style={{ stroke: 'var(--surface-primary)' }} />
          <line x1="3" y1="40" x2="47" y2="6" strokeWidth="2.5" style={{ stroke: 'var(--text-secondary)' }} />
        </svg>
      )}
    </span>
  );
}
