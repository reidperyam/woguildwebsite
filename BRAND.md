# Werewolf Orgasmahowl: brand guide for the website

This file is the source of truth for how the site looks. Follow it for every page and component.

- Design System (Claude Design): https://claude.ai/artifact/2uHaE8ULB6FRAdLYESV1oA
- Brand board with live color pickers: https://claude.ai/artifact/KBZNugBhNWwLjQqkyDx7pb

## The look in one line

Super high contrast: pure black, white type, one hot pink, one pale yellow. One heavy monospace face set large. Square corners and 4px rules.

## Tokens

Paste this into the global stylesheet and build everything from it. Don't hard-code any colors.

```css
:root {
  color-scheme: dark;

  /* Color: four colors only */
  --ground: #000000;   /* page background */
  --ink: #FFFFFF;      /* text, rules, borders: 21:1 on ground */
  --accent: #FF2E89;   /* name, headlines, links, primary buttons: ~6.0:1 on ground (AA) */
  --signal: #FDEB91;   /* status/alerts only: ~17.5:1 on ground */
  --on-accent: var(--ground);  /* text on accent is ALWAYS black (white fails at ~3.5:1) */
  --on-signal: var(--ground);
  --focus-ring: var(--accent);

  /* Type */
  --font-mono: "Martian Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  --fw-heavy: 800;
  --fw-regular: 400;
  --fs-display: clamp(56px, 10vw, 120px);
  --fs-h1: clamp(40px, 6vw, 64px);
  --fs-h2: clamp(28px, 4vw, 40px);
  --fs-h3: 28px;
  --fs-body: 20px;
  --fs-body-sm: 16px;
  --fs-label: 14px;
  --fs-button: 16px;

  /* Space: 8px base */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-5: 56px;
  --space-6: 80px;
  --space-7: 112px;

  /* Shape */
  --radius: 0;
  --rule: 4px;
  --rule-heavy: 10px;   /* monogram frame only */
  --target-min: 48px;
}

body {
  margin: 0;
  background: var(--ground);
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: var(--fs-body);
  line-height: 1.6;
}
```

