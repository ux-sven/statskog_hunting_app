import { useEffect, useState } from 'react';
import { ModalSheet, AlertDialog } from '../../components/ModalSheet';
import { SegmentedControl } from '../../components/SegmentedControl';
import { Button } from '../../components/Button';
import { CountStepper } from '../../components/CountStepper';
import { Select } from '../../components/Select';
import { Notice } from '../../components/Notice';
import { Icon } from '../../icons/Icon';
import { SpeciesIcon } from '../../icons/SpeciesIcon';
import { cx } from '../../components/cx';
import { useNav } from '../../app/AppContext';
import { useStore } from '../../data/AppStore';
import { formatLongDate, isoDay, parseDay, startOfDay } from '../../domain/format';
import type { Activation, HuntStatus, HuntingLicense } from '../../domain/license';
import { speciesById, type SpeciesId } from '../../domain/species';

export interface ReportTarget {
  license: HuntingLicense;
  activation?: Activation;
}

const GAME_MAIN: SpeciesId[] = ['grevling', 'hare', 'jerpe', 'lirype', 'mar', 'orrfugl', 'rodrev', 'royskatt'];
const GAME_MORE: SpeciesId[] = ['fjellrype', 'tiur', 'roy', 'ringdue', 'gjess', 'villsvin'];
const FISH_MAIN: SpeciesId[] = ['orret', 'roye', 'harr', 'sik', 'gjedde', 'abbor'];
const FISH_MORE: SpeciesId[] = ['brunorret', 'sjoorret', 'lake', 'gjors', 'karpefisk', 'kreps'];

/** Art i fangstlisten: trykk for å åpne telleren (Figma «Fangstrapport 2»). */
function CatchRow({ species, count, onChange }: { species: SpeciesId; count: number; onChange: (n: number) => void }) {
  const [open, setOpen] = useState(count > 0);
  const label = speciesById(species).label;
  return (
    <li className="border-b border-border-primary">
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="flex min-h-[48px] w-full items-center gap-s px-m text-left hover:bg-surface-secondary cursor-pointer">
        <SpeciesIcon species={species} size={32} decorative />
        <span className="flex-1 type-body-large text-text-primary">{label}</span>
        {count > 0 && <span className="rounded-full bg-surface-invert px-xs type-body-small text-text-invert">{count}</span>}
        <Icon name={open ? 'chevronUp' : 'chevronDown'} size={20} className="text-text-primary" />
      </button>
      {open && (
        <div className="flex items-center justify-between px-m pb-s">
          <span className="type-body-small text-text-secondary">Antall felt</span>
          <CountStepper value={count} onChange={onChange} label={label} size="medium" />
        </div>
      )}
    </li>
  );
}

