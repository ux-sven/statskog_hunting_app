#!/usr/bin/env node
// Lager kode fra Figma-variablene i tokens/figma-variables.json.
//
//   node tools/tokens/build.mjs           skriv filene
//   node tools/tokens/build.mjs --check   feil hvis filene ikke stemmer med JSON (for CI)
//
// Utdata (ikke rediger for hånd):
//   react/src/styles/tokens.css      fargevariabler, lys og mørk modus
//   react/src/styles/theme.css       Tailwind-tema: farger, avstand, radius, fonter
//   react/src/styles/typography.css  type-*-klasser fra «Typography»
//   lib/theme/tokens.dart            AppPalette, AppSpacing, AppRadius
//   lib/theme/typography.dart        AppType
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const src = JSON.parse(fs.readFileSync(path.join(root, 'tokens/figma-variables.json'), 'utf8'));
const col = (name) => {
  const c = src.collections[name];
  if (!c) throw new Error(`Mangler samlingen «${name}» i tokens/figma-variables.json`);
  return c;
};
const HEADER = 'GENERERT av tools/tokens/build.mjs fra tokens/figma-variables.json. Ikke rediger for hånd.';

// ---------- Navn ----------
const camel = (s) => s.replace(/[-_ ]+(\w)/g, (_, c) => c.toUpperCase());
// «text/text-primary» → «text-primary», «attention/success» → «attention-success»
const colorName = (figmaName) => {
  const parts = figmaName.split('/');
  const last = parts[parts.length - 1];
  const group = parts.length > 1 ? parts[0] : '';
  return group && !last.startsWith(group) ? `${group}-${last}` : last;
};
// «2xl» → «xxl», «3xl» → «xxxl»
const size = (s) => s.replace(/^(\d)xl$/, (_, n) => 'x'.repeat(Number(n)) + 'l');
const radiusCss = { none: 'none', s: 'small', m: 'medium', l: 'large', xl: 'xlarge', xxl: 'xxlarge', xxxl: 'xxxlarge' };

// ---------- Les verdier ----------
const colors = col('Token Colors');
const [light, dark] = [colors.modes[0], colors.modes[1]];
const colorList = Object.entries(colors.variables)
  .filter(([, v]) => v.type === 'COLOR')
  .map(([name, v]) => ({ figma: name, css: colorName(name), dart: camel(colorName(name)), light: v.values[light].value, dark: v.values[dark ?? light].value, alias: v.values[light].alias }));

const dims = col('Token Dimensions');
const dimMode = dims.modes[0];
const dimList = (prefix) =>
  Object.entries(dims.variables)
    .filter(([n]) => n.startsWith(prefix + '/'))
    .map(([n, v]) => ({ key: size(n.slice(prefix.length + 1)), value: v.values[dimMode].value }));
const spacing = dimList('spacing');
const radius = dimList('radius');

const typo = col('Typography');
const typoMode = typo.modes[0];
const tv = (n) => typo.variables[n]?.values[typoMode].value;
const families = Object.keys(typo.variables)
  .filter((n) => n.startsWith('font-type/'))
  .map((n) => ({ group: n.slice(10).toLowerCase(), family: tv(n) }));
// «subtitle-large-h4» → stil «subtitle-large», gruppe «subtitle»
const styles = Object.keys(typo.variables)
  .filter((n) => n.startsWith('font-size/'))
  .map((n) => {
    const key = n.slice(10);
    const name = key.replace(/^(subtitle-[a-z]+)-h\d$/, '$1');
    const group = name.split('-')[0];
    const lh = tv(`line-height/${key}`);
    if (lh === undefined) throw new Error(`Mangler line-height/${key}`);
    return { name, group, size: tv(n), lineHeight: lh };
  });

const hexToDart = (hex) => {
  const h = hex.replace('#', '');
  const rgb = h.slice(0, 6).toUpperCase();
  const a = (h.length === 8 ? h.slice(6, 8) : 'ff').toUpperCase();
  return `Color(0x${a}${rgb})`;
};
const hexToCss = (hex) => {
  const h = hex.replace('#', '');
  if (h.length !== 8) return `#${h}`;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  const a = Math.round((parseInt(h.slice(6, 8), 16) / 255) * 100) / 100;
  return `rgb(${r} ${g} ${b} / ${a})`;
};
const num = (n) => (Number.isInteger(n) ? `${n}.0` : String(n));

// ---------- React ----------
const tokensCss = `/* ${HEADER}
   Figma-samling «Token Colors» (modus ${light} og ${dark}). */
:root {
${colorList.map((c) => `  --${c.css}: ${hexToCss(c.light)};`).join('\n')}
  color-scheme: light;
}

:root[data-theme='dark'] {
${colorList.map((c) => `  --${c.css}: ${hexToCss(c.dark)};`).join('\n')}
  color-scheme: dark;
}
`;

const themeCss = `/* ${HEADER} */
@theme inline {
${colorList.map((c) => `  --color-${c.css}: var(--${c.css});`).join('\n')}

  /* Token Dimensions/spacing */
${spacing.filter((s) => s.key !== 'none').map((s) => `  --spacing-${s.key}: ${s.value}px;`).join('\n')}

  /* Token Dimensions/radius */
${radius.filter((r) => r.key !== 'none').map((r) => `  --radius-${radiusCss[r.key] ?? r.key}: ${r.value}px;`).join('\n')}

  /* Typography/font-type */
${families.map((f) => `  --font-${f.group}: '${f.family}', ${/garamond|serif/i.test(f.family) ? 'Georgia, serif' : 'system-ui, sans-serif'};`).join('\n')}
}
`;

