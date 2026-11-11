// Holy sounds for the Cathedral, all synthesized with Web Audio (no audio files).
// Nothing plays until the viewer clicks or types: browsers block sound before that anyway.

let ctx: AudioContext | null = null;

export function audio(): AudioContext | null {
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  ctx ??= new AC();
  void ctx.resume();
  return ctx;
}

// C major pentatonic, so random notes always sound pleasant together.
export const PENTATONIC = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51];

/** A small church bell: a few inharmonic partials with a long decay. */
export function bell(freq: number, delay = 0, volume = 0.12) {
  const ac = audio();
  if (!ac) return;
  const t = ac.currentTime + delay;
  [1, 2.76, 5.4].forEach((ratio, i) => {
    const osc = ac.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq * ratio;
    const g = ac.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(volume / (i + 1), t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.4 / (i + 1));
    osc.connect(g).connect(ac.destination);
    osc.start(t);
    osc.stop(t + 2.6);
  });
}

function pluck(ac: AudioContext, freq: number, t: number, volume: number) {
  const osc = ac.createOscillator();
  osc.type = 'triangle';
  osc.frequency.value = freq;
  const g = ac.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(volume, t + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
  osc.connect(g).connect(ac.destination);
  osc.start(t);
  osc.stop(t + 1.7);
}

/** A rising harp glissando. */
export function harp(base = 392) {
  const ac = audio();
  if (!ac) return;
  const t = ac.currentTime + 0.02;
  [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24].forEach((step, i) => pluck(ac, base * 2 ** (step / 12), t + i * 0.045, 0.09));
}

function chord(ac: AudioContext, out: AudioNode, freqs: number[], start: number, dur: number, level = 0.05, attack = 0.35) {
  for (const f of freqs) {
    for (const detune of [-8, 0, 8]) {
      const osc = ac.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.value = f;
      osc.detune.value = detune;
      const vibrato = ac.createOscillator();
      vibrato.frequency.value = 5 + Math.random();
      const depth = ac.createGain();
      depth.gain.value = 6;
      vibrato.connect(depth).connect(osc.detune);
      const g = ac.createGain();
      g.gain.setValueAtTime(0, start);
      g.gain.linearRampToValueAtTime(level, start + attack);
      g.gain.setValueAtTime(level, start + dur - Math.min(0.3, dur * 0.3));
      g.gain.linearRampToValueAtTime(0, start + dur);
      osc.connect(g).connect(out);
      osc.start(start);
      vibrato.start(start);
      osc.stop(start + dur + 0.05);
      vibrato.stop(start + dur + 0.05);
    }
  }
}

/** A cathedral reverb impulse: decaying noise, a few seconds long. */
export function nave(ac: AudioContext, seconds: number): AudioBuffer {
  const len = Math.floor(ac.sampleRate * seconds);
  const buf = ac.createBuffer(2, len, ac.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 2.6;
  }
  return buf;
}

// Full organ ("plenum"): each key sounds a stack of ranks, 8' + 4' + 2 2/3' + 2' + mixture.
const PLENUM: [number, number][] = [[1, 1], [2, 0.7], [3, 0.42], [4, 0.36], [6, 0.2], [8, 0.16]];

/** One full-organ key: all the ranks of the plenum, each very slightly out of tune with the next. */
function plenum(ac: AudioContext, out: AudioNode, freq: number, start: number, dur: number, level: number) {
  const g = ac.createGain();
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(level, start + 0.035);
  g.gain.setValueAtTime(level, start + dur - 0.05);
  g.gain.linearRampToValueAtTime(0, start + dur);
  g.connect(out);
  PLENUM.forEach(([mult, amp], i) => {
    const osc = ac.createOscillator();
    osc.type = i === 0 ? 'triangle' : 'sine';
    osc.frequency.value = freq * mult;
    osc.detune.value = (i % 2 ? 1 : -1) * (1 + i);
    const og = ac.createGain();
    og.gain.value = amp;
    osc.connect(og).connect(g);
    osc.start(start);
    osc.stop(start + dur + 0.02);
  });
}

/** An organ power chord: root and fifth, stacked through three octaves, no third. */
function powerChord(ac: AudioContext, out: AudioNode, root: number, start: number, dur: number, level: number) {
  [root, root * 1.5, root * 2, root * 3, root * 4].forEach((f, i) => plenum(ac, out, f, start, dur, level * (i < 2 ? 1 : 0.8)));
}

/** The pedal: 16' and 32' stops under everything. */
function pedal(ac: AudioContext, out: AudioNode, freq: number, start: number, dur: number, level: number) {
  ([[1, 'triangle', 1], [0.5, 'sine', 0.8], [2, 'sine', 0.35]] as const).forEach(([mult, type, amp]) => {
    const osc = ac.createOscillator();
    osc.type = type;
    osc.frequency.value = freq * mult;
    const g = ac.createGain();
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(level * amp, start + 0.06);
    g.gain.setValueAtTime(level * amp, start + dur - 0.06);
    g.gain.linearRampToValueAtTime(0, start + dur);
    osc.connect(g).connect(out);
    osc.start(start);
    osc.stop(start + dur + 0.02);
  });
}

/** The melody on a trumpet reed (8' + 4'), bright and brassy, cutting over the full organ. */
function trumpet(ac: AudioContext, out: AudioNode, freq: number, start: number, dur: number, level: number) {
  const tone = ac.createBiquadFilter();
  tone.type = 'lowpass';
  tone.Q.value = 2;
  tone.frequency.setValueAtTime(900, start);
  tone.frequency.exponentialRampToValueAtTime(4200, start + 0.05);
  tone.frequency.exponentialRampToValueAtTime(3000, start + 0.3);
  const g = ac.createGain();
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(level, start + 0.03);
  g.gain.setValueAtTime(level, start + dur - 0.05);
  g.gain.linearRampToValueAtTime(0, start + dur);
  tone.connect(g).connect(out);
  [[1, 1], [2, 0.45], [1.003, 0.6]].forEach(([mult, amp]) => {
    const osc = ac.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = freq * mult;
    const og = ac.createGain();
    og.gain.value = amp;
    osc.connect(og).connect(tone);
    osc.start(start);
    osc.stop(start + dur + 0.02);
  });
}

// ---------- The heavy metal band (plays under the organ) ----------

let fuzz: Float32Array | null = null;
/** A hard-clipping distortion curve, like a cranked amp. */
function distortion(): Float32Array {
  if (fuzz) return fuzz;
  const n = 2048;
  fuzz = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / n - 1;
    fuzz[i] = Math.tanh(x * 9) * 0.9;
  }
  return fuzz;
}

