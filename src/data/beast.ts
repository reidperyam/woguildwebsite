// The Saga of the Bearwolftriceratiger: the beast the guild became in 2010, when Blizzard's naming
// rules forced Werewolf Orgasmahowl to rename. The facts are the rename (2010), the new name and the
// black-and-bright-yellow colors; the mythology around them is new copy written in 2026. See CONTENT.md.
import beastImage from '../assets/beast/bearwolftriceratiger.jpg';
import { librarian } from './lore';

// Set down by the same librarian who catalogued the Saint.
export const keeper = librarian;
export const born = 'the Year of the Blizzard (2010)';
export const roarText = 'HAROOOARRR!';

export const relic = {
  image: beastImage,
  alt: 'A painting of a horned beast with a frilled triceratops head, the body and claws of a bear and the spotted hide of a great cat, roaring as it charges out of a stormy sea.',
  plaque: 'Specimen I',
  title: 'The Beast Rising from the Storm Sea',
};

export const intro = [
  'Gather close to the fire, packmates, and keep your claws to yourselves. This is the saga of the Bearwolftriceratiger: four beasts in one hide, three horns on one head, and one roar.',
  'It is told the way the storm-singers told it to me. Every word is true, except for the parts that are even truer.',
];

// Details cropped from the painting, in its own pixels (400 × 368).
export interface Detail { crop: { x: number; y: number; w: number; h: number }; label: string; caption: string }

export const details = {
  four: [
    { id: 'bear', name: 'The Bear', part: 'The claw', label: 'Detail of the painting: the Beast’s raised bear claw.', crop: { x: 8, y: 150, w: 105, h: 105 } },
    { id: 'wolf', name: 'The Wolf', part: 'The jaws', label: 'Detail of the painting: the Beast’s open, fanged jaws.', crop: { x: 72, y: 112, w: 108, h: 108 } },
    { id: 'triceratops', name: 'The Triceratops', part: 'The horns', label: 'Detail of the painting: the Beast’s crown of horns and frill.', crop: { x: 66, y: 0, w: 190, h: 190 } },
    { id: 'tiger', name: 'The Tiger', part: 'The hide', label: 'Detail of the painting: the Beast’s spotted, striped hide.', crop: { x: 236, y: 140, w: 118, h: 118 } },
  ],
  head: { crop: { x: 56, y: 24, w: 210, h: 210 }, label: 'Detail of the painting: the head of the Bearwolftriceratiger.', caption: 'Specimen I, detail' },
} as const;

export interface Telling {
  numeral: string;
  id: string;
  title: string;
  blocks: ({ p: string } | { deed: string; p: string; detail?: Detail } | { quote: string[]; cite?: string; roar?: boolean } | { note: string } | { relic: true } | { art: 'frozen-name' | 'four-echoes' | 'banner' | 'saint-on-ice' })[];
}

