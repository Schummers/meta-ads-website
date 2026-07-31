# meta-ads-website — agent instructions

This repo is a **fake-door landing-page test** built from the `meta-ads-website`
template. The human may be non-technical: **you (the agent) execute every step.**
They only answer questions and paste API keys when asked.

When the user says anything like "set up my project" / "start" / "build my
landing page" → invoke the **`setup-project`** skill and follow it. It is the
single driver and references ROADMAP.md.

## First run (bootstrap — do this before anything else, on a fresh clone)
1. `npm install`.
2. Ensure a design skill is available (`design-taste-frontend` or
   `frontend-design`). If not, install one per `docs/setup/design-skills.md`.
3. If `.env.local` is missing, `cp .env.example .env.local` (the funnel runs
   without real keys; fill them later via `docs/setup/services.md`).
4. `npm run build` to confirm the clone is healthy, then `npm run dev`.
Do all of this yourself; don't ask the user to run commands.

## The golden rule: content vs design are separate axes
- **Content** (the words) lives ONLY in `src/content/site.ts` — the single source
  of truth. Never hardcode copy inside a design.
- **Designs** (`src/designs/<slug>/`) only change the visual treatment. Every
  design renders the full `SiteContent` and wires the fake-door via
  `useFakeDoor(slug)`. `src/designs/example/` is the reference contract.

## Task → action map
- **Start / define the project** → `setup-project` skill (interview → rewrite
  `src/content/site.ts` + page title).
- **Generate designs** → ensure a design skill (`docs/setup/design-skills.md`),
  then create a folder under `src/designs/`, add a `registry.ts` entry, render
  every section, copy `example`'s `useFakeDoor` wiring. Preview at
  `/preview/<slug>`, browse all at `/gallery`.
- **Pick / clean designs** → at `/gallery` the user ♥/🗑 designs (localStorage).
  To delete: read the trashed slugs from the MarksBar, remove those folders +
  registry entries, confirm `npm run build` still passes.
- **Connect services** → `docs/setup/services.md` (PostHog, Meta, Notion schema,
  Vercel). Never ask for secrets in chat; have the user paste into `.env.local`.
- **Ship** → point `src/app/page.tsx` at the chosen slug (or add `/a /b /c`
  routes for an A/B/C ad test — each route is one file setting a different
  `SLUG`), deploy to Vercel, set the same env vars there.

## Do NOT touch (shared infra)
`src/designs/shared/`, `src/lib/`, `src/app/api/waitlist/route.ts`,
`instrumentation-client.ts`, `next.config.ts`. They carry the tracking pipeline
(Pixel + CAPI + PostHog + Notion) and the fake-door logic; changing them breaks
event dedup and lead storage.

## Verify before claiming done
Run `npm run build` (the live routes + `/preview/[slug]` must compile). Designs are
observable in the browser — start the dev server and confirm the funnel fires
(CTA → waitlist → submit) before saying it works.

## Conventions
Conventional commits (`feat:`/`fix:`/`chore:`). Secrets only in `.env.local`
(gitignored), never committed. EU PostHog region.
