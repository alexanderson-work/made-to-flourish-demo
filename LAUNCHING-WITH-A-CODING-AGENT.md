# Launching a new event site with a coding agent

How to build the next Made to Flourish event site (new dates, speakers, venue, schedule) from the **Made To Flourish —
Design System** Figma file with an AI coding agent such as Claude Code. It's written for the person briefing the agent
and for the agent itself.

All you need is the Figma file, the brand fonts, your new content and a coding agent. This guide carries the
rest:
- the recommended setup;
- how to turn the Figma file into code;
- the exact values that are easy to get wrong;
- every problem we hit building the 2026 site in code, with its fix.

Your agent can avoid all of them from the start.

> **Optional extras.** If you also received the 2026 demo site's code repository (`made-to-flourish-demo`) or the
> design system's code package (`DESIGN-SYSTEM.md`, `tokens.css`, `components.css`), give them to your agent as a
> working reference: they are this system already in code. Nothing below depends on them.

---

## 1. What you need

- **The Figma file** — *Made To Flourish — Design System*. Your agent should read it directly through **Figma's MCP
  server** (set it up in your agent; it gives the agent the file's variables, layouts, screenshots and motion). Without
  it, export the assets in 4.3 by hand and give the agent screenshots of the pages it needs.
- **The brand fonts as web files (WOFF2):** Tiempos Text Regular Italic (Klim Type Foundry) and GT Pressura Light (Grilli
  Type). They come in the fonts folder delivered with the design system and are licensed to Made to Flourish: use them
  within those licenses, and keep your code repository private if the license requires it.
- **The new content,** gathered in one document or folder: event name, dates, venue, city, invitation copy, speakers
  (names, titles, bios, headshots), venue and second-feature copy and photos, highlights, schedule, stories, FAQs, the
  contact person, and the photos for the three photo strips.
- **Somewhere to put the code and the site:** a GitHub repository and a Vercel account (or any static host).

## 2. Briefing the agent

A good opening prompt:

```text
We're building the [year] Made to Flourish event site from our Figma design system. Read
LAUNCHING-WITH-A-CODING-AGENT.md first and follow it. The Figma file is [link]: start with its Start Here page, then
Foundations, Components, Sections, the Home and RSVP 1:1 pages, and the Motion page. Build it in Astro as section 3
describes. The new content is in [document or folder]; the fonts are in [folder]. Work in the steps of section 4 and
show me screenshots at 1200, 810 and 390 px wide after each step. Avoid every problem in section 5 from the start.
```

Then work in small steps:
1. the foundation (tokens, fonts, header, footer);
2. the sections;
3. the content and photos;
4. motion and page changes;
5. the form;
6. the checks.

Review screenshots after each step.

## 3. Recommended setup: Astro

**Why Astro:**
- **Static output:** fast pages, nothing to run on a server, hosts anywhere.
- **Matches Figma:** one component file per Figma component and one per Figma section, so the code mirrors the file.
- **Images:** optimized at build time (resized, converted to WebP) from files kept in the repository.
- **Persistent header:** its client router keeps the header on screen between pages (see 5.3).
- **Plain CSS:** the design system's CSS custom properties need no styling framework.

**Setup:** Node 22.12 or later. `npm create astro@latest` (empty template), then `npm run dev` and `npm run build`.

**Suggested structure** (the 2026 site used it, and the rest of this guide refers to it):

| Path | What goes there |
|---|---|
| `src/styles/tokens.css` | The Figma variables as CSS custom properties (`--mtf-…`), with the Tablet and Phone values in media queries |
| `src/styles/components.css` | The styles for every component and section, built only from tokens |
| `src/styles/fonts.css` | The two `@font-face` rules (see 5.1) |
| `src/styles/site.css` | The few lines specific to one build; keep it tiny |
| `src/components/` | One file per Figma component: Button, Tag, Icon Link, Speaker Card, Speaker Modal, Feature Card, FAQ Item, Schedule Day, Photo Strip, Header, Footer, Floral, Photo… |
| `src/sections/` | One file per Figma section: Hero, Invitation, Speakers, Feature on Photo, Highlights, Schedule, Stories, FAQ, Contact Band, RSVP Form |
| `src/pages/` | `index.astro` (Home) and `register.astro` (RSVP), each a stack of sections |
| `src/data/` | All the copy (`site.ts`) and speakers (`speakers.ts`), plus `media.ts` importing every image |
| `src/assets/` | Fonts, artwork, photos and headshots (so the build optimizes and versions them) |
| `src/layouts/Base.astro` | The page shell (head, skip link, header, main, footer) and all page behavior (see 5.3) |
| `public/` | Only the favicon and the link-preview image |

**Hosting on Vercel:** import the repository (it detects Astro), add any environment variables, deploy. Every push
then deploys, and every branch gets a preview link.

## 4. From the Figma file to code

### 4.1 Read the file in this order

| Figma page | What the agent takes from it |
|---|---|
| Start Here | The rules of the system and how the file is organized |
| Foundations | Color, type, spacing and layout **variables** with Desktop / Tablet / Phone modes → `tokens.css`; the 11 **text styles** (Heading 1–6, Body Display, Body, Buttons & Links, Buttons & Links Small, Field) |
| Visuals | The artwork to export (4.3) |
| Components | Every component and its variants (states, sizes, Floral and Breakpoint on the Feature Card) → `src/components/` |
| Sections | Every section at Desktop and Phone (Invitation also at Tablet) → `src/sections/` |
| Home — 1:1, RSVP — 1:1 | The finished pages at 1200, 810 and 390 px wide: **the reference to match** |
| Motion | Every motion with its values, playable samples, and reusable animation styles (see 6.2) |
| Page Starter | The shell for a new page |

### 4.2 Rules for turning it into code

- **Tokens first.** Turn the variables into CSS custom properties. The Desktop mode is the default; Tablet values go in
  `@media (max-width: 1199.98px)` and Phone values in `@media (max-width: 809.98px)`. Everything else uses only these
  tokens: no hardcoded colors or sizes.
- **Breakpoints, exactly:** Desktop ≥ 1200 px, Tablet 810–1199.98 px, Phone ≤ 809.98 px (desktop-first).
- **Names from Figma.** Name components, sections and classes after their Figma names (a prefix such as `mtf-` keeps
  them apart from anything else).
- **Match the 1:1 pages** at 1200, 810 and 390 px before calling a section done. The 2026 build matched the original
  page heights within about 25 px.
- **Copy text from the content, not from Figma.** The Figma text is the 2026 content.

### 4.3 Export these assets from the Visuals page

| Asset | Export | Notes |
|---|---|---|
| Logo / Wordmark | SVG | Drawn inline in the header (see 5.1) |
| Lockup / Title Card with Lilies | PNG, 2× or larger | The hero title card ("Experience Made to Flourish"). It's artwork: a new event name needs new artwork |
| Illustration / Hero Background | JPG or WebP, about 2400 px wide | The hero's cover background; serve a 1200 px version to phones |
| Floral / Lilies Tall, Lilies Wide, Daffodils | PNG with transparency, 3× | **Export the whole component frame, including its transparent margin. Don't trim it**: every floral size and position (6.3) is measured against these frames |
| Icons | SVG | Close, Plus, Arrow Right, Chevron Right, Chevron Down, Calendar |

The photos on the Visuals page are the 2026 event's, kept as references only. Use the new event's photography.

## 5. Problems we hit, and how to avoid them

Each of these happened while building the 2026 site in code. Build the fixes in from the start.

### 5.1 Fonts and the first frame

- **The nav text jumped on every page load.**
  - Symptom: the first frame showed the nav in a plain fallback font, wider and about 80 px off, then it snapped to GT
    Pressura.
  - Cause: the font files sat in `public/`, which Vercel serves with "re-check on every visit" caching, so the first
    frame was drawn before they came back. `font-display: swap` then painted the fallback.
  - Fix: keep the fonts in `src/assets/fonts/` so the build gives them versioned names that are cached for good. Wait
    for them with `font-display: block`, and preload the built files.

  ```css
  /* src/styles/fonts.css */
  @font-face { font-family: "Tiempos Text"; font-style: italic; font-weight: 400; font-display: block;
               src: url("../assets/fonts/tiempos-text-regular-italic.woff2") format("woff2"); }
  @font-face { font-family: "GT Pressura"; font-style: normal; font-weight: 300; font-display: block;
               src: url("../assets/fonts/gt-pressura-light.woff2") format("woff2"); }
  ```

  ```astro
  ---
  // src/layouts/Base.astro (frontmatter)
  import tiemposItalic from '../assets/fonts/tiempos-text-regular-italic.woff2?url';
  import gtPressura from '../assets/fonts/gt-pressura-light.woff2?url';
  ---
  <link rel="preload" href={tiemposItalic} as="font" type="font/woff2" crossorigin />
  <link rel="preload" href={gtPressura} as="font" type="font/woff2" crossorigin />
  ```

- **The logo popped in a frame late** as a separate image. Draw the header wordmark inline:
  `import logo from '../assets/logo-wordmark-white.svg?raw'`, then `<Fragment set:html={logo} />` inside the logo link
  (add `aria-hidden="true"` to the SVG; the link carries the label).
- **Rule:** anything on the first screen (fonts, logo, hero images) goes through the build, never `public/`.

### 5.2 Motion

The motion values are on the Figma file's Motion page and in 6.2. These are the parts that needed care in code:

- **Turn motion on only when JavaScript runs.** An inline script in `<head>` adds a class (`mtf-motion`) to `<html>`,
  and the entrance styles apply only under it. Without JavaScript, everything shows.
- **Start entrances once the page is ready.** Reveals that started during the first paint looked like text changing
  as the page loaded. Wait for the fonts (at most 1 s) and two frames, then start everything together. Add a class
  (`mtf-ready`) that also releases the hero's CSS animations, which stay paused until then:

  ```js
  Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1000))])
    .then(() => requestAnimationFrame(() => requestAnimationFrame(start)));
  // start(): create the IntersectionObserver for entrances, then
  // document.documentElement.classList.add('mtf-ready');
  ```

  ```css
  :root.mtf-motion:not(.mtf-ready) .mtf-hero::before,
  :root.mtf-motion:not(.mtf-ready) .mtf-hero > * { animation-play-state: paused; }
  ```

- **Reveal titles word by word, small multi-line text as one block.** Word by word, the three-line event details and
  the contact line flickered. Titles: word reveal. Body copy, event details, contact line: block reveal.
- **Give each revealed word room for italic letters.**
  - Symptom: while fading in, the P of "RSVP" and the w of "Now" were clipped flat, then filled in.
  - Cause: each word animates as its own box, and Tiempos Italic reaches up to 0.15 em past it.
  - Fix: padding cancelled by a negative margin, so spacing doesn't change:

  ```css
  .mtf-word { display: inline-block; padding: 0.1em 0.2em; margin: -0.1em -0.2em; }
  ```

- **Hide word-reveal text until it's split into words**, or it flashes in full first:
  `:root.mtf-motion [data-reveal="words"]:not(.mtf-split) { visibility: hidden; }`.
- **Reduced motion:** with "reduce motion" on, show everything in place, with no parallax and no hero settle. Test it.
- **Parallax florals** move by an inline `translate` set on scroll, centered on their section (zero when the section is
  mid-screen). Don't put other transforms or animations on the same element.
- **Springs:** the 2026 site used spring easing. CSS can't do springs natively, so use the `linear()` curves in 6.2;
  they were sampled from the original springs.

### 5.3 Moving between pages

The header should stay perfectly still between Home and RSVP. Use Astro's client router: `<ClientRouter />` (from
`astro:transitions`) in the head, and `transition:persist="site-header"` on the `<header>`. Then handle these, all of
which caught us:

