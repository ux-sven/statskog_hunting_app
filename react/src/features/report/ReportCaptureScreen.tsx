import { useState } from 'react';
import { Button } from '../../components/Button';
import { MetaRow } from '../../components/MetaRow';
import { Notice } from '../../components/Notice';
import { SegmentedControl } from '../../components/SegmentedControl';
import { formatDate } from '../../domain/format';
import type { Activation } from '../../domain/license';
import { speciesById, type SpeciesId } from '../../domain/species';
import { useStore } from '../../data/DemoStore';
import { useNav } from '../../app/AppContext';
import { PushedScreen } from '../../app/widgets';
import { FilterOptionTile } from '../filter/FilterOptionTile';

const reportSpecies: SpeciesId[] = ['lirype', 'fjellrype', 'orrfugl', 'tiur', 'jerpe', 'hare', 'rodrev'];

/**
 * Lever fangstrapport for en aktivering («Report Capture Hunting»).
 * Rapporten lagres på telefonen og sendes til Jaktdatabasen når det er nett.
 */
export function ReportCaptureScreen({ activation: a }: { activation: Activation }) {
  const store = useStore();
  const nav = useNav();
  const [mode, setMode] = useState(0); // 0 = jaktet, 1 = jaktet ikke
  const [counts, setCounts] = useState<Partial<Record<SpeciesId, number>>>({});
  const total = Object.values(counts).reduce<number>((x, y) => x + (y ?? 0), 0);

  const send = async () => {
    const catches = mode === 0 ? Object.fromEntries(Object.entries(counts).filter(([, v]) => v)) : {};
    await store.submit({ activation: a, catches, hunted: mode === 0, createdAt: new Date() });
    nav.toast(store.offline ? 'Fangstrapporten er lagret og sendes når du får dekning.' : 'Takk! Fangstrapporten er sendt.');
    nav.pop();
  };

  return (
    <PushedScreen
      title="Fangstrapport"
      footer={<Button label={mode === 1 ? 'Send rapport' : total === 0 ? 'Send rapport uten fangst' : `Send rapport (${total})`} expand onClick={send} />}
    >
      <div className="flex flex-col gap-s p-m">
        <MetaRow icon="contact" text={`${a.licenseTitle} (${a.cardNumber})`} textClassName="type-body-large text-text-secondary" />
        <MetaRow icon="schedule" text={formatDate(a.date)} textClassName="type-body-large font-bold text-text-primary" />
        <SegmentedControl label="Jaktet du?" className="mt-[4px]" segments={['Jeg jaktet', 'Jeg jaktet ikke']} selectedIndex={mode} onChange={setMode} />
      </div>
      {mode === 0 ? (
        <>
          <h2 className="m-0 px-m pb-xs type-subtitle-large font-normal text-text-primary">Hva fikk du?</h2>
          <ul className="m-0 list-none divide-y divide-border-primary border-b border-border-primary p-0">
            {reportSpecies.map((s) => (
              <li key={s}>
                <FilterOptionTile kind="counter" label={speciesById(s).label} species={s} count={counts[s] ?? 0} onChange={(v) => setCounts({ ...counts, [s]: v })} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Notice className="mx-m" text="Du rapporterer at du ikke jaktet denne dagen. Det er også viktig for forvaltningen." />
      )}
    </PushedScreen>
  );
}
