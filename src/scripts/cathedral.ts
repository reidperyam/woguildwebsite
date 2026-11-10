// Interactive whimsy for the Cathedral (Lore page): doves, petals, veneration, votive candles,
// the Heavenly Choir and a hidden miracle. Sounds come from holy-audio.ts.
import { bell, choir, harp, PENTATONIC } from './holy-audio';
import { howl } from './howl';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fx = document.querySelector<HTMLElement>('.fx-layer');
const doveTemplate = document.querySelector<HTMLTemplateElement>('#dove-template');
const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)];

function store<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function save(key: string, value: unknown) {
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
}

// ---------- Effects ----------

function releaseDove(x: number, y: number, dir = Math.random() < 0.5 ? -1 : 1) {
  if (reduceMotion || !fx || !doveTemplate) return;
  const bird = document.createElement('div');
  bird.className = 'spawned-dove';
  bird.append(doveTemplate.content.cloneNode(true));
  const size = rand(38, 64);
  bird.style.width = `${size}px`;
  fx.append(bird);
  const dx = dir * rand(260, 620);
  const dy = -rand(320, 640);
  const flip = dir < 0 ? -1 : 1;
  const flight = bird.animate(
    [
      { transform: `translate(${x - size / 2}px, ${y - size / 3}px) scale(${flip * 0.4}, 0.4)`, opacity: 0 },
      { opacity: 1, offset: 0.1 },
      { transform: `translate(${x + dx * 0.5}px, ${y + dy * 0.35}px) scale(${flip}, 1)`, offset: 0.5 },
      { transform: `translate(${x + dx}px, ${y + dy}px) scale(${flip * 0.7}, 0.7)`, opacity: 0 },
    ],
    { duration: rand(2400, 3600), easing: 'cubic-bezier(.3,.1,.6,1)' },
  );
  flight.onfinish = () => bird.remove();
}

function releaseFlock(count: number) {
  const h = window.innerHeight;
  const w = window.innerWidth;
  for (let i = 0; i < count; i++) {
    window.setTimeout(() => releaseDove(rand(0.1, 0.9) * w, h + 20, Math.random() < 0.5 ? -1 : 1), i * 120);
  }
}

function petalShower(count: number) {
  if (reduceMotion || !fx) return;
  const w = window.innerWidth;
  const h = window.innerHeight;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'spawned-petal';
    p.style.left = `${rand(0, w)}px`;
    p.style.setProperty('--hue', String(rand(330, 360)));
    fx.append(p);
    const drift = rand(-160, 160);
    const fall = p.animate(
      [
        { transform: `translate(0, -40px) rotate(0deg)`, opacity: 0 },
        { opacity: 1, offset: 0.1 },
        { transform: `translate(${drift}px, ${h + 60}px) rotate(${rand(360, 900)}deg)`, opacity: 0.9 },
      ],
      { duration: rand(3500, 6500), delay: rand(0, 1200), easing: 'linear' },
    );
    fall.onfinish = () => p.remove();
  }
}

function sparkleBurst(x: number, y: number, glyphs = ['✦', '♥', '✧', '❦']) {
  if (reduceMotion || !fx) return;
  for (let i = 0; i < 16; i++) {
    const s = document.createElement('span');
    s.className = 'spawned-sparkle';
    s.textContent = pick(glyphs);
    s.style.fontSize = `${rand(14, 30)}px`;
    fx.append(s);
    const angle = (i / 16) * Math.PI * 2 + rand(-0.2, 0.2);
    const dist = rand(70, 170);
    const burst = s.animate(
      [
        { transform: `translate(${x}px, ${y}px) scale(0.3)`, opacity: 1 },
        { transform: `translate(${x + Math.cos(angle) * dist}px, ${y + Math.sin(angle) * dist - 40}px) scale(1)`, opacity: 0 },
      ],
      { duration: rand(900, 1500), easing: 'cubic-bezier(.2,.8,.3,1)' },
    );
    burst.onfinish = () => s.remove();
  }
}

