# Werewolf Orgasmahowl

Website for the Werewolf Orgasmahowl guild (World of Warcraft Forever · North America · Horde · PvE).

## Pages
- `/`: Home, with about, raid schedule and the Saint teaser
- `/recruitment`: open to all classes and specs, plus how to apply
- `/lore`: The Life of Saint Hornatius Orgasmahowl
- a custom 404 page (HAROOOO!)

## Editing content
- Guild facts, schedule, recruitment and apply steps: `src/data/guild.ts`
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
