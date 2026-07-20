export type AnalyticsEventName =
  | "demo_play"
  | "primary_cta_click"
  | "pricing_view"
  | "founder_checkout_click"
  | "begin_checkout"
  | "download_click"
  | "scroll_50"
  | "scroll_90";

type AnalyticsValue = string | number | boolean;
export type AnalyticsParameters = Record<string, AnalyticsValue | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
const trackedOnce = new Set<string>();

export function getPagePath() {
  if (typeof window === "undefined") return "";
  return `${window.location.pathname}${window.location.search}`;
}

export function trackEvent(eventName: AnalyticsEventName, parameters: AnalyticsParameters = {}) {
  if (!measurementId || typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", eventName, {
    ...parameters,
    page_path: parameters.page_path ?? getPagePath(),
  });
}

export function trackEventOnce(key: string, eventName: AnalyticsEventName, parameters: AnalyticsParameters = {}) {
  if (trackedOnce.has(key)) return;
  trackedOnce.add(key);
  trackEvent(eventName, parameters);
}

export function trackPageView() {
  if (!measurementId || typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "page_view", {
    page_path: getPagePath(),
    page_title: document.title,
  });
}