/** One guitar strum: the given notes through a distorted amp and speaker cabinet. Muted = palm-muted chug. */
function guitar(ac: AudioContext, out: AudioNode, freqs: number[], start: number, dur: number, opts: { muted?: boolean; pan?: number; level?: number; vibrato?: number } = {}) {
  const { muted = false, pan = 0, level = 0.1, vibrato = 0 } = opts;
  const len = muted ? Math.min(dur, 0.16) : dur;
  const drive = ac.createGain();
  drive.gain.value = 1.4;
  const amp = ac.createWaveShaper();
  amp.curve = distortion() as Float32Array<ArrayBuffer>;
  amp.oversample = '2x';
  const low = ac.createBiquadFilter();
  low.type = 'highpass';
  low.frequency.value = 70;
  const cab = ac.createBiquadFilter();
  cab.type = 'lowpass';
  cab.frequency.value = muted ? 1100 : 4200;
  const mid = ac.createBiquadFilter();
  mid.type = 'peaking';
  mid.frequency.value = 1800;
  mid.gain.value = 4;
  const env = ac.createGain();
  env.gain.setValueAtTime(0, start);
  env.gain.linearRampToValueAtTime(level, start + 0.004);
  if (muted) env.gain.exponentialRampToValueAtTime(0.0001, start + len);
  else {
    env.gain.setValueAtTime(level, start + len - 0.06);
    env.gain.linearRampToValueAtTime(0, start + len);
  }
  const panner = ac.createStereoPanner();
  panner.pan.value = pan;
  drive.connect(amp).connect(low).connect(cab).connect(mid).connect(env).connect(panner).connect(out);

  let wobble: OscillatorNode | null = null;
  let depth: GainNode | null = null;
  if (vibrato) {
    wobble = ac.createOscillator();
    wobble.frequency.value = 6;
    depth = ac.createGain();
    depth.gain.setValueAtTime(0, start);
    depth.gain.linearRampToValueAtTime(vibrato, start + Math.min(0.5, len * 0.6));
    wobble.connect(depth);
    wobble.start(start);
    wobble.stop(start + len + 0.02);
  }
  for (const f of freqs) {
    for (const detune of [-6, 6]) {
      const osc = ac.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.value = f;
      osc.detune.value = detune;
      if (depth) depth.connect(osc.detune);
      osc.connect(drive);
      osc.start(start);
      osc.stop(start + len + 0.02);
    }
  }
}

/** A distorted power chord, double-tracked: one take hard left, one hard right, a few ms apart. */
function riff(ac: AudioContext, out: AudioNode, root: number, start: number, dur: number, muted: boolean, level: number) {
  const notes = [root, root * 1.5, root * 2];
  guitar(ac, out, notes, start, dur, { muted, pan: -0.8, level });
  guitar(ac, out, notes.map((f) => f * 1.002), start + 0.009, dur, { muted, pan: 0.8, level });
}

