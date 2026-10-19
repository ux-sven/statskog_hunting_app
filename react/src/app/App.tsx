import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { BottomNav, type BottomNavItem } from '../components/BottomNav';
import { ModalSheet, OverlayRoot } from '../components/ModalSheet';
import { useStore } from '../data/AppStore';
import { formatTime } from '../domain/format';
import { CardsScreen } from '../features/cards/CardsScreen';
import { OffersScreen } from '../features/offers/OffersScreen';
import { ReportingScreen } from '../features/report/ReportingScreen';
import { SettingsScreen } from '../features/settings/SettingsScreen';
import { Onboarding } from '../features/onboarding/Onboarding';
import { LoginForm } from '../features/onboarding/LoginForm';
import { ComponentCatalog } from '../catalog/ComponentCatalog';
import { AppContext, type AppNav, type TabId } from './AppContext';

interface Tab extends BottomNavItem {
  id: TabId;
  render: () => ReactNode;
}

function useTheme(mode: 'light' | 'dark' | 'system') {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const dark = mode === 'dark' || (mode === 'system' && mq.matches);
      document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [mode]);
}

/** Statskog Jakt & fiske. På brede skjermer vises appen i telefonbredde. */
export function App() {
  const store = useStore();
  useTheme(store.settings.themeMode);
  const [current, setCurrent] = useState<TabId>('tilbud');
  const [stack, setStack] = useState<ReactNode[]>([]);
  const [toast, setToast] = useState<{ text: string; id: number } | null>(null);
  const [login, setLogin] = useState(false);
  const catalogOnly = location.hash === '#katalog';

  useEffect(() => {
    void store.start();
  }, [store]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);
  useEffect(() => {
    if (store.error) {
      setToast({ text: store.error, id: Date.now() });
      store.error = null;
    }
  }, [store, store.error]);

  const push = useCallback((s: ReactNode) => setStack((st) => [...st, s]), []);
  const pop = useCallback(() => setStack((st) => st.slice(0, -1)), []);
  const nav: AppNav = useMemo(
    () => ({
      push,
      pop,
      toast: (text) => setToast({ text, id: Date.now() }),
      goTo: (tab) => {
        setStack([]);
        setCurrent(tab);
      },
      login: () => setLogin(true),
    }),
    [push, pop],
  );

  const s = store.settings;
  const locked = !store.loggedIn;
  const tabs: Tab[] = [
    ...(s.showOffersTab || locked ? [{ id: 'tilbud', icon: 'priceTag', label: 'Tilbud', render: () => <OffersScreen /> } as Tab] : []),
    ...(s.showHuntingTab ? [{ id: 'jaktkort', icon: 'accuracy', label: 'Jaktkort', disabled: locked, render: () => <CardsScreen group="game" /> } as Tab] : []),
    ...(s.showFishingTab ? [{ id: 'fiskekort', icon: 'fishingHook', label: 'Fiskekort', disabled: locked, render: () => <CardsScreen group="fish" /> } as Tab] : []),
    { id: 'fangstrapport', icon: 'report', label: 'Fangstrapport', disabled: locked, render: () => <ReportingScreen /> },
    { id: 'innstillinger', icon: 'settings', label: 'Innstillinger', render: () => <SettingsScreen /> },
  ];
  const index = Math.max(0, tabs.findIndex((t) => t.id === current));

  const frame = (children: ReactNode) => (
    <AppContext.Provider value={nav}>
      <div className="flex h-full justify-center bg-[color-mix(in_srgb,var(--surface-tertiary)_15%,var(--surface-primary))]">
        <div className="relative flex h-full w-full max-w-[440px] flex-col overflow-hidden bg-surface-primary">
          {children}
          <OverlayRoot />
          {toast && (
            <div key={toast.id} role="status" className="absolute inset-x-m bottom-[84px] z-50 rounded-medium bg-surface-invert px-m py-s type-body-small text-text-invert shadow-map">
              {toast.text}
            </div>
          )}
        </div>
      </div>
    </AppContext.Provider>
  );

  if (catalogOnly) return frame(<div className="h-full overflow-y-auto"><ComponentCatalog /></div>);
  if (!s.onboardingDone) return frame(<Onboarding />);

  return frame(
    <>
      {!store.online && (
        <div role="status" className="shrink-0 bg-attention-warning px-m py-[4px] text-center type-body-small text-text-invert">
          Uten dekning – viser lagrede data{store.syncedAt ? ` fra ${formatTime(store.syncedAt)}` : ''}
          {store.pendingReports ? ` · ${store.pendingReports} rapport venter` : ''}
        </div>
      )}
      <main className="relative min-h-0 flex-1" key={tabs[index].id}>
        {tabs[index].render()}
      </main>
      <BottomNav items={tabs} selectedIndex={index} onChange={(i) => setCurrent(tabs[i].id)} />
      {stack.map((screen, i) => (
        <div key={i} className="absolute inset-0 z-30 bg-surface-primary animate-[slide-in_200ms_ease-out]">
          {screen}
        </div>
      ))}
      <ModalSheet open={login} onClose={() => setLogin(false)} title="Logg inn" variant="stack">
        <div className="p-l">
          <LoginForm
            onDone={() => {
              setLogin(false);
              nav.toast(`Velkommen, ${store.user?.name ?? ''}!`);
            }}
          />
        </div>
      </ModalSheet>
    </>,
  );
}
