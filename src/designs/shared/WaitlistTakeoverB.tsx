"use client";

import { ArrowLeft, Check, Lock, Zap } from "lucide-react";
import type { SiteContent } from "@/content/site";

// Full-screen "Start my plan" waitlist takeover for the variant-B manual designs
// (lavender / indigo palette), mirroring the A takeover structure. Rendered in
// place of the landing when `fd.showWaitlist` is true (the design early-returns
// this). Uses the host design's own fonts via the generic CSS vars
// `--font-display` / `--font-body`, so it inherits Fraunces/DM Sans (01),
// Newsreader/Mona Sans (02) or Fraunces/Spectral (03) automatically.

const INK = "#26235A";
const SOFT = "#5A5690";
const ACCENT = "#6F69C9";
const LIGHT = "#F7F4FF";
const FIELD = "#F5F2FF";

type Fd = {
  email: string;
  setEmail: (v: string) => void;
  features: string[];
  toggleFeature: (id: string) => void;
  otherFeature: string;
  setOtherFeature: (v: string) => void;
  closeWaitlist: () => void;
  state: "idle" | "loading" | "done" | "error";
  submit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function WaitlistTakeoverB({
  fd,
  fakedoor,
  confirmation,
  align = "left",
  fontVars,
  displayFont = "font-[family-name:var(--font-display)]",
  bodyFont = "font-[family-name:var(--font-body)]",
}: {
  fd: Fd;
  fakedoor: SiteContent["fakedoor"];
  confirmation: SiteContent["confirmation"];
  align?: "left" | "center";
  fontVars: string;
  // Tailwind family classes — override when the host design uses non-default
  // CSS var names (e.g. b-manual-03 uses --font-fraunces / --font-spectral).
  displayFont?: string;
  bodyFont?: string;
}) {
  const centered = align === "center";
  const features = fakedoor.features ?? [];
  const loading = fd.state === "loading";
  const canSubmit = fd.email.trim().length > 0;

  return (
    <main
      className={`${fontVars} ${bodyFont} relative flex h-dvh flex-col overflow-hidden antialiased`}
      style={{ backgroundColor: FIELD, color: INK }}
    >
      {/* Soft lavender washes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -left-24 top-[10vh] h-80 w-80 rounded-full opacity-80 blur-[80px]"
          style={{ background: "radial-gradient(circle at 40% 40%, #EBE6FF, rgba(235,230,255,0) 70%)" }}
        />
        <div
          className="absolute right-[-20%] bottom-[-8%] h-80 w-80 rounded-full opacity-70 blur-[80px]"
          style={{ background: "radial-gradient(circle at 50% 50%, #D6E4FF, rgba(214,228,255,0) 72%)" }}
        />
      </div>

      {/* Top bar */}
      <div className="mx-auto flex w-full max-w-xl shrink-0 items-center justify-between px-6 pb-3 pt-5">
        <button
          type="button"
          onClick={fd.closeWaitlist}
          className="group inline-flex items-center gap-1.5 text-[13px] transition-transform duration-300 hover:-translate-x-[1px]"
          style={{ color: SOFT }}
        >
          <ArrowLeft style={{ width: 15, height: 15 }} strokeWidth={2.25} />
          Back to home
        </button>
        {fakedoor.badge && (
          <span
            className="rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{
              borderColor: "rgba(111,105,201,0.35)",
              color: ACCENT,
              backgroundColor: "rgba(111,105,201,0.1)",
            }}
          >
            {fakedoor.badge}
          </span>
        )}
      </div>

      {/* Scrollable content */}
      <div
        className={`mx-auto w-full max-w-xl flex-1 overflow-y-auto px-6 pb-4 pt-4 ${
          centered ? "text-center" : ""
        }`}
      >
        {fd.state === "done" ? (
          <div className={centered ? "mx-auto max-w-[42ch]" : "max-w-[42ch]"}>
            <h1 className={`${displayFont} text-[30px] leading-tight tracking-[-0.015em]`}>
              {confirmation.title}
            </h1>
            <p className="mt-4 text-[15px] leading-[1.7]" style={{ color: SOFT }}>
              {confirmation.body}
            </p>
          </div>
        ) : (
          <div className="w-full">
            <h1 className={`${displayFont} text-[34px] leading-[1.12] tracking-[-0.02em] sm:text-[40px]`}>
              {fakedoor.title}
            </h1>
            <p
              className={`mt-4 text-[15px] leading-[1.7] ${centered ? "mx-auto" : ""} max-w-[46ch]`}
              style={{ color: SOFT }}
            >
              {fakedoor.body}
            </p>

            <form
              id="ya-form"
              onSubmit={fd.submit}
              className={`mt-6 w-full ${centered ? "mx-auto max-w-[440px]" : "max-w-[440px]"}`}
            >
              <label
                htmlFor="ya-email"
                className={`block text-[13px] font-semibold ${centered ? "text-center" : ""}`}
              >
                Your email{" "}
                <span aria-hidden="true" style={{ color: ACCENT }}>
                  *
                </span>
              </label>
              <input
                id="ya-email"
                type="email"
                required
                value={fd.email}
                onChange={(e) => fd.setEmail(e.target.value)}
                placeholder={fakedoor.emailPlaceholder}
                className="mt-2 w-full rounded-full border px-6 py-4 text-[15px] focus:outline-none focus:ring-2"
                style={{
                  borderColor: "rgba(38,35,90,0.15)",
                  backgroundColor: "rgba(255,255,255,0.7)",
                  color: INK,
                }}
              />
              {fakedoor.fieldNote && (
                <p
                  className={`mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold ${
                    centered ? "justify-center" : ""
                  }`}
                  style={{ color: ACCENT }}
                >
                  <Zap style={{ width: 13, height: 13 }} strokeWidth={2.25} />
                  {fakedoor.fieldNote}
                </p>
              )}

              {features.length > 0 && (
                <fieldset className="mt-5 border-0 p-0">
                  <legend
                    className={`mb-3 text-[13px] font-semibold ${centered ? "w-full text-center" : ""}`}
                  >
                    {fakedoor.featuresTitle}{" "}
                    <span style={{ color: SOFT, fontWeight: 400 }}>(optional)</span>
                  </legend>
                  <div className={`flex flex-wrap gap-2 ${centered ? "justify-center" : ""}`}>
                    {features.map((f) => {
                      const on = fd.features.includes(f.id);
                      return (
                        <button
                          key={f.id}
                          type="button"
                          aria-pressed={on}
                          onClick={() => fd.toggleFeature(f.id)}
                          className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11.5px] font-semibold transition-colors duration-200"
                          style={
                            on
                              ? { backgroundColor: INK, borderColor: INK, color: LIGHT }
                              : {
                                  backgroundColor: "transparent",
                                  borderColor: "rgba(38,35,90,0.18)",
                                  color: SOFT,
                                }
                          }
                        >
                          {on && <Check style={{ width: 13, height: 13 }} strokeWidth={2.5} />}
                          {f.label}
                        </button>
                      );
                    })}
                  </div>
                  <input
                    type="text"
                    value={fd.otherFeature}
                    onChange={(e) => fd.setOtherFeature(e.target.value)}
                    placeholder="Something else?"
                    maxLength={80}
                    className={`mt-2 w-full rounded-full border px-4 py-2 text-[11.5px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#6F69C9]/40 ${
                      centered ? "text-center" : ""
                    }`}
                    style={{
                      borderColor: "rgba(38,35,90,0.18)",
                      backgroundColor: "rgba(255,255,255,0.7)",
                      color: INK,
                    }}
                  />
                </fieldset>
              )}

              {fd.state === "error" && (
                <p className="mt-4 text-[13px]" style={{ color: ACCENT }}>
                  Something went wrong. Try again.
                </p>
              )}
            </form>
          </div>
        )}
      </div>

      {/* Sticky submit footer — hidden on confirmation state */}
      {fd.state !== "done" && (
        <div
          className="relative mx-auto w-full max-w-xl shrink-0 px-6 pb-4 pt-4"
          style={{ backgroundColor: FIELD }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-12 left-0 right-0 h-12"
            style={{ background: `linear-gradient(to bottom, rgba(245,242,255,0), ${FIELD})` }}
          />
          <button
            type="submit"
            form="ya-form"
            disabled={loading || !canSubmit}
            className="w-full rounded-full px-6 py-4 text-[15px] font-semibold transition-all duration-300 active:scale-[0.98]"
            style={{ backgroundColor: INK, color: LIGHT, opacity: canSubmit ? 1 : 0.4 }}
          >
            {loading ? "…" : fakedoor.submitLabel}
          </button>
          <p
            className="mt-3 flex w-full items-center justify-center gap-1.5 text-[12px]"
            style={{ color: SOFT }}
          >
            <Lock style={{ width: 12, height: 12 }} strokeWidth={2.25} />
            {fakedoor.privacyLine}
          </p>
        </div>
      )}
    </main>
  );
}
