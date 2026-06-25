# Roadmap — from idea to a live fake-door test

**This is the agent's execution plan.** The agent runs every command and edit.
The human only does two things: **answer the interview (Phase 1)** and **paste API
keys into `.env.local` (Phase 3)**. Everything else is the agent's job. The
`setup-project` skill drives Phases 0-5.

## Phase 0 — Bootstrap (agent, on a fresh clone)
- [ ] `npm install`.
- [ ] Ensure a design skill is installed (`docs/setup/design-skills.md`).
- [ ] `cp .env.example .env.local` if missing.
- [ ] `npm run build` then `npm run dev` — the example page should render.

## Phase 1 — Define the offer and content (agent interviews the human)
- [ ] Run the interview (product, audience, pain, promise, 3 steps, offer/price,
      3 proof quotes, FAQ objections, waitlist promise, tone).
- [ ] Rewrite `src/content/site.ts` from the answers; update the page title.
- [ ] Re-read the landing with the human; tweak wording until it sounds like them.

## Phase 2 — Generate design variants (agent)
- [ ] Use the design skill (`design-taste-frontend` preferred, else
      `frontend-design`, else prompt directly).
- [ ] Several distinct directions, a few iterations each. Each = a new folder in
      `src/designs/` + a `registry.ts` entry, rendering all content and wiring
      `useFakeDoor` (copy `src/designs/example/` as the contract).
- [ ] Show the human `/gallery`. They ♥ keepers / 🗑 rejects; agent deletes the
      marked slugs and confirms `npm run build` passes.

## Phase 3 — Connect services (agent guides, human pastes keys)
- [ ] Follow `docs/setup/services.md`: PostHog token, Meta Pixel + CAPI token,
      Notion token + **DB with the exact schema in that doc**, `NEXT_PUBLIC_PROJECT_NAME`.
- [ ] Without keys the funnel still works for QA (leads not stored), so this can
      happen after designs exist.

## Phase 4 — Pick finalists & refine (agent + human)
- [ ] Choose 1-3 designs. Refine by hand with the agent until the human is happy.

## Phase 5 — Ship to ads (agent)
- [ ] Point `src/app/page.tsx` at the finalist slug. For an A/B/C ad test, add
      `src/app/a/`, `/b`, `/c` routes that each set a different `SLUG`.
- [ ] Deploy to Vercel + set env vars there (`docs/setup/services.md`).
- [ ] Human visits the live URL once with `?internal=1` to exclude their traffic.
- [ ] Launch the ad campaign at the live URL(s) with UTM params.

## Phase 6 — Read results (human, agent can pull data)
- [ ] PostHog funnel: `$pageview` → `cta_click` → `pricing_view` → `email_submit`.
- [ ] Meta Events Manager: Pixel + CAPI conversions. Notion: leads by Variant/Project.
- [ ] Decide: enough demand to build, or kill the idea cheaply.

---

### Events reference
`$pageview` · `design_viewed` · `cta_click` (→ Meta InitiateCheckout) ·
`pricing_view` (→ ViewContent) · `email_submit` (→ Lead). Browser Pixel and server
CAPI share one `event_id` so Meta counts each conversion once.
