"use client";

import { useEffect, useState } from "react";
import { TRASH_PREFIX, MARKS_EVENT, isMarked, setMarked } from "./marks";

// "Mark for deletion" toggle (no backend). Marked slugs are collected by the
// MarksBar so they can be copied and handed off for actual deletion.
export default function TrashButton({ slug }: { slug: string }) {
  const [marked, setMarkedState] = useState(false);

  useEffect(() => {
    const sync = () => setMarkedState(isMarked(TRASH_PREFIX, slug));
    sync();
    window.addEventListener(MARKS_EVENT, sync);
    return () => window.removeEventListener(MARKS_EVENT, sync);
  }, [slug]);

  return (
    <button
      type="button"
      onClick={() => setMarked(TRASH_PREFIX, slug, !marked)}
      aria-pressed={marked}
      aria-label={marked ? "Ne plus marquer à supprimer" : "Marquer à supprimer"}
      title={marked ? "Marqué à supprimer" : "Marquer à supprimer"}
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[13px] leading-none transition ${
        marked ? "bg-red-100 text-red-600" : "text-gray-300 hover:text-red-500"
      }`}
    >
      🗑
    </button>
  );
}