/** Lever fangstrapport (Figma «Fangstrapport 2», «Modal Stack»). Lagres på telefonen og sendes når det er nett. */
export function CaptureReportSheet({ target, onClose }: { target: ReportTarget | null; onClose: () => void }) {
  const store = useStore();
  const nav = useNav();
  const [date, setDate] = useState(startOfDay(new Date()));
  const [editDate, setEditDate] = useState(false);
  const [subareaId, setSubareaId] = useState<string>('');
  const [editArea, setEditArea] = useState(false);
  const [status, setStatus] = useState<HuntStatus>('catch');
  const [counts, setCounts] = useState<Partial<Record<SpeciesId, number>>>({});
  const [more, setMore] = useState(false);
  const [askLocation, setAskLocation] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!target) return;
    setDate(target.activation?.date ?? startOfDay(new Date()));
    setSubareaId(target.activation?.subareaId ?? '');
    setStatus('catch');
    setCounts({});
    setMore(false);
    setEditDate(false);
    setEditArea(false);
  }, [target]);

  if (!target) return <ModalSheet open={false} onClose={onClose} title="Fangstrapport">{null}</ModalSheet>;
  const l = target.license;
  const fish = l.group === 'fish';
  const subareas = store.subareasFor(l.salesPageId);
  const area = subareas.find((s) => s.properties.subareaId === subareaId);
  const species = [...(fish ? FISH_MAIN : GAME_MAIN), ...(more ? (fish ? FISH_MORE : GAME_MORE) : [])];
  const total = Object.values(counts).reduce<number>((a, b) => a + (b ?? 0), 0);
  const statuses: HuntStatus[] = ['catch', 'noCatch', 'notHunted'];

  const send = async () => {
    setBusy(true);
    const sent = await store.submitReport({
      permitId: l.id,
      activationId: target.activation?.id,
      licenseTitle: l.title,
      subareaName: area?.properties.name,
      date,
      status: status === 'catch' && total === 0 ? 'noCatch' : status,
      catches: status === 'catch' ? counts : {},
    });
    setBusy(false);
    nav.toast(sent ? 'Takk! Fangstrapporten er sendt.' : 'Fangstrapporten er lagret og sendes når du får dekning.');
    if (status === 'catch' && total > 0) setAskLocation(true);
    else onClose();
  };

  const row = (label: string, value: string, onEdit: () => void, editor?: React.ReactNode) => (
    <div className="border-b border-border-primary px-m py-s">
      <p className="m-0 type-body-large font-bold text-text-primary">{label}</p>
      {editor ?? (
        <div className="flex items-center gap-s">
          <span className="flex-1 type-body-large text-text-primary">{value}</span>
          <Button label="Endre" variant="secondary" size="small" onClick={onEdit} />
        </div>
      )}
    </div>
  );

  return (
    <>
      <ModalSheet
        open={!askLocation}
        onClose={onClose}
        title="Fangstrapport"
        footer={
          <div className="p-m">
            <Button label={busy ? 'Sender…' : 'Send inn fangstrapport'} expand disabled={busy} onClick={send} />
          </div>
        }
      >
        {row(
          'Dag',
          formatLongDate(date),
          () => setEditDate(true),
          editDate ? (
            <input
              type="date"
              aria-label="Dag"
              autoFocus
              max={isoDay(new Date())}
              value={isoDay(date)}
              onChange={(e) => e.target.value && setDate(parseDay(e.target.value))}
              onBlur={() => setEditDate(false)}
              className="mt-xs w-full rounded-medium border border-border-secondary bg-surface-primary px-s py-xs type-body-large text-text-primary"
            />
          ) : undefined,
        )}
        {row(
          'Område',
          area ? `${area.properties.name} (${l.title})` : l.title,
          () => setEditArea(true),
          editArea && subareas.length ? (
            <Select
              label="Område"
              value={subareaId}
              onChange={(v) => {
                setSubareaId(v);
                setEditArea(false);
              }}
              options={[{ value: '', label: 'Hele området' }, ...subareas.map((s) => ({ value: s.properties.subareaId, label: `${s.properties.name} (${s.properties.municipality})` }))]}
              className="mt-xs w-full"
            />
          ) : undefined,
        )}
        <div className="px-m py-s">
          <p className="m-0 mb-xs type-body-large font-bold text-text-primary">Status for {fish ? 'fiske' : 'jakt'}</p>
          <SegmentedControl label={`Status for ${fish ? 'fiske' : 'jakt'}`} segments={['Fangst', 'Ikke fangst', fish ? 'Ikke fisket' : 'Ikke jaktet']} selectedIndex={statuses.indexOf(status)} onChange={(i) => setStatus(statuses[i])} />
        </div>
        {status === 'catch' ? (
          <>
            <ul className={cx('m-0 list-none border-t border-border-primary p-0')}>
              {species.map((s) => (
                <CatchRow key={s} species={s} count={counts[s] ?? 0} onChange={(n) => setCounts({ ...counts, [s]: n })} />
              ))}
            </ul>
            {!more && (
              <div className="p-m">
                <Button label="Vis flere arter" variant="secondary" expand onClick={() => setMore(true)} />
              </div>
            )}
          </>
        ) : (
          <Notice className="m-m" text={status === 'noCatch' ? 'Du rapporterer at du ikke fikk fangst. Det er også viktig for forvaltningen.' : `Du rapporterer at du ikke ${fish ? 'fisket' : 'jaktet'} denne dagen.`} />
        )}
        <p className="m-0 px-m pb-m type-body-small text-text-secondary">Du kan stedfeste fellinger og registrere bilder av fangsten etter at rapporten er sendt inn.</p>
      </ModalSheet>
      <AlertDialog
        open={askLocation}
        title="Registrer felling"
        message="Ønsker du å bruke din lokasjon til å registrere felling?"
        confirmLabel="Registrer"
        onCancel={() => {
          setAskLocation(false);
          onClose();
        }}
        onConfirm={() => {
          setAskLocation(false);
          onClose();
          navigator.geolocation?.getCurrentPosition(
            () => nav.toast('Fellingen er stedfestet.'),
            () => nav.toast('Fikk ikke tilgang til posisjon. Du kan stedfeste senere.'),
          );
        }}
      />
    </>
  );
}
