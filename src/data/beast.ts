// The Saga of the Bearwolftriceratiger: the beast the guild became in 2010, when Blizzard's naming
// rules forced Werewolf Orgasmahowl to rename. The facts are the rename (2010), the new name and the
// black-and-bright-yellow colors; the mythology around them is new copy written in 2026. See CONTENT.md.
import type { ImageMetadata } from 'astro';
import beastImage from '../assets/beast/bearwolftriceratiger.jpg';
// Every other picture of the Beast is a sighting: drawn by someone else, somewhere else, some other
// century. Each one appears on the page once.
import daylight from '../assets/beast/sightings/daylight.jpg';
import gilded from '../assets/beast/sightings/gilded-page.jpg';
import hornCount from '../assets/beast/sightings/horn-count.jpg';
import lionCharge from '../assets/beast/sightings/lion-charge.jpg';
import nurembergDetail from '../assets/beast/sightings/nuremberg-detail.jpg';
import nurembergWoodcut from '../assets/beast/sightings/nuremberg-woodcut.jpg';
import pamphlet from '../assets/beast/sightings/pamphlet.jpg';
import redBeast from '../assets/beast/sightings/red-beast.png';
import redHeads from '../assets/beast/sightings/red-heads.jpg';
import redTriceratops from '../assets/beast/sightings/red-triceratops.jpg';
import riderSketch from '../assets/beast/sightings/rider-sketch.jpg';
import riderWine from '../assets/beast/sightings/rider-wine.jpg';
import scarletSeven from '../assets/beast/sightings/scarlet-seven.jpg';
import sevenLeopards from '../assets/beast/sightings/seven-leopards.jpg';
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

// One paragraph, so the text wraps around the drop cap and runs on.
export const intro = [
  'Gather close to the fire, packmates, and keep your claws to yourselves. This is the saga of the Bearwolftriceratiger: four beasts in one hide, three horns on one head, and one roar. It is told the way it was told to me. Every word is true, except for the parts that are even truer.',
];

// Details cropped from the sightings, each crop in its own image's pixels.
export interface Crop { x: number; y: number; w: number; h: number }
export interface Detail { image: ImageMetadata; crop: Crop; label: string; caption: string }

export const details = {
  four: [
    { id: 'bear', name: 'The Bear', part: 'The claw', image: daylight, label: 'Detail of a sighting: a huge clawed paw stepping out of the surf.', crop: { x: 15, y: 500, w: 130, h: 130 } },
    { id: 'wolf', name: 'The Wolf', part: 'The eye', image: scarletSeven, label: 'Detail of a sighting: a yellow eye glaring out of red scales.', crop: { x: 340, y: 145, w: 60, h: 60 } },
    { id: 'triceratops', name: 'The Triceratops', part: 'The horns', image: redTriceratops, label: 'Detail of a sighting: a red head crowned with long, curved horns.', crop: { x: 130, y: 35, w: 95, h: 95 } },
    { id: 'tiger', name: 'The Tiger', part: 'The jaws', image: sevenLeopards, label: 'Detail of a sighting: a leopard head roaring, its long fangs bared.', crop: { x: 95, y: 125, w: 110, h: 110 } },
  ],
  field: {
    image: redBeast,
    crop: { x: 40, y: 15, w: 320, h: 311 },
    label: 'A red, leopard-spotted beast with a cluster of roaring heads and a crown of yellow-tipped horns, stepping out of a stormy sea onto the rocks.',
    caption: 'Field photograph',
  },
} as const;

