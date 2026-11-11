// Holy chanting for the Cathedral: a choir of synthesized monks singing plainchant over a drone,
// in an endless loop. Each monk is a sawtooth "voice" shaped into vowels by formant filters, and
// the words are (roughly) Latin: "Sancte Hornatie, ora pro nobis", "Haroooo, alleluia" and
// "Kyrie eleison". Browsers only allow sound after a click or key press, so the page starts it
// on load when it can, and otherwise on the first interaction.
import { audio, nave } from './holy-audio';

const D3 = 146.83; // the final of the mode (D Dorian), sung by men's voices
const BEAT = 0.46;
const LEVEL = 0.55;

// Formants (Hz) of sung men's vowels: F1, F2, F3.
const VOWELS: Record<string, [number, number, number]> = {
  a: [700, 1100, 2450],
  e: [500, 1750, 2450],
  i: [300, 2200, 2950],
  o: [520, 860, 2400],
  u: [330, 800, 2250],
};

// Phrases of psalm-tone style chant: [semitones above D, beats, vowel].
type Note = [number, number, string];
const PHRASES: { notes: Note[]; organum?: boolean }[] = [
  // Sanc-te Hor-na-ti-e
  { notes: [[3, 1, 'a'], [5, 1, 'a'], [7, 2, 'e'], [7, 1, 'o'], [7, 1, 'a'], [7, 1, 'i'], [5, 1, 'i'], [7, 2, 'e']] },
  // o-ra pro no-bis
  { notes: [[7, 1, 'o'], [9, 1, 'a'], [7, 1, 'a'], [5, 1, 'o'], [3, 1, 'o'], [5, 1, 'o'], [2, 1, 'i'], [0, 3, 'i']], organum: true },
  // Ha-roooo (a melisma), al-le-lu-ia
  { notes: [[0, 1, 'a'], [3, 1, 'a'], [5, 1, 'o'], [7, 1, 'u'], [9, 1, 'u'], [7, 1, 'u'], [5, 2, 'u'], [3, 1, 'a'], [5, 1, 'e'], [3, 1, 'u'], [2, 1, 'i'], [0, 3, 'a']] },
  // Ky-ri-e e-lei-son
  { notes: [[7, 1, 'i'], [7, 1, 'i'], [9, 1, 'e'], [10, 1, 'e'], [9, 2, 'e'], [7, 1, 'e'], [5, 1, 'i'], [3, 1, 'o'], [2, 1, 'o'], [0, 3, 'o']], organum: true },
];

const st = (steps: number) => D3 * 2 ** (steps / 12);

/** One part of the choir (several monks in unison) singing a phrase. Returns its length in seconds. */
function sing(ac: AudioContext, out: AudioNode, notes: Note[], start: number, transpose: number, level: number, monks: number): number {
  const total = notes.reduce((s, n) => s + n[1], 0) * BEAT;
  const end = start + total;

  // Formant bank, gliding from vowel to vowel.
  const voice = ac.createGain();
  const bank = [0, 1, 2].map((k) => {
    const bp = ac.createBiquadFilter();
    bp.type = 'bandpass';
    const g = ac.createGain();
    g.gain.value = [1, 0.55, 0.22][k];
    voice.connect(bp).connect(g);
    return { bp, g, bw: [90, 110, 150][k] };
  });
  const body = ac.createBiquadFilter(); // a little unfiltered chest tone underneath
  body.type = 'lowpass';
  body.frequency.value = 500;
  const bodyGain = ac.createGain();
  bodyGain.gain.value = 0.12;
  voice.connect(body).connect(bodyGain);

  // The phrase envelope: breathe in, sing, let the last note fade into the nave.
  const env = ac.createGain();
  env.gain.setValueAtTime(0, start);
  env.gain.linearRampToValueAtTime(level, start + 0.25);
  env.gain.setValueAtTime(level, end - 0.5);
  env.gain.linearRampToValueAtTime(0, end + 0.15);
  bank.forEach((f) => f.g.connect(env));
  bodyGain.connect(env);
  env.connect(out);

  let t = start;
  notes.forEach(([, beats, vowel], i) => {
    const [f1, f2, f3] = VOWELS[vowel];
    [f1, f2, f3].forEach((f, k) => {
      bank[k].bp.frequency.setTargetAtTime(f, t, 0.04);
      bank[k].bp.Q.setTargetAtTime(f / bank[k].bw, t, 0.04);
    });
    // A slight lift at each new syllable, so the words articulate.
    if (i > 0) {
      env.gain.setTargetAtTime(level * 0.8, t, 0.02);
      env.gain.setTargetAtTime(level, t + 0.06, 0.05);
    }
    t += beats * BEAT;
  });
  env.gain.cancelScheduledValues(end - 0.5);
  env.gain.setValueAtTime(level, end - 0.5);
  env.gain.linearRampToValueAtTime(0, end + 0.15);

  for (let m = 0; m < monks; m++) {
    const osc = ac.createOscillator();
    osc.type = 'sawtooth';
    osc.detune.value = (Math.random() * 2 - 1) * 12;
    const vib = ac.createOscillator();
    vib.frequency.value = 4.4 + Math.random() * 1.2;
    const depth = ac.createGain();
    depth.gain.value = 5 + Math.random() * 4;
    vib.connect(depth).connect(osc.detune);
    let tn = start;
    let prev = 0;
    notes.forEach(([step, beats], i) => {
      const f = st(step + transpose);
      if (i === 0) osc.frequency.setValueAtTime(f, tn);
      else {
        // Each monk slides into the note a touch late, the way a real choir does.
        osc.frequency.setValueAtTime(prev, tn);
        osc.frequency.linearRampToValueAtTime(f, tn + 0.05 + Math.random() * 0.05);
      }
      prev = f;
      tn += beats * BEAT;
    });
    const g = ac.createGain();
    g.gain.value = 1 / monks;
    osc.connect(g).connect(voice);
    const late = Math.random() * 0.04;
    osc.start(start + late);
    vib.start(start + late);
    osc.stop(end + 0.2);
    vib.stop(end + 0.2);
  }
  return total;
}

