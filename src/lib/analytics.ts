import type { BeforeSendEvent } from "@vercel/analytics/react";
import { DEVICE_QUERY, isOwnerDevice } from "./device.ts";

/** Loopback names only. A public visit still reaches analytics from the visitor's connection. */
export function isLocalAnalyticsHost(hostname: string): boolean {
  const host = hostname.trim().toLowerCase().replace(/^\[|\]$/g, "");
  return host === "localhost" || host === "127.0.0.1" || host === "::1" || host === "0.0.0.0" || host.endsWith(".localhost");
}

/** Loopback and this browser send nothing, whatever the IP address is. */
export function shouldRecordAnalytics(hostname: string, owner = isOwnerDevice()): boolean {
  return !owner && !isLocalAnalyticsHost(hostname);
}

/** Drops this browser and any loopback page view. Removes the opt-out query if it is still on the URL. */
export function filterAnalyticsEvent(event: BeforeSendEvent): BeforeSendEvent | null {
  if (isOwnerDevice()) return null;
  try {
    const url = new URL(event.url);
    if (isLocalAnalyticsHost(url.hostname)) return null;
    if (!url.searchParams.has(DEVICE_QUERY)) return event;
    url.searchParams.delete(DEVICE_QUERY);
    url.hash = "";
    return { ...event, url: url.toString() };
  } catch {
    return null;
  }
}
