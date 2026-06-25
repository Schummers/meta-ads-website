# fakedoor-kit

A reusable starter for **fake-door landing-page tests**: validate demand for a product idea by shipping a landing page with a waitlist, running ads to it, and measuring who clicks and who leaves their email, before building anything.

It ships with the full tracking pipeline already wired:

- **Meta Pixel** + **Conversions API** (server-side, beats ad blockers, deduped)
- **PostHog** (funnel, segmentation, session replay)
- **Notion** as the leads database (one row per email, segmented by project)
- A **fake-door** flow (`useFakeDoor`) every design plugs into, so funnel events fire identically across designs
- A **/gallery** + **/preview** system to generate many design variants and pick finalists

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in keys (see ROADMAP.md step 2)
npm run dev                  # http://localhost:3000
```

The fresh clone renders a neutral **example** design so you can confirm the pipeline works end to end before adding content.

## How you actually use it

Don't edit files by hand. Open the repo in Claude Code and run the setup skill:

```
/setup-project
```

It interviews you (product, audience, offer, content), rewrites `src/content/site.ts`, then walks you through generating designs and shipping. The whole ordered path lives in **[ROADMAP.md](ROADMAP.md)** so you can follow it without knowing the code.

## What's where

| Path | What |
|---|---|
| `src/content/site.ts` | The single source of copy. Every design renders this. |
| `src/designs/registry.ts` | List of designs. One entry per variant. |
| `src/designs/example/` | The starter design (reference + smoke test). |
| `src/designs/shared/` | `useFakeDoor`, waitlist takeovers, scroll reveal — don't touch. |
| `src/lib/` | Tracking infra (analytics, Meta CAPI, PostHog server) — don't touch. |
| `src/app/api/waitlist/` | The endpoint that writes to Notion + mirrors to PostHog/Meta. |
| `src/app/page.tsx` | The live landing (points at one design slug). |
| `src/app/gallery`, `src/app/preview` | Internal design tooling (noindex). |
| `.claude/skills/setup-project/` | The guided setup skill. |

## Stack

Next.js (App Router) · React · Tailwind v4 · TypeScript · Vercel · Notion · PostHog · Meta. One project per repo, created from this template.
