// Everything the site says about the guild. Edit facts here, not in the pages.
// Values in [BRACKETS] are placeholders still waiting on the guild.

export const guild = {
  name: 'Werewolf Orgasmahowl',
  game: 'World of Warcraft Forever',
  gameShort: 'WoW Forever', // what players type into search; used in page titles and descriptions
  founded: '2009',
  region: 'North America',
  faction: 'Horde',
  focus: 'Low-level Battlegrounds',
  tagline: 'A PvP guild for enjoyers of lower-level PvP in World of Warcraft Forever',
  battleCry: 'HAROOOO!',

  // Paste the invite link here; until then Discord buttons point to the apply steps.
  discordUrl: 'https://discord.gg/5BcZaaEhcG', // never expires; also in vercel.json for the /discord short link

  about: [
    '<WO> is a collective of like-minded PvPers focused on lower-level battlegrounds in World of Warcraft Forever (WoW Forever).',
    'The guild was originally founded in 2009.',
  ],

  recruiting: {
    open: true,
    bracket: 'Level 39',
    summary: 'We are recruiting for Level 39 battlegrounds. Every class. Every spec. If you want to run 39s with us, we want to hear from you.',
    about: [
      '<WO> is a Horde PvP guild in World of Warcraft Forever (WoW Forever), North America. We do low-level battlegrounds and nothing else: no raids, and no realm to pick.',
      'Fully geared twink or still climbing to 39, you can apply. Bring any class and any spec.',
    ],
    rows: [
      { label: 'Bracket', value: 'Level 39' },
      { label: 'Classes', value: 'All' },
      { label: 'Specs', value: 'All' },
    ],
  },

  expectations: ['Play to win, not to farm kills', 'Supportive teamwork'],
  perks: ['Objective-driven teammates', 'Friends in queue', 'Fun++'],

  // Matches the Discord setup in DISCORD.md: the welcome questions, then a post in #applications.
  applySteps: [
    { title: 'Join the Discord', text: 'Use the invite and answer the quick welcome questions: your class, your spec and how close you are to 39.' },
    { title: 'Apply in the Discord', text: 'Post in #applications with your character name and a little about yourself. That’s it. No trial, no hoops.' },
  ],

  // Home page FAQ. A link is optional and shows after the answer. `recruit` also shows the question on Recruitment.
  faq: [
    {
      q: 'What is Werewolf Orgasmahowl?',
      a: '<WO> is a Horde guild in World of Warcraft Forever (North America): a collective of like-minded PvPers focused on lower-level battlegrounds. The guild was originally founded in 2009.',
    },
    {
      q: 'Does <WO> Raid?',
      a: 'No. We do low-level PvP in battlegrounds, and nothing else. There is no raid schedule and there never will be.',
      recruit: true,
    },
    {
      q: 'Which bracket does <WO> play?',
      a: 'We are recruiting for Level 39 battlegrounds at this time.',
      recruit: true,
    },
    {
      q: 'What class or spec should I bring?',
      a: 'Anything. We take every class and every spec.',
      recruit: true,
    },
    {
      q: 'Which realm are you on?',
      a: 'None. World of Warcraft Forever has no realms. You just need a Horde character in North America.',
      recruit: true,
    },
    {
      q: 'What is a Bearwolftriceratiger?',
      a: 'In 2010, Blizzard’s naming rules forced the guild to rename to Bearwolftriceratiger, and the guild took on the beast’s black and bright yellow colors. The beast has its own legend.',
      link: { href: '/bearwolftriceratiger', label: 'Read its saga' },
    },
    {
      q: 'Do I need a fully geared twink?',
      a: 'How much people want to invest into their character is up to them. While the guild will make accommodations to help, the expectation is that each player funds and gears their own character.',
      recruit: true,
    },
    {
      q: 'When do you queue?',
      a: 'Whenever people are available. We are not running premades (yet), so the model is grouping with a few friends to carry the rest of the pickup group, just as Saint Hornatius Orgasmahowl always did!',
      recruit: true,
    },
    {
      q: 'Do I need to be on voice chat?',
      a: 'Voice chat and Discord are optional, but fun ways for us to play together.',
      recruit: true,
    },
    {
      q: 'What kind of player fits in here?',
      a: 'Someone who plays to win, not to farm kills, backs up their teammates, and is here to have fun.',
    },
    {
      q: 'How do I join?',
      a: 'Join our Discord, answer the welcome questions and post in #applications. There is no trial. The full steps are on the recruitment page.',
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
  ] as { q: string; a: string; link?: { href: string; label: string }; recruit?: boolean }[],
};

export const discordHref = guild.discordUrl || '/recruitment#apply';
export const factsLine = [guild.region, guild.faction, guild.focus].join(' · ');
// The home page's title in search results.
export const homeTitle = `${guild.name}: ${guild.recruiting.bracket} ${guild.faction} PvP Guild in ${guild.gameShort}`;
