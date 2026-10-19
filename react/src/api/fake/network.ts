// Innstillinger for det simulerte nettverket. Styres fra Innstillinger → Utvikler.

export interface NetworkSettings {
  /** Svartid i millisekunder for hvert kall. */
  latencyMs: number;
  /** Simulerer at telefonen er uten dekning. */
  offline: boolean;
  /** Andel kall som feiler med 503 (0–1), for å teste feilhåndtering. */
  errorRate: number;
}

const KEY = 'jf.fake.network';
const read = (): NetworkSettings => {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    if (s) return { latencyMs: 400, offline: false, errorRate: 0, ...s };
  } catch {
    /* ingen lagring */
  }
  return { latencyMs: 400, offline: false, errorRate: 0 };
};

let settings = read();
const listeners = new Set<() => void>();

export const network = {
  get: () => settings,
  set(patch: Partial<NetworkSettings>) {
    settings = { ...settings, ...patch };
    try {
      localStorage.setItem(KEY, JSON.stringify(settings));
    } catch {
      /* ingen lagring */
    }
    listeners.forEach((l) => l());
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  /** Er appen på nett (simulert og ekte)? */
  isOnline: () => !settings.offline && (typeof navigator === 'undefined' || navigator.onLine !== false),
};
