import { useState, type ReactNode } from 'react';
import {
  BottomNav, Button, CabinPoi, Callout, CardTypeBadge, Checkbox, Chip, CountStepper, ExpandableSection, Icon, Link, ListTile,
  MainMapNavigation, MetaRow, Notice, Radio, SearchBar, SecondaryMapNavigation, SegmentedControl, SpeciesIcon, TabBar,
  TableCell, TableHeaderCell, TablePagination, TextField, UserLocationButton, type ButtonVariant, type SortState, type UserLocationMode,
} from '../components';
import { ActivationCard, DayPicker, FilterCheckboxTile, FilterOptionTile, LicenseCard, LicenseSummary, OfferCard, SpeciesTile } from '../features';
import { iconNames } from '../icons/iconNames';
import { speciesList } from '../domain/species';
import { cardTypes, type CardType } from '../domain/cardType';
import { demoStore } from '../data/DemoStore';
import type { Size } from '../components/cx';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-l">
      <h2 className="m-0 mb-xs type-headline-h2 font-normal text-text-brand">{title}</h2>
      <div className="flex flex-wrap items-center gap-s">{children}</div>
    </section>
  );
}

const sizes: Size[] = ['small', 'medium', 'large'];
const variants: ButtonVariant[] = ['primary', 'secondary', 'tertiary', 'accent'];

/**
 * Alle komponentene fra designsystemet, side for side som i Figma.
 * Åpnes fra Innstillinger → Prototype → Komponentkatalog, eller med `#katalog`.
 */
