import { useState } from 'react';
import { Button } from '../../components/Button';
import { ListTile } from '../../components/ListTile';
import { Notice } from '../../components/Notice';
import { MetaRow } from '../../components/MetaRow';
import { SpeciesIcon } from '../../icons/SpeciesIcon';
import { useNav } from '../../app/AppContext';
import { LoginPrompt, ScreenTitle, SyncStatus } from '../../app/widgets';
import { useStore } from '../../data/AppStore';
import { formatDate } from '../../domain/format';
import { reportTotal } from '../../domain/license';
import { speciesById, type SpeciesId } from '../../domain/species';
import { CardFrame, CardNumberHeader } from '../cards/CardParts';
import { CaptureReportSheet, type ReportTarget } from './CaptureReportSheet';

/** Fangstrapportering (Figma «Fangstrapport 1»). */
export function ReportingScreen() {
  const store = useStore();
  const nav = useNav();
  const [target, setTarget] = useState<ReportTarget | null>(null);
  const [all, setAll] = useState(false);
  if (!store.loggedIn)
    return (
      <div className="h-full overflow-y-auto bg-surface-secondary">
        <ScreenTitle title="Fangstrapportering" />
        <LoginPrompt text="Logg inn med Inatur-brukeren din for å rapportere fangst." />
      </div>
    );
  const due = store.toReport();
  const reported = new Set(store.reports().map((r) => r.permitId));
  const fishDue = store.licenses('fish').filter((l) => !l.expired && !l.reportDelivered && !reported.has(l.id));
  const reports = store.reports();
  const shown = all ? reports : reports.slice(0, 4);
  return (
    <div className="h-full overflow-y-auto bg-surface-secondary pb-l">
      <ScreenTitle title="Fangstrapportering" />
      <SyncStatus />
      {store.pendingReports > 0 && (
        <Notice
          className="mx-s mt-xs"
          icon="synchronize"
          text={store.pendingReports === 1 ? '1 fangstrapport venter på dekning og sendes automatisk.' : `${store.pendingReports} fangstrapporter venter på dekning og sendes automatisk.`}
        />
      )}
      <div className="flex flex-col gap-s p-s">
        {!due.length && !fishDue.length && <Notice text="Du har ingen jakt- eller fiskedager som venter på rapport." />}
        {due.map((a) => {
          const l = store.licenseById(a.permitId);
          if (!l) return null;
          return (
            <CardFrame key={a.id} className="flex flex-col gap-s">
              <CardNumberHeader cardNumber={l.cardNumber} cardType={l.cardType} />
              <h2 className="m-0 type-subtitle-large font-medium text-text-primary">{l.title}</h2>
              <MetaRow icon="schedule" text={`${formatDate(a.date)} · ${a.subareaName}`} iconClassName="text-attention-success" textClassName="type-body-large font-bold text-attention-success" />
              <Button label="Rapporter fangst" expand onClick={() => setTarget({ license: l, activation: a })} />
            </CardFrame>
          );
        })}
        {fishDue.map((l) => (
          <CardFrame key={l.id} className="flex flex-col gap-s">
            <CardNumberHeader cardNumber={l.cardNumber} cardType={l.cardType} />
            <h2 className="m-0 type-subtitle-large font-medium text-text-primary">{l.title}</h2>
            <MetaRow icon="schedule" text={l.validDates.map(formatDate).join(' - ')} iconClassName="text-attention-success" textClassName="type-body-large font-bold text-attention-success" />
            <Button label="Rapporter fangst" expand onClick={() => setTarget({ license: l })} />
          </CardFrame>
        ))}
      </div>
      <h2 className="m-0 px-m pt-m pb-xs type-headline-h1 font-normal text-text-primary">Tidligere rapporteringer</h2>
      <div className="mx-s overflow-hidden rounded-medium">
        <ListTile title="Stedfest tidligere registrerte fellinger" icon="location" onClick={() => nav.toast('Velg en rapport og trykk i kartet for å stedfeste.')} />
        <ListTile title="Registrer bilder på tidligere fellinger" icon="camera" onClick={() => nav.toast('Bilder kan legges til når fangstrapporten er sendt.')} showSeparator={false} />
      </div>
      <ul className="m-s list-none overflow-hidden rounded-medium bg-surface-primary p-0">
        {!reports.length && <li className="p-m type-body-small text-text-secondary">Rapporter du sender, vises her.</li>}
        {shown.map((r) => {
          const species = Object.entries(r.catches).filter(([, n]) => n) as Array<[SpeciesId, number]>;
          return (
            <li key={r.id} className="flex gap-s border-b border-border-primary p-m last:border-0">
              <span className="w-[86px] shrink-0 type-body-small font-bold text-text-primary">{formatDate(r.date)}</span>
              <span className="flex flex-1 flex-col gap-[2px] type-body-small text-text-primary">
                {species.length ? (
                  species.map(([s, n]) => (
                    <span key={s} className="flex items-center gap-xs">
                      <SpeciesIcon species={s} size={22} decorative />
                      {speciesById(s).label} {n > 1 ? `(${n})` : ''}
                    </span>
                  ))
                ) : (
                  <span>{r.status === 'notHunted' ? 'Jaktet ikke' : 'Ingen fangst'}</span>
                )}
                <span className="type-body-xsmall text-text-secondary">
                  {r.licenseTitle}
                  {r.subareaName ? ` · ${r.subareaName}` : ''} · {r.synced ? 'Sendt' : 'Venter på dekning'}
                  {reportTotal(r) ? '' : ''}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
      {reports.length > 4 && !all && (
        <div className="px-s">
          <Button label="Vis flere rapporteringer" variant="tertiary" expand onClick={() => setAll(true)} />
        </div>
      )}
      <CaptureReportSheet target={target} onClose={() => setTarget(null)} />
    </div>
  );
}
