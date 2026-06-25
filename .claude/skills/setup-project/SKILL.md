---
name: setup-project
description: Use when starting a new fake-door landing test from the fakedoor-kit template, or when the user says "setup project", "/setup-project", "new project", "set up my project", "define the content", or wants to go from a product idea to a live landing page. The agent does all the work (install, build, deploy); the human only answers questions and pastes API keys.
---

# setup-project

Drive a fresh `fakedoor-kit` clone from a product idea to a content-complete,
shippable landing test. **You (the agent) execute every command and edit.** The
human is possibly non-technical: ask them questions, never tell them to run
commands. Work the phases IN ORDER; make a todo per phase.

### Phase 0 — Bootstrap (do it, don't ask)
1. `npm install`.
2. Read `src/content/site.ts` (the `SiteContent` shape you fill) and
   `src/designs/example/index.tsx` (the contract every design honours).
3. Ensure a design skill is available. If `design-taste-frontend` or
   `frontend-design` is not present, install one now per
   `docs/setup/design-skills.md` (it has the GitHub link + commands).
4. `cp .env.example .env.local` if missing. `npm run build` then `npm run dev`.
5. Tell the human the plan in plain language: "I'll ask about your idea, build
   the page, then help you connect a few accounts and ship it."

### Phase 1 — Interview (no content written yet)
Ask in small batches; let them brain-dump. Cover:
- **Product**: what is it, one sentence? Stage (idea / prototype)?
- **Audience**: who exactly, and what do they call their problem?
- **Pain**: the status quo that hurts, the cost of doing nothing.
- **Promise**: the single transformation delivered.
- **How it works**: 3 steps (action + payoff each).
- **Offer**: price(s), what's included, the CTA verb ("Get early access").
- **Proof**: 3 short testimonial-style quotes (aspirational placeholders OK).
- **Objections**: 3-4 FAQ questions real visitors would ask.
- **Fake-door**: the waitlist promise + 4-8 features to rank (optional).
- **Tone**: warm / clinical / playful / premium? Words to use or avoid?
Reflect a short summary back; get a thumbs-up before writing.

### Phase 2 — Write the content
1. Rewrite the `site` object in `src/content/site.ts` from the answers. Keep the
   `SiteContent` type; fill every field with real copy (no placeholders).
2. `npm run build`, fix any type error, `npm run dev`, re-read the landing with
   the human, iterate wording until it sounds like them.

### Phase 3 — Connect services (you guide, human pastes keys)
Follow `docs/setup/services.md` (PostHog, Meta Pixel + CAPI, Notion + the EXACT
DB schema, `NEXT_PUBLIC_PROJECT_NAME`). Never ask for secrets in chat — have them
paste into `.env.local`. Remind them the funnel works for QA without keys.

### Phase 4 — Generate designs
Use the design skill from Phase 0 (`design-taste-frontend` preferred). Brief:
several distinct directions, a few iterations each; each a new folder in
`src/designs/` + a `registry.ts` entry, rendering all content and wiring
`useFakeDoor` (point at `example`). Browse `/gallery`; the human ♥/🗑, you delete
the trashed slugs and re-build. If no design skill is reachable, generate designs
by prompting directly — the only hard requirement is the `example` contract.

### Phase 5 — Pick & ship
Help pick finalists, refine, point `src/app/page.tsx` (or add `/a /b /c` routes)
at them, deploy to Vercel + set env vars there, exclude own traffic with
`?internal=1`, then the human launches ads. See ROADMAP Phases 5-6.

## Rules
- Content lives ONLY in `src/content/site.ts`. Never hardcode copy in a design.
- Never edit `src/designs/shared/`, `src/lib/`, the waitlist route, or
  `instrumentation-client.ts` — that's the tracking pipeline.
- Verify with `npm run build` before claiming a phase done.
- Conventional commits, one per phase is fine.
