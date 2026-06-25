---
name: setup-project
description: Use when starting a new fake-door landing test from the fakedoor-kit template, or when the user says "setup project", "/setup-project", "new project", "define the content", or wants to go from a product idea to a live landing page. Interviews the user, writes the canonical content, then hands off to the design and ship steps in ROADMAP.md.
---

# setup-project

Drive a fresh `fakedoor-kit` clone from a product idea to a content-complete,
buildable landing page, then hand off to design generation. This is the guided
entry point referenced by ROADMAP.md.

## How to run it

Work through the phases IN ORDER. Create a todo per phase. Ask the interview
questions in small batches (the user may brain-dump answers). Do not write code
until Phase 2.

### Phase 0 — Orient
1. Confirm you're in a fakedoor-kit clone (CLAUDE.md + `src/content/site.ts` exist).
2. Read `src/content/site.ts` (the `SiteContent` shape you must fill) and
   `src/designs/example/index.tsx` (the contract every design honours).
3. Tell the user the plan: interview → write content → connect keys → generate
   designs → pick → ship. Point them at ROADMAP.md.

### Phase 1 — Interview (no code yet)
Ask, in batches, enough to write honest copy. Cover:
- **Product**: what is it, in one sentence? What stage (idea / prototype)?
- **Audience**: who exactly is it for? What do they call their problem?
- **Pain**: the status quo that hurts, the cost of doing nothing.
- **Promise**: the single transformation the product delivers.
- **How it works**: 3 steps, each an action + payoff.
- **Offer**: price(s), what's included, the CTA verb (e.g. "Get early access").
- **Proof**: 3 short testimonial-style quotes (can be aspirational placeholders
  the user will replace).
- **Objections**: 3-4 FAQ questions real visitors would ask.
- **Fake-door**: the waitlist promise (e.g. "first access + discount at launch")
  and 4-8 features to let them rank (optional).
- **Tone**: warm / clinical / playful / premium? Any words to use or avoid?

Reflect a short summary back and get a thumbs-up before writing.

### Phase 2 — Write the content
1. Rewrite `src/content/site.ts` `site` object from the answers. Keep the
   `SiteContent` type intact; fill every field with real copy (no placeholders).
2. Update the page `<title>`/description in `src/app/layout.tsx` only if it
   shouldn't just read `NEXT_PUBLIC_PROJECT_NAME`.
3. Run `npm run build`. Fix any type error. Then `npm run dev` and read the
   landing (the `example` design now shows the real words).
4. Iterate wording with the user until it sounds like them.

### Phase 3 — Connect services (hand to ROADMAP step 2)
Walk the user through `.env.local` (PostHog token, Meta Pixel + CAPI token,
Notion token + DB id, `NEXT_PUBLIC_PROJECT_NAME`). Remind them the funnel works
for QA without keys; leads just aren't stored. Do NOT ask for secrets in chat —
have them paste into `.env.local` themselves.

### Phase 4 — Generate designs (hand off)
Stop here and invoke the design skill: prefer `design-taste-frontend`, else
`frontend-design`. Brief: several distinct directions, a few iterations each,
each a new folder in `src/designs/` + a `registry.ts` entry, rendering all
content and wiring `useFakeDoor` (point them at `example`). Browse at `/gallery`.

### Phase 5 — Pick & ship (hand to ROADMAP steps 4-6)
Help pick finalists, refine, point `src/app/page.tsx` (or `/a /b /c` routes) at
them, deploy to Vercel, set env vars there, exclude own traffic with
`?internal=1`, launch ads, read PostHog/Meta/Notion.

## Rules
- Content lives ONLY in `src/content/site.ts`. Never hardcode copy in a design.
- Never edit `src/designs/shared/`, `src/lib/`, the waitlist route, or
  `instrumentation-client.ts` — that's the tracking pipeline.
- Verify with `npm run build` before claiming a phase done.
- Conventional commits, one per phase is fine.
