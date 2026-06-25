"use client";

import { useEffect, useState } from "react";
import { LIKE_PREFIX, MARKS_EVENT, isMarked, setMarked } from "./marks";

// Dead-simple favourite toggle, no backend: state lives in localStorage keyed
// by slug. Persists across reloads, scoped to this browser.
export default function LikeButton({ slug }: { slug: string }) {
  const [liked, setLiked] = useState(false);

  // Read after mount (avoid hydration mismatch) and stay in sync with the bar.
  useEffect(() => {
    const sync = () => setLiked(isMarked(LIKE_PREFIX, slug));
    sync();
    window.addEventListener(MARKS_EVENT, sync);
    return () => window.removeEventListener(MARKS_EVENT, sync);
  }, [slug]);

  return (
    <button
      type="button"
      onClick={() => setMarked(LIKE_PREFIX, slug, !liked)}
      aria-pressed={liked}
      aria-label={liked ? "Retirer des favoris" : "Ajouter aux favoris"}
      title={liked ? "Aimé" : "Aimer"}
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[15px] leading-none transition ${
        liked ? "text-rose-500" : "text-gray-300 hover:text-rose-400"
      }`}
    >
      {liked ? "♥" : "♡"}
    </button>
  );
}
