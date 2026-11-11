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
function nave(ac: AudioContext, seconds: number): AudioBuffer {
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

// Note frequencies for the hymn.
const N: Record<string, number> = {
  C2: 65.41, F2: 87.31, G2: 98.0, A2: 110.0, C3: 130.81,
  G4: 392.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.0, B5: 987.77, C6: 1046.5,
};

// The Hymn: organ power chords on every beat over C, G, Am, F, played twice, with the trumpet
// singing the hook on top. The tune keeps leaping back to the same high G; the second time it
// climbs to high C before the "A-men". Each step is two beats: [power-chord root, pedal, melody].
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

/** The Heavenly Choir. The full hymn (full organ and trumpet, then the plagal "A-men"), or just the
 *  "A-men" (F major, then C major) when `amenOnly`. Returns its length in ms. */
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
    // The organ speaks into a big stone nave, held together by a gentle limiter.
    const organ = ac.createGain();
    organ.gain.value = 0.9;
    const tone = ac.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.value = 5200;
    const limit = ac.createDynamicsCompressor();
    limit.threshold.value = -14;
    limit.ratio.value = 6;
    limit.attack.value = 0.01;
    const verb = ac.createConvolver();
    verb.buffer = nave(ac, 4.5);
    const wet = ac.createGain();
    wet.gain.value = 0.45;
    organ.connect(tone).connect(limit).connect(ac.destination);
    limit.connect(verb).connect(wet).connect(ac.destination);

    HYMN.forEach(([root, low, tune], i) => {
      const t = now + i * 2 * BEAT;
      const last = i === HYMN.length - 1;
      const level = i >= 6 ? 0.03 : 0.024; // the climb to high C gets a little more organ
      pedal(ac, organ, N[low], t, 2 * BEAT, 0.22);
      // Strike the power chord on both beats, detached like a hymn on full organ.
      [0, 1].forEach((b) => powerChord(ac, organ, N[root], t + b * BEAT, BEAT * (last && b === 1 ? 1.3 : 0.86), level));
      tune.split(' ').forEach((n, j) => trumpet(ac, organ, N[n], t + j * BEAT, last && j === 1 ? BEAT * 1.4 : BEAT * 0.9, 0.1));
      if (i % 4 === 0) bell(i === 0 ? N.C5 : N.G4, t - ac.currentTime, 0.06);
    });
    amen = now + HYMN.length * 2 * BEAT + 0.2;
    // The "A-men" on full organ: F power chord, then C, with the trumpet singing A then G.
    pedal(ac, organ, N.F2, amen, 1.9, 0.24);
    powerChord(ac, organ, N.F2, amen, 1.85, 0.03);
    trumpet(ac, organ, N.A5, amen, 1.8, 0.1);
    pedal(ac, organ, N.C2, amen + 1.8, 2.8, 0.24);
    powerChord(ac, organ, N.C3, amen + 1.8, 2.8, 0.032);
    trumpet(ac, organ, N.G5, amen + 1.8, 2.7, 0.1);
    bell(N.C5, amen + 1.8 - ac.currentTime, 0.08);
    window.setTimeout(() => organ.disconnect(), (amen - ac.currentTime + 9) * 1000);
  }
  chord(ac, lowpass, [174.61, 220.0, 261.63, 349.23], amen, 1.9);
  chord(ac, lowpass, [130.81, 196.0, 261.63, 329.63, 523.25], amen + 1.8, 2.8);
  return Math.round((amen - ac.currentTime + 4.7) * 1000);
}
