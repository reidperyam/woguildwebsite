// The heavy metal band, synthesized with Web Audio: distorted guitars and a drum kit.
// Shared by the Cathedral hymn (holy-audio.ts) and the launch guitar solo (launch-audio.ts).

let fuzz: Float32Array | null = null;
/** A hard-clipping distortion curve, like a cranked amp. */
export function distortion(): Float32Array {
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
export function guitar(ac: AudioContext, out: AudioNode, freqs: number[], start: number, dur: number, opts: { muted?: boolean; pan?: number; level?: number; vibrato?: number } = {}) {
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
export function riff(ac: AudioContext, out: AudioNode, root: number, start: number, dur: number, muted: boolean, level: number) {
  const notes = [root, root * 1.5, root * 2];
  guitar(ac, out, notes, start, dur, { muted, pan: -0.8, level });
  guitar(ac, out, notes.map((f) => f * 1.002), start + 0.009, dur, { muted, pan: 0.8, level });
}

export function noiseBuffer(ac: AudioContext): AudioBuffer {
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

export function kick(ac: AudioContext, out: AudioNode, noise: AudioBuffer, start: number, level = 0.9) {
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

export function snare(ac: AudioContext, out: AudioNode, noise: AudioBuffer, start: number, level = 0.55) {
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

export const hat = (ac: AudioContext, out: AudioNode, noise: AudioBuffer, start: number) => noiseHit(ac, out, noise, start, 'highpass', 8000, 0.05, 0.12);
export const crash = (ac: AudioContext, out: AudioNode, noise: AudioBuffer, start: number) => noiseHit(ac, out, noise, start, 'highpass', 4500, 1.8, 0.32);
