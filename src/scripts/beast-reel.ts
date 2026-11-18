// The Storm Reel: runs the Bearwolftriceratiger page as full-screen scenes instead of a long scroll.
// Each scene plays in beats. A wheel flick, swipe, arrow key or the Next button brings in the next
// beat's panels (the [data-b] cues, placed by src/data/beast-reel.ts). Without this script the page
// stays an ordinary vertical one. The whimsy and sounds stay in beast.ts.

const html = document.documentElement;
const stage = document.querySelector<HTMLElement>('.reel-stage');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Keeps the flash on each scene change under three a second.
const STEP_GAP = 350;
const LEAVE_MS = 460;

interface Cue { el: HTMLElement; from: number; until: number; to: number }
interface Scene { el: HTMLElement; id: string; name: string; cues: Cue[]; beats: number }

function readCue(el: HTMLElement): Cue {
  const [from, until = from] = el.dataset.b!.split('-').map(Number);
  return { el, from, until, to: Number(el.dataset.to) || Infinity };
}

if (stage) {
  const scenes: Scene[] = [...stage.querySelectorAll<HTMLElement>('[data-scene]')].map((el) => {
    const cues = [...el.querySelectorAll<HTMLElement>('[data-b]')].map(readCue);
    return { el, id: el.id, name: el.dataset.scene!, cues, beats: Math.max(1, ...cues.map((c) => c.until)) };
  });
  const $ = <T extends HTMLElement>(sel: string) => document.querySelector<T>(sel);
  const ticks = [...document.querySelectorAll<HTMLAnchorElement>('.reel-ticks .tick')];
  const fills = ticks.map((t) => t.querySelector('u') as HTMLElement);
  const status = $('[data-reel-status]');
  const back = $<HTMLButtonElement>('[data-reel-back]');
  const next = $<HTMLButtonElement>('[data-reel-next]');
  const navBtn = $<HTMLButtonElement>('[data-reel-nav]');
  const sheet = $<HTMLDialogElement>('[data-reel-sheet]');
  const sheetLinks = sheet ? [...sheet.querySelectorAll('a')] : [];
  const summon = $('[data-summon]');

  const indexOfHash = () => scenes.findIndex((s) => s.id === window.location.hash.slice(1));
  let at = Math.max(0, indexOfHash());
  let beat = 1;
  let leaving: Scene | null = null;
  let leaveTimer = 0;
  let lastStep = 0;

  const blocked = () => !!document.querySelector('dialog[open]') || (!!summon && !summon.hidden);
  const setNav = (open: boolean) => {
    html.classList.toggle('reel-nav-open', open);
    navBtn?.setAttribute('aria-expanded', String(open));
  };

  function paintCues(s: Scene) {
    s.cues.forEach((c) => {
      c.el.classList.toggle('on', beat >= c.from && beat <= c.to);
      c.el.classList.toggle('cur', beat >= c.from && beat <= c.until);
    });
  }

  function render() {
    const s = scenes[at];
    scenes.forEach((x, i) => {
      x.el.classList.toggle('now', i === at);
      x.el.classList.toggle('was', x === leaving);
    });
    paintCues(s);
    s.el.scrollTop = 0;
    // Fetch this scene's pictures and the next one's now, so panels never land empty.
    [s, scenes[at + 1]].forEach((x) => x?.el.querySelectorAll('img').forEach((img) => { img.loading = 'eager'; }));
    html.classList.toggle('reel-past', at > 0);
    html.classList.toggle('reel-end', at === scenes.length - 1);
    ticks.forEach((t, i) => {
      t.classList.toggle('now', i === at);
      if (i === at) t.setAttribute('aria-current', 'step'); else t.removeAttribute('aria-current');
      fills[i].style.width = i < at ? '100%' : i === at ? `${(beat / s.beats) * 100}%` : '0';
    });
    sheetLinks.forEach((a, i) => a.classList.toggle('on', i === at));
    if (status) status.textContent = `${s.name}, ${beat} of ${s.beats}`;
    if (back) back.disabled = at === 0 && beat === 1;
    if (next) next.disabled = at === scenes.length - 1;
  }

  function sweep(dir: number) {
    if (reduceMotion) return;
    const far = `${dir * 62}%`, near = `${dir * -62}%`;
    $('.reel-wipe')?.animate([{ opacity: 1, transform: `translateX(${near})` }, { opacity: 1, transform: `translateX(${far})` }], { duration: 560, easing: 'cubic-bezier(.5, 0, .3, 1)' });
    $('.reel-pulse')?.animate([{ opacity: 0 }, { opacity: 0.42, offset: 0.22 }, { opacity: 0 }], { duration: 460, easing: 'ease-out' });
  }

  function cut(to: number, toBeat: number, dir: number) {
    window.clearTimeout(leaveTimer);
    if (leaving) leaving.cues.forEach((c) => c.el.classList.remove('on', 'cur'));
    leaving = scenes[at];
    at = to;
    beat = toBeat;
    html.classList.toggle('reel-back', dir < 0);
    setNav(false);
    render();
    sweep(dir);
    if (stage!.contains(document.activeElement) && !scenes[at].el.contains(document.activeElement)) stage!.focus({ preventScroll: true });
    const id = at === 0 ? '' : `#${scenes[at].id}`;
    if (window.location.hash !== id) history.replaceState(null, '', window.location.pathname + id);
    leaveTimer = window.setTimeout(() => {
      leaving?.el.classList.remove('was');
      leaving?.cues.forEach((c) => c.el.classList.remove('on', 'cur'));
      leaving = null;
    }, LEAVE_MS);
  }

  function throttled() {
    const now = Date.now();
    if (now - lastStep < STEP_GAP) return true;
    lastStep = now;
    return false;
  }

  function step(dir: number) {
    if (throttled()) return;
    const s = scenes[at];
    if (dir > 0) {
      if (beat < s.beats) { beat += 1; render(); }
      else if (at < scenes.length - 1) cut(at + 1, 1, 1);
    } else if (beat > 1) { beat -= 1; render(); }
    else if (at > 0) cut(at - 1, scenes[at - 1].beats, -1);
  }

  function jump(i: number) {
    if (i < 0 || i === at) return;
    lastStep = Date.now();
    cut(i, 1, i > at ? 1 : -1);
  }

  back?.addEventListener('click', () => step(-1));
  next?.addEventListener('click', () => step(1));
  navBtn?.addEventListener('click', () => setNav(!html.classList.contains('reel-nav-open')));

  // ---------- The chapter list, and every link to a scene ----------
  $('[data-reel-index]')?.addEventListener('click', () => { setNav(false); sheet?.showModal(); });
  $('[data-reel-sheet-close]')?.addEventListener('click', () => sheet?.close());
  sheet?.addEventListener('click', (e) => { if (e.target === sheet) sheet.close(); });

  document.querySelector('.tempest')?.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const i = scenes.findIndex((s) => s.id === link.hash.slice(1));
    if (i < 0) return;
    e.preventDefault();
    sheet?.close();
    jump(i);
  });
  window.addEventListener('hashchange', () => jump(indexOfHash()));

  // ---------- Keys, wheel and swipes ----------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && html.classList.contains('reel-nav-open')) { setNav(false); navBtn?.focus(); return; }
    if (blocked() || e.ctrlKey || e.metaKey || e.altKey) return;
    const target = e.target as HTMLElement;
    if (target.closest('input, textarea, select, [contenteditable], .nav-wrap')) return;
    const onControl = !!target.closest('a, button, summary');
    if (['ArrowRight', 'ArrowDown', 'PageDown'].includes(e.key) || (e.key === ' ' && !onControl)) { e.preventDefault(); step(1); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); step(-1); }
    else if (e.key === 'Home') { e.preventDefault(); jump(0); }
    else if (e.key === 'End') { e.preventDefault(); jump(scenes.length - 1); }
  });

  // A panel with text left to scroll keeps the wheel until it reaches its end.
  function canScroll(from: EventTarget | null, dy: number) {
    for (let n = from as HTMLElement | null; n && n !== stage; n = n.parentElement) {
      if (n.scrollHeight <= n.clientHeight + 2) continue;
      const o = getComputedStyle(n).overflowY;
      if (o !== 'auto' && o !== 'scroll') continue;
      if (dy > 0 ? n.scrollTop + n.clientHeight < n.scrollHeight - 2 : n.scrollTop > 2) return true;
    }
    return false;
  }

  // One flick of the wheel or trackpad is one beat, however long its inertia runs.
  let wheelAt = 0;
  let wheelStep = 0;
  window.addEventListener('wheel', (e) => {
    const now = Date.now();
    const fresh = now - wheelAt > 150;
    wheelAt = now;
    if (blocked() || (e.target as HTMLElement).closest?.('.nav-wrap')) return;
    const dy = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(dy) < 4 || canScroll(e.target, dy)) return;
    if (fresh || now - wheelStep > 1100) { wheelStep = now; step(dy > 0 ? 1 : -1); }
  }, { passive: true });

  let touch: { x: number; y: number } | null = null;
  stage.addEventListener('touchstart', (e) => {
    touch = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
  }, { passive: true });
  stage.addEventListener('touchend', (e) => {
    if (!touch || blocked()) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.x, dy = t.clientY - touch.y;
    touch = null;
    if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.4) step(dx < 0 ? 1 : -1);
  }, { passive: true });

  html.classList.add('reel-on', 'reel-ready');
  render();
}
