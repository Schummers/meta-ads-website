import type { ComponentType } from "react";
import type { SiteContent } from "@/content/site";

// The contract every design variant must satisfy.
//
// A design = one full landing page component that receives the FIXED content
// and is otherwise free to do anything visually (layout, type, color, motion).
// It must render every content section and wire its CTAs/fake-door through the
// shared `useFakeDoor` hook so the PostHog/Meta funnel events stay correct.

export type DesignProps = {
  content: SiteContent;
  // Identifies the design in analytics (so funnels can segment by design).
  slug: string;
};

export type DesignModule = {
  slug: string; // url segment, e.g. "baseline", "a-fd-09"
  label: string; // human label shown in the gallery
  ad?: string; // which ad inspired it, e.g. "image1"
  note?: string; // one-line art-direction summary
  variant?: "a" | "b" | "c"; // brand family the design belongs to
  tool?: "fd" | "taste" | "stitch" | "manual"; // generator that produced it (manual = hand-built)
  mode?: "free" | "guided"; // how much direction the brief gave
  tags?: string[]; // axis tags shown in the gallery, e.g. ["serif", "airy"]
  brief?: string; // the art-direction brief given to the generator
  Component: ComponentType<DesignProps>;
};
