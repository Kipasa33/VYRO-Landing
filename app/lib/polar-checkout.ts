import { trackEvent } from "./analytics";

export const POLAR_CHECKOUT_URL =
  "https://buy.polar.sh/polar_cl_wimEWnugkl85wNdE9xIONWONxXSVe2EUlAOW34MdNv8";

export function startPolarCheckout(source = "landing_page", ctaLocation = source) {
  trackEvent("founder_checkout_click", { source, cta_location: ctaLocation });
  trackEvent("begin_checkout", { source, cta_location: ctaLocation, currency: "USD", value: 19.00 });
  const event = { event: "checkout_started", source };
  window.dataLayer?.push(event);
  window.dispatchEvent(new CustomEvent("checkout_started", { detail: { source } }));
  const checkoutUrl = new URL(POLAR_CHECKOUT_URL);
  checkoutUrl.searchParams.set("utm_source", source);
  checkoutUrl.searchParams.set("utm_campaign", "checkout_started");
  window.open(checkoutUrl.toString(), "_blank", "noopener,noreferrer");
}