Font (Google Fonts, weights 400 and 800):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Martian+Mono:wght@400;800&display=swap">
```

## Type scale

| Style | Size / line-height | Weight | Tracking | Case |
|---|---|---|---|---|
| Display | 120 / 0.92 (56 on phones) | 800 | -0.04em | UPPER |
| H1 | 64 / 1.05 (40 on phones) | 800 | -0.03em | UPPER |
| H2 | 40 / 1.1 | 800 | 0 | UPPER, on a 4px rule |
| H3 | 28 / 1.15 | 800 | 0 | UPPER |
| Body | 20 / 1.6 | 400 | 0 | Sentence case, max 65ch |
| Body small | 16 / 1.5 | 400 | 0 | Sentence case |
| Label | 14 / 1.4 | 400 | +0.12em | UPPER |
| Button | 16 / 1 | 800 | +0.08em | UPPER |

Monospace runs wide (about 0.62em per letter). Check that ORGASMAHOWL fits at phone width; if it doesn't, break it as ORGASMA-HOWL.

## Color rules

- Body copy is always `--ink` on `--ground`.
- `--accent` is for the guild name, headlines, links, primary buttons and focus rings. Never for paragraphs.
- `--signal` is for status only (OPEN, TONIGHT, FULL), at most twice per screen.
- Text on `--accent` or `--signal` is always black.
- Hover on filled controls inverts to an `--ink` fill with `--ground` text.
- Focus is `outline: var(--rule) solid var(--focus-ring); outline-offset: 4px;`.

## Shape and layout

- `border-radius: 0` everywhere.
- Borders and rules are `var(--rule) solid var(--ink)`.
- No shadows, gradients, blur, rounded cards or accent bars on card edges.
- Sections are `--space-7` apart. The page gutter is `--space-6` on desktop and `--space-2` on phones.
- Use grids of bordered cells; adjacent cells share one border.
- Buttons, links and inputs are at least `--target-min` tall.

## Components

- **Button:** primary is an `--accent` fill with black text; secondary is a 4px `--ink` outline. Both are uppercase, 800 weight and +0.08em tracking. Use `<a href>` for navigation and `<button>` for actions.
- **StatusChip:** a `--signal` fill with black text, 14px, 800 weight. When inactive, a 4px ink outline instead.
- **NavBar:** a 52px WO monogram, the wordmark WEREWOLF ORGASMAHOWL, then HOME, RECRUITMENT, the LORE and FUN dropdown menus and an APPLY primary button, closed by a 4px bottom rule. The current page gets a 4px accent underline. Links wrap on phones; APPLY is never hidden.
- **RecruitCard:** the title NOW RECRUITING with a StatusChip, class/role rows separated by 4px rules, and a focus label (Low-level Battlegrounds).
- **Monogram:** "WO" at 800 weight in a square 10px frame, in three versions: outlined, on accent, or inverted (accent letters on a ground square inside an ink field).
- **Discord server icon:** the on-accent WO monogram, framed square inside Discord's circular crop (`brand-assets/discord/`, 512×512 PNG, source HTML alongside). Keep new brand files in `brand-assets/`.

## Voice and content

- Headlines are short, loud and uppercase. Body copy is plain and friendly.
- Button labels name the action: JOIN THE DISCORD, SEE RECRUITMENT, APPLY.
- The guild name is cheeky; keep the rest of the copy straightforward.
- Never call guild members "pups". Use "packmates", "the pack" or "the faithful".
- Never invent facts. Use placeholders until they're provided: `[CLASS]`, `[ROLE]`, `[DISCORD INVITE]`, `[YOUR TAGLINE]`.
- Don't use Blizzard or World of Warcraft logos, crests or game art. **Exception: the guild tabards.** The guild's in-game tabards (`src/assets/tabards/`, data in `src/data/tabards.ts`): the **current** Werewolf Orgasmahowl tabard, silver-gray with a black edge and a black chevron, used wherever the site stands for the guild today; and two older ones, kept for history: the **original** Werewolf Orgasmahowl tabard from 2009, burgundy with a teal edge and a gold chevron, and the 2010 **Bearwolftriceratiger** tabard, yellow-green with a black edge and chevron. They may appear anywhere on the site. Show them whole, on their transparent background, never recolored, filtered or cropped; they carry their own round bronze frame, so they need no ink frame. Small square swatches of a tabard's own colors may sit next to it (the Our history cells on the home page). Where a drawing needs one of the banners (like Fig. I on the Bearwolftriceratiger page), redraw it in its own colors. **Exception:** the two Lore pages may show the guild's own images, and only there: the Saint's relics on `/lore` (fan-art edits, with orc heads and Pendulum of Doom axes on classical paintings) and the Bearwolftriceratiger painting on `/bearwolftriceratiger` (the guild's 2010 beast image). Show each one framed, never recolored or filtered.
- Icons are inline stroke SVG with square caps and `currentColor`. No emoji.

## Lore sub-theme: The Cathedral

The Lore page (`/lore`) deliberately breaks the brutalist rules above. Inside the nav and footer, it's a baroque, over-the-top holy shrine to Saint Hornatius Orgasmahowl: syrupy, gilded and silly, played completely straight. Everything is scoped under `.cathedral` in `src/styles/cathedral.css`. Don't use it on any other page.

- **Palette:** night `#0d0820`, crimson `#7a0f1f`, gold `#e8c15a` (highlight `#fff1b8`, shadow `#9a6b12`), parchment `#fbf1d6`, brown ink `#2a1608`, plus ruby, sapphire and emerald for the stained-glass windows. Gradients, glows and halos are allowed here.
- **Type:** Cinzel Decorative (Roman capitals for titles, plaques and buttons), IM Fell English (old-print body and italics), UnifrakturMaguntia (blackletter drop caps, "Here beginneth", "Amen.").
- **Pieces:** a sunburst-and-clouds hero with a halo over the name, a crimson ribbon reading HAROOOO IN EXCELSIS, a scrolling litany of the Saint's titles, a parchment proem, stained-glass chapter windows, relics in gilded frames with glowing halos and Latin plaques ("Reliquia Prima"), illuminated drop caps, scroll-style pull quotes, an arched Beatitudes tablet, a Prayer Before Queueing, and a golden closing band.
- **Shape:** rounded corners are allowed here (pill buttons, arched windows and tablet).
- **Adornments:** inline SVG ornaments live in `src/components/Ornaments.astro`:
  - acanthus-scroll corners on every parchment card,
  - a scrollwork crest across the top edge of each card,
  - rosettes on the corners of the gilt frames,
  - rosette-and-scroll dividers under every heading,
  - laurel branches framing the hero (`Laurel.astro`).
