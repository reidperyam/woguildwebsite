// The Archive: real footage from the guild's past, filed as the guild provided it.
// Unlike the Saint and the Beast, nothing here is mythology. Titles and alt text say only what an exhibit shows
// and what is written on it. Anything the guild hasn't confirmed stays out, or stays a [BRACKETED] placeholder.
// Show every exhibit whole and framed: never recolored, filtered or cropped. See BRAND.md, Archive sub-theme.
// To file a new exhibit: put the image in src/assets/archive/ (named by its number), import it below,
// and add an entry to `exhibits`. `era` is the guild era it comes from, printed on the film's edge.
import type { ImageMetadata } from 'astro';
import banner001 from '../assets/archive/001-bearwolftriceratiger-banner.jpg';
import pink002 from '../assets/archive/002-the-pack-in-pink.jpg';
import hordeWins003 from '../assets/archive/003-horde-wins.jpg';
import rollsOut004 from '../assets/archive/004-the-premade-rolls-out.jpg';
import hordeWins005 from '../assets/archive/005-horde-wins-again.jpg';
import minuteToGo006 from '../assets/archive/006-one-minute-to-go.jpg';

export interface Exhibit {
  no: string;
  id: string;
  title: string;
  kicker: string;
  era: '2009' | '2010' | 'Now';
  image: ImageMetadata;
  alt: string;
}

export const exhibits: Exhibit[] = [
  {
    no: '001',
    id: 'bearwolftriceratiger-banner',
    title: 'The Bearwolftriceratiger Banner',
    kicker: 'Nine of the pack',
    era: '2010',
    image: banner001,
    alt: 'A wide guild banner on a white background. Across the top it reads <Bearwolftriceratiger> on the left and 39 Horde PVP - Undermine on the right, both in red. Below stand nine Horde characters in armor and robes, holding swords, axes, shields, staves and a gun, each labeled with a name: Overrated, Noobsombrero, Norfire, Litedarker, Sockdolager, Silane, Icecreemman, Chøøs and Mmwellspent.',
  },
  {
    no: '002',
    id: 'the-pack-in-pink',
    title: 'The Pack in Pink',
    kicker: 'In the original tabard',
    era: '2009',
    image: pink002,
    alt: 'The pack gathered in two rows in front of a carved stone ruin among purple-leaved trees: one row up on a mossy ledge, one on the grass below. Nearly all of them wear the original hot pink guild tabard with its yellow chevron, and pets and companions stand among them. Over a robed blood elf in the middle floats the nameplate Norfire, <Werewolf Orgasmahowl>.',
  },
  {
    no: '003',
    id: 'horde-wins',
    title: 'Horde Wins',
    kicker: 'Premade vs. premade in Warsong Gulch. We won.',
    era: '2009',
    image: hordeWins003,
    alt: 'A screenshot of the end-of-match scoreboard in Warsong Gulch, headed Horde Wins. Ten Horde players against ten Alliance players, with each player’s killing blows, deaths, honorable kills, damage, healing, flag captures and returns, and honor gained. Time elapsed: 27 minutes. The chat log at the bottom left reads The Horde wins!',
  },
  {
    no: '004',
    id: 'the-premade-rolls-out',
    title: 'The Premade Rolls Out',
    kicker: 'Single file, in the original pink',
    era: '2009',
    image: rollsOut004,
    alt: 'A tauren in the original hot pink guild tabard runs across a grassy slope in the rain, beside a cobbled road. Behind, a long single-file line of characters in matching pink tabards climbs the road toward a pass between the hills.',
  },
  {
    no: '005',
    id: 'horde-wins-again',
    title: 'Horde Wins Again',
    kicker: 'Another premade in Warsong Gulch. Another win.',
    era: '2009',
    image: hordeWins005,
    alt: 'A screenshot of another end-of-match scoreboard in Warsong Gulch, headed Horde Wins. Ten Horde players against ten Alliance players, with each player’s killing blows, deaths, honorable kills, damage, healing, flag captures and returns, and honor gained. Time elapsed: 25 minutes. The chat log at the bottom left reads Badonkadonk captured the Alliance flag! and The Horde wins!',
  },
  {
    no: '006',
    id: 'one-minute-to-go',
    title: 'One Minute to Go',
    kicker: 'In the Warsong Gulch flag room, before the gates open',
    era: '2009',
    image: minuteToGo006,
    alt: 'Inside the Horde flag room in Warsong Gulch, under red banners, tauren in purple robes and the original hot pink guild tabard wait with a bat-winged pet. Their nameplates read Dawg, Banditkeith and Therewolf, each with <Werewolf Orgasmahowl> beneath. A Game Start bar shows 56 seconds, a tooltip reads Therewolf, Werewolf Orgasmahowl, Level 39 Tauren Shaman, and the chat log reads The battle for Warsong Gulch begins in 1 minute.',
  },
];

export const callForFootage = {
  title: 'Got footage from the old days?',
  text: 'Screenshots, banners, videos, old forum posts: if it comes from the pack’s past, the Archive wants it. Bring it to the Discord and it goes on the shelf.',
};
