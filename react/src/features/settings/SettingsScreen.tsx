import type { ReactNode } from 'react';
import { ListTile } from '../../components/ListTile';
import { Radio } from '../../components/Radio';
import { Button } from '../../components/Button';
import { Notice } from '../../components/Notice';
import { useStore, type ThemeMode } from '../../data/AppStore';
import { network } from '../../api/fake/network';
import { fakeServerState, resetFakeServer } from '../../api/fake/server';
import { useNav } from '../../app/AppContext';
import { PushedScreen, ScreenTitle } from '../../app/widgets';
import { ComponentCatalog } from '../../catalog/ComponentCatalog';
import { useSyncExternalStore } from 'react';
import { OfflineMapsScreen } from './OfflineMapsScreens';

function Group({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="px-m pt-m">
      {title && <h2 className="m-0 mb-xs type-headline-h2 font-normal text-text-primary">{title}</h2>}
      <div className="overflow-hidden rounded-medium">{children}</div>
    </section>
  );
}

const themeLabel: Record<ThemeMode, string> = { light: 'Lys', dark: 'Mørk', system: 'Som på enhet' };

function ThemeScreen() {
  const store = useStore();
  return (
    <PushedScreen title="Mørk / lys modus">
      <div role="radiogroup" aria-label="Fargemodus" className="m-m flex flex-col overflow-hidden rounded-medium bg-surface-primary">
        {(['system', 'light', 'dark'] as ThemeMode[]).map((m) => (
          <div key={m} className="border-b border-border-primary p-m last:border-0">
            <Radio value={m} groupValue={store.settings.themeMode} label={themeLabel[m]} onChange={(v) => store.setThemeMode(v)} />
          </div>
        ))}
      </div>
    </PushedScreen>
  );
}

function ProfileScreen() {
  const store = useStore();
  const u = store.user;
  return (
    <PushedScreen title="Min profil">
      <dl className="m-m flex flex-col gap-xs rounded-medium bg-surface-primary p-m type-body-medium">
        {[
          ['Navn', u?.name],
          ['Jegernummer', u?.huntingNumber],
          ['Epost', u?.email],
          ['Telefon', u?.phoneNumber ? `${u.phoneNumber.countryCode} ${u.phoneNumber.number}` : undefined],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-s">
            <dt className="text-text-secondary">{k}</dt>
            <dd className="m-0 text-right text-text-primary">{v ?? '–'}</dd>
          </div>
        ))}
      </dl>
      <p className="mx-m type-body-small text-text-secondary">Profilen hentes fra Inatur. Endringer gjøres på inatur.no.</p>
    </PushedScreen>
  );
}

/** Styrer den falske Inatur-tjenesten: svartid, dekning, feil og eksempeldata. */
function DeveloperScreen() {
  const store = useStore();
  const nav = useNav();
  const s = useSyncExternalStore(network.subscribe, network.get);
  const server = fakeServerState();
  return (
    <PushedScreen title="Utvikler: falsk Inatur">
      <div className="flex flex-col gap-m p-m">
        <Notice text={store.fake ? 'Appen bruker den falske Inatur-tjenesten. Den svarer med samme adresser og dataformat som Inatur API.' : 'Appen bruker ekte Inatur API.'} />
        <div className="overflow-hidden rounded-medium">
          <ListTile title="Simuler uten dekning" subtitle="Kall feiler som uten nett" icon="noMap" toggle={{ checked: s.offline, onChange: (v) => network.set({ offline: v }) }} />
          <ListTile title="Treg tjeneste" subtitle={`Svartid ${s.latencyMs} ms`} icon="schedule" toggle={{ checked: s.latencyMs > 1000, onChange: (v) => network.set({ latencyMs: v ? 2500 : 400 }) }} />
          <ListTile title="Ustabil tjeneste" subtitle="Hvert tredje kall feiler med 503" icon="information" toggle={{ checked: s.errorRate > 0, onChange: (v) => network.set({ errorRate: v ? 0.33 : 0 }) }} showSeparator={false} />
        </div>
        <div className="rounded-medium bg-surface-primary p-m type-body-small text-text-primary">
          <p className="m-0">Aktiveringer på tjenesten: {server.activations.length}</p>
          <p className="m-0">Fangstrapporter mottatt i Jaktdatabasen: {server.catchReports.length}</p>
          <p className="m-0">Venter på å bli sendt fra appen: {store.pendingReports}</p>
          <p className="m-0">Innlogging for test: hvilket som helst brukernavn og passord (passordet «feil» gir feil).</p>
        </div>
        <Button
          label="Tilbakestill eksempeldata"
          variant="secondary"
          onClick={async () => {
            resetFakeServer();
            store.resetLocal();
            store.logout();
            await store.sync();
            nav.toast('Eksempeldataene er tilbakestilt. Logg inn på nytt.');
          }}
        />
      </div>
    </PushedScreen>
  );
}