- **Layered motion:**
  - two counter-rotating sets of sunbeams,
  - doves (`Dove.astro`) flapping across the sky at three depths,
  - two layers of swaying clouds,
  - rose petals falling and golden dust rising across the whole page,
  - a glint of light sweeping across each gilt frame,
  - frames that tilt on hover,
  - the halo pulse and the litany marquee.
- **Whimsy** (`src/scripts/cathedral.ts`, with sounds from `src/scripts/holy-audio.ts`, all synthesized with Web Audio):
  - **The Heavenly Choir:** a short full-organ hymn (`choir()` in `src/scripts/holy-audio.ts`, about 14 seconds at 104 bpm). Organ power chords (root and fifth stacked through three octaves, no third, every rank of the plenum) are struck on every beat over C, G, Am, F, played twice, above a 16-foot and 32-foot pedal in a big stone-nave reverb. A trumpet reed sings the hook on top: it keeps leaping back to the same high G, and the second time it climbs to high C. A heavy metal band plays underneath: drop-tuned, double-tracked distorted guitars on the same power chords (an open chord, then a palm-muted gallop), drums with a snare backbeat and crashes that switch to double bass in the second phrase, a lead guitar doubling the melody an octave down in the second phrase, and a snare fill into the "A-men", where the guitars ring out. Then the choir and full organ sing the "A-men" (F, then C). It blazes the sunbeams and releases doves and a shower of petals. After a HAROOOO (the miracle, the summon card and the typed easter egg), only the short choir "A-men" plays.
  - **The monks' chant:** endless plainchant (`src/scripts/chant.ts`): a choir of synthesized monks singing rough Latin ("Sancte Hornatie, ora pro nobis", "Haroooo, alleluia", "Kyrie eleison") in D Dorian over a low drone, with a second part a fourth below on some phrases, in a long nave reverb. It starts when the Lore page opens if the browser allows sound, otherwise on the first click, tap or key. It sits quietly under everything and hushes while the choir or a HAROOOO plays. A fixed bottom-left toggle ("Wake the monks" / "Silence the monks") must always be available (accessibility: audio that starts on its own needs a stop control), and the choice is remembered.
  - **Click the sky:** releases a dove with a bell chime.
  - **Click a relic to venerate it:** a harp flourish, a sparkle-and-heart burst and a per-relic count.
  - **Votive candles:** twelve candles that each ring a bell. Lighting all twelve triggers a miracle: the choir, a golden flash and a giant HAROOOO!
  - **The hidden miracle:** typing "haroooo" triggers the rapture, in which the page levitates and a flock of doves swarms up.
  - **Saved state:** venerations and candles are remembered in the viewer's own browser (localStorage), and the page works without it.
  - **Sound:** only ever plays after a click or keypress.
