import { timingSafeEqual } from "node:crypto";
import { createManualTestLicense } from "../../../lib/license-store";

export const runtime = "nodejs";

function hasValidSecret(request: Request) {
  const configured = process.env.TEST_LICENSE_ADMIN_SECRET?.trim();
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();
  if (!configured || !supplied) return false;
  const expected = Buffer.from(configured, "utf8");
  const actual = Buffer.from(supplied, "utf8");
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function POST(request: Request) {
  if (process.env.VERCEL_ENV !== "production") return Response.json({ error: "Not found" }, { status: 404 });
  if (!hasValidSecret(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const created = await createManualTestLicense();
    if (!created) return Response.json({ error: "Test license already created" }, { status: 409 });
    return Response.json({ license: created.license, entitlement: created.entitlement, created: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Test license unavailable" }, { status: 503 });
  }
}
