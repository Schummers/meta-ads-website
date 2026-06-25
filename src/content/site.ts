// Canonical content for the landing page. This is the SINGLE source of copy.
// Every design renders THIS content and only changes the visual treatment
// (layout, type, color, motion), never the words.
//
// `setup-project` rewrites this file from your interview answers. The values
// below are a neutral placeholder so a fresh clone builds and runs as-is.

export type SiteContent = {
  hero: {
    brandLockup: string; // product name / wordmark
    title: string;
    subtitle: string;
    ctaLabel: string;
    reassuranceLine: string;
  };
  problem: {
    title: string;
    body: string;
  };
  solution: {
    intro: string;
    steps: { title: string; body: string }[];
  };
  pricing: {
    title: string;
    subtitle: string;
    plans: {
      name: string;
      price: string;
      descriptor: string;
      ctaLabel: string;
      highlight?: boolean;
    }[];
    included: string[];
    // Legacy flat fields, kept so older designs keep compiling.
    monthly: string;
    annual: string;
    ctaLabel: string;
    scarcityLine: string;
  };
  finalCta: {
    headline: string;
    ctaLabel: string;
  };
  testimonials: { name: string; age: number; quote: string }[];
  faq: { q: string; a: string }[];
  fakedoor: {
    title: string;
    body: string;
    emailPlaceholder: string;
    submitLabel: string;
    privacyLine: string;
    // Optional fields used by the full-screen waitlist takeover.
    badge?: string;
    fieldNote?: string;
    featuresTitle?: string;
    features?: { id: string; label: string }[];
  };
  confirmation: {
    title: string;
    body: string;
  };
  footer: {
    lines: string[];
  };
};

// --- PLACEHOLDER CONTENT (replace via `setup-project`) ----------------------
export const site: SiteContent = {
  hero: {
    brandLockup: "Your Product",
    title: "The one-line promise that makes them want it.",
    subtitle:
      "A clear sentence on who it's for and the change it delivers. Concrete, not clever.",
    ctaLabel: "Get early access",
    reassuranceLine: "Join the first people on the waitlist.",
  },
  problem: {
    title: "Name the pain in your visitor's own words.",
    body: "Describe the status quo that hurts: the workaround they tolerate, the cost of doing nothing. Make them nod before you pitch.",
  },
  solution: {
    intro: "How it works",
    steps: [
      { title: "Step one", body: "What the user does first, and what they get." },
      { title: "Step two", body: "The next move, framed as effortless." },
      { title: "Step three", body: "The payoff, stated as an outcome they care about." },
    ],
  },
  pricing: {
    title: "Simple pricing.",
    subtitle: "One line on the value, then the plans.",
    plans: [
      { name: "Annual", price: "$X / year", descriptor: "Best value", ctaLabel: "Get early access", highlight: true },
      { name: "Monthly", price: "$Y / month", descriptor: "Flexible, cancel anytime", ctaLabel: "Get early access" },
    ],
    included: ["Benefit one", "Benefit two", "Benefit three", "Benefit four"],
    monthly: "$Y / month",
    annual: "$X / year",
    ctaLabel: "Get early access",
    scarcityLine: "No lock-in. Your data stays yours.",
  },
  testimonials: [
    { name: "Alex", age: 34, quote: "A short, specific quote that proves the outcome." },
    { name: "Sam", age: 41, quote: "Another angle on the value, in a real voice." },
    { name: "Jo", age: 29, quote: "A third proof point that handles an objection." },
  ],
  faq: [
    { q: "First objection as a question?", a: "A direct, reassuring answer." },
    { q: "Second common question?", a: "Clear answer, no hedging." },
    { q: "Third question?", a: "Short answer that removes friction." },
  ],
  fakedoor: {
    title: "Thanks for your interest!",
    body: "It isn't live yet. Leave your email to get first access at launch.",
    emailPlaceholder: "your email",
    submitLabel: "Reserve my spot",
    privacyLine: "No spam. One email when we launch.",
    badge: "Launching soon",
    fieldNote: "First access at launch",
    featuresTitle: "Which features matter most to you?",
    features: [
      { id: "feature-1", label: "Feature one" },
      { id: "feature-2", label: "Feature two" },
      { id: "feature-3", label: "Feature three" },
      { id: "feature-4", label: "Feature four" },
    ],
  },
  confirmation: {
    title: "You're on the list.",
    body: "We'll email you the moment it opens.",
  },
  finalCta: {
    headline: "Ready when you are.",
    ctaLabel: "Get early access",
  },
  footer: {
    lines: ["Your Product, coming soon.", "Privacy policy", "Contact"],
  },
};
