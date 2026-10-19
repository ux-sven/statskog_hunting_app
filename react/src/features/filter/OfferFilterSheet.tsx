import { useEffect, useState } from 'react';
import { ModalSheet } from '../../components/ModalSheet';
import { SegmentedControl } from '../../components/SegmentedControl';
import { Checkbox } from '../../components/Checkbox';
import { Chip } from '../../components/Chip';
import { Link } from '../../components/Link';
import { Icon } from '../../icons/Icon';
import { cx } from '../../components/cx';
import { FooterActions } from '../../app/widgets';
import { counties, countyNames } from '../../domain/areas';
import { emptyFilter, huntTypes, type CardKind, type OfferFilter } from '../../domain/filter';
import { fishSpecies, speciesById, type SpeciesId } from '../../domain/species';
import { FilterOptionTile } from './FilterOptionTile';
import { FilterCheckboxTile } from './FilterCheckboxTile';

type View = { kind: 'main' } | { kind: 'species' } | { kind: 'area' } | { kind: 'county'; county: string };

const toggle = <T,>(list: T[], v: T, on: boolean) => (on ? [...new Set([...list, v])] : list.filter((x) => x !== v));

function SubHeader({ back, title, onBack }: { back: string; title: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-m border-b border-border-primary px-m pt-m pb-xs">
      <Link text={back} icon={<Icon name="chevronLeftSmall" />} onClick={onBack} />
      <h2 className="m-0 type-body-large font-bold text-text-primary">{title}</h2>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-border-primary px-m py-m">
      <h3 className="m-0 mb-xs type-headline-h2 font-normal text-text-primary">{title}</h3>
      {children}
    </section>
  );
}

/** Rad som åpner en underliste («Velg arter ›», «Velg område [Alle] ›»). */
function NavRow({ label, value, onClick, onClear }: { label: string; value?: string; onClick: () => void; onClear?: () => void }) {
  return (
    <div className="flex min-h-[44px] items-center gap-s">
      <button type="button" onClick={onClick} className="flex min-h-[44px] flex-1 items-center gap-s text-left type-body-medium text-text-primary cursor-pointer">
        <span className="flex-1">{label}</span>
      </button>
      {value && <Chip label={value} size="small" onDelete={onClear} />}
      <button type="button" aria-label={label} onClick={onClick} className="grid size-[32px] place-items-center text-text-primary cursor-pointer">
        <Icon name="chevronRight" size={16} />
      </button>
    </div>
  );
}

function DateField({ label, value, onChange }: { label: string; value?: string; onChange: (v?: string) => void }) {
  return (
    <label className="flex min-h-[44px] items-center justify-between gap-s type-body-medium text-text-primary">
      {label}
      <input
        type="date"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value || undefined)}
        className="rounded-medium bg-surface-secondary px-s py-[6px] type-body-medium text-text-primary focus:outline-2"
      />
    </label>
  );
}

export interface OfferFilterSheetProps {
  open: boolean;
  value: OfferFilter;
  onClose: () => void;
  onApply: (f: OfferFilter) => void;
  /** Antall treff med gjeldende utkast (vises på «Vis tilbud»). */
  countFor?: (f: OfferFilter) => number | undefined;
}

/**
 * Filter for tilbud (Figma «Filter Open Fish / Hunt», «Filter Arter», «Filter
 * Område»). Én modal med underlister, slik at brukeren ikke mister valgene.
 */
