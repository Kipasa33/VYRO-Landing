import { Webhooks } from "@polar-sh/nextjs";
import type { WebhooksConfig } from "@polar-sh/adapter-utils";
import type { NextRequest } from "next/server";
import { issueCoreLicense } from "../../../lib/license-store";

export const runtime = "nodejs";

type PaidPayload = Parameters<NonNullable<WebhooksConfig["onOrderPaid"]>>[0];

const handler = async (payload: PaidPayload) => {
  const order = payload.data;
  const productId = process.env.POLAR_FOUNDER_PRODUCT_ID?.trim();
  if (!productId || order.productId !== productId || !order.paid || order.status !== "paid") return;
  if (order.currency.toLowerCase() !== "usd" || order.subtotalAmount !== 1900) return;
  await issueCoreLicense(order.id, order.checkoutId);
};

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.POLAR_WEBHOOK_SECRET?.trim();
  if (!webhookSecret) return new Response("Webhook secret is not configured", { status: 503 });
  return Webhooks({ webhookSecret, onOrderPaid: handler })(request);
}
