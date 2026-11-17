// Renders the Discord event cover (discord-event-launch.html) to discord-event-launch.png at 2x (1600x800), with headless Chrome.
// Usage: node brand-assets/discord/render.mjs
// Set CHROME to the browser's path if it isn't in the default Windows location. Needs a network connection for Google Fonts.
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const chrome = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const name = 'discord-event-launch';

execFileSync(chrome, [
  '--headless',
  '--disable-gpu',
  '--hide-scrollbars',
  '--force-device-scale-factor=2',
  '--window-size=800,400',
  // Lets the web font and the star script finish before the screenshot.
  '--virtual-time-budget=10000',
  `--screenshot=${path.join(here, `${name}.png`)}`,
  pathToFileURL(path.join(here, `${name}.html`)).href,
], { stdio: 'ignore' });
console.log(`brand-assets/discord/${name}.png`);