- **Page scripts run only once with the router.** Put all page behavior (entrances, parallax, speaker bios, carousels,
  form) in one `init()` that returns a cleanup function. Run it at load and again after each page change. Use an
  AbortController for window listeners and disconnect observers in the cleanup:

  ```js
  let cleanup = init();
  document.addEventListener('astro:before-swap', () => cleanup());
  document.addEventListener('astro:after-swap', () => { cleanup = init(); });
  ```

- **The router resets `<html>`'s classes on every page change,** which switched motion off. Re-add the motion class
  from the inline head script:
  `document.addEventListener('astro:after-swap', () => document.documentElement.classList.add('mtf-motion'))`.
- **The kept header keeps the old page's "current page" marking.** Set `aria-current="page"` on the right header link
  in `init()`.
- **Don't use the browser's built-in page cross-fade under a blurred header.**
  - Symptom: the hero showed sharp through the nav for a moment, then the blur popped in.
  - Cause: the cross-fade animates pictures of the pages, and those pictures leave out the header's
    `backdrop-filter`.
  - Fix: set `<html transition:animate="none">`, skip the browser transition in `astro:before-swap`
    (`e.viewTransition.ready.catch(() => {}); e.viewTransition.skipTransition();`), and fade the content yourself:
    fade `main` and the footer out (0.2 s) in an `astro:before-preparation` loader wrapper, and in (0.4 s) on
    `astro:after-swap`. The header stays live the whole time.
