import { useState } from 'react';
import { ListTile } from '../../components/ListTile';
import { Notice } from '../../components/Notice';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { AlertDialog } from '../../components/ModalSheet';
import { useNav } from '../../app/AppContext';
import { FooterActions, PushedScreen } from '../../app/widgets';
import { errorMessage, useStore, type OfflineArea } from '../../data/AppStore';
import { formatDate } from '../../domain/format';
import { MapView } from '../../map/MapView';

/** Last ned et kartområde (Figma «Offline Maps Download» 2: kart med ramme, «Avbryt | Last ned»). */
export function OfflineDownloadScreen({ name, salesPageId, center }: { name?: string; salesPageId?: string; center?: [number, number] }) {
  const store = useStore();
  const nav = useNav();
  const [busy, setBusy] = useState(false);
  const subareas = salesPageId ? store.subareasFor(salesPageId) : [];
  const offer = store.offerById(salesPageId);
  const download = async () => {
    setBusy(true);
    try {
      const a = await store.downloadArea(name ?? offer?.title ?? 'Mitt kartområde', center ?? offer?.location ?? [14, 64.5], salesPageId);
      nav.toast(`«${a.name}» er lastet ned (${a.sizeMb} MB).`);
      nav.pop();
    } catch (e) {
      nav.toast(errorMessage(e));
    } finally {
      setBusy(false);
    }
  };
  return (
    <PushedScreen title="Last ned dette området?" footer={<FooterActions left={{ label: 'Avbryt', onClick: nav.pop }} right={{ label: busy ? 'Laster ned…' : 'Last ned', onClick: download, disabled: busy }} />}>
      <div className="relative h-full min-h-[480px]">
        <MapView subareas={subareas} offers={offer ? [offer] : []} focus={subareas.length ? { subareas } : center ? { point: center, zoom: 10 } : undefined} />
        {/* Rammen viser området som lastes ned. */}
        <div aria-hidden className="pointer-events-none absolute inset-[48px_32px_88px] rounded-small border-[3px] border-surface-tertiary shadow-[0_0_0_9999px_rgb(0_0_0/0.25)]" />
      </div>
    </PushedScreen>
  );
}

/** Et nedlastet kartområde (Figma «Offline Maps Download»). */
export function OfflineAreaScreen({ area }: { area: OfflineArea }) {
  const store = useStore();
  const nav = useNav();
  const [rename, setRename] = useState(false);
  const [name, setName] = useState(area.name);
  const [confirm, setConfirm] = useState(false);
  const current = store.offlineAreas.find((a) => a.id === area.id) ?? area;
  return (
    <PushedScreen title={current.name}>
      <h2 className="m-0 px-m pt-m pb-s type-headline-h2 font-normal text-text-primary">{current.name}</h2>
      <p className="m-0 px-m pb-s type-body-small text-text-secondary">
        {current.sizeMb} MB · lastet ned {formatDate(new Date(current.downloadedAt))}
      </p>
      <div className="mx-m overflow-hidden rounded-medium">
        {rename ? (
          <div className="flex items-end gap-xs bg-surface-primary p-s">
            <TextField label="Navn" value={name} onChange={setName} className="flex-1" size="small" />
            <Button
              label="Lagre"
              size="small"
              onClick={() => {
                store.renameArea(area.id, name.trim() || area.name);
                setRename(false);
              }}
            />
          </div>
        ) : (
          <ListTile title="Endre navn" icon="editFolder" onClick={() => setRename(true)} />
        )}
        <ListTile title="Vis i kartet" icon="map" onClick={() => nav.push(<OfflineDownloadPreview area={current} />)} />
        <ListTile title="Oppdater kartpakken" icon="synchronize" onClick={async () => {
          try {
            await store.downloadArea(current.name, current.center, current.salesPageId);
            store.deleteArea(current.id);
            nav.toast('Kartpakken er oppdatert.');
            nav.pop();
          } catch (e) {
            nav.toast(errorMessage(e));
          }
        }} />
        <ListTile title="Slett dette offlineområdet" icon="trash" onClick={() => setConfirm(true)} showSeparator={false} />
      </div>
      <AlertDialog
        open={confirm}
        title="Slette kartområdet?"
        message="Du kan laste det ned igjen senere når du har dekning."
        cancelLabel="Avbryt"
        confirmLabel="Slett"
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          store.deleteArea(current.id);
          setConfirm(false);
          nav.pop();
          nav.toast('Kartområdet er slettet.');
        }}
      />
    </PushedScreen>
  );
}

function OfflineDownloadPreview({ area }: { area: OfflineArea }) {
  const store = useStore();
  const subareas = area.salesPageId ? store.subareasFor(area.salesPageId) : [];
  return (
    <PushedScreen title={area.name}>
      <div className="h-full min-h-[480px]">
        <MapView subareas={subareas} focus={subareas.length ? { subareas } : { point: area.center, zoom: 10 }} />
      </div>
    </PushedScreen>
  );
}

/** Oversikt over offline kart (Figma «Offline Maps Overview»). */
export function OfflineMapsScreen() {
  const store = useStore();
  const nav = useNav();
  const downloaded = new Set(store.offlineAreas.map((a) => a.salesPageId));
  const suggestions = [...store.licenses('game'), ...store.licenses('fish')].filter((l) => !l.expired && l.salesPageId && !downloaded.has(l.salesPageId));
  return (
    <PushedScreen title="Offline kart">
      <div className="flex flex-col gap-m p-m">
        <div className="overflow-hidden rounded-medium">
          <ListTile title="Last ned nytt kartområde" icon="downloadFromCloud" onClick={() => nav.push(<OfflineDownloadScreen />)} showSeparator={false} />
        </div>
        {!store.online && <Notice text="Du er uten dekning. Nedlasting krever nett." />}
        {suggestions.length > 0 && (
          <section>
            <h2 className="m-0 mb-xs type-headline-h2 font-normal text-text-primary">Jaktområder til nedlastning</h2>
            <div className="overflow-hidden rounded-medium">
              {suggestions.map((l, i) => (
                <ListTile key={l.id} title={l.title} onClick={() => nav.push(<OfflineDownloadScreen name={l.title} salesPageId={l.salesPageId} />)} showSeparator={i < suggestions.length - 1} />
              ))}
            </div>
          </section>
        )}
        <section>
          <h2 className="m-0 mb-xs type-headline-h2 font-normal text-text-primary">Mine nedlastede kart</h2>
          {store.offlineAreas.length === 0 ? (
            <Notice text="Du har ikke lastet ned noen kartområder ennå." />
          ) : (
            <div className="overflow-hidden rounded-medium">
              {store.offlineAreas.map((a, i) => (
                <ListTile key={a.id} title={a.name} subtitle={`${a.sizeMb} MB`} onClick={() => nav.push(<OfflineAreaScreen area={a} />)} showSeparator={i < store.offlineAreas.length - 1} />
              ))}
            </div>
          )}
        </section>
      </div>
    </PushedScreen>
  );
}
