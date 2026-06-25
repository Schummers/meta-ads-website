"use client";

import { useEffect, useState } from "react";
import { LIKE_PREFIX, TRASH_PREFIX, MARKS_EVENT, listMarked, setMarked } from "./marks";

// Sticky summary of the current marks. Lets you copy the marked-for-deletion
// slug list (to hand off for deletion) and the liked list. No backend.
// `validSlugs` = the slugs still present in the registry; any mark on a slug
// that's no longer there (deleted design) is stale and gets pruned from
// localStorage on mount, so the bar self-heals.
export default function MarksBar({ validSlugs }: { validSlugs: string[] }) {
  const [liked, setLiked] = useState<string[]>([]);
  const [trash, setTrash] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const valid = new Set(validSlugs);
    const sync = () => {
      // Prune marks pointing at designs that no longer exist, then read back.
      for (const prefix of [LIKE_PREFIX, TRASH_PREFIX]) {
        for (const slug of listMarked(prefix)) {
          if (!valid.has(slug)) setMarked(prefix, slug, false);
        }
      }
      setLiked(listMarked(LIKE_PREFIX).filter((s) => valid.has(s)));
      setTrash(listMarked(TRASH_PREFIX).filter((s) => valid.has(s)));
    };
    sync();
    window.addEventListener(MARKS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(MARKS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [validSlugs]);

  const copy = (label: string, arr: string[]) => {
    try {
      navigator.clipboard?.writeText(arr.join(" "));
      setCopied(label);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* ignore */
    }
  };

  if (liked.length === 0 && trash.length === 0) return null;

  return (
    <div className="sticky top-0 z-10 -mx-6 mb-8 border-b border-gray-200 bg-[#faf9f7]/95 px-6 py-3 backdrop-blur">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px]">
        {liked.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-rose-600">♥ {liked.length} aimé{liked.length > 1 ? "s" : ""}</span>
            <button
              type="button"
              onClick={() => copy("liked", liked)}
              className="rounded border border-gray-300 px-2 py-0.5 text-[11px] text-gray-600 hover:bg-gray-100"
            >
              {copied === "liked" ? "copié ✓" : "copier"}
            </button>
          </div>
        )}
        {trash.length > 0 && (
          <div className="flex min-w-0 items-center gap-2">
            <span className="shrink-0 text-red-600">🗑 {trash.length} à supprimer</span>
            <button
              type="button"
              onClick={() => copy("trash", trash)}
              className="shrink-0 rounded border border-red-300 px-2 py-0.5 text-[11px] text-red-700 hover:bg-red-50"
            >
              {copied === "trash" ? "copié ✓" : "copier la liste"}
            </button>
            <code className="truncate text-[11px] text-gray-400">{trash.join(" ")}</code>
          </div>
        )}
      </div>
    </div>
  );
}
