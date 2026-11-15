# Werewolf Orgasmahowl guild website

Website for Werewolf Orgasmahowl, a Horde guild in World of Warcraft Forever (North America) focused solely on low-level PvP in Battlegrounds. No raiding: never add a raid schedule. The game has no realms: never add a realm field.

## Design
- Design system: https://claude.ai/artifact/2uHaE8ULB6FRAdLYESV1oA. Use it for every Claude Design artifact made from this repo, in place of any account default.
- Brand rules for code: [BRAND.md](BRAND.md). Follow it for every page and component.
- Page copy: [CONTENT.md](CONTENT.md). Guild facts live in `src/data/guild.ts` and Lore copy in `src/data/lore.ts`; keep CONTENT.md in step with them.

## Stack
- Astro 7, static output, deployed on Vercel (project `woguildwebsite`; every push to `main` deploys). Vercel Speed Insights is in `BaseLayout.astro`. No UI framework; plain `.astro` components and `src/styles/global.css`.
- `npm run dev` for local work (or `npx astro dev --background`, then `npx astro dev stop`). `npm run build` must pass before committing.
- The synthesized HAROOOO lives in `src/scripts/howl.ts`. The official cry is `DEFAULT_HOWL` (the "Saint" preset: the voice plus a six-wolf synth pack, approved 2026-11-10, stressed like "kangaroo" as ha-ROOOO since 2026-11-13); only change it when the user asks. The old HA-roooo is the "Classic" preset. Presets without their own wolves spread `NO_WOLVES` so they stay wolf-free, and the older presets spread `CLASSIC_WORD` so they keep the HA-roooo. The public Howl Lab (`/howl-lab`, nav Fun menu) lets visitors make and share custom ones.
- The launch (`/launch`, the first guild run on March 23, 2027) takes its copy from `src/data/launch.ts`, which also feeds `/launch.ics` and the home page strip. Its guitar solo is `src/scripts/launch-audio.ts`, sharing the synthesized band in `src/scripts/metal.ts` with the Lore hymn.
- Link previews: pass `image` (a 1200x630 PNG in `public/`) and `imageAlt` to `BaseLayout`; `site` in `astro.config.mjs` makes the URLs absolute. `/launch` uses `public/og-launch.png`; it bakes in the date, bracket, faction and region, so redraw it if those change.
- The Discord invite lives in `discordUrl` in `src/data/guild.ts` and in `vercel.json` (the `/discord` short link). Change both together.
- Placeholders in `[BRACKETS]` are facts still waiting on the guild. Never replace them with invented values.
