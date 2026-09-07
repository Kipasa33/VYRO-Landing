import { Webhooks } from "@polar-sh/nextjs";
import type { WebhooksConfig } from "@polar-sh/adapter-utils";
import type { NextRequest } from "next/server";
import { claimLicenseEmailDelivery, getLicenseClaim, issueCoreLicense, releaseLicenseEmailDelivery } from "../../../lib/license-store";
import { sendCoreLicenseEmail } from "../../../lib/email";

export const runtime = "nodejs";

type PaidPayload = Parameters<NonNullable<WebhooksConfig["onOrderPaid"]>>[0];

const handler = async (payload: PaidPayload) => {
  const order = payload.data;
  const productId = process.env.POLAR_FOUNDER_PRODUCT_ID?.trim();
  if (!productId || order.productId !== productId || !order.paid || order.status !== "paid") return;
  if (order.currency.toLowerCase() !== "usd" || order.subtotalAmount !== 1900) return;
  const issued = await issueCoreLicense(order.id, order.checkoutId);
  const email = order.customer.email?.trim();
  if (!email || !email.includes("@") || !(await claimLicenseEmailDelivery(order.id))) return;
  const rawLicense = await getLicenseClaim(issued.licenseHash);
  if (!rawLicense) {
    await releaseLicenseEmailDelivery(order.id);
    return;
  }
  try {
    await sendCoreLicenseEmail(email, rawLicense);
  } catch {
    await releaseLicenseEmailDelivery(order.id);
  }
};

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.POLAR_WEBHOOK_SECRET?.trim();
  if (!webhookSecret) return new Response("Webhook secret is not configured", { status: 503 });
  return Webhooks({ webhookSecret, onOrderPaid: handler })(request);
}
