"use client";

import type { DesignProps } from "@/designs/types";
import { useFakeDoor } from "@/designs/shared/useFakeDoor";

// EXAMPLE / starter design — deliberately plain. It exists to:
//   1. prove the fake-door + tracking pipeline works end to end on a fresh clone
//   2. serve as the reference contract for designs the `design-taste-frontend`
//      or `frontend-design` skills generate (render every section, wire fd.*)
//
// Replace it (or add siblings) once `setup-project` has run. Keep the structure:
// hero → problem → solution → pricing → testimonials → faq → fakedoor → footer.

export default function ExampleDesign({ content, slug }: DesignProps) {
  const { hero, problem, solution, pricing, testimonials, faq, fakedoor, confirmation, footer } =
    content;
  const fd = useFakeDoor(slug);

  return (
    <main className="mx-auto flex max-w-xl flex-col gap-20 px-6 py-16 text-neutral-800">
      {/* HERO */}
      <header className="flex flex-col gap-4">
        <span className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
          {hero.brandLockup}
        </span>
        <h1 className="text-4xl font-semibold leading-tight text-neutral-900">{hero.title}</h1>
        <p className="text-lg text-neutral-600">{hero.subtitle}</p>
        <button
          onClick={() => fd.onCta("hero")}
          className="mt-2 self-start rounded-lg bg-neutral-900 px-6 py-3 font-medium text-white transition hover:bg-neutral-700"
        >
          {hero.ctaLabel}
        </button>
        <p className="text-sm text-neutral-400">{hero.reassuranceLine}</p>
      </header>

      {/* PROBLEM */}
      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-neutral-900">{problem.title}</h2>
        <p className="text-neutral-600">{problem.body}</p>
      </section>

      {/* SOLUTION */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-neutral-900">{solution.intro}</h2>
        <ol className="flex flex-col gap-5">
          {solution.steps.map((s, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-neutral-900">{s.title}</h3>
                <p className="text-neutral-600">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* PRICING */}
      <section ref={fd.pricingRef} className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-900">{pricing.title}</h2>
          <p className="text-neutral-600">{pricing.subtitle}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {pricing.plans.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col gap-2 rounded-xl border p-5 ${
                p.highlight ? "border-neutral-900 bg-neutral-50" : "border-neutral-200"
              }`}
            >
              <span className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
                {p.name}
              </span>
              <span className="text-2xl font-semibold text-neutral-900">{p.price}</span>
              <span className="text-sm text-neutral-500">{p.descriptor}</span>
              <button
                onClick={() => fd.onCta(`pricing-${p.name}`)}
                className="mt-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
              >
                {p.ctaLabel}
              </button>
            </div>
          ))}
        </div>
        <ul className="grid grid-cols-2 gap-2 text-sm text-neutral-600">
          {pricing.included.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span className="text-neutral-900">✓</span>
              {f}
            </li>
          ))}
        </ul>
        <p className="text-sm text-neutral-400">{pricing.scarcityLine}</p>
      </section>

      {/* TESTIMONIALS */}
      <section className="flex flex-col gap-5">
        {testimonials.map((t, i) => (
          <figure key={i} className="border-l-2 border-neutral-200 pl-4">
            <blockquote className="text-neutral-700">“{t.quote}”</blockquote>
            <figcaption className="mt-1 text-sm text-neutral-400">
              {t.name}, {t.age}
            </figcaption>
          </figure>
        ))}
      </section>

      {/* FAQ */}
      <section className="flex flex-col gap-4">
        {faq.map((item, i) => (
          <details key={i} className="border-b border-neutral-200 pb-3">
            <summary className="cursor-pointer font-medium text-neutral-900">{item.q}</summary>
            <p className="mt-2 text-neutral-600">{item.a}</p>
          </details>
        ))}
      </section>

      {/* FAKE-DOOR */}
      <section id="waitlist" className="flex flex-col gap-4 rounded-xl bg-neutral-900 p-8 text-white">
        {fd.state === "done" ? (
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">{confirmation.title}</h2>
            <p className="text-neutral-300">{confirmation.body}</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold">{fakedoor.title}</h2>
            <p className="text-neutral-300">{fakedoor.body}</p>
            <form onSubmit={fd.submit} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={fd.email}
                onChange={(e) => fd.setEmail(e.target.value)}
                placeholder={fakedoor.emailPlaceholder}
                className="flex-1 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-white placeholder:text-neutral-500"
              />
              <button
                type="submit"
                disabled={fd.state === "loading"}
                className="rounded-lg bg-white px-6 py-3 font-medium text-neutral-900 transition hover:bg-neutral-200 disabled:opacity-60"
              >
                {fd.state === "loading" ? "…" : fakedoor.submitLabel}
              </button>
            </form>
            {fd.state === "error" && (
              <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
            )}
            <p className="text-sm text-neutral-500">{fakedoor.privacyLine}</p>
          </>
        )}
      </section>

      {/* FOOTER */}
      <footer className="flex flex-col gap-1 text-sm text-neutral-400">
        {footer.lines.map((l, i) => (
          <span key={i}>{l}</span>
        ))}
      </footer>
    </main>
  );
}
