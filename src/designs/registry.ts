import type { DesignModule } from "@/designs/types";
import ExampleDesign from "@/designs/example";

// Every design you generate gets one entry here. `setup-project` and the design
// skills append to this list. `slug` is the URL segment under /preview/<slug>.
//
// Ship finalists by pointing a route at a slug (see src/app/page.tsx and the
// optional /a /b /c variant routes described in the ROADMAP).
export const designs: DesignModule[] = [
  {
    slug: "example",
    label: "Example · starter",
    tool: "manual",
    note: "Plain reference design. Renders every content section and wires the fake-door. Replace once your real designs exist.",
    Component: ExampleDesign,
  },
];

export const designMap: Record<string, DesignModule> = Object.fromEntries(
  designs.map((d) => [d.slug, d])
);

export const designSlugs = designs.map((d) => d.slug);