// The horn count in the "Did you know?" factoid (Telling VI): a sighting marked up by the Librarian.
// Each mark is a numbered tag at `at` with a leader line to the horn's tip, in the image's own pixels.
export const hornTally = {
  image: hornCount,
  alt: 'A painting of a lion-bodied beast with a triceratops head charging through the surf, its frill bristling with horns. Each horn is tagged with a number from 1 to 9.',
  caption: 'Marked up by the Librarian. Nine horns by mid-afternoon: a quiet day.',
  marks: [
    { n: 1, tip: [109, 31], at: [103, 21] },
    { n: 2, tip: [128, 24], at: [123, 13] },
    { n: 3, tip: [142, 26], at: [140, 14] },
    { n: 4, tip: [162, 3], at: [176, 9] },
    { n: 5, tip: [158, 26], at: [156, 15] },
    { n: 6, tip: [163, 41], at: [170, 30] },
    { n: 7, tip: [182, 37], at: [192, 28] },
    { n: 8, tip: [169, 62], at: [204, 64] },
    { n: 9, tip: [176, 58], at: [205, 48] },
  ],
  legend: [
    { n: '6, 7, 9', label: 'Its own three' },
    { n: '1', label: 'The Lumber Mill, captured in Arathi Basin' },
    { n: '2', label: 'The Blacksmith, captured in Arathi Basin' },
    { n: '3', label: 'The Farm, captured in Arathi Basin' },
    { n: '4', label: 'A flag returned in Warsong Gulch' },
    { n: '5', label: 'A flag captured in Warsong Gulch' },
    { n: '8', label: 'Still growing. The night is young.' },
  ],
} as const;

// The Sightings (Telling VI): the evidence board. Oldest first. `full`, when given, is what the
// witness statement shows in place of the card's picture. `focus` is the card's object-position.
export interface Sighting {
  numeral: string;
  title: string;
  image: ImageMetadata;
  full?: ImageMetadata;
  alt: string;
  focus?: string;
  witness: string;
  when: string;
  heads: string;
  verdict: 'Credible' | 'Blurry' | 'Most accurate';
  teaser: string;
  statement: string;
}

export const sightings: Sighting[] = [
  {
    numeral: 'I',
    title: 'The Nuremberg Woodcut',
    image: nurembergDetail,
    full: nurembergWoodcut,
    alt: 'A woodcut print. Below a sky of clouds, angels and a crowned figure on a throne, a seven-headed beast with crowned heads rears up on bear-like legs, while a crowd kneels before it and a smaller beast with curling horns sits to one side.',
    focus: '50% 20%',
    witness: 'An engraver in Nuremberg',
    when: '1498',
    heads: 'Seven, all crowned',
    verdict: 'Credible',
    teaser: 'Carved in wood, so nobody could say he made it up.',
    statement: 'He carved it into a block of wood so that nobody could say he made it up. The Beast rears up on the legs of a bear, every head wearing a crown, and a crowd kneels before it. Off to one side sits a second, smaller beast with curling horns, which the engraver swears was only there to watch. The figures in the clouds above are thought to be spectators.',
  },
  {
    numeral: 'II',
    title: 'The Gilded Page',
    image: gilded,
    alt: 'A hand-painted book illustration: a golden-furred beast with seven heads, some crowned, some horned, rearing up on a green hillside above a king, a queen and a hooded figure.',
    focus: '50% 25%',
    witness: 'A painter of illuminated books',
    when: 'Some years later',
    heads: 'Seven, crowns counted separately',
    verdict: 'Credible',
    teaser: 'Painted in gold by someone who got far too close.',
    statement: 'Painted in gold and bright colors by someone who clearly got far too close. This witness counted the crowns as well as the heads, and kept a separate tally of the horns. The king and queen at the bottom appear to have just been told that the Beast is holding all three bases.',
  },
  {
    numeral: 'III',
    title: 'The Charge',
    image: lionCharge,
    alt: 'A blurry painting of a leopard-spotted beast with several roaring, maned heads leaping out of the sea, beside a huge red, horned dragon rising in the foreground.',
    focus: '30% 40%',
    witness: 'A painter caught in the spray',
    when: 'Mid-charge',
    heads: 'At least four, all roaring',
    verdict: 'Blurry',
    teaser: 'Caught mid-leap. The witness did not stay.',
    statement: 'Painted in a hurry, and it shows. The Beast is caught in mid-leap out of the surf with its jaws wide open and at least four heads roaring at once, and the paint has not quite stopped running. Something big, red and horned is coming up out of the water beside it. The witness did not stay to find out what.',
  },
  {
    numeral: 'IV',
    title: 'The Scarlet Seven',
    image: scarletSeven,
    alt: 'A painting done almost entirely in red: a huge, scaly, seven-headed beast striding over dark rocks, its biggest head crowned with long horns and every mouth open on rows of fangs, a tiny robed figure on its back, under a blood-red sky.',
    focus: '68% 40%',
    witness: 'A painter with only red paint',
    when: 'One red evening',
    heads: 'Seven, every one of them open',
    verdict: 'Credible',
    teaser: 'Painted all in red. Seven heads, and not one of them shut.',
    statement: 'The witness owned one tube of paint, and it was red. The Beast fills the whole canvas, striding over the rocks on clawed feet with seven heads, every mouth wide open and every fang accounted for. The biggest head wears a crown of long horns, which the Triceratops is very proud of. The witness swears the sky really was that color.',
  },
  {
    numeral: 'V',
    title: 'The Pamphlet',
    image: pamphlet,
    alt: 'A hand-drawn poster headed "A Beast Rise Up out of the Sea", with an arrow pointing down at a yellow, leopard-spotted beast with a big maned lion head crowned with horns and six smaller maned heads around it, and long black claws.',
    focus: '30% 85%',
    witness: 'Whoever nailed it to the inn door',
    when: 'Last week',
    heads: 'Seven, all with manes',
    verdict: 'Most accurate',
    teaser: 'Found nailed to an inn door. The best likeness yet.',
    statement: 'Somebody drew this by hand and nailed it to the door of the inn at the crossroads, headline and all, with an arrow in case anyone missed the Beast. Seven maned heads, a crown of horns, long black claws and a hide covered in spots. The Librarian took it down, looked at it for a long time and declared it the most accurate likeness of the Beast ever made.',
  },
];

