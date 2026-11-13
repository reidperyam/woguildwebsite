// Storm sounds for the Bearwolftriceratiger page, all synthesized with Web Audio (no audio files):
// thunder, the four beasts the cry shattered into, the fused roar, the tribal war drums and the storm itself.
// Shares one AudioContext with the rest of the site. Nothing plays until the viewer clicks or types.
import { audio } from './holy-audio';

const rand = (min: number, max: number) => min + Math.random() * (max - min);

let noise: AudioBuffer | null = null;
function noiseBuf(ac: AudioContext): AudioBuffer {
  if (noise) return noise;
  noise = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate);
  const d = noise.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return noise;
}

function noiseSource(ac: AudioContext, loop = false): AudioBufferSourceNode {
  const src = ac.createBufferSource();
  src.buffer = noiseBuf(ac);
  src.loop = loop;
  return src;
}

/** An open-air reverb: a burst of noise that dies away, like sound rolling over a stormy sea. */
const spaces = new Map<number, AudioBuffer>();
function openAir(ac: AudioContext, seconds: number): AudioBuffer {
  const cached = spaces.get(seconds);
  if (cached) return cached;
  const len = Math.floor(ac.sampleRate * seconds);
  const buf = ac.createBuffer(2, len, ac.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3.2;
  }
  spaces.set(seconds, buf);
  return buf;
}

/** A gain node that feeds the speakers both dry and through the open-air reverb. */
function bus(ac: AudioContext, level = 1, wet = 0.4, seconds = 2.8, dest: AudioNode = ac.destination): GainNode {
  const input = ac.createGain();
  input.gain.value = level;
  const dry = ac.createGain();
  dry.gain.value = 1 - wet * 0.5;
  const verb = ac.createConvolver();
  verb.buffer = openAir(ac, seconds);
  const w = ac.createGain();
  w.gain.value = wet;
  input.connect(dry).connect(dest);
  input.connect(verb).connect(w).connect(dest);
  return input;
}

let curve: Float32Array | null = null;
function grit(): Float32Array {
  if (curve) return curve;
  curve = new Float32Array(1024);
  for (let i = 0; i < curve.length; i++) {
    const x = (i / (curve.length - 1)) * 2 - 1;
    curve[i] = Math.tanh(x * 6);
  }
  return curve;
}

/** Swell in, hold, fade out. */
function envelope(g: GainNode, t: number, dur: number, peak: number, attack: number) {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + attack);
  g.gain.setValueAtTime(peak, t + dur * 0.55);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
}

/** A tremolo: makes a voice rough (fast) or rolling (slow). */
function tremolo(ac: AudioContext, target: GainNode, t: number, dur: number, rate: number, depth: number, type: OscillatorType = 'square') {
  const lfo = ac.createOscillator();
  lfo.type = type;
  lfo.frequency.value = rate;
  const amt = ac.createGain();
  amt.gain.value = depth;
  lfo.connect(amt).connect(target.gain);
  lfo.start(t);
  lfo.stop(t + dur + 0.1);
}

// ---------- Thunder ----------

/** A clap of thunder. near = 1 cracks right overhead; near = 0 rolls in from far out at sea. */
export function thunder(near = 1, delay = 0, dest?: AudioNode): number {
  const ac = audio();
  if (!ac) return 0;
  const t = ac.currentTime + 0.02 + delay;
  const out = dest ?? bus(ac, 1, 0.5, 3.5);
  const len = 3 + (1 - near) * 2.5;

  if (near > 0.45) {
    const crack = noiseSource(ac);
    const hp = ac.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 1800;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.7 * near, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
    crack.connect(hp).connect(g).connect(out);
    crack.start(t, rand(0, 1.5));
    crack.stop(t + 0.35);
  }

  const rumble = noiseSource(ac, true);
  const lp = ac.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.setValueAtTime(250 + near * 900, t);
  lp.frequency.exponentialRampToValueAtTime(90, t + len);
  const g = ac.createGain();
  const peak = 0.35 + near * 0.75;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + 0.04 + (1 - near) * 0.5);
  // Rolling: a few uneven bumps as the thunder tumbles away.
  let at = t + 0.3 + (1 - near) * 0.5;
  for (let i = 0; i < 6 && at < t + len * 0.8; i++) {
    g.gain.linearRampToValueAtTime(peak * rand(0.25, 0.95) * (1 - i / 8), at);
    at += rand(0.25, 0.6);
  }
  g.gain.exponentialRampToValueAtTime(0.0001, t + len);
  rumble.connect(lp).connect(g).connect(out);
  rumble.start(t, rand(0, 1.5));
  rumble.stop(t + len + 0.1);
  return (delay + len) * 1000;
}