function goldFlash() {
  if (reduceMotion || !fx) return;
  const flash = document.createElement('div');
  flash.className = 'gold-flash';
  fx.append(flash);
  flash.animate([{ opacity: 0 }, { opacity: 0.85, offset: 0.2 }, { opacity: 0 }], { duration: 1600, easing: 'ease-out' }).onfinish = () => flash.remove();
}

function bigCry(text: string) {
  if (!fx) return;
  const el = document.createElement('div');
  el.className = 'big-cry';
  el.textContent = text;
  fx.append(el);
  const frames = reduceMotion
    ? [{ opacity: 0 }, { opacity: 1, offset: 0.2 }, { opacity: 1, offset: 0.8 }, { opacity: 0 }]
    : [
        { transform: 'translate(-50%, -50%) scale(0.2) rotate(-8deg)', opacity: 0 },
        { transform: 'translate(-50%, -50%) scale(1.1) rotate(2deg)', opacity: 1, offset: 0.25 },
        { transform: 'translate(-50%, -50%) scale(1) rotate(0deg)', opacity: 1, offset: 0.75 },
        { transform: 'translate(-50%, -60%) scale(1.3)', opacity: 0 },
      ];
  el.animate(frames, { duration: 2800, easing: 'ease-out' }).onfinish = () => el.remove();
}

// ---------- The Heavenly Choir ----------

let singing = false;
function summonChoir(amenOnly = false) {
  if (singing) return;
  singing = true;
  const ms = choir(amenOnly) || 4700;
  document.documentElement.classList.add('choir-on');
  releaseFlock(10);
  petalShower(40);
  window.setTimeout(() => {
    document.documentElement.classList.remove('choir-on');
    singing = false;
  }, ms);
}
document.querySelectorAll<HTMLButtonElement>('[data-choir]').forEach((b) => b.addEventListener('click', () => summonChoir()));

// ---------- The HAROOOO ----------

let howling = false;
function haroooo() {
  if (howling) return 0;
  howling = true;
  const ms = howl() || 3000;
  document.documentElement.classList.add('howling');
  releaseFlock(5);
  window.setTimeout(() => {
    document.documentElement.classList.remove('howling');
    howling = false;
  }, ms);
  return ms;
}
document.querySelectorAll<HTMLButtonElement>('[data-howl]').forEach((b) => b.addEventListener('click', haroooo));

// Share a link that summons the cry: /lore#haroooo
const shareStatus = document.querySelector<HTMLElement>('[data-share-status]');
document.querySelector<HTMLButtonElement>('[data-share]')?.addEventListener('click', async () => {
  const url = `${window.location.origin}/lore#haroooo`;
  const say = (msg: string) => { if (shareStatus) shareStatus.textContent = msg; };
  try {
    if (navigator.share) {
      await navigator.share({ title: 'HAROOOO!', text: 'You have been summoned by Saint Hornatius Orgasmahowl.', url });
      say('Sent. The faithful grow in number.');
      return;
    }
  } catch { /* cancelled or unavailable: fall back to copying */ }
  try {
    await navigator.clipboard.writeText(url);
    say(`Link copied: ${url}`);
  } catch {
    say(`Copy this link: ${url}`);
  }
});

const summon = document.querySelector<HTMLElement>('[data-summon]');
if (summon && window.location.hash === '#haroooo') {
  summon.hidden = false;
  document.querySelector<HTMLButtonElement>('[data-summon-go]')?.focus();
  const close = () => {
    summon.hidden = true;
    history.replaceState(null, '', window.location.pathname);
  };
  document.querySelector('[data-summon-go]')?.addEventListener('click', () => {
    close();
    const ms = haroooo();
    goldFlash();
    bigCry('HAROOOO!');
    petalShower(40);
    window.setTimeout(() => summonChoir(true), Math.max(1200, ms - 1500));
  });
  document.querySelector('[data-summon-skip]')?.addEventListener('click', close);
}

// ---------- Click the sky: release a dove ----------

