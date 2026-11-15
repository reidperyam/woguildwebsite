// The launch solo for the IGNITE button on /launch, synthesized with Web Audio (no audio files).
// A heavy metal guitar solo in E minor at 150 bpm over the same band as the Cathedral hymn
// (src/scripts/metal.ts): a bent scream, a triplet shred, tapped arpeggios over C and D, a high
// bend, a stop-time run into a dive bomb, then the whole band hits one last chord and lets it ring.
// The page cries the Saint's HAROOOO over that last chord. Nothing plays until the viewer clicks.
import { audio, nave } from './holy-audio';
import { distortion, guitar, riff, noiseBuffer, kick, snare, hat, crash } from './metal';

const BEAT = 60 / 150;
const BAR = BEAT * 4;
const TRIP = BEAT / 6; // sixteenth-note triplets: the shred
const SIX = BEAT / 4; // sixteenths

/** When the rocket leaves the pad (the dive bomb) and when the band hits the last chord, in ms from the start. */
export const SOLO_LIFTOFF_MS = Math.round((5 * BAR + 0.8) * 1000);
export const SOLO_HIT_MS = Math.round(6 * BAR * 1000);

const hz = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

// MIDI note numbers. E minor: E F# G A B C D.
const E2 = 40, C3 = 48, D3 = 50;
const B4 = 71, C5 = 72, D5 = 74, E5 = 76, FS5 = 78, G5 = 79, A5 = 81, B5 = 83, C6 = 84, D6 = 86, E6 = 88, FS6 = 90, G6 = 91, A6 = 93, B6 = 95;
const PENT = [64, 67, 69, 71, 74, 76, 79, 81, 83, 86, 88]; // E minor pentatonic, E4 to E6

/** One note of the solo. `at` and `len` in seconds; `bend` in semitones; `vib` is vibrato depth in cents;
 *  `tie` slurs into the note without a new pick attack; `dive` drops the pitch three octaves (the whammy bar). */
interface LeadNote { at: number; midi: number; len: number; bend?: number; vib?: number; tie?: boolean; dive?: boolean }

/** A run of equal-length notes starting at `at`. */
const run = (at: number, step: number, midis: number[]): LeadNote[] => midis.map((midi, i) => ({ at: at + i * step, midi, len: step }));

const bar = (b: number) => b * BAR;

const SOLO: LeadNote[] = [
  // Bar 1, Em: the scream. D bent up to E and held, then down through B.
  { at: 0, midi: D5, len: 0.55, bend: 2 },
  { at: 0.55, midi: E5, len: 0.65, vib: 35, tie: true },
  { at: 1.2, midi: D5, len: 0.2, tie: true },
  { at: 1.4, midi: B4, len: 0.2 },
  // Bar 2, Em: down the pentatonic in falling groups of three.
  ...run(bar(1), TRIP, [10, 9, 8, 7, 6, 5, 4, 3].flatMap((i) => [PENT[i], PENT[i - 1], PENT[i - 2]])),
  // Bar 3, C: tapped arpeggio.
  ...run(bar(2), TRIP, Array(4).fill([C5, E5, G5, C6, G5, E5]).flat()),
  // Bar 4, D: tapped arpeggio, climbing on the last beat.
  ...run(bar(3), TRIP, [...Array(3).fill([D5, FS5, A5, D6, A5, FS5]).flat(), A5, B5, C6, D6, E6, FS6]),
  // Bar 5, Em: the high bend, D up to E, screaming.
  { at: bar(4), midi: D6, len: 0.6, bend: 2 },
  { at: bar(4) + 0.6, midi: E6, len: 0.8, vib: 45, tie: true },
  ...run(bar(4) + 1.4, 0.1, [D6, B5]),
  // Bar 6, stop-time: a run up the scale, then the dive bomb.
  ...run(bar(5), TRIP, [E5, FS5, G5, A5, B5, C6, D6, E6, FS6, G6, A6, B6]),
  { at: bar(5) + 0.8, midi: E6, len: 0.8, dive: true },
  // Bar 7: the last chord. E, held, wailing.
  { at: bar(6), midi: E5, len: 2.4, vib: 40 },
];

