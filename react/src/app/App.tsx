import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { BottomNav, type BottomNavItem } from '../components/BottomNav';
import { useStore } from '../data/DemoStore';
import { MyCardsScreen } from '../features/cards/MyCardsScreen';
import { OffersScreen } from '../features/offers/OffersScreen';
import { ReportingHomeScreen } from '../features/report/ReportingHomeScreen';
import { SettingsScreen } from '../features/settings/SettingsScreen';
import { ComponentCatalog } from '../catalog/ComponentCatalog';
import { AppContext, type AppNav } from './AppContext';

interface Tab extends BottomNavItem {
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

/** Statskog Jakt & fiske – appen. På brede skjermer vises den i telefonbredde. */
export function App() {
  const store = useStore();
  useTheme(store.themeMode);
  const [current, setCurrent] = useState('Tilbud');
  const [stack, setStack] = useState<ReactNode[]>([]);
  const [sheet, setSheet] = useState<ReactNode | null>(null);
  const [toast, setToast] = useState<{ text: string; id: number } | null>(null);
  const catalogOnly = location.hash === '#katalog';

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const push = useCallback((s: ReactNode) => setStack((st) => [...st, s]), []);
  const pop = useCallback(() => setStack((st) => st.slice(0, -1)), []);
  const nav: AppNav = useMemo(
    () => ({
      push,
      pop,
      toast: (text) => setToast({ text, id: Date.now() }),
      openSheet: setSheet,
      closeSheet: () => setSheet(null),
    }),
    [push, pop],
  );

  const tabs: Tab[] = [
    ...(store.showOffersTab ? [{ icon: 'priceTag', label: 'Tilbud', render: () => <OffersScreen /> } as Tab] : []),
    ...(store.showHuntingTab ? [{ icon: 'accuracy', label: 'Jaktkort', render: () => <MyCardsScreen group="game" /> } as Tab] : []),
    ...(store.showFishingTab ? [{ icon: 'fishingHook', label: 'Fiskekort', render: () => <MyCardsScreen group="fish" /> } as Tab] : []),
    { icon: 'report', label: 'Fangstrapport', render: () => <ReportingHomeScreen /> },
    { icon: 'settings', label: 'Innstillinger', render: () => <SettingsScreen /> },
  ];
  const index = Math.max(0, tabs.findIndex((t) => t.label === current));

  if (catalogOnly) {
    return (
      <AppContext.Provider value={nav}>
        <ComponentCatalog />
      </AppContext.Provider>
    );
  }

  return (
    <AppContext.Provider value={nav}>
      <div className="flex h-full justify-center bg-[color-mix(in_srgb,var(--surface-tertiary)_15%,var(--surface-primary))]">
        <div className="relative flex h-full w-full max-w-[440px] flex-col overflow-hidden bg-surface-primary">
          {store.offline && (
            <div role="status" className="bg-attention-warning px-m py-[4px] text-center type-body-small text-text-invert">
              Uten dekning – viser lagrede data
            </div>
          )}
          <main className="min-h-0 flex-1" key={tabs[index].label}>
            {tabs[index].render()}
          </main>
          <BottomNav items={tabs} selectedIndex={index} onChange={(i) => setCurrent(tabs[i].label)} />

          {stack.map((s, i) => (
            <div key={i} className="absolute inset-0 z-10 bg-surface-primary animate-[slide-in_200ms_ease-out]">
              {s}
            </div>
          ))}

          {sheet && (
            <div className="absolute inset-0 z-20 flex flex-col justify-end bg-shade-primary" onClick={() => setSheet(null)}>
              <div role="dialog" aria-modal className="rounded-t-xlarge bg-surface-primary pt-xs" onClick={(e) => e.stopPropagation()}>
                <button type="button" aria-label="Lukk" onClick={() => setSheet(null)} className="mx-auto mb-s block h-[4px] w-[48px] rounded-full bg-border-secondary cursor-pointer" />
                {sheet}
              </div>
            </div>
          )}

          {toast && (
            <div key={toast.id} role="status" className="absolute inset-x-m bottom-[80px] z-30 rounded-medium bg-surface-invert px-m py-s type-body-small text-text-invert shadow-map">
              {toast.text}
            </div>
          )}
        </div>
      </div>
    </AppContext.Provider>
  );
}
