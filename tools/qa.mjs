#!/usr/bin/env node
// QA a built template with headless Chromium.
//   node tools/qa.mjs <slug> [--pages=index,login] [--widths=1440,390] [--dark] [--full]
// Writes screenshots to .qa/<slug>/ and exits non-zero on problems:
//   console errors, failed/404 requests, requests to external hosts, horizontal overflow,
//   broken internal links, <img> without alt, missing <title>/lang/dir.

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  ({ chromium } = require(path.join(execSync('npm root -g').toString().trim(), 'playwright')));
}

const [slug, ...flags] = process.argv.slice(2);
if (!slug) {
  console.error('usage: node tools/qa.mjs <slug> [--pages=a,b] [--widths=1440,390] [--dark] [--full]');
  process.exit(1);
}
const opt = Object.fromEntries(flags.map((f) => f.replace(/^--/, '').split('=')).map(([k, v]) => [k, v ?? true]));
const dir = path.join(ROOT, 'templates', slug);
const outDir = path.join(ROOT, '.qa', slug);
fs.mkdirSync(outDir, { recursive: true });

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.json': 'application/json', '.ico': 'image/x-icon' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(dir, p);
  if (!f.startsWith(dir) || !fs.existsSync(f)) {
    res.writeHead(404).end('404');
    return;
  }
  res.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(0, r));
const origin = `http://127.0.0.1:${server.address().port}`;

const allPages = [];
const walk = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory() && e.name !== 'assets') walk(p);
    else if (e.name.endsWith('.html')) allPages.push(path.relative(dir, p));
  }
};
walk(dir);
const pages = opt.pages ? opt.pages.split(',').map((p) => (p.endsWith('.html') ? p : `${p}.html`)) : allPages;
const widths = (opt.widths || '1440,390').split(',').map(Number);

const browser = await chromium.launch();
const problems = [];
const report = (page, msg) => problems.push(`${page}: ${msg}`);

for (const rel of pages) {
  for (const width of widths) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: opt.dark ? 'dark' : 'light', deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const tag = `${rel}@${width}`;
    page.on('console', (m) => m.type() === 'error' && report(tag, `console: ${m.text()}`));
    page.on('pageerror', (e) => report(tag, `js error: ${e.message}`));
    page.on('requestfailed', (r) => report(tag, `request failed: ${r.url()}`));
    page.on('response', (r) => r.status() >= 400 && report(tag, `HTTP ${r.status()}: ${r.url()}`));
    page.on('request', (r) => {
      const u = r.url();
      if (!u.startsWith(origin) && !u.startsWith('data:') && !u.startsWith('blob:')) report(tag, `external request: ${u}`);
    });
    await page.goto(`${origin}/${rel}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    // Scroll through once so scroll-triggered reveals/counters run, then return to top
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(700);
    // Let reveal animations settle, then force them visible for the screenshot.
    await page.addStyleTag({ content: '[data-reveal]{opacity:1!important;transform:none!important;transition:none!important}' });
    await page.waitForTimeout(300);

    const info = await page.evaluate(() => {
      const de = document.documentElement;
      const wide = [...document.querySelectorAll('body *')]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && (r.right > de.clientWidth + 1 || r.left < -1) && getComputedStyle(el).position !== 'fixed' && !el.closest('[data-overflow-ok], .sr-only, [aria-hidden="true"], [hidden]');
        })
        .slice(0, 3)
        .map((el) => el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : ''));
      return {
        overflow: de.scrollWidth > de.clientWidth + 1,
        wide,
        lang: de.lang,
        dir: de.dir,
        title: document.title,
        imgNoAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).map((i) => i.src).slice(0, 3),
        links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
      };
    });
    if (info.overflow) report(tag, `horizontal overflow (${info.wide.join(', ') || 'unknown element'})`);
    if (info.lang !== 'fa' || info.dir !== 'rtl') report(tag, `html lang/dir is "${info.lang}/${info.dir}"`);
    if (!info.title) report(tag, 'missing <title>');
    if (info.imgNoAlt.length) report(tag, `img without alt: ${info.imgNoAlt.join(', ')}`);
    if (width === widths[0]) {
      for (const href of new Set(info.links)) {
        if (/^(#|mailto:|tel:|https?:|javascript:)/.test(href)) continue;
        const target = path.join(dir, path.dirname(rel), href.split(/[?#]/)[0]);
        if (!fs.existsSync(target)) report(tag, `broken link: ${href}`);
      }
    }
    const shot = path.join(outDir, `${rel.replace(/[\\/]/g, '__').replace(/\.html$/, '')}-${width}${opt.dark ? '-dark' : ''}.png`);
    await page.screenshot({ path: shot, fullPage: !!opt.full || width < 800 });
    // --tiles=N: also save N viewport-height slices down the page (easier to inspect than one tall image)
    if (opt.tiles) {
      const h = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let i = 0; i < Number(opt.tiles) && i * 900 < h; i++) {
        await page.screenshot({ path: shot.replace(/\.png$/, `-t${i}.png`), fullPage: true, clip: { x: 0, y: i * 900, width, height: Math.min(900, h - i * 900) } });
      }
    }
    await ctx.close();
  }
}

await browser.close();
server.close();
const uniq = [...new Set(problems)];
if (uniq.length) {
  console.log(`✗ ${slug}: ${uniq.length} problem(s)`);
  for (const p of uniq) console.log('  - ' + p);
  process.exit(1);
}
console.log(`✓ ${slug}: ${pages.length} page(s) × ${widths.length} width(s) clean. Screenshots in .qa/${slug}/`);
