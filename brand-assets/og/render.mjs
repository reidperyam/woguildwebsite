// Renders the link-preview sources here (og-*.html) to public/og-*.png at 1200x630, with headless Chrome.
// Usage: node brand-assets/og/render.mjs            (all of them)
//        node brand-assets/og/render.mjs og-launch  (just one)
// Set CHROME to the browser's path if it isn't in the default Windows location. Needs a network connection for Google Fonts.
import { execFileSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, '../../public');
const chrome = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const args = process.argv.slice(2);
const names = args.length ? args : readdirSync(here).filter((f) => /^og-.+\.html$/.test(f)).map((f) => f.slice(0, -5));

for (const name of names) {
  const png = path.join(out, `${name}.png`);
  execFileSync(chrome, [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    // Lets the web fonts and the inline drawing scripts finish before the screenshot.
    '--virtual-time-budget=10000',
    `--screenshot=${png}`,
    pathToFileURL(path.join(here, `${name}.html`)).href,
  ], { stdio: 'ignore' });
  console.log(`public/${name}.png`);
}
