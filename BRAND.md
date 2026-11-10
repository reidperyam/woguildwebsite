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
- **NavBar:** a 52px WO monogram, the wordmark WEREWOLF ORGASMAHOWL, then HOME, RECRUITMENT and an APPLY primary button, closed by a 4px bottom rule. The current page gets a 4px accent underline. Links wrap on phones; APPLY is never hidden.
- **RecruitCard:** the title NOW RECRUITING with a StatusChip, class/role rows separated by 4px rules, and a focus label (Low-level Battlegrounds).
- **Monogram:** "WO" at 800 weight in a square 10px frame, in three versions: outlined, on accent, or inverted (accent letters on a ground square inside an ink field).

## Voice and content

- Headlines are short, loud and uppercase. Body copy is plain and friendly.
- Button labels name the action: JOIN THE DISCORD, SEE RECRUITMENT, APPLY.
- The guild name is cheeky; keep the rest of the copy straightforward.
- Never invent facts. Use placeholders until they're provided: `[CLASS]`, `[ROLE]`, `[DISCORD INVITE]`, `[YOUR TAGLINE]`.
- Don't use Blizzard or World of Warcraft logos, crests or game art. **Exception:** the Lore page's relic images (the guild's own fan-art edits, with orc heads and Pendulum of Doom axes on classical paintings) are allowed there and only there. Show each in a 4px ink frame, never recolored or filtered.
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
  - **The Heavenly Choir:** an "A-men" chord that blazes the sunbeams and releases doves and a shower of petals.
  - **Click the sky:** releases a dove with a bell chime.
  - **Click a relic to venerate it:** a harp flourish, a sparkle-and-heart burst and a per-relic count.
  - **Votive candles:** twelve candles that each ring a bell. Lighting all twelve triggers a miracle: the choir, a golden flash and a giant HAROOOO!
  - **The hidden miracle:** typing "haroooo" triggers the rapture, in which the page levitates and a flock of doves swarms up.
  - **Saved state:** venerations and candles are remembered in the viewer's own browser (localStorage), and the page works without it.
  - **Sound:** only ever plays after a click or keypress.
- **The HAROOOO voice:** the battle cry is a synthesized formant "howl-voice" (`src/scripts/howl.ts`): breath "H", "aa", rolled "r", then a rising, vibrato "oooo" with cathedral reverb.
  - **Where it plays:** clicking the giant HAROOOO! in the prayer, the **Howl it** button, the candle miracle, the battle-cry easter egg and the shared summon link (`/lore#haroooo`).
  - **Tuning:** it's tuned in the hidden **Howl Lab** (`/howl-lab`, not in the nav). The official settings are `DEFAULT_HOWL`. Treat it as the guild's signature sound and only change it on purpose.
- **Reduced motion:** under `prefers-reduced-motion`, doves, petals, dust and all ambient animation are hidden or stopped. The sounds and counters still work.
- **Contrast:** dark text sits on light (crimson or brown on parchment and cream, with glow shadows in the sky); light text sits on dark (gold or parchment on night).