function noiseBuffer(ac: AudioContext): AudioBuffer {
  const buf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

function noiseHit(ac: AudioContext, out: AudioNode, noise: AudioBuffer, start: number, type: BiquadFilterType, freq: number, decay: number, level: number) {
  const src = ac.createBufferSource();
  src.buffer = noise;
  const filter = ac.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = freq;
  const g = ac.createGain();
  g.gain.setValueAtTime(level, start);
  g.gain.exponentialRampToValueAtTime(0.0001, start + decay);
  src.connect(filter).connect(g).connect(out);
  src.start(start, Math.random() * 0.5);
  src.stop(start + decay + 0.02);
}

function kick(ac: AudioContext, out: AudioNode, noise: AudioBuffer, start: number, level = 0.9) {
  const osc = ac.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(140, start);
  osc.frequency.exponentialRampToValueAtTime(42, start + 0.09);
  const g = ac.createGain();
  g.gain.setValueAtTime(level, start);
  g.gain.exponentialRampToValueAtTime(0.0001, start + 0.32);
  osc.connect(g).connect(out);
  osc.start(start);
  osc.stop(start + 0.34);
  noiseHit(ac, out, noise, start, 'highpass', 3000, 0.012, level * 0.35); // the beater click
}

function snare(ac: AudioContext, out: AudioNode, noise: AudioBuffer, start: number, level = 0.55) {
  noiseHit(ac, out, noise, start, 'bandpass', 2200, 0.2, level);
  const body = ac.createOscillator();
  body.type = 'triangle';
  body.frequency.setValueAtTime(220, start);
  body.frequency.exponentialRampToValueAtTime(160, start + 0.08);
  const g = ac.createGain();
  g.gain.setValueAtTime(level * 0.7, start);
  g.gain.exponentialRampToValueAtTime(0.0001, start + 0.12);
  body.connect(g).connect(out);
  body.start(start);
  body.stop(start + 0.14);
}

const hat = (ac: AudioContext, out: AudioNode, noise: AudioBuffer, start: number) => noiseHit(ac, out, noise, start, 'highpass', 8000, 0.05, 0.12);
const crash = (ac: AudioContext, out: AudioNode, noise: AudioBuffer, start: number) => noiseHit(ac, out, noise, start, 'highpass', 4500, 1.8, 0.32);

// Note frequencies for the hymn.
const N: Record<string, number> = {
  C2: 65.41, F2: 87.31, G2: 98.0, A2: 110.0, C3: 130.81,
  G4: 392.0, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.0, B5: 987.77, C6: 1046.5,
};

// The Hymn: organ power chords on every beat over C, G, Am, F, played twice, with the trumpet
// singing the hook on top. The tune keeps leaping back to the same high G; the second time it
// climbs to high C before the "A-men". A heavy metal band plays underneath: drop-tuned guitars
// galloping on the same power chords, and drums that turn to double bass in the second phrase.
// Each step is two beats: [organ power-chord root, pedal and guitar root, melody].
const HYMN: [string, string, string][] = [
  ['C3', 'C2', 'E5 G5'],
  ['G2', 'G2', 'D5 G5'],
  ['A2', 'A2', 'C5 E5'],
  ['F2', 'F2', 'A5 G5'],
  ['C3', 'C2', 'E5 G5'],
  ['G2', 'G2', 'D5 G5'],
  ['A2', 'A2', 'C6 B5'],
  ['G2', 'G2', 'A5 G5'],
];
const BEAT = 60 / 104;

/** The Heavenly Choir. The full hymn (full organ, trumpet and a metal band, then the plagal "A-men"),
 *  or just the choir's "A-men" (F major, then C major) when `amenOnly`. Returns its length in ms. */
export function choir(amenOnly = false): number {
  const ac = audio();
  if (!ac) return 0;
  const now = ac.currentTime + 0.05;
  const lowpass = ac.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.value = 2200;
  lowpass.Q.value = 0.5;
  const formant = ac.createBiquadFilter();
  formant.type = 'peaking';
  formant.frequency.value = 900;
  formant.gain.value = 8;
  formant.Q.value = 1.2;
  const master = ac.createGain();
  master.gain.value = 0.5;
  lowpass.connect(formant).connect(master).connect(ac.destination);

  let amen = now;
  if (!amenOnly) {
    // Everything meets in one limiter, so organ, band and nave together never clip.
    const stage = ac.createDynamicsCompressor();
    stage.threshold.value = -10;
    stage.knee.value = 4;
    stage.ratio.value = 12;
    stage.attack.value = 0.003;
    stage.release.value = 0.2;
    const out = ac.createGain();
    out.gain.value = 0.85;
    stage.connect(out).connect(ac.destination);

    // The organ speaks into a big stone nave.
    const organ = ac.createGain();
    organ.gain.value = 0.75;
    const tone = ac.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.value = 5200;
    const verb = ac.createConvolver();
    verb.buffer = nave(ac, 4.5);
    const wet = ac.createGain();
    wet.gain.value = 0.4;
    organ.connect(tone).connect(stage);
    tone.connect(verb).connect(wet).connect(stage);

    // The band: guitars and drums, with just a little of the nave on them.
    const band = ac.createGain();
    band.gain.value = 0.7;
    const bandVerb = ac.createGain();
    bandVerb.gain.value = 0.12;
    band.connect(stage);
    band.connect(bandVerb).connect(verb);
    const noise = noiseBuffer(ac);

    HYMN.forEach(([root, low, tune], i) => {
      const t = now + i * 2 * BEAT;
      const last = i === HYMN.length - 1;
      const second = i >= 4; // the second phrase hits harder
      const level = i >= 6 ? 0.03 : 0.024; // the climb to high C gets a little more organ
      pedal(ac, organ, N[low], t, 2 * BEAT, 0.22);
      // Strike the power chord on both beats, detached like a hymn on full organ.
      [0, 1].forEach((b) => powerChord(ac, organ, N[root], t + b * BEAT, BEAT * (last && b === 1 ? 1.3 : 0.86), level));
      tune.split(' ').forEach((n, j) => trumpet(ac, organ, N[n], t + j * BEAT, last && j === 1 ? BEAT * 1.4 : BEAT * 0.9, 0.1));
      if (i % 4 === 0) bell(i === 0 ? N.C5 : N.G4, t - ac.currentTime, 0.06);

      // Guitars: an open power chord on the first beat, then a palm-muted gallop (da-da-DUN).
      riff(ac, band, N[low], t, BEAT * 0.95, false, 0.09);
      if (!last) [0, 0.5, 0.75].forEach((o) => riff(ac, band, N[low], t + BEAT + o * BEAT, BEAT * 0.25, true, 0.11));
      else riff(ac, band, N[low], t + BEAT, BEAT, false, 0.09);
      // In the second phrase a lead guitar doubles the trumpet an octave down, screaming with vibrato.
      if (second) tune.split(' ').forEach((n, j) => guitar(ac, band, [N[n] / 2], t + j * BEAT, BEAT * 0.92, { level: 0.06, vibrato: 25 }));

      // Drums: snare on the backbeat, hi-hats on eighths, a crash at the top of each phrase.
      if (i % 4 === 0) crash(ac, band, noise, t);
      const kicks = second ? [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75] : [0, 0.5, 1.5];
      kicks.forEach((k) => kick(ac, band, noise, t + k * BEAT, second ? 0.7 : 0.9));
      if (last) {
        // A snare fill rolls into the "A-men".
        snare(ac, band, noise, t + BEAT * 0.5);
        [1, 1.25, 1.5, 1.75].forEach((s, k) => snare(ac, band, noise, t + s * BEAT, 0.35 + k * 0.08));
      } else {
        snare(ac, band, noise, t + BEAT);
        [0, 0.5, 1, 1.5].forEach((h) => hat(ac, band, noise, t + h * BEAT));
      }
    });
    amen = now + HYMN.length * 2 * BEAT;
    // The "A-men" on full organ: F power chord, then C, with the trumpet singing A then G.
    pedal(ac, organ, N.F2, amen, 1.9, 0.24);
    powerChord(ac, organ, N.F2, amen, 1.85, 0.03);
    trumpet(ac, organ, N.A5, amen, 1.8, 0.1);
    pedal(ac, organ, N.C2, amen + 1.8, 2.8, 0.24);
    powerChord(ac, organ, N.C3, amen + 1.8, 2.8, 0.032);
    trumpet(ac, organ, N.G5, amen + 1.8, 2.7, 0.1);
    bell(N.C5, amen + 1.8 - ac.currentTime, 0.08);
    // The band lets both chords ring out, with crashes, and the lead guitar wails A then G.
    [[N.F2, 0, 1.8, N.A4], [N.C2, 1.8, 2.8, N.G4]].forEach(([f, at, len, lead]) => {
      riff(ac, band, f, amen + at, len, false, 0.09);
      guitar(ac, band, [lead], amen + at, len * 0.97, { level: 0.06, vibrato: 35 });
      kick(ac, band, noise, amen + at);
      crash(ac, band, noise, amen + at);
    });
    window.setTimeout(() => { organ.disconnect(); band.disconnect(); }, (amen - ac.currentTime + 9) * 1000);
  }
  chord(ac, lowpass, [174.61, 220.0, 261.63, 349.23], amen, 1.9);
  chord(ac, lowpass, [130.81, 196.0, 261.63, 329.63, 523.25], amen + 1.8, 2.8);
  return Math.round((amen - ac.currentTime + 4.7) * 1000);
}