- **Section links from another page scrolled the whole page.**
  - Symptom: RSVP → Speakers loaded Home at the top, then smooth-scrolled through it.
  - Fix: in `astro:before-swap`, wrap `e.swap` to set `scroll-behavior: auto` on `<html>` right after the swap. Remove
    it two frames after `astro:after-swap`. Same-page links still scroll smoothly.
- **Fixed header and anchors:** give section targets `scroll-margin-top` equal to the header height (90 px on desktop),
  so headings don't land under the header.
- **Prefetch on hover** (`prefetch: { prefetchAll: true, defaultStrategy: 'hover' }` in `astro.config.mjs`), so pages
  change almost instantly.

### 5.4 Images

- **Use one `Photo` component built on Astro's image pipeline for every photo.**
  - Cap the generated widths at the source width.
  - Compute the height from the aspect ratio yourself: with `inferSize`, `getImage` returned a distorted height when
    only a width was given.
  - Without the cap, responsive `<Image>` shipped full-size fallback files.
- **Background images** (hero, feature photos): generate the URL with `getImage({ src, width, height, format: 'webp' })`,
  with the height computed from the aspect ratio, and pass it in a CSS custom property. Serve a smaller file to phones.
- **Headshots need a focus point.**
  - Why: card and bio photos are cropped to fill, and a centered crop cut off heads. Card photo: 240 px tall on
    desktop and tablet, 1.43:1 on phones. Bio photo: 360 × 366 on desktop, 300 px tall on phones.
  - How: store an `object-position` per speaker and photo, applied through a custom property:

    ```css
    .mtf-speaker-card img, .mtf-modal__inner img { object-fit: cover; object-position: var(--mtf-photo-focus, 50% 50%); }
    ```

    ```astro
    <img … style="--mtf-photo-focus: 46% 10%" />
    ```

    Portrait headshots usually want about 50% across and 10–25% down.
  - Check: every speaker at 1200 and 390 px, card and bio.