// ---------- The four beasts ----------

/** The Bear: a low, rough growl. */
function bear(ac: AudioContext, out: AudioNode, t: number, dur: number, level: number) {
  const osc = ac.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(92, t);
  osc.frequency.linearRampToValueAtTime(104, t + dur * 0.3);
  osc.frequency.exponentialRampToValueAtTime(62, t + dur);
  const lp = ac.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 650;
  lp.Q.value = 5;
  const rough = ac.createGain();
  rough.gain.value = 0.6;
  tremolo(ac, rough, t, dur, 26, 0.4);
  const g = ac.createGain();
  envelope(g, t, dur, level, 0.12);
  osc.connect(lp).connect(rough).connect(g).connect(out);

  const breath = noiseSource(ac, true);
  const bp = ac.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 320;
  bp.Q.value = 1.2;
  const bg = ac.createGain();
  envelope(bg, t, dur, level * 0.9, 0.1);
  breath.connect(bp).connect(rough);
  breath.connect(bp).connect(bg).connect(out);
  osc.start(t);
  osc.stop(t + dur + 0.05);
  breath.start(t, rand(0, 1));
  breath.stop(t + dur + 0.05);
}

/** The Wolf: a rising, wavering howl. */
function wolf(ac: AudioContext, out: AudioNode, t: number, dur: number, level: number) {
  const g = ac.createGain();
  envelope(g, t, dur, level, 0.3);
  g.connect(out);
  [1, 2].forEach((h) => {
    const osc = ac.createOscillator();
    osc.type = 'sine';
    const f = osc.frequency;
    f.setValueAtTime(380 * h, t);
    f.exponentialRampToValueAtTime(590 * h, t + dur * 0.28);
    f.linearRampToValueAtTime(555 * h, t + dur * 0.75);
    f.exponentialRampToValueAtTime(410 * h, t + dur);
    const vib = ac.createOscillator();
    vib.frequency.value = 5.4;
    const depth = ac.createGain();
    depth.gain.value = 9 * h;
    vib.connect(depth).connect(f);
    const hg = ac.createGain();
    hg.gain.value = h === 1 ? 1 : 0.18;
    osc.connect(hg).connect(g);
    osc.start(t);
    vib.start(t);
    osc.stop(t + dur + 0.05);
    vib.stop(t + dur + 0.05);
  });
}

/** The Triceratops: a huge, slow foghorn bellow. */
function triceratops(ac: AudioContext, out: AudioNode, t: number, dur: number, level: number) {
  const lp = ac.createBiquadFilter();
  lp.type = 'lowpass';
  lp.Q.value = 3;
  lp.frequency.setValueAtTime(140, t);
  lp.frequency.exponentialRampToValueAtTime(460, t + dur * 0.35);
  lp.frequency.exponentialRampToValueAtTime(160, t + dur);
  const g = ac.createGain();
  envelope(g, t, dur, level, 0.3);
  lp.connect(g).connect(out);
  ([['square', 46], ['sawtooth', 46.6], ['sine', 34]] as [OscillatorType, number][]).forEach(([type, f0]) => {
    const osc = ac.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(f0, t);
    osc.frequency.linearRampToValueAtTime(f0 * 1.14, t + dur * 0.4);
    osc.frequency.exponentialRampToValueAtTime(f0 * 0.82, t + dur);
    osc.connect(lp);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  });
}

