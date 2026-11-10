// Holy sounds for the Cathedral, all synthesized with Web Audio (no audio files).
// Nothing plays until the viewer clicks or types: browsers block sound before that anyway.

let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
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

function chord(ac: AudioContext, out: AudioNode, freqs: number[], start: number, dur: number) {
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
      g.gain.linearRampToValueAtTime(0.05, start + 0.35);
      g.gain.setValueAtTime(0.05, start + dur - 0.3);
      g.gain.linearRampToValueAtTime(0, start + dur);
      osc.connect(g).connect(out);
      osc.start(start);
      vibrato.start(start);
      osc.stop(start + dur + 0.05);
      vibrato.stop(start + dur + 0.05);
    }
  }
}

/** The Heavenly Choir: a plagal "A-men" cadence (F major, then C major). Returns its length in ms. */
export function choir(): number {
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
  chord(ac, lowpass, [174.61, 220.0, 261.63, 349.23], now, 1.9);
  chord(ac, lowpass, [130.81, 196.0, 261.63, 329.63, 523.25], now + 1.8, 2.8);
  return 4700;
}
