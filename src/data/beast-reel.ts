// The Storm Reel: how the Bearwolftriceratiger saga is staged (see BRAND.md, "Beast sub-theme").
// Each scene is a 12 x 6 grid on wide screens. A cue says which beat brings a panel in, where it lands
// and how it arrives. On phones each beat shows only its own panels. Copy stays in beast.ts.

export interface Cue {
  /** The beat that brings it in, or a range ('3-7') for a panel that holds others. */
  b: number | string;
  /** The last beat it stays on screen, when it leaves before the scene ends. */
  to?: number;
  /** grid-area on the 12 x 6 grid. */
  at?: string;
  in?: 'l' | 'r' | 't' | 'b' | 'slam' | 'cut' | 'shut' | 'pin';
  /** Stagger, in steps of 90ms. */
  d?: number;
  look?: string;
}

export function cueAttrs(c?: Cue) {
  if (!c) return {};
  const style = [c.at && `--at:${c.at}`, c.d && `--d:${c.d * 90}ms`].filter(Boolean).join(';');
  return { 'data-b': String(c.b), 'data-to': c.to, 'data-in': c.in, style: style || undefined };
}

// One cue per block of each Telling, in the order of `blocks` in beast.ts.
export const tellingCues: Record<string, Cue[]> = {
  blizzard: [
    { b: 1, at: '1 / 1 / span 2 / span 4', in: 'l', look: 'r-panel' },
    { b: 2, at: '3 / 1 / span 2 / span 4', in: 'l', look: 'r-panel' },
    { b: 2, at: '1 / 5 / span 4 / span 8', in: 'cut', d: 1 },
    { b: 3, at: '5 / 5 / span 2 / span 8', in: 'slam' },
    { b: 4, at: '5 / 1 / span 1 / span 4', in: 'b', look: 'r-panel r-fill r-big' },
    { b: 4, at: '6 / 1 / span 1 / span 4', in: 'b', d: 1, look: 'r-panel r-dark' },
  ],
  'four-echoes': [
    { b: 1, at: '1 / 1 / span 2 / span 4', in: 't', look: 'r-panel r-small' },
    { b: 1, at: '1 / 5 / span 2 / span 5', in: 't', d: 1, look: 'r-panel r-small' },
    { b: '2-5' },
    { b: 2, at: '5 / 1 / span 2 / span 3', in: 'b', d: 2, look: 'r-panel r-small' },
    { b: 3, at: '5 / 4 / span 2 / span 3', in: 'b', d: 1, look: 'r-panel r-small' },
    { b: 4, at: '5 / 7 / span 2 / span 3', in: 'b', d: 1, look: 'r-panel r-small' },
    { b: 5, at: '5 / 10 / span 2 / span 3', in: 'b', d: 1, look: 'r-panel r-small' },
  ],
  rising: [
    { b: 1, at: '1 / 1 / span 3 / span 4', in: 'l', look: 'r-panel r-roomy' },
    { b: 1, at: '4 / 1 / span 3 / span 4', in: 'l', d: 2, look: 'r-panel r-fill r-roomy' },
    { b: 2, at: '1 / 5 / span 6 / span 4', in: 'slam' },
    { b: 3, at: '1 / 9 / span 3 / span 4', in: 'r', look: 'r-panel r-roomy' },
    { b: 4, at: '4 / 9 / span 2 / span 4', in: 'slam', look: 'r-tight' },
    { b: 4, at: '6 / 9 / span 1 / span 4', in: 'b', d: 1, look: 'r-panel r-dark r-small' },
  ],
  colors: [
    { b: 1, at: '1 / 1 / span 2 / span 4', in: 'l', look: 'r-panel r-roomy' },
    { b: '2-3' },
    { b: 3, at: '3 / 1 / span 2 / span 4', in: 'l', d: 2, look: 'r-panel r-roomy' },
    { b: 4, at: '5 / 1 / span 2 / span 4', in: 'b', look: 'r-panel r-dark r-roomy' },
  ],
  deeds: [
    { b: 1, at: '1 / 1 / span 1 / span 12', in: 'cut', look: 'r-panel r-big' },
    { b: 2, at: '2 / 1 / span 5 / span 4', in: 'l', look: 'r-t1' },
    { b: 3, at: '2 / 5 / span 5 / span 4', in: 'b', look: 'r-t2' },
    { b: 4, at: '2 / 9 / span 5 / span 4', in: 'r', look: 'r-t1' },
  ],
  // Two sheets in one Telling: the evidence board (beats 1 to 7), then the horn count (8 to 11).
  sightings: [
    { b: 1, to: 7, at: '1 / 1 / span 3 / span 3', in: 'l', look: 'r-panel r-small' },
    { b: 2, to: 7, at: '4 / 1 / span 3 / span 3', in: 'l', look: 'r-panel r-small' },
    { b: '3-7', to: 7, at: '1 / 4 / span 6 / span 9', in: 'cut' },
    { b: '8-10', at: '1 / 1 / span 5 / span 12', in: 'slam' },
    { b: 11, at: '6 / 1 / span 1 / span 12', in: 'b', look: 'r-panel r-dark r-big' },
  ],
  saint: [
    { b: 1, at: '1 / 1 / span 2 / span 4', in: 'l', look: 'r-panel' },
    { b: 1, at: '3 / 1 / span 3 / span 4', in: 'l', d: 2, look: 'r-panel' },
    { b: 2, at: '1 / 5 / span 5 / span 8', in: 'cut' },
    { b: 3, at: '6 / 1 / span 1 / span 8', in: 'b', look: 'r-panel r-fill r-big' },
  ],
};

