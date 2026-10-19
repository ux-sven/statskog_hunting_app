// GENERERT av figma/check-snippets.mjs – sjekker at Code Connect-eksemplene kompilerer.
import { useState, type ReactNode } from 'react';
import { BottomNav, ModalSheet, SearchFilterBar, Select, Sheet, SheetHeader, SheetMapToggle, Button, Callout, CardTypeBadge, Checkbox, Chip, ExpandableSection, Icon, Link, ListTile, MainMapNavigation, MapButton, MapZoomControl, Notice, Radio, SearchBar, SecondaryMapNavigation, SpeciesIcon, TabBar, TabButton, TableCell, TableHeaderCell, TablePagination, TextField, UserLocationButton, CabinPoi } from './components';
import { ActivationCard, DayCell, DayPicker, FilterCheckboxTile, FilterOptionTile, LicenseCard, LicenseDetails, LicenseSummary, OfferCard, OfferImage, SpeciesTile } from './features';
import { sampleActivation, sampleLicense, sampleOffer, sampleSlots } from './domain/samples';

export function Snippets() {
  const [value, setValue] = useState('b');
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState('relevans');
  const [tab, setTab] = useState(0);
  const [, setSelected] = useState<unknown>(null);
  const setFilterOpen = (_: boolean) => {};
  const sortOptions = [{ value: 'relevans', label: 'Relevans' }];
  const activeFilters = [{ id: 'a', label: 'Lirype' }];
  const removeFilter = (_: string) => {};
  const children = null;
  const offer = sampleOffer;
  const license = sampleLicense;
  const activation = sampleActivation;
  const slots = sampleSlots;
  const slot = slots[0];
  const days = new Set<number>();
  const out: ReactNode[] = [];
  // bottom_nav.figma.ts
  out.push(<BottomNav
  items={[
  { icon: 'priceTag', label: 'Tilbud' },
  { icon: 'accuracy', label: 'Jaktkort' },
  { icon: 'fishingHook', label: 'Fiskekort' },
  { icon: 'report', label: 'Fangstrapport' },
  { icon: 'settings', label: 'Innstillinger' },
  ]}
  selectedIndex={tab}
  onChange={setTab}
/>);
  // bottom_nav.figma.ts
  out.push(<BottomNav
  items={[
  { icon: 'priceTag', label: 'Tilbud' },
  { icon: 'accuracy', label: 'Jaktkort' },
  ]}
  selectedIndex={tab}
  onChange={setTab}
/>);
  // button_large.figma.ts
  out.push(<Button
  label="Kjøp"
  size="large"
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  onClick={() => {}}
/>);
  // button_large.figma.ts
  out.push(<Button
  size="large"
  onClick={() => {}}
/>);
  // button_large.figma.ts
  out.push(<Button
  label="Kjøp"
  variant="secondary"
  size="large"
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  disabled
/>);
  // button_large.figma.ts
  out.push(<Button
  variant="secondary"
  size="large"
  disabled
/>);
  // button_large.figma.ts
  out.push(<Button
  label="Kjøp"
  variant="tertiary"
  size="large"
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  onClick={() => {}}
/>);
  // button_large.figma.ts
  out.push(<Button
  variant="tertiary"
  size="large"
  onClick={() => {}}
/>);
  // button_large.figma.ts
  out.push(<Button
  label="Kjøp"
  size="large"
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  visited
  onClick={() => {}}
/>);
  // button_large.figma.ts
  out.push(<Button
  size="large"
  visited
  onClick={() => {}}
/>);
  // button_large.figma.ts
  out.push(<Button
  label="Kjøp"
  variant="secondary"
  size="large"
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  onClick={() => {}}
/>);
  // button_large.figma.ts
  out.push(<Button
  variant="secondary"
  size="large"
  onClick={() => {}}
/>);
  // button_large.figma.ts
  out.push(<Button
  label="Kjøp"
  size="large"
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  disabled
/>);
  // button_large.figma.ts
  out.push(<Button
  size="large"
  disabled
/>);
  // button_medium.figma.ts
  out.push(<Button
  label="Kjøp"
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  onClick={() => {}}
/>);
  // button_medium.figma.ts
  out.push(<Button
  onClick={() => {}}
/>);
  // button_medium.figma.ts
  out.push(<Button
  label="Kjøp"
  variant="secondary"
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  disabled
/>);
  // button_medium.figma.ts
  out.push(<Button
  variant="secondary"
  disabled
/>);
  // button_medium.figma.ts
  out.push(<Button
  label="Kjøp"
  variant="tertiary"
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  onClick={() => {}}
/>);
  // button_medium.figma.ts
  out.push(<Button
  variant="tertiary"
  onClick={() => {}}
/>);
  // button_medium.figma.ts
  out.push(<Button
  label="Kjøp"
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  visited
  onClick={() => {}}
/>);
  // button_medium.figma.ts
  out.push(<Button
  visited
  onClick={() => {}}
/>);
  // button_medium.figma.ts
  out.push(<Button
  label="Kjøp"
  variant="secondary"
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  onClick={() => {}}
/>);
  // button_medium.figma.ts
  out.push(<Button
  variant="secondary"
  onClick={() => {}}
/>);
  // button_medium.figma.ts
  out.push(<Button
  label="Kjøp"
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  disabled
/>);
  // button_medium.figma.ts
  out.push(<Button
  disabled
/>);
  // button_small.figma.ts
  out.push(<Button
  label="Kjøp"
  size="small"
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  onClick={() => {}}
/>);
  // button_small.figma.ts
  out.push(<Button
  size="small"
  onClick={() => {}}
/>);
  // button_small.figma.ts
  out.push(<Button
  label="Kjøp"
  variant="secondary"
  size="small"
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  disabled
/>);
  // button_small.figma.ts
  out.push(<Button
  variant="secondary"
  size="small"
  disabled
/>);
  // button_small.figma.ts
  out.push(<Button
  label="Kjøp"
  variant="tertiary"
  size="small"
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  onClick={() => {}}
/>);
  // button_small.figma.ts
  out.push(<Button
  variant="tertiary"
  size="small"
  onClick={() => {}}
/>);
  // button_small.figma.ts
  out.push(<Button
  label="Kjøp"
  size="small"
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  visited
  onClick={() => {}}
/>);
  // button_small.figma.ts
  out.push(<Button
  size="small"
  visited
  onClick={() => {}}
/>);
  // button_small.figma.ts
  out.push(<Button
  label="Kjøp"
  variant="secondary"
  size="small"
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  onClick={() => {}}
/>);
  // button_small.figma.ts
  out.push(<Button
  variant="secondary"
  size="small"
  onClick={() => {}}
/>);
  // button_small.figma.ts
  out.push(<Button
  label="Kjøp"
  size="small"
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  disabled
/>);
  // button_small.figma.ts
  out.push(<Button
  size="small"
  disabled
/>);
  // button_vertical_large.figma.ts
  out.push(<Button
  label="Kjøp"
  size="large"
  vertical
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  onClick={() => {}}
/>);
  // button_vertical_large.figma.ts
  out.push(<Button
  size="large"
  vertical
  onClick={() => {}}
/>);
  // button_vertical_large.figma.ts
  out.push(<Button
  label="Kjøp"
  variant="secondary"
  size="large"
  vertical
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  disabled
/>);
  // button_vertical_large.figma.ts
  out.push(<Button
  variant="secondary"
  size="large"
  vertical
  disabled
/>);
  // button_vertical_large.figma.ts
  out.push(<Button
  label="Kjøp"
  variant="tertiary"
  size="large"
  vertical
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  onClick={() => {}}
/>);
  // button_vertical_large.figma.ts
  out.push(<Button
  variant="tertiary"
  size="large"
  vertical
  onClick={() => {}}
/>);
  // button_vertical_large.figma.ts
  out.push(<Button
  label="Kjøp"
  size="large"
  vertical
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  visited
  onClick={() => {}}
/>);
  // button_vertical_large.figma.ts
  out.push(<Button
  size="large"
  vertical
  visited
  onClick={() => {}}
/>);
  // button_vertical_large.figma.ts
  out.push(<Button
  label="Kjøp"
  variant="secondary"
  size="large"
  vertical
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  onClick={() => {}}
/>);
  // button_vertical_large.figma.ts
  out.push(<Button
  variant="secondary"
  size="large"
  vertical
  onClick={() => {}}
/>);
  // button_vertical_large.figma.ts
  out.push(<Button
  label="Kjøp"
  size="large"
  vertical
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  disabled
/>);
  // button_vertical_large.figma.ts
  out.push(<Button
  size="large"
  vertical
  disabled
/>);
  // button_vertical_medium.figma.ts
  out.push(<Button
  label="Kjøp"
  vertical
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  onClick={() => {}}
/>);
  // button_vertical_medium.figma.ts
  out.push(<Button
  vertical
  onClick={() => {}}
/>);
  // button_vertical_medium.figma.ts
  out.push(<Button
  label="Kjøp"
  variant="secondary"
  vertical
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  disabled
/>);
  // button_vertical_medium.figma.ts
  out.push(<Button
  variant="secondary"
  vertical
  disabled
/>);
  // button_vertical_medium.figma.ts
  out.push(<Button
  label="Kjøp"
  variant="tertiary"
  vertical
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  onClick={() => {}}
/>);
  // button_vertical_medium.figma.ts
  out.push(<Button
  variant="tertiary"
  vertical
  onClick={() => {}}
/>);
  // button_vertical_medium.figma.ts
  out.push(<Button
  label="Kjøp"
  vertical
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  visited
  onClick={() => {}}
/>);
  // button_vertical_medium.figma.ts
  out.push(<Button
  vertical
  visited
  onClick={() => {}}
/>);
  // button_vertical_medium.figma.ts
  out.push(<Button
  label="Kjøp"
  variant="secondary"
  vertical
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  onClick={() => {}}
/>);
  // button_vertical_medium.figma.ts
  out.push(<Button
  variant="secondary"
  vertical
  onClick={() => {}}
/>);
  // button_vertical_medium.figma.ts
  out.push(<Button
  label="Kjøp"
  vertical
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  disabled
/>);
  // button_vertical_medium.figma.ts
  out.push(<Button
  vertical
  disabled
/>);
  // button_vertical_small.figma.ts
  out.push(<Button
  label="Kjøp"
  size="small"
  vertical
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  onClick={() => {}}
/>);
  // button_vertical_small.figma.ts
  out.push(<Button
  size="small"
  vertical
  onClick={() => {}}
/>);
  // button_vertical_small.figma.ts
  out.push(<Button
  label="Kjøp"
  variant="secondary"
  size="small"
  vertical
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  disabled
/>);
  // button_vertical_small.figma.ts
  out.push(<Button
  variant="secondary"
  size="small"
  vertical
  disabled
/>);
  // button_vertical_small.figma.ts
  out.push(<Button
  label="Kjøp"
  variant="tertiary"
  size="small"
  vertical
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  onClick={() => {}}
/>);
  // button_vertical_small.figma.ts
  out.push(<Button
  variant="tertiary"
  size="small"
  vertical
  onClick={() => {}}
/>);
  // button_vertical_small.figma.ts
  out.push(<Button
  label="Kjøp"
  size="small"
  vertical
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  visited
  onClick={() => {}}
/>);
  // button_vertical_small.figma.ts
  out.push(<Button
  size="small"
  vertical
  visited
  onClick={() => {}}
/>);
  // button_vertical_small.figma.ts
  out.push(<Button
  label="Kjøp"
  variant="secondary"
  size="small"
  vertical
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  onClick={() => {}}
/>);
  // button_vertical_small.figma.ts
  out.push(<Button
  variant="secondary"
  size="small"
  vertical
  onClick={() => {}}
/>);
  // button_vertical_small.figma.ts
  out.push(<Button
  label="Kjøp"
  size="small"
  vertical
  leadingIcon={<Icon name="account" />}
  trailingIcon={<Icon name="account" />}
  disabled
/>);
  // button_vertical_small.figma.ts
  out.push(<Button
  size="small"
  vertical
  disabled
/>);
  // cabin_poi.figma.ts
  out.push(<CabinPoi onClick={() => {}} />);
  // checkbox.figma.ts
  out.push(<Checkbox
  checked={true}
  label="Kjøp"
  onChange={(checked) => {}}
/>);
  // checkbox.figma.ts
  out.push(<Checkbox
  checked={true}
  onChange={(checked) => {}}
/>);
  // checkbox.figma.ts
  out.push(<Checkbox
  checked={false}
  label="Kjøp"
  onChange={(checked) => {}}
/>);
  // checkbox.figma.ts
  out.push(<Checkbox
  checked={false}
  onChange={(checked) => {}}
/>);
  // checkbox.figma.ts
  out.push(<Checkbox
  checked={null}
  tristate
  label="Kjøp"
  onChange={(checked) => {}}
/>);
  // checkbox.figma.ts
  out.push(<Checkbox
  checked={null}
  tristate
  onChange={(checked) => {}}
/>);
  // checkbox.figma.ts
  out.push(<Checkbox
  checked={false}
  label="Kjøp"
/>);
  // checkbox.figma.ts
  out.push(<Checkbox
  checked={false}
/>);
  // checkbox_icon.figma.ts
  out.push(<Checkbox
  checked={true}
  onChange={(checked) => {}}
/>);
  // checkbox_icon.figma.ts
  out.push(<Checkbox
  checked={null}
  tristate
  onChange={(checked) => {}}
/>);
  // checkbox_icon.figma.ts
  out.push(<Checkbox
  checked={false}
  onChange={(checked) => {}}
/>);
  // checkbox_icon.figma.ts
  out.push(<Checkbox
  checked={false}
/>);
  // chip_large.figma.ts
  out.push(<Chip
  label="Kjøp"
  size="large"
  onSelectedChange={(selected) => {}}
  onDelete={() => {}}
/>);
  // chip_large.figma.ts
  out.push(<Chip
  label="Kjøp"
  size="large"
  onSelectedChange={(selected) => {}}
/>);
  // chip_large.figma.ts
  out.push(<Chip
  label="Kjøp"
  size="large"
  enabled={false}
  onSelectedChange={(selected) => {}}
  onDelete={() => {}}
/>);
  // chip_large.figma.ts
  out.push(<Chip
  label="Kjøp"
  size="large"
  enabled={false}
  onSelectedChange={(selected) => {}}
/>);
  // chip_large.figma.ts
  out.push(<Chip
  label="Kjøp"
  size="large"
  selected
  onSelectedChange={(selected) => {}}
  onDelete={() => {}}
/>);
  // chip_large.figma.ts
  out.push(<Chip
  label="Kjøp"
  size="large"
  selected
  onSelectedChange={(selected) => {}}
/>);
  // chip_medium.figma.ts
  out.push(<Chip
  label="Kjøp"
  size="medium"
  onSelectedChange={(selected) => {}}
  onDelete={() => {}}
/>);
  // chip_medium.figma.ts
  out.push(<Chip
  label="Kjøp"
  size="medium"
  onSelectedChange={(selected) => {}}
/>);
  // chip_medium.figma.ts
  out.push(<Chip
  label="Kjøp"
  size="medium"
  enabled={false}
  onSelectedChange={(selected) => {}}
  onDelete={() => {}}
/>);
  // chip_medium.figma.ts
  out.push(<Chip
  label="Kjøp"
  size="medium"
  enabled={false}
  onSelectedChange={(selected) => {}}
/>);
  // chip_medium.figma.ts
  out.push(<Chip
  label="Kjøp"
  size="medium"
  selected
  onSelectedChange={(selected) => {}}
  onDelete={() => {}}
/>);
  // chip_medium.figma.ts
  out.push(<Chip
  label="Kjøp"
  size="medium"
  selected
  onSelectedChange={(selected) => {}}
/>);
  // chip_small.figma.ts
  out.push(<Chip
  label="Kjøp"
  onSelectedChange={(selected) => {}}
  onDelete={() => {}}
/>);
  // chip_small.figma.ts
  out.push(<Chip
  label="Kjøp"
  onSelectedChange={(selected) => {}}
/>);
  // chip_small.figma.ts
  out.push(<Chip
  label="Kjøp"
  enabled={false}
  onSelectedChange={(selected) => {}}
  onDelete={() => {}}
/>);
  // chip_small.figma.ts
  out.push(<Chip
  label="Kjøp"
  enabled={false}
  onSelectedChange={(selected) => {}}
/>);
  // chip_small.figma.ts
  out.push(<Chip
  label="Kjøp"
  selected
  onSelectedChange={(selected) => {}}
  onDelete={() => {}}
/>);
  // chip_small.figma.ts
  out.push(<Chip
  label="Kjøp"
  selected
  onSelectedChange={(selected) => {}}
/>);
  // link.figma.ts
  out.push(<Link
  text="Tekst Text"
  href="https://www.inatur.no"
  icon={<Icon name="account" />}
/>);
  // link.figma.ts
  out.push(<Link
  text="Tekst Text"
  href="https://www.inatur.no"
/>);
  // link.figma.ts
  out.push(<Link
  text="Tekst Text"
  href="https://www.inatur.no"
  icon={<Icon name="account" />}
  inList
/>);
  // link.figma.ts
  out.push(<Link
  text="Tekst Text"
  href="https://www.inatur.no"
  inList
/>);
  // link.figma.ts
  out.push(<Link
  text="Tekst Text"
  href="https://www.inatur.no"
  icon={<Icon name="account" />}
  visited
/>);
  // link.figma.ts
  out.push(<Link
  text="Tekst Text"
  href="https://www.inatur.no"
  visited
/>);
  // link.figma.ts
  out.push(<Link
  text="Tekst Text"
  href="https://www.inatur.no"
  icon={<Icon name="account" />}
  inList
  disabled
/>);
  // link.figma.ts
  out.push(<Link
  text="Tekst Text"
  href="https://www.inatur.no"
  inList
  disabled
/>);
  // main_map_navigation.figma.ts
  out.push(<MainMapNavigation
  onHome={() => {}}
  onZoomIn={() => {}}
  onZoomOut={() => {}}
  onCompassNorth={() => {}}
  userLocationMode="notActive"
  onUserLocation={() => {}}
/>);
  // main_map_navigation.figma.ts
  out.push(<MainMapNavigation
/>);
  // map_button.figma.ts
  out.push(<MapButton
  icon={<Icon name="account" />}
  label="Kjøp"
  tooltip="Kartlag"
  onClick={() => {}}
/>);
  // map_button.figma.ts
  out.push(<MapButton
  icon={<Icon name="account" />}
  tooltip="Kartlag"
  onClick={() => {}}
/>);
  // map_navigation_bar.figma.ts
  out.push(<ModalSheet
  open={open}
  onClose={() => setOpen(false)}
  title="Linje &quot;1&quot;
Linje 2"
  variant="page"
>
  {children}
</ModalSheet>);
  // map_navigation_bar.figma.ts
  out.push(<SearchFilterBar
  query={query}
  onQueryChange={setQuery}
  onFilter={() => setFilterOpen(true)}
  sort={<Select label="Sorter etter" showLabel value={sort} onChange={setSort} options={sortOptions} />}
  activeFilters={activeFilters}
  onRemoveFilter={removeFilter}
/>);
  // map_navigation_bar.figma.ts
  out.push(<ModalSheet
  open={open}
  onClose={() => setOpen(false)}
  title="Linje &quot;1&quot;
Linje 2"
  variant="stack"
>
  {children}
</ModalSheet>);
  // map_navigation_bar.figma.ts
  out.push(<Sheet header={<SheetHeader variant="drawer" title="Linje &quot;1&quot;
Linje 2" action={<SheetMapToggle />} />}>
  {children}
</Sheet>);
  // map_navigation_bar.figma.ts
  out.push(<Sheet
  snapPoints={['half', 'full']}
  onClose={() => setSelected(null)}
  header={<SheetHeader variant="drawerSmall" title="Linje &quot;1&quot;
Linje 2" onClose={() => setSelected(null)} />}
>
  {children}
</Sheet>);
  // map_zoom.figma.ts
  out.push(<MapZoomControl onZoomIn={() => {}} onZoomOut={() => {}} />);
  // radio.figma.ts
  out.push(<Radio
  value="a"
  groupValue={value}
  label="Kjøp"
  onChange={setValue}
/>);
  // radio.figma.ts
  out.push(<Radio
  value="a"
  groupValue={value}
  onChange={setValue}
/>);
  // radio.figma.ts
  out.push(<Radio
  value="a"
  groupValue={"a"}
  label="Kjøp"
  onChange={setValue}
/>);
  // radio.figma.ts
  out.push(<Radio
  value="a"
  groupValue={"a"}
  onChange={setValue}
/>);
  // radio.figma.ts
  out.push(<Radio
  value="a"
  groupValue={value}
  label="Kjøp"
/>);
  // radio.figma.ts
  out.push(<Radio
  value="a"
  groupValue={value}
/>);
  // radio_icon.figma.ts
  out.push(<Radio
  value="a"
  groupValue={value}
  onChange={setValue}
/>);
  // radio_icon.figma.ts
  out.push(<Radio
  value="a"
  groupValue={"a"}
  onChange={setValue}
/>);
  // radio_icon.figma.ts
  out.push(<Radio
  value="a"
  groupValue={value}
/>);
  // search_bar.figma.ts
  out.push(<SearchBar
  placeholder="Tekst SearchField text"
  onChange={(value) => {}}
  onSubmit={(value) => {}}
/>);
  // search_bar.figma.ts
  out.push(<SearchBar
  placeholder="Tekst SearchField text"
  iconPosition={null}
  showClear={false}
  buttonLabel={null}
  onChange={(value) => {}}
  onSubmit={(value) => {}}
/>);
  // search_bar.figma.ts
  out.push(<SearchBar
  placeholder="Tekst SearchField text"
  rounded
  iconPosition="right"
  onChange={(value) => {}}
  onSubmit={(value) => {}}
/>);
  // search_bar.figma.ts
  out.push(<SearchBar
  placeholder="Tekst SearchField text"
  rounded
  iconPosition={null}
  showClear={false}
  buttonLabel={null}
  onChange={(value) => {}}
  onSubmit={(value) => {}}
/>);
  // secondary_map_navigation.figma.ts
  out.push(<SecondaryMapNavigation
  onMapLayers={() => {}}
  onBasemaps={() => {}}
  onLegend={() => {}}
  onMeasure={() => {}}
  onPrint={() => {}}
  onDraw={() => {}}
  onTools={() => {}}
  on3D={() => {}}
/>);
  // secondary_map_navigation.figma.ts
  out.push(<SecondaryMapNavigation
/>);
  // tab_bar_medium.figma.ts
  out.push(<TabBar
  size="medium"
  tabs={[
    { label: 'Fane 1' },
    { label: 'Fane 2' },
    { label: 'Fane 3', enabled: false },
    { label: 'Fane 4' },
    { label: 'Fane 5' },
    { label: 'Fane 6' },
    { label: 'Fane 7' },
    { label: 'Fane 8' },
  ]}
  selectedIndex={1}
  onChange={(index) => {}}
/>);
  // tab_bar_small.figma.ts
  out.push(<TabBar
  tabs={[
    { label: 'Fane 1' },
    { label: 'Fane 2' },
    { label: 'Fane 3', enabled: false },
    { label: 'Fane 4' },
    { label: 'Fane 5' },
    { label: 'Fane 6' },
    { label: 'Fane 7' },
    { label: 'Fane 8' },
  ]}
  selectedIndex={1}
  onChange={(index) => {}}
/>);
  // tab_bar_small.figma.ts
  out.push(<TabBar
  tabs={[
  ]}
  selectedIndex={0}
  onChange={(index) => {}}
/>);
  // tab_button_medium.figma.ts
  out.push(<TabButton
  label="Kjøp"
  size="medium"
  icon={<Icon name="account" />}
  onClick={() => {}}
/>);
  // tab_button_medium.figma.ts
  out.push(<TabButton
  label="Kjøp"
  size="medium"
  onClick={() => {}}
/>);
  // tab_button_medium.figma.ts
  out.push(<TabButton
  label="Kjøp"
  size="medium"
  icon={<Icon name="account" />}
/>);
  // tab_button_medium.figma.ts
  out.push(<TabButton
  label="Kjøp"
  size="medium"
/>);
  // tab_button_medium.figma.ts
  out.push(<TabButton
  label="Kjøp"
  size="medium"
  icon={<Icon name="account" />}
  active
  onClick={() => {}}
/>);
  // tab_button_medium.figma.ts
  out.push(<TabButton
  label="Kjøp"
  size="medium"
  active
  onClick={() => {}}
/>);
  // tab_button_small.figma.ts
  out.push(<TabButton
  label="Kjøp"
  icon={<Icon name="account" />}
  onClick={() => {}}
/>);
  // tab_button_small.figma.ts
  out.push(<TabButton
  label="Kjøp"
  onClick={() => {}}
/>);
  // tab_button_small.figma.ts
  out.push(<TabButton
  label="Kjøp"
  icon={<Icon name="account" />}
/>);
  // tab_button_small.figma.ts
  out.push(<TabButton
  label="Kjøp"
/>);
  // tab_button_small.figma.ts
  out.push(<TabButton
  label="Kjøp"
  icon={<Icon name="account" />}
  active
  onClick={() => {}}
/>);
  // tab_button_small.figma.ts
  out.push(<TabButton
  label="Kjøp"
  active
  onClick={() => {}}
/>);
  // table_cell_large.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="large"
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_cell_large.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="large"
/>);
  // table_cell_large.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="large"
  odd
  content="number"
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_cell_large.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="large"
  odd
  content="number"
/>);
  // table_cell_large.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="large"
  content="link"
  onClick={() => {}}
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_cell_large.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="large"
  content="link"
  onClick={() => {}}
/>);
  // table_cell_large.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="large"
  odd
  content="input"
  input={<TextField size="small" defaultValue="Kjøp" />}
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_cell_large.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="large"
  odd
  content="input"
  input={<TextField size="small" defaultValue="Kjøp" />}
