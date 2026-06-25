import posthog from "posthog-js";

const params = new URLSearchParams(window.location.search);
if (params.get("internal") === "1") {
  localStorage.setItem("ph_internal", "1");
}
const isInternal = localStorage.getItem("ph_internal") === "1";

// Capture on the live landing pages only. /gallery and /preview/* are internal
// design tooling and would pollute analytics, so we opt out there (and for your
// own visits via ?internal=1, which sticks in localStorage).
const isInternalPage = /^\/(gallery|preview)(\/|$)/.test(window.location.pathname);

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
  api_host: "/ingest",
  ui_host: "https://eu.posthog.com",
  defaults: "2026-01-30",
  capture_exceptions: true,
  capture_pageview: true,
  capture_pageleave: true,
  opt_out_capturing_by_default: isInternal || isInternalPage,
  persistence: "localStorage+cookie",
  debug: process.env.NODE_ENV === "development",
});
