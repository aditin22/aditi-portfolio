# Aditi Navhal - Portfolio

**Live:** https://aditin22.github.io/aditi-portfolio/

A single-page portfolio for a .NET + React full-stack engineer, built to be looked
at as much as read: the numbers are drawn, the systems are diagrammed, and the
toolkit is a thing you can spin.

## Stack

| | |
|---|---|
| Build | Vite 6 + TypeScript (strict) |
| UI | React 18 |
| Styling | Tailwind CSS 3 over CSS custom properties |
| Motion | Framer Motion |
| Diagrams | React Flow (`@xyflow/react`) |
| Icons | lucide-react |
| State | Zustand (theme only) |

## Running it

```bash
npm install
npm run dev
```

`npm run build` type-checks and emits to `dist/`; `npm run preview` serves that build.

## Deploying

```bash
npm run deploy
```

Builds and force-pushes `dist/` to the `gh-pages` branch, which Pages serves at
the root. The branch only ever holds the current build - the source history on
`main` is never touched.

`vite.config.ts` sets `base` to `/aditi-portfolio/` for production builds only,
so assets resolve under the project subpath while dev stays at `/`. Renaming the
repo means changing that value too.

There is no Actions workflow because the local `gh` token has no `workflow`
scope. To move to CI deploys: `gh auth refresh -s workflow`, add
`.github/workflows/deploy.yml`, then switch the Pages source to "GitHub Actions".

## How it's put together

```
src/
  data/resume.ts        every piece of copy and every number, in one place
  store/theme.ts        dark/light, persisted, pre-painted in index.html
  store/diagram.ts      which architecture diagram is open; case studies set it
  components/
    Hero.tsx            gradient hero: headline left, rolling die right
    HeroCube.tsx        floating glass die, six faces of shipped work
    ParticleField.tsx   cursor-reactive constellation canvas
    WhatIBuild.tsx      three cards stating the professional identity
    FeaturedWork.tsx    the three case studies - problem, ownership, challenges, flows
    FlowChain.tsx       a pipeline as a row of steps (auth flow, payment flow, data path)
    Experience.tsx      scroll-drawn timeline, role summaries, links into case studies
    Impact.tsx          four animated charts (charts.tsx holds the primitives)
    Projects.tsx        cards led by ProjectGlyph.tsx animated diagrams
    Architecture.tsx    two React Flow system diagrams - drag and pan, zoom locked
    Skills.tsx          the stack, layer by layer, with where each was shipped
    About.tsx           credentials as a dial, a medal and a distribution curve
    Reveal.tsx          the scroll-entrance primitive everything else uses
```

Content lives entirely in `src/data/resume.ts`, including the three case studies. Editing a bullet, a metric or a
stack chip there updates every place it appears - no component holds copy.

### Design language

Taken from the reference site's own stylesheet rather than eyeballed:

| | |
|---|---|
| Hero | `linear-gradient(150deg, #2992c2, #16465c 70%, #0c2f3f 130%)`, `100dvh - 48px`, two 70px-blur orbs |
| Hero visual | A glass die: `perspective: 1150px`, faces at `translateZ(s/2)`, `14%` corner radius, float loop, blurred contact shadow. Faces are opaque panels, not clear glass - see below |
| Display type | Open Sans 800 on tight negative tracking (`-1.8px` h1, `-1.1px` h2) |
| Accent | `#a9e2ff` on the trailing clause of a heading; `#cfeeff` on the blue CTA |
| Tiles | 20px radius, `clamp(18px, 2.4vw, 30px)` padding, five hues with dark counterparts |
| Bands | `#16465c` mid-page; a deeper gradient closes the page (the flat accent blue glares at full-bleed) |
| Shell | 1120px max width, 24px gutters, 68px section rhythm |

### Theming

Colours are CSS custom properties defined on `:root` (light) and `html.dark`,
with Tailwind mapped onto them in `tailwind.config.js`. `index.html` sets the
`dark` class before first paint so nobody sees a light flash, and `store/theme.ts`
mirrors that logic - **the two must agree**, or the page paints one theme then
flips.

### Three things worth knowing before you edit

- **`Reveal` deliberately handles more than "is it visible".** An anchor jump can
  carry an element from below the fold to above it between two frames, so the
  observer never sees it intersect; and the bottom 12% trim that makes entrances
  fire early becomes a dead zone once the page can't scroll further. Both cases
  would strand content at `opacity: 0` permanently, so both are handled
  explicitly.

- **`HeroCube` opens with a quick tour.** Four rolls at 550ms, across both
  axes, starting 0.7s after the die is on screen - so a visitor sees it turn
  before deciding it's a flat card. It then settles to one roll every 3.6s. The
  pace switches when the tour's last roll is scheduled, but the duration one
  step later, so that roll still plays at tour speed.

- **`HeroCube` rolls by rotating the container, never the faces.** Faces stay at
  fixed positions on the die; the step table accumulates -360° per axis every six
  steps so it always turns the same way instead of snapping back. The caption
  trails the roll by `ROLL_MS` - naming a face before it has turned into view
  reads as a bug - and picking a face restarts the auto-advance timer, or the
  interval keeps its old phase and snatches the chosen face away. The faces are
  near-opaque with `backface-visibility: hidden`: as clear glass the far faces
  showed through their own front and every mockup turned to noise.

- **Never `import * as Icons from 'lucide-react'`.** A namespace import defeats
  tree-shaking and drags the whole icon set into whichever chunk holds it -
  doing this in one eagerly-loaded component tripled the initial bundle. Import
  the icons by name and map them.

- **The CSS reset excludes `svg` from `max-width: 100%`.** React Flow renders
  edges into an absolutely-positioned zero-width container, where that clamp
  resolves to `0` and silently collapses the entire edge layer.

## Responsive behaviour

Breakpoints do real layout work here, not just reflow:

| | Phone (<768px) | Desktop |
|---|---|---|
| Hero | Stacked, centred; compact buttons on one row | Split - copy left, die right |
| Hero die | 220–260px, sized off viewport width | 260–340px, sized off height |
| Architecture | Tall vertical layout below `lg` (phones *and* tablets), fixed 144px nodes, fit allowed to scale up to 1.35× | Wide left-to-right layout |
| Skills, projects, impact | One column | Two to four |

The architecture diagrams carry **two hand-placed layouts** rather than one graph
scaled down. Fitting the wide layout into a phone drove React Flow's zoom to
0.56, rendering 13px node labels at 7px; at tablet width it still hit 0.63. The
vertical layout therefore applies all the way up to `lg`. With zoom locked,
`fitView` is the only thing sizing the diagram, so the box's proportions decide
how large nodes render - the narrow boxes are tall on purpose so the fit can
scale *up*. Nodes take a fixed 144px there: the widest single word
("Reconciliation") needs 82px, and `min-width` had let long captions widen nodes
unpredictably and race the measurement.

## Metadata

`index.html` carries the title, description, canonical URL, OpenGraph and
Twitter cards, and a JSON-LD `Person`. `public/` holds the favicon, `og.png`
(1200×630), `robots.txt`, `sitemap.xml` and the resume PDF the download
buttons point at. The OG card is drawn natively with AppKit
(see the session notes) because macOS's SVG renderer ignores `font-weight`.

## Accessibility

Semantic landmarks and headings, a skip link, labelled controls, visible focus,
and `prefers-reduced-motion` honoured throughout - the orbit, the constellation,
the typed terminal and every entrance all stand still when it's set.
