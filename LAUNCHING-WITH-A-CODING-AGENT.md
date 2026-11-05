# Launching a new event site with a coding agent

How to build the next Made to Flourish event site (new dates, speakers, venue, schedule) from the design system with an
AI coding agent such as Claude Code. It's written for the person briefing the agent and for the agent itself. It covers
the workflow that produced the 2026 demo site and every problem we hit along the way, so your agent can avoid them
from the start.

**Recommended path:** start from the `made-to-flourish-demo` repository (Astro). It already implements the design
system, its motion and the fixes below. A new event is mostly new content and new photos, not new code.

**What the agent should read first, in this order:**

1. This file.
2. The repository's `README.md` (how it runs, where things live).
3. `DESIGN-SYSTEM.md` from the design system handoff package (the rules, tokens, components, sections, motion and
   acceptance checks).
4. The Figma file **Made To Flourish — Design System**, starting at its *Start Here* page, if the agent can read Figma
   (for example through Figma's MCP server). Its 1:1 pages show the 2026 site at 1200, 810 and 390 px wide.

---

## 1. Briefing the agent

Give the agent the content for the new event in one place: a document or folder with the event name, dates, venue,
city, invitation copy, speakers (names, titles, bios, headshots), the venue and second-feature copy and photos,
highlights, schedule, stories, FAQs and the contact person. The more complete the brief, the fewer guesses.

A good opening prompt:

```text
We're launching the [year] Made to Flourish event site from this repository. Read LAUNCHING-WITH-A-CODING-AGENT.md,
README.md and the design system's DESIGN-SYSTEM.md first. The new content is in [folder or document]. Replace the 2026
content and photos with it, following section 4 of LAUNCHING-WITH-A-CODING-AGENT.md step by step. Don't change
tokens.css or components.css. When you're done, run the checks in section 7 and show me screenshots at 1200, 810 and
390 px wide.
```

Then work in small steps: content first, then photos, then the form, then checks. Review screenshots after each step.

## 2. Why Astro

- **Static output:** fast pages, nothing to run on a server, and it hosts anywhere (Vercel, Netlify, any static
  host).
- **Matches Figma:** one Astro component per design-system component and one file per section, so the code mirrors
  the Figma file.
- **Images:** optimized at build time (resized, converted to WebP), from files kept in the repository.
- **Persistent header:** its client router keeps the header on screen between pages (see 5.3).
- **No framework lock-in for styling:** the design system's plain CSS (`tokens.css`, `components.css`) drops straight
  in.

## 3. Setup

- **Node:** 22.12 or later.
- **Commands:** `npm install`, then `npm run dev` (http://localhost:4321) and `npm run build` (static site in `dist/`).
- **Contact details:** copy `.env.example` to `.env` and fill in the contact person. These are environment variables
  so personal details never go into the repository. Set the same three variables in your host too.
- **Fonts:** Tiempos Text Regular Italic (Klim Type Foundry) and GT Pressura Light (Grilli Type) are in
  `src/assets/fonts/`. They are licensed to Made to Flourish: use them within those licenses, and keep the repository
  private if the license requires it.
- **Hosting on Vercel:** import the repository (it detects Astro), add the three contact variables under Settings →
  Environment Variables, and deploy. Every push then deploys, and every branch gets a preview link.
  Variables starting with `PUBLIC_` are baked in at build time, so redeploy after changing them.

## 4. Making the new event, step by step

Where things live: copy in `src/data/` (`site.ts`, `speakers.ts`), images in `src/assets/` (wired up in
`src/data/media.ts`), sections in `src/sections/`, components in `src/components/`, the page shell and page behavior
in `src/layouts/Base.astro`.

1. **Site address.** Set `site` in `astro.config.mjs` to the new domain. Canonical links and link-preview URLs are
   built from it; leaving the demo address there sends previews to the wrong site.
2. **Event basics.** In `src/data/site.ts`: `event` (name, dates, venue, city, the description used for search and
   link previews), then `invitation` (the welcome paragraphs). The RSVP page title is set in `src/pages/register.astro`.
3. **Search engines.** The demo carries `noindex, nofollow` (in `Base.astro`). The 2026 site was hidden from search too,
   since the event was invitation-only. Decide on purpose: remove that meta tag for a public event.
4. **Hero.** The illustration and the title card ("Experience Made to Flourish" with lilies) are artwork in
   `src/assets/art/`. Keep them for the same event name; for a new name, export new artwork from the Figma file's
   Visuals page. The tag text ("By Exclusive Invitation Only") is in `src/sections/Hero.astro`.
5. **Speakers.** For each speaker:
   - add an entry to `src/data/speakers.ts` with `id`, `name`, `title` and `bio`;
   - add the photo to `src/assets/speakers/` and register it under the same `id` in `speakerPhotos` in
     `src/data/media.ts`;
   - set a `focus` point (see 5.4) so the face stays in frame.

   The grid shows 4 per row on desktop, 3 on tablet and 1 on phones; any number works.
6. **Venue and second feature.** The two "Feature on Photo" sections (2026: The Crossroads Hotel and Arrowhead
   Stadium) take their copy from `venue` and `stadium` in `site.ts` and their photos from `media.ts`. They are placed in
   `src/pages/index.astro`. Each card has a floral: `liliesTall` (default) or `daffodils` (turned and cropped, as on
   the stadium card). Use one of the two; other artwork needs new measurements (see 5.4). If there's no second
   feature, remove that section and its photo strip from `index.astro`.
7. **Photo strips.** Three carousels of event, venue and second-feature photos (`photos.gathering`,
   `photos.venueStrip` and `photos.stadiumStrip` in `media.ts`). Every tile is cropped 5:4, so choose photos that
   survive that crop. Write real `alt` text for each.
8. **Highlights, schedule, stories, FAQ.** All in `site.ts`. Schedule rows need both a display time (`'3:30pm'`) and a
   24-hour `datetime` (`'15:30'`) for the `<time>` element.
9. **Navigation.** `nav` and `footerNav` in `site.ts` link to sections by id (`/#speakers`, `/#venue`, `/#about`,
   `/#schedule`, `/#stories`). If you rename or remove a section, update both, so no link points at nothing.
10. **Contact.** The three `PUBLIC_CONTACT_*` environment variables (see 3).
11. **RSVP form.** The form checks required fields and shows the sending and thank-you states, but sends nothing.
    Connect it to a form service, or a serverless function on your host, in `src/sections/RsvpForm.astro` and the form
    code in `Base.astro`. Then change the thank-you text, which currently says the form doesn't send anything.
12. **Favicon and link preview.** `public/favicon.png` (64 × 64) and `public/social.png` (1200 × 630, the image shown
    when the link is shared). Make a new social image for the new event.
13. **Photos.** The 2026 photos in `src/assets/photos/` and `src/assets/speakers/` are references and examples only.
    Replace every one with the new event's photography.

## 5. Problems we hit, and how they're solved

Each of these happened while building the 2026 demo. The demo already has every fix. If your agent writes new code
or starts somewhere else, keep the fixes in place.

### 5.1 Fonts

- **The nav text jumped on every page load.**
  - Symptom: the first frame showed the nav in a plain fallback font, wider and about 80 px off; it snapped to GT
    Pressura a tenth of a second later.
  - Cause: font files in `public/` are served by Vercel with "re-check every time" caching, so the first frame painted
    before they came back. `font-display: swap` then drew the fallback.
  - Fix: keep the fonts in `src/assets/fonts/` so the build gives them versioned names that are cached for good. Use
    `font-display: block` in `src/styles/fonts.css`, and preload the built files (the `?url` imports in `Base.astro`).
- **The logo popped in a frame late.** It was a separate image. The header now draws the wordmark inline as SVG.
- **Rule of thumb:** anything visible on the first screen (fonts, logo) should be inlined or built, never left in
  `public/`.

### 5.2 Motion

The motion comes from the 2026 site (the guide's Motion section; the Figma file's Motion page). The pieces that needed
care in code:

- **Text reveals ran while the page was still drawing.** Entrances (and the hero settle) now wait until the fonts have
  loaded (at most 1 s) and the page has painted, then start together (`.mtf-ready` on `<html>`). Without this, the
  first screen reveals mid-paint or in a fallback font.
- **Small multi-line text flickered.** Revealed word by word, the three-line event details looked like the text was
  changing. Titles reveal word by word; body copy, the event details and the contact line reveal as one block
  (`data-reveal="block"`).
- **Italic letters were clipped while they faded in.**
  - Symptom: the P of "RSVP" and the w of "Now" were cut flat at the edge.
  - Cause: each word animates as its own box, and Tiempos Italic reaches up to 0.15 em past it.
  - Fix: `.mtf-word` has padding cancelled by a negative margin (in `components.css`). Spacing is unchanged; keep it.
- **Reduced motion.** With "reduce motion" on, everything shows in place, with no parallax. Test it.
- **Parallax florals** move by an inline `translate` set by the script. Don't put other transforms or animations on
  the same element.

### 5.3 Moving between pages

The header should never redraw or jump between Home and RSVP. The demo uses Astro's client router
(`<ClientRouter />` in `Base.astro`) with `transition:persist` on the header. Things that had to be solved:

- **Page scripts run only once with the router.** All page behavior lives in one `init()` in `Base.astro` (speaker
  bios, carousels, form, parallax, motion). It runs for each page and is cleaned up before the next. Add new
  behavior there, not in a separate script.
- **The router resets `<html>`'s classes**, which switched motion off after a page change. An inline script in the
  head adds the class back after every swap.
- **The kept header keeps the old page's "current page" marking.** `init()` updates it after each change.
- **The browser's built-in page cross-fade broke the header's blur.** It animates pictures of the pages, and those
  pictures leave out the header's backdrop blur, so the hero showed sharp through the nav for a moment. The demo
  turns that off: the content fades out (0.2 s) and the new page fades in (0.4 s) under the live header.
- **Section links from another page scrolled the whole page.** RSVP → Speakers loaded Home at the top and then
  smooth-scrolled through it. Now it lands on the section under the fade; same-page links still scroll smoothly.
- **Links load on hover** (`prefetch` in `astro.config.mjs`), so pages change almost instantly.

### 5.4 Images, headshots and florals

- **Use the `Photo` component (Astro's image pipeline) for every photo**, so images are resized and converted at
  build. Two traps it already handles:
  - with `inferSize`, Astro's `getImage` can return a distorted height when only a width is given;
  - responsive `<Image>` can ship a full-size fallback file.

  `Photo` caps widths and computes heights from the aspect ratio. Background images (hero, feature photos) go through
  `backgroundUrl()` in `src/lib/images.ts` for the same reason.
- **Headshots: set a focus point per speaker.**
  - Why: card and bio photos are cropped to fill (desktop card photo 240 px tall, phone card 1.43:1, bio photo 360 ×
    366 on desktop and 300 tall on phones), so a centered crop cuts off heads.
  - How: in `speakers.ts`, `focus: { card: '46% 10%', modal: '48% 15%' }`. It's a CSS `object-position`: across, then
    down. Portrait headshots usually want about 50% across and 10–25% down.
  - Check: every speaker at 1200 and 390 px, card and bio. The 2026 values are in `DESIGN-SYSTEM.md` (Speaker Card →
    Photo focus).
- **Florals are measured against their exact files.**
  - The floral images in `src/assets/art/` keep the transparent margin the 2026 site used, and every size, position,
    turn and crop in `components.css` is measured against those files.
  - Swapping in a trimmed export (or new artwork) puts them off, so use the files as they are. For new artwork, place
    it in Figma first, then re-measure.
  - The feature cards and the Stories panel clip their florals at their edges, as on the 2026 site. Don't remove that
    clipping.
- **Photo strips:** tiles are 5:4 at every width. The arrows sit outside the scrolling area; inside it, they scrolled
  away with the photos.

### 5.5 Hosting and caching

- Files in `public/` are re-checked with the server on every visit (on Vercel), while files that go through the build
  are cached for good. Put anything that matters for the first screen through the build (see 5.1).
- Set `site` in `astro.config.mjs` for the real domain (see 4.1).
- Environment variables starting with `PUBLIC_` are baked in at build: redeploy after changing them.

### 5.6 Tooling notes for agents

- **`npx astro check` asks an interactive question** (to install `@astrojs/check`) and hangs an agent. Use
  `npm run build` as the check, or install `@astrojs/check` and `typescript` first.
- **`astro preview` runs in the background in Astro 7** and moves to the next free port (4322) if 4321 is taken. Stop
  it with `npx astro preview stop`.
- **Headless browsers miss some problems.** Headless Chromium didn't show three of the issues above:
  - the page cross-fade that dropped the header blur;
  - the clipped italic letters;
  - Safari's behavior on the iPhone.

  Automated screenshots are necessary but not enough. Have a person check on a Mac (Safari and Chrome) and an iPhone.

## 6. House rules for the agent

- **Use the design system as it is.** Don't edit `src/styles/tokens.css` or `src/styles/components.css` in the site.
  If the system needs to change, change it in the design system package (and in Figma), then copy the new files in.
  Keep `src/styles/site.css` to the few lines specific to this build.
- **No one-off styles.** Use tokens (`var(--mtf-…)`) and the component classes: no hardcoded colors, sizes or new
  buttons. A new kind of section is designed in Figma first, from existing components.
- **Structure:** one `h1` per page (Home: "You are invited."; RSVP: "RSVP Now"), landmarks (`header`, `nav`, `main`,
  `footer`), the skip link, meaningful `alt` text (empty `alt` for florals and decorative images).
- **Copy:** US English. Use the client's words as given; don't rewrite them.
- **Privacy:** contact details and any personal information go in environment variables, never in the repository.
- **Breakpoints** are exactly those of the system: Desktop ≥ 1200 px, Tablet 810–1199.98 px, Phone ≤ 809.98 px.

## 7. Checking the work

Run these before calling anything done:

1. **Build:** `npm run build` with no errors or warnings.
2. **Screenshots at 1200, 810 and 390 px wide** of both pages, with reduced motion on, so the layout is still. Compare
   with the Figma 1:1 pages. The 2026 demo matched the live site's page heights within about 25 px.
3. **Motion:** load each page, scroll to the bottom, and confirm every animated element ends fully visible, with no
   errors in the browser console. Then repeat with reduced motion.
4. **Interactions:**
   - speaker bios: open with the keyboard, close with Escape, the X and a click outside;
   - carousels: both arrows, hiding at the ends;
   - FAQ: opens and closes;
   - RSVP form: errors on empty fields, then the sending and thank-you states;
   - navigation: skip link, back and forward, and section links from the RSVP page.
5. **Page loads and changes:** record the screen while loading and moving between pages, then step through it frame
   by frame. Problems like the font jump or the header blur showed up only that way.
6. **Real devices:** Safari and Chrome on a Mac, Safari on an iPhone.
7. **Link preview:** paste the live link into a message or a preview tool to check the social image, title and
   description.

## 8. Before launch

- [ ] `site` in `astro.config.mjs` is the real domain; the domain is connected in the host.
- [ ] Search engine setting decided (`noindex` kept or removed on purpose).
- [ ] Every 2026 photo, name and date replaced; no leftover 2026 copy (search the repository for "2026").
- [ ] Every speaker has a focus point, checked at desktop and phone sizes.
- [ ] RSVP form connected and tested end to end; thank-you text updated.
- [ ] Contact variables set in the host; site redeployed after setting them.
- [ ] New social image and favicon; link preview checked.
- [ ] Checks in section 7 passed, including real devices.
