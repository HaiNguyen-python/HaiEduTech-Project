#!/usr/bin/env node
/**
 * Smoke-test all static routes against the local Vite dev server.
 * Detects: pageerror, console errors, lazy chunk load fail, blank body.
 *
 * Usage: BASE=http://localhost:8080 node scripts/smoke-test-routes.mjs
 */
import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = process.env.BASE || 'http://localhost:8080';
const routes = JSON.parse(fs.readFileSync('scripts/all-routes.json', 'utf8'));

// Optional: limit concurrency for stability
const CONCURRENCY = 4;
const TIMEOUT_MS = 20000;

// Console-error noise we want to ignore (known React dev warnings, etc.)
const IGNORE_PATTERNS = [
  /React does not recognize the/i,
  /React Router Future Flag Warning/i,
  /tiptap warn/i,
  /Download the React DevTools/i,
  /Unknown message type/i,
  /Failed to load resource.*favicon/i,
  /\[vite\]/i,
];

function shouldIgnore(text) {
  return IGNORE_PATTERNS.some((re) => re.test(text));
}

async function testRoute(browser, path) {
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await ctx.newPage();
  const errors = [];
  const consoleErrors = [];
  const failedRequests = [];

  page.on('pageerror', (e) => errors.push(String(e?.message || e)));
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const t = msg.text();
      if (!shouldIgnore(t)) consoleErrors.push(t);
    }
  });
  page.on('requestfailed', (req) => {
    const f = req.failure();
    if (f && !/favicon/.test(req.url())) failedRequests.push(`${req.url()} :: ${f.errorText}`);
  });

  let status = 0;
  let bodyLen = 0;
  let lazyFail = false;
  try {
    const resp = await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle', timeout: TIMEOUT_MS });
    status = resp ? resp.status() : 0;
    // wait a bit for lazy chunks / suspense
    await page.waitForTimeout(1200);
    bodyLen = await page.evaluate(() => document.body?.innerText?.length || 0);
    // Look for lazy-import errors
    lazyFail = [...errors, ...consoleErrors].some((m) =>
      /Failed to fetch dynamically imported module|Loading chunk \d+ failed|ChunkLoadError/i.test(m)
    );
  } catch (e) {
    errors.push(`navigation: ${String(e?.message || e)}`);
  }

  await ctx.close();

  // Classify
  let level = 'ok';
  const issues = [];
  if (errors.length) { level = 'broken'; issues.push(`pageerror x${errors.length}`); }
  if (lazyFail) { level = 'broken'; issues.push('lazy-chunk-fail'); }
  if (consoleErrors.length) {
    if (level !== 'broken') level = 'warning';
    issues.push(`console.error x${consoleErrors.length}`);
  }
  if (bodyLen < 80) {
    level = 'broken';
    issues.push(`blank body (${bodyLen})`);
  }
  if (failedRequests.length) {
    if (level === 'ok') level = 'warning';
    issues.push(`failed-req x${failedRequests.length}`);
  }

  return { path, status, bodyLen, level, issues, errors, consoleErrors, failedRequests };
}

async function main() {
  console.log(`Smoke-testing ${routes.length} routes against ${BASE}`);
  const browser = await chromium.launch({ headless: true, executablePath: '/bin/chromium', args: ['--no-sandbox', '--disable-dev-shm-usage'] });

  const results = [];
  let idx = 0;
  async function worker() {
    while (idx < routes.length) {
      const i = idx++;
      const r = routes[i];
      try {
        const res = await testRoute(browser, r);
        results.push(res);
        const icon = res.level === 'ok' ? '✅' : res.level === 'warning' ? '⚠️ ' : '❌';
        console.log(`${icon} [${i + 1}/${routes.length}] ${r} ${res.issues.join(', ')}`);
      } catch (e) {
        results.push({ path: r, level: 'broken', issues: ['worker-err'], errors: [String(e?.message || e)] });
        console.log(`❌ [${i + 1}/${routes.length}] ${r} worker error`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  await browser.close();

  results.sort((a, b) => a.path.localeCompare(b.path));
  const broken = results.filter((r) => r.level === 'broken');
  const warning = results.filter((r) => r.level === 'warning');
  const ok = results.filter((r) => r.level === 'ok');

  const summary = {
    base: BASE, total: results.length,
    ok: ok.length, warning: warning.length, broken: broken.length,
    brokenRoutes: broken.map((r) => ({ path: r.path, issues: r.issues, errors: r.errors.slice(0, 3), consoleErrors: r.consoleErrors.slice(0, 3) })),
    warningRoutes: warning.map((r) => ({ path: r.path, issues: r.issues, consoleErrors: r.consoleErrors.slice(0, 3) })),
  };
  fs.writeFileSync('scripts/route-audit-report.json', JSON.stringify({ summary, results }, null, 2));
  console.log(`\n=== Summary ===\nOK: ${ok.length}\nWarning: ${warning.length}\nBroken: ${broken.length}`);
  if (broken.length) {
    console.log(`\n=== Broken routes ===`);
    for (const r of broken) console.log(`- ${r.path}  [${r.issues.join(', ')}]\n    ${(r.errors[0]||r.consoleErrors[0]||'').slice(0,300)}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
