import type { Metadata } from "next";
import { designs, designSlugs } from "@/designs/registry";
import type { DesignModule } from "@/designs/types";
import LikeButton from "./LikeButton";
import TrashButton from "./TrashButton";
import MarksBar from "./MarksBar";

// Internal design gallery — every variant side by side so you can pick finalists.
// Thumbnails are optional pre-rendered screenshots in /public/gallery/<slug>.jpg
// (see scripts/capture-gallery.mjs in the you-alive source if you want them).
// Like / trash marks live in localStorage; the bar at the bottom lets you copy
// the list of slugs you marked for deletion, then you (or the agent) delete them.
//
// Never indexed, never reachable from ads/users.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const TOOL_LABEL: Record<string, string> = {
  manual: "Manual — hand-built",
  fd: "frontend-design",
  taste: "design-taste-frontend",
  stitch: "Stitch",
};

function Card({ d }: { d: DesignModule }) {
  return (
    <figure className="flex w-[200px] shrink-0 flex-col gap-2">
      <a
        href={`/preview/${d.slug}`}
        target="_blank"
        rel="noreferrer"
        className="group relative block h-[360px] w-[200px] overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm transition hover:shadow-md"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/gallery/${d.slug}.jpg`}
          alt={d.label}
          className="h-full w-full object-cover object-top"
          loading="lazy"
        />
        <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-medium text-white opacity-0 transition group-hover:opacity-100">
          open ↗
        </span>
      </a>
      <figcaption className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[13px] font-semibold text-gray-800">{d.label}</span>
          <div className="flex items-center gap-1.5">
            <LikeButton slug={d.slug} />
            <TrashButton slug={d.slug} />
          </div>
        </div>
        {d.note && <span className="text-[11px] leading-snug text-gray-500">{d.note}</span>}
      </figcaption>
    </figure>
  );
}

export default function GalleryPage() {
  const tools = Array.from(new Set(designs.map((d) => d.tool ?? "manual")));
  return (
    <div className="min-h-screen bg-white px-8 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Design gallery</h1>
        <p className="text-sm text-gray-500">
          {designs.length} design{designs.length > 1 ? "s" : ""}. Open any to preview, ♥ to keep, 🗑
          to mark for deletion.
        </p>
      </header>

      {tools.map((tool) => {
        const items = designs.filter((d) => (d.tool ?? "manual") === tool);
        return (
          <section key={tool} className="mb-12">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
              {TOOL_LABEL[tool] ?? tool}
            </h2>
            <div className="flex flex-wrap gap-6">
              {items.map((d) => (
                <Card key={d.slug} d={d} />
              ))}
            </div>
          </section>
        );
      })}

      <MarksBar validSlugs={designSlugs} />
    </div>
  );
}
