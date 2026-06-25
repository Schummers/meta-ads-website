# Services setup (agent runbook)

The agent walks the user through getting these keys. The user only pastes values
into `.env.local`; the agent does everything else. Without keys the funnel still
works for QA (leads just aren't stored), so this can be done after designs exist.

## PostHog (analytics, EU)
1. User creates a project at https://eu.posthog.com (free).
2. Project Settings → "Project API Key" → paste into `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`.
3. `NEXT_PUBLIC_POSTHOG_HOST` stays `https://eu.i.posthog.com`.

## Meta Pixel + Conversions API (ad optimization)
One Pixel per project, owned by the ad account that runs the campaign.
1. Events Manager → create/choose a Pixel → copy its ID → `NEXT_PUBLIC_META_PIXEL_ID`.
2. Conversions API → generate an access token (System User) → `META_ACCESS_TOKEN` (server only).
3. Optional while testing: Events Manager → Test Events shows a code → `META_TEST_EVENT_CODE`. Remove for production.

## Notion (leads database) — schema matters
The waitlist route writes these properties. If the column name/type is wrong the
write fails (502). Create a database with EXACTLY these columns:

| Column        | Type         | Required |
|---------------|--------------|----------|
| `Email`       | Title        | yes      |
| `Project`     | Select       | yes      |
| `Submitted at`| Date         | yes      |
| `Variant`     | Select       | no       |
| `Positioning` | Select       | no       |
| `Features`    | Multi-select | no       |
| `UTM Source`  | Text         | no       |
| `UTM Campaign`| Text         | no       |
| `UTM Content` | Text         | no       |
| `fbclid`      | Text         | no       |
| `PostHog ID`  | Text         | no       |
| `Country`     | Text         | no       |

Then:
1. https://www.notion.so/my-integrations → New integration → copy the secret → `NOTION_TOKEN`.
2. Open the database as a full page → `•••` → Connections → add your integration.
3. Copy the database id from its URL (the 32-char hex before `?v=`) → `NOTION_DATABASE_ID`.

`NEXT_PUBLIC_PROJECT_NAME` is written to the `Project` column, so one database can
hold leads from several projects.

## Vercel (deploy)
1. Agent runs `vercel link` (or imports the GitHub repo in the Vercel dashboard).
2. Set every variable above in Vercel → Project → Settings → Environment Variables
   (Production). `vercel env add <NAME> production` per key, then redeploy.
3. After deploy, the user visits the live URL once with `?internal=1` to exclude
   their own traffic from analytics.
