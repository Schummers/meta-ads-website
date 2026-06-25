import { createHash } from "crypto";

// Server-side Meta Conversions API (CAPI).
//
// Mirrors the browser Pixel conversion server-to-server so ad blockers can't
// drop the signal (they kill 20-40% of client events). Meta deduplicates the
// browser event and the server event when they share the same
// `event_id` + `event_name`, so the caller MUST pass the same event_id it gave
// the Pixel via fbq(..., { eventID }).
//
// Docs: https://developers.facebook.com/docs/marketing-api/conversions-api/

const API_VERSION = "v21.0";

function hash(value?: string): string | undefined {
  if (!value) return undefined;
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

type UserData = {
  email?: string;
  clientIp?: string;
  userAgent?: string;
  fbp?: string; // _fbp cookie set by the Pixel
  fbc?: string; // _fbc cookie (derived from fbclid) set by the Pixel
};

type ConversionEvent = {
  eventName: string; // e.g. "Lead"
  eventId: string; // shared with the browser Pixel for deduplication
  eventSourceUrl?: string;
  userData: UserData;
  customData?: Record<string, unknown>;
};

export async function sendMetaConversion(
  ev: ConversionEvent
): Promise<{ ok: boolean; error?: string }> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_ACCESS_TOKEN;
  if (!pixelId || !token) {
    return { ok: false, error: "meta capi not configured" };
  }

  const hashedEmail = hash(ev.userData.email);
  const user_data: Record<string, unknown> = {
    em: hashedEmail ? [hashedEmail] : undefined,
    client_ip_address: ev.userData.clientIp,
    client_user_agent: ev.userData.userAgent,
    fbp: ev.userData.fbp,
    fbc: ev.userData.fbc,
  };
  for (const key of Object.keys(user_data)) {
    if (user_data[key] === undefined) delete user_data[key];
  }

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: ev.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: ev.eventId,
        event_source_url: ev.eventSourceUrl,
        action_source: "website",
        user_data,
        custom_data: ev.customData,
      },
    ],
  };

  // When set, server events surface in Events Manager > Test Events. Leave
  // unset in production (Events Manager > Test Events shows the code to use).
  const testCode = process.env.META_TEST_EVENT_CODE;
  if (testCode) payload.test_event_code = testCode;

  try {
    const res = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${pixelId}/events?access_token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: `meta capi ${res.status}: ${text}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
