#!/usr/bin/env node
// Build a template: src/<slug>/ -> templates/<slug>/ (the folder that is sold).
//   node tools/build.mjs <slug>      build one
//   node tools/build.mjs --all       build every src/* folder (except _core)
//
// src/<slug>/site.mjs      default export: { name, version, fonts: [], core: [], coreCss: bool, layouts: { name: (ctx, body) => html } }
// src/<slug>/pages/*.mjs   export const meta = { title, layout, out?, ... }; export default (ctx) => html
// src/<slug>/assets/       copied as-is
// src/<slug>/static/       copied to template root (README.md, CHANGELOG.md, ...)

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { fontFaceCss } from './lib/fonts.mjs';
import { icon } from './lib/html.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const ICONS = JSON.parse(fs.readFileSync(path.join(ROOT, 'vendor/lucide/icons.json'), 'utf8'));

const copyDir = (from, to) => fs.existsSync(from) && fs.cpSync(from, to, { recursive: true });

async function build(slug) {
  const src = path.join(ROOT, 'src', slug);
  const out = path.join(ROOT, 'templates', slug);
  const site = (await import(pathToFileURL(path.join(src, 'site.mjs')) + `?t=${Date.now()}`)).default;

  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(path.join(out, 'assets/css'), { recursive: true });
  fs.mkdirSync(path.join(out, 'assets/js'), { recursive: true });
  fs.mkdirSync(path.join(out, 'licenses'), { recursive: true });

  copyDir(path.join(src, 'assets'), path.join(out, 'assets'));
  copyDir(path.join(src, 'static'), out);
  // Optional hook: site.generate(outDir, { fs, path }) writes generated assets (e.g. SVG images)
  if (site.generate) await site.generate(out, { fs, path });

  // Fonts + licenses
  for (const key of site.fonts) {
    copyDir(path.join(ROOT, 'vendor/fonts', key), path.join(out, 'assets/fonts', key));
    fs.renameSync(path.join(out, 'assets/fonts', key, 'OFL.txt'), path.join(out, 'licenses', `font-${key}-OFL.txt`));
  }
  fs.writeFileSync(path.join(out, 'assets/css/fonts.css'), fontFaceCss(site.fonts));
  fs.copyFileSync(path.join(ROOT, 'vendor/lucide/LICENSE'), path.join(out, 'licenses/icons-lucide-ISC.txt'));

  // Core CSS + JS (classic scripts, not modules, so pages also work from file://)
  if (site.coreCss !== false) fs.copyFileSync(path.join(ROOT, 'src/_core/css/base.css'), path.join(out, 'assets/css/base.css'));
  fs.copyFileSync(path.join(ROOT, 'src/_core/css/docs.css'), path.join(out, 'assets/css/docs.css'));
  const core = ['util', ...(site.core || [])];
  const coreJs = core
    .map((m) => `/* ---- ${m}.js ---- */\n` + fs.readFileSync(path.join(ROOT, 'src/_core/js', `${m}.js`), 'utf8').trim())
    .join('\n\n');
  fs.writeFileSync(path.join(out, 'assets/js/core.js'), `/*! ${site.name} v${site.version} | core UI helpers | vanilla JS, no dependencies */\n\n${coreJs}\n`);

  // Pages
  const pagesDir = path.join(src, 'pages');
  const files = fs.readdirSync(pagesDir).filter((f) => f.endsWith('.mjs')).sort();
  const written = [];
  const mods = [];
  for (const file of files) {
    const mod = await import(pathToFileURL(path.join(pagesDir, file)) + `?t=${Date.now()}`);
    mods.push({ file, mod, meta: { layout: 'main', out: file.replace(/\.mjs$/, '.html'), ...mod.meta } });
  }
  const allPages = mods.map((m) => ({ out: m.meta.out, title: m.meta.title, description: m.meta.description || '' }));
  for (const { file, mod, meta } of mods) {
    const depth = meta.out.split('/').length - 1;
    const ctx = { site, page: meta, pages: allPages, base: '../'.repeat(depth), icon, nav: (key) => (meta.active === key ? ' is-active" aria-current="page' : '') };
    const body = mod.default(ctx);
    const layout = site.layouts[meta.layout];
    if (!layout) throw new Error(`${file}: unknown layout "${meta.layout}"`);
    const dest = path.join(out, meta.out);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, layout(ctx, body));
    written.push(dest);
  }

  // Icon sprite: only icons referenced in HTML/JS output. Paint (fill/stroke) comes from
  // .icon in base.css so templates can restyle icons (e.g. filled stars, thinner strokes).
  const used = new Set();
  const scan = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) scan(p);
      else if (/\.(html|js)$/.test(e.name)) for (const m of fs.readFileSync(p, 'utf8').matchAll(/#i-([a-z0-9-]+)/g)) used.add(m[1]);
    }
  };
  scan(out);
  const missing = [...used].filter((n) => !ICONS[n]);
  if (missing.length) throw new Error(`Unknown Lucide icons: ${missing.join(', ')}`);
  const symbols = [...used]
    .sort()
    .map((n) => `<symbol id="i-${n}" viewBox="0 0 24 24">${ICONS[n]}</symbol>`)
    .join('');
  fs.writeFileSync(
    path.join(out, 'assets/js/icons.js'),
    `/*! Icon sprite: Lucide (ISC license, see /licenses). Generated, ${used.size} icons. Load right after <body>. */\n` +
      `document.body.insertAdjacentHTML('afterbegin', ${JSON.stringify(`<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${symbols}</svg>`)});\n`
  );

  execFileSync('prettier', ['--log-level', 'warn', '--print-width', '140', '--write', ...written], { stdio: 'inherit' });
  console.log(`✓ ${slug}: ${written.length} pages, ${used.size} icons -> templates/${slug}`);
}

const arg = process.argv[2];
if (!arg) {
  console.error('usage: node tools/build.mjs <slug> | --all');
  process.exit(1);
}
const slugs = arg === '--all' ? fs.readdirSync(path.join(ROOT, 'src')).filter((d) => !d.startsWith('_')) : [arg];
for (const s of slugs) await build(s);