export function OfferFilterSheet({ open, value, onClose, onApply, countFor }: OfferFilterSheetProps) {
  const [draft, setDraft] = useState(value);
  const [view, setView] = useState<View>({ kind: 'main' });
  useEffect(() => {
    if (open) {
      setDraft(value);
      setView({ kind: 'main' });
    }
  }, [open, value]);

  const fish = draft.group === 'fish';
  const set = (p: Partial<OfferFilter>) => setDraft({ ...draft, ...p });
  const areaCount = draft.counties.length + draft.municipalities.length;
  const n = countFor?.(draft);

  let body: React.ReactNode;
  if (view.kind === 'species') {
    body = (
      <>
        <SubHeader back="Filtrer søket" title="Art" onBack={() => setView({ kind: 'main' })} />
        <ul className="m-0 list-none divide-y divide-border-tertiary p-0">
          {fishSpecies().map((s) => (
            <li key={s.id}>
              <FilterOptionTile kind="check" checkboxFirst label={s.label} species={s.id} selected={draft.fishSpecies.includes(s.id)} onChange={(on) => set({ fishSpecies: toggle(draft.fishSpecies, s.id, on) })} />
            </li>
          ))}
        </ul>
      </>
    );
  } else if (view.kind === 'area') {
    body = (
      <>
        <SubHeader back="Filtrer søket" title="Område" onBack={() => setView({ kind: 'main' })} />
        <ul className="m-0 list-none divide-y divide-border-primary p-0">
          {countyNames.map((c) => {
            const subs = counties[c].filter((m) => draft.municipalities.includes(m)).length;
            return (
              <li key={c}>
                <FilterCheckboxTile
                  label={c}
                  checked={draft.counties.includes(c)}
                  onChange={(on) => set({ counties: toggle(draft.counties, c, !!on), municipalities: on ? draft.municipalities.filter((m) => !counties[c].includes(m)) : draft.municipalities })}
                  activeSubFilters={subs}
                  onClearSubFilters={() => set({ municipalities: draft.municipalities.filter((m) => !counties[c].includes(m)) })}
                  onOpen={() => setView({ kind: 'county', county: c })}
                />
              </li>
            );
          })}
        </ul>
      </>
    );
  } else if (view.kind === 'county') {
    const c = view.county;
    const all = draft.counties.includes(c);
    body = (
      <>
        <SubHeader back="Område" title={c} onBack={() => setView({ kind: 'area' })} />
        <ul className="m-0 list-none divide-y divide-border-primary p-0">
          <li className="p-m">
            <Checkbox label="Alle" checked={all} onChange={(on) => set({ counties: toggle(draft.counties, c, !!on), municipalities: draft.municipalities.filter((m) => !counties[c].includes(m)) })} />
          </li>
          {counties[c].map((m) => (
            <li key={m} className="p-m">
              <Checkbox
                label={m}
                checked={all || draft.municipalities.includes(m)}
                onChange={(on) => set({ counties: draft.counties.filter((x) => x !== c), municipalities: toggle(draft.municipalities, m, !!on) })}
              />
            </li>
          ))}
        </ul>
      </>
    );
  } else {
    const verb = fish ? 'fiske' : 'jakte';
    body = (
      <>
        <div className="px-m pt-xs pb-s">
          <SegmentedControl label="Aktivitet" segments={['Småviltjakt', 'Fiske']} selectedIndex={fish ? 1 : 0} onChange={(i) => setDraft({ ...emptyFilter(i ? 'fish' : 'game'), sort: draft.sort })} />
        </div>
        <Section title={`Hva vil du ${verb}?`}>
          {fish ? (
            <NavRow
              label="Velg arter"
              value={draft.fishSpecies.length ? draft.fishSpecies.map((s) => speciesById(s as SpeciesId).label).join(', ') : undefined}
              onClick={() => setView({ kind: 'species' })}
              onClear={() => set({ fishSpecies: [] })}
            />
          ) : (
            <div className="-mx-m">
              {huntTypes.map((h) => (
                <FilterOptionTile key={h.id} kind="check" checkboxFirst label={h.label} species={h.icon} selected={draft.huntTypes.includes(h.id)} onChange={(on) => set({ huntTypes: toggle(draft.huntTypes, h.id, on) })} />
              ))}
            </div>
          )}
        </Section>
        <Section title={`Hvor vil du ${verb}?`}>
          <NavRow label="Velg område" value={areaCount ? [...draft.counties, ...draft.municipalities].join(', ') : 'Alle'} onClick={() => setView({ kind: 'area' })} onClear={areaCount ? () => set({ counties: [], municipalities: [] }) : undefined} />
        </Section>
        <Section title={`Hva slags ${fish ? 'fiskekort' : 'jaktkort'}?`}>
          <div className="flex flex-col gap-s py-xs">
            {(['dagskort', 'periodekort'] as CardKind[]).map((k) => (
              <Checkbox key={k} label={k === 'dagskort' ? 'Dagskort' : 'Periodekort'} checked={draft.cardKinds.includes(k)} onChange={(on) => set({ cardKinds: toggle(draft.cardKinds, k, !!on) })} />
            ))}
          </div>
        </Section>
        <Section title={`Når vil du ${verb}?`}>
          <DateField label="Fra" value={draft.from} onChange={(from) => set({ from })} />
          <DateField label="Til" value={draft.to} onChange={(to) => set({ to })} />
          <div className="pt-s">
            <Checkbox label="Inkluder utløpte tilbud" checked={draft.includeExpired} onChange={(on) => set({ includeExpired: !!on })} />
          </div>
        </Section>
      </>
    );
  }

  return (
    <ModalSheet
      open={open}
      onClose={onClose}
      title="Filter"
      variant="page"
      hideHeader={view.kind !== 'main'}
      footer={
        <FooterActions
          left={{ label: 'Fjern alle filtre', onClick: () => setDraft({ ...emptyFilter(draft.group), sort: draft.sort }) }}
          right={{ label: n === undefined ? 'Vis tilbud' : `Vis ${n} tilbud`, onClick: () => onApply(draft) }}
        />
      }
    >
      <div className={cx(view.kind !== 'main' && 'min-h-full bg-surface-primary')}>{body}</div>
    </ModalSheet>
  );
}
