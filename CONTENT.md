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
| Tagline | For enjoyers of lower-level PvP in World of Warcraft Forever |
| Battle cry | HAROOOO! |

## Pages

Nav: HOME · RECRUITMENT · LORE · FUN (dropdown: Howl Lab) · [APPLY]. A custom 404 page reads HAROOOO!

### Home

1. **Hero:** stacked wordmark WEREWOLF / ORGASMAHOWL, then the line `WORLD OF WARCRAFT FOREVER · NORTH AMERICA · HORDE · LOW-LEVEL BATTLEGROUNDS`, the tagline "For enjoyers of lower-level PvP in World of Warcraft Forever", and the buttons **JOIN THE DISCORD** (primary) and **SEE RECRUITMENT** (secondary).
2. **About:** two or three short paragraphs [ABOUT], next to a facts box (game, region, faction, focus, recruiting status).
3. **Saint teaser:** the Warsong Gulch relic image, "THE LIFE OF SAINT HORNATIUS ORGASMAHOWL", one line, and a link: READ THE LORE.
4. **Closing call to action:** a full-width accent band reading **HAROOOO!** (click it to hear the Saint's cry; it shakes while it plays) with the JOIN THE DISCORD button.

### Recruitment

1. **Status header:** an OPEN chip and RECRUITING FOR LEVEL 39 BATTLEGROUNDS. "We are recruiting for Level 39 battlegrounds. Every class. Every spec. If you want to run 39s with us, we want to hear from you."
2. **RecruitCard:** rows BRACKET · LEVEL 39, CLASSES · ALL, SPECS · ALL, with the footer "Focus · Low-level Battlegrounds".
3. **What we expect:** Play to win, not to farm kills. Supportive teamwork. Play to have fun.
4. **What you get:** Objective-driven teammates. Friends in queue. Fun++.
5. **How to apply:** three numbered steps. 1. Join the Discord. 2. [APPLY STEP]. 3. [TRIAL STEP]. Then the **APPLY ON DISCORD** button.

### Howl Lab (Fun menu)

1. **Intro:** "Make your own HAROOOO!" Every faithful orc deserves a battle cry of their own: start from a preset, twist the dials, name it, share it with the guild. The official cry is the Saint.
2. **Stage:** a big HAROOOO! button with a pitch-contour and waveform scope, plus "Howl when I let go of a slider".
3. **Presets:** Saint (official: the cry plus a six-wolf synth pack), Elder, Whelp, Werewolf (a pack answers), Full Moon (real NPS wolves plus synth pack), Lone Wolf (a wolf howls first), Choir, Battlecry, Surprise me.
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
- **Closing band:** "Join the faithful. Grab three."
- **Light a Votive Candle:** "One for every flag delivered from evil. Light all twelve, and the Saint may grant a miracle." When all twelve are lit: "A miracle! The Saint is pleased. HAROOOO!"
- **The cry:** the giant HAROOOO! in the prayer plays the synthesized cry ("Click the cry to hear it."). The closing band has **Howl it**, **Sing it again** and **Share the cry** buttons. Shared links (`/lore#haroooo`) open a "You have been summoned" card with **Receive the HAROOOO** and **Enter quietly**.
- **Hints:** "Psst: click anywhere in the heavens to release a dove." on the hero, and a colophon line, "Legend holds that whoever types the Saint's battle cry shall witness a miracle."
- **The monks' chant:** soft holy chanting starts when the page opens (or on the first click, if the browser blocks sound until then). A button fixed in the bottom-left corner reads **Wake the monks** / **Silence the monks**; it glows while waiting for that first click, and the choice is remembered.

## Open questions for the guild

- About text, application and trial steps
- Which battlegrounds we focus on in the Level 39 bracket, if the site should say so
- Higher-resolution originals of the relic images, if they still exist