- **Photo strips:** every tile is 5:4 (400 × 320 at 1200 px, 270 × 216 at 810, 195 × 156 at 390), in a horizontally
  scrolling row with Previous and Next arrows. Put the arrows **outside** the scrolling element; inside it, they
  scrolled away with the photos. Hide each arrow at its end.

### 5.5 Florals

- **Measure against the exported frames** (4.3), transparent margin included. The 2026 code first used trimmed
  exports and every floral landed off and uncropped.
- **Use the CSS in 6.3:** it holds the size, position, turn and crop for each section and breakpoint, taken from the
  2026 site and matched by the Figma file.
- **Clip florals where the design does:**
  - the Feature Card (venue and stadium) cuts its floral at the card edge;
  - the Stories panel cuts its floral at the panel edge;
  - sections clip their own.

  Without this, florals spilled out of the card and the panel.
- **The stadium card's daffodils** are turned 75° and cropped to a 264 × 268 box. On phones the card's floral moves
  (right −138, top −115).
- **New artwork:** place it in the Figma file first, then measure from there.

### 5.6 Hosting, content and privacy

- Set `site` in `astro.config.mjs` to the real domain: canonical links and link-preview URLs are built from it.
- **Contact details** (name, email, phone) go in environment variables (`PUBLIC_CONTACT_NAME`, `PUBLIC_CONTACT_EMAIL`,
  `PUBLIC_CONTACT_PHONE`), never in the repository. Set them in the host too. `PUBLIC_` variables are baked in at
  build time, so redeploy after changing them.
