"use client";

import { useEffect } from "react";

// Scroll-reveal for the hand-built designs. Every element carrying `data-reveal`
// starts hidden (set in CSS) and gets `data-revealed="true"` the first time it
// scrolls into view — a soft fade-up "apparition". Children can stagger via an
// inline `transition-delay`. Honors prefers-reduced-motion (reveals instantly)
// and degrades gracefully without IntersectionObserver.
//
// Only one design renders per /preview/[slug] route, so a document-wide query is
// safe and keeps the design components declarative (just add data-reveal).
export function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || typeof IntersectionObserver === "undefined") {
      els.forEach((el) => (el.dataset.revealed = "true"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "true";
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
