"use client";

import { useEffect, useRef, useState } from "react";

// Animated count-up for a single number. Starts when it first scrolls into view
// (or immediately if already visible), eases 0 → end once, then stops. Honors
// prefers-reduced-motion by jumping straight to the final value.
export function CountUp({
  end,
  duration = 1400,
  className,
}: {
  end: number;
  duration?: number;
  className?: string;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVal(end);
      return;
    }

    let raf = 0;
    let startTs = 0;
    const run = () => {
      const tick = (ts: number) => {
        if (!startTs) startTs = ts;
        const t = Math.min(1, (ts - startTs) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        setVal(Math.round(eased * end));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      run();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(node);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {val.toLocaleString("en-US")}
    </span>
  );
}
