import { createContext, useContext, type ReactNode } from 'react';

/** Navigasjon og meldinger for prototypen (tilsvarer Navigator og SnackBar i Flutter). */
export interface AppNav {
  /** Åpner en skjerm over bunnmenyen. */
  push: (screen: ReactNode) => void;
  /** Lukker øverste skjerm. */
  pop: () => void;
  /** Viser en kort melding nederst. */
  toast: (text: string) => void;
  /** Åpner et ark nederst. */
  openSheet: (content: ReactNode) => void;
  closeSheet: () => void;
}

export const AppContext = createContext<AppNav | null>(null);

export function useNav() {
  const nav = useContext(AppContext);
  if (!nav) throw new Error('useNav må brukes inne i <App>');
  return nav;
}