/** The Tiger: a raspy, snarling roar that drops in pitch. */
function tiger(ac: AudioContext, out: AudioNode, t: number, dur: number, level: number) {
  const osc = ac.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(150, t);
  osc.frequency.linearRampToValueAtTime(175, t + dur * 0.2);
  osc.frequency.exponentialRampToValueAtTime(82, t + dur);
  const shaper = ac.createWaveShaper();
  shaper.curve = grit() as Float32Array<ArrayBuffer>;
  const pre = ac.createGain();
  pre.gain.value = 0.5;
  const mouth = ac.createGain();
  mouth.gain.value = 0.7;
  tremolo(ac, mouth, t, dur, 17, 0.25, 'triangle');
  const g = ac.createGain();
  envelope(g, t, dur, level, 0.1);
  osc.connect(pre).connect(shaper);
  // Two vowel formants ("aa") give it a throat.
  [[760, 6], [1180, 7]].forEach(([f, q]) => {
    const bp = ac.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(f * 0.8, t);
    bp.frequency.linearRampToValueAtTime(f, t + dur * 0.3);
    bp.frequency.linearRampToValueAtTime(f * 0.7, t + dur);
    bp.Q.value = q;
    shaper.connect(bp).connect(mouth);
  });
  const low = ac.createBiquadFilter();
  low.type = 'lowpass';
  low.frequency.value = 420;
  shaper.connect(low).connect(mouth);
  mouth.connect(g).connect(out);

  const rasp = noiseSource(ac, true);
  const bp = ac.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 950;
  bp.Q.value = 0.9;
  const rg = ac.createGain();
  envelope(rg, t, dur, level * 0.55, 0.08);
  rasp.connect(bp).connect(rg).connect(out);
  osc.start(t);
  osc.stop(t + dur + 0.05);
  rasp.start(t, rand(0, 1));
  rasp.stop(t + dur + 0.05);
}

export type BeastId = 'bear' | 'wolf' | 'triceratops' | 'tiger';
const VOICES: Record<BeastId, { fn: typeof bear; dur: number; level: number }> = {
  bear: { fn: bear, dur: 1.6, level: 0.5 },
  wolf: { fn: wolf, dur: 2.2, level: 0.22 },
  triceratops: { fn: triceratops, dur: 2.2, level: 0.55 },
  tiger: { fn: tiger, dur: 1.7, level: 0.42 },
};

/** One of the four beasts calls out on its own. Returns its length in ms. */
export function call(id: BeastId): number {
  const ac = audio();
  if (!ac) return 0;
  const v = VOICES[id];
  v.fn(ac, bus(ac, 1, 0.35), ac.currentTime + 0.03, v.dur, v.level);
  return v.dur * 1000;
}

/** The Bearwolftriceratiger: the bellow, growl and snarl as one roar (no howl on top). */
export function roar(delay = 0, dest?: AudioNode, level = 1): number {
  const ac = audio();
  if (!ac) return 0;
  const t = ac.currentTime + 0.04 + delay;
  const out = bus(ac, level, 0.45, 3, dest);
  triceratops(ac, out, t, 2.8, 0.55);
  bear(ac, out, t + 0.04, 2.4, 0.45);
  tiger(ac, out, t + 0.12, 2.3, 0.4);
  return (delay + 2.9) * 1000;
}

// ---------- The war drums ----------
// A fast tribal drum circle and nothing else: a big taiko-style drum, low and high toms, a djembe
// (bass, tone and slap), sticks and a shaker, building layer by layer over eight bars into a fill
// and one final unison hit.

