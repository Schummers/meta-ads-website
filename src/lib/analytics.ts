"use client";

import posthog from "posthog-js";

// Funnel events fired to BOTH trackers from the same user action:
// - PostHog: our analysis (funnel, segmentation, replay)
// - Meta Pixel: ad-algo optimization (mapped to standard events)
//
// We optimize Meta delivery on cta_click (InitiateCheckout) because it has
// enough volume to learn; email_submit (Lead) is the value signal we report on.

type Props = Record<string, unknown>;

const metaStandardEvent: Record<string, string> = {
  cta_click: "InitiateCheckout",
  pricing_view: "ViewContent",
  email_submit: "Lead",
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// `eventId` is passed through to the Meta Pixel as the dedup key so the browser
// event and the server-side CAPI event (same event_id + event_name) collapse
// into one. Generate it once at the call site and send the same value to the
// server route.
export function track(event: string, props: Props = {}, opts: { eventId?: string } = {}) {
  if (typeof window === "undefined") return;

  // PostHog
  posthog?.capture(event, props);

  // Meta Pixel
  const fb = metaStandardEvent[event];
  if (window.fbq && fb) {
    if (opts.eventId) {
      window.fbq("track", fb, props, { eventID: opts.eventId });
    } else {
      window.fbq("track", fb, props);
    }
  }
}

// Attribution captured at submit time: UTM params + Meta click id (from the
// ad URL) + the PostHog distinct_id (bridge to the session/replay/geo).
export function getAttribution() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const val = (k: string) => p.get(k) || undefined;
  return {
    utm_source: val("utm_source"),
    utm_campaign: val("utm_campaign"),
    utm_content: val("utm_content"),
    fbclid: val("fbclid"),
    posthog_id: posthog?.get_distinct_id?.() || undefined,
  };
}
