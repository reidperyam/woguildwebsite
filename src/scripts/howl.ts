// The synthesized HAROOOO: a formant "howl-voice" built from raw Web Audio.
// A buzzing glottal source (sawtooth) plus breath noise goes through three vowel formant filters
// that glide H → "aa" → "r" → "oooo", while the pitch rises and falls like a wolf howl.
// Tune it in the Howl Lab (/howl-lab), then bake the settings into DEFAULT_HOWL.
import { audio } from './holy-audio';

export interface HowlParams {
  pitch: number;        // base pitch, Hz
  formant: number;      // formant scale: <1 deeper/bigger, >1 smaller/squeakier
  hLength: number;      // "H" breath, seconds
  aLength: number;      // "aa", seconds
  rLength: number;      // "r", seconds
  oLength: number;      // "oooo", seconds
  rise: number;         // howl rise, semitones
  riseTime: number;     // seconds to reach the top of the rise
  fall: number;         // fall at the end, semitones
  vibratoRate: number;  // Hz
  vibratoDepth: number; // cents
  breath: number;       // 0–1 breathiness
  gravel: number;       // 0–1 grit / distortion
  roll: number;         // 0–1 rolled-R flutter
  voices: number;       // 1–8, more = a pack / choir
  spread: number;       // cents of detune between voices
  reverb: number;       // 0–1 wet mix
  reverbSize: number;   // seconds
  volume: number;       // 0–1
}

export interface HowlControl {
  key: keyof HowlParams;
  label: string;
  group: string;
  min: number;
  max: number;
  step: number;
  unit?: string;
}

export const HOWL_CONTROLS: HowlControl[] = [
  { key: 'pitch', label: 'Pitch', group: 'Voice', min: 50, max: 420, step: 1, unit: 'Hz' },
  { key: 'formant', label: 'Throat size', group: 'Voice', min: 0.6, max: 1.6, step: 0.01, unit: '×' },
  { key: 'volume', label: 'Volume', group: 'Voice', min: 0, max: 1, step: 0.01 },
  { key: 'hLength', label: '“H” breath', group: 'Word timing', min: 0.02, max: 0.4, step: 0.01, unit: 's' },
  { key: 'aLength', label: '“Aa”', group: 'Word timing', min: 0.05, max: 0.6, step: 0.01, unit: 's' },
  { key: 'rLength', label: '“R”', group: 'Word timing', min: 0.04, max: 0.5, step: 0.01, unit: 's' },
  { key: 'oLength', label: '“Oooo”', group: 'Word timing', min: 0.3, max: 5, step: 0.05, unit: 's' },
  { key: 'rise', label: 'Howl rise', group: 'Howl', min: 0, max: 14, step: 0.5, unit: 'st' },
  { key: 'riseTime', label: 'Rise time', group: 'Howl', min: 0.05, max: 2, step: 0.05, unit: 's' },
  { key: 'fall', label: 'Fall at end', group: 'Howl', min: 0, max: 14, step: 0.5, unit: 'st' },
  { key: 'vibratoRate', label: 'Vibrato speed', group: 'Howl', min: 2, max: 10, step: 0.1, unit: 'Hz' },
  { key: 'vibratoDepth', label: 'Vibrato depth', group: 'Howl', min: 0, max: 120, step: 1, unit: '¢' },
  { key: 'breath', label: 'Breathiness', group: 'Texture', min: 0, max: 1, step: 0.01 },
  { key: 'gravel', label: 'Gravel', group: 'Texture', min: 0, max: 1, step: 0.01 },
  { key: 'roll', label: 'Rolled R', group: 'Texture', min: 0, max: 1, step: 0.01 },
  { key: 'voices', label: 'Voices', group: 'Pack', min: 1, max: 8, step: 1 },
  { key: 'spread', label: 'Spread', group: 'Pack', min: 0, max: 50, step: 1, unit: '¢' },
  { key: 'reverb', label: 'Cathedral', group: 'Space', min: 0, max: 1, step: 0.01 },
  { key: 'reverbSize', label: 'Hall size', group: 'Space', min: 0.5, max: 6, step: 0.1, unit: 's' },
];

/** The official site HAROOOO. Replace with settings copied from the Howl Lab. */
export const DEFAULT_HOWL: HowlParams = {
  pitch: 150, formant: 1, hLength: 0.12, aLength: 0.2, rLength: 0.13, oLength: 2.2,
  rise: 7, riseTime: 0.45, fall: 6, vibratoRate: 5.6, vibratoDepth: 40,
  breath: 0.3, gravel: 0.2, roll: 0.45, voices: 1, spread: 12, reverb: 0.45, reverbSize: 3.2, volume: 0.8,
};

