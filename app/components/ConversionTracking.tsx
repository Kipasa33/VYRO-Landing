"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackEvent, trackEventOnce, type AnalyticsEventName } from "../lib/analytics";

function getCtaLocation(element: HTMLElement, pathname: string) {
  const explicitLocation = element.dataset.ctaLocation;
  if (explicitLocation) return explicitLocation;
  if (element.closest("#pricing")) return "pricing";
  if (element.closest("#demo")) return "demo";
  if (element.closest(".hero")) return "hero";
  if (element.closest("footer")) return "footer";
  if (pathname.startsWith("/blog")) return "blog";
  return pathname === "/" ? "landing_page" : pathname.slice(1).replaceAll("/", "_");
}

function isPrimaryPricingCta(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href");
  const label = anchor.textContent ?? "";
  return (href === "#pricing" || href === "/#pricing") && /\b(get|try|buy|founder)\b/i.test(label);
}

export default function ConversionTracking() {
  const pathname = usePathname();

  useEffect(() => {
    const pageKey = pathname || "/";

    function handleScroll() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const progress = (window.scrollY / scrollableHeight) * 100;
      if (progress >= 50) trackEventOnce(`${pageKey}:scroll_50`, "scroll_50", { scroll_percent: 50 });
      if (progress >= 90) trackEventOnce(`${pageKey}:scroll_90`, "scroll_90", { scroll_percent: 90 });
    }

    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const analyticsElement = target.closest<HTMLElement>("[data-analytics-event]");
      if (analyticsElement) {
        trackEvent(analyticsElement.dataset.analyticsEvent as AnalyticsEventName, {
          cta_location: getCtaLocation(analyticsElement, pathname),
        });
      }

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      if (!analyticsElement && isPrimaryPricingCta(anchor)) {
        trackEvent("primary_cta_click", { cta_location: getCtaLocation(anchor, pathname) });
      }

      if (anchor.href.startsWith("https://buy.polar.sh/")) {
        const ctaLocation = getCtaLocation(anchor, pathname);
        trackEvent("founder_checkout_click", { cta_location: ctaLocation, source: "direct_checkout_link" });
        trackEvent("begin_checkout", { cta_location: ctaLocation, currency: "USD", value: 19.00 });
      }

      if (/\.exe(?:$|\?)/i.test(anchor.href)) {
        trackEvent("download_click", { cta_location: getCtaLocation(anchor, pathname) });
      }
    }

    function handlePlay(event: Event) {
      const target = event.target;
      if (!(target instanceof HTMLVideoElement) || target.dataset.analyticsVideo !== "demo") return;
      trackEventOnce(`${pageKey}:demo_play`, "demo_play", { cta_location: "demo" });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClick);
    document.addEventListener("play", handlePlay, true);
    handleScroll();

    const pricingSection = document.getElementById("pricing");
    const pricingObserver = pricingSection
      ? new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              trackEventOnce(`${pageKey}:pricing_view`, "pricing_view", { section: "pricing" });
            }
          },
          { threshold: 0.3 },
        )
      : null;

    if (pricingSection && pricingObserver) pricingObserver.observe(pricingSection);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("play", handlePlay, true);
      pricingObserver?.disconnect();
    };
  }, [pathname]);

  return null;
}