/** The lead guitar: one continuous voice through a cranked amp, with a dotted-eighth echo. */
function lead(ac: AudioContext, out: AudioNode, notes: LeadNote[], start: number, level: number) {
  const last = notes[notes.length - 1];
  const end = start + last.at + last.len;

  const drive = ac.createGain();
  drive.gain.value = 2.2;
  const amp = ac.createWaveShaper();
  amp.curve = distortion() as Float32Array<ArrayBuffer>;
  amp.oversample = '4x';
  const low = ac.createBiquadFilter();
  low.type = 'highpass';
  low.frequency.value = 180;
  const cab = ac.createBiquadFilter();
  cab.type = 'lowpass';
  cab.frequency.value = 4800;
  const mid = ac.createBiquadFilter();
  mid.type = 'peaking';
  mid.frequency.value = 2200;
  mid.gain.value = 5;
  const env = ac.createGain();
  drive.connect(amp).connect(low).connect(cab).connect(mid).connect(env).connect(out);

  // The echo: a dotted eighth (three sixteenths), darker on every repeat.
  const echo = ac.createDelay(1);
  echo.delayTime.value = SIX * 3;
  const echoTone = ac.createBiquadFilter();
  echoTone.type = 'lowpass';
  echoTone.frequency.value = 2600;
  const feedback = ac.createGain();
  feedback.gain.value = 0.32;
  const wet = ac.createGain();
  wet.gain.value = 0.3;
  env.connect(echo).connect(echoTone).connect(feedback).connect(echo);
  echoTone.connect(wet).connect(out);

  // Two saws a few cents apart, so the lead sounds thick. Vibrato wobbles both.
  const oscs = [-7, 7].map((detune) => {
    const osc = ac.createOscillator();
    osc.type = 'sawtooth';
    osc.detune.value = detune;
    osc.connect(drive);
    return osc;
  });
  const wobble = ac.createOscillator();
  wobble.frequency.value = 6.2;
  const depth = ac.createGain();
  depth.gain.value = 0;
  wobble.connect(depth);
  oscs.forEach((osc) => depth.connect(osc.detune));

  env.gain.setValueAtTime(0, start);
  for (const n of notes) {
    const t = start + n.at;
    const f = hz(n.midi);
    for (const osc of oscs) {
      osc.frequency.setValueAtTime(f, t);
      if (n.bend) {
        osc.frequency.setValueAtTime(f, t + 0.04);
        osc.frequency.linearRampToValueAtTime(f * 2 ** (n.bend / 12), t + 0.04 + Math.min(0.18, n.len * 0.4));
      }
      if (n.dive) osc.frequency.exponentialRampToValueAtTime(f / 8, t + n.len);
    }
    // A pick attack: a quick dip and swell. Tied notes slur in without one.
    if (!n.tie) {
      env.gain.setValueAtTime(level * 0.35, t);
      env.gain.linearRampToValueAtTime(level, t + 0.008);
    }
    if (n.dive) env.gain.linearRampToValueAtTime(level * 0.2, t + n.len);
    depth.gain.setValueAtTime(0, t);
    if (n.vib) depth.gain.linearRampToValueAtTime(n.vib, t + Math.min(0.35, n.len * 0.5));
  }
  env.gain.setValueAtTime(level, end - 0.5);
  env.gain.linearRampToValueAtTime(0, end);

  [...oscs, wobble].forEach((osc) => {
    osc.start(start);
    osc.stop(end + 0.05);
  });
}

// Chord roots for the rhythm guitars, one per bar: Em, Em, C, D, Em.
const ROOTS = [E2, E2, C3, D3, E2];

/** The launch solo. Returns its length in ms, ring-out included. */
export function guitarSolo(): number {
  const ac = audio();
  if (!ac) return 0;
  const now = ac.currentTime + 0.06;

  // Everything meets in one limiter, like the hymn, with a little arena on it.
  const stage = ac.createDynamicsCompressor();
  stage.threshold.value = -10;
  stage.knee.value = 4;
  stage.ratio.value = 12;
  stage.attack.value = 0.003;
  stage.release.value = 0.2;
  const master = ac.createGain();
  master.gain.value = 0.85;
  stage.connect(master).connect(ac.destination);
  const arena = ac.createConvolver();
  arena.buffer = nave(ac, 2);
  const arenaWet = ac.createGain();
  arenaWet.gain.value = 0.18;
  arena.connect(arenaWet).connect(stage);

  const band = ac.createGain();
  band.gain.value = 0.7;
  band.connect(stage);
  band.connect(arena);
  const noise = noiseBuffer(ac);

  ROOTS.forEach((midi, b) => {
    const t = now + bar(b);
    const root = hz(midi);
    if (b === 0) {
      // The opening chord rings under the scream, with a half-time beat.
      riff(ac, band, root, t, BAR, false, 0.08);
      crash(ac, band, noise, t);
      [0, 2.5].forEach((k) => kick(ac, band, noise, t + k * BEAT));
      snare(ac, band, noise, t + 2 * BEAT);
      [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5].forEach((h) => hat(ac, band, noise, t + h * BEAT));
      return;
    }
    // The shred: an open chord, then a palm-muted gallop (da-da-DUN), over double bass.
    riff(ac, band, root, t, BEAT * 0.95, false, 0.08);
    [1, 2, 3].forEach((beat) => [0, 0.5, 0.75].forEach((o) => riff(ac, band, root, t + (beat + o) * BEAT, BEAT * 0.25, true, 0.1)));
    if (b % 2 === 1) crash(ac, band, noise, t);
    for (let s = 0; s < 16; s++) kick(ac, band, noise, t + s * SIX, 0.6);
    if (b === 4) {
      // A snare fill on the last beat, into the stop-time bar.
      snare(ac, band, noise, t + BEAT);
      snare(ac, band, noise, t + 2 * BEAT);
      [0, 1, 2, 3].forEach((s) => snare(ac, band, noise, t + 3 * BEAT + s * SIX, 0.35 + s * 0.08));
    } else {
      [1, 3].forEach((beat) => snare(ac, band, noise, t + beat * BEAT));
    }
  });

  // Bar 6, stop-time: one hit, then only the run and the dive, with a snare roll building under the dive.
  const stop = now + bar(5);
  riff(ac, band, hz(E2), stop, BEAT * 0.3, true, 0.12);
  kick(ac, band, noise, stop);
  crash(ac, band, noise, stop);
  for (let s = 0; s < 8; s++) snare(ac, band, noise, stop + 2 * BEAT + s * SIX, 0.15 + s * 0.06);

  // Bar 7: the whole band on the last chord, left to ring out.
  const hit = now + bar(6);
  riff(ac, band, hz(E2), hit, 2.6, false, 0.09);
  guitar(ac, band, [hz(E2) / 2], hit, 2.6, { level: 0.08 }); // the bass, an octave under
  kick(ac, band, noise, hit, 1);
  crash(ac, band, noise, hit);
  crash(ac, band, noise, hit + 0.02);

  lead(ac, stage, SOLO, now, 0.11);

  const length = bar(6) + 2.6 + 2;
  window.setTimeout(() => { band.disconnect(); arena.disconnect(); }, (length + 1) * 1000);
  return Math.round(length * 1000);
}
