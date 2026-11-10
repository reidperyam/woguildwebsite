// The Werewolf Orgasmahowl jingle: the guild's name sung twice by organ and bells.
//   WERE-WOLF, OR-GAS-MA-HOWL!   (the organ swoops up like a wolf)
//   WERE-WOLF, OR-GAS-MA-HAROOOO! (the Saint himself answers, with his pack)
// The second "howl" is the real synthesized HAROOOO, so the jingle and the cry are one brand sound.
// The key follows the howl's pitch, so a custom cry from the Howl Lab always lands in tune.
import { audio } from './holy-audio';
import { DEFAULT_HOWL, howl, impulse, preloadWolf, type HowlParams } from './howl';

const EIGHTH = 60 / 144 / 2; // 144 bpm
const PHRASE = 8; // eighth notes per phrase

/** The words the jingle sings, line by line. The page lights each one as it plays. */
export const JINGLE_LYRICS = [
  ['WERE', 'WOLF', 'OR', 'GAS', 'MA', 'HOWL!'],
  ['WERE', 'WOLF', 'OR', 'GAS', 'MA', 'HAROOOO!'],
];

// The hook, in eighth notes and semitones from the tune's "do": sol-DO, la-sol-mi.
const HOOK = [
  { at: 0, step: -5, len: 1 },
  { at: 1, step: 0, len: 2 },
  { at: 3, step: -3, len: 1 },
  { at: 4, step: -5, len: 1 },
  { at: 5, step: -8, len: 1 },
];
const SWOOP_AT = 6; // where "HOWL!" / "HAROOOO!" lands

// Organ chords, in semitones from the tonic: I, IV (second inversion) and V.
const I = [0, 4, 7, 12];
const IV = [0, 5, 9, 12];
const V = [-1, 2, 7, 11];
const CHORDS: [number, number[], number][] = [
  [0, I, 3],
  [3, IV, 2],
  [5, I, 1],
  [SWOOP_AT, V, 2.2],
];

export interface JingleCue { line: number; word: number; at: number } // at: ms from now

const st = (f: number, steps: number) => f * 2 ** (steps / 12);

function leadNote(ac: AudioContext, out: AudioNode, t: number, freq: number, len: number, toFreq?: number) {
  const end = t + len;
  const filter = ac.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 2600;
  const amp = ac.createGain();
  amp.gain.setValueAtTime(0, t);
  amp.gain.linearRampToValueAtTime(0.16, t + 0.012);
  amp.gain.linearRampToValueAtTime(0.11, t + 0.12);
  amp.gain.setValueAtTime(0.11, end - 0.06);
  amp.gain.linearRampToValueAtTime(0, end);
  filter.connect(amp).connect(out);

  const vibrato = ac.createOscillator();
  vibrato.frequency.value = 5.6;
  const depth = ac.createGain();
  depth.gain.setValueAtTime(0, t);
  depth.gain.linearRampToValueAtTime(toFreq ? 30 : 8, t + Math.min(len, 0.4));
  vibrato.connect(depth);

  [['square', 1, 0.5], ['sine', 2, 0.6], ['triangle', 4, 0.25]].forEach(([type, mult, g]) => {
    const osc = ac.createOscillator();
    osc.type = type as OscillatorType;
    osc.frequency.setValueAtTime(freq * (mult as number), t);
    if (toFreq) osc.frequency.exponentialRampToValueAtTime(toFreq * (mult as number), t + len * 0.55);
    depth.connect(osc.detune);
    const gain = ac.createGain();
    gain.gain.value = g as number;
    osc.connect(gain).connect(filter);
    osc.start(t);
    osc.stop(end + 0.02);
  });
  vibrato.start(t);
  vibrato.stop(end + 0.02);

  // A glockenspiel strike on top, so the hook rings like a carillon.
  const glock = ac.createOscillator();
  glock.type = 'sine';
  glock.frequency.value = freq * 2;
  const gg = ac.createGain();
  gg.gain.setValueAtTime(0, t);
  gg.gain.linearRampToValueAtTime(0.09, t + 0.004);
  gg.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
  glock.connect(gg).connect(out);
  glock.start(t);
  glock.stop(t + 0.75);
}

function organ(ac: AudioContext, out: AudioNode, t: number, freqs: number[], len: number, attack = 0.03) {
  const end = t + len;
  for (const f of freqs) {
    for (const detune of [-7, 7]) {
      const osc = ac.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.value = f;
      osc.detune.value = detune;
      const g = ac.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.03, t + attack);
      g.gain.setValueAtTime(0.03, end - 0.08);
      g.gain.linearRampToValueAtTime(0, end);
      osc.connect(g).connect(out);
      osc.start(t);
      osc.stop(end + 0.02);
    }
  }
}

function timpani(ac: AudioContext, out: AudioNode, t: number, freq: number, volume = 0.5) {
  const osc = ac.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq * 1.6, t);
  osc.frequency.exponentialRampToValueAtTime(freq, t + 0.07);
  const g = ac.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(volume, t + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
  osc.connect(g).connect(out);
  osc.start(t);
  osc.stop(t + 1.15);
}

