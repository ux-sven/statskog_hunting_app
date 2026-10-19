import { useEffect, useMemo, useState } from 'react';
import { Sheet, SheetMapToggle, type SheetSnap } from '../../components/Sheet';
import { SheetHeader } from '../../components/SheetHeader';
import { SegmentedControl } from '../../components/SegmentedControl';
import { Notice, Callout } from '../../components/Notice';
import { Button } from '../../components/Button';
import { MetaRow } from '../../components/MetaRow';
import { ModalSheet, AlertDialog } from '../../components/ModalSheet';
import { Icon } from '../../icons/Icon';
import { useNav } from '../../app/AppContext';
import { LoginPrompt, Skeleton, SyncStatus } from '../../app/widgets';
import { errorMessage, useStore } from '../../data/AppStore';
import { addDays, monthShort, startOfDay } from '../../domain/format';
import type { Activation, ActivationSlot, HuntingLicense } from '../../domain/license';
import type { SpeciesGroup } from '../../domain/species';
import type { SubareaFeature } from '../../api/jaktdatabasen/types';
import { MapView } from '../../map/MapView';
import { OfflineDownloadScreen } from '../settings/OfflineMapsScreens';
import { CaptureReportSheet, type ReportTarget } from '../report/CaptureReportSheet';
import { ActivationCard } from './ActivationCard';
import { DayPicker } from './DayPicker';
import { LicenseCard, LicenseDetails } from './LicenseCard';

type Alert = 'offline' | 'tracking' | null;

/** Velger dag for jakttrykk i kartet (Figma «Jakttrykk 22. nov ▾» og «Skjul jakttrykk»). */
function PressurePicker({ day, onChange }: { day: Date | null; onChange: (d: Date | null) => void }) {
  const today = startOfDay(new Date());
  const days = Array.from({ length: 10 }, (_, i) => addDays(today, i));
  return (
    <label className="relative inline-flex h-[36px] items-center gap-xs rounded-full bg-surface-primary px-s type-body-small text-text-primary shadow-map">
      <Icon name="calendar" size={18} className="text-cta-primary-default" />
      {day ? `Jakttrykk ${day.getDate()}. ${monthShort(day)}` : 'Vis jakttrykk'}
      <Icon name="chevronDownSmall" size={16} />
      <select
        aria-label="Vis jakttrykk for dag"
        className="absolute inset-0 cursor-pointer opacity-0"
        value={day ? day.getTime() : ''}
        onChange={(e) => onChange(e.target.value ? new Date(Number(e.target.value)) : null)}
      >
        <option value="">Skjul jakttrykk</option>
        {days.map((d) => (
          <option key={d.getTime()} value={d.getTime()}>
            {d.getDate()}. {monthShort(d)}
          </option>
        ))}
      </select>
    </label>
  );
}

