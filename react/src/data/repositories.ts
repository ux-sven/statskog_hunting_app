import type { Activation, ActivationSlot, HuntingLicense, Offer } from '../domain/license';
import type { SpeciesGroup, SpeciesId } from '../domain/species';

/**
 * Grensesnittene skjermene bruker. I prototypen fylles de av `DemoStore`;
 * senere av Inatur API (tilbud, kort, aktiveringer) og Jaktdatabasen
 * (fangstrapport, felt) med lokal lagring for bruk uten nett.
 */
export interface OfferRepository {
  /** Tilbud fra Inatur `GET /v1/sales-pages`. */
  offers(group: SpeciesGroup, opts?: { query?: string; species?: Set<SpeciesId> }): Offer[];
}

export interface LicenseRepository {
  /** Kjøpte kort fra Inatur `GET /v1/permits`. */
  licenses(group: SpeciesGroup): HuntingLicense[];
  /** Aktiveringer fra Inatur `GET /v1/activations`. */
  activations(): Activation[];
  /** Kapasitet per dag for aktivering. */
  activationSlots(license: HuntingLicense): ActivationSlot[];
  /** Inatur `POST /v1/activations` – krever nett. */
  activate(license: HuntingLicense, days: Date[]): Promise<void>;
  /** Inatur `DELETE /v1/activations/{id}` – krever nett. */
  removeActivation(activation: Activation): Promise<void>;
}

/** En levert eller ventende fangstrapport (til Jaktdatabasen). */
export interface CaptureReport {
  activation: Activation;
  catches: Partial<Record<SpeciesId, number>>;
  hunted: boolean;
  createdAt: Date;
  /** `false` mens rapporten venter på nett. */
  synced: boolean;
}

export const reportTotal = (r: CaptureReport) => Object.values(r.catches).reduce<number>((a, b) => a + (b ?? 0), 0);

export interface CaptureReportRepository {
  reports(): CaptureReport[];
  /** Lagres lokalt og sendes til Jaktdatabasen når appen er på nett. */
  submit(report: Omit<CaptureReport, 'synced'>): Promise<void>;
}

export class OfflineError extends Error {}
