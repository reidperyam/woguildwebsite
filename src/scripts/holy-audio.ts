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

/** One organ pipe note: a principal (fundamental + octave + twelfth), with a crisp "chiff" at the start. */
function pipe(ac: AudioContext, out: AudioNode, freq: number, start: number, dur: number, level: number) {
  const g = ac.createGain();
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(level, start + 0.02);
  g.gain.setValueAtTime(level, start + dur - 0.04);
  g.gain.linearRampToValueAtTime(0, start + dur);
  g.connect(out);
  [[1, 1, 'square'], [2, 0.5, 'sine'], [3, 0.3, 'sine'], [4, 0.2, 'triangle']].forEach(([mult, amp, type]) => {
    const osc = ac.createOscillator();
    osc.type = type as OscillatorType;
    osc.frequency.value = freq * (mult as number);
    const og = ac.createGain();
    og.gain.value = (amp as number) * (type === 'square' ? 0.35 : 1);
    osc.connect(og).connect(g);
    osc.start(start);
    osc.stop(start + dur + 0.02);
  });
  const chiff = ac.createOscillator();
  chiff.type = 'sine';
  chiff.frequency.value = freq * 6;
  const cg = ac.createGain();
  cg.gain.setValueAtTime(level * 0.4, start);
  cg.gain.exponentialRampToValueAtTime(0.0001, start + 0.06);
  chiff.connect(cg).connect(out);
  chiff.start(start);
  chiff.stop(start + 0.08);
}

// Note frequencies for the hymn.
const N: Record<string, number> = {
  C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.0, A2: 110.0, B2: 123.47,
  C3: 130.81, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.0, B5: 987.77, C6: 1046.5,
};
const notes = (names: string) => names.split(' ').map((n) => N[n]);

// The Hymn: two phrases over C, G/B, Am, F (two beats each). The tune keeps leaping back to the
// same high G, which is the hook; the second phrase climbs to high C before the "A-men".
// Each step: [pedal, choir chord, broken-chord pattern, two melody notes].
const HYMN: [string, string, string, string][] = [
  ['C2', 'C4 E4 G4', 'C4 E4 G4 E4', 'E5 G5'],
  ['B2', 'B3 D4 G4', 'B3 D4 G4 D4', 'D5 G5'],
  ['A2', 'A3 C4 E4', 'A3 C4 E4 C4', 'C5 E5'],
  ['F2', 'A3 C4 F4', 'A3 C4 F4 C4', 'A5 G5'],
  ['C2', 'C4 E4 G4', 'C4 E4 G4 E4', 'E5 G5'],
  ['B2', 'B3 D4 G4', 'B3 D4 G4 D4', 'D5 G5'],
  ['A2', 'A3 C4 E4', 'A3 C4 E4 C4', 'C6 B5'],
  ['G2', 'B3 D4 G4', 'B3 D4 G4 D4', 'A5 G5'],
];
const BEAT = 60 / 126;

/** The Heavenly Choir. The full hymn (a catchy organ verse, then the plagal "A-men"), or just the
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
    // The organ, with a stone-church echo.
    const organ = ac.createGain();
    organ.gain.value = 0.75;
    const tone = ac.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.value = 3200;
    const echo = ac.createDelay(1);
    echo.delayTime.value = 0.23;
    const echoGain = ac.createGain();
    echoGain.gain.value = 0.28;
    organ.connect(tone).connect(ac.destination);
    tone.connect(echo).connect(echoGain).connect(ac.destination);
    echoGain.connect(echo);

    HYMN.forEach(([pedal, voices, broken, tune], i) => {
      const t = now + i * 2 * BEAT;
      const last = i === HYMN.length - 1;
      pipe(ac, organ, N[pedal], t, 2 * BEAT, 0.16);
      chord(ac, lowpass, notes(voices), t, 2 * BEAT + 0.1, 0.022, 0.12);
      notes(broken).forEach((f, j) => pipe(ac, organ, f, t + (j * BEAT) / 2, BEAT / 2, 0.035));
      notes(tune).forEach((f, j) => pipe(ac, organ, f, t + j * BEAT, last && j === 1 ? BEAT * 1.4 : BEAT * 0.92, 0.07));
      if (i % 4 === 0) bell(i === 0 ? N.C5 : N.G4, t - ac.currentTime, 0.06);
    });
    amen = now + HYMN.length * 2 * BEAT + 0.15;
    // The organ sings the "A-men" too, A then G over the choir, with the pedal underneath.
    pipe(ac, organ, N.F2, amen, 1.9, 0.16);
    pipe(ac, organ, N.A5, amen, 1.8, 0.07);
    pipe(ac, organ, N.C2, amen + 1.8, 2.6, 0.16);
    pipe(ac, organ, N.G5, amen + 1.8, 2.6, 0.07);
    bell(N.C5, amen + 1.8 - ac.currentTime, 0.08);
    window.setTimeout(() => organ.disconnect(), (amen - ac.currentTime + 7) * 1000);
  }
  chord(ac, lowpass, [174.61, 220.0, 261.63, 349.23], amen, 1.9);
  chord(ac, lowpass, [130.81, 196.0, 261.63, 329.63, 523.25], amen + 1.8, 2.8);
  return Math.round((amen - ac.currentTime + 4.7) * 1000);
}
