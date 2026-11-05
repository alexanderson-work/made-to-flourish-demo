# Made To Flourish: demo site

The 2026 Experience Made to Flourish event site (Home and RSVP), built in [Astro](https://astro.build) from the
Made To Flourish design system. It shows how the system's tokens, components, sections and motion become a working
site, and it's a starting point for new pages or new event sites.

The pages carry `noindex, nofollow`, so search engines leave the demo alone.

## Run it

Needs Node 22.12 or later.

```bash
npm install
cp .env.example .env   # then fill in the contact details
npm run dev            # http://localhost:4321
npm run build          # static site in dist/
```

## What's where

| Path | What it is |
|---|---|
| `src/data/` | All the copy: event details, speakers and their bios, schedule, stories, FAQs. Edit content here. |
| `src/sections/` | One file per section of the design system: Hero, Invitation, Speakers, Feature on Photo, Highlights, Schedule, Stories, FAQ, Contact Band, RSVP Form |
| `src/components/` | One file per design-system component: Button, Tag, Speaker Card and Modal, FAQ Item, Schedule Day, Feature Card, Header, Footer, Photo Strip and more |
| `src/pages/` | The two pages, `/` and `/register`, stacked from sections |
| `src/layouts/Base.astro` | The page shell, page changes (client router) and the small scripts: motion, speaker modals, carousels, form states |
| `src/styles/` | `tokens.css` and `components.css` copied unchanged from the design system package; `site.css` holds the two lines specific to this build; `fonts.css` loads the brand fonts |
| `src/assets/` | Photos and artwork. Astro resizes them and converts them to WebP when it builds. |
| `src/assets/fonts/` | Tiempos Text Regular Italic and GT Pressura Light (web files), loaded by `src/styles/fonts.css` |

## The design system

This site follows the **Made To Flourish — Design System** Figma file and its handoff package (`DESIGN-SYSTEM.md`,
`tokens.css`, `components.css`). When the system changes, copy the new `tokens.css` and `components.css` into
`src/styles/` and keep `site.css` small. New pages start from the Header and Footer and stack sections; keep one `h1`
per page.

## Motion

The site uses the system's motion language (the Figma file's Motion page and the guide's Motion section): the hero
settles on load, titles rise word by word out of a soft blur, cards, panels and markers enter once as they scroll into
view, florals drift with the scroll, and hovers use soft springs. In markup:

- `data-reveal="words"` on a heading or short line, `data-reveal="block"` on body copy;
- `class="mtf-appear"` (rise), plus `mtf-appear--slide`, `mtf-appear--grow` or `mtf-appear--pop`, with
  `style="--delay: 0.2s"` to stagger;
- `<Floral … parallax />` for florals that drift.

With reduced motion turned on, everything shows in place without movement.

**Page changes.** Astro's client router (`<ClientRouter />` in `src/layouts/Base.astro`) keeps the header on screen
(`transition:persist` in `src/components/Header.astro`): the page content fades out (0.2 s) and the new page fades in
(0.4 s) under it, with the header's blur live throughout. Links are
loaded on hover, so pages change almost at once. A link to a section of another page (e.g. RSVP → Speakers) lands on
that section under the fade instead of scrolling down from the top. Because the page itself never reloads, the page
scripts in `Base.astro` sit in one `init()` that runs for each page and is cleaned up before the next; put new page
behavior there.

## Content and assets

- **Photos** are from the 2026 event and are here as references and examples. A new event should use its own
  photography; replace the files in `src/assets/photos/` and `src/assets/speakers/` and update `src/data/media.ts`.
- **Artwork** (hero illustration, title card, florals) matches the Figma file's Visuals page.
- **Fonts** are licensed to Made to Flourish by Klim Type Foundry (Tiempos Text) and Grilli Type (GT Pressura). Use
  them within those licenses.
- **Contact details** come from three environment variables (`PUBLIC_CONTACT_NAME`, `PUBLIC_CONTACT_EMAIL`,
  `PUBLIC_CONTACT_PHONE`); the site shows placeholders without them.

## RSVP form

The form is front end only: it checks required fields and shows the sending and thank-you states, but sends nothing.
Connect it to a form service, or a serverless function on your host, before using it for real RSVPs.

## Deploy

- **Vercel:** import the repository (it detects Astro), add the three contact variables under Settings → Environment
  Variables, and deploy. Every push then deploys, and each branch gets its own preview link.
- **Any static host:** run `npm run build` and upload `dist/`.
