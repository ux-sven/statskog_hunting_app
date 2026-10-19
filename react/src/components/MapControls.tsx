import type { ReactNode } from 'react';
import { cx } from './cx';
import { Icon } from '../icons/Icon';
import type { IconName } from '../icons/iconNames';

/** Rund kartknapp («Map Button», `Type=Rounded`). `Label` + `Show label` → `label`. */
export function MapButton({ icon, onClick, label, tooltip }: { icon: ReactNode; onClick?: () => void; label?: string; tooltip?: string }) {
  return (
    <button
      type="button"
      title={tooltip}
      aria-label={label ? undefined : tooltip}
      disabled={!onClick}
      onClick={onClick}
      className="inline-flex h-[44px] min-w-[44px] items-center justify-center gap-xs rounded-full bg-surface-primary p-[11px] text-cta-primary-default shadow-map [--icon-size:22px] hover:bg-surface-secondary cursor-pointer transition-colors"
    >
      {icon}
      {label && <span className="type-body-xsmall font-semibold">{label}</span>}
    </button>
  );
}

/** Zoom inn/ut («Zoom», `Style=Rounded`). */
export function MapZoomControl({ onZoomIn, onZoomOut }: { onZoomIn?: () => void; onZoomOut?: () => void }) {
  const half = 'grid h-[42px] w-[40px] place-items-center bg-surface-primary text-cta-primary-default hover:bg-surface-secondary cursor-pointer';
  return (
    <div className="flex flex-col gap-[4px] rounded-[20px] shadow-map">
      <button type="button" aria-label="Zoom inn" onClick={onZoomIn} disabled={!onZoomIn} className={cx(half, 'rounded-t-[20px]')}>
        <Icon name="plus" size={22} />
      </button>
      <button type="button" aria-label="Zoom ut" onClick={onZoomOut} disabled={!onZoomOut} className={cx(half, 'rounded-b-[20px]')}>
        <Icon name="minus" size={22} />
      </button>
    </div>
  );
}

export type UserLocationMode = 'notActive' | 'active' | 'north';

const locIcon: Record<UserLocationMode, IconName> = { notActive: 'nearMeOutlined', active: 'nearMe', north: 'northDirection' };
const locTip: Record<UserLocationMode, string> = {
  notActive: 'Vis min posisjon',
  active: 'Følger posisjon',
  north: 'Følger posisjon med nord opp',
};

/** Viser og følger brukerens posisjon («User Location», `Property 1`). */
export function UserLocationButton({ mode, onClick }: { mode: UserLocationMode; onClick?: () => void }) {
  return <MapButton icon={<Icon name={locIcon[mode]} />} onClick={onClick} tooltip={locTip[mode]} />;
}

function MapControlColumn({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('flex flex-col items-center gap-xs p-m', className)}>{children}</div>;
}

export interface MainMapNavigationProps {
  /** Figma `Show Home`. */
  onHome?: () => void;
  /** Figma `Show Zoom`. */
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  /** Figma `Show Compass North`. */
  onCompassNorth?: () => void;
  /** Figma `Show User location`. */
  userLocationMode?: UserLocationMode;
  onUserLocation?: () => void;
  className?: string;
}

/** Hovednavigasjon i kartet («Main Map Navigation»). */
export function MainMapNavigation({ onHome, onZoomIn, onZoomOut, onCompassNorth, userLocationMode, onUserLocation, className }: MainMapNavigationProps) {
  return (
    <MapControlColumn className={className}>
      {onHome && <MapButton icon={<Icon name="mapHome" />} onClick={onHome} tooltip="Hjem" />}
      {(onZoomIn || onZoomOut) && <MapZoomControl onZoomIn={onZoomIn} onZoomOut={onZoomOut} />}
      {onCompassNorth && <MapButton icon={<Icon name="target" />} onClick={onCompassNorth} tooltip="Nord opp" />}
      {userLocationMode && <UserLocationButton mode={userLocationMode} onClick={onUserLocation} />}
    </MapControlColumn>
  );
}

export interface SecondaryMapNavigationProps {
  onMapLayers?: () => void;
  onBasemaps?: () => void;
  onLegend?: () => void;
  onMeasure?: () => void;
  onPrint?: () => void;
  onDraw?: () => void;
  onTools?: () => void;
  on3D?: () => void;
  className?: string;
}

/** Verktøy i kartet («Secondary Map Navigation»). Hvert `Show …`-flagg i Figma = callbacken er satt. */
export function SecondaryMapNavigation(p: SecondaryMapNavigationProps) {
  const items: Array<[IconName, (() => void) | undefined, string]> = [
    ['layers', p.onMapLayers, 'Kartlag'],
    ['basemaps', p.onBasemaps, 'Bakgrunnskart'],
    ['legend', p.onLegend, 'Tegnforklaring'],
    ['ruler', p.onMeasure, 'Mål'],
    ['print', p.onPrint, 'Skriv ut'],
    ['draw', p.onDraw, 'Tegn'],
    ['edit', p.onTools, 'Verktøy'],
    ['view3d', p.on3D, '3D'],
  ];
  return (
    <MapControlColumn className={p.className}>
      {items.filter(([, f]) => f).map(([i, f, t]) => (
        <MapButton key={t} icon={<Icon name={i} />} onClick={f} tooltip={t} />
      ))}
    </MapControlColumn>
  );
}

/** Hytte-markør i kartet («cabin poi»). */
export function CabinPoi({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      aria-label="Hytte"
      onClick={onClick}
      className="grid size-[30px] place-items-center rounded-full border border-border-invert bg-surface-primary p-[4px] cursor-pointer"
    >
      <Icon name="logCabinColored" size={20} />
    </button>
  );
}
