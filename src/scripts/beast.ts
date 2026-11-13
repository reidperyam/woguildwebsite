// Interactive whimsy for the Bearwolftriceratiger page (The Storm): lightning, petting the Beast,
// awakening the Four, the war drums, the roar, a hidden stampede and the ambient storm.
// Sounds come from beast-audio.ts.
import { audio } from './holy-audio';
import { call, DRUM_BAR_MS, DRUM_BARS, duckStorm, roar, startStorm, stopStorm, storming, thunder, warDrums, type BeastId } from './beast-audio';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fx = document.querySelector<HTMLElement>('.fx');
const hero = document.querySelector<HTMLElement>('.storm');
const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(xs: readonly T[]) => xs[Math.floor(Math.random() * xs.length)];
const SVG = 'http://www.w3.org/2000/svg';

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
// Flashes are single pulses, at least a third of a second apart, so nothing flickers faster than
// three times a second. With reduced motion they're skipped entirely.

function flash(x = window.innerWidth / 2, y = 0, strength = 1) {
  if (reduceMotion || !fx) return;
  const el = document.createElement('div');
  el.className = 'fx-flash';
  el.style.setProperty('--x', `${x}px`);
  el.style.setProperty('--y', `${y}px`);
  fx.append(el);
  el.animate([{ opacity: 0 }, { opacity: strength, offset: 0.08 }, { opacity: 0 }], { duration: 700, easing: 'ease-out' }).onfinish = () => el.remove();
}

/** A jagged bolt from the top of the screen down to (x, y), with sparks where it lands. */
function strike(x: number, y: number) {
  if (reduceMotion || !fx) return;
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('class', 'fx-bolt');
  const steps = Math.max(5, Math.round(y / 60));
  let px = x + rand(-120, 120);
  const pts: string[] = [`${px},-10`];
  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    px += (x - px) * (1 / (steps - i + 1)) + rand(-38, 38);
    pts.push(`${px},${y * t}`);
  }
  pts.push(`${x},${y}`);
  ['glow', 'core'].forEach((cls) => {
    const line = document.createElementNS(SVG, 'polyline');
    line.setAttribute('points', pts.join(' '));
    line.setAttribute('class', cls);
    svg.append(line);
  });
  fx.append(svg);
  svg.animate([{ opacity: 1 }, { opacity: 1, offset: 0.3 }, { opacity: 0 }], { duration: 520, easing: 'ease-in' }).onfinish = () => svg.remove();
  flash(x, y, 0.8);
  sparks(x, y);
}

function sparks(x: number, y: number, count = 14) {
  if (reduceMotion || !fx) return;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.className = 'fx-spark';
    fx.append(s);
    const a = rand(Math.PI, Math.PI * 2);
    const d = rand(40, 140);
    s.animate(
      [
        { transform: `translate(${x}px, ${y}px) scale(1)`, opacity: 1 },
        { transform: `translate(${x + Math.cos(a) * d}px, ${y + Math.sin(a) * d + 80}px) scale(0.3)`, opacity: 0 },
      ],
      { duration: rand(500, 900), easing: 'cubic-bezier(.2,.7,.4,1)' },
    ).onfinish = () => s.remove();
  }
}