/** Aktivering i skuffen (Figma «Aktiver jaktkort 1» og «2»). */
function ActivationPanel({ license, subarea, onActivated }: { license: HuntingLicense; subarea: SubareaFeature | null; onActivated: (days: Date[]) => void }) {
  const store = useStore();
  const nav = useNav();
  const [slots, setSlots] = useState<ActivationSlot[] | null>(null);
  const [busy, setBusy] = useState(false);
  const subId = subarea?.properties.subareaId;
  useEffect(() => {
    if (!subId) return;
    let live = true;
    setSlots(null);
    store.activationSlots(license, subId).then((s) => live && setSlots(s));
    return () => {
      live = false;
    };
  }, [subId, license, store, store.activations().length]);

  const activate = async (d: Date) => {
    if (!subId || busy) return;
    setBusy(true);
    try {
      await store.activate(license, subId, [d]);
      nav.toast(`Jaktkortet er aktivert ${d.getDate()}. ${monthShort(d)} i ${subarea!.properties.name}.`);
      onActivated([d]);
    } catch (e) {
      nav.toast(errorMessage(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-s px-m pb-l">
      <MetaRow icon="contact" text={license.title} textClassName="type-body-large text-text-secondary" />
      {!store.online && <Notice text="Du er uten dekning. Aktivering krever nett." />}
      {!subarea ? (
        <Notice icon="information" text="Trykk på et delområde i kartet for å velge dag og aktivere." />
      ) : (
        <>
          <MetaRow icon="location" text={[subarea.properties.municipality, subarea.properties.name]} emphasizeLast dotClassName="bg-border-invert" textClassName="type-body-large text-text-primary" />
          {slots ? <DayPicker slots={slots} selected={new Set()} onToggle={activate} /> : <div className="h-[110px] animate-pulse rounded-small bg-surface-secondary" aria-label="Laster ledige dager" />}
          <p className="m-0 type-body-small text-text-secondary">Trykk på ønsket dag for å aktivere. Trykk i kartet for å endre delområde.</p>
          <p className="m-0 flex flex-wrap items-center gap-x-s gap-y-[2px] type-body-xsmall text-text-secondary" aria-label="Fargene i kartet viser jakttrykket">
            Jakttrykk:
            {[
              ['#66800b', 'lite'],
              ['#ffd27a', 'middels'],
              ['#ff7f32', 'høyt'],
              ['#af3029', 'fullt'],
            ].map(([c, t]) => (
              <span key={t} className="inline-flex items-center gap-[4px]">
                <span className="size-[10px] rounded-[2px]" style={{ background: c }} />
                {t}
              </span>
            ))}
          </p>
        </>
      )}
    </div>
  );
}

/**
 * Mine jaktkort / Mine fiskekort: kart med skuff som kan dras opp til hele
 * skjermen (Figma «Mine jaktkort 1–5», «Mine fiskekort 1–2», «Aktiver jaktkort»).
 */
export function CardsScreen({ group }: { group: SpeciesGroup }) {
  const store = useStore();
  const nav = useNav();
  const hunting = group === 'game';
  const [tab, setTab] = useState(0);
  const [snap, setSnap] = useState<SheetSnap>('full');
  const [sheetH, setSheetH] = useState(0);
  const [activating, setActivating] = useState<HuntingLicense | null>(null);
  const [subarea, setSubarea] = useState<SubareaFeature | null>(null);
  const [pressureDay, setPressureDay] = useState<Date | null>(null);
  const [pressure, setPressure] = useState<Map<string, number>>();
  const [info, setInfo] = useState<HuntingLicense | null>(null);
  const [report, setReport] = useState<ReportTarget | null>(null);
  const [alert, setAlert] = useState<Alert>(null);
  const [showExpired, setShowExpired] = useState(false);
  const [focus, setFocus] = useState<{ subareas?: SubareaFeature[] }>();

  const all = store.licenses(group);
  const licenses = all.filter((l) => showExpired || !l.expired);
  const expired = all.filter((l) => l.expired).length;
  const activations = store.activations();
  const today = startOfDay(new Date()).getTime();

  // Kartet viser grensene for kortene, eller delområdene som kan aktiveres.
  const subareas = useMemo(() => {
    if (activating) return store.subareasFor(activating.salesPageId);
    const ids = new Set(licenses.map((l) => l.salesPageId));
    return store.subareasFor().filter((s) => ids.has(s.properties.salesPageId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activating, licenses.map((l) => l.id).join(), store.cache.subareas.length]);

  useEffect(() => {
    if (!activating || !pressureDay) return setPressure(undefined);
    let live = true;
    store.pressure(activating.salesPageId ?? '', subareas.map((s) => s.properties.subareaId), pressureDay).then((p) => live && setPressure(p));
    return () => {
      live = false;
    };
  }, [activating, pressureDay, subareas, store, activations.length]);

  const showInMap = (l: HuntingLicense) => {
    setSnap('peek');
    setFocus({ subareas: store.subareasFor(l.salesPageId) });
  };
  const startActivation = (l: HuntingLicense) => {
    setActivating(l);
    setSubarea(null);
    setPressureDay(startOfDay(new Date()));
    setSnap('half');
    setFocus({ subareas: store.subareasFor(l.salesPageId) });
  };
  const doneActivating = () => {
    setActivating(null);
    setSubarea(null);
    setPressureDay(null);
    setTab(1);
    setSnap('full');
  };
  const onActivated = (days: Date[]) => {
    const hasOffline = store.offlineAreas.some((a) => a.salesPageId === activating?.salesPageId);
    if (days.some((d) => d.getTime() === today)) setAlert('tracking');
    else if (!hasOffline) setAlert('offline');
  };
  const remove = async (a: Activation) => {
    try {
      await store.removeActivation(a);
      nav.toast('Aktiveringen er fjernet.');
    } catch (e) {
      nav.toast(errorMessage(e));
    }
  };
  const reportFor = (l: HuntingLicense, a?: Activation): ReportTarget => ({ license: l, activation: a });

  const title = activating ? 'Aktiver jaktkort' : hunting ? (tab === 1 ? 'Mine aktiveringer' : 'Mine jaktkort') : 'Mine fiskekort';
  const action = activating ? <Button label="Ferdig" variant="tertiary" size="small" onClick={doneActivating} /> : <SheetMapToggle />;

  let body: React.ReactNode;
  if (!store.loggedIn) {
    body = <LoginPrompt text={hunting ? 'Logg inn med Inatur-brukeren din for å se og aktivere jaktkortene dine.' : 'Logg inn med Inatur-brukeren din for å se fiskekortene dine.'} />;
  } else if (activating) {
    body = <ActivationPanel license={activating} subarea={subarea} onActivated={onActivated} />;
  } else {
    body = (
      <>
        {hunting && (
          <div className="sticky top-0 z-[1] bg-surface-primary px-s pb-s">
            <SegmentedControl label="Visning" segments={['Alle jaktkort', 'Mine aktiveringer']} selectedIndex={tab} onChange={setTab} />
          </div>
        )}
        <SyncStatus />
        <div className="flex flex-col gap-s p-s pb-l">
          {store.mineState === 'loading' && !all.length && <Skeleton />}
          {(!hunting || tab === 0) && (
            <>
              {store.mineState !== 'loading' && !licenses.length && <Notice text={`Du har ingen ${hunting ? 'jaktkort' : 'fiskekort'}. Finn et tilbud under Tilbud.`} />}
              {licenses.map((l) =>
                hunting ? (
                  <LicenseCard
                    key={l.id}
                    license={l}
                    onActivate={l.canBeActivated && !l.expired ? () => startActivation(l) : undefined}
                    onInfo={() => setInfo(l)}
                    onShowInMap={() => showInMap(l)}
                    onReportCapture={() => setReport(reportFor(l, activations.find((a) => a.permitId === l.id && a.date.getTime() === today)))}
                  />
                ) : (
                  <LicenseCard key={l.id} variant="fishing" license={l} onInfo={() => setInfo(l)} onShowInMap={() => showInMap(l)} onReportCapture={l.expired ? undefined : () => setReport(reportFor(l))} />
                ),
              )}
              {expired > 0 && <Button label={showExpired ? `Skjul utgåtte ${hunting ? 'jaktkort' : 'fiskekort'}` : `Vis utgåtte ${hunting ? 'jaktkort' : 'fiskekort'} (${expired})`} variant="secondary" expand onClick={() => setShowExpired(!showExpired)} />}
              {hunting && (
                <Callout
                  text="Last ned offline kartområder med jaktgrenser dersom du skal jakte i områder uten mobildekning."
                  action={<Button label="Last ned her" variant="secondary" leadingIcon={<Icon name="downloadFromCloud" />} onClick={() => nav.push(<OfflineDownloadScreen name={licenses[0]?.title} salesPageId={licenses[0]?.salesPageId} />)} />}
                />
              )}
            </>
          )}
          {hunting && tab === 1 && (
            <>
              {!activations.length && <Notice text={'Du har ingen aktiveringer.\nHusk å aktivere jaktkortet ditt før du går på jakt.'} />}
              {activations.map((a) => {
                const future = a.date.getTime() > today;
                const l = store.licenseById(a.permitId);
                return (
                  <ActivationCard
                    key={a.id}
                    activation={a}
                    onRemove={future ? () => remove(a) : undefined}
                    onReportCapture={!future && !store.isReported(a.id) && l ? () => setReport(reportFor(l, a)) : undefined}
                    onShowInMap={() => {
                      setSnap('peek');
                      setFocus({ subareas: store.subareasFor().filter((s) => s.properties.subareaId === a.subareaId) });
                    }}
                  />
                );
              })}
            </>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="relative h-full">
      <MapView
        subareas={subareas}
        selectableSubareas={!!activating}
        selectedSubareaId={subarea?.properties.subareaId}
        pressure={pressure}
        onSelectSubarea={(s) => {
          setSubarea(s);
          setSnap('half');
        }}
        focus={focus}
        bottomInset={snap === 'full' ? 0 : sheetH}
        onDownload={() => nav.push(<OfflineDownloadScreen name={activating?.title ?? licenses[0]?.title} salesPageId={activating?.salesPageId ?? licenses[0]?.salesPageId} />)}
        topLeft={activating ? <PressurePicker day={pressureDay} onChange={setPressureDay} /> : undefined}
      />
      <Sheet header={<SheetHeader variant="drawer" title={title} action={action} />} snap={snap} onSnapChange={setSnap} onHeightChange={setSheetH}>
        {body}
      </Sheet>

      <ModalSheet open={!!info} onClose={() => setInfo(null)} title="Mer info" variant="page">
        {info && (
          <LicenseDetails
            license={info}
            onActivate={hunting && info.canBeActivated ? () => {
              setInfo(null);
              startActivation(info);
            } : undefined}
            onShowInMap={() => {
              setInfo(null);
              showInMap(info);
            }}
            onRules={() => window.open(store.offerById(info.salesPageId)?.inaturUrl, '_blank', 'noopener')}
            onReceipt={() => nav.toast('Kvitteringen åpnes på inatur.no.')}
            onOfferInfo={() => window.open(store.offerById(info.salesPageId)?.inaturUrl, '_blank', 'noopener')}
            onDownloadOfflineMap={() => {
              setInfo(null);
              nav.push(<OfflineDownloadScreen name={info.title} salesPageId={info.salesPageId} />);
            }}
          />
        )}
      </ModalSheet>
      <CaptureReportSheet target={report} onClose={() => setReport(null)} />
      <AlertDialog
        open={alert === 'offline'}
        title="Offline kart med jaktgrenser"
        message="Du kan laste ned offline kart med jaktgrenser for dette jaktkortet slik at du kan bruke appen uten mobildekning. Vil du laste ned nå?"
        confirmLabel="Last ned"
        onCancel={() => setAlert(null)}
        onConfirm={async () => {
          setAlert(null);
          try {
            const a = await store.downloadArea(activating?.title ?? 'Jaktområde', activating ? (store.offerById(activating.salesPageId)?.location ?? [14, 64.5]) : [14, 64.5], activating?.salesPageId);
            nav.toast(`Offline kart lastet ned (${a.sizeMb} MB).`);
          } catch (e) {
            nav.toast(errorMessage(e));
          }
        }}
      />
      <AlertDialog
        open={alert === 'tracking'}
        title="Løypesporing"
        message="Ved å aktivere sporing vil appen tegne hvor du beveger deg i kartet. Ønsker du aktivere sporing nå?"
        confirmLabel="Start sporing"
        onCancel={() => setAlert(store.offlineAreas.some((a) => a.salesPageId === activating?.salesPageId) ? null : 'offline')}
        onConfirm={() => {
          setAlert(null);
          nav.toast('Sporing er startet. Ruten lagres på telefonen.');
        }}
      />
    </div>
  );
}
