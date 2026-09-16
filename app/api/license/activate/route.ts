import { createDesktopSession, getLicenseRecord, hashLicenseKey } from "../../../lib/license-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let license: unknown;
  try { license = (await request.json())?.license_key; } catch { return Response.json({ error: "Invalid request" }, { status: 400 }); }
  if (typeof license !== "string" || license.trim().length < 20 || license.length > 128) return Response.json({ error: "Invalid license" }, { status: 400 });
  try {
    const record = await getLicenseRecord(hashLicenseKey(license.trim()));
    if (!record) {
      console.warn("[VYRO][ActivationDiagnostic]", { stage: "record_not_found" });
      return Response.json({ error: "Invalid license" }, { status: 403 });
    }
    if (record.status !== "active" || record.entitlement !== "core") {
      console.warn("[VYRO][ActivationDiagnostic]", {
        stage: "record_ineligible",
        status: typeof record.status === "string" ? record.status.slice(0, 40) : "unknown",
        entitlement: typeof record.entitlement === "string" ? record.entitlement.slice(0, 40) : "unknown",
      });
      return Response.json({ error: "Invalid license" }, { status: 403 });
    }
    const session = await createDesktopSession(record.license_hash);
    return Response.json({ session_token: session.rawSession, entitlement: "core", expires_at: session.record.expires_at }, { headers: { "Cache-Control": "no-store" } });
  } catch { return Response.json({ error: "Activation unavailable" }, { status: 503 }); }
}
