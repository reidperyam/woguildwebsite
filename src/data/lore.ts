// The Life of Saint Hornatius Orgasmahowl: the guild's 2010 relic catalogue.
// Copy is the original text, lightly edited for flow and spelling. See CONTENT.md.
import type { ImageMetadata } from 'astro';
import shadowfang from '../assets/lore/01-shadowfang-keep.jpg';
import lumberMill from '../assets/lore/02-lumber-mill.jpg';
import warsong from '../assets/lore/03-warsong-gulch.jpg';
import dayOne from '../assets/lore/04-temptation-day-one.jpg';
import dayTwo from '../assets/lore/05-temptation-day-two.jpg';
import dayThree from '../assets/lore/06-temptation-day-three.jpg';
import petArmy from '../assets/lore/07-the-pet-army.jpg';

export type Block =
  | { p: string }
  | { html: string }
  | { quote: string[]; cite?: string };

export interface Relic {
  no: string;
  id: string;
  title: string;
  image: ImageMetadata;
  alt: string;
  blocks: Block[];
}

export interface Chapter {
  numeral: string;
  id: string;
  title: string;
  relics: Relic[];
}

export const librarian = 'Roadieoh, High Tauren Librarian';
export const catalogued = 'March 23, 2010';

export const intro = [
  'Gathered from the archives are the relics of our patron, Saint Hornatius Orgasmahowl: champion of the Worgen, scourge of the Alliance zerg, keeper of a vast number of non-combat pets, and the most wonderful, holy and virtuous orc ever painted.',
  'I will keep digging through the archives, as I am certain there are more paintings depicting his virtues, good deeds and miracles.',
];

