# Roadmap — from idea to a live fake-door test

Follow this top to bottom. Each step says what to do and who does it. When in
doubt, open the repo in Claude Code and run `/setup-project` — it drives steps 1-5.

## 0. Create the project (once)
- [ ] On GitHub, click **Use this template** on `fakedoor-kit` → new repo for your idea.
- [ ] `git clone` it, `npm install`, `npm run dev`. You should see the example page.

## 1. Define the offer and content (agent-guided)
- [ ] Run `/setup-project`. Answer the interview: who it's for, the pain, the
      promise, the offer/price, 3 proof points, the FAQ objections.
- [ ] It rewrites `src/content/site.ts` and the page `<title>`. Re-read the
      landing and tweak wording until it sounds like you.

## 2. Connect the services (one-time keys)
- [ ] `cp .env.example .env.local` and fill:
  - `NEXT_PUBLIC_PROJECT_NAME` — your product name (also the Notion "Project" tag).
  - **PostHog**: `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` (EU). Create a project at eu.posthog.com.
  - **Meta**: `NEXT_PUBLIC_META_PIXEL_ID` + `META_ACCESS_TOKEN` from the ad
    account that will run the campaign (one Pixel per project).
  - **Notion**: `NOTION_TOKEN` + `NOTION_DATABASE_ID`. The DB needs at least an
    `Email` (title) and `Project` (select) column; optional columns are listed
    in `src/app/api/waitlist/route.ts`.
- [ ] Without these, the funnel still works for QA (leads just aren't stored).

## 3. Generate design variants (agent-guided)
- [ ] Ask the agent to generate designs with `design-taste-frontend` (or
      `frontend-design`). Make several variants, a few iterations each.
- [ ] Each design is a folder in `src/designs/` + one entry in `registry.ts`.
      It must render every content section and wire `useFakeDoor` (copy the
      `example` design as the contract).
- [ ] Browse them all at `/gallery`. ♥ the keepers, 🗑 the rejects, then have the
      agent delete the marked slugs.

## 4. Pick finalists and refine
- [ ] Choose 1-3 designs. Refine them by hand with the agent until you're happy.

## 5. Ship to ads
- [ ] Point `src/app/page.tsx` at your finalist slug. To A/B/C-test several from
      ads, create `src/app/a/`, `/b`, `/c` routes that each set a different
      `SLUG` (the example route pattern is one line — ask the agent).
- [ ] Deploy to Vercel. Set the same env vars in the Vercel project.
- [ ] Visit your live URL with `?internal=1` once to exclude yourself from tracking.
- [ ] Launch the ad campaign pointing at the live URL(s) with UTM params.

## 6. Read the results
- [ ] PostHog: funnel (pageview → cta_click → pricing_view → email_submit).
- [ ] Meta Events Manager: Pixel + CAPI conversions.
- [ ] Notion: the leads, segmented by Variant and Project.
- [ ] Decide: enough demand to build, or kill the idea cheaply.

---

### Events reference
`$pageview` · `design_viewed` · `cta_click` (→ Meta InitiateCheckout) ·
`pricing_view` (→ ViewContent) · `email_submit` (→ Lead). The browser Pixel and
server CAPI share one `event_id` so Meta counts each conversion once.
