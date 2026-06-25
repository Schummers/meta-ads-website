// Shared client-side mark store for the gallery (no backend).
// Two independent sets persisted in localStorage, keyed by design slug:
//   yalike:<slug>  = liked / favourite
//   yatrash:<slug> = marked for deletion
// Buttons dispatch MARKS_EVENT so the summary bar updates live.

export const LIKE_PREFIX = "yalike:";
export const TRASH_PREFIX = "yatrash:";
export const MARKS_EVENT = "yamarks-change";

export function isMarked(prefix: string, slug: string): boolean {
  try {
    return localStorage.getItem(prefix + slug) === "1";
  } catch {
    return false;
  }
}

export function setMarked(prefix: string, slug: string, on: boolean): void {
  try {
    if (on) localStorage.setItem(prefix + slug, "1");
    else localStorage.removeItem(prefix + slug);
    window.dispatchEvent(new Event(MARKS_EVENT));
  } catch {
    /* localStorage unavailable */
  }
}

export function listMarked(prefix: string): string[] {
  try {
    return Object.keys(localStorage)
      .filter((k) => k.startsWith(prefix) && localStorage.getItem(k) === "1")
      .map((k) => k.slice(prefix.length))
      .sort();
  } catch {
    return [];
  }
}