/** A struck membrane: a sine that drops from f0 to f1, plus a short click for the stick or hand. */
function membrane(ac: AudioContext, out: AudioNode, t: number, f0: number, f1: number, drop: number, decay: number, level: number, click = 1200) {
  const osc = ac.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(f0, t);
  osc.frequency.exponentialRampToValueAtTime(f1, t + drop);
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(level, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
  osc.connect(g).connect(out);
  osc.start(t);
  osc.stop(t + decay + 0.02);
  noiseHit(ac, out, t, 'lowpass', click, 0.03, level * 0.45);
}

function noiseHit(ac: AudioContext, out: AudioNode, t: number, type: BiquadFilterType, freq: number, decay: number, level: number, q = 0.8) {
  const src = noiseSource(ac);
  const f = ac.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  f.Q.value = q;
  const g = ac.createGain();
  g.gain.setValueAtTime(level, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
  src.connect(f).connect(g).connect(out);
  src.start(t, rand(0, 1.5));
  src.stop(t + decay + 0.02);
}

type Hit = (ac: AudioContext, out: AudioNode, t: number, v: number) => void;
const KIT: Record<string, Hit> = {
  // Big drum: deep boom with a thump of skin.
  taiko: (ac, out, t, v) => {
    membrane(ac, out, t, 150, 46, 0.1, 0.9, 1 * v, 800);
    noiseHit(ac, out, t, 'bandpass', 110, 0.25, 0.5 * v, 1.2);
  },
  low: (ac, out, t, v) => membrane(ac, out, t, 230, 84, 0.06, 0.45, 0.7 * v, 1600),
  high: (ac, out, t, v) => membrane(ac, out, t, 340, 135, 0.05, 0.3, 0.6 * v, 2200),
  // Djembe: bass (palm in the middle), tone (fingers at the edge), slap (a sharp crack).
  bass: (ac, out, t, v) => membrane(ac, out, t, 140, 70, 0.04, 0.3, 0.6 * v, 700),
  tone: (ac, out, t, v) => membrane(ac, out, t, 290, 225, 0.025, 0.18, 0.4 * v, 2600),
  slap: (ac, out, t, v) => {
    noiseHit(ac, out, t, 'bandpass', 2300, 0.07, 0.6 * v, 1.3);
    membrane(ac, out, t, 520, 400, 0.02, 0.06, 0.25 * v, 3000);
  },
  stick: (ac, out, t, v) => {
    membrane(ac, out, t, 1950, 1800, 0.01, 0.04, 0.22 * v, 4000);
    noiseHit(ac, out, t, 'highpass', 3500, 0.02, 0.15 * v);
  },
  shaker: (ac, out, t, v) => noiseHit(ac, out, t, 'highpass', 5800, 0.04, 0.09 * v),
};

// Sixteen steps per bar. Capital letters are accented.
const LETTERS: Record<string, string> = { X: 'taiko', L: 'low', H: 'high', b: 'bass', t: 'tone', s: 'slap', c: 'stick', a: 'shaker' };
const P = {
  taiko: 'X..X..X.X..X....',
  taiko2: 'X.XX..X.X.XX..X.',
  shaker: 'aaAaaaAaaaAaaaAa',
  sticks: 'c..c..c...c.c...',
  djembe: 'b.tsb.tsb.ts.tst',
  slaps: '....s.......s...',
  turn: '............LLHH',
  fill: 'HHLLHHLLHHLLLLXX',
  fillTaiko: 'X...X...X...X...',
};
// Which layers play in each bar: the groove builds, then a fill, then one big hit.
const ARRANGEMENT: string[][] = [
  [P.taiko, P.shaker],
  [P.taiko, P.shaker, P.sticks],
  [P.taiko, P.shaker, P.sticks, P.djembe],
  [P.taiko, P.shaker, P.sticks, P.djembe, P.turn],
  [P.taiko, P.shaker, P.sticks, P.djembe, P.slaps],
  [P.taiko, P.shaker, P.sticks, P.djembe, P.slaps, P.turn],
  [P.taiko2, P.shaker, P.sticks, P.djembe, P.slaps],
  [P.fillTaiko, P.shaker, P.fill],
];

export const DRUM_BPM = 160;
const STEP = 60 / DRUM_BPM / 4;
/** One bar of the drums, in ms, so the page can strike lightning in time. */
export const DRUM_BAR_MS = STEP * 16 * 1000;
export const DRUM_BARS = ARRANGEMENT.length;

/** The war drums of the storm: eight bars of fast tribal drumming and a final hit. Returns ms. */
export function warDrums(): number {
  const ac = audio();
  if (!ac) return 0;
  const t0 = ac.currentTime + 0.08;
  // A compressor glues the circle together and keeps the stacked hits from clipping.
  const out = ac.createDynamicsCompressor();
  out.threshold.value = -16;
  out.knee.value = 8;
  out.ratio.value = 5;
  out.attack.value = 0.003;
  out.release.value = 0.15;
  out.connect(bus(ac, 0.85, 0.3, 2.2));
  ARRANGEMENT.forEach((layers, bar) => {
    const swell = 0.75 + (bar / ARRANGEMENT.length) * 0.35; // louder as it builds
    layers.forEach((pattern) => {
      [...pattern].forEach((ch, i) => {
        const name = LETTERS[ch] ?? LETTERS[ch.toLowerCase()];
        if (!name) return;
        const accent = ch === ch.toUpperCase() && ch !== ch.toLowerCase() ? 1.15 : 0.85;
        const downbeat = i % 4 === 0 ? 1.08 : 1;
        // A crescendo through the fill bar, and a little human looseness everywhere.
        const fill = pattern === P.fill ? 0.6 + (i / 16) * 0.7 : 1;
        const t = t0 + (bar * 16 + i) * STEP + rand(-0.004, 0.004);
        KIT[name](ac, out, t, Math.min(1.3, swell * accent * downbeat * fill * rand(0.92, 1.05)));
      });
    });
  });
  // The final unison hit on the downbeat after the fill.
  const end = t0 + DRUM_BARS * 16 * STEP;
  ['taiko', 'low', 'high', 'slap'].forEach((n) => KIT[n](ac, out, end, 1.25));
  KIT.taiko(ac, out, end + 0.012, 1);
  return (end - ac.currentTime + 1.2) * 1000;
}

// ---------- The storm (ambient) ----------
// Rain, wind and waves, with thunder rolling in now and then. Starts when the page opens if the
// browser allows sound, otherwise on the first click; the page's toggle stops it.

const LEVEL = 0.5;
let master: GainNode | null = null;
let sources: AudioScheduledSourceNode[] = [];
let timer = 0;
let duckTimer = 0;

export const storming = () => master !== null;

/** Starts the storm (fading in). onThunder fires as each distant clap begins, for a lightning flash. */
export function startStorm(onThunder?: (near: number) => void): boolean {
  if (master) return true;
  const ac = audio();
  if (!ac) return false;
  const now = ac.currentTime;
  const m = ac.createGain();
  m.gain.setValueAtTime(0, now);
  m.gain.linearRampToValueAtTime(LEVEL, now + 3);
  m.connect(ac.destination);
  master = m;

  const layer = (setup: (src: AudioBufferSourceNode) => AudioNode) => {
    const src = noiseSource(ac, true);
    setup(src).connect(m);
    src.start(now, rand(0, 1.9));
    sources.push(src);
  };
  const lfo = (target: AudioParam, rate: number, depth: number) => {
    const o = ac.createOscillator();
    o.frequency.value = rate;
    const d = ac.createGain();
    d.gain.value = depth;
    o.connect(d).connect(target);
    o.start(now);
    sources.push(o);
  };

  // Rain: bright hiss.
  layer((src) => {
    const hp = ac.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 1500;
    const lp = ac.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 7500;
    const g = ac.createGain();
    g.gain.value = 0.09;
    lfo(g.gain, 0.13, 0.02);
    return src.connect(hp).connect(lp).connect(g);
  });
  // Waves: slow surges of low noise.
  layer((src) => {
    const lp = ac.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 480;
    lfo(lp.frequency, 0.07, 220);
    const g = ac.createGain();
    g.gain.value = 0.32;
    lfo(g.gain, 0.09, 0.24);
    return src.connect(lp).connect(g);
  });
  // Wind: a moaning band that drifts up and down.
  layer((src) => {
    const bp = ac.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 520;
    bp.Q.value = 4;
    lfo(bp.frequency, 0.05, 260);
    const g = ac.createGain();
    g.gain.value = 0.07;
    lfo(g.gain, 0.11, 0.04);
    return src.connect(bp).connect(g);
  });

  let claps = 0;
  const rumble = () => {
    if (master !== m) return;
    const near = rand(0.05, 0.5);
    thunder(near, 0, m);
    onThunder?.(near);
    // Now and then the Beast answers from far out in the storm.
    if (++claps % 4 === 0) roar(rand(1.5, 2.5), m, 0.22);
    timer = window.setTimeout(rumble, rand(9000, 20000));
  };
  timer = window.setTimeout(rumble, rand(3500, 7000));
  return true;
}

/** Stops the storm (fading out). */
export function stopStorm() {
  const ac = audio();
  if (!master || !ac) return;
  window.clearTimeout(timer);
  const now = ac.currentTime;
  const m = master;
  m.gain.cancelScheduledValues(now);
  m.gain.setValueAtTime(m.gain.value, now);
  m.gain.linearRampToValueAtTime(0, now + 1.5);
  sources.forEach((s) => s.stop(now + 1.6));
  window.setTimeout(() => m.disconnect(), 6000);
  master = null;
  sources = [];
}

/** Hushes the storm while something louder plays (the roar, the drums), then brings it back. */
export function duckStorm(ms: number) {
  const ac = audio();
  if (!master || !ac) return;
  const m = master;
  m.gain.cancelScheduledValues(ac.currentTime);
  m.gain.setTargetAtTime(LEVEL * 0.25, ac.currentTime, 0.2);
  window.clearTimeout(duckTimer);
  duckTimer = window.setTimeout(() => {
    if (master === m) m.gain.setTargetAtTime(LEVEL, audio()!.currentTime, 1.2);
  }, ms);
}