// The pieces inside the inline art, which the reel lays out one by one.
export const artCues = {
  echoCaption: { b: 2, at: '1 / 10 / span 2 / span 3', in: 'r' } as Cue,
  echoes: [0, 1, 2, 3].map((i): Cue => ({ b: i + 2, at: `3 / ${1 + i * 3} / span 2 / span 3`, in: 'pin', d: i === 0 ? 1 : 0, look: i % 2 ? 'r-t2' : 'r-t1' })),
  tabard: { b: 2, at: '1 / 5 / span 5 / span 4', in: 'shut' } as Cue,
  tabardCaption: { b: 2, at: '6 / 5 / span 1 / span 4', in: 'b', d: 2 } as Cue,
  swatches: [
    { b: 3, at: '1 / 9 / span 3 / span 4', in: 'r' },
    { b: 3, at: '4 / 9 / span 3 / span 4', in: 'r', d: 1 },
  ] as Cue[],
};

export const crossCue: Cue = { b: 3, at: '6 / 9 / span 1 / span 4', in: 'r', d: 1 };
export const factCues = {
  text: { b: 8 } as Cue,
  tally: { b: 9, in: 'pin' } as Cue,
  legend: { b: 10, in: 'r' } as Cue,
};
/** Sighting i pins up on this beat, and leaves with the board. */
export const sightingCue = (i: number): Cue => ({ b: 3 + i, to: 7, in: 'pin', d: i === 0 ? 1 : 0 });

export const fieldCues = {
  photo: { b: 1, at: '2 / 1 / span 5 / span 4', in: 'slam' } as Cue,
  rows: { b: '2-3', at: '1 / 5 / span 6 / span 8' } as Cue,
  row: (i: number): Cue => ({ b: i < 4 ? 2 : 3, in: i < 4 ? 't' : 'b', d: i % 4 }),
};
export const lawCue = (i: number): Cue => ({ b: i + 1, in: (['l', 'r', 'l', 'slam'] as const)[i] });
export const oathCue = (i: number, last: number): Cue => ({ b: i + 1, in: i === last ? 'cut' : 'l' });
