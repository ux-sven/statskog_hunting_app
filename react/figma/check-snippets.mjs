import fs from 'fs';
import path from 'path'; import { fileURLToPath } from 'url';
const here = path.dirname(fileURLToPath(import.meta.url));
const root = here + '/';
const flat = v => Array.isArray(v) ? v.map(flat).join('') : (v && v.__code!==undefined ? v.__code : (v===undefined||v===null||v===false? '' : String(v)));
const code = (s,...vals)=>({__code: s.reduce((a,str,i)=>a+str+(i<vals.length?flat(vals[i]):''),'')});
const iconSwap = {type:'INSTANCE', codeConnectId:()=>'react-appicon-account', executeTemplate:()=>({example: code`<Icon name="account" />`, metadata:{}})};
const mk = (pick, bool) => ({
  getBoolean:()=> bool,
  getString:(n)=> n === 'Label' ? 'Kjøp' : 'Tekst ' + n,
  getEnum:(n,map)=> { const keys=Object.keys(map); return map[keys[pick % keys.length]]; },
  getInstanceSwap:(n)=> n==='Arttype' ? {type:'INSTANCE', codeConnectId:()=>'speciesicon-lirype'} : iconSwap,
  findText:()=>({textContent:'Linje "1"\nLinje 2'}),
  findInstance:(name)=> name==='Art' ? {type:'INSTANCE', executeTemplate:()=>({example: code``, metadata:{props:{species:'tiur',label:'Tiur'}}})}
     : name==='Card' ? {type:'INSTANCE', executeTemplate:()=>({example: code``, metadata:{props:{type:'ukeskort'}}})}
     : name==='Button Medium' ? {type:'INSTANCE', executeTemplate:()=>({example: code`<Button label="Last ned her" variant="secondary" />`, metadata:{}})}
     : {type:'INSTANCE', executeTemplate:()=>({example: code``, metadata:{props:{label: name.replace('Tab Bar Button Small ','Fane '), active: name.endsWith(' 2'), disabled:name.endsWith(' 3')}}})},
});
let fails=0, snippets=[];
for (const sub of ['components','content','icons']) for (const f of fs.readdirSync(root+sub)) {
  const src=fs.readFileSync(root+sub+'/'+f,'utf8').replace("import figma from 'figma'",'').replace('export default','return');
  for (let pick=0; pick<8; pick++) for (const bool of [true,false]) {
    try {
      const r=new Function('figma', src)({selectedInstance: mk(pick,bool), code});
      const txt=flat(r.example);
      if(/undefined|\[object/.test(txt)) { console.log('BAD', f, txt); fails++; }
      snippets.push(`  // ${f}\n  out.push(${txt.replace(/\/\/ aktivert[^\n]*/, '')});`);
      if (sub==='icons') break;
    } catch(e) { console.log('ERR',f,e.message); fails++; }
  }
}
const uniq=[...new Set(snippets)];
fs.writeFileSync(path.join(here, '../src/figmaSnippets.check.tsx'), `// GENERERT av figma/check-snippets.mjs – sjekker at Code Connect-eksemplene kompilerer.
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
${uniq.join('\n')}
  return <>{out}</>;
}
`);
console.log('snippets', uniq.length, 'fails', fails);