- **The HAROOOO voice:** the battle cry is a synthesized formant "howl-voice" (`src/scripts/howl.ts`): stressed like "kangaroo" (ha-ROOOO): a quick, low, unstressed "ha", a rolled "r" that slides up, then a loud, rising, vibrato "oo" (tight, never "oh") with cathedral reverb. The `stress` dial blends back to the old HA-roooo.
  - **Where it plays:** clicking the giant HAROOOO! in the prayer, the **Howl it** button, the candle miracle, the battle-cry easter egg and the shared summon link (`/lore#haroooo`).
  - **The Howl Lab** (`/howl-lab`, in the nav's **Fun** menu) lets anyone make, name and share their own custom HAROOOO as a link (`?h=…&n=…`). The official cry is the **Saint** preset (`DEFAULT_HOWL`); the earlier HA-roooo is kept as the **Classic** preset. Treat it as the guild's signature sound and only change it on purpose.
  - **Wolves:** the lab can mix in a synthesized wolf pack (pure sliding tones with vibrato, up to six wolves) and/or a real public-domain wolf recording from the National Park Service (`public/sounds/wolf-howl-nps.mp3`), placed before or after the cry and near or far. The official Saint cry howls together with a six-wolf synth pack (mix 1, pitch 455 Hz, 2.6 s, entering with the cry, distance 0.5; no recording). Always keep the NPS credit visible wherever the recording plays.
- **Reduced motion:** under `prefers-reduced-motion`, doves, petals, dust and all ambient animation are hidden or stopped. The sounds and counters still work.
- **Contrast:** dark text sits on light (crimson or brown on parchment and cream, with glow shadows in the sky); light text sits on dark (gold or parchment on night).

## Beast sub-theme: The Storm

The Bearwolftriceratiger page (`/bearwolftriceratiger`) also breaks the brutalist rules, and it must look nothing like the Cathedral. Inside the nav and footer, it's a primal thunderstorm in the guild's 2010 colors, black and bright yellow, with a monster-movie warning-sign edge, played completely straight. Everything is scoped under `.tempest` in `src/styles/tempest.css` and `src/styles/tempest-whimsy.css`. Don't use it on any other page.

- **Palette:** black `#000000` and coal `#0b0b0a`, bright yellow `#ffd60a` (highlight `#fff36b`, shadow `#a88a00`), bone `#f1ead2` for body text, ash `#8d8a80` for captions, lightning white `#fffbe0`, and storm grays (`#16171c`, `#2c2e36`) for clouds and shadows only. No other hues.
- **Type:** Metal Mania (the title, drop caps, quotes and the roar), Anton (headings, labels, buttons, the tape), Bitter (the saga's body text). Numerals are outlined Anton, because Metal Mania's "I" reads as a bracket.
- **Shape:** square corners, thick yellow borders, hard offset shadows (no blur), black-and-yellow hazard stripes, and tiger-stripe bands (yellow with black fur wedges). Only the specimen frame gets cut corners.
- **Pieces:** a storm hero with a stacked BEAR / WOLF / TRICERA / TIGER title, hazard tape scrolling the Beast's names, a warning placard for the proem, outlined-numeral chapter tiles, six Tellings with claw marks that slash in as each heading scrolls into view, a specimen frame for the painting, a Know Your Beast field card, Awaken the Four, the Laws of the Pack, the Oath of the Charge, and a yellow hazard-striped closing band.
- **Icons:** inline SVG symbols in `src/components/BeastIcons.astro` (bolt, claw marks, paw, warning sign, the four beasts, the stripe band, and the sigil: a full-body silhouette of the Beast in the painting's charging pose, facing left, with a triceratops frill and knobbed spikes, two long brow horns and a nose horn, a hooked, open, fanged beak, the raised bear paw with hooked claws, a tiger-striped body, three planted clawed legs and a curled tail). Keep it a silhouette: solid shapes, with only the eye, stripes and a few seams cut out. The sigil sits faintly behind the hero title and in black on the closing band; set `--sigil-cut` to the background color.
- **Inline art** (`src/components/BeastArt.astro`, placed in the saga with `{ art }` blocks): Fig. I, the frozen name snapping off the banner, drawn as the burgundy Werewolf Orgasmahowl tabard with its teal edge and gold chevron (Telling I; the one place outside the Storm palette, because it's the old banner); the four echoes as details of the painting (Telling II); Fig. II, the real Bearwolftriceratiger tabard, swaying in a yellow glow, with two color swatches (Telling IV); and Fig. III, the Saint on the ice with the Beast kneeling (Telling VI). Illustrations use only the Storm palette, flat shapes, bevel joins and no gradients.
- **Painting details** (`src/components/BeastCrop.astro`): close-up crops of the painting (claw, jaws, horns, hide, chest, feet in the surf, head), given in the painting's own pixels and zoomed by the browser. They're framed in 4px yellow with a hard storm-gray shadow and never recolored or filtered. They appear in Telling II, beside each deed and as the field card's ID photo. The painting is only 400 × 368, so keep details small (about 220px wide at most).
- **Layered motion:**
  - drifting storm clouds,
  - rain across the hero and the whole page,
  - two rolling wave layers,
  - ambient lightning flashes with bolts,
  - the scrolling tape,
  - a glint across the painting,
  - the blinking EXTREME danger chip.
- **Whimsy** (`src/scripts/beast.ts`, with sounds from `src/scripts/beast-audio.ts`, all synthesized with Web Audio):
  - **The roar:** HAROOOARRR!, the Bear's growl, the Triceratops' foghorn bellow and the Tiger's raspy snarl layered into one voice, with no howl or wail on top (the Wolf's howl is only for its own totem). The page quakes and giant claw marks rip across the screen.
  - **The war drums:** drums only, no other sound. A fast tribal drum circle at 160 bpm, about 12 seconds: a big taiko-style drum on a 3-3-2 pattern, then a shaker, sticks on a clave, a djembe (bass, tone and slap) and tom turnarounds join bar by bar. Bar 7 doubles the big drum, bar 8 is a crescendoing tom fill, and it ends on one unison hit. A compressor glues it together. Lightning strikes every other bar and on each beat of the fill, the title thumps to the beat, and the final hit shakes the page. **The war dance** (`src/components/BeastDance.astro`, `src/styles/tempest-dance.css`) rises from the bottom of the screen for the whole piece, lit from below in yellow: the Beast's silhouette in the middle, rearing up on every bar, and six pack warriors (black silhouettes rim-lit in yellow, some with spears) stomping around it, swapping arms-up and knee-up poses on every beat and shuffling around the ring. They dance double time in the fill bar; on the final hit they leap and the Beast roars up, then the scene sinks away. No fire: a bonfire in front made the Beast look like it was standing in the flames. It runs off three classes on `<html>` (`dancing`, `drum-fill`, `drum-hit`), so every animation starts on the drums' first beat. With reduced motion, the scene appears but holds still.
  - **The storm:** endless ambient rain, wind and waves, with thunder rolling in every 9 to 20 seconds (the hero sky flashes with it) and, now and then, a faraway roar. It starts the way the monks' chant does (on open if allowed, otherwise on the first click), and a fixed bottom-left toggle ("Stir the storm" / "Calm the storm") must always be available. The choice is remembered.
  - **Click the storm:** a bolt of lightning strikes where you click, with a thunderclap. The closing band does it too.
  - **Pet the Beast:** clicking the painting growls or snarls, bursts paw prints and keeps a count.
  - **Awaken the Four:** four totem buttons (Bear, Wolf, Triceratops, Tiger), each with its own call. Waking all four triggers the fusion: lightning strikes each totem, then the roar.
  - **The hidden stampede:** typing "rawr" sends paw prints thundering across the screen and the Beast answers.
  - **Summon link:** `/bearwolftriceratiger#roar` opens a "The Beast has been summoned" card with **Face the Beast** and **Sneak past**.
  - **Saved state:** pets, the awakened four and the storm choice live in the viewer's own browser (localStorage), and the page works without it.
  - **Sound:** only ever plays after a click or keypress.
- **Flashing:** every flash is a single pulse, at least a third of a second apart, so nothing flickers more than three times a second.
- **Reduced motion:** rain, flashes, bolts, waves, the tape, quakes, claws and all spawned effects are hidden or stopped. The sounds and counters still work.
- **Contrast:** bone or yellow text on black, black text on yellow. Never yellow on bone.
