import { ExpandableSection } from '../../components/SectionHeader';
import { ListTile } from '../../components/ListTile';
import { Notice } from '../../components/Notice';
import { formatDate, startOfDay } from '../../domain/format';
import { useStore } from '../../data/DemoStore';
import { reportTotal } from '../../data/repositories';
import { useNav } from '../../app/AppContext';
import { ScreenTitle, useMapSheet } from '../../app/widgets';
import { ActivationCard } from '../cards/ActivationCard';
import { ReportCaptureScreen } from './ReportCaptureScreen';

/** Oversikt over fangstrapportering («Reporting Home View»). */
export function ReportingHomeScreen() {
  const store = useStore();
  const nav = useNav();
  const showMap = useMapSheet();
  const today = startOfDay(new Date()).getTime();
  const toReport = store.activations().filter((a) => a.date.getTime() <= today && !store.isReported(a));
  const reports = store.reports();
  const pending = store.pendingReports;

  return (
    <div className="h-full overflow-y-auto bg-surface-secondary pb-l">
      <ScreenTitle title="Fangstrapportering" />
      {pending > 0 && (
        <Notice
          className="mx-s mb-s"
          icon="synchronize"
          text={pending === 1 ? '1 fangstrapport venter på dekning og sendes automatisk.' : `${pending} fangstrapporter venter på dekning og sendes automatisk.`}
        />
      )}
      <ExpandableSection title="Til rapportering">
        <div className="flex flex-col gap-xs px-s">
          {toReport.length === 0 && <Notice text="Du har ingen jaktdager som venter på rapport." />}
          {toReport.map((a) => (
            <ActivationCard key={a.id} activation={a} onReportCapture={() => nav.push(<ReportCaptureScreen activation={a} />)} onShowInMap={() => showMap(a.licenseTitle)} />
          ))}
        </div>
      </ExpandableSection>
      <ExpandableSection title="Tidligere rapporteringer" className="mt-m">
        {reports.length === 0 && <Notice className="mx-s" text="Rapporter du sender, vises her." />}
        <div>
          {reports.map((r, i) => {
            const t = reportTotal(r);
            return (
              <ListTile
                key={i}
                title={`${formatDate(r.activation.date)} · ${r.activation.municipality}`}
                subtitle={[r.hunted ? (t === 0 ? 'Ingen fangst' : `${t} stk`) : 'Jaktet ikke', r.synced ? 'Sendt' : 'Venter på dekning'].join(' · ')}
                icon={r.synced ? 'report' : 'synchronize'}
              />
            );
          })}
        </div>
      </ExpandableSection>
    </div>
  );
}
