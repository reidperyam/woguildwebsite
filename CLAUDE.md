# Werewolf Orgasmahowl guild website

Website for Werewolf Orgasmahowl, a Horde guild in World of Warcraft Forever (North America) focused solely on low-level PvP in Battlegrounds. No raiding: never add a raid schedule. The game has no realms: never add a realm field.

## Design
- Design system: https://claude.ai/artifact/2uHaE8ULB6FRAdLYESV1oA. Use it for every Claude Design artifact made from this repo, in place of any account default.
- Brand rules for code: [BRAND.md](BRAND.md). Follow it for every page and component.
- Page copy: [CONTENT.md](CONTENT.md). Guild facts live in `src/data/guild.ts`, Lore copy in `src/data/lore.ts` and the Archive's exhibits in `src/data/archive.ts`; keep CONTENT.md in step with them.

## Stack
- Astro 7, static output, deployed on Vercel (project `woguildwebsite`; every push to `main` deploys). Vercel Speed Insights is in `BaseLayout.astro`. No UI framework; plain `.astro` components and `src/styles/global.css`.
- `npm run dev` for local work (or `npx astro dev --background`, then `npx astro dev stop`). `npm run build` must pass before committing.
- The synthesized HAROOOO lives in `src/scripts/howl.ts`. The official cry is `DEFAULT_HOWL` (the "Saint" preset: the voice plus a six-wolf synth pack, approved 2026-11-10, stressed like "kangaroo" as ha-ROOOO since 2026-11-13); only change it when the user asks. The old HA-roooo is the "Classic" preset. Presets without their own wolves spread `NO_WOLVES` so they stay wolf-free, and the older presets spread `CLASSIC_WORD` so they keep the HA-roooo. The public Howl Lab (`/howl-lab`, nav Fun menu) lets visitors make and share custom ones.
- The launch (`/launch`, the first guild run on March 23, 2027 at 8 PM ET; `start` in `src/data/launch.ts` is that exact moment, which the countdowns and calendar entries use) takes its copy from `src/data/launch.ts`, which also feeds `/launch.ics` and the home page strip. Its guitar solo is `src/scripts/launch-audio.ts`, sharing the synthesized band in `src/scripts/metal.ts` with the Lore hymn.
- Link previews: every page passes its own `image` (a 1200x630 PNG in `public/`, e.g. `og-launch.png`) and `imageAlt` to `BaseLayout`; pages that don't fall back to `og-home.png`. `site` in `astro.config.mjs` makes the URLs absolute. The images are drawn from HTML sources in `brand-assets/og/` and rendered with `node brand-assets/og/render.mjs`. They bake in facts (the launch image has the date, time, bracket, faction and region; home and recruitment have the bracket), so redraw them if those change.
- The Discord invite lives in `discordUrl` in `src/data/guild.ts` and in `vercel.json` (the `/discord` short link). Change both together.
- The Discord server is set up per [DISCORD.md](DISCORD.md) (roles, channels, the welcome questions, #applications). The site's apply steps (`applySteps` in `guild.ts`) and the launch checklist point at it, so keep them in step. The launch event's cover, `brand-assets/discord/discord-event-launch.png`, bakes in the date and time too.
- Placeholders in `[BRACKETS]` are facts still waiting on the guild. Never replace them with invented values.
