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
- The Discord invite is `discordUrl` in `guild.ts` (every Discord button uses it). `/discord` is a short link that forwards to it; if the invite changes, update `vercel.json` too.

## Commands
| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server at http://localhost:4321 |
| `npm run build` | Build the static site to `dist/` |
| `npm run preview` | Serve the built site locally |

Brand rules are in [BRAND.md](BRAND.md) and page copy is in [CONTENT.md](CONTENT.md).

Ready-to-use brand files (the Discord server icon, logos) are in [brand-assets/](brand-assets/README.md).

## Credits
- `public/sounds/wolf-howl-nps.mp3`: "Sounds of wolves howling", recorded at Denali National Park & Preserve by the National Park Service ([NPS Sound Library](https://www.nps.gov/subjects/sound/sounds-wolf.htm), originally `nri-WolfDENA.mp3`). Public domain (U.S. federal government work). Credited on the Howl Lab page.
- The HAROOOO voice and the synthesized wolves are generated in the browser with Web Audio (`src/scripts/howl.ts`).