export function ComponentCatalog() {
  const [check, setCheck] = useState<boolean | null>(true);
  const [check2, setCheck2] = useState(false);
  const [radio, setRadio] = useState('jakt');
  const [chips, setChips] = useState(new Set(['Rype']));
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(2);
  const [loc, setLoc] = useState<UserLocationMode>('notActive');
  const [seg, setSeg] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [art, setArt] = useState(true);
  const [selectOpen, setSelectOpen] = useState(false);
  const [count, setCount] = useState(2);
  const [fylke, setFylke] = useState<boolean | null>(false);
  const [sort, setSort] = useState<SortState>('unsorted');
  const [nav, setNav] = useState(0);
  const lic = demoStore.licenses('game')[0];
  const act = demoStore.activations()[0];
  const slots = demoStore.activationSlots(lic);
  const [days, setDays] = useState(new Set([slots[1].date.getTime()]));
  const offer = demoStore.allOffers()[0];

  return (
    <div className="p-m">
      <Section title="Buttons">
        {sizes.flatMap((size) => variants.map((v) => <Button key={size + v} label="Kjøp" size={size} variant={v} leadingIcon={<Icon name="priceTag" />} />))}
        <Button label="Deaktivert" disabled />
        <Button label="Kart" vertical variant="tertiary" leadingIcon={<Icon name="map" />} />
      </Section>
      <Section title="Ikoner">
        {[...new Set(iconNames)].map((n) => (
          <span key={n} title={n} className="text-cta-primary-default">
            <Icon name={n} label={n} />
          </span>
        ))}
      </Section>
      <Section title="Arter">
        {speciesList.map((s) => (
          <span key={s.id} className="flex flex-col items-center">
            <SpeciesIcon species={s.id} decorative />
            <span className="type-body-xsmall">{s.label}</span>
          </span>
        ))}
      </Section>
      <Section title="Korttyper">
        {(Object.keys(cardTypes) as CardType[]).map((t) => (
          <CardTypeBadge key={t} type={t} />
        ))}
        <CardTypeBadge type="dagskort" inactive />
      </Section>
      <Section title="Meldinger">
        <Notice className="w-full" text={'Du har ingen aktiveringer.\nHusk å aktivere jaktkortet ditt før du går på jakt.'} />
        <Callout
          className="w-full"
          text="Last ned offline kartområder med jaktgrenser dersom du skal jakte i områder uten mobildekning."
          action={<Button label="Last ned her" variant="secondary" leadingIcon={<Icon name="downloadFromCloud" />} />}
        />
      </Section>
      <Section title="Segmentert valg og seksjoner">
        <SegmentedControl className="w-full" segments={['Småviltjakt', 'Fiske']} selectedIndex={seg} onChange={setSeg} />
        <ExpandableSection title="Stedstreff" className="w-full">
          <p className="m-0 px-xs">Treff 1</p>
          <p className="m-0 px-xs">Treff 2</p>
        </ExpandableSection>
      </Section>
      <Section title="Listerader">
        <div className="w-full overflow-hidden rounded-medium border border-border-primary">
          <ListTile title="Min profil" icon="account" onClick={() => {}} />
          <ListTile title="Mørk / Lys modus" subtitle="Lys" layout="inline" icon="modeSwitch" onClick={() => {}} />
          <ListTile title="Vis tilbud i menyen" icon="priceTag" toggle={{ checked: toggle, onChange: setToggle }} />
          <ListTile title="Selbu" subtitle="12 MB" icon="map" onDelete={() => {}} showSeparator={false} />
        </div>
      </Section>
      <Section title="Checkbox, Radio, Chips, Links">
        <Checkbox checked={check} tristate label="Tre tilstander" onChange={setCheck} />
        <Checkbox checked={check2} label="Godta vilkår" onChange={(v) => setCheck2(!!v)} />
        <Checkbox checked label="Inaktiv" />
        <Radio value="jakt" groupValue={radio} label="Jakt" onChange={setRadio} />
        <Radio value="fiske" groupValue={radio} label="Fiske" onChange={setRadio} />
        <Radio value="x" groupValue={radio} label="Deaktivert" />
        {sizes.map((s) => (
          <Chip
            key={s}
            label="Rype"
            size={s}
            selected={chips.has(s)}
            onSelectedChange={(on) => {
              const n = new Set(chips);
              if (on) n.add(s);
              else n.delete(s);
              setChips(n);
            }}
            onDelete={() => {}}
          />
        ))}
        <Chip label="Deaktivert" enabled={false} />
        <Link text="Les mer på inatur.no" href="https://www.inatur.no" icon={<Icon name="externalLink" />} />
        <Link text="Besøkt lenke" visited onClick={() => {}} />
        <Link text="I liste" inList onClick={() => {}} />
      </Section>
      <Section title="Søk og tekstfelt">
        <SearchBar className="w-full" />
        <SearchBar className="w-full" rounded buttonLabel={null} iconPosition="right" />
        {sizes.map((s) => (
          <TextField key={s} className="w-full" size={s} label="Jegernummer" defaultValue="654321" showClear preIcon={<Icon name="account" />} />
        ))}
        <TextField className="w-full" label="Fylke" defaultValue="Trøndelag" onDropdown={() => {}} />
        <TextField className="w-full" label="Epost" defaultValue="ola@" errorText="Skriv en gyldig epostadresse" />
        <TextField className="w-full" label="Deaktivert" defaultValue="—" disabled />
        <TextField label="Visning" defaultValue="Ola Nordmann" readOnlyDisplay />
      </Section>
      <Section title="Tab Bar">
        <TabBar className="w-full" tabs={[{ label: 'Kart' }, { label: 'Liste' }, { label: 'Deaktivert', enabled: false }]} selectedIndex={tab} onChange={setTab} />
        <TabBar className="w-full" size="medium" tabs={[{ label: 'Jakt', icon: <Icon name="accuracy" /> }, { label: 'Fiske', icon: <Icon name="fishingHook" /> }]} selectedIndex={tab % 2} onChange={setTab} />
      </Section>
      <Section title="Tabell">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <TableHeaderCell size="small" label="Art" onSort={() => setSort(sort === 'ascending' ? 'descending' : 'ascending')} sortState={sort} />
                <TableHeaderCell size="small" label="Antall" numeric onFilter={() => {}} />
                <TableHeaderCell size="small" label="Status" />
              </tr>
            </thead>
            <tbody>
              {['Lirype', 'Orrfugl', 'Hare'].map((a, i) => (
                <tr key={a}>
                  <TableCell size="small" text={a} odd={i % 2 === 1} content="icon" icon={<Icon name="accuracy" />} />
                  <TableCell size="small" text={String(i + 1)} odd={i % 2 === 1} content="number" />
                  <TableCell size="small" text={i ? 'Sendt' : 'Venter'} odd={i % 2 === 1} content="status" statusColor={i ? 'var(--attention-success)' : undefined} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination size="small" currentPage={page} pageCount={8} onPageChange={setPage} />
        <TablePagination size="small" compact currentPage={page} pageCount={8} onPageChange={setPage} />
      </Section>
      <Section title="Kart">
        <div className="relative h-[320px] w-full overflow-hidden rounded-medium bg-[url('./images/kart_oversikt.jpg')] bg-cover">
          <MainMapNavigation className="absolute top-0 right-0" onHome={() => {}} onZoomIn={() => {}} onZoomOut={() => {}} onCompassNorth={() => {}} userLocationMode={loc} onUserLocation={() => setLoc(loc === 'notActive' ? 'active' : loc === 'active' ? 'north' : 'notActive')} />
          <SecondaryMapNavigation className="absolute top-0 left-0" onMapLayers={() => {}} onBasemaps={() => {}} onLegend={() => {}} onMeasure={() => {}} />
          <span className="absolute bottom-m left-1/2">
            <CabinPoi onClick={() => {}} />
          </span>
        </div>
        <UserLocationButton mode="north" onClick={() => {}} />
      </Section>
      <Section title="Bunnmeny">
        <div className="w-full">
          <BottomNav
            items={[
              { icon: 'priceTag', label: 'Tilbud' },
              { icon: 'accuracy', label: 'Jaktkort' },
              { icon: 'fishingHook', label: 'Fiskekort' },
              { icon: 'report', label: 'Fangstrapport' },
              { icon: 'settings', label: 'Innstillinger' },
            ]}
            selectedIndex={nav}
            onChange={setNav}
          />
        </div>
      </Section>
      <Section title="Innholdskomponenter">
        <SpeciesTile species="lirype" />
        <SpeciesTile species="orret" layout="horizontal" />
        <SpeciesTile species="hare" layout="small" />
        <div className="flex w-full flex-col divide-y divide-border-tertiary border-y border-border-tertiary">
          <FilterOptionTile kind="check" label="Lirype" species="lirype" selected={art} onChange={setArt} />
          <FilterOptionTile kind="check" label="Tiur" species="tiur" selected={!art} onChange={(v) => setArt(!v)} checkboxFirst />
          <FilterOptionTile kind="select" label="Fylke" expanded={selectOpen} onClick={() => setSelectOpen(!selectOpen)} />
          <FilterOptionTile kind="counter" label="Hare" species="hare" count={count} onChange={setCount} />
          <FilterOptionTile kind="summary" label="Orrfugl" species="orrfugl" value="2 stk" />
          <FilterCheckboxTile label="Trøndelag" checked={fylke} onChange={setFylke} activeSubFilters={1} onClearSubFilters={() => {}} onOpen={() => {}} />
        </div>
        <CountStepper value={count} onChange={setCount} max={9} />
        <MetaRow icon="location" text={['Trøndelag', 'Selbu']} emphasizeLast dotClassName="bg-border-invert" />
        <div className="w-full">
          <OfferCard offer={offer} onBuy={() => {}} onInfo={() => {}} onShowInMap={() => {}} />
        </div>
        <div className="w-full">
          <LicenseCard license={lic} onActivate={() => {}} onInfo={() => {}} onShowInMap={() => {}} />
        </div>
        <div className="w-full">
          <LicenseCard license={{ ...lic, activatedDate: new Date() }} onActivate={() => {}} onInfo={() => {}} onReportCapture={() => {}} />
        </div>
        <div className="w-full">
          <LicenseSummary license={lic} variant="withPrice" />
        </div>
        <div className="w-full">
          <LicenseSummary license={lic} variant="full" />
        </div>
        {act && (
          <div className="w-full">
            <ActivationCard activation={act} onReportCapture={() => {}} onReceipt={() => {}} onShowInMap={() => {}} />
          </div>
        )}
        <div className="w-full">
          <DayPicker
            slots={slots}
            selected={days}
            onToggle={(d) => {
              const n = new Set(days);
              if (n.has(d.getTime())) n.delete(d.getTime());
              else n.add(d.getTime());
              setDays(n);
            }}
          />
        </div>
      </Section>
    </div>
  );
}
