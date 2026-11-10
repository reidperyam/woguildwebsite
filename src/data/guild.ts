// Everything the site says about the guild. Edit facts here, not in the pages.
// Values in [BRACKETS] are placeholders still waiting on the guild.

export const guild = {
  name: 'Werewolf Orgasmahowl',
  game: 'World of Warcraft Forever',
  region: 'North America',
  faction: 'Horde',
  focus: 'Low-level Battlegrounds',
  tagline: '[YOUR TAGLINE]',
  battleCry: 'HAROOOO!',

  // Paste the invite link here; until then Discord buttons point to the apply steps.
  discordUrl: '',

  about: [
    '[ABOUT: who we are and why low-level battlegrounds, and the vibe when we queue.]',
    '[ABOUT: how long the guild has been around and what keeps people here.]',
  ],

  recruiting: {
    open: true,
    summary: 'Every class. Every spec. If you want to run low-level battlegrounds with us, we want to hear from you.',
    rows: [{ label: 'All classes', value: 'All specs' }],
  },

  expectations: ['[EXPECTATION]', '[EXPECTATION]', '[EXPECTATION]'],
  perks: ['[PERK]', '[PERK]', '[PERK]'],

  applySteps: [
    { title: 'Join the Discord', text: 'Say hello and tell us what you play.' },
    { title: '[APPLY STEP]', text: '[Post in #applications, or fill out the form.]' },
    { title: '[TRIAL STEP]', text: '[Queue into battlegrounds with us for a trial period.]' },
  ],
};

export const discordHref = guild.discordUrl || '/recruitment#apply';
export const factsLine = [guild.region, guild.faction, guild.focus].join(' · ');