export const chapters: Chapter[] = [
  {
    numeral: 'I',
    id: 'deeds',
    title: 'The Deeds',
    relics: [
      {
        no: '01',
        id: 'shadowfang-keep',
        title: 'The Defense of Shadowfang Keep',
        image: shadowfang,
        alt: 'A black and white engraving of soldiers scaling a castle wall with ladders while a circled figure hurls boulders down from the battlements.',
        blocks: [
          { p: 'Reclaimed is this vital link between St. Hornatius and his kindred race, the Worgen! It seems our fabled saint fought with the strength of twenty and the honor of a champion, defending the Worgen race and Shadowfang Keep from the marauding bands of bigoted Humans.' },
          { p: 'This historic painting shows our hero hurling massive boulders and laying waste to an entire division of troops swarming like hideous insects upon the honorable castle.' },
          {
            quote: ['Saint Orgasmahowl fought with the spirit and tenacity of ten orcs. That is why the Worgen revere his memory to this day. Bless this orc for fighting on the side of justice. His presence won us the battle, the eventual war, and with it our freedom.'],
            cite: 'Fanggore, Chief of Worgen Clan Grollick',
          },
          { p: 'The friendship between Saint Orgasmahowl and the Worgen is quite interesting, especially as recent accounts suggest the Worgen have increasingly shifted their allegiance toward the Humans: the same race depicted here attempting genocide upon them. Quite curious.' },
        ],
      },
      {
        no: '02',
        id: 'lumber-mill',
        title: 'The Lumber Mill',
        image: lumberMill,
        alt: 'A black and white engraving of an orc-headed warrior in scale armor raising a sword on a cliffside path above fallen enemies.',
        blocks: [
          { p: 'Apparently St. Orgasmahowl was an ardent participant in the same Arathi Basin we play today! This painting shows him laying waste to an entire Alliance offensive zerg attempting to dislodge Hornatius from his defensive post atop the Lumber Mill.' },
          { p: 'On the back of the painting is a note giving the context. Shortly before the event depicted, St. Orgasmahowl confronted three members of his own team who were unwilling to push an attack on the enemy Stables:' },
          { quote: ['Let’s hold 2.', 'Yah, better than none.', 'Ya relax, Hornatius.'] },
          { p: 'To this our beloved Saint replied:' },
          { quote: ['Instead of holding TWO, I will grab THREE!'] },
          { html: 'He then scooped up the three tar heels and flung them off the northern cliff’s ledge onto two enemy hunters far, far below, killing all five. At this he shouted <strong class="cry">“HAROOOO!”</strong> (his magnificent and heralded battle cry) and flung himself into the onslaught of Alliance denizens en route to the Lumber Mill, as depicted here.' },
        ],
      },
      {
        no: '03',
        id: 'warsong-gulch',
        title: 'The Flag of Warsong Gulch',
        image: warsong,
        alt: 'An ornate holy card of a winged, haloed warrior with a green orc head stomping a demon into flames, a red flag at his feet.',
        blocks: [
          { p: 'This one was catalogued as picturing the great Saint felling a vile Goblin in Warsong Gulch. The Saint stands triumphant and sacred, stomping the vile hellion into the depths of the earth from which he spawned, and returning the Horde flag in the process.' },
          {
            quote: ['Some of us call to him when all hope is gone, looking to the skies, praying that he will deliver our flag from evil.'],
            cite: 'Thrall, Warchief',
          },
          { p: 'That was written on the back in crude handwriting. It seems St. Hornatius figured in the beliefs of the Horde’s great leaders too. Wondrous!' },
        ],
      },
    ],
  },
  {
    numeral: 'II',
    id: 'temptations',
    title: 'The Three Temptations',
    relics: [
      {
        no: '04',
        id: 'first-temptation',
        title: 'The First Temptation',
        image: dayOne,
        alt: 'A classical painting of a robed, haloed figure with a green orc head on a mountaintop, turning away from a winged devil.',
        blocks: [
          { p: 'Behold the Temptation of Hornatius: proof that even the noblest among us are burdened with the responsibility to be just.' },
          { p: 'The devil visited Saint Hornatius Orgasmahowl three times.' },
          { p: 'The first time, he tempted the Saint with an invitation to join his friends in his domain. Other battle champions would be there, every bit as skilled in war as Saint Hornatius. Saint Orgasmahowl would no longer feel alone in a world of mediocrity.' },
          { p: 'St. Orgasmahowl rebuffed the demon thus:' },
          { quote: ['No band of callous villains can equal my heart or spirit! Be gone, vile pest!'] },
        ],
      },
      {
        no: '05',
        id: 'second-temptation',
        title: 'The Second Temptation',
        image: dayTwo,
        alt: 'A painting of the orc-headed Saint in a red robe on a hilltop at sunset while a winged devil gestures toward the land below.',
        blocks: [
          { p: 'The devil appeared to Hornatius on the second day and offered him the city of Stormwind to rule and command as his own.' },
          { p: 'St. Orgasmahowl once again rejected the demon’s gift:' },
          { quote: ['A city built upon the evil seeds you have sown will harbor not this champion! I would raze this place before owning the filth within!'] },
        ],
      },
      {
        no: '06',
        id: 'third-temptation',
        title: 'The Third Temptation',
        image: dayThree,
        alt: 'A classical cave painting: the orc-headed Saint kneels in prayer while a nude woman stands before him, surrounded by monkeys, foxes and three Pendulum of Doom axes.',
        blocks: [
          { p: 'But the demon was persistent, for he knew the worthiness of the recruit he sought. And so on the third day the devil appeared before the Saint with 100 non-combat pets, three Pendulums of Doom (one for his left hand and two for his right, as he was accustomed) and a naked virgin wanting to bed him.' },
          { p: 'This was by far the hardest of the temptations St. Hornatius faced. He did not respond, but knelt down to pray.' },
        ],
      },
    ],
  },
  {
    numeral: 'III',
    id: 'mysteries',
    title: 'The Mysteries',
    relics: [
      {
        no: '07',
        id: 'among-the-beasts',
        title: 'The Saint Among the Beasts',
        image: petArmy,
        alt: 'A painting of a monk in a brown habit with a green orc head standing in a forest, arms open, surrounded by geese and dozens of birds.',
        blocks: [
          { p: 'Some claim this is an image of the time St. Orgasmahowl rallied his vast number of non-combat pets into an army to reclaim the batch of Rumsey Rum stolen by the Holy-Rolling Argent Dawn in the years immediately preceding Prohibition.' },
          { p: 'Others argue it shows the moment before Hornatius’ death, which remains a mystery to this day. They say the Saint’s popularity was his undoing, as hundreds of animals swarmed him for hugs and ultimately smothered him.' },
          { p: 'Whatever its meaning, the subject matter is not debated. What a wonderful, holy and virtuous orc it shows!' },
        ],
      },
    ],
  },
];

export const teaserRelic = chapters.flatMap((c) => c.relics).find((r) => r.id === 'warsong-gulch')!;
