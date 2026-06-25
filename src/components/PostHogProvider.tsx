// PostHog is initialized in instrumentation-client.ts (Next.js 15.3+ pattern).
// This component is kept as a passthrough wrapper used in layout.tsx.
export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
