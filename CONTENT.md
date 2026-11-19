# Site content: v1

The plan for what the site says. Layout and style rules are in [BRAND.md](BRAND.md). The copy itself lives in code: guild facts in `src/data/guild.ts`, the Lore catalogue in `src/data/lore.ts` and the Archive in `src/data/archive.ts`. Keep this outline in step when either changes.

## Known facts

| Fact | Value |
|---|---|
| Name | Werewolf Orgasmahowl |
| Game | World of Warcraft Forever (no realms) |
| Region | North America |
| Faction | Horde |
| Focus | Low-level PvP in Battlegrounds, and nothing else (no raiding, no raid schedule) |
| Recruiting | Open, for Level 39 battlegrounds, all classes and specs |
| Joining | Join the Discord and answer the welcome questions, then post in #applications. No trial. The Discord side is set up per [DISCORD.md](DISCORD.md) |
| Launch | The first guild run: Tuesday, March 23, 2027, 8 PM ET (8 PM EDT, midnight UTC on the 24th) |
| Discord invite | https://discord.gg/5BcZaaEhcG (never expires). Short link to share: `/discord` on the site |
| Tagline | A PvP guild for enjoyers of lower-level PvP in World of Warcraft Forever |
| Battle cry | HAROOOO! |
| The 2010 rename | In 2010, Blizzard's naming rules forced the guild to rename to Bearwolftriceratiger, and the guild identity changed to match. Colors then: black and bright yellow |

## Pages

Nav: HOME · RECRUITMENT · LAUNCH (signal yellow, with a blinking pink square) · LORE (dropdown: Saint Hornatius Orgasmahowl, Bearwolftriceratiger, The Archive) · FUN (dropdown: Howl Lab) · [APPLY]. A custom 404 page reads HAROOOO!

### Home