export interface Telling {
  numeral: string;
  id: string;
  title: string;
  blocks: ({ p: string } | { deed: string; p: string; detail?: Detail } | { quote: string[]; cite?: string; roar?: boolean } | { note: string } | { fact: string; tally?: boolean } | { relic: true } | { sightings: true } | { art: 'frozen-name' | 'four-echoes' | 'banner' | 'saint-on-ice' })[];
}

export const tellings: Telling[] = [
  {
    numeral: 'I',
    id: 'blizzard',
    title: 'The Blizzard',
    blocks: [
      { p: 'In the Year of the Storm, a Blizzard rolled in from the far country of the Name-Keepers. It was the coldest storm the pack had ever seen, and it had only one purpose: to judge names.' },
      { p: 'The Blizzard came upon the banner of Werewolf Orgasmahowl, flapping proudly over the battlegrounds, and it stopped. It read the name once. It read it again, slower. Then it froze the name solid, snapped it off the banner and flung it into the Storm Sea.' },
      { art: 'frozen-name' },
      { quote: ['That name is too wild to be spoken.'], cite: 'The Blizzard' },
      { p: 'And the pack stood with no name at all.' },
      { note: 'Historians record that in 2010 the guild was made to change its name to satisfy Blizzard’s naming rules.' },
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
      { p: 'What came out of the waves was one beast. It wore a crown of three horns. It had the claws of the Bear, the eye of the Wolf, the frill of the Triceratops and the jaws of the Tiger. It raised its head into the storm and roared, and the roar was the old HAROOOO come back again, only much, much bigger.' },
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
      { p: 'Black, for the storm that took the old name. Bright yellow, for the lightning that gave them a new one, and for the Wolf’s eye that never closes.' },
      { p: 'It is said that the stripes on the Beast’s hide cannot be counted. Every time someone gets close, a new one appears.' },
    ],
  },
  {
    numeral: 'V',
    id: 'deeds',
    title: 'The Deeds',
    blocks: [
      { p: 'Many reports of the Beast in battle have reached the Library. These three are told most often.' },
      { deed: 'The Night at the Stables', p: 'Five of the Alliance came to take the Stables, and the Beast was alone. The Bear took one, the Wolf took one, the Triceratops took one, the Tiger took one, and the fifth looked at the three horns and walked back to the Blacksmith on his own.', detail: { image: redHeads, crop: { x: 40, y: 70, w: 210, h: 235 }, label: 'Detail of a sighting: a red beast with heads snarling in every direction.', caption: 'Facing all five' } },
      { deed: 'The Flag That Was Never Dropped', p: 'The Tiger in the Beast carried the flag across the whole of the Gulch while the Bear in the Beast carried the Tiger. Nobody is sure whose legs were doing the running. The flag was captured all the same.', detail: { image: riderWine, crop: { x: 10, y: 130, w: 236, h: 170 }, label: 'Detail of a sighting: a pile of horned, spotted heads carrying someone in purple on their backs.', caption: 'Who carried whom?' } },
      { deed: 'The Charge of the Three Horns', p: 'Asked why it would not settle for two bases, the Beast lowered its head and showed its horns. One for the Lumber Mill. One for the Stables. One for the Blacksmith. Then it went and took all three.', detail: { image: riderSketch, crop: { x: 275, y: 105, w: 180, h: 180 }, label: 'Detail of a sighting, in pen: a roaring, maned head under a tall crown of horns.', caption: 'One, two, three' } },
    ],
  },
  {
    numeral: 'VI',
    id: 'sightings',
    title: 'The Sightings',
    blocks: [
      { p: 'The Storm Sea does not keep time the way we do. When the Beast rose from it in the Year of the Blizzard, it rose everywhere and everywhen at once, and for five hundred years people have looked up from their work and seen it. The brave ones drew what they saw.' },
      { p: 'No two witnesses agree. One counts seven heads and another counts one. One swears it was spotted, another that it was red. The answer is simple: the Beast grows a new head for every flag it carries home, and nobody ever sees it on the same night twice. I have pinned up every sighting I could find.' },
      { sightings: true },
      { fact: 'The Beast has only three horns of its own, one for each base the Triceratops was taught to grab. The rest it earns. Every base the pack captures in Arathi Basin grows it a new horn, and so does every flag returned or captured in Warsong Gulch, and none of them fall off until dawn. That is why no witness has ever drawn it with just three: nobody has ever seen the Beast on a quiet night. Some days it has over a hundred.', tally: true },
      { p: 'If you see the Beast yourself, do not approach it. Draw it from a safe distance and bring the drawing to the Librarian.' },
    ],
  },
  {
    numeral: 'VII',
    id: 'saint',
    title: 'The Beast and the Saint',
    blocks: [
      { p: 'Some say the Bearwolftriceratiger is the mount of Saint Hornatius Orgasmahowl himself. Others say it is the Saint’s own HAROOOO, given claws and set loose on the world.' },
      { p: 'The oldest wolves in the pack tell it another way. On the night of the Blizzard, they say, a lone orc was seen far out on the ice with his arms raised to the lightning. And when the Beast rose from the sea, the very first thing it did was kneel.' },
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
  'Sighted Across the Ages',
  'Never Holds Two',
  'Carrier of the Flag',
  'It Kneels Only to the Saint',
];

export const fieldCard = [
  { label: 'Horns', value: 'Three, plus one for every base and flag (100+ on a good day)' },
  { label: 'Heads', value: 'Anywhere from one to seven (witnesses disagree)' },
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
  { law: 'Support the Pack.', gloss: 'Four beasts became one body. No limb fights alone.' },
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
