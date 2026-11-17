// The Launch: the guild's first run, on the Saint's Feast Day. Copy for /launch, its calendar file and the home strip.
// Values in [BRACKETS] are placeholders still waiting on the guild.
import { guild } from './guild';
import { feastDay } from './lore';

// The start time as people read it. `start` below is the same moment, exactly.
const time = '8 PM ET';

export const launch = {
  // The start, as an exact moment: 8 PM Eastern on March 23, 2027. Daylight time (EDT, UTC-4) has begun by then,
  // so it's midnight UTC on the 24th. The countdowns run to this moment; pages show the viewer's own clock time too.
  start: '2027-03-24T00:00:00Z',
  dateLabel: 'Tuesday, March 23, 2027',
  shortDate: 'March 23',
  time,
  // How long the calendar entry blocks out. The run has no set end; calendars just need one.
  calendarHours: 2,
  path: '/launch',
  shareUrl: 'woguild.org/launch',

  title: 'Blast off',
  event: 'The first <WO> guild run',
  lead: `The first <WO> guild run hits the ${guild.recruiting.bracket} battlegrounds on the Feast Day of Saint Hornatius Orgasmahowl. Every class. Every spec. Roll ${guild.faction}, level up and be there.`,

  // Scrolls across the tape under the hero.
  tape: ['Blast off', 'March 23, 2027', time, `${guild.recruiting.bracket} battlegrounds`, guild.faction, guild.region, 'Every class', 'Every spec', 'Grab three', guild.battleCry],

  whyMarch: [
    `${feastDay} is the Feast Day of Saint Hornatius Orgasmahowl, Patron Saint of Battlegrounds.`,
    `On March 23, 2027, the pack answers: the first <WO> guild run in ${guild.game}.`,
  ],
  saintQuote: 'Instead of holding TWO, I will grab THREE!',

  briefing: [
    { label: 'Date', value: 'Tue · Mar 23, 2027' },
    { label: 'Time', value: time },
    { label: 'Bracket', value: guild.recruiting.bracket },
    { label: 'Faction', value: guild.faction },
    { label: 'Region', value: guild.region },
    { label: 'Classes & specs', value: 'All' },
  ],

  // The pre-flight checklist. Ticks are remembered in the viewer's own browser.
  checklist: [
    { id: 'discord', title: 'Join the Discord', text: 'Answer the welcome questions and apply in #applications.', link: { href: guild.discordUrl, label: 'Join the Discord' } },
    { id: 'horde', title: 'Roll Horde', text: `Make a ${guild.faction} character in ${guild.region}. No realm to pick: ${guild.game} has none.` },
    { id: 'level', title: 'Hit level 39', text: 'That’s the bracket. Plan the climb with the pace check below.', link: { href: '#pace', label: 'Check your pace' } },
    { id: 'gear', title: 'Gear up', text: 'How far you go is your call. Each player funds and gears their own character, and the guild helps where it can.' },
    { id: 'cry', title: 'Learn the cry', text: 'Practice your HAROOOO in the Howl Lab, so you’re ready for the charge.', link: { href: '/howl-lab', label: 'Open the Howl Lab' } },
    { id: 'three', title: 'Bring three', text: 'The Saint never held two. Share this page and bring three packmates with you.', link: { href: '#spread', label: 'Spread the word' } },
  ],

  // Ready-to-paste shouts. The in-game one stays under the 255-character chat limit.
  shouts: [
    {
      where: 'In-game chat',
      text: `<WO> Werewolf Orgasmahowl blasts off March 23, ${time}! Our first guild run: ${guild.recruiting.bracket} battlegrounds, ${guild.faction}, every class and spec. Level up and join the pack: woguild.org/launch ${guild.battleCry}`,
    },
    {
      where: 'Discord',
      text: [
        `**BLAST OFF: MARCH 23, 2027 · ${time}**`,
        `The first <WO> guild run hits the ${guild.recruiting.bracket} battlegrounds on the Feast Day of Saint Hornatius Orgasmahowl.`,
        `${guild.faction} · ${guild.region} · every class, every spec`,
        'Roll Horde, hit 39, gear up and bring three.',
        'https://woguild.org/launch',
        guild.battleCry,
      ].join('\n'),
    },
    {
      where: 'Anywhere',
      text: `Werewolf Orgasmahowl blasts off March 23, 2027 at ${time}: the guild’s first run in ${guild.recruiting.bracket} battlegrounds in ${guild.game}. ${guild.faction}, ${guild.region}, all classes. woguild.org/launch ${guild.battleCry}`,
    },
  ],

  calendar: {
    summary: 'BLAST OFF: the first <WO> guild run',
    description: `Werewolf Orgasmahowl's first guild run, in ${guild.recruiting.bracket} battlegrounds (${guild.faction}, ${guild.game}, ${guild.region}), on the Feast Day of Saint Hornatius Orgasmahowl. Starts at ${time}. Join the Discord: ${guild.discordUrl}`,
    location: `${guild.game}: ${guild.recruiting.bracket} battlegrounds`,
  },
};

// iCalendar UTC stamp: 2027-03-24T00:00:00.000Z becomes 20270324T000000Z.
const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const startDate = new Date(launch.start);
/** The calendar entry's start and end, as UTC stamps. */
export const launchTimes = {
  start: stamp(startDate),
  end: stamp(new Date(startDate.getTime() + launch.calendarHours * 3600000)),
};

export const googleCalendarUrl =
  'https://calendar.google.com/calendar/render?' +
  new URLSearchParams({
    action: 'TEMPLATE',
    text: launch.calendar.summary,
    dates: `${launchTimes.start}/${launchTimes.end}`,
    details: `${launch.calendar.description}\n\nhttps://woguild.org/launch`,
    location: launch.calendar.location,
  }).toString();