function paw(x: number, y: number, rot: number, size = 34): HTMLElement | null {
  if (!fx) return null;
  const el = document.createElement('span');
  el.className = 'fx-paw';
  el.innerHTML = '<svg><use href="#bw-paw"/></svg>';
  el.style.width = el.style.height = `${size}px`;
  el.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px) rotate(${rot}deg)`;
  fx.append(el);
  return el;
}

function pawBurst(x: number, y: number) {
  if (reduceMotion) return;
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const d = rand(60, 140);
    const el = paw(x, y, (a * 180) / Math.PI + 90, rand(20, 34));
    el?.animate(
      [
        { transform: `translate(${x - 14}px, ${y - 14}px) rotate(${(a * 180) / Math.PI + 90}deg) scale(0.3)`, opacity: 1 },
        { transform: `translate(${x - 14 + Math.cos(a) * d}px, ${y - 14 + Math.sin(a) * d}px) rotate(${(a * 180) / Math.PI + 90}deg) scale(1)`, opacity: 0 },
      ],
      { duration: rand(800, 1300), easing: 'cubic-bezier(.2,.8,.3,1)' },
    ).finished.then(() => el.remove());
  }
}

/** The stampede: tracks of paw prints thunder across the screen. */
function stampede() {
  if (reduceMotion || !fx) return;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const tracks = [0.25, 0.5, 0.75].map((f) => h * f + rand(-40, 40));
  tracks.forEach((ty, ti) => {
    const rtl = ti === 1;
    const stepCount = Math.ceil(w / 70) + 2;
    for (let i = 0; i < stepCount; i++) {
      window.setTimeout(() => {
        const x = rtl ? w - i * 70 : i * 70;
        const y = ty + (i % 2 ? 18 : -18);
        const el = paw(x, y, rtl ? -90 : 90, 38);
        el?.animate([{ opacity: 0 }, { opacity: 1, offset: 0.1 }, { opacity: 0 }], { duration: 1400 }).finished.then(() => el.remove());
      }, ti * 220 + i * 55);
    }
  });
}

/** Giant claw marks rip across the middle of the screen. */
function clawSlash() {
  if (reduceMotion || !fx) return;
  const el = document.createElement('div');
  el.className = 'fx-claw';
  el.innerHTML = '<svg><use href="#bw-claw"/></svg>';
  fx.append(el);
  el.animate(
    [
      { transform: 'translate(-50%, -50%) rotate(18deg) scale(0.6)', clipPath: 'inset(0 0 100% 0)', opacity: 1 },
      { transform: 'translate(-50%, -50%) rotate(18deg) scale(1)', clipPath: 'inset(0 0 0 0)', opacity: 1, offset: 0.25 },
      { transform: 'translate(-50%, -50%) rotate(18deg) scale(1)', clipPath: 'inset(0 0 0 0)', opacity: 1, offset: 0.7 },
      { transform: 'translate(-50%, -50%) rotate(18deg) scale(1.05)', clipPath: 'inset(0 0 0 0)', opacity: 0 },
    ],
    { duration: 1600, easing: 'ease-out' },
  ).onfinish = () => el.remove();
}

function bigRoar(text: string) {
  if (!fx) return;
  const el = document.createElement('div');
  el.className = 'big-roar';
  el.textContent = text;
  fx.append(el);
  const frames = reduceMotion
    ? [{ opacity: 0, transform: 'translate(-50%, -50%)' }, { opacity: 1, offset: 0.2 }, { opacity: 1, offset: 0.8 }, { opacity: 0, transform: 'translate(-50%, -50%)' }]
    : [
        { transform: 'translate(-50%, -50%) scale(0.2) rotate(6deg)', opacity: 0 },
        { transform: 'translate(-50%, -50%) scale(1.12) rotate(-3deg)', opacity: 1, offset: 0.2 },
        { transform: 'translate(-50%, -50%) scale(1) rotate(0deg)', opacity: 1, offset: 0.75 },
        { transform: 'translate(-50%, -50%) scale(1.4)', opacity: 0 },
      ];
  el.animate(frames, { duration: 2800, easing: 'ease-out' }).onfinish = () => el.remove();
}

function quake(ms: number) {
  if (reduceMotion) return;
  document.documentElement.classList.add('quake');
  window.setTimeout(() => document.documentElement.classList.remove('quake'), ms);
}

const ROAR_TEXT = 'HAROOOARRR!';

// ---------- The roar ----------

let roaring = false;
function unleash(withText = true): number {
  if (roaring) return 0;
  roaring = true;
  const ms = roar() || 3000;
  duckStorm(ms);
  quake(Math.min(ms, 2200));
  clawSlash();
  if (withText) bigRoar(ROAR_TEXT);
  window.setTimeout(() => { roaring = false; }, ms);
  return ms;
}
document.querySelectorAll<HTMLButtonElement>('[data-roar]').forEach((b) => b.addEventListener('click', () => {
  const ms = unleash();
  // An inline roar (in the saga's text) shakes while the Beast roars.
  if (ms && b.classList.contains('inline-roar')) {
    b.classList.add('roaring');
    window.setTimeout(() => b.classList.remove('roaring'), ms);
  }
}));

// ---------- The war drums ----------

// Drums only. Lightning strikes every other bar and on each beat of the fill, and the final
// unison hit shakes the page.
let drumming = false;
function drums() {
  if (drumming) return;
  drumming = true;
  const ms = warDrums() || 13000;
  duckStorm(ms);
  const html = document.documentElement;
  html.classList.add('drumming', 'dancing');
  const w = window.innerWidth;
  const at = (fn: () => void, delay: number) => window.setTimeout(fn, delay);
  // The war dance follows the drums: double time in the fill bar, a leap on the final hit, then away.
  at(() => html.classList.add('drum-fill'), (DRUM_BARS - 1) * DRUM_BAR_MS);
  at(() => html.classList.replace('drum-fill', 'drum-hit'), DRUM_BARS * DRUM_BAR_MS);
  at(() => html.classList.remove('dancing', 'drum-hit'), DRUM_BARS * DRUM_BAR_MS + 1300);
  for (let b = 0; b < DRUM_BARS - 1; b += 2) at(() => strike(rand(0.15, 0.85) * w, rand(120, 320)), b * DRUM_BAR_MS);
  for (let beat = 0; beat < 4; beat++) at(() => strike(rand(0.15, 0.85) * w, rand(120, 320)), (DRUM_BARS - 1 + beat / 4) * DRUM_BAR_MS);
  at(() => {
    html.classList.remove('drumming');
    strike(w / 2, window.innerHeight / 2);
    quake(600);
    clawSlash();
  }, DRUM_BARS * DRUM_BAR_MS);
  at(() => { drumming = false; }, ms);
}
document.querySelectorAll<HTMLButtonElement>('[data-drums]').forEach((b) => b.addEventListener('click', drums));

// ---------- Click the storm: call down lightning ----------

document.querySelectorAll<HTMLElement>('[data-sky]').forEach((sky) => {
  sky.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a, button')) return;
    thunder(rand(0.75, 1));
    strike(e.clientX, e.clientY);
  });
});

// ---------- Pet the Beast ----------

const petBtn = document.querySelector<HTMLButtonElement>('[data-pet]');
const petsEl = document.querySelector<HTMLElement>('[data-pets]');
let pets = store<number>('wo-beast-pets', 0);
function showPets() {
  if (petsEl && pets > 0) petsEl.textContent = `Petted ${pets} ${pets === 1 ? 'time' : 'times'}. It allowed this.`;
}
showPets();
petBtn?.addEventListener('click', (e) => {
  pets += 1;
  save('wo-beast-pets', pets);
  showPets();
  call(pick(['bear', 'tiger'] as const));
  const r = petBtn.getBoundingClientRect();
  pawBurst(e.clientX || r.left + r.width / 2, e.clientY || r.top + r.height / 2);
  petBtn.classList.remove('petted');
  void petBtn.offsetWidth;
  petBtn.classList.add('petted');
});

// ---------- Awaken the Four ----------

const totems = [...document.querySelectorAll<HTMLButtonElement>('[data-beast]')];
const awakeEl = document.querySelector<HTMLElement>('[data-awake-count]');
const fusionEl = document.querySelector<HTMLElement>('[data-fusion]');
const awake = new Set<string>(store<string[]>('wo-beast-four', []));
let fused = awake.size === totems.length;

function renderTotems() {
  totems.forEach((t) => {
    const on = awake.has(t.dataset.beast!);
    t.classList.toggle('awake', on);
    t.setAttribute('aria-pressed', String(on));
    const state = t.querySelector<HTMLElement>('[data-state]');
    if (state) state.textContent = on ? 'Awake' : 'Asleep';
  });
  if (awakeEl) awakeEl.textContent = String(awake.size);
  if (fusionEl) fusionEl.hidden = awake.size < totems.length;
}

function fusion() {
  // Lightning strikes each totem in turn, then the Beast roars whole.
  totems.forEach((t, i) => {
    window.setTimeout(() => {
      const r = t.getBoundingClientRect();
      strike(r.left + r.width / 2, r.top + r.height / 3);
    }, i * 380);
  });
  window.setTimeout(() => {
    thunder(1);
    unleash();
    flash(window.innerWidth / 2, window.innerHeight / 2, 1);
  }, totems.length * 380 + 200);
}

totems.forEach((t) => {
  t.addEventListener('click', () => {
    const id = t.dataset.beast as BeastId;
    if (awake.has(id)) {
      awake.delete(id);
      thunder(0.1);
    } else {
      awake.add(id);
      call(id);
      const r = t.getBoundingClientRect();
      strike(r.left + r.width / 2, r.top + 20);
      t.classList.remove('jolt');
      void t.offsetWidth;
      t.classList.add('jolt');
    }
    save('wo-beast-four', [...awake]);
    renderTotems();
    if (awake.size === totems.length && !fused) {
      fused = true;
      window.setTimeout(fusion, 900);
    }
    if (awake.size < totems.length) fused = false;
  });
});

document.querySelector<HTMLButtonElement>('[data-sleep]')?.addEventListener('click', () => {
  awake.clear();
  save('wo-beast-four', []);
  fused = false;
  renderTotems();
  thunder(0.15);
});
renderTotems();

// ---------- Claw marks slash in as headings scroll into view ----------

const claws = document.querySelectorAll<SVGElement>('.claw-marks');
if ('IntersectionObserver' in window) {
  const seen = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('clawed');
      seen.unobserve(e.target);
    });
  }, { threshold: 0.6 });
  claws.forEach((c) => seen.observe(c));
} else {
  claws.forEach((c) => c.classList.add('clawed'));
}

// ---------- Share the roar: /bearwolftriceratiger#roar ----------

const shareStatus = document.querySelector<HTMLElement>('[data-share-status]');
document.querySelector<HTMLButtonElement>('[data-share]')?.addEventListener('click', async () => {
  const url = `${window.location.origin}/bearwolftriceratiger#roar`;
  const say = (msg: string) => { if (shareStatus) shareStatus.textContent = msg; };
  try {
    if (navigator.share) {
      await navigator.share({ title: ROAR_TEXT, text: 'The Bearwolftriceratiger has been summoned.', url });
      say('Sent. The pack grows.');
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
if (summon && window.location.hash === '#roar') {
  summon.hidden = false;
  document.querySelector<HTMLButtonElement>('[data-summon-go]')?.focus();
  const close = () => {
    summon.hidden = true;
    history.replaceState(null, '', window.location.pathname);
  };
  document.querySelector('[data-summon-go]')?.addEventListener('click', () => {
    close();
    thunder(1);
    strike(window.innerWidth / 2, window.innerHeight / 2);
    window.setTimeout(() => unleash(), 350);
  });
  document.querySelector('[data-summon-skip]')?.addEventListener('click', close);
}

// ---------- The hidden stampede: type "rawr" ----------

let typed = '';
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
  const target = e.target as HTMLElement;
  if (target.closest('input, textarea, [contenteditable]')) return;
  typed = (typed + e.key.toLowerCase()).slice(-12);
  if (/ra+w+r+$/.test(typed)) {
    typed = '';
    stampede();
    window.setTimeout(() => unleash(), 400);
  }
});