1. **Hero:** stacked wordmark <WEREWOLF / ORGASMAHOWL> (pink < and white >), then the line `WORLD OF WARCRAFT FOREVER · NORTH AMERICA · HORDE · LOW-LEVEL BATTLEGROUNDS`, the tagline "A PvP guild for enjoyers of lower-level PvP in World of Warcraft Forever", and the buttons **JOIN THE DISCORD** (primary) and **SEE RECRUITMENT** (secondary). Beside the name, the animated cereal box badge (see BRAND.md): "NEW!" and "Now in World of Warcraft Forever", with a ribbon reading **WITH MORE HAROOOO!** that plays the Saint's cry when clicked.
2. **Launch strip:** a pink-bordered link to `/launch`: BLAST OFF, "Tuesday, March 23, 2027 · 8 PM ET", "The first <WO> guild run", and a live day count to liftoff ("127 days to go").
3. **About:** "<WO> is a collective of like-minded PvPers focused on lower-level battlegrounds in World of Warcraft Forever (WoW Forever)." and "The guild was originally founded in 2009.", next to a facts box (game, region, faction, focus, recruiting status).
4. **Our history** ("Three tabards, one pack"): three cells, each with a tabard. 2009 · Founded as Werewolf Orgasmahowl (the original hot pink tabard, with a teal edge and a yellow chevron pointing up: "Hot pink, teal and yellow. The original pack.") · 2010 · Renamed Bearwolftriceratiger ("Blizzard's naming rules forced a new name, and the guild became the Beast, in black and bright yellow.", with READ THE SAGA) · Now · Werewolf Orgasmahowl again (the current tabard, silver-gray with a black edge and a black chevron: "The original name is back, now in World of Warcraft Forever, just with a <WO> guild name."). Hovering, focusing or tapping a cell inverts it and shows THE TABARD: what each of the tabard's colors and its chevron stand for in the guild mythos (for example, the 2009 hot pink lets the Alliance see the pack coming, its yellow is the Saint's halo, the 2010 yellow is the lightning that fused the four beasts, today's silver is the full moon). A HOVER TO READ THE BANNER hint (TAP on touch screens) sits on each cell. Copy, including the meanings, in `src/data/tabards.ts`.
5. **FAQ** (`#faq`, "Before you queue"): thirteen questions as expandable rows, answers in `guild.faq`. What is Werewolf Orgasmahowl? · Does <WO> Raid? (no, never) · Which bracket does <WO> play? (Level 39) · What class or spec? (any) · Which realm? (none: the game has no realms) · What is a Bearwolftriceratiger? (the 2010 rename; links to its saga) · Do I need a fully geared twink? (investment is up to each player, who funds and gears their own character; the guild will help where it can) · When do you queue? (whenever people are available; no premades yet, just a few friends carrying the pickup group) · Do I need to be on voice chat? (optional, but fun) · What kind of player fits in here? (the recruitment expectations) · How do I join? (join the Discord, answer the welcome questions, post in #applications, no trial; links to How to apply) · Who is Saint Hornatius Orgasmahowl? (links to the Lore) · What does HAROOOO mean? (links to the Howl Lab).
6. **Saint teaser:** the Warsong Gulch relic image, "THE LIFE OF SAINT HORNATIUS ORGASMAHOWL", one line, and a link: READ THE LORE.
7. **Closing call to action:** a full-width accent band reading **HAROOOO!** (click it to hear the Saint's cry; it shakes while it plays) with the JOIN THE DISCORD button.

### Recruitment

1. **Status header:** an OPEN chip and RECRUITING FOR LEVEL 39 BATTLEGROUNDS, with the current Werewolf Orgasmahowl tabard (silver-gray, black edge, black chevron) beside it, captioned WEAR THE TABARD. "We are recruiting for Level 39 battlegrounds. Every class. Every spec. If you want to run 39s with us, we want to hear from you."
2. **RecruitCard:** rows BRACKET · LEVEL 39, CLASSES · ALL, SPECS · ALL, with the footer "Focus · Low-level Battlegrounds".
3. **What we expect:** Play to win, not to farm kills. Supportive teamwork.
4. **What you get:** Objective-driven teammates. Friends in queue. Fun++.
5. **Who we are** ("Founded 2009", shown while recruiting is open): "<WO> is a Horde PvP guild in World of Warcraft Forever (WoW Forever), North America. We do low-level battlegrounds and nothing else: no raids, and no realm to pick." "Fully geared twink or still climbing to 39, you can apply. Bring any class and any spec." "Our first guild run is Tuesday, March 23, 2027 at 8 PM ET." Buttons: **GET LAUNCH READY** and **SEE OUR HISTORY**.
6. **How to apply** ("Two steps"): 1. **Join the Discord** ("Use the invite and answer the quick welcome questions: your class, your spec and how close you are to 39."). 2. **Apply in the Discord** ("Post in #applications with your character name and a little about yourself. That’s it. No trial, no hoops."). Then the **APPLY ON DISCORD** button.
7. **Before you apply** ("Common questions"): the home page FAQ items marked `recruit` in `guild.faq`: raiding, bracket, class or spec, realm, twink gear, when we queue and voice chat.

### Howl Lab (Fun menu)

1. **Intro:** "Make your own HAROOOO!" Every faithful orc deserves a battle cry of their own: start from a preset, twist the dials, name it, share it with the guild. The official cry is the Saint.
2. **Stage:** a big HAROOOO! button with a pitch-contour and waveform scope, plus "Howl when I let go of a slider".
3. **Presets:** Saint (official: the ha-ROOOO, stressed like "kangaroo", plus a six-wolf synth pack), Classic (the original HA-roooo with the same pack), Elder, Whelp, Werewolf (a pack answers), Full Moon (real NPS wolves plus synth pack), Lone Wolf (a wolf howls first), Choir, Battlecry, Surprise me.
4. **Controls:** 28 sliders in nine groups: Voice, Word timing, Howl, Texture, Pack, Space, Synth wolves, Real wolves (NPS), Wolf placement. A credit line under the controls names the National Park Service recording.
5. **Share your HAROOOO:** a name field, plus **Share my HAROOOO** (shares or copies a link) and **Reset to the Saint**. A collapsible "Settings as text" section holds the copy and paste tools.
6. **Opening a shared link:** shows "You've received {Name}'s HAROOOO!" with **Play it** and **Make my own**.

### Launch: Blast off (`/launch`)

The guild's first run: Level 39 battlegrounds on Tuesday, March 23, 2027, the Saint's Feast Day. Built to be shared and to get people leveling. All copy is in `src/data/launch.ts`. It starts at 8 PM ET (`start` holds the exact moment: 8 PM EDT, midnight UTC on the 24th).

1. **Hero:** "<WO> · Launch day · Tuesday, March 23, 2027 · 8 PM ET", **BLAST OFF**, "The first <WO> guild run", the lead ("The first <WO> guild run hits the Level 39 battlegrounds on the Feast Day of Saint Hornatius Orgasmahowl. Every class. Every spec. Roll Horde, level up and be there."), a live countdown (days, hours, minutes, seconds to liftoff at 8 PM ET, captioned "Until liftoff: March 23, 8 PM ET", plus the viewer's own clock time when they're outside Eastern, e.g. "Tue, 5:00 PM PDT your time"), and **Ignite** (sound on), **Join the Discord**, **Add to calendar**. Beside it, the WO rocket on the pad, labeled "39 Battlegrounds · March 23".
2. **Ignite:** a synthesized heavy metal guitar solo (about 14 seconds) with callouts over the rocket: IGNITION, MAIN ENGINES, THROTTLE UP, 3 · 2 · 1, LIFTOFF! The rocket rumbles, then flies off the top of the screen on the dive bomb; on the band's last chord the screen flashes pink once, the page jolts, a giant HAROOOO! slams in and the Saint's cry plays. The rocket lands back on the pad when it ends.
3. **Tape:** a scrolling yellow tape: Blast off /// March 23, 2027 /// 8 PM ET /// Level 39 battlegrounds /// Horde /// North America /// Every class /// Every spec /// Grab three /// HAROOOO!
4. **Mission briefing:** Date, Time (8 PM ET), Bracket, Faction, Region, Classes & specs.
5. **Why March 23** ("The Feast Day"): the Feast Day and the pack's answer, beside the Saint's "Instead of holding TWO, I will grab THREE!" and READ THE SAINT'S LIFE.
6. **Pre-flight checklist** (`#checklist`): Join the Discord · Roll Horde · Hit level 39 · Gear up · Learn the cry · Bring three, with a readiness meter (Still on the pad … Cleared for launch. HAROOOO!). Ticks are saved in the viewer's browser.
7. **Pace check** (`#pace`): the viewer enters their level and sees how many levels a week they need to hit 39 by launch, with a verdict (Easy cruising / Steady climb / Full throttle).
8. **Spread the word** (`#spread`, "The Saint never held two. Bring three."): Share the launch, Apple / Outlook calendar (`/launch.ics`), Google Calendar (both a timed event at 8 PM ET with a two-hour slot; the .ics adds a reminder an hour before), and three ready-to-copy shouts (in-game chat, Discord, anywhere).
9. **Closing band:** BLAST OFF MARCH 23, the day count, Join the Discord and Get launch ready.

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

Styled as "The Storm", a primal black-and-bright-yellow thunderstorm (see BRAND.md, Beast sub-theme). The one real fact is the 2010 rename. Everything else is new mythology written in 2026, set down by Roadieoh, High Tauren Librarian, who also catalogued the Saint. The full text is in `src/data/beast.ts`, and the painting is `src/assets/beast/bearwolftriceratiger.jpg`. Every other picture of the Beast is a sighting, in `src/assets/beast/sightings/`, and appears on the page once.

The page runs as the Storm Reel, full-screen scenes that build beat by beat (see BRAND.md). Its controls read Next, Back and The saga (the chapter list), plus the WO button that brings back the site menu.

The myth: Blizzard is a storm. In the Year of the Blizzard (2010), a storm that judges names froze "Werewolf Orgasmahowl" and threw it into the Storm Sea. The pack's HAROOOO froze in the cold and shattered into four beasts (Bear, Wolf, Triceratops, Tiger), and lightning fused them into the Bearwolftriceratiger, whose first word was HAROOOARRR!

| Telling | Title | Key line |
|---|---|---|
| I | The Blizzard | "That name is too wild to be spoken." A Historian's note gives the real 2010 rename. |
| II | The Four Echoes | The growl became the Bear, the howl the Wolf, the bellow the Triceratops, the roar the Tiger |
| III | The Rising | The painting (Specimen I, The Beast Rising from the Storm Sea). "HAROOOARRR!" (click it to hear the roar; it shakes while the Beast roars) |
| IV | The Colors | Black for the storm; bright yellow for the lightning and the Wolf's eye |
| V | The Deeds | The Night at the Stables · The Flag That Was Never Dropped · The Charge of the Three Horns |
| VI | The Sightings | The Storm Sea doesn't keep time, so the Beast has been seen for five hundred years, and no two witnesses agree (it grows a head for every flag it carries home). The evidence board, then a "Did you know?" factoid on why every sighting shows more than three horns (three of its own, then a new horn for every base captured in Arathi Basin and every flag returned or captured in Warsong Gulch, kept until dawn; "Some days it has over a hundred."), with a sighting marked up horn by horn: 6, 7 and 9 "Its own three", 1 "The Lumber Mill, captured in Arathi Basin", 2 "The Blacksmith, captured in Arathi Basin", 3 "The Farm, captured in Arathi Basin", 4 "A flag returned in Warsong Gulch", 5 "A flag captured in Warsong Gulch", 8 "Still growing. The night is young."; caption "Marked up by the Librarian. Nine horns by mid-afternoon: a quiet day.", then "bring the drawing to the Librarian" |
| VII | The Beast and the Saint | A lone orc on the ice, and the Beast knelt. Links to the Saint's page |

Around the Tellings, the page also has:
- **The war dance:** while the war drums play, seven pack warriors rise from the bottom of the screen and dance while the Beast in the page's background rears up on every bar, ending in a leap and a roar on the final hit.
- **Hero:** BEWARE, "The saga of the BEAR WOLF TRICERA TIGER", "Four beasts. Three horns. One roar.", vitals (Born in the Year of the Blizzard (2010) · Guardian of the Pack · Black & Lightning), **Sound the war drums**, and the hint "Psst: click anywhere in the storm to call down lightning."
- **Hazard tape:** ten names of the Beast, scrolling.
- **Inline art:** Fig. I "The name, frozen solid and snapped from the banner.", drawn as the hot pink Werewolf Orgasmahowl tabard (Telling I); four details (the Bear's claw, the Wolf's eye from Sighting IV, the Triceratops's horns and the Tiger's jaws from a painting of seven leopard heads), "Where each of the four echoes lives on in the Beast, as the witnesses saw it." (Telling II); Fig. II "The tabard the storm left behind.", the real Bearwolftriceratiger tabard, with swatches "Black for the storm that took the old name" and "Bright yellow for the lightning, and the Wolf's eye" (Telling IV); Fig. III "On the night of the Blizzard, the Beast kneels." (Telling VII). Each deed has a detail from another sighting beside it: "Facing all five" (the red, many-headed beast), "Who carried whom?" (a pile of horned heads carrying a rider), "One, two, three" (a pen drawing of a maned head under a crown of horns). The field card's ID photo is the red beast stepping out of the sea, "Field photograph". The Beast's silhouette sigil sits behind the hero title and above the closing cry.
- **Warning placard:** "Read before approaching the Beast", the proem, signed "Set down by Roadieoh, High Tauren Librarian".
- **The Sightings (Telling VI):** an evidence board, "Evidence: sightings of the Beast". Click a card for the witness statement. Oldest first:
  | No. | Title | Witness · When | Heads counted | Verdict |
  |---|---|---|---|---|
  | I | The Nuremberg Woodcut | An engraver in Nuremberg · 1498 | Seven, all crowned | Credible |
  | II | The Gilded Page | A painter of illuminated books · Some years later | Seven, crowns counted separately | Credible |
  | III | The Charge | A painter caught in the spray · Mid-charge | At least four, all roaring | Blurry |
  | IV | The Scarlet Seven | A painter with only red paint · One red evening | Seven, every one of them open | Credible |
  | V | The Pamphlet | Whoever nailed it to the inn door · Last week | Seven, all with manes | Most accurate |
- **Know Your Beast:** a field card (horns: "Three, plus one for every base and flag (100+ on a good day)", heads: "Anywhere from one to seven (witnesses disagree)", beasts inside, stripes, habitat, diet, temperament, danger: EXTREME).
- **Awaken the Four:** "The four echoes still sleep inside the Beast. Wake all four, and the storm may grant a fusion." When all four are awake: "Fusion! The Beast is whole. HAROOOARRR!" Then **Let them sleep**.
- **The Laws of the Pack:** the recruitment expectations, plus "Never hold two."
- **The Oath of the Charge:** four lines, one per beast, ending in a giant clickable HAROOOARRR! and "So roars the pack."
- **Colophon:** "Legend holds that the Beast answers anyone who rawrs at it."
- **Closing band:** HAROOOARRR!, "Join the pack. Grab three.", **Join the Discord**, **Roar it**, **Sound the drums**, **Share the roar**.
- **The storm:** ambient storm sound with a bottom-left **Stir the storm** / **Calm the storm** toggle.

### Lore: The Archive (`/archive`)

Styled as "The Vault", a film archive and reading room (see BRAND.md, Archive sub-theme). Real footage from the guild's past, filed as the guild provides it: the one Lore page that isn't mythology. All copy and exhibits are in `src/data/archive.ts`; images are in `src/assets/archive/`, named by exhibit number.

1. **Hero:** a slate (Werewolf Orgasmahowl | Est. 2009), THE ARCHIVE, "Real footage from the pack’s past", a tally (Founded 2009 · Renamed 2010 · the number of exhibits filed), **Roll the footage**, and a film leader counting down to WO (hidden on phones).
2. **On the shelf:** a grid (two across on wider screens) of each exhibit's number, title and kicker, then the exhibit in a film frame. Clicking an exhibit opens it full size in a new window.
3. **Submissions:** "Got footage from the old days?" Screenshots, banners, videos, old forum posts: bring them to the Discord. **Bring it to the Discord**, and links to the two legends.

| Exhibit | Title | Era | What it shows |
|---|---|---|---|
| 001 | One Minute to Go ("In the Warsong Gulch flag room, before the gates open") | 2009 | Tauren in the original tabard waiting in the Horde flag room; nameplates Dawg, Banditkeith, Therewolf <Werewolf Orgasmahowl>; Therewolf is a Level 39 Tauren Shaman |
| 002 | The Pack in Pink ("In the original tabard") | 2009 | The pack gathered in two rows before a stone ruin, in the original tabard. Norfire's nameplate reads <Werewolf Orgasmahowl> |
| 003 | Horde Wins ("Premade vs. premade in Warsong Gulch. We won.") | 2009 | The end-of-match scoreboard: Horde Wins, 10 vs. 10, 27 minutes |
| 004 | The Premade Rolls Out ("Single file, in the original pink") | 2009 | A tauren in the original tabard leading a single-file line of the pack up a road in the rain |
| 005 | Horde Wins Again ("Another premade in Warsong Gulch. Another win.") | 2009 | A second scoreboard: Horde Wins, 10 vs. 10, 25 minutes; "Badonkadonk captured the Alliance flag!" |
| 006 | The Bearwolftriceratiger Banner ("Nine of the pack") | 2010 | The guild banner reading <Bearwolftriceratiger> · 39 Horde PVP - Undermine, with nine characters: Overrated, Noobsombrero, Norfire, Litedarker, Sockdolager, Silane, Icecreemman, Chøøs, Mmwellspent |

## Search

Each page's `title` and `description` in its `BaseLayout` call are what search results show, so they use the words players search for ("Level 39", "PvP guild", "WoW Forever"). Keep titles to about 60 characters with the guild name and descriptions to about 155. The home title is `homeTitle` in `src/data/guild.ts`.

| Page | Title |
|---|---|
| Home | Werewolf Orgasmahowl: Level 39 Horde PvP Guild in WoW Forever |
| Recruitment | Level 39 WoW Forever PvP Recruitment · Werewolf Orgasmahowl |
| Launch | Level 39 PvP Guild Launch: March 23 · Werewolf Orgasmahowl |
| Lore | Lore: The Life of Saint Hornatius · Werewolf Orgasmahowl |
| Bearwolftriceratiger | The Bearwolftriceratiger · Werewolf Orgasmahowl |
| Archive | The Archive: Guild History · Werewolf Orgasmahowl |
| Howl Lab | Howl Lab: Make Your Own HAROOOO · Werewolf Orgasmahowl |

## Link previews

Every page has its own 1200×630 preview image in `public/`, drawn from HTML sources in `brand-assets/og/` (see its README entry). Pages without one, like the 404, fall back to the home image.

| Page | Image | What it shows |
|---|---|---|
| Home | `og-home.png` | The <WEREWOLF / ORGASMAHOWL> wordmark, the tagline, the current tabard (Est. 2009), and a tape: Now recruiting /// Level 39 BGs /// All classes /// All specs |
| Recruitment | `og-recruitment.png` | RECRUITING FOR LEVEL 39 BATTLEGROUNDS, the RecruitCard, and a tape: Join the Discord /// Apply /// No trial /// HAROOOO! |
| Launch | `og-launch.png` | BLAST OFF, the rocket, and a tape: March 23, 2027 /// 8 PM ET /// Level 39 BGs /// Horde /// NA |
| Lore | `og-lore.png` | The Cathedral: "Here beginneth… Saint Hornatius Orgasmahowl", the halo, HAROOOO IN EXCELSIS, the Warsong Gulch relic in a gilt frame |
| Bearwolftriceratiger | `og-bearwolftriceratiger.png` | The Storm: BEWARE, the stacked BEAR / WOLF / TRICERA / TIGER, the painting in its specimen frame |
| Howl Lab | `og-howl-lab.png` | MAKE YOUR OWN HAROOOO! over the pitch-contour scope |
| Archive | `og-archive.png` | The Vault: THE ARCHIVE in stencil, the WO film leader, and Exhibit 006 (the Bearwolftriceratiger banner) on a strip of film |

## Open questions for the guild

- Where the pack meets for the launch run on March 23, 2027 (8 PM ET)
- Which battlegrounds we focus on in the Level 39 bracket, if the site should say so
- Higher-resolution originals of the relic images, if they still exist
- More footage for the Archive