- Files in `public/` are re-checked with the server on every visit on Vercel; files that go through the build are
  cached for good (see 5.1).
- The **RSVP form** needs somewhere to send: a form service or a serverless function on your host. Build the required
  field checks, the sending state and the thank-you state; test it end to end.

### 5.7 Tooling notes for agents

- **`npx astro check` asks an interactive question** (to install `@astrojs/check`) and hangs an agent. Use
  `npm run build` as the check, or install `@astrojs/check` and `typescript` first.
- **`astro preview` runs in the background in Astro 7** and moves to the next free port (4322) when 4321 is taken.
  Stop it with `npx astro preview stop`.
- **Headless browsers miss some problems.** Headless Chromium didn't show three of the issues above:
  - the page cross-fade that dropped the header blur;
  - the clipped italic letters;
  - Safari's behavior on the iPhone.

  Automated screenshots are necessary but not enough. Have a person check on a Mac (Safari and Chrome) and an
  iPhone.

## 6. Reference values

### 6.1 Layout

- Content width: up to 1200 px, centered.
- Page margin: 60 px (Desktop and Tablet), 20 px (Phone).
- Section padding: 80 px top and bottom (Phone: 40 px).
- Section title to content: 64 px (Phone: 40 px).
- Header: fixed, 20 px padding top and bottom, page-margin padding left and right, the nav background color with a
  25 px backdrop blur. On phones only the wordmark and RSVP show.
- Hero top padding (clears the fixed header): 160 px (Phone: 140 px).
- Speaker grid: 4 per row on Desktop, 3 on Tablet, 1 on Phone, 24 px gaps.
- Feature card: 500 px wide (Tablet: 400 px; Phone: full width).
- Every value here is also a Figma variable. Prefer the variables.

### 6.2 Motion

| Motion | Where | Values |
|---|---|---|
| Hero entrance | Hero, on load | Illustration scale 1.2 → 1, soft spring 1.2 s; tag and title card fade in from 1.2, 0.2 s and 0.4 s later (spring bounce 0.2) |
| Word reveal | Section and highlight titles, in view, once | Each word: y 10 → 0, blur 10 px → 0, opacity 0 → 1, soft spring 1.2 s, 0.05 s between words |
| Block reveal | Body copy, event details, contact line | The same, with the whole block at once |
| Card rise | Speaker cards | y 150 → 0, opacity 0 → 1, spring 1.2 s (bounce 0.2) |
| Feature slide-in | Venue and stadium cards (florals ride along) | x −150 → 0, opacity 0 → 1, spring 1.2 s |
| Panel grow | FAQ items, Stories panel | Scale 0.5 → 1, y 50 → 0, opacity 0 → 1, spring 1.2 s |
| Diamond pop | Highlight markers | Scale 0.5 → 1, opacity 0 → 1, spring 1.2 s, 0.2 s apart |
| Parallax | Invitation, Speakers and Stories florals | Move an extra 10% of the scroll, centered on their section |
| Link hover | Nav and text links | Color to the 60% step, 0.4 s, `cubic-bezier(0.44, 0, 0.56, 1)` |
| Hover dim | Buttons, icon links, close buttons, carousel arrows | Opacity 0.6, hover spring 0.45 s |
| Speaker modal | "Learn More" | Modal y 150 → 0 and fade in, spring 1.2 s; backdrop (Deep Teal Shade at 80%) fades in |
| FAQ open | FAQ item | Answer height and fade, 0.4 s; plus turns to X, 0.3 s |
| Page change | Between pages | Header stays; content fades out 0.2 s, new page fades in 0.4 s (see 5.3) |

The springs as CSS easing curves:

