# Discord setup

Step-by-step setup for the Werewolf Orgasmahowl Discord, so it's ready for the people the site sends there. Do it in the **Discord desktop app or discord.com in a browser**: onboarding can't be set up from the phone app. Plan on about an hour.

The site promises two steps (`applySteps` in `src/data/guild.ts`): **join the Discord and answer the welcome questions**, then **post in #applications**. This setup makes both true. If you rename #applications or change the questions, update the site copy in `src/data/guild.ts` and the launch checklist in `src/data/launch.ts` to match.

## What the welcome questions can and can't do

- **Can:** ask multiple-choice questions when someone joins, and give them roles from their answers: their class, their spec, how close they are to 39, their time zone. Those roles show on their profile in this server (click anyone's name to see them).
- **Can't:** take typed answers. Discord's join questions are multiple choice only.
- **Can't, ever:** write someone's **About me**. No server and no bot can edit another person's profile text. So "about you" goes in their post in #applications instead.

If you later want a form that also fills in their character name and an about card automatically, see [Optional: an application bot](#optional-an-application-bot) at the end.

---

## Step 1: Server basics (5 min)

1. Open the server, click the server name (top left) → **Server Settings** → **Overview**.
2. **Upload Image:** `brand-assets/discord/discord-server-icon-512.png`.
3. Keep the name **Werewolf Orgasmahowl**.

## Step 2: Create the roles (15 min)

**Server Settings** → **Roles** → **Create Role**, once per role below. Drag them into this order, top to bottom. Leave everything not listed at its default.

| Role | Color | Display separately | Notes |
|---|---|---|---|
| **Officer** | `#FF2E89` | On | Permissions: Manage Messages, Manage Threads, Manage Nicknames, Manage Roles, Kick Members, Timeout Members, Mention @everyone. |
| **Packmate** | `#FDEB91` | On | Guild members. Officers give it when an application is accepted. |
| **Applicant** | none | Off | From the welcome questions: "I want to join <WO>". |
| **Friend of the pack** | none | Off | From the welcome questions: "Just here to hang out". |
| **Level 39**, **Leveling** | none | Off | From "How close are you to 39?" |
| **Druid**, **Hunter**, **Mage**, **Priest**, **Rogue**, **Shaman**, **Warlock**, **Warrior** | none | Off | One role per class. |
| **Balance**, **Feral**, **Restoration**, **Beast Mastery**, **Marksmanship**, **Survival**, **Arcane**, **Fire**, **Frost**, **Discipline**, **Holy**, **Shadow**, **Assassination**, **Combat**, **Subtlety**, **Elemental**, **Enhancement**, **Affliction**, **Demonology**, **Destruction**, **Arms**, **Fury**, **Protection** | none | Off | One role per spec (23; Restoration covers Druid and Shaman). |
| **Eastern**, **Central**, **Mountain**, **Pacific**, **Other time zone** | none | Off | From the time zone question. |

The classes and specs are the eight Horde classes from classic World of Warcraft. If World of Warcraft Forever's list is different (Horde Paladins, for example), add or remove roles to match, here and in Step 5.

Only Officer and Packmate get colors, so names in chat show who's in the guild.

## Step 3: Create the channels (10 min)

Click **+** next to a category, or right-click the channel list → **Create Category**. The existing **General** voice channel stays.

| Category | Channel | Type | Who can post | Purpose |
|---|---|---|---|---|
| **START HERE** | #rules | Text | Officers only | Rules (draft below). |
| | #announcements | Text | Officers only | News. After Step 4, edit it and switch on **Announcement Channel**. |
| **THE PACK** | #general | Text | Everyone | Chat. |
| | #applications | **Forum** | Everyone | One post per applicant. Setup in Step 6. |
| | #launch-day | Text | Everyone | March 23, 8 PM ET: leveling progress, who's ready. |
| | #looking-for-group | Text | Everyone | "I'm on, who's queuing?" |
| | #gear-and-twinks | Text | Everyone | Gear and builds for the 39 bracket. |
| | #screenshots-and-clips | Text | Everyone | Brag here. |
| **VOICE** | General, Battleground 1, Battleground 2 | Voice | Everyone | Voice is optional, but fun. |
| **OFFICERS** | #officers, #mod-log | Text | Officers only | Private: in the category's **Permissions**, turn **View Channel** off for @everyone and on for Officer. |

For the officers-only text channels: open the channel's settings → **Permissions** → @everyone → turn **Send Messages** off, then add **Officer** with **Send Messages** on.

**Draft for #rules** (edit it to taste, then post it):

> **The rules of the pack**
> 1. Play to win, not to farm kills.
> 2. Back up your teammates.
> 3. Play to have fun, and let everyone else have fun too.
> 4. Be decent: no harassment, slurs or drama.
> 5. Keep it safe for work. Yes, even with that name.
> 6. No spam, and no ads for other servers.
>
> HAROOOO!

## Step 4: Turn on Community (5 min)

The welcome questions only exist on Community servers.

1. **Server Settings** → **Enable Community** → **Get Started**.
2. **Safety:** tick **Verified email required** and **Scan media content from all members**.
3. **Basics:** Rules channel **#rules**, Community Updates channel **#mod-log**.
4. **Finish:** set default notifications to **Only @mentions**, and tick **Remove moderation permissions from @everyone**. Agree and finish.
5. **Server Settings** → **Community** → **Overview** → **Server Description**:
   > Horde guild in World of Warcraft Forever (NA). Low-level battleground PvP. Recruiting Level 39, every class and spec.
6. **Server Settings** → **Safety Setup** (or **Moderation**) → raise **Verification Level** to **Medium** (registered on Discord for over 5 minutes). This stops most drive-by spam once you advertise.
7. Edit #announcements → switch on **Announcement Channel**.

## Step 5: The welcome questions (15 min)

**Server Settings** → **Onboarding**. Work through its sections, then switch it on.

**Default Channels.** Select all eight: #rules, #announcements, #general, #applications, #launch-day, #looking-for-group, #gear-and-twinks, #screenshots-and-clips. Discord wants a minimum number of default channels, several of which everyone can post in. This set should clear it; if Discord says you're short, it names what's missing.

**Questions.** Add these five. Each answer gives the role in brackets.

**1. What brings you to the pack?**
Single answer · Required · Ask before joining: **on**
- I want to join &lt;WO&gt; *(description: "Apply in #applications next")* → [Applicant]
- Just here to hang out *(description: "Friends, alts and the curious")* → [Friend of the pack]

**2. Which classes do you play?**
Multiple answers · Required · Ask before joining: **on**
- Druid → [Druid] · Hunter → [Hunter] · Mage → [Mage] · Priest → [Priest] · Rogue → [Rogue] · Shaman → [Shaman] · Warlock → [Warlock] · Warrior → [Warrior]

**3. What's your main spec?**
Single answer · Required · Ask before joining: **on**. Give each answer its class as the description, so people find theirs fast.

| Answer → role | Description |
|---|---|
| Balance, Feral | Druid |
| Restoration | Druid or Shaman |
| Beast Mastery, Marksmanship, Survival | Hunter |
| Arcane, Fire, Frost | Mage |
| Discipline, Holy, Shadow | Priest |
| Assassination, Combat, Subtlety | Rogue |
| Elemental, Enhancement | Shaman |
| Affliction, Demonology, Destruction | Warlock |
| Arms, Fury, Protection | Warrior |

That's 23 answers. If Discord won't take that many on one question, split it in two: "Druid, Hunter, Mage or Priest spec?" and "Rogue, Shaman, Warlock or Warrior spec?", both **not required** (people answer whichever fits).

**4. How close are you to 39?**
Single answer · Required · Ask before joining: **on** · Question description: "The first guild run is March 23, 8 PM ET."
- Already 39 → [Level 39]
- Leveling now → [Leveling]
- Haven't rolled yet → [Leveling]

**5. What's your time zone?**
Single answer · Not required · Ask before joining: **off** (it shows later under **Channels & Roles**)
- Eastern → [Eastern] · Central → [Central] · Mountain → [Mountain] · Pacific → [Pacific] · Somewhere else → [Other time zone]

**Server Guide.**
- **Welcome message:**
  > Welcome to Werewolf Orgasmahowl! We're a Horde guild in World of Warcraft Forever (NA), here for low-level battlegrounds and nothing else. To join, post in #applications. First guild run: March 23, 8 PM ET. HAROOOO!
- **New member to-dos:**
  1. Apply in #applications: "Your character name, class, spec and a bit about you."
  2. Read the rules: #rules.
  3. Say hello in #general.
  4. Get launch ready: #launch-day.
- **Resource pages:** add #rules.

Click **Preview** to walk through it as a new member, then **Enable**.

## Step 6: Set up #applications (5 min)

Open the #applications forum's settings:

1. **Post Guidelines** (shown to everyone when they start a post):
   > Title your post with your character name, then copy this in and fill it out:
   >
   > **Character name:**
   > **Class and spec:**
   > **Level** (or "not rolled yet"):
   > **About you:** what you play, how you found us, anything else.
   >
   > Set your server nickname to your character name too, so we can find you in game.
2. **Tags:** add **New** and **Accepted**.
3. **Permissions:** @everyone can **Create Posts** and **Send Messages in Posts**.
4. **Default Reaction:** optional. A wolf or a flag works.

**When someone applies** (officers):
1. Reply in their post and say hi.
2. Give them **Packmate** and remove **Applicant** (right-click their name → **Roles**).
3. Guild-invite them in game.
4. Tag the post **Accepted**.

## Step 7: Safety for advertising (5 min)

**Server Settings** → **AutoMod**:
- Turn on **Block Mention Spam** and **Block Suspected Spam Content**.
- If you turn on **Block Commonly Flagged Words**, add `orgasmahowl*` to its **allowed words**. Its sexual-content list may otherwise block the guild's own name.
- Send alerts to **#mod-log**.

## Step 8: The launch event (2 min)

Click the server name → **Create Event**:
- **Where:** Somewhere Else → "World of Warcraft Forever: Level 39 battlegrounds".
- **Topic:** BLAST OFF: the first &lt;WO&gt; guild run.
- **Start:** March 23, 2027, 8:00 PM Eastern (Discord shows it in each person's own time).
- **Description:** paste the Discord shout from woguild.org/launch#spread.
- **Cover image:** `brand-assets/discord/discord-event-launch.png`.

Everyone who clicks **Interested** gets a ping when it starts. Post it in #announcements too.

## Step 9: The invite link (2 min)

The site's invite is `discord.gg/5BcZaaEhcG`: it opens **#general** and never expires. To replace it:

1. Right-click **#general** → **Invite People** → **Edit invite link**: Expire after **Never**, Max uses **No limit**.
2. Put the new link in `discordUrl` in `src/data/guild.ts` and the `/discord` redirect in `vercel.json`, together.
3. Once that's live, revoke the old invite: **Server Settings** → **Invites**.

Share **woguild.org/discord** rather than the raw invite. If the invite ever changes, only the site needs updating.

## Step 10: Test it (5 min)

Join through **woguild.org/discord** with a second account (or ask a friend):
- [ ] The welcome questions appear before you get in.
- [ ] Click your name: Applicant, a class, a spec and a level role show on your profile.
- [ ] The server guide shows the welcome message and to-dos.
- [ ] Starting a post in #applications shows the template.
- [ ] Time zone shows up under **Channels & Roles**.

---

## Optional: an application bot

If you want character name and "about you" captured in the flow itself, a small custom bot can do it. An **Apply** button in #applications opens a form (character name, class, spec, level, about you). On submit, the bot:
- sets their server nickname to their character name,
- gives them the class, spec and Applicant roles,
- posts a tidy application card in #applications.

It still can't write their profile's About me (nobody can). It runs on the site's Vercel project. It needs a Discord developer app, which you create in the Discord Developer Portal, plus two secrets stored in Vercel. Not needed for launch. Ask if you want it.
