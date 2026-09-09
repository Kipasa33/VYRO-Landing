import { getDesktopSession, getLicenseRecord, hashDesktopSession, consumeRateLimit } from "../../../lib/license-store";

export const runtime = "nodejs";
const TTL_SECONDS = 120;

function logVoiceTokenDiagnostic(stage: string, details: Record<string, unknown> = {}) {
  console.error("[VYRO][VoiceToken]", {
    stage,
    ...details
  });
}

function getSafeUpstreamError(body: unknown) {
  const value = body && typeof body === "object" ? body as Record<string, unknown> : {};
  const errorCode = typeof value.err_code === "string"
    ? value.err_code.slice(0, 80)
    : typeof value.code === "string"
      ? value.code.slice(0, 80)
      : null;
  const errorMessage = typeof value.err_msg === "string"
    ? value.err_msg.slice(0, 160)
    : typeof value.error === "string"
      ? value.error.slice(0, 160)
      : typeof value.message === "string"
        ? value.message.slice(0, 160)
        : null;
  return { errorCode, errorMessage };
}

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
    if (!apiKey) {
      logVoiceTokenDiagnostic("deepgram_api_key_missing", { hasDeepgramApiKey: false });
      return Response.json({ error: "Voice service unavailable" }, { status: 503 });
    }
    const response = await fetch("https://api.deepgram.com/v1/auth/grant", { method: "POST", headers: { Authorization: `Token ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ ttl_seconds: TTL_SECONDS }), cache: "no-store" });
    if (!response.ok) {
      let body: unknown = null;
      try { body = await response.clone().json(); } catch { /* non-JSON upstream response */ }
      logVoiceTokenDiagnostic("deepgram_grant_rejected", {
        hasDeepgramApiKey: true,
        upstreamStatus: response.status,
        ...getSafeUpstreamError(body)
      });
      return Response.json({ error: "Voice service unavailable" }, { status: 503 });
    }
    const grant = (await response.json()) as { access_token?: unknown; expires_in?: unknown };
    if (typeof grant.access_token !== "string" || !grant.access_token) {
      logVoiceTokenDiagnostic("deepgram_grant_response_invalid", {
        hasDeepgramApiKey: true,
        responseFields: Object.keys(grant && typeof grant === "object" ? grant : {}).sort()
      });
      return Response.json({ error: "Voice service unavailable" }, { status: 503 });
    }
    return Response.json({ access_token: grant.access_token, expires_in: Number(grant.expires_in) || TTL_SECONDS }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    logVoiceTokenDiagnostic("deepgram_grant_request_failed", {
      hasDeepgramApiKey: Boolean(process.env.DEEPGRAM_API_KEY?.trim()),
      errorCode: typeof error === "object" && error && "name" in error ? String(error.name).slice(0, 80) : "unknown",
      errorMessage: typeof error === "object" && error && "message" in error ? String(error.message).slice(0, 160) : null
    });
    return Response.json({ error: "Voice service unavailable" }, { status: 503 });
  }
}