export const HOWL_PRESETS: Record<string, Partial<HowlParams>> = {
  Saint: {},
  Elder: { pitch: 85, formant: 0.8, gravel: 0.5, rise: 5, oLength: 2.8, vibratoDepth: 28, reverb: 0.6, reverbSize: 4.5 },
  Whelp: { pitch: 300, formant: 1.35, rise: 10, oLength: 1.4, riseTime: 0.3, gravel: 0.05, breath: 0.4, vibratoRate: 7 },
  Werewolf: { pitch: 120, rise: 12, riseTime: 0.9, oLength: 3.6, fall: 10, vibratoDepth: 70, gravel: 0.35, roll: 0.2, reverb: 0.55 },
  Choir: { voices: 6, spread: 20, gravel: 0.05, breath: 0.2, reverb: 0.75, reverbSize: 5, vibratoDepth: 30, oLength: 2.8 },
  Battlecry: { pitch: 175, hLength: 0.06, aLength: 0.14, rLength: 0.08, oLength: 1.6, rise: 4, gravel: 0.7, roll: 0.8, breath: 0.15, reverb: 0.3, voices: 3, spread: 15 },
};

// Formant targets (Hz) for an adult voice: [F1, F2, F3].
const VOWELS = {
  a: [730, 1090, 2440],
  r: [490, 1350, 1690],
  o: [570, 840, 2410],
  u: [320, 800, 2240],
} as const;

const impulseCache = new Map<string, AudioBuffer>();
function impulse(ac: AudioContext, seconds: number): AudioBuffer {
  const key = `${ac.sampleRate}:${seconds.toFixed(1)}`;
  const cached = impulseCache.get(key);
  if (cached) return cached;
  const len = Math.floor(ac.sampleRate * seconds);
  const buf = ac.createBuffer(2, len, ac.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 2.8;
  }
  impulseCache.set(key, buf);
  return buf;
}

let noiseBuffer: AudioBuffer | null = null;
function noise(ac: AudioContext): AudioBuffer {
  if (noiseBuffer && noiseBuffer.sampleRate === ac.sampleRate) return noiseBuffer;
  const len = ac.sampleRate * 2;
  noiseBuffer = ac.createBuffer(1, len, ac.sampleRate);
  const d = noiseBuffer.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  return noiseBuffer;
}

function gravelCurve(amount: number): Float32Array {
  const k = amount * 60;
  const n = 1024;
  const curve = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * 2 - 1;
    curve[i] = ((1 + k) * x) / (1 + k * Math.abs(x));
  }
  return curve;
}

/** The pitch contour (multiplier of the base pitch) at time t, for drawing in the lab. */
export function pitchAt(p: HowlParams, t: number): number {
  const tA = p.hLength + p.aLength;
  const tR = tA + p.rLength;
  const tO = tR + p.oLength;
  const top = 2 ** (p.rise / 12);
  const end = 2 ** ((p.rise - p.fall) / 12);
  if (t < tA * 0.6) return 0.94 + (0.06 * t) / (tA * 0.6);
  if (t < tR) return 1;
  if (t < tR + p.riseTime) return 1 * (top / 1) ** ((t - tR) / p.riseTime);
  const fallStart = Math.max(tR + p.riseTime, tO - Math.min(0.6, p.oLength * 0.35));
  if (t < fallStart) return top;
  if (t < tO + 0.3) return top + (end - top) * ((t - fallStart) / (tO + 0.3 - fallStart));
  return end;
}

export function howlDuration(p: HowlParams): number {
  return p.hLength + p.aLength + p.rLength + p.oLength + 0.35;
}

