import { getLicenseHashForCheckout, getLicenseRecord, consumeLicenseClaim } from "../../../lib/license-store";
import { verifyCoreCheckout } from "../../../lib/polar-core";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let checkoutId: unknown;
  try {
    checkoutId = (await request.json())?.checkout_id;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (typeof checkoutId !== "string" || !/^[0-9a-f-]{36}$/i.test(checkoutId)) return Response.json({ error: "Invalid checkout" }, { status: 400 });
  if (!(await verifyCoreCheckout(checkoutId))) return Response.json({ error: "Checkout is not verified" }, { status: 403 });

  const licenseHash = await getLicenseHashForCheckout(checkoutId);
  if (!licenseHash) return Response.json({ error: "License is not ready to claim" }, { status: 404 });
  const record = await getLicenseRecord(licenseHash);
  if (!record || record.status !== "active") return Response.json({ error: "License is not claimable" }, { status: 404 });
  const rawLicense = await consumeLicenseClaim(licenseHash);
  if (!rawLicense) return Response.json({ error: "License has already been claimed or expired" }, { status: 409 });
  return Response.json({ license: rawLicense }, { headers: { "Cache-Control": "no-store" } });
}
