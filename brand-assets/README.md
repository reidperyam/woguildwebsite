# Brand assets

Ready-to-use files for Werewolf Orgasmahowl. The brand rules are in [../BRAND.md](../BRAND.md).

| Color | Hex | Use |
|---|---|---|
| Ground | `#000000` | Backgrounds, and text on Accent or Signal |
| Ink | `#FFFFFF` | Text and rules on Ground |
| Accent | `#FF2E89` | The name, headlines, primary buttons, icons |
| Signal | `#FDEB91` | Status and alerts only |

Type: [Martian Mono](https://fonts.google.com/specimen/Martian+Mono), weight 800.

## Discord

| File | What it is |
|---|---|
| `discord/discord-server-icon-512.png` | **Upload this one.** Server icon, 512×512 PNG (Discord's recommended size; minimum 128×128). |
| `discord/discord-server-icon-1024.png` | The same icon at 1024×1024, for extra-sharp displays or other uses. |
| `discord/discord-server-icon-preview.png` | How it looks once Discord crops it to a circle, at 512, 128 and 48 px (sidebar size). |
| `discord/discord-server-icon.html` | The source. Open it in a browser to see the icon; edit it to change the design. |
| `discord/discord-event-launch.png` | **Cover image for the launch event**, 1600×800 (2x of Discord's 800×400). Everything that matters sits in the middle 2.5:1 band, since the event card crops the top and bottom. It bakes in the date and time. |
| `discord/discord-event-launch.html` | Its source. Redraw with `node brand-assets/discord/render.mjs`. |

The icon is the WO monogram on Accent: black letters in a square black frame. Discord crops server icons to a circle, so the square frame sits inside the circle and nothing important touches the corners.

To set it: Discord → your server → **Server Settings** → **Overview** → **Upload Image**.

Setting up the rest of the server (roles, channels, the welcome questions): [../DISCORD.md](../DISCORD.md).

## Link previews

`og/` holds the HTML sources for the 1200×630 images that show when a page is shared on Discord, Reddit, X and so on: one `og-*.html` per page, rendered to `public/og-*.png`.

| File | Page |
|---|---|
| `og/og-home.html` | `/` (also the fallback for pages without their own) |
| `og/og-recruitment.html` | `/recruitment` |
| `og/og-launch.html` | `/launch` |
| `og/og-lore.html` | `/lore`, in the Cathedral sub-theme |
| `og/og-bearwolftriceratiger.html` | `/bearwolftriceratiger`, in the Storm sub-theme |
| `og/og-howl-lab.html` | `/howl-lab` |
| `og/og-archive.html` | `/archive`, in the Vault sub-theme |

To redraw after editing a source: `node brand-assets/og/render.mjs` (all) or `node brand-assets/og/render.mjs og-launch` (one). It uses headless Chrome (set `CHROME` if it isn't in the default Windows spot) and needs a network connection for Google Fonts. Discord caches previews, so a changed image can take a while to show on links already posted.

## Logos

| File | What it is |
|---|---|
| `logos/w-mark.svg` | The W mark used as the site favicon (black W on Accent). Vector, scales to any size. |
