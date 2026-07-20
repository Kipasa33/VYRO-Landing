"use client";

import { useEffect } from "react";
import { trackVerifiedPurchase } from "../lib/analytics";

type VerificationResponse = {
  verified?: boolean;
  transactionId?: string;
};

export default function VerifiedPurchaseTracker() {
  useEffect(() => {
    const checkoutIdParameter = new URLSearchParams(window.location.search).get("checkout_id")?.trim();
    if (!checkoutIdParameter) return;
    const checkoutId = checkoutIdParameter;

    const controller = new AbortController();
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    function sendWhenAnalyticsIsReady(transactionId: string, attempt = 0) {
      if (controller.signal.aborted || trackVerifiedPurchase(transactionId)) return;
      if (attempt >= 20) return;
      retryTimer = setTimeout(() => sendWhenAnalyticsIsReady(transactionId, attempt + 1), 250);
    }

    async function verifyPurchase() {
      try {
        const response = await fetch(`/api/polar/verify-checkout?checkout_id=${encodeURIComponent(checkoutId)}`, {
          cache: "no-store",
          credentials: "same-origin",
          signal: controller.signal,
        });
        if (!response.ok) return;

        const result = (await response.json()) as VerificationResponse;
        if (result.verified && result.transactionId) {
          sendWhenAnalyticsIsReady(result.transactionId);
        }
      } catch {
        // Verification failures must never produce a purchase event.
      }
    }

    void verifyPurchase();

    return () => {
      controller.abort();
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, []);

  return null;
}
