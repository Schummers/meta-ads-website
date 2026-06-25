# fakedoor-kit — agent instructions

This repo is a **fake-door landing-page test** built from the `fakedoor-kit`
template. Read this before doing anything, then follow **ROADMAP.md**.

## What this project is
Validate demand for a product idea before building it: a landing page + waitlist,
ads driving traffic, tracking measuring clicks and email signups. One product per
repo.

## The golden rule: content vs design are separate axes
- **Content** (the words) lives ONLY in `src/content/site.ts`. It is the single
  source of truth. Never hardcode copy inside a design.
- **Designs** (`src/designs/<slug>/`) only change the visual treatment. Every
  design renders the full `SiteContent` and wires the fake-door via
  `useFakeDoor(slug)`. The `example` design is the reference contract.

## When the user wants to...
- **Start / define the project** → run the `setup-project` skill. It interviews
  them and rewrites `src/content/site.ts` + the page title.
- **Generate designs** → use `design-taste-frontend` (preferred) or
  `frontend-design`. Create a folder under `src/designs/`, add a `registry.ts`
  entry, render every section, copy `example`'s `useFakeDoor` wiring. Preview at
  `/preview/<slug>`, browse all at `/gallery`.
- **Pick / clean designs** → at `/gallery` they ♥/🗑 designs (localStorage). To
  actually delete, read the trashed slugs from the MarksBar list, remove those
  folders + registry entries, confirm the build still passes.
- **Ship** → point `src/app/page.tsx` at the chosen slug (or add `/a /b /c`
  routes for an A/B/C ad test), deploy to Vercel, set env vars there too.

## Do NOT touch (shared infra)
`src/designs/shared/`, `src/lib/`, `src/app/api/waitlist/route.ts`,
`instrumentation-client.ts`, `next.config.ts`. These carry the tracking pipeline
(Pixel + CAPI + PostHog + Notion) and the fake-door logic. Changing them breaks
event dedup and lead storage.

## Verify before claiming done
Run `npm run build`. The 3 prod-shaped routes and `/preview/[slug]` must compile.
Designs are observable in the browser — start the dev server and check the
funnel actually fires (CTA → waitlist → submit) before saying it works.

## Conventions
Conventional commits (`feat:`/`fix:`/`chore:`). Secrets only in `.env.local`
(gitignored), never committed. EU PostHog region.
