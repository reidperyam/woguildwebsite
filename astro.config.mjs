// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { guild } from './src/data/guild.ts';

// https://astro.build/config
export default defineConfig({
  // The live origin, for absolute URLs in link previews, canonical tags and the sitemap.
  site: 'https://woguild.org',
  // One address per page: /lore, never /lore/. vercel.json redirects the slashed form.
  trailingSlash: 'never',
  // The /discord short link only forwards, so it stays out of the sitemap.
  integrations: [sitemap({ filter: (page) => new URL(page).pathname !== '/discord' })],
  // A short link to share instead of the raw invite: /discord forwards to the guild Discord.
  // On Vercel, vercel.json turns it into a real HTTP redirect; this page is the fallback (and works in dev).
  redirects: {
    '/discord': guild.discordUrl,
  },
});