/** Plays the HAROOOO. Returns its length in ms (including the reverb tail). */
export function howl(params: Partial<HowlParams> = {}, opts: { analyser?: AnalyserNode } = {}): number {
  const ac = audio();
  if (!ac) return 0;
  const p: HowlParams = { ...DEFAULT_HOWL, ...params };
  const t0 = ac.currentTime + 0.06;
  const tH = t0 + p.hLength;
  const tA = tH + p.aLength;
  const tR = tA + p.rLength;
  const tO = tR + p.oLength;
  const end = tO + 0.35;
  const fallStart = Math.max(tR + p.riseTime, tO - Math.min(0.6, p.oLength * 0.35));
  const stop = end + 0.1;

  // Output: dry + cathedral reverb.
  const out = ac.createGain();
  out.gain.value = p.volume * 0.9;
  const dry = ac.createGain();
  dry.gain.value = 1 - p.reverb * 0.6;
  const wet = ac.createGain();
  wet.gain.value = p.reverb * 1.4;
  const verb = ac.createConvolver();
  verb.buffer = impulse(ac, p.reverbSize);
  out.connect(dry).connect(ac.destination);
  out.connect(verb).connect(wet).connect(ac.destination);
  if (opts.analyser) { dry.connect(opts.analyser); wet.connect(opts.analyser); }

  // Formant bank: three parallel band-pass filters that glide between vowels.
  const bankIn = ac.createGain();
  const formants = [
    { q: 7, gain: 1.0 },
    { q: 9, gain: 0.55 },
    { q: 12, gain: 0.3 },
  ].map((f, i) => {
    const bp = ac.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = f.q;
    const g = ac.createGain();
    g.gain.value = f.gain * (1 + i * 0.4);
    bankIn.connect(bp).connect(g).connect(out);
    return bp;
  });
  // A little unfiltered low body so it isn't too thin.
  const body = ac.createBiquadFilter();
  body.type = 'lowpass';
  body.frequency.value = 400 * p.formant;
  const bodyGain = ac.createGain();
  bodyGain.gain.value = 0.12;
  bankIn.connect(body).connect(bodyGain).connect(out);

  const setVowel = (v: keyof typeof VOWELS, at: number, ramp: boolean) => {
    formants.forEach((bp, i) => {
      const hz = VOWELS[v][i] * p.formant;
      if (ramp) bp.frequency.linearRampToValueAtTime(hz, at);
      else bp.frequency.setValueAtTime(hz, at);
    });
  };
  setVowel('a', t0, false);
  setVowel('a', tA, true);
  setVowel('r', tA + p.rLength * 0.6, true);
  setVowel('r', tR, true);
  setVowel('o', tR + 0.12, true);
  setVowel('u', tR + p.oLength * 0.55, true);
  setVowel('u', end, true);

  // Breath noise: loud for the "H", a whisper underneath the vowels.
  const breath = ac.createBufferSource();
  breath.buffer = noise(ac);
  breath.loop = true;
  const breathGain = ac.createGain();
  breathGain.gain.setValueAtTime(0, t0);
  breathGain.gain.linearRampToValueAtTime(0.5 + p.breath * 0.6, t0 + p.hLength * 0.4);
  breathGain.gain.linearRampToValueAtTime(p.breath * 0.18, tH + 0.05);
  breathGain.gain.setValueAtTime(p.breath * 0.18, tO);
  breathGain.gain.linearRampToValueAtTime(0, end);
  breath.connect(breathGain).connect(bankIn);
  breath.start(t0);
  breath.stop(stop);

  // Rolled R: a fast tremolo, only during the "r".
  const rollLfo = ac.createOscillator();
  rollLfo.frequency.value = 26;
  const rollDepth = ac.createGain();
  rollDepth.gain.setValueAtTime(0, t0);
  rollDepth.gain.setValueAtTime(0, tA);
  rollDepth.gain.linearRampToValueAtTime(p.roll * 0.7, tA + 0.02);
  rollDepth.gain.setValueAtTime(p.roll * 0.7, tR - 0.02);
  rollDepth.gain.linearRampToValueAtTime(0, tR);
  rollLfo.connect(rollDepth);
  rollLfo.start(t0);
  rollLfo.stop(stop);

  const shaper = ac.createWaveShaper();
  shaper.curve = gravelCurve(p.gravel);
  shaper.oversample = '2x';
  const voiceBus = ac.createGain();
  voiceBus.gain.value = 1 / Math.sqrt(p.voices);
  rollDepth.connect(voiceBus.gain);
  voiceBus.connect(shaper).connect(bankIn);

  for (let v = 0; v < p.voices; v++) {
    const offset = p.voices > 1 ? (v - (p.voices - 1) / 2) * p.spread : 0;
    const f = p.pitch * 2 ** (offset / 1200) * (1 + (Math.random() - 0.5) * 0.006);
    const s = t0 + (p.voices > 1 ? Math.random() * 0.05 : 0);
    const osc = ac.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(f * 0.94, s);
    osc.frequency.linearRampToValueAtTime(f, s + (tA - t0) * 0.6);
    osc.frequency.setValueAtTime(f, tR);
    osc.frequency.exponentialRampToValueAtTime(f * 2 ** (p.rise / 12), tR + p.riseTime);
    osc.frequency.setValueAtTime(f * 2 ** (p.rise / 12), fallStart);
    osc.frequency.exponentialRampToValueAtTime(f * 2 ** ((p.rise - p.fall) / 12), end);

    // Vibrato grows in once the howl reaches its peak.
    const lfo = ac.createOscillator();
    lfo.frequency.value = p.vibratoRate * (1 + (Math.random() - 0.5) * 0.08);
    const depth = ac.createGain();
    depth.gain.setValueAtTime(0, s);
    depth.gain.setValueAtTime(0, tR + p.riseTime * 0.7);
    depth.gain.linearRampToValueAtTime(p.vibratoDepth, Math.min(tO, tR + p.riseTime + 0.6));
    lfo.connect(depth).connect(osc.detune);

    const amp = ac.createGain();
    amp.gain.setValueAtTime(0, s);
    amp.gain.linearRampToValueAtTime(0.08, tH);
    amp.gain.linearRampToValueAtTime(1, tH + 0.05);
    amp.gain.setValueAtTime(1, tA);
    amp.gain.linearRampToValueAtTime(0.75, tA + p.rLength * 0.5);
    amp.gain.linearRampToValueAtTime(1, tR + 0.08);
    amp.gain.setValueAtTime(1, fallStart);
    amp.gain.linearRampToValueAtTime(0.7, tO);
    amp.gain.linearRampToValueAtTime(0, end);

    osc.connect(amp).connect(voiceBus);
    osc.start(s);
    lfo.start(s);
    osc.stop(stop);
    lfo.stop(stop);
  }

  return Math.round((end - t0 + p.reverb * p.reverbSize * 0.6) * 1000);
}
