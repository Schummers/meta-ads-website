# Design skills (agent runbook)

Generating landing-page designs needs a design skill. The template does NOT bundle
one (they have their own repos/updates). The agent ensures one is available, then
uses it in `setup-project` Phase 4.

## Check first
If `design-taste-frontend` or `frontend-design` already shows up in the available
skills, use it as-is — skip install.

## Option A — design-taste-frontend (preferred, richest)
Source: https://github.com/Leonxlnx/taste-skill (skill dir: `skills/taste-skill/`).
Install it project-scoped:

```bash
git clone --depth 1 https://github.com/Leonxlnx/taste-skill /tmp/taste-skill
mkdir -p .claude/skills/design-taste-frontend
cp -R /tmp/taste-skill/skills/taste-skill/. .claude/skills/design-taste-frontend/
rm -rf /tmp/taste-skill
```

That repo also has sibling skills worth installing the same way if needed:
`minimalist-skill`, `high-end-visual-design` (`soft-skill`), `industrial-brutalist-ui`
(`brutalist-skill`), `redesign-skill`, `image-to-code-skill`.

## Option B — frontend-design (official Claude Code plugin)
Install from the official marketplace (`claude-plugins-official`) via the plugin
manager. Use this if Option A isn't reachable.

## Fallback — no skill
If neither installs, generate designs by prompting directly. The ONLY hard
requirement: every design renders the full `SiteContent` and wires the fake-door
via `useFakeDoor(slug)`. Copy `src/designs/example/index.tsx` as the contract and
vary the visual treatment. Never block setup just because a named skill is absent.
