// The guild's in-game tabards, as the guild provided them (250 × 250, transparent).
// Show them as they are: never recolored, filtered or cropped. See BRAND.md.
// `current` is the tabard the guild uses today: use it wherever the site stands for the guild now.
// `original` and `beast` are history (the 2009 and 2010 tabards). `original` is the guild's in-game image of it,
// centered on the same 250 × 250 transparent canvas; unlike the other two, it has no bronze frame.
import current from '../assets/tabards/werewolf-orgasmahowl-2026-gray.png';
import original from '../assets/tabards/werewolf-orgasmahowl-2009-original.png';
import beast from '../assets/tabards/bearwolftriceratiger-2010.png';

export const tabards = {
  current: {
    image: current,
    name: 'Werewolf Orgasmahowl',
    alt: 'The Werewolf Orgasmahowl guild tabard: a silver-gray banner edged in black with a black chevron pointing down, hanging in a round bronze frame.',
  },
  original: {
    image: original,
    name: 'Werewolf Orgasmahowl (2009)',
    alt: 'The original 2009 Werewolf Orgasmahowl guild tabard: a hot pink banner edged in teal with a pale yellow chevron pointing up, hung with fringed brown trim at both top corners.',
  },
  beast: {
    image: beast,
    name: 'Bearwolftriceratiger',
    alt: 'The Bearwolftriceratiger guild tabard: a yellow-green banner edged in black with a black chevron pointing up, hanging in a round bronze frame.',
  },
};

// The guild's history in three banners, for the home page's Our history section.
// `when`, `title` and `text` are confirmed facts. `meaning` (shown when a banner is hovered or tapped)
// is guild mythos, told straight: what each tabard's colors and chevron stand for.
// Swatch hexes are sampled from the tabard images.
export interface Meaning { colors: { name: string; hex: string; text: string }[]; chevron: string; chevronHex: string; chevronUp?: boolean }

export const bannerHistory: {
  tabard: (typeof tabards)[keyof typeof tabards];
  when: string;
  title: string;
  text: string;
  link?: { href: string; label: string };
  meaning: Meaning;
}[] = [
  {
    tabard: tabards.original,
    when: '2009',
    title: 'Founded as Werewolf Orgasmahowl',
    text: 'Hot pink, teal and yellow. The original pack.',
    meaning: {
      colors: [
        { name: 'Hot pink', hex: '#dd208d', text: 'Chosen so the Alliance could see the pack coming from across Arathi Basin. The pack never once tried to sneak up on anyone.' },
        { name: 'Teal', hex: '#1d648e', text: 'Moonlight on the walls of Shadowfang Keep, where the Saint first stood with the Worgen.' },
        { name: 'Yellow', hex: '#f5ea84', text: 'The halo of Saint Hornatius Orgasmahowl, worn over the heart of every packmate who carries his cry.' },
      ],
      chevronHex: '#f5ea84',
      chevronUp: true,
      chevron: 'A point toward the heavens, where the beloved Saint Hornatius Orgasmahowl resides.',
    },
  },
  {
    tabard: tabards.beast,
    when: '2010',
    title: 'Renamed Bearwolftriceratiger',
    text: 'Blizzard’s naming rules forced a new name, and the guild became the Beast, in black and bright yellow.',
    link: { href: '/bearwolftriceratiger', label: 'Read the saga' },
    meaning: {
      colors: [
        { name: 'Lightning yellow', hex: '#a5a722', text: 'The bolt that fused four beasts into one hide. Tinged green by the Storm Sea it rose from.' },
        { name: 'Black', hex: '#000000', text: 'The bleakness of the reckoning that destroyed Werewolf Orgasmahowl.' },
      ],
      chevronHex: '#000000',
      chevronUp: true,
      chevron: 'A horn raised to the lightning. The Beast kept the first banner’s chevron pointing up, and burned it black.',
    },
  },
  {
    tabard: tabards.current,
    when: 'Now',
    title: 'Werewolf Orgasmahowl again',
    text: 'The original name is back, now in World of Warcraft Forever, just with a <WO> guild name.',
    meaning: {
      colors: [
        { name: 'Silver', hex: '#a9a9a9', text: 'The full moon the pack howls back at. Silver is said to harm werewolves. The pack wears it to build resistance.' },
        { name: 'Black', hex: '#000000', text: 'The bleakness of the reckoning that destroyed the original Werewolf Orgasmahowl, remembered and repurposed, just as the guild.' },
      ],
      chevronHex: '#000000',
      chevron: 'A V for victory: the first of the pack’s chevrons to point down, turned over for the return.',
    },
  },
];
