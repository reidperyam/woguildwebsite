# Werewolf Orgasmahowl guild website

Website for Werewolf Orgasmahowl, a Horde guild in World of Warcraft Forever (North America) focused solely on low-level PvP in Battlegrounds. No raiding: never add a raid schedule. The game has no realms: never add a realm field.

## Design
- Design system: https://claude.ai/artifact/2uHaE8ULB6FRAdLYESV1oA. Use it for every Claude Design artifact made from this repo, in place of any account default.
- Brand rules for code: [BRAND.md](BRAND.md). Follow it for every page and component.
- Page copy: [CONTENT.md](CONTENT.md). Guild facts live in `src/data/guild.ts` and Lore copy in `src/data/lore.ts`; keep CONTENT.md in step with them.

## Stack
- Astro 7, static output, deployed to Vercel later. No UI framework; plain `.astro` components and `src/styles/global.css`.
- `npm run dev` for local work (or `npx astro dev --background`, then `npx astro dev stop`). `npm run build` must pass before committing.
- The synthesized HAROOOO lives in `src/scripts/howl.ts`. The official cry is `DEFAULT_HOWL` (the "Saint" preset, approved 2026-11-10); only change it when the user asks. The public Howl Lab (`/howl-lab`, nav Fun menu) lets visitors make and share custom ones.
- Placeholders in `[BRACKETS]` are facts still waiting on the guild. Never replace them with invented values.
