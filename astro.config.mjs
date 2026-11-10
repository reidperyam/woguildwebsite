// @ts-check
import { defineConfig } from 'astro/config';
import { guild } from './src/data/guild.ts';

// https://astro.build/config
export default defineConfig({
  // A short link to share instead of the raw invite: /discord forwards to the guild Discord.
  // On Vercel, vercel.json turns it into a real HTTP redirect; this page is the fallback (and works in dev).
  redirects: {
    '/discord': guild.discordUrl,
  },
});
