export type AnalyticsEventName =
  | "demo_play"
  | "hero_demo_scene_view"
  | "primary_cta_click"
  | "pricing_view"
  | "founder_checkout_click"
  | "begin_checkout"
  | "download_click"
  | "purchase"
  | "scroll_50"
  | "scroll_90";

type AnalyticsItem = Record<string, string | number>;
type AnalyticsValue = string | number | boolean | AnalyticsItem[];
export type AnalyticsParameters = Record<string, AnalyticsValue | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
const trackedOnce = new Set<string>();
const trackedPurchases = new Set<string>();
const purchaseStoragePrefix = "vyro:ga4:purchase:";

export function getPagePath() {
  if (typeof window === "undefined") return "";
  return `${window.location.pathname}${window.location.search}`;
}

export function trackEvent(eventName: AnalyticsEventName, parameters: AnalyticsParameters = {}) {
  if (!measurementId || typeof window === "undefined" || !window.gtag) return false;

  window.gtag("event", eventName, {
    ...parameters,
    page_path: parameters.page_path ?? getPagePath(),
  });
  return true;
}

export function trackEventOnce(key: string, eventName: AnalyticsEventName, parameters: AnalyticsParameters = {}) {
  if (trackedOnce.has(key)) return true;
  const sent = trackEvent(eventName, parameters);
  if (sent) trackedOnce.add(key);
  return sent;
}

export function trackVerifiedPurchase(transactionId: string) {
  if (typeof window === "undefined" || !transactionId) return false;

  const storageKey = `${purchaseStoragePrefix}${transactionId}`;
  let wasTracked = trackedPurchases.has(transactionId);

  try {
    wasTracked ||= window.localStorage.getItem(storageKey) === "1";
  } catch {
    // In-memory deduplication still works if storage is unavailable.
  }

  if (wasTracked) return true;

  const sent = trackEvent("purchase", {
    transaction_id: transactionId,
    value: 19,
    currency: "USD",
    items: [
      {
        item_id: "vyro-founder-edition",
        item_name: "VYRO Founder Edition",
        price: 19,
        quantity: 1,
      },
    ],
  });

  if (!sent) return false;

  trackedPurchases.add(transactionId);
  try {
    window.localStorage.setItem(storageKey, "1");
  } catch {
    // The in-memory set prevents duplicates for the current page session.
  }

  return true;
}

export function trackPageView() {
  if (!measurementId || typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "page_view", {
    page_path: getPagePath(),
    page_title: document.title,
  });
}
