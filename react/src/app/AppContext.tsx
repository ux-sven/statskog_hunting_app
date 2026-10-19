import { createContext, useContext, type ReactNode } from 'react';

export type TabId = 'tilbud' | 'jaktkort' | 'fiskekort' | 'fangstrapport' | 'innstillinger';

/** Navigasjon og meldinger i appen. */
export interface AppNav {
  /** Åpner en side over bunnmenyen (innstillinger, offline kart …). */
  push: (screen: ReactNode) => void;
  /** Lukker øverste side. */
  pop: () => void;
  /** Viser en kort melding nederst. */
  toast: (text: string) => void;
  /** Bytter fane i bunnmenyen. */
  goTo: (tab: TabId) => void;
  /** Åpner innloggingen. */
  login: () => void;
}

export const AppContext = createContext<AppNav | null>(null);

export function useNav() {
  const nav = useContext(AppContext);
  if (!nav) throw new Error('useNav må brukes inne i <App>');
  return nav;
}
