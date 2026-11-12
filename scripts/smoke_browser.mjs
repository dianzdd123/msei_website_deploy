#!/usr/bin/env node
/**
 * Render the actual client-side SPA, follow navigation, and fail on blank
 * pages, duplicate Vue roots, obsolete layouts or broken script/data assets.
 * Run against a local HTTP server containing the public deployment snapshot.
 */
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const base = process.env.MSEI_SMOKE_ORIGIN || 'http://127.0.0.1:8765';
const outDir = 'artifacts/browser-smoke';
await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const pageErrors = [];
const missing = [];
page.on('pageerror', error => pageErrors.push(error.message));
page.on('response', response => {
  if (response.status() >= 400 && /\.(?:js|css|json)(?:\?|$)/.test(response.url())) {
    missing.push(response.status() + ': ' + response.url());
  }
});
const routes = [
  { slug: '', title: /Adaptive physical intelligence/i, selector: '.lp-hero' },
  { slug: 'people/', title: /research team/i, selector: '.lp-person', count: 3, content: 'Wen Fan' },
  { slug: 'team/', title: /research team/i, selector: '.lp-person', count: 3 },
  { slug: 'research/', title: /Adaptive physical intelligence/i, selector: '.lp-theme', count: 4 },
  { slug: 'research/microrobotics/', title: /microrobotics/i, selector: '.lp-research-work', count: 3 },
  { slug: 'research/dexterous-manipulation/', title: /Dexterous robotic manipulation/i, selector: '.lp-research-work', count: 3 },
  { slug: 'research/medical-robotics/', title: /medical robotics/i, selector: '.lp-research-work', count: 1 },
  { slug: 'research/scientific-instrumentation/', title: /scientific/i, selector: '.lp-research-work', count: 1 },
  { slug: 'projects/', title: /Flagship research/i, selector: '.lp-project', count: 3 },
  { slug: 'capabilities/', title: /Physical platforms/i, selector: '.lp-platform', count: 3 },
  { slug: 'impact/', title: /physical interaction/i, selector: '.lp-section', count: 3 },
  { slug: 'outputs/', title: /Evidence, publications/i, selector: '.lp-card', count: 3 },
  { slug: 'publications/', title: /Publications/i, selector: '.lp-pub', count: 30 },
  { slug: 'opportunities/', title: /Join the research/i, selector: '.lp-card', count: 3 },
  { slug: 'opportunities/phd/', title: /original research contribution/i, selector: '.lp-section', count: 4 },
  { slug: 'opportunities/mres/', title: /Build research skills/i, selector: '.lp-section', count: 4 },
  { slug: 'group-photo/', title: /Lab life/i, selector: '.lp-gallery-album', count: 2 },
  { slug: 'services/', title: /physical interaction/i, selector: '.lp-section', count: 3 },
  { slug: 'talks/', title: /talks/i, selector: '.lp-referral-head' },
  { slug: 'teaching/', title: /teaching/i, selector: '.lp-referral-head' },
  { slug: 'contact/', title: /research conversation/i, selector: '.lp-card', count: 4 }
];
let failures = 0;
for (const test of routes) {
  const label = test.slug || 'home';
  const url = base + '/msei_website/' + test.slug;
  const at = pageErrors.length, missingAt = missing.length;
  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    assert.equal(response?.status(), 200, 'Direct URL should return HTTP 200');
    await page.locator('#app .global-main-content > .lp-site').waitFor({ timeout: 20000 });
    await page.locator('.lp-site h1').waitFor({ timeout: 20000 });
    const title = await page.locator('.lp-site h1').first().innerText();
    assert.match(title, test.title, 'Correct title should appear');
    await page.locator(test.selector).first().waitFor({ timeout: 12000 });
    if (test.count) {
      const count = await page.locator(test.selector).count();
      assert.ok(count >= test.count, test.selector + ' needs ' + test.count + ' items, found ' + count);
    }
    if (test.content) assert.ok((await page.locator('.lp-site').innerText()).includes(test.content), 'Expected real research team content');
    assert.equal(await page.locator('#app .global-main-content > .lp-site').count(), 1, 'Exactly one unified page root');
    assert.equal(await page.locator('.lp-main-navbar').count(), 1, 'Exactly one main navigation bar');
    assert.equal(await page.locator('.rd-home, .tm-page, .rd-research').count(), 0, 'No legacy page layout roots');
    assert.deepEqual(pageErrors.slice(at), [], 'No uncaught browser JS errors');
    assert.deepEqual(missing.slice(missingAt), [], 'No missing JS/CSS/JSON assets');
    console.log('PASS', label, ':', title);
  } catch (error) {
    failures++;
    console.error('FAIL', label, ':', error.message);
    await page.screenshot({ path: outDir + '/' + label.replaceAll('/', '-') + '.png', fullPage: true }).catch(() => {});
    console.error('Page JS errors:', pageErrors.slice(at));
    console.error('Missing assets:', missing.slice(missingAt));
  }
}
// Cross-page transition: navigation must change the page without remounting a legacy application.
try {
  await page.goto(base + '/msei_website/people/', { waitUntil: 'domcontentloaded' });
  await page.locator('.lp-person').first().waitFor({ timeout: 20000 });
  await page.locator('nav.lp-main-navbar a.navbar-link[href="/msei_website/research"]').first().click();
  await page.locator('.lp-theme').first().waitFor({ timeout: 20000 });
  assert.match(await page.locator('.lp-site h1').first().innerText(), /Adaptive physical intelligence/i);
  assert.equal(await page.locator('.lp-main-navbar').count(), 1);
  console.log('PASS People → Research navigation');
} catch (error) {
  failures++;
  console.error('FAIL People → Research navigation:', error.message);
  await page.screenshot({ path: outDir + '/navigation.png', fullPage: true }).catch(() => {});
}
// Mobile check for the reported blank People route and navigation drawer.
try {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + '/msei_website/people/', { waitUntil: 'domcontentloaded' });
  await page.locator('.lp-person').first().waitFor({ timeout: 20000 });
  const menu=page.locator('button.hamburger-btn').first();
  await menu.click();
  assert.equal(await menu.getAttribute('aria-expanded'), 'true');
  await page.locator('#mobile-navigation .mobile-nav-link').first().waitFor();
  console.log('PASS Mobile People page and navigation');
} catch (error) {
  failures++;
  console.error('FAIL mobile behavior:', error.message);
  await page.screenshot({ path: outDir + '/mobile.png', fullPage: true }).catch(() => {});
}
await browser.close();
console.log('Browser smoke:', failures ? failures + ' failure(s)' : 'all checks passed');
process.exit(failures ? 1 : 0);
