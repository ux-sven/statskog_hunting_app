import { ApiError, NetworkError } from '../inatur/client';
import type { CatchReportPayload, FeatureCollection, PointFeature, SubareaFeature } from './types';

export interface HuntingDatabaseOptions {
  /** F.eks. https://kartportal.statskog.no/server/rest/services/Jakt/FeatureServer */
  baseUrl: string;
  fetch?: typeof fetch;
}

/** Klient for Jaktdatabasen (ArcGIS Feature Service). */
export class HuntingDatabaseClient {
  private readonly f: typeof fetch;
  constructor(private readonly opts: HuntingDatabaseOptions) {
    this.f = opts.fetch ?? fetch.bind(globalThis);
  }

  private async call<T>(path: string, init?: RequestInit): Promise<T> {
    let res: Response;
    try {
      res = await this.f(this.opts.baseUrl + path, init);
    } catch {
      throw new NetworkError();
    }
    if (!res.ok) throw new ApiError(res.status, res.statusText);
    return (await res.json()) as T;
  }

  /** Delområder for en eller flere salgssider (lag 0). */
  subareas(salesPageIds?: string[]) {
    const where = salesPageIds?.length ? `salesPageId IN (${salesPageIds.map((s) => `'${s}'`).join(',')})` : '1=1';
    return this.call<FeatureCollection<SubareaFeature>>(`/0/query?where=${encodeURIComponent(where)}&outFields=*&f=geojson`);
  }

  /** Punkter: hytter (lag 2) og tilbudenes midtpunkt (lag 3). */
  points(layer: 2 | 3) {
    return this.call<FeatureCollection<PointFeature>>(`/${layer}/query?where=${encodeURIComponent('1=1')}&outFields=*&f=geojson`);
  }

  /** Legger inn fangstrapporter (lag 1). */
  addCatchReports(reports: CatchReportPayload[]) {
    const body = new URLSearchParams({ adds: JSON.stringify(reports.map((r) => ({ attributes: r }))), f: 'json' });
    return this.call<{ addResults: Array<{ success: boolean; objectId?: number }> }>('/1/applyEdits', { method: 'POST', body });
  }
}
