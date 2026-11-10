// Everything the site says about the guild. Edit facts here, not in the pages.
// Values in [BRACKETS] are placeholders still waiting on the guild.

export const guild = {
  name: 'Werewolf Orgasmahowl',
  game: 'World of Warcraft Forever',
  region: 'North America',
  faction: 'Horde',
  playstyle: 'PvE',
  tagline: '[YOUR TAGLINE]',
  battleCry: 'HAROOOO!',

  // Paste the invite link here; until then Discord buttons point to the apply steps.
  discordUrl: '',

  about: [
    '[ABOUT: who we are, casual or progression, and the vibe in raids.]',
    '[ABOUT: how long the guild has been around and what keeps people here.]',
  ],

  schedule: [
    { day: '[DAY]', time: '[TIME + TZ]', content: '[RAID / DIFFICULTY]' },
    { day: '[DAY]', time: '[TIME + TZ]', content: '[RAID / DIFFICULTY]' },
  ],

  recruiting: {
    open: true,
    summary: 'Every class. Every spec. If you want to raid with us, we want to hear from you.',
    rows: [{ label: 'All classes', value: 'All specs' }],
  },

  expectations: ['[EXPECTATION: attendance]', '[EXPECTATION: preparation]', '[EXPECTATION: voice comms]'],
  perks: ['[PERK: loot system]', '[PERK: raids start and end on time]', '[PERK: the community]'],

  applySteps: [
    { title: 'Join the Discord', text: 'Say hello and tell us what you play.' },
    { title: '[APPLY STEP]', text: '[Post in #applications, or fill out the form.]' },
    { title: '[TRIAL STEP]', text: '[Raid with us for a trial period.]' },
  ],
};

export const discordHref = guild.discordUrl || '/recruitment#apply';
export const factsLine = [guild.region, guild.faction, guild.playstyle].join(' · ');
