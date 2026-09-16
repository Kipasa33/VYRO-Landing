import { timingSafeEqual } from "node:crypto";
import { getLicenseRecord, hashLicenseKey } from "../../../lib/license-store";

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
  let license: unknown;
  try { license = (await request.json())?.license; } catch { return Response.json({ error: "Invalid request" }, { status: 400 }); }
  const normalized = typeof license === "string" ? license.trim() : "";
  const formatValid = /^VYRO-[A-F0-9]{8}(?:-[A-F0-9]{8}){3}$/i.test(normalized);
  const base = { formatValid, normalizedLength: normalized.length };
  if (!formatValid) return Response.json({ ...base, recordFound: false }, { headers: { "Cache-Control": "no-store" } });
  try {
    const record = await getLicenseRecord(hashLicenseKey(normalized));
    if (!record) return Response.json({ ...base, recordFound: false }, { headers: { "Cache-Control": "no-store" } });
    return Response.json({ ...base, recordFound: true, status: typeof record.status === "string" ? record.status.slice(0, 40) : "unknown", entitlement: typeof record.entitlement === "string" ? record.entitlement.slice(0, 40) : "unknown" }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ ...base, recordFound: false, error: "diagnostic_unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
