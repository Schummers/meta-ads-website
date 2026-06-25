# fakedoor-kit

A reusable starter for **fake-door landing-page tests**: validate demand for a
product idea by shipping a landing page with a waitlist, running ads to it, and
measuring who clicks and who leaves their email, before building anything.

It ships with the full tracking pipeline wired: **Meta Pixel + Conversions API**,
**PostHog** (funnel + replay), **Notion** as the leads database, a **fake-door**
flow every design plugs into, and a **/gallery + /preview** system to generate
many design variants and pick finalists.

---

## START HERE

You don't need to be technical. **Download this repo (or "Use this template"),
open the folder in Claude Code, and say:**

> set up my project

The agent reads `CLAUDE.md`, then drives everything from `ROADMAP.md`: it installs
dependencies, sets up a design skill, interviews you about your idea, builds the
landing page, helps you connect the keys, generates designs, and deploys. You only
**answer questions** and **paste a few API keys** when asked.

The whole agent run is one skill: `setup-project`.

---

## For reference (the agent handles these)
- **The ordered plan** the agent follows: [ROADMAP.md](ROADMAP.md)
- **Service keys** (PostHog, Meta, Notion schema, Vercel): [docs/setup/services.md](docs/setup/services.md)
- **Design skills** install: [docs/setup/design-skills.md](docs/setup/design-skills.md)
- **Reusable landing-page knowledge**: [docs/reference/](docs/reference/)

## What's where
| Path | What |
|---|---|
| `src/content/site.ts` | The single source of copy. Every design renders this. |
| `src/designs/registry.ts` | List of designs (one entry per variant). |
| `src/designs/example/` | The starter design (reference contract + smoke test). |
| `src/designs/shared/`, `src/lib/`, `src/app/api/waitlist/` | Tracking + fake-door infra — do not touch. |
| `src/app/page.tsx` | The live landing (points at one design slug). |
| `src/app/gallery`, `src/app/preview` | Internal design tooling (noindex). |
| `.claude/skills/setup-project/` | The guided setup skill. |

## Stack
Next.js (App Router) · React · Tailwind v4 · TypeScript · Vercel · Notion · PostHog · Meta. One project per repo, created from this template.
