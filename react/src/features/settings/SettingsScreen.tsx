import type { ReactNode } from 'react';
import { ListTile } from '../../components/ListTile';
import { useStore, type ThemeMode } from '../../data/DemoStore';
import { useNav } from '../../app/AppContext';
import { PushedScreen, ScreenTitle } from '../../app/widgets';
import { ComponentCatalog } from '../../catalog/ComponentCatalog';

function Group({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="px-m pt-m">
      {title && <h2 className="m-0 mb-xs type-headline-h2 font-normal text-text-primary">{title}</h2>}
      <div className="overflow-hidden rounded-medium">{children}</div>
    </section>
  );
}

const themeLabel: Record<ThemeMode, string> = { light: 'Lys', dark: 'Mørk', system: 'Som på enhet' };
const nextTheme: Record<ThemeMode, ThemeMode> = { light: 'dark', dark: 'system', system: 'light' };

/** Innstillinger (eksempelvisningen «Settings»). */
export function SettingsScreen() {
  const store = useStore();
  const nav = useNav();
  return (
    <div className="h-full overflow-y-auto bg-surface-secondary pb-l">
      <ScreenTitle title="Innstillinger" />
      <Group title="Generelt">
        <ListTile title="Min profil" icon="account" onClick={() => {}} />
        <ListTile title="Varslinger" icon="notification" onClick={() => {}} />
        <ListTile title="Mørk / Lys modus" subtitle={themeLabel[store.themeMode]} layout="inline" icon="modeSwitch" showSeparator={false} onClick={() => store.setThemeMode(nextTheme[store.themeMode])} />
      </Group>
      <Group title="Oppsett meny">
        <ListTile title="Vis tilbud i menyen" icon="priceTag" toggle={{ checked: store.showOffersTab, onChange: (v) => store.setTabVisible({ offers: v }) }} />
        <ListTile title="Vis mine jaktkort i menyen" icon="accuracy" toggle={{ checked: store.showHuntingTab, onChange: (v) => store.setTabVisible({ hunting: v }) }} />
        <ListTile title="Vis mine fiskekort i menyen" icon="fishingHook" showSeparator={false} toggle={{ checked: store.showFishingTab, onChange: (v) => store.setTabVisible({ fishing: v }) }} />
      </Group>
      <Group title="Offline kart">
        <ListTile title="Last ned offline områder" icon="downloadFromCloud" onClick={() => nav.toast('Velg område i kartet for å laste ned.')} />
        <ListTile title="Mine nedlastede områder" icon="map" onClick={() => {}} showSeparator={false} />
      </Group>
      <Group title="Prototype">
        <ListTile title="Simuler uten dekning" subtitle="Fangstrapporter venter, aktivering krever nett" icon="noMap" toggle={{ checked: store.offline, onChange: (v) => store.setOffline(v) }} />
        <ListTile
          title="Komponentkatalog"
          icon="editFolder"
          showSeparator={false}
          onClick={() =>
            nav.push(
              <PushedScreen title="Komponentkatalog">
                <ComponentCatalog />
              </PushedScreen>,
            )
          }
        />
      </Group>
      <Group>
        <ListTile title="Logg ut" icon="logout" showSeparator={false} onClick={() => nav.toast('Innlogging med Inatur kommer i neste versjon.')} />
      </Group>
    </div>
  );
}