```css
--ease-spring: linear(0, 0.034, 0.117, 0.225, 0.344, 0.46, 0.569, 0.666, 0.748, 0.817, 0.872, 0.916, 0.949, 0.973, 0.99, 1.002, 1.009, 1.013, 1.015, 1.015, 1.014, 1.013, 1.011, 1.009, 1.008, 1.006, 1.005, 1.003, 1.002, 1.002, 1.001, 1.001, 1); /* bounce 0.2: entrances */
--ease-spring-soft: linear(0, 0.079, 0.236, 0.403, 0.551, 0.671, 0.764, 0.833, 0.883, 0.919, 0.944, 0.962, 0.974, 0.983, 0.988, 0.992, 0.995, 0.997, 0.998, 0.998, 1); /* no bounce: text reveals, hero */
--ease-spring-hover: linear(0, 0.037, 0.127, 0.246, 0.374, 0.5, 0.616, 0.717, 0.801, 0.869, 0.922, 0.962, 0.99, 1.009, 1.02, 1.026, 1.028, 1.028, 1.025, 1.022, 1.019, 1.015, 1.012, 1.009, 1.006, 1.004, 1.002, 1.001, 1, 1, 0.999, 0.999, 1); /* bounce 0.25: hover dims */
```

### 6.3 Florals

Sizes are for the exported floral frames (4.3). Lilies Tall is 849 × 864, Lilies Wide 1040 × 864 and Daffodils
1275 × 864 in proportion. The floral sits behind the content (`z-index: 0`) and its section, card or panel clips it.
Turns are clockwise.

```css
.mtf-floral { position: absolute; z-index: 0; pointer-events: none; height: auto; transform: rotate(var(--floral-rotate, 0deg)); object-fit: cover; }
.mtf-floral img { width: 100%; height: 100%; object-fit: cover; }

/* Feature Card (venue: Lilies Tall; stadium: Daffodils). The card clips it. */
.mtf-feature-card { overflow: clip; }
.mtf-feature-card .mtf-floral { top: -105px; right: -98px; width: 264px; z-index: 2; }
.mtf-feature-card .mtf-floral--daffodils { top: -75px; right: -132px; height: 268px; --floral-rotate: 75deg; } /* cropped to the box */
@media (max-width: 809.98px) { .mtf-feature-card { width: 100%; } .mtf-feature-card .mtf-floral { top: -115px; right: -138px; } }

/* Invitation: Lilies Wide, off the lower right edge; top right on tablet and phone */
.mtf-invitation .mtf-floral { right: -211px; bottom: -114px; width: 461px; }
@media (max-width: 1199.98px) { .mtf-invitation .mtf-floral { top: 55px; bottom: auto; right: -103px; width: 253px; } }
@media (max-width: 809.98px) { .mtf-invitation .mtf-floral { top: 14px; right: -149px; width: 319px; } }

/* Speakers: Daffodils turned 150°, behind the grid, centered at 75% across and 42% down; phones: cropped, at the bottom */
.mtf-speakers .mtf-floral { left: calc(75.08% - 458.5px); top: calc(42.39% - 310.5px); width: 917px; --floral-rotate: 150deg; }
@media (max-width: 809.98px) { .mtf-speakers .mtf-floral { left: -128px; top: auto; bottom: 11px; width: calc(100% + 248px); height: 621px; --floral-rotate: 165deg; } }

/* Stories: Lilies Tall turned −90° at the panel's top right. The panel clips it. */
.mtf-stories { overflow: clip; }
.mtf-stories .mtf-floral { top: -91px; right: -71px; width: 282px; --floral-rotate: -90deg; }
@media (min-width: 810px) and (max-width: 1199.98px) { .mtf-stories .mtf-floral { top: -131px; right: -91px; } }
@media (max-width: 809.98px) { .mtf-stories .mtf-floral { top: -65px; right: -75px; width: 199px; } }

/* Contact Band: Daffodils turned −90° (phones −135°) at the right */
.mtf-contact .mtf-floral { right: -21px; top: 78px; width: 305px; --floral-rotate: -90deg; }
@media (max-width: 1199.98px) { .mtf-contact .mtf-floral { right: -10px; top: 62px; } }
@media (max-width: 809.98px) { .mtf-contact .mtf-floral { right: -105px; top: 52px; width: 217px; --floral-rotate: -135deg; } }

/* RSVP Form: Lilies Wide off the lower left; phones: small, turned −120°, top right */
.mtf-rsvp .mtf-floral { left: -102px; bottom: -193px; width: 520px; }
@media (max-width: 809.98px) { .mtf-rsvp .mtf-floral { left: auto; bottom: auto; right: -79px; top: 77px; width: 177px; --floral-rotate: -120deg; } }
```