/** Innstillinger (Figma «Settings» og «Settings ikke innlogget»). */
export function SettingsScreen() {
  const store = useStore();
  const nav = useNav();
  const s = store.settings;
  const theme = <ListTile title="Mørk / Lys modus" subtitle={themeLabel[s.themeMode]} layout="inline" icon="modeSwitch" onClick={() => nav.push(<ThemeScreen />)} showSeparator={store.loggedIn ? false : false} />;
  return (
    <div className="h-full overflow-y-auto bg-surface-secondary pb-l">
      <ScreenTitle title="Innstillinger" />
      <Group title="Generelt">
        {store.loggedIn && <ListTile title="Min profil" subtitle={store.user?.name} icon="account" onClick={() => nav.push(<ProfileScreen />)} />}
        {store.loggedIn && <ListTile title="Varslinger" icon="notification" onClick={() => nav.toast('Varslinger kommer i neste versjon.')} />}
        {theme}
      </Group>
      {store.loggedIn && (
        <Group title="Oppsett meny">
          <ListTile title="Vis tilbud i menyen" icon="priceTag" toggle={{ checked: s.showOffersTab, onChange: (v) => store.updateSettings({ showOffersTab: v }) }} />
          <ListTile title="Vis mine jaktkort i menyen" icon="accuracy" toggle={{ checked: s.showHuntingTab, onChange: (v) => store.updateSettings({ showHuntingTab: v }) }} />
          <ListTile title="Vis mine fiskekort i menyen" icon="fishingHook" showSeparator={false} toggle={{ checked: s.showFishingTab, onChange: (v) => store.updateSettings({ showFishingTab: v }) }} />
        </Group>
      )}
      <Group title="Offline kart">
        <ListTile title="Offline kart" subtitle={store.offlineAreas.length ? `${store.offlineAreas.length} nedlastet` : undefined} layout="inline" icon="map" onClick={() => nav.push(<OfflineMapsScreen />)} showSeparator={false} />
      </Group>
      <Group>
        {store.loggedIn ? (
          <ListTile title="Logg ut" icon="logout" showSeparator={false} onClick={() => store.logout()} />
        ) : (
          <ListTile title="Logg inn" icon="logout" showSeparator={false} onClick={nav.login} />
        )}
      </Group>
      <Group title="Prototype">
        <ListTile title="Utvikler: falsk Inatur" subtitle={store.online ? 'På nett' : 'Uten dekning'} icon="settings" onClick={() => nav.push(<DeveloperScreen />)} />
        <ListTile title="Vis introduksjonen på nytt" icon="play" onClick={() => store.updateSettings({ onboardingDone: false })} />
        <ListTile
          title="Komponentkatalog"
          icon="editFolder"
          showSeparator={false}
          onClick={() =>
            nav.push(
              <PushedScreen title="Komponentkatalog" className="bg-surface-primary">
                <ComponentCatalog />
              </PushedScreen>,
            )
          }
        />
      </Group>
    </div>
  );
}