export const tellings: Telling[] = [
  {
    numeral: 'I',
    id: 'blizzard',
    title: 'The Blizzard',
    blocks: [
      { p: 'In the Year of the Blizzard, a great storm rolled in from the far country of the Name-Keepers. It was the coldest storm the pack had ever seen, and it had only one purpose: to judge names.' },
      { p: 'The storm came upon the banner of Werewolf Orgasmahowl, flapping proudly over the battlegrounds, and it stopped. It read the name once. It read it again, slower. Then it froze the name solid, snapped it off the banner and flung it into the Storm Sea.' },
      { art: 'frozen-name' },
      { quote: ['That name is too wild to be spoken.'], cite: 'The Blizzard' },
      { p: 'And the pack stood on the shore with a bare pole and no name at all.' },
      { note: 'Historians record that in 2010 the guild was made to change its name to satisfy Blizzard’s naming rules. The storm-singers prefer this version.' },
    ],
  },
  {
    numeral: 'II',
    id: 'four-echoes',
    title: 'The Four Echoes',
    blocks: [
      { p: 'A nameless pack does what any pack does. They threw back their heads and gave the cry of their Saint, Hornatius Orgasmahowl: HAROOOO!' },
      { p: 'But the air was so cold that the cry froze the moment it left their throats. It hung there, shining, and then it fell onto the ice and shattered into four pieces. Each piece woke up as a beast.' },
      { art: 'four-echoes' },
      { p: 'The first piece was the low growl at the start of the cry. It became the Bear, who is strong and stubborn and will sit on a base until the end of time.' },
      { p: 'The second was the long howl in the middle. It became the Wolf, who is the heart of the old name and never runs without its pack.' },
      { p: 'The third was the bellow underneath. It became the Triceratops, who has three horns because it has always been taught to grab three.' },
      { p: 'The fourth was the roar at the very end. It became the Tiger, fastest of the four, striped black for the storm and yellow for the lightning, born to carry the flag home.' },
    ],
  },
  {
    numeral: 'III',
    id: 'rising',
    title: 'The Rising',
    blocks: [
      { p: 'The four beasts circled each other on the breaking ice. The Bear wanted to defend. The Wolf wanted to regroup. The Triceratops wanted to push the Stables. The Tiger had already left with the flag.' },
      { p: 'Then the sky cracked open. A single bolt of lightning struck the ice where they stood, the Storm Sea boiled, and the four were hurled together into the deep.' },
      { relic: true },
      { p: 'What came out of the waves was one beast. It wore a crown of three horns. It had the claws of the Bear, the jaws of the Wolf, the frill of the Triceratops and the hide of the Tiger. It raised its head into the storm and roared, and the roar was the old HAROOOO come back again, only much, much bigger.' },
      { quote: ['HAROOOARRR!'], cite: 'The Bearwolftriceratiger, its first word', roar: true },
      { p: 'The pack on the shore did not need to be told. They had their name back. It was simply longer now.' },
    ],
  },
  {
    numeral: 'IV',
    id: 'colors',
    title: 'The Colors',
    blocks: [
      { p: 'The Blizzard had taken everything else, so the pack made its new banner from the only two things the storm left behind.' },
      { art: 'banner' },
      { p: 'Black, for the storm that took the old name. Bright yellow, for the lightning that gave them a new one, and for the Tiger’s eye that never closes.' },
      { p: 'It is said that the stripes on the Beast’s hide cannot be counted. Every time someone gets close, a new one appears.' },
    ],
  },
  {
    numeral: 'V',
    id: 'deeds',
    title: 'The Deeds',
    blocks: [
      { p: 'The storm-singers keep many reports of the Beast in battle. These three are told most often.' },
      { deed: 'The Night at the Stables', p: 'Five of the Alliance came to take the Stables, and the Beast was alone. The Bear took one, the Wolf took one, the Triceratops took one, the Tiger took one, and the fifth looked at the three horns and walked back to the Blacksmith on his own.', detail: { crop: { x: 176, y: 168, w: 90, h: 100 }, label: 'Detail of the painting: the Beast’s armored, scaled chest.', caption: 'The armored chest' } },
      { deed: 'The Flag That Was Never Dropped', p: 'The Tiger in the Beast carried the flag across the whole of the Gulch while the Bear in the Beast carried the Tiger. Nobody is sure whose legs were doing the running. The flag was captured all the same.', detail: { crop: { x: 140, y: 262, w: 130, h: 100 }, label: 'Detail of the painting: the Beast’s clawed feet charging through the surf.', caption: 'Whose legs?' } },
      { deed: 'The Charge of the Three Horns', p: 'Asked why it would not settle for two bases, the Beast lowered its head and showed its horns. One for the Lumber Mill. One for the Stables. One for the Blacksmith. Then it went and took all three.', detail: { crop: { x: 96, y: 0, w: 140, h: 112 }, label: 'Detail of the painting: the tips of the Beast’s horns.', caption: 'One, two, three' } },
    ],
  },
  {
    numeral: 'VI',
    id: 'saint',
    title: 'The Beast and the Saint',
    blocks: [
      { p: 'Some say the Bearwolftriceratiger is the mount of Saint Hornatius Orgasmahowl himself. Others say it is the Saint’s own HAROOOO, given claws and set loose on the world.' },
      { p: 'The oldest storm-singers tell it another way. On the night of the Blizzard, they say, a lone orc was seen far out on the ice with his arms raised to the lightning. And when the Beast rose from the sea, the very first thing it did was kneel.' },
      { art: 'saint-on-ice' },
      { p: 'Whatever the truth, nobody disputes that the Beast always grabs three. Somebody taught it that.' },
    ],
  },
];

export const epithets = [
  'Born of the Blizzard',
  'Four Beasts, One Roar',
  'Three Horns for Three Bases',
  'Striped by Lightning',
  'Breaker of the Zerg',
  'Too Wild to Be Spoken',
  'Never Holds Two',
  'Carrier of the Flag',
  'It Kneels Only to the Saint',
];

export const fieldCard = [
  { label: 'Horns', value: 'Three (one per base)' },
  { label: 'Beasts inside', value: 'Four' },
  { label: 'Stripes', value: 'Uncountable' },
  { label: 'Habitat', value: 'Level 39 battlegrounds' },
  { label: 'Diet', value: 'Alliance zergs' },
  { label: 'Temperament', value: 'Friendly to the Horde' },
];

// The four echoes, in the order they were broken off the cry.
export const four = [
  { id: 'bear', name: 'The Bear', part: 'The growl', gift: 'Holds the base' },
  { id: 'wolf', name: 'The Wolf', part: 'The howl', gift: 'Keeps the pack' },
  { id: 'triceratops', name: 'The Triceratops', part: 'The bellow', gift: 'Grabs three' },
  { id: 'tiger', name: 'The Tiger', part: 'The roar', gift: 'Runs the flag' },
] as const;

export const laws = [
  { law: 'Play to win, not to farm kills.', gloss: 'The Beast does not stop to chew. It takes the base.' },
  { law: 'Back up your packmates.', gloss: 'Four beasts became one body. No limb fights alone.' },
  { law: 'Play to have fun.', gloss: 'The Beast roars because it is having a wonderful time.' },
  { law: 'Never hold two.', gloss: 'There are three horns for a reason.' },
];

export const oath = [
  'By the Bear, I will hold what we take.',
  'By the Wolf, I will not run alone.',
  'By the Triceratops, I will grab three.',
  'By the Tiger, I will bring the flag home.',
  'And when the storm comes for our name, we answer:',
];
