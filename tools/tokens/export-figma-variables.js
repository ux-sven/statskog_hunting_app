// Kjøres i Figma via MCP-verktøyet use_figma (Plugin API). Leser token-samlingene
// og returnerer JSON som lagres i tokens/figma-variables.json.
// Kun lesing – endrer ingenting i Figma-fila.
const WANTED = ['Token Colors', 'Token Dimensions', 'Typography'];
const cols = (await figma.variables.getLocalVariableCollectionsAsync()).filter((c) => WANTED.includes(c.name));
const byId = new Map();
for (const v of await figma.variables.getLocalVariablesAsync()) byId.set(v.id, v);
const hex = (c) => {
  const h = (x) => Math.round(x * 255).toString(16).padStart(2, '0');
  return '#' + h(c.r) + h(c.g) + h(c.b) + (c.a !== undefined && c.a < 1 ? h(c.a) : '');
};
const plain = (v) => (v && typeof v === 'object' && 'r' in v ? hex(v) : v);
// Følger alias-kjeden til en endelig verdi (primitiver har én modus).
const resolve = (val, modeName, depth = 0) => {
  if (val && typeof val === 'object' && val.type === 'VARIABLE_ALIAS') {
    const t = byId.get(val.id);
    if (!t || depth > 10) return { value: null, alias: val.id };
    const tc = cols.find((c) => c.id === t.variableCollectionId);
    const modes = Object.keys(t.valuesByMode);
    const mode = tc ? (tc.modes.find((m) => m.name === modeName) || tc.modes[0]).modeId : modes[0];
    const r = resolve(t.valuesByMode[mode] ?? t.valuesByMode[modes[0]], modeName, depth + 1);
    return { value: r.value, alias: r.alias || t.name };
  }
  return { value: plain(val) };
};
const out = { source: { fileKey: figma.fileKey, collections: WANTED }, collections: {} };
for (const c of cols) {
  const vars = {};
  for (const id of c.variableIds) {
    const v = byId.get(id);
    if (!v) continue;
    const values = {};
    for (const m of c.modes) values[m.name] = resolve(v.valuesByMode[m.modeId], m.name);
    vars[v.name] = { type: v.resolvedType, values };
  }
  out.collections[c.name] = { modes: c.modes.map((m) => m.name), variables: vars };
}
return out;
