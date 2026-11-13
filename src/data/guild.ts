// Everything the site says about the guild. Edit facts here, not in the pages.
// Values in [BRACKETS] are placeholders still waiting on the guild.

export const guild = {
  name: 'Werewolf Orgasmahowl',
  game: 'World of Warcraft Forever',
  region: 'North America',
  faction: 'Horde',
  focus: 'Low-level Battlegrounds',
  tagline: 'A PvP guild for enjoyers of lower-level PvP in World of Warcraft Forever',
  battleCry: 'HAROOOO!',

  // Paste the invite link here; until then Discord buttons point to the apply steps.
  discordUrl: 'https://discord.gg/ptykt8ppcV', // never expires; also in vercel.json for the /discord short link

  about: [
    '<WO> is a collective of like-minded PvPers focused on lower-level battlegrounds in World of Warcraft Forever.',
    'The guild was originally founded in 2009.',
  ],

  recruiting: {
    open: true,
    bracket: 'Level 39',
    summary: 'We are recruiting for Level 39 battlegrounds. Every class. Every spec. If you want to run 39s with us, we want to hear from you.',
    rows: [
      { label: 'Bracket', value: 'Level 39' },
      { label: 'Classes', value: 'All' },
      { label: 'Specs', value: 'All' },
    ],
  },

  expectations: ['Play to win, not to farm kills', 'Supportive teamwork', 'Play to have fun'],
  perks: ['Objective-driven teammates', 'Friends in queue', 'Fun++'],

  applySteps: [
    { title: 'Join the Discord', text: 'Say hello and tell us what you play.' },
    { title: '[APPLY STEP]', text: '[Post in #applications, or fill out the form.]' },
    { title: '[TRIAL STEP]', text: '[Queue into Level 39 battlegrounds with us for a trial period.]' },
  ],

  // Home page FAQ. A link is optional and shows after the answer.
  faq: [
    {
      q: 'What is Werewolf Orgasmahowl?',
      a: '<WO> is a Horde guild in World of Warcraft Forever (North America): a collective of like-minded PvPers focused on lower-level battlegrounds. The guild was originally founded in 2009.',
    },
    {
      q: 'Does <WO> Raid?',
      a: 'No. We do low-level PvP in battlegrounds, and nothing else. There is no raid schedule and there never will be.',
    },
    {
      q: 'Which bracket does <WO> play?',
      a: 'We are recruiting for Level 39 battlegrounds at this time.',
    },
    {
      q: 'What class or spec should I bring?',
      a: 'Anything. We take every class and every spec.',
    },
    {
      q: 'Which realm are you on?',
      a: 'None. World of Warcraft Forever has no realms. You just need a Horde character in North America.',
    },
    {
      q: 'What is a Bearwolftriceratiger?',
      a: 'In 2010, Blizzard’s naming rules forced the guild to rename to Bearwolftriceratiger, and the guild took on the beast’s black and bright yellow colors. The beast has its own legend.',
      link: { href: '/bearwolftriceratiger', label: 'Read its saga' },
    },
    {
      q: 'Do I need a fully geared twink?',
      a: 'How much people want to invest into their character is up to them. While the guild will make accommodations to help, the expectation is that each player funds and gears their own character.',
    },
    {
      q: 'When do you queue?',
      a: 'Whenever people are available. We are not running premades (yet), so the model is grouping with a few friends to carry the rest of the pickup group, just as Saint Hornatius Orgasmahowl always did!',
    },
    {
      q: 'Do I need to be on voice chat?',
      a: 'Voice chat and Discord are optional, but fun ways for us to play together.',
    },
    {
      q: 'What kind of player fits in here?',
      a: 'Someone who plays to win, not to farm kills, backs up their teammates, and is here to have fun.',
    },
    {
      q: 'How do I join?',
      a: 'Start by joining our Discord and telling us what you play. The full steps are on the recruitment page.',
      link: { href: '/recruitment#apply', label: 'How to apply' },
    },
    {
      q: 'Who is Saint Hornatius Orgasmahowl?',
      a: 'The guild\'s patron saint, the Patron Saint of Battlegrounds. His holy deeds were set down in the guild archives in 2010.',
      link: { href: '/lore', label: 'Read the lore' },
    },
    {
      q: 'What does HAROOOO mean?',
      a: 'It is our battle cry, first cried by Saint Hornatius Orgasmahowl himself. You can make your own in the Howl Lab.',
      link: { href: '/howl-lab', label: 'Open the Howl Lab' },
    },
  ] as { q: string; a: string; link?: { href: string; label: string } }[],
};

export const discordHref = guild.discordUrl || '/recruitment#apply';
export const factsLine = [guild.region, guild.faction, guild.focus].join(' · ');
