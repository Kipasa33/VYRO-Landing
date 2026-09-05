const POLAR_API_URL = "https://api.polar.sh/v1/checkouts";
const CORE_PRICE_CENTS = 1900;

type CheckoutResponse = {
  id?: unknown;
  status?: unknown;
  product_id?: unknown;
  amount?: unknown;
  currency?: unknown;
};

export async function verifyCoreCheckout(checkoutId: string) {
  const accessToken = process.env.POLAR_ACCESS_TOKEN?.trim();
  const productId = process.env.POLAR_FOUNDER_PRODUCT_ID?.trim();
  if (!accessToken || !productId) return false;

  const response = await fetch(`${POLAR_API_URL}/${encodeURIComponent(checkoutId)}`, {
    headers: { Accept: "application/json", Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  if (!response.ok) return false;
  const checkout = (await response.json()) as CheckoutResponse;
  return checkout.id === checkoutId && checkout.status === "succeeded" && checkout.product_id === productId && checkout.amount === CORE_PRICE_CENTS && String(checkout.currency).toLowerCase() === "usd";
}
