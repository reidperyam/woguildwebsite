# Site content: v1

The plan for what the site says. Layout and style rules are in [BRAND.md](BRAND.md). The copy itself lives in code: guild facts in `src/data/guild.ts` and the Lore catalogue in `src/data/lore.ts`. Keep this outline in step when either changes.

## Known facts

| Fact | Value |
|---|---|
| Name | Werewolf Orgasmahowl |
| Game | World of Warcraft Forever (no realms) |
| Region | North America |
| Faction | Horde |
| Focus | Low-level PvP in Battlegrounds, and nothing else (no raiding, no raid schedule) |
| Recruiting | Open, for Level 39 battlegrounds, all classes and specs |
| Discord invite | https://discord.gg/ptykt8ppcV (never expires). Short link to share: `/discord` on the site |
| Tagline | A PvP guild for enjoyers of lower-level PvP in World of Warcraft Forever |
| Battle cry | HAROOOO! |
| The 2010 rename | In 2010, Blizzard's naming rules forced the guild to rename to Bearwolftriceratiger, and the guild identity changed to match. Colors then: black and bright yellow |

## Pages

Nav: HOME · RECRUITMENT · LORE (dropdown: Saint Hornatius Orgasmahowl, Bearwolftriceratiger) · FUN (dropdown: Howl Lab) · [APPLY]. A custom 404 page reads HAROOOO!

### Home

