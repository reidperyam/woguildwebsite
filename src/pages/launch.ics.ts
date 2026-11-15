// /launch.ics: the launch as an all-day calendar event (Apple Calendar, Outlook, and Google via import).
// Built once at build time, like every other page. Copy lives in src/data/launch.ts.
import type { APIRoute } from 'astro';
import { launch, launchDays } from '../data/launch';

// iCalendar text: escape \ ; , and newlines, and fold lines at 75 octets.
const text = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
const fold = (line: string) => {
  const parts: string[] = [];
  const bytes = new TextEncoder().encode(line);
  let start = 0;
  while (start < bytes.length) {
    let end = Math.min(start + (start === 0 ? 75 : 74), bytes.length);
    while (end < bytes.length && (bytes[end] & 0xc0) === 0x80) end--; // never split a UTF-8 character
    parts.push(new TextDecoder().decode(bytes.slice(start, end)));
    start = end;
  }
  return parts.join('\r\n ');
};

export const GET: APIRoute = () => {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Werewolf Orgasmahowl//Launch//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:launch-${launchDays.start}@woguild.org`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${launchDays.start}`,
    `DTEND;VALUE=DATE:${launchDays.end}`,
    `SUMMARY:${text(launch.calendar.summary)}`,
    `DESCRIPTION:${text(launch.calendar.description)}`,
    `LOCATION:${text(launch.calendar.location)}`,
    `URL:https://woguild.org${launch.path}`,
    'TRANSP:TRANSPARENT',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return new Response(lines.map(fold).join('\r\n') + '\r\n', {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
};