/>);
  // table_cell_large.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="large"
  content="icon"
  icon={<Icon name="accuracy" />}
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_cell_large.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="large"
  content="icon"
  icon={<Icon name="accuracy" />}
/>);
  // table_cell_large.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="large"
  odd
  content="status"
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_cell_large.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="large"
  odd
  content="status"
/>);
  // table_cell_medium.figma.ts
  out.push(<TableCell
  text="Kjøp"
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_cell_medium.figma.ts
  out.push(<TableCell
  text="Kjøp"
/>);
  // table_cell_medium.figma.ts
  out.push(<TableCell
  text="Kjøp"
  odd
  content="number"
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_cell_medium.figma.ts
  out.push(<TableCell
  text="Kjøp"
  odd
  content="number"
/>);
  // table_cell_medium.figma.ts
  out.push(<TableCell
  text="Kjøp"
  content="link"
  onClick={() => {}}
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_cell_medium.figma.ts
  out.push(<TableCell
  text="Kjøp"
  content="link"
  onClick={() => {}}
/>);
  // table_cell_medium.figma.ts
  out.push(<TableCell
  text="Kjøp"
  odd
  content="input"
  input={<TextField size="small" defaultValue="Kjøp" />}
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_cell_medium.figma.ts
  out.push(<TableCell
  text="Kjøp"
  odd
  content="input"
  input={<TextField size="small" defaultValue="Kjøp" />}
/>);
  // table_cell_medium.figma.ts
  out.push(<TableCell
  text="Kjøp"
  content="icon"
  icon={<Icon name="accuracy" />}
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_cell_medium.figma.ts
  out.push(<TableCell
  text="Kjøp"
  content="icon"
  icon={<Icon name="accuracy" />}
/>);
  // table_cell_medium.figma.ts
  out.push(<TableCell
  text="Kjøp"
  odd
  content="status"
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_cell_medium.figma.ts
  out.push(<TableCell
  text="Kjøp"
  odd
  content="status"
/>);
  // table_cell_small.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="small"
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_cell_small.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="small"
/>);
  // table_cell_small.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="small"
  odd
  content="number"
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_cell_small.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="small"
  odd
  content="number"
/>);
  // table_cell_small.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="small"
  content="link"
  onClick={() => {}}
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_cell_small.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="small"
  content="link"
  onClick={() => {}}
/>);
  // table_cell_small.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="small"
  odd
  content="input"
  input={<TextField size="small" defaultValue="Kjøp" />}
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_cell_small.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="small"
  odd
  content="input"
  input={<TextField size="small" defaultValue="Kjøp" />}
/>);
  // table_cell_small.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="small"
  content="icon"
  icon={<Icon name="accuracy" />}
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_cell_small.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="small"
  content="icon"
  icon={<Icon name="accuracy" />}
/>);
  // table_cell_small.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="small"
  odd
  content="status"
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_cell_small.figma.ts
  out.push(<TableCell
  text="Kjøp"
  size="small"
  odd
  content="status"
/>);
  // table_header_large.figma.ts
  out.push(<TableHeaderCell
  size="large"
  label="Kjøp"
  sortState="unsorted"
  onSort={() => {}}
  onFilter={() => {}}
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_header_large.figma.ts
  out.push(<TableHeaderCell
  size="large"
  label="Kjøp"
/>);
  // table_header_large.figma.ts
  out.push(<TableHeaderCell
  size="large"
  numeric
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_header_large.figma.ts
  out.push(<TableHeaderCell
  size="large"
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_header_large.figma.ts
  out.push(<TableHeaderCell
  size="large"
  label="Kjøp"
  numeric
  sortState="unsorted"
  onSort={() => {}}
  onFilter={() => {}}
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_header_large.figma.ts
  out.push(<TableHeaderCell
  size="large"
  label="Kjøp"
  numeric
/>);
  // table_header_medium.figma.ts
  out.push(<TableHeaderCell
  label="Kjøp"
  sortState="unsorted"
  onSort={() => {}}
  onFilter={() => {}}
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_header_medium.figma.ts
  out.push(<TableHeaderCell
  label="Kjøp"
/>);
  // table_header_medium.figma.ts
  out.push(<TableHeaderCell
  numeric
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_header_medium.figma.ts
  out.push(<TableHeaderCell
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_header_medium.figma.ts
  out.push(<TableHeaderCell
  label="Kjøp"
  numeric
  sortState="unsorted"
  onSort={() => {}}
  onFilter={() => {}}
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_header_medium.figma.ts
  out.push(<TableHeaderCell
  label="Kjøp"
  numeric
/>);
  // table_header_small.figma.ts
  out.push(<TableHeaderCell
  size="small"
  label="Kjøp"
  sortState="unsorted"
  onSort={() => {}}
  onFilter={() => {}}
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_header_small.figma.ts
  out.push(<TableHeaderCell
  size="small"
  label="Kjøp"
/>);
  // table_header_small.figma.ts
  out.push(<TableHeaderCell
  size="small"
  numeric
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_header_small.figma.ts
  out.push(<TableHeaderCell
  size="small"
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_header_small.figma.ts
  out.push(<TableHeaderCell
  size="small"
  label="Kjøp"
  numeric
  sortState="unsorted"
  onSort={() => {}}
  onFilter={() => {}}
  checked={false}
  onCheckedChange={(checked) => {}}
/>);
  // table_header_small.figma.ts
  out.push(<TableHeaderCell
  size="small"
  label="Kjøp"
  numeric
/>);
  // table_pagination.figma.ts
  out.push(<TablePagination
  size="small"
  currentPage={page}
  pageCount={8}
  onPageChange={setPage}
/>);
  // table_pagination.figma.ts
  out.push(<TablePagination
  compact
  currentPage={page}
  pageCount={8}
  onPageChange={setPage}
/>);
  // table_pagination.figma.ts
  out.push(<TablePagination
  size="large"
  currentPage={page}
  pageCount={8}
  onPageChange={setPage}
/>);
  // table_pagination.figma.ts
  out.push(<TablePagination
  size="small"
  compact
  currentPage={page}
  pageCount={8}
  onPageChange={setPage}
/>);
  // table_pagination.figma.ts
  out.push(<TablePagination
  currentPage={page}
  pageCount={8}
  onPageChange={setPage}
/>);
  // table_pagination.figma.ts
  out.push(<TablePagination
  size="large"
  compact
  currentPage={page}
  pageCount={8}
  onPageChange={setPage}
/>);
  // text_field_large.figma.ts
  out.push(<TextField
  size="large"
  label="Tekst Label Text"
  defaultValue="Tekst Input Text"
  preIcon={<Icon name="account" />}
  postIcon={<Icon name="account" />}
  showClear
  onDropdown={() => {}}
/>);
  // text_field_large.figma.ts
  out.push(<TextField
  size="large"
  defaultValue="Tekst Input Text"
/>);
  // text_field_large.figma.ts
  out.push(<TextField
  size="large"
  label="Tekst Label Text"
  defaultValue="Tekst Input Text"
  readOnlyDisplay
  preIcon={<Icon name="account" />}
  postIcon={<Icon name="account" />}
  showClear
  onDropdown={() => {}}
/>);
  // text_field_large.figma.ts
  out.push(<TextField
  size="large"
  defaultValue="Tekst Input Text"
  readOnlyDisplay
/>);
  // text_field_large.figma.ts
  out.push(<TextField
  size="large"
  label="Tekst Label Text"
  defaultValue="Tekst Input Text"
  preIcon={<Icon name="account" />}
  postIcon={<Icon name="account" />}
  showClear
  onDropdown={() => {}}
  errorText="Feilmelding"
/>);
  // text_field_large.figma.ts
  out.push(<TextField
  size="large"
  defaultValue="Tekst Input Text"
  errorText="Feilmelding"
/>);
  // text_field_large.figma.ts
  out.push(<TextField
  size="large"
  label="Tekst Label Text"
  defaultValue="Tekst Input Text"
  readOnlyDisplay
  preIcon={<Icon name="account" />}
  postIcon={<Icon name="account" />}
  showClear
  onDropdown={() => {}}
  disabled
/>);
  // text_field_large.figma.ts
  out.push(<TextField
  size="large"
  defaultValue="Tekst Input Text"
  readOnlyDisplay
  disabled
/>);
  // text_field_medium.figma.ts
  out.push(<TextField
  label="Tekst Label Text"
  defaultValue="Tekst Input Text"
  preIcon={<Icon name="account" />}
  postIcon={<Icon name="account" />}
  showClear
  onDropdown={() => {}}
/>);
  // text_field_medium.figma.ts
  out.push(<TextField
  defaultValue="Tekst Input Text"
/>);
  // text_field_medium.figma.ts
  out.push(<TextField
  label="Tekst Label Text"
  defaultValue="Tekst Input Text"
  readOnlyDisplay
  preIcon={<Icon name="account" />}
  postIcon={<Icon name="account" />}
  showClear
  onDropdown={() => {}}
/>);
  // text_field_medium.figma.ts
  out.push(<TextField
  defaultValue="Tekst Input Text"
  readOnlyDisplay
/>);
  // text_field_medium.figma.ts
  out.push(<TextField
  label="Tekst Label Text"
  defaultValue="Tekst Input Text"
  preIcon={<Icon name="account" />}
  postIcon={<Icon name="account" />}
  showClear
  onDropdown={() => {}}
  errorText="Feilmelding"
/>);
  // text_field_medium.figma.ts
  out.push(<TextField
  defaultValue="Tekst Input Text"
  errorText="Feilmelding"
/>);
  // text_field_medium.figma.ts
  out.push(<TextField
  label="Tekst Label Text"
  defaultValue="Tekst Input Text"
  readOnlyDisplay
  preIcon={<Icon name="account" />}
  postIcon={<Icon name="account" />}
  showClear
  onDropdown={() => {}}
  disabled
/>);
  // text_field_medium.figma.ts
  out.push(<TextField
  defaultValue="Tekst Input Text"
  readOnlyDisplay
  disabled
/>);
  // text_field_small.figma.ts
  out.push(<TextField
  size="small"
  label="Tekst Label Text"
  defaultValue="Tekst Input Text"
  preIcon={<Icon name="account" />}
  postIcon={<Icon name="account" />}
  showClear
  onDropdown={() => {}}
/>);
  // text_field_small.figma.ts
  out.push(<TextField
  size="small"
  defaultValue="Tekst Input Text"
/>);
  // text_field_small.figma.ts
  out.push(<TextField
  size="small"
  label="Tekst Label Text"
  defaultValue="Tekst Input Text"
  readOnlyDisplay
  preIcon={<Icon name="account" />}
  postIcon={<Icon name="account" />}
  showClear
  onDropdown={() => {}}
/>);
  // text_field_small.figma.ts
  out.push(<TextField
  size="small"
  defaultValue="Tekst Input Text"
  readOnlyDisplay
/>);
  // text_field_small.figma.ts
  out.push(<TextField
  size="small"
  label="Tekst Label Text"
  defaultValue="Tekst Input Text"
  preIcon={<Icon name="account" />}
  postIcon={<Icon name="account" />}
  showClear
  onDropdown={() => {}}
  errorText="Feilmelding"
/>);
  // text_field_small.figma.ts
  out.push(<TextField
  size="small"
  defaultValue="Tekst Input Text"
  errorText="Feilmelding"
/>);
  // text_field_small.figma.ts
  out.push(<TextField
  size="small"
  label="Tekst Label Text"
  defaultValue="Tekst Input Text"
  readOnlyDisplay
  preIcon={<Icon name="account" />}
  postIcon={<Icon name="account" />}
  showClear
  onDropdown={() => {}}
  disabled
/>);
  // text_field_small.figma.ts
  out.push(<TextField
  size="small"
  defaultValue="Tekst Input Text"
  readOnlyDisplay
  disabled
/>);
  // user_location.figma.ts
  out.push(<UserLocationButton mode="notActive" onClick={() => {}} />);
  // user_location.figma.ts
  out.push(<UserLocationButton mode="active" onClick={() => {}} />);
  // user_location.figma.ts
  out.push(<UserLocationButton mode="north" onClick={() => {}} />);
  // activation_card.figma.ts
  out.push(<ActivationCard
  activation={activation}
  onRemove={() => {}}
  onReceipt={() => {}}
  onShowInMap={() => {}}
/>);
  // activation_card.figma.ts
  out.push(<ActivationCard
  activation={activation}
  onReportCapture={() => {}}
  onReceipt={() => {}}
  onShowInMap={() => {}}
/>);
  // callout.figma.ts
  out.push(<Callout
  text={"Linje \"1\"\nLinje 2"}
  action={<Button label="Last ned her" variant="secondary" />}
/>);
  // card_type_badge.figma.ts
  out.push(<CardTypeBadge type="dagskort" />);
  // card_type_badge.figma.ts
  out.push(<CardTypeBadge type="ukeskort" />);
  // card_type_badge.figma.ts
  out.push(<CardTypeBadge type="manedskort" />);
  // card_type_badge.figma.ts
  out.push(<CardTypeBadge type="aarskort" />);
  // card_type_badge.figma.ts
  out.push(<CardTypeBadge type="sesongkort" />);
  // card_type_badge.figma.ts
  out.push(<CardTypeBadge type="tilleggskort" />);
  // card_type_badge.figma.ts
  out.push(<CardTypeBadge type="alternativ1" />);
  // card_type_badge.figma.ts
  out.push(<CardTypeBadge type="alternativ2" />);
  // card_type_badge_inactive.figma.ts
  out.push(<CardTypeBadge type="ukeskort" inactive />);
  // day_cell.figma.ts
  out.push(<DayCell
  slot={slot}
  onClick={() => {}}
/>);
  // day_cell.figma.ts
  out.push(<DayCell
  slot={slot}
  selected
  onClick={() => {}}
/>);
  // day_cell.figma.ts
  out.push(<DayCell
  slot={slot}
/>);
  // day_picker.figma.ts
  out.push(<DayPicker
  slots={slots}
  selected={days}
  onToggle={(day) => {}}
/>);
  // filter_checkbox_tile.figma.ts
  out.push(<FilterCheckboxTile
  label="Agder"
  checked={false}
  onChange={(checked) => {}}
  activeSubFilters={1}
  onClearSubFilters={() => {}}
  onOpen={() => {}}
/>);
  // filter_checkbox_tile.figma.ts
  out.push(<FilterCheckboxTile
  label="Agder"
  checked={false}
  onChange={(checked) => {}}
/>);
  // filter_option_tile.figma.ts
  out.push(<FilterOptionTile
  kind="check"
  label="Tiur"
  species="tiur"
  selected={false}
  onChange={(selected) => {}}
/>);
  // filter_option_tile.figma.ts
  out.push(<FilterOptionTile
  kind="check"
  label="Tiur"
  species="tiur"
  selected={true}
  onChange={(selected) => {}}
/>);
  // filter_option_tile.figma.ts
  out.push(<FilterOptionTile
  kind="check"
  label="Tiur"
  species="tiur"
  selected={false}
  checkboxFirst
  onChange={(selected) => {}}
/>);
  // filter_option_tile.figma.ts
  out.push(<FilterOptionTile
  kind="check"
  label="Tiur"
  species="tiur"
  selected={true}
  checkboxFirst
  onChange={(selected) => {}}
/>);
  // filter_option_tile.figma.ts
  out.push(<FilterOptionTile
  kind="select"
  label="Tiur"
  species="tiur"
  expanded={false}
  onClick={() => {}}
/>);
  // filter_option_tile.figma.ts
  out.push(<FilterOptionTile
  kind="select"
  label="Tiur"
  species="tiur"
  expanded={true}
  onClick={() => {}}
/>);
  // filter_option_tile.figma.ts
  out.push(<FilterOptionTile
  kind="counter"
  label="Tiur"
  species="tiur"
  count={count}
  onChange={setCount}
/>);
  // filter_option_tile.figma.ts
  out.push(<FilterOptionTile
  kind="summary"
  label="Tiur"
  species="tiur"
  value="2 stk"
/>);
  // license_summary.figma.ts
  out.push(<LicenseSummary
  license={license}
/>);
  // license_summary.figma.ts
  out.push(<LicenseSummary
  license={license}
  variant="withPrice"
/>);
  // license_summary.figma.ts
  out.push(<LicenseSummary
  license={license}
  variant="full"
  onActivate={() => {}}
  onDocumentation={() => {}}
  onShowInMap={() => {}}
/>);
  // list_tile.figma.ts
  out.push(<ListTile
  title="Tekst Main Text"
  subtitle="Tekst Sub Text"
  icon="account"
  onClick={() => {}}
/>);
  // list_tile.figma.ts
  out.push(<ListTile
  title="Tekst Main Text"
  showSeparator={false}
/>);
  // list_tile.figma.ts
  out.push(<ListTile
  title="Tekst Main Text"
  subtitle="Tekst Sub Text"
  icon="account"
  layout="inline"
  onClick={() => {}}
  onDelete={() => {}}
/>);
  // list_tile.figma.ts
  out.push(<ListTile
  title="Tekst Main Text"
  layout="inline"
  onDelete={() => {}}
  showSeparator={false}
/>);
  // list_tile.figma.ts
  out.push(<ListTile
  title="Tekst Main Text"
  subtitle="Tekst Sub Text"
  icon="account"
  toggle={{ checked: true, onChange: (v) => {} }}
/>);
  // list_tile.figma.ts
  out.push(<ListTile
  title="Tekst Main Text"
  toggle={{ checked: true, onChange: (v) => {} }}
  showSeparator={false}
/>);
  // list_tile.figma.ts
  out.push(<ListTile
  title="Tekst Main Text"
  subtitle="Tekst Sub Text"
  icon="account"
  layout="inline"
  onClick={() => {}}
/>);
  // list_tile.figma.ts
  out.push(<ListTile
  title="Tekst Main Text"
  layout="inline"
  showSeparator={false}
/>);
  // list_tile.figma.ts
  out.push(<ListTile
  title="Tekst Main Text"
  subtitle="Tekst Sub Text"
  icon="account"
  onClick={() => {}}
  onDelete={() => {}}
/>);
  // list_tile.figma.ts
  out.push(<ListTile
  title="Tekst Main Text"
  onDelete={() => {}}
  showSeparator={false}
/>);
  // notice.figma.ts
  out.push(<Notice text={"Linje \"1\"\nLinje 2"} />);
  // offer_card.figma.ts
  out.push(<OfferCard
  offer={offer}
  onBuy={() => {}}
  onInfo={() => {}}
  onShowInMap={() => {}}
/>);
  // offer_card.figma.ts
  out.push(<LicenseCard
  license={license} 
  onActivate={() => {}}
  onInfo={() => {}}
  onShowInMap={() => {}}
/>);
  // offer_card.figma.ts
  out.push(<LicenseCard
  license={license} 
  onActivate={() => {}}
  onInfo={() => {}}
  onShowInMap={() => {}}
  onReportCapture={() => {}}
/>);
  // offer_card.figma.ts
  out.push(<LicenseDetails
  license={license}
  onActivate={() => {}}
  onShowInMap={() => {}}
  onRules={() => {}}
  onReceipt={() => {}}
  onOfferInfo={() => {}}
  onDownloadOfflineMap={() => {}}
/>);
  // offer_image.figma.ts
  out.push(<OfferImage src={offer.image} />);
  // section_header.figma.ts
  out.push(<ExpandableSection title="Linje &quot;1&quot; Linje 2">
  <ListTile title="Treff 1" />
</ExpandableSection>);
  // species_tile.figma.ts
  out.push(<SpeciesTile
  species="lirype"
  label="Tekst Artsnavn"
/>);
  // species_tile.figma.ts
  out.push(<SpeciesTile
  species="lirype"
  label="Tekst Artsnavn"
  layout="horizontal"
/>);
  // species_tile.figma.ts
  out.push(<SpeciesTile
  species="lirype"
  label="Tekst Artsnavn"
  layout="small"
/>);
  // species_tile.figma.ts
  out.push(<SpeciesTile
  species="lirype"
  label="Tekst Artsnavn"
  layout="horizontalTrailing"
/>);
  // icon_account.figma.ts
  out.push(<Icon name="account" />);
  // icon_accuracy.figma.ts
  out.push(<Icon name="accuracy" />);
  // icon_camera.figma.ts
  out.push(<Icon name="camera" />);
  // icon_contact.figma.ts
  out.push(<Icon name="contact" />);
  // icon_dayOff.figma.ts
  out.push(<Icon name="dayOff" />);
  // icon_downloadFromCloud.figma.ts
  out.push(<Icon name="downloadFromCloud" />);
  // icon_editFolder.figma.ts
  out.push(<Icon name="editFolder" />);
  // icon_fishingHook.figma.ts
  out.push(<Icon name="fishingHook" />);
  // icon_hunter.figma.ts
  out.push(<Icon name="hunter" />);
  // icon_information.figma.ts
  out.push(<Icon name="information" />);
  // icon_key.figma.ts
  out.push(<Icon name="key" />);
  // icon_location.figma.ts
  out.push(<Icon name="location" />);
  // icon_logCabin.figma.ts
  out.push(<Icon name="logCabin" />);
  // icon_logCabinColored.figma.ts
  out.push(<Icon name="logCabinColored" />);
  // icon_logout.figma.ts
  out.push(<Icon name="logout" />);
  // icon_map.figma.ts
  out.push(<Icon name="map" />);
  // icon_modeSwitch.figma.ts
  out.push(<Icon name="modeSwitch" />);
  // icon_noMap.figma.ts
  out.push(<Icon name="noMap" />);
  // icon_notification.figma.ts
  out.push(<Icon name="notification" />);
  // icon_priceTag.figma.ts
  out.push(<Icon name="priceTag" />);
  // icon_receipt.figma.ts
  out.push(<Icon name="receipt" />);
  // icon_remove.figma.ts
  out.push(<Icon name="remove" />);
  // icon_report.figma.ts
  out.push(<Icon name="report" />);
  // icon_schedule.figma.ts
  out.push(<Icon name="schedule" />);
  // icon_settings.figma.ts
  out.push(<Icon name="settings" />);
  // icon_sleepingInBed.figma.ts
  out.push(<Icon name="sleepingInBed" />);
  // icon_synchronize.figma.ts
  out.push(<Icon name="synchronize" />);
  // species_abbor.figma.ts
  out.push(<SpeciesIcon species="abbor" />);
  // species_brunorret.figma.ts
  out.push(<SpeciesIcon species="brunorret" />);
  // species_fjellrype.figma.ts
  out.push(<SpeciesIcon species="fjellrype" />);
  // species_gjedde.figma.ts
  out.push(<SpeciesIcon species="gjedde" />);
  // species_gjess.figma.ts
  out.push(<SpeciesIcon species="gjess" />);
  // species_gjors.figma.ts
  out.push(<SpeciesIcon species="gjors" />);
  // species_grevling.figma.ts
  out.push(<SpeciesIcon species="grevling" />);
  // species_hare.figma.ts
  out.push(<SpeciesIcon species="hare" />);
  // species_harr.figma.ts
  out.push(<SpeciesIcon species="harr" />);
  // species_innlandsfiske.figma.ts
  out.push(<SpeciesIcon species="innlandsfiske" />);
  // species_jerpe.figma.ts
  out.push(<SpeciesIcon species="jerpe" />);
  // species_karpefisk.figma.ts
  out.push(<SpeciesIcon species="karpefisk" />);
  // species_kreps.figma.ts
  out.push(<SpeciesIcon species="kreps" />);
  // species_lake.figma.ts
  out.push(<SpeciesIcon species="lake" />);
  // species_lirype.figma.ts
  out.push(<SpeciesIcon species="lirype" />);
  // species_mar.figma.ts
  out.push(<SpeciesIcon species="mar" />);
  // species_orret.figma.ts
  out.push(<SpeciesIcon species="orret" />);
  // species_orrfugl.figma.ts
  out.push(<SpeciesIcon species="orrfugl" />);
  // species_radyr.figma.ts
  out.push(<SpeciesIcon species="radyr" />);
  // species_ringdue.figma.ts
  out.push(<SpeciesIcon species="ringdue" />);
  // species_rodrev.figma.ts
  out.push(<SpeciesIcon species="rodrev" />);
  // species_roy.figma.ts
  out.push(<SpeciesIcon species="roy" />);
  // species_roye.figma.ts
  out.push(<SpeciesIcon species="roye" />);
  // species_royskatt.figma.ts
  out.push(<SpeciesIcon species="royskatt" />);
  // species_sik.figma.ts
  out.push(<SpeciesIcon species="sik" />);
  // species_sjoorret.figma.ts
  out.push(<SpeciesIcon species="sjoorret" />);
  // species_smaviltjakt.figma.ts
  out.push(<SpeciesIcon species="smaviltjakt" />);
  // species_tiur.figma.ts
  out.push(<SpeciesIcon species="tiur" />);
  // species_villsvin.figma.ts
  out.push(<SpeciesIcon species="villsvin" />);
  return <>{out}</>;
}