1. **Hero:** stacked wordmark <WEREWOLF / ORGASMAHOWL> (pink < and white >), then the line `WORLD OF WARCRAFT FOREVER · NORTH AMERICA · HORDE · LOW-LEVEL BATTLEGROUNDS`, the tagline "A PvP guild for enjoyers of lower-level PvP in World of Warcraft Forever", and the buttons **JOIN THE DISCORD** (primary) and **SEE RECRUITMENT** (secondary).
2. **About:** "<WO> is a collective of like-minded PvPers focused on lower-level battlegrounds in World of Warcraft Forever." and "The guild was originally founded in 2009.", next to a facts box (game, region, faction, focus, recruiting status).
3. **Our history** ("Three tabards, one pack"): three cells, each with a tabard. 2009 · Founded as Werewolf Orgasmahowl (the original burgundy tabard: "Burgundy, teal and gold. The original pack.") · 2010 · Renamed Bearwolftriceratiger ("Blizzard's naming rules forced a new name, and the guild became the Beast, in black and bright yellow.", with READ THE SAGA) · Now · Werewolf Orgasmahowl again (the current tabard, silver-gray with a black edge and a black chevron: "The original name is back, now in World of Warcraft Forever, just with a <WO> guild name."). Hovering, focusing or tapping a cell inverts it and shows READING THE BANNER: what each of the tabard's colors and its chevron stand for in the guild mythos (for example, the 2009 gold is the Saint's halo, the 2010 yellow is the lightning that fused the four beasts, today's silver is the full moon). A HOVER TO READ THE BANNER hint (TAP on touch screens) sits on each cell. Copy, including the meanings, in `src/data/tabards.ts`.
4. **FAQ** (`#faq`, "Before you queue"): thirteen questions as expandable rows, answers in `guild.faq`. What is Werewolf Orgasmahowl? · Does <WO> Raid? (no, never) · Which bracket does <WO> play? (Level 39) · What class or spec? (any) · Which realm? (none: the game has no realms) · What is a Bearwolftriceratiger? (the 2010 rename; links to its saga) · Do I need a fully geared twink? (investment is up to each player, who funds and gears their own character; the guild will help where it can) · When do you queue? (whenever people are available; no premades yet, just a few friends carrying the pickup group) · Do I need to be on voice chat? (optional, but fun) · What kind of player fits in here? (the recruitment expectations) · How do I join? (links to How to apply) · Who is Saint Hornatius Orgasmahowl? (links to the Lore) · What does HAROOOO mean? (links to the Howl Lab).
5. **Saint teaser:** the Warsong Gulch relic image, "THE LIFE OF SAINT HORNATIUS ORGASMAHOWL", one line, and a link: READ THE LORE.
6. **Closing call to action:** a full-width accent band reading **HAROOOO!** (click it to hear the Saint's cry; it shakes while it plays) with the JOIN THE DISCORD button.

### Recruitment

1. **Status header:** an OPEN chip and RECRUITING FOR LEVEL 39 BATTLEGROUNDS, with the current Werewolf Orgasmahowl tabard (silver-gray, black edge, black chevron) beside it, captioned WEAR THE TABARD. "We are recruiting for Level 39 battlegrounds. Every class. Every spec. If you want to run 39s with us, we want to hear from you."
2. **RecruitCard:** rows BRACKET · LEVEL 39, CLASSES · ALL, SPECS · ALL, with the footer "Focus · Low-level Battlegrounds".
3. **What we expect:** Play to win, not to farm kills. Supportive teamwork. Play to have fun.
4. **What you get:** Objective-driven teammates. Friends in queue. Fun++.
5. **How to apply:** three numbered steps. 1. Join the Discord. 2. [APPLY STEP]. 3. [TRIAL STEP]. Then the **APPLY ON DISCORD** button.

### Howl Lab (Fun menu)

1. **Intro:** "Make your own HAROOOO!" Every faithful orc deserves a battle cry of their own: start from a preset, twist the dials, name it, share it with the guild. The official cry is the Saint.
2. **Stage:** a big HAROOOO! button with a pitch-contour and waveform scope, plus "Howl when I let go of a slider".
3. **Presets:** Saint (official: the ha-ROOOO, stressed like "kangaroo", plus a six-wolf synth pack), Classic (the original HA-roooo with the same pack), Elder, Whelp, Werewolf (a pack answers), Full Moon (real NPS wolves plus synth pack), Lone Wolf (a wolf howls first), Choir, Battlecry, Surprise me.
4. **Controls:** 28 sliders in nine groups: Voice, Word timing, Howl, Texture, Pack, Space, Synth wolves, Real wolves (NPS), Wolf placement. A credit line under the controls names the National Park Service recording.
5. **Share your HAROOOO:** a name field, plus **Share my HAROOOO** (shares or copies a link) and **Reset to the Saint**. A collapsible "Settings as text" section holds the copy and paste tools.
6. **Opening a shared link:** shows "You've received {Name}'s HAROOOO!" with **Play it** and **Make my own**.

### Lore: The Life of Saint Hornatius Orgasmahowl

Styled as "The Cathedral", a baroque, syrupy, over-the-top holy shrine (see BRAND.md, Lore sub-theme). Presented as a museum catalogue that takes itself completely seriously, catalogued by Roadieoh, High Tauren Librarian (originally March 23, 2010). The copy is the guild's 2010 text, lightly edited for flow and spelling, with the wording and quotes kept. The full text is in `src/data/lore.ts`. Images are in `src/assets/lore/`, named by relic number. They are the guild's WoW fan-art edits, allowed here by the Lore exception in BRAND.md.

| Chapter | Relic | Title | Key line |
|---|---|---|---|
| I. The Deeds | 01 | The Defense of Shadowfang Keep | Fanggore: "the spirit and tenacity of ten orcs" |
| | 02 | The Lumber Mill | "Instead of holding TWO, I will grab THREE!" HAROOOO! |
| | 03 | The Flag of Warsong Gulch | Thrall: "deliver our flag from evil" |
| II. The Three Temptations | 04 | The First Temptation | "Be gone, vile pest!" |
| | 05 | The Second Temptation | The devil offers Stormwind |
| | 06 | The Third Temptation | 100 pets, three Pendulums of Doom; he knelt to pray |
| III. The Mysteries | 07 | The Saint Among the Beasts | The Rumsey Rum heist, and death by hugs |

Around the relics, the page also has new Cathedral copy, all in `src/data/lore.ts`:
- **Hero:** "Here beginneth… The most holy & glorious life of Saint Hornatius Orgasmahowl", HAROOOO IN EXCELSIS, Feast Day March 23, Patron Saint of Battlegrounds.
- **Litany:** a scrolling list of nine epithets.
- **Relic plaques:** Latin names, Reliquia Prima to Septima.
- **Capitulum IV, The Beatitudes of the Battleground:** built from the recruitment expectations.
- **A Prayer Before Queueing:** ends in HAROOOO! Amen.
- **Closing band:** the current Werewolf Orgasmahowl tabard (silver-gray, black edge, black chevron) in a glowing halo, captioned THE BANNER OF THE FAITHFUL, then "Join the faithful. Grab three."
- **Light a Votive Candle:** "One for every flag delivered from evil. Light all twelve, and the Saint may grant a miracle." When all twelve are lit: "A miracle! The Saint is pleased. HAROOOO!"
- **The cry:** the giant HAROOOO! in the prayer plays the synthesized cry ("Click the cry to hear it."). So does the “HAROOOO!” in The Lumber Mill relic text, which swells, glows and shakes while it plays. The closing band has **Howl it**, **Sing it again** and **Share the cry** buttons. Shared links (`/lore#haroooo`) open a "You have been summoned" card with **Receive the HAROOOO** and **Enter quietly**.
- **Hints:** "Psst: click anywhere in the heavens to release a dove." on the hero, and a colophon line, "Legend holds that whoever types the Saint's battle cry shall witness a miracle."
- **The monks' chant:** soft holy chanting starts when the page opens (or on the first click, if the browser blocks sound until then). A button fixed in the bottom-left corner reads **Wake the monks** / **Silence the monks**; it glows while waiting for that first click, and the choice is remembered.

### Lore: The Saga of the Bearwolftriceratiger

Styled as "The Storm", a primal black-and-bright-yellow thunderstorm (see BRAND.md, Beast sub-theme). The one real fact is the 2010 rename. Everything else is new mythology written in 2026, set down by Roadieoh, High Tauren Librarian, who also catalogued the Saint. The full text is in `src/data/beast.ts`, and the painting is `src/assets/beast/bearwolftriceratiger.jpg`.

The myth: Blizzard is a storm. In the Year of the Blizzard (2010), a storm that judges names froze "Werewolf Orgasmahowl" and threw it into the Storm Sea. The pack's HAROOOO froze in the cold and shattered into four beasts (Bear, Wolf, Triceratops, Tiger), and lightning fused them into the Bearwolftriceratiger, whose first word was HAROOOARRR!

| Telling | Title | Key line |
|---|---|---|
| I | The Blizzard | "That name is too wild to be spoken." A Historian's note gives the real 2010 rename. |
| II | The Four Echoes | The growl became the Bear, the howl the Wolf, the bellow the Triceratops, the roar the Tiger |
| III | The Rising | The painting (Specimen I, The Beast Rising from the Storm Sea). "HAROOOARRR!" (click it to hear the roar; it shakes while the Beast roars) |
| IV | The Colors | Black for the storm; bright yellow for the lightning and the Tiger's eye |
| V | The Deeds | The Night at the Stables · The Flag That Was Never Dropped · The Charge of the Three Horns |
| VI | The Beast and the Saint | A lone orc on the ice, and the Beast knelt. Links to the Saint's page |

Around the Tellings, the page also has:
- **The war dance:** while the war drums play, a scene rises from the bottom of the screen: six pack warriors dance in a ring around the Beast as it rears up, ending in a leap and a roar on the final hit.
- **Hero:** BEWARE, "The saga of the BEAR WOLF TRICERA TIGER", "Four beasts. Three horns. One roar.", vitals (Born in the Year of the Blizzard (2010) · Guardian of the Pack · Black & Lightning), **Sound the war drums**, and the hint "Psst: click anywhere in the storm to call down lightning."
- **Hazard tape:** nine names of the Beast, scrolling.
- **Inline art:** Fig. I "The name, frozen solid and snapped from the banner.", drawn as the burgundy Werewolf Orgasmahowl tabard (Telling I); four painting details, "Where each of the four echoes lives on in the Beast." (the claw, the jaws, the horns, the hide; Telling II); Fig. II "The tabard the storm left behind.", the real Bearwolftriceratiger tabard, with swatches "Black for the storm that took the old name" and "Bright yellow for the lightning, and the Tiger's eye" (Telling IV); Fig. III "On the night of the Blizzard, the Beast kneels." (Telling VI). Each deed has a detail beside it: "The armored chest", "Whose legs?", "One, two, three". The field card has an ID photo, "Specimen I, detail". The Beast's silhouette sigil sits behind the hero title and above the closing cry.
- **Warning placard:** "Read before approaching the Beast", the proem, signed "Set down by Roadieoh, High Tauren Librarian".
- **Know Your Beast:** a field card (horns, beasts inside, stripes, habitat, diet, temperament, danger: EXTREME).
- **Awaken the Four:** "The four echoes still sleep inside the Beast. Wake all four, and the storm may grant a fusion." When all four are awake: "Fusion! The Beast is whole. HAROOOARRR!" Then **Let them sleep**.
- **The Laws of the Pack:** the recruitment expectations, plus "Never hold two."
- **The Oath of the Charge:** four lines, one per beast, ending in a giant clickable HAROOOARRR! and "So roars the pack."
- **Colophon:** "Legend holds that the Beast answers anyone who rawrs at it."
- **Closing band:** HAROOOARRR!, "Join the pack. Grab three.", **Join the Discord**, **Roar it**, **Sound the drums**, **Share the roar**.
- **The storm:** ambient storm sound with a bottom-left **Stir the storm** / **Calm the storm** toggle.

## Open questions for the guild

- Application and trial steps
- Which battlegrounds we focus on in the Level 39 bracket, if the site should say so
- Higher-resolution originals of the relic images, if they still exist