/** The ison: a low hum on the final (D) and its fifth, held under everything. */
function drone(ac: AudioContext, out: AudioNode, start: number) {
  const bp = ac.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = VOWELS.o[0];
  bp.Q.value = 3;
  const lp = ac.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 900;
  const g = ac.createGain();
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(0.22, start + 3);
  bp.connect(g);
  lp.connect(g);
  g.connect(out);
  const oscs = [D3 / 2, (D3 / 2) * 1.5, D3 / 2].map((f, i) => {
    const osc = ac.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = f;
    osc.detune.value = i === 2 ? 7 : -4;
    const og = ac.createGain();
    og.gain.value = 0.18;
    osc.connect(og);
    og.connect(bp);
    og.connect(lp);
    osc.start(start);
    return osc;
  });
  return { gain: g, oscs };
}

let master: GainNode | null = null;
let hum: ReturnType<typeof drone> | null = null;
let timer = 0;
let next = 0;
let index = 0;
let duckTimer = 0;

/** Whether the monks are singing. */
export const chanting = () => master !== null;

/** Starts the chant (fading in). Returns false if Web Audio isn't available. */
export function startChant(): boolean {
  if (master) return true;
  const ac = audio();
  if (!ac) return false;
  const now = ac.currentTime;
  master = ac.createGain();
  master.gain.setValueAtTime(0, now);
  master.gain.linearRampToValueAtTime(LEVEL, now + 2.5);
  master.connect(ac.destination);
  const bus = ac.createGain();
  const dry = ac.createGain();
  dry.gain.value = 0.45;
  const verb = ac.createConvolver();
  verb.buffer = nave(ac, 5.5);
  const wet = ac.createGain();
  wet.gain.value = 1.1;
  bus.connect(dry).connect(master);
  bus.connect(verb).connect(wet).connect(master);
  hum = drone(ac, bus, now);

  next = now + 0.6;
  const out = bus;
  const pump = () => {
    if (!master) return;
    while (next < ac.currentTime + 3) {
      const phrase = PHRASES[index % PHRASES.length];
      const len = sing(ac, out, phrase.notes, next, 0, 0.9, 5);
      if (phrase.organum) sing(ac, out, phrase.notes, next, -5, 0.45, 3); // a second part a fourth below
      next += len + BEAT * 1.5; // a breath between phrases
      index++;
    }
    timer = window.setTimeout(pump, 500);
  };
  pump();
  return true;
}

/** Stops the chant (fading out). */
export function stopChant() {
  const ac = audio();
  if (!master || !ac) return;
  window.clearTimeout(timer);
  const now = ac.currentTime;
  const m = master;
  m.gain.cancelScheduledValues(now);
  m.gain.setValueAtTime(m.gain.value, now);
  m.gain.linearRampToValueAtTime(0, now + 1.5);
  hum?.oscs.forEach((o) => o.stop(now + 1.6));
  window.setTimeout(() => m.disconnect(), 8000);
  master = null;
  hum = null;
}

/** Hushes the monks while something louder plays (the choir, the HAROOOO), then brings them back. */
export function duckChant(ms: number) {
  const ac = audio();
  if (!master || !ac) return;
  const m = master;
  m.gain.cancelScheduledValues(ac.currentTime);
  m.gain.setTargetAtTime(LEVEL * 0.15, ac.currentTime, 0.2);
  window.clearTimeout(duckTimer);
  duckTimer = window.setTimeout(() => {
    if (master === m) m.gain.setTargetAtTime(LEVEL, audio()!.currentTime, 1.2);
  }, ms);
}
