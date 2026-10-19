import { useState } from 'react';
import { Button } from '../../components/Button';
import { Callout, Notice } from '../../components/Notice';
import { SegmentedControl } from '../../components/SegmentedControl';
import { Icon } from '../../icons/Icon';
import { startOfDay } from '../../domain/format';
import type { Activation, HuntingLicense } from '../../domain/license';
import type { SpeciesGroup } from '../../domain/species';
import { useStore } from '../../data/DemoStore';
import { OfflineError } from '../../data/repositories';
import { useNav } from '../../app/AppContext';
import { PushedScreen, ScreenTitle, useMapSheet } from '../../app/widgets';
import { ReportCaptureScreen } from '../report/ReportCaptureScreen';
import { ActivationCard } from './ActivationCard';
import { ActivationScreen } from './ActivationScreen';
import { LicenseCard, LicenseDetails } from './LicenseCard';

/** Mine jakt- eller fiskekort («Hunting Cards View», «Fishing Cards Views»). */
export function MyCardsScreen({ group }: { group: SpeciesGroup }) {
  const store = useStore();
  const nav = useNav();
  const showMap = useMapSheet();
  const [tab, setTab] = useState(0);
  const hunting = group === 'game';
  const today = startOfDay(new Date()).getTime();
  const download = () => nav.toast('Kartområdet lastes ned for bruk uten dekning.');

  const activate = (l: HuntingLicense) => nav.push(<ActivationScreen license={l} onDone={() => setTab(1)} />);
  const details = (l: HuntingLicense) =>
    nav.push(
      <PushedScreen title={`Kortnr ${l.cardNumber}`}>
        <LicenseDetails
          license={l}
          onActivate={hunting ? () => activate(l) : undefined}
          onShowInMap={() => showMap(l.title)}
          onRules={() => {}}
          onReceipt={() => {}}
          onOfferInfo={() => {}}
          onDownloadOfflineMap={download}
        />
      </PushedScreen>,
    );
  const remove = async (a: Activation) => {
    try {
      await store.removeActivation(a);
      nav.toast('Aktiveringen er fjernet.');
    } catch (e) {
      if (e instanceof OfflineError) nav.toast(e.message);
    }
  };

  const licenses = store.licenses(group);
  const activations = store.activations();

  return (
    <div className="h-full overflow-y-auto bg-surface-secondary pb-l">
      <ScreenTitle title={hunting ? 'Mine jaktkort' : 'Mine fiskekort'} />
      {hunting && (
        <div className="px-s">
          <SegmentedControl label="Visning" segments={['Jaktkort', 'Aktiveringer']} selectedIndex={tab} onChange={setTab} />
        </div>
      )}
      <div className="flex flex-col gap-s p-s">
        {!hunting || tab === 0 ? (
          <>
            {licenses.length === 0 && <Notice text={`Du har ingen ${hunting ? 'jaktkort' : 'fiskekort'}. Finn et tilbud under Tilbud.`} />}
            {licenses.map((l) => (
              <LicenseCard key={l.cardNumber} license={l} onActivate={hunting ? () => activate(l) : undefined} onInfo={() => details(l)} onShowInMap={() => showMap(l.title)} />
            ))}
            <Callout
              text="Last ned offline kartområder med jaktgrenser dersom du skal jakte i områder uten mobildekning."
              action={<Button label="Last ned her" variant="secondary" leadingIcon={<Icon name="downloadFromCloud" />} onClick={download} />}
            />
          </>
        ) : (
          <>
            {activations.length === 0 && <Notice text={'Du har ingen aktiveringer.\nHusk å aktivere jaktkortet ditt før du går på jakt.'} />}
            {activations.map((a) => {
              const future = a.date.getTime() > today;
              return (
                <ActivationCard
                  key={a.id}
                  activation={a}
                  onRemove={future ? () => remove(a) : undefined}
                  onReportCapture={!future && !store.isReported(a) ? () => nav.push(<ReportCaptureScreen activation={a} />) : undefined}
                  onReceipt={() => {}}
                  onShowInMap={() => showMap(a.licenseTitle)}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
