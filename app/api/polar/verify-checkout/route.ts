import { NextRequest, NextResponse } from "next/server";

const POLAR_API_URL = "https://api.polar.sh/v1/checkouts";
const FOUNDER_PRICE_CENTS = 1900;
const checkoutIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type PolarCheckout = {
  id?: unknown;
  status?: unknown;
  product_id?: unknown;
  amount?: unknown;
  currency?: unknown;
};

function noStoreJson(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}

export async function GET(request: NextRequest) {
  const checkoutId = request.nextUrl.searchParams.get("checkout_id")?.trim();
  if (!checkoutId || !checkoutIdPattern.test(checkoutId)) {
    return noStoreJson({ verified: false }, 400);
  }

  const accessToken = process.env.POLAR_ACCESS_TOKEN?.trim();
  const founderProductId = process.env.POLAR_FOUNDER_PRODUCT_ID?.trim();
  if (!accessToken || !founderProductId) {
    return noStoreJson({ verified: false }, 503);
  }

  let polarResponse: Response;
  try {
    polarResponse = await fetch(`${POLAR_API_URL}/${encodeURIComponent(checkoutId)}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });
  } catch {
    return noStoreJson({ verified: false }, 502);
  }

  if (!polarResponse.ok) {
    return noStoreJson({ verified: false }, polarResponse.status === 404 ? 404 : 502);
  }

  const checkout = (await polarResponse.json()) as PolarCheckout;
  const verified =
    checkout.id === checkoutId &&
    checkout.status === "succeeded" &&
    checkout.product_id === founderProductId &&
    checkout.amount === FOUNDER_PRICE_CENTS &&
    typeof checkout.currency === "string" &&
    checkout.currency.toLowerCase() === "usd";

  if (!verified) {
    return noStoreJson({ verified: false }, 403);
  }

  return noStoreJson({ verified: true, transactionId: checkoutId }, 200);
}