document.querySelectorAll<HTMLElement>('[data-sky]').forEach((sky) => {
  sky.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a, button')) return;
    bell(pick(PENTATONIC), 0, 0.08);
    releaseDove(e.clientX, e.clientY);
  });
});

// ---------- Venerate a relic ----------

const venerations = store<Record<string, number>>('wo-venerations', {});
function showVenerations(id: string) {
  const el = document.querySelector<HTMLElement>(`[data-venerations="${id}"]`);
  const n = venerations[id] ?? 0;
  if (el && n > 0) el.textContent = `Venerated ${n} ${n === 1 ? 'time' : 'times'} ✦`;
}
document.querySelectorAll<HTMLButtonElement>('[data-venerate]').forEach((btn) => {
  const id = btn.dataset.venerate!;
  showVenerations(id);
  btn.addEventListener('click', (e) => {
    venerations[id] = (venerations[id] ?? 0) + 1;
    save('wo-venerations', venerations);
    showVenerations(id);
    harp(pick([349.23, 392, 440]));
    const r = btn.getBoundingClientRect();
    const x = e.clientX || r.left + r.width / 2;
    const y = e.clientY || r.top + r.height / 2;
    sparkleBurst(x, y);
    btn.classList.remove('blessed');
    void btn.offsetWidth;
    btn.classList.add('blessed');
  });
});

// ---------- Votive candles ----------

const candles = [...document.querySelectorAll<HTMLButtonElement>('[data-candle]')];
const countEl = document.querySelector<HTMLElement>('[data-candle-count]');
const lit = new Set<number>(store<number[]>('wo-candles', []));
let miracleShown = false;

function renderCandles() {
  candles.forEach((c, i) => {
    const on = lit.has(i);
    c.classList.toggle('lit', on);
    c.setAttribute('aria-pressed', String(on));
  });
  if (countEl) countEl.textContent = String(lit.size);
}

function miracle() {
  const ms = haroooo();
  window.setTimeout(() => summonChoir(true), Math.max(1200, ms - 1500));
  goldFlash();
  bigCry('HAROOOO!');
  const msg = document.querySelector<HTMLElement>('[data-miracle]');
  if (msg) msg.hidden = false;
}

candles.forEach((c, i) => {
  c.addEventListener('click', () => {
    if (lit.has(i)) {
      lit.delete(i);
      bell(PENTATONIC[0] / 2, 0, 0.04);
    } else {
      lit.add(i);
      bell(PENTATONIC[i % PENTATONIC.length] * (i >= PENTATONIC.length ? 2 : 1), 0, 0.1);
      if (!reduceMotion) {
        const r = c.getBoundingClientRect();
        sparkleBurst(r.left + r.width / 2, r.top, ['✦', '✧']);
      }
    }
    save('wo-candles', [...lit]);
    renderCandles();
    if (lit.size === candles.length && !miracleShown) {
      miracleShown = true;
      window.setTimeout(miracle, 300);
    }
    if (lit.size < candles.length) miracleShown = false;
  });
});

document.querySelector<HTMLButtonElement>('[data-snuff]')?.addEventListener('click', () => {
  lit.clear();
  save('wo-candles', []);
  renderCandles();
  miracleShown = false;
  const msg = document.querySelector<HTMLElement>('[data-miracle]');
  if (msg) msg.hidden = true;
  bell(261.63, 0, 0.06);
});
renderCandles();

// ---------- The hidden miracle: type the battle cry ----------

let typed = '';
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
  const target = e.target as HTMLElement;
  if (target.closest('input, textarea, [contenteditable]')) return;
  typed = (typed + e.key.toLowerCase()).slice(-12);
  if (/haroooo+$/.test(typed)) {
    typed = '';
    document.documentElement.classList.add('rapture');
    window.setTimeout(() => document.documentElement.classList.remove('rapture'), 5000);
    const ms = haroooo();
    window.setTimeout(() => summonChoir(true), Math.max(1200, ms - 1500));
    goldFlash();
    bigCry('HAROOOO!');
    releaseFlock(26);
    petalShower(70);
  }
});
