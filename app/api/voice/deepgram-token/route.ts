import { getDesktopSession, getLicenseRecord, hashDesktopSession, consumeRateLimit } from "../../../lib/license-store";

export const runtime = "nodejs";
const TTL_SECONDS = 120;

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization") || "";
  const rawSession = authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
  if (!rawSession || rawSession.length > 200) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const sessionHash = hashDesktopSession(rawSession);
    const session = await getDesktopSession(sessionHash);
    if (!session || Date.parse(session.expires_at) <= Date.now()) return Response.json({ error: "Unauthorized" }, { status: 401 });
    const license = await getLicenseRecord(session.license_hash);
    if (!license || license.status !== "active" || license.entitlement !== "core") return Response.json({ error: "Unauthorized" }, { status: 401 });
    if (!(await consumeRateLimit(`vyro:deepgram-rate:${sessionHash}`, 30, 60))) return Response.json({ error: "Too many requests" }, { status: 429 });
    const apiKey = process.env.DEEPGRAM_API_KEY?.trim();
    if (!apiKey) return Response.json({ error: "Voice service unavailable" }, { status: 503 });
    const response = await fetch("https://api.deepgram.com/v1/auth/grant", { method: "POST", headers: { Authorization: `Token ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ ttl_seconds: TTL_SECONDS }), cache: "no-store" });
    if (!response.ok) return Response.json({ error: "Voice service unavailable" }, { status: 503 });
    const grant = (await response.json()) as { access_token?: unknown; expires_in?: unknown };
    if (typeof grant.access_token !== "string" || !grant.access_token) return Response.json({ error: "Voice service unavailable" }, { status: 503 });
    return Response.json({ access_token: grant.access_token, expires_in: Number(grant.expires_in) || TTL_SECONDS }, { headers: { "Cache-Control": "no-store" } });
  } catch { return Response.json({ error: "Voice service unavailable" }, { status: 503 }); }
}