## 7. Making the new event, step by step

Do these after the foundation and sections are built:

1. **Site address:** set `site` in `astro.config.mjs` to the new domain.
2. **Event basics:** event name, dates, venue, city, a one-sentence description (used for search and link previews),
   page titles, and the invitation copy.
3. **Search engines:** decide on purpose. The 2026 site was hidden from search (`<meta name="robots" content="noindex,
   nofollow">`) because the event was invitation-only. Leave it off for a public event.
4. **Hero:** the illustration and the title card (new artwork if the event name changes); the tag text ("By
   Exclusive Invitation Only").
5. **Speakers:** name, title, bio, headshot and a focus point each (5.4). Any number works.
6. **Venue and second feature:** copy, photo, a link if there is one, and the floral (Lilies Tall or Daffodils). Leave
   the second feature out if there isn't one.
7. **Photo strips:** photos that survive a 5:4 crop, with real `alt` text.
8. **Highlights, schedule, stories, FAQ.** Schedule times need a display time (`3:30pm`) and a 24-hour value
   (`15:30`) for the `<time datetime>` attribute.
9. **Navigation:** nav and footer links point at section ids (`/#speakers`, `/#venue`, `/#about`, `/#schedule`,
   `/#stories`). Keep the ids and the links in step.
10. **Contact:** the three environment variables (5.6).
11. **RSVP form:** connected, tested, with the right thank-you text.
12. **Favicon and link preview:** a 64 × 64 favicon and a 1200 × 630 link-preview image in `public/`, plus Open Graph
    and Twitter tags in the page head.

## 8. House rules for the agent

- **The Figma file is the source of truth.** If the design needs to change, change it in Figma first, then in code.
  A new kind of section is designed in Figma from existing components.
- **No one-off styles:** tokens and component classes only; no hardcoded colors, sizes or new buttons. Keep
  `site.css` to the few lines specific to one build.
- **Structure:**
  - one `h1` per page (Home: the invitation title; RSVP: "RSVP Now");
  - landmarks: `header`, `nav`, `main`, `footer`;
  - a skip link to the main content;
  - meaningful `alt` text, and empty `alt` for florals and decorative images.
- **Copy:** US English. Use the client's words as given; don't rewrite them.
- **Privacy:** contact details and personal information in environment variables, never in the repository.

## 9. Checking the work

1. **Build:** `npm run build` with no errors or warnings.
2. **Screenshots at 1200, 810 and 390 px wide** of both pages, with reduced motion on so the layout is still. Compare
   with the Figma 1:1 pages.
3. **Motion:** load each page, scroll to the bottom, and confirm every animated element ends fully visible, with no
   errors in the browser console. Repeat with reduced motion.
4. **Interactions:**
   - speaker bios: open with the keyboard, close with Escape, the X and a click outside;
   - carousels: both arrows, hiding at the ends;
   - FAQ: opens and closes;
   - RSVP form: errors on empty fields, then the sending and thank-you states;
   - navigation: skip link, back and forward, and section links from the RSVP page.
5. **Page loads and changes:** record the screen while loading and moving between pages, then step through it frame
   by frame. The font jump and the header blur only showed up that way.
6. **Real devices:** Safari and Chrome on a Mac, Safari on an iPhone.
7. **Link preview:** paste the live link into a message or a preview tool to check the image, title and description.

## 10. Before launch

- [ ] `site` is the real domain, and the domain is connected in the host.
- [ ] Search engine setting decided on purpose.
- [ ] No leftover 2026 names, dates or photos (search the code for "2026").
- [ ] Every speaker has a focus point, checked at desktop and phone sizes.
- [ ] RSVP form connected and tested end to end.
- [ ] Contact variables set in the host; site redeployed after setting them.
- [ ] New link-preview image and favicon; link preview checked.
- [ ] The checks in section 9 passed, including real devices.