const cssStyleName = (n) => n.replace('xtra-small', 'xsmall');
const typographyCss = `/* ${HEADER}
   Figma-samling «Typography» (modus ${typoMode}). Bruk: class="type-body-large". */
${styles.map((s) => `@utility type-${cssStyleName(s.name)} { font-family: var(--font-${s.group}); font-size: ${s.size}px; line-height: ${s.lineHeight}px; }`).join('\n')}
`;

// ---------- Flutter ----------
const fields = colorList.map((c) => c.dart);
const tokensDart = `// ${HEADER}
import 'package:flutter/material.dart';

/// Fargetokens fra Figma-samlingen «Token Colors» (modus ${light} og ${dark}).
/// Navnene speiler Figma: \`cta/cta-primary-default\` → [ctaPrimaryDefault].
///
/// Komponentene leser fargene med \`AppPalette.of(context)\`, så de følger
/// lys/mørk modus automatisk.
@immutable
class AppPalette extends ThemeExtension<AppPalette> {
  const AppPalette({
${fields.map((f) => `    required this.${f},`).join('\n')}
  });

${colorList.map((c) => `  /// Figma: \`${c.figma}\`${c.alias ? ` (${c.alias})` : ''}\n  final Color ${c.dart};`).join('\n')}

  static const light = AppPalette(
${colorList.map((c) => `    ${c.dart}: ${hexToDart(c.light)},`).join('\n')}
  );

  static const dark = AppPalette(
${colorList.map((c) => `    ${c.dart}: ${hexToDart(c.dark)},`).join('\n')}
  );

  /// Henter paletten fra temaet, med Light som reserve.
  static AppPalette of(BuildContext context) =>
      Theme.of(context).extension<AppPalette>() ?? light;

  @override
  AppPalette copyWith() => this;

  @override
  AppPalette lerp(ThemeExtension<AppPalette>? other, double t) {
    if (other is! AppPalette) return this;
    Color l(Color a, Color b) => Color.lerp(a, b, t)!;
    return AppPalette(
${fields.map((f) => `      ${f}: l(${f}, other.${f}),`).join('\n')}
    );
  }
}

/// «Token Dimensions/spacing/*» fra Figma.
abstract final class AppSpacing {
${spacing.map((s) => `  static const ${s.key} = ${num(s.value)};`).join('\n')}
}

/// «Token Dimensions/radius/*» fra Figma.
abstract final class AppRadius {
${radius.map((r) => `  static const ${r.key} = ${num(r.value)};`).join('\n')}

  /// Helt avrundet (pille/sirkel). Finnes ikke som variabel i Figma.
  static const full = 999.0;
}

/// Felles størrelsesskala. Figma har Small / Medium / Large på de fleste sider.
enum AppSize { small, medium, large }
`;

const dartStyle = (n) => camel(n.replace('xtra-small', 'xtraSmall'));
const familyOf = (g) => families.find((f) => f.group === g)?.family ?? families[0].family;
const buttons = styles.filter((s) => s.group === 'button').map((s) => s.name.split('-')[1]);
const typographyDart = `// ${HEADER}
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';

import 'tokens.dart';

/// Typografi fra Figma-samlingen «Typography» (modus ${typoMode}).
abstract final class AppType {
  static TextStyle _style(String family, double size, double lineHeight) =>
      GoogleFonts.getFont(family, fontSize: size, height: lineHeight / size, fontWeight: FontWeight.w400);

${styles.map((s) => `  /// ${familyOf(s.group)} ${s.size}/${s.lineHeight}\n  static TextStyle get ${dartStyle(s.name)} => _style('${familyOf(s.group)}', ${num(s.size)}, ${num(s.lineHeight)});`).join('\n')}

  /// Knappetekst per størrelse.
  static TextStyle button(AppSize size) => switch (size) {
${['small', 'medium', 'large'].map((z) => `        AppSize.${z} => ${buttons.includes(z) ? dartStyle('button-' + z) : 'buttonMedium'},`).join('\n')}
      };
}
`;

// ---------- Skriv / sjekk ----------
const outputs = {
  'react/src/styles/tokens.css': tokensCss,
  'react/src/styles/theme.css': themeCss,
  'react/src/styles/typography.css': typographyCss,
  'lib/theme/tokens.dart': tokensDart,
  'lib/theme/typography.dart': typographyDart,
};
const check = process.argv.includes('--check');
let stale = 0;
for (const [rel, text] of Object.entries(outputs)) {
  const file = path.join(root, rel);
  const old = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (old === text) continue;
  if (check) {
    console.error(`Utdatert: ${rel}`);
    stale++;
  } else {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, text);
    console.log(`Oppdatert: ${rel}`);
  }
}
console.log(`${colorList.length} farger, ${spacing.length} avstander, ${radius.length} radier, ${styles.length} tekststiler.`);
if (check && stale) {
  console.error('Kjør «node tools/tokens/build.mjs» for å oppdatere.');
  process.exit(1);
}
