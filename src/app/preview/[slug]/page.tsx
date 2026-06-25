import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { designMap, designSlugs } from "@/designs/registry";
import { site } from "@/content/site";

// Internal design preview — one design rendered with the canonical content.
// Never indexed, never linked from ads/users.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return designSlugs.map((slug) => ({ slug }));
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const design = designMap[slug];
  if (!design) notFound();
  const { Component } = design;
  return <Component content={site} slug={slug} />;
}