function pluck(ac: AudioContext, out: AudioNode, t: number, freq: number, volume: number) {
  const osc = ac.createOscillator();
  osc.type = 'triangle';
  osc.frequency.value = freq;
  const g = ac.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(volume, t + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
  osc.connect(g).connect(out);
  osc.start(t);
  osc.stop(t + 1.5);
}

/** Plays the jingle. Returns its length in ms and when each sung word lands, or null without Web Audio. */
export function jingle(params: Partial<HowlParams> = {}): { ms: number; cues: JingleCue[] } | null {
  const ac = audio();
  if (!ac) return null;
  const p: HowlParams = { ...DEFAULT_HOWL, ...params };
  const now = ac.currentTime;
  const start = now + 0.1;
  const tonic = p.pitch; // the howl's "do"
  let lead = tonic;
  while (lead < 450) lead *= 2;
  while (lead > 900) lead /= 2;
  const pad = lead / 2;
  const drum = lead / 4;

  // Instruments share a bus with a little glue and their own cathedral reverb.
  const bus = ac.createGain();
  bus.gain.value = p.volume;
  const glue = ac.createDynamicsCompressor();
  glue.threshold.value = -16;
  glue.ratio.value = 4;
  const verb = ac.createConvolver();
  verb.buffer = impulse(ac, 2.4);
  const wet = ac.createGain();
  wet.gain.value = 0.35;
  bus.connect(glue).connect(ac.destination);
  bus.connect(verb).connect(wet).connect(ac.destination);
  const organBus = ac.createBiquadFilter();
  organBus.type = 'lowpass';
  organBus.frequency.value = 1900;
  organBus.connect(bus);

  const cues: JingleCue[] = [];
  const cue = (line: number, word: number, t: number) => cues.push({ line, word, at: Math.round((t - now) * 1000) });

  const B = start + PHRASE * EIGHTH;
  [start, B].forEach((t0, line) => {
    HOOK.forEach((n, i) => {
      const t = t0 + n.at * EIGHTH;
      leadNote(ac, bus, t, st(lead, n.step), n.len * EIGHTH * 0.95);
      cue(line, i, t);
    });
    CHORDS.forEach(([at, chord, len], i) => {
      // The first phrase ends on V (a question); the second resolves to I under the howl.
      const tones = line === 1 && i === CHORDS.length - 1 ? I : chord;
      organ(ac, organBus, t0 + at * EIGHTH, tones.map((s) => st(pad, s)), len * EIGHTH);
    });
    timpani(ac, bus, t0 + EIGHTH, drum, 0.45);
    cue(line, HOOK.length, t0 + SWOOP_AT * EIGHTH);
  });

  // Phrase one: the organ howls, low do swooping up to sol, the same shape as the HAROOOO.
  const swoop = start + SWOOP_AT * EIGHTH;
  leadNote(ac, bus, swoop, st(lead, -12), 2 * EIGHTH * 0.98, st(lead, -5));
  timpani(ac, bus, swoop, st(drum, 7), 0.35);

  // Phrase two: the Saint answers. Time the cry so its "aa" lands on the beat.
  const cryBeat = B + SWOOP_AT * EIGHTH;
  const cryAt = cryBeat - p.hLength - 0.06;
  const cryMs = howl(p, { at: cryAt });
  const vowelLen = p.aLength + p.rLength + p.oLength;
  timpani(ac, bus, cryBeat, drum, 0.6);
  organ(ac, organBus, cryBeat, I.map((s) => st(pad, s)), vowelLen + 0.3, 0.25);
  // A harp sweeps up the chord as the howl reaches its peak, then a last bell.
  const peak = cryBeat + p.aLength + p.rLength + p.riseTime;
  [0, 4, 7, 12, 16, 19, 24].forEach((s, i) => pluck(ac, bus, peak + i * 0.05, st(lead, s - 12), 0.07));
  const final = cryBeat + vowelLen;
  leadNote(ac, bus, final, lead, 0.5);
  pluck(ac, bus, final, lead * 2, 0.06);

  const cryStart = Math.max(cryAt, now);
  const ms = Math.max(Math.round((cryStart - now) * 1000) + cryMs, Math.round((final + 2 - now) * 1000));
  return { ms, cues };
}

/** Wires a jingle player: a [data-jingle-play] button and [data-jingle-word] spans inside `root`. */
export function bindJingle(root: HTMLElement, getParams: () => Partial<HowlParams> = () => ({})) {
  const button = root.querySelector<HTMLButtonElement>('[data-jingle-play]');
  const words = [...root.querySelectorAll<HTMLElement>('[data-jingle-word]')];
  let timers: number[] = [];
  let playing = false;
  const reset = () => words.forEach((w) => w.classList.remove('lit'));
  button?.addEventListener('click', async () => {
    if (playing) return;
    const params = getParams();
    if ((params.realMix ?? DEFAULT_HOWL.realMix) > 0) await preloadWolf();
    const result = jingle(params);
    if (!result) return;
    playing = true;
    root.classList.add('playing');
    timers.forEach(clearTimeout);
    reset();
    timers = result.cues.map((c) =>
      window.setTimeout(() => {
        if (c.line === 1 && c.word === 0) reset();
        words.find((w) => w.dataset.jingleWord === `${c.line}-${c.word}`)?.classList.add('lit');
      }, c.at),
    );
    root.dispatchEvent(new CustomEvent('jingle', { bubbles: true, detail: { ms: result.ms } }));
    timers.push(
      window.setTimeout(() => {
        playing = false;
        root.classList.remove('playing');
        reset();
      }, result.ms),
    );
  });
}
