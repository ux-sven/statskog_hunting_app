import type {
  FishingPermit, InaturUser, Paginated, PermitActivation, SalesPagePreview, SalesPagesQuery,
  SubareaDayCount, SubareaInfo, TokenResponse, UnactivatedPermit,
} from './types';

/** Feil fra API-et (HTTP-status 4xx/5xx). */
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

/** Ingen kontakt med tjenesten (uten dekning, tidsavbrudd). */
export class NetworkError extends Error {
  constructor(message = 'Ingen nettilkobling') {
    super(message);
  }
}

export interface InaturClientOptions {
  /** F.eks. https://inatur-test.inatur.no/api/external */
  baseUrl: string;
  /** Lar oss bytte ut nettverket med den falske tjenesten. */
  fetch?: typeof fetch;
  /** Henter gjeldende tilgangstoken (null = ikke innlogget). */
  getToken?: () => string | null;
  timeoutMs?: number;
}

const toQuery = (q: Record<string, unknown>) => {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(q)) {
    if (v === undefined || v === null || v === '') continue;
    if (Array.isArray(v)) v.forEach((x) => p.append(k, String(x)));
    else p.set(k, String(v));
  }
  const s = p.toString();
  return s ? `?${s}` : '';
};

/**
 * Klient for Inatur API. Samme kode brukes mot den falske tjenesten og mot
 * test/produksjon – bare `baseUrl` og `fetch` er forskjellig.
 */
export class InaturClient {
  private readonly f: typeof fetch;
  constructor(private readonly opts: InaturClientOptions) {
    this.f = opts.fetch ?? fetch.bind(globalThis);
  }

  private async request<T>(method: string, path: string, body?: unknown, auth = true): Promise<T> {
    const headers: Record<string, string> = { Accept: 'application/json' };
    const token = this.opts.getToken?.();
    if (auth && token) headers.Authorization = `Bearer ${token}`;
    if (body !== undefined) headers['Content-Type'] = body instanceof URLSearchParams ? 'application/x-www-form-urlencoded' : 'application/json';
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), this.opts.timeoutMs ?? 15000);
    let res: Response;
    try {
      res = await this.f(this.opts.baseUrl + path, {
        method,
        headers,
        body: body === undefined ? undefined : body instanceof URLSearchParams ? body : JSON.stringify(body),
        signal: ctrl.signal,
      });
    } catch {
      throw new NetworkError();
    } finally {
      clearTimeout(timer);
    }
    if (!res.ok) {
      let msg = res.statusText;
      try {
        const j = await res.json();
        msg = j.title ?? j.message ?? msg;
      } catch {
        /* tom */
      }
      throw new ApiError(res.status, msg);
    }
    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
  }

  // ---------- Innlogging ----------
  /**
   * PROTOTYPE: designet viser brukernavn og passord i appen. Inatur støtter
   * bare Authorization Code + PKCE (innlogging i nettleser med retur til
   * appen). Den falske tjenesten godtar dette forenklede kallet.
   */
  login(username: string, password: string) {
    return this.request<TokenResponse>('POST', '/oauth/token', new URLSearchParams({ grant_type: 'password', username, password }), false);
  }

  // ---------- Tilbud ----------
  salesPages(q: SalesPagesQuery = {}) {
    return this.request<Paginated<SalesPagePreview> & { totalCount: number }>('GET', `/v1/sales-pages${toQuery({ ...q })}`, undefined, false);
  }
  subareas(salesPageId: string) {
    return this.request<{ items: SubareaInfo[] }>('GET', `/v1/sales-pages/${salesPageId}/activations/subareas`);
  }
  activationCounts(salesPageId: string, subareaIds: string[], fromDate: string, toDate: string) {
    return this.request<{ items: SubareaDayCount[] }>('GET', `/v1/sales-pages/${salesPageId}/activations${toQuery({ subareaIds, fromDate, toDate })}`);
  }

  // ---------- Bruker og kort ----------
  user() {
    return this.request<InaturUser>('GET', '/v1/user');
  }
  updateInterests(user: InaturUser, interests: InaturUser['interests']) {
    return this.request<InaturUser>('PUT', '/v1/user', { ...user, interests });
  }
  permits() {
    return this.request<Paginated<UnactivatedPermit>>('GET', '/v1/permits');
  }
  activations() {
    return this.request<Paginated<PermitActivation>>('GET', '/v1/activations');
  }
  activate(permitId: string, subareaId: string, date: string) {
    return this.request<{ activationId: string }>('POST', `/v1/activations${toQuery({ permitId, subareaId, date })}`);
  }
  removeActivation(activationId: string) {
    return this.request<void>('DELETE', `/v1/activations/${activationId}`);
  }
  fishingPermits() {
    return this.request<{ items: FishingPermit[] }>('GET', '/v1/fishing-permits');
  }
}
