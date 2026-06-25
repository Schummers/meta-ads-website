import { designMap } from "@/designs/registry";
import { site } from "@/content/site";

// The live landing page (bare domain). Point it at whichever design slug you
// want to ship. To A/B/C-test several designs from ads, add /a /b /c routes
// that each set a different SLUG (see ROADMAP.md → "Ship variants to ads").
const SLUG = "example";

export default function Home() {
  const design = designMap[SLUG];
  const { Component } = design;
  return <Component content={site} slug={SLUG} />;
}
