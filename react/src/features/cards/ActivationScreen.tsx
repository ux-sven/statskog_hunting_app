import { useState } from 'react';
import { Button } from '../../components/Button';
import { Notice } from '../../components/Notice';
import type { HuntingLicense } from '../../domain/license';
import { useStore } from '../../data/DemoStore';
import { OfflineError } from '../../data/repositories';
import { useNav } from '../../app/AppContext';
import { PushedScreen } from '../../app/widgets';
import { DayPicker } from './DayPicker';
import { LicenseSummary } from './LicenseSummary';

/** Aktiver jaktkort for én eller flere dager («Activation View»). */
export function ActivationScreen({ license, onDone }: { license: HuntingLicense; onDone?: () => void }) {
  const store = useStore();
  const nav = useNav();
  const [days, setDays] = useState<Set<number>>(new Set());
  const [busy, setBusy] = useState(false);
  const n = days.size;

  const submit = async () => {
    setBusy(true);
    try {
      await store.activate(license, [...days].sort().map((t) => new Date(t)));
      nav.toast(n === 1 ? 'Jaktkortet er aktivert.' : `Jaktkortet er aktivert for ${n} dager.`);
      nav.pop();
      onDone?.();
    } catch (e) {
      if (e instanceof OfflineError) nav.toast(e.message);
      else throw e;
    } finally {
      setBusy(false);
    }
  };

  return (
    <PushedScreen
      title="Aktiver jaktkort"
      footer={<Button label={n === 0 ? 'Velg minst én dag' : n === 1 ? 'Aktiver 1 dag' : `Aktiver ${n} dager`} variant="accent" expand disabled={n === 0 || busy} onClick={submit} />}
    >
      <LicenseSummary license={license} />
      <h2 className="m-0 px-m pt-m pb-xs type-subtitle-large font-normal text-text-primary">Velg dager du skal jakte</h2>
      <p className="m-0 px-m type-body-small text-text-secondary">Tallet nederst viser hvor mange som har aktivert den dagen.</p>
      <div className="px-m pt-s">
        <DayPicker
          slots={store.activationSlots(license)}
          selected={days}
          onToggle={(d) => {
            const next = new Set(days);
            if (next.has(d.getTime())) next.delete(d.getTime());
            else next.add(d.getTime());
            setDays(next);
          }}
        />
      </div>
      {store.offline && <Notice className="m-m" text="Du er uten dekning. Aktivering krever nett." />}
    </PushedScreen>
  );
}
