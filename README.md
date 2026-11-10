# Werewolf Orgasmahowl

Website for the Werewolf Orgasmahowl guild (World of Warcraft Forever · North America · Horde · low-level Battlegrounds).

## Pages
- `/`: Home, with about and the Saint teaser
- `/recruitment`: open to all classes and specs, plus how to apply
- `/lore`: The Life of Saint Hornatius Orgasmahowl
- a custom 404 page (HAROOOO!)
- `/howl-lab`: the Howl Lab, where visitors make, name and share their own HAROOOO (nav: Fun menu)

## Editing content
- Guild facts, recruitment and apply steps: `src/data/guild.ts`
- Lore relics and copy: `src/data/lore.ts`, with images in `src/assets/lore/`
- Paste the Discord invite into `discordUrl` in `guild.ts` and every Discord button goes live.

## Commands
| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server at http://localhost:4321 |
| `npm run build` | Build the static site to `dist/` |
| `npm run preview` | Serve the built site locally |

Brand rules are in [BRAND.md](BRAND.md) and page copy is in [CONTENT.md](CONTENT.md).

## Credits
- `public/sounds/wolf-howl-nps.mp3`: "Sounds of wolves howling", recorded at Denali National Park & Preserve by the National Park Service ([NPS Sound Library](https://www.nps.gov/subjects/sound/sounds-wolf.htm), originally `nri-WolfDENA.mp3`). Public domain (U.S. federal government work). Credited on the Howl Lab page.
- The HAROOOO voice, the synthesized wolves and the guild jingle are generated in the browser with Web Audio (`src/scripts/howl.ts`, `src/scripts/jingle.ts`).