// ---------- The storm (ambient) ----------
// Plays when the page opens if the browser allows sound; otherwise it starts on the first click,
// tap or key. The toggle stops it, and the choice is remembered.

const stormBtn = document.querySelector<HTMLButtonElement>('[data-storm]');
const stormLabel = stormBtn?.querySelector<HTMLElement>('[data-storm-label]');
const STORM_KEY = 'wo-storm';
let stormWanted = store<string>(STORM_KEY, 'on') !== 'off';

function onThunder(near: number) {
  if (reduceMotion || !hero) return;
  hero.classList.add('thunder');
  window.setTimeout(() => hero.classList.remove('thunder'), 200 + near * 400);
}

function renderStorm(waiting = false) {
  if (!stormBtn || !stormLabel) return;
  const on = storming();
  stormBtn.setAttribute('aria-pressed', String(on));
  stormBtn.classList.toggle('waiting', waiting && !on);
  stormLabel.textContent = on ? 'Calm the storm' : 'Stir the storm';
}

function beginStorm() {
  if (stormWanted && startStorm(onThunder)) renderStorm();
}

stormBtn?.addEventListener('click', () => {
  if (storming()) {
    stopStorm();
    stormWanted = false;
  } else {
    stormWanted = true;
    startStorm(onThunder);
  }
  save(STORM_KEY, stormWanted ? 'on' : 'off');
  renderStorm();
});

if (stormWanted) {
  const firstTouch = (e: Event) => {
    ['pointerup', 'keydown', 'touchend'].forEach((t) => window.removeEventListener(t, firstTouch, true));
    if (stormBtn && e.target instanceof Node && stormBtn.contains(e.target)) return; // the toggle handles itself
    beginStorm();
  };
  ['pointerup', 'keydown', 'touchend'].forEach((t) => window.addEventListener(t, firstTouch, true));
  const nav = navigator as Navigator & { getAutoplayPolicy?: (type: string) => string };
  const policy = nav.getAutoplayPolicy?.('audiocontext');
  if (policy === 'allowed') beginStorm();
  else if (policy === undefined) {
    const ac = audio();
    window.setTimeout(() => { if (ac?.state === 'running' && !storming()) beginStorm(); }, 300);
  }
  renderStorm(!storming());
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden && storming()) stopStorm();
  else if (!document.hidden && stormWanted && !storming() && stormBtn?.getAttribute('aria-pressed') === 'true') beginStorm();
});
