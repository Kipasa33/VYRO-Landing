import { createHash, randomBytes } from "node:crypto";

const CLAIM_TTL_SECONDS = 15 * 60;
export const DESKTOP_SESSION_TTL_SECONDS = 30 * 24 * 60 * 60;
const redisUrl = process.env.UPSTASH_REDIS_KV_REST_API_URL?.trim();
const redisToken = process.env.UPSTASH_REDIS_KV_REST_API_TOKEN?.trim();

type LicenseRecord = {
  license_hash: string;
  polar_order_id: string;
  polar_checkout_id: string | null;
  entitlement: "core";
  status: "active";
  created_at: string;
  revoked_at: null;
};

export type DesktopSessionRecord = {
  session_hash: string;
  license_hash: string;
  entitlement: "core";
  created_at: string;
  expires_at: string;
};

function requireRedisConfig() {
  if (!redisUrl || !redisToken) throw new Error("Upstash REST credentials are not configured");
}

async function redisCommand<T = unknown>(command: string, ...args: string[]): Promise<T> {
  requireRedisConfig();
  const response = await fetch(redisUrl!, {
    method: "POST",
    headers: { Authorization: `Bearer ${redisToken}`, "Content-Type": "application/json" },
    body: JSON.stringify([command, ...args]),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Redis request failed: ${response.status}`);
  const payload = (await response.json()) as { result?: T; error?: string };
  if (payload.error) throw new Error(`Redis command failed: ${payload.error}`);
  return payload.result as T;
}

function licenseKey() {
  const hex = randomBytes(16).toString("hex").toUpperCase();
  return `VYRO-${hex.slice(0, 8)}-${hex.slice(8, 16)}-${hex.slice(16, 24)}-${hex.slice(24)}`;
}

export function hashLicenseKey(rawLicense: string) {
  return createHash("sha256").update(rawLicense, "utf8").digest("hex");
}

export async function issueCoreLicense(orderId: string, checkoutId: string | null) {
  const orderKey = `vyro:polar:order:${orderId}`;
  const existingHash = await redisCommand<string | null>("GET", orderKey);
  if (existingHash) return { created: false, licenseHash: existingHash };

  const rawLicense = licenseKey();
  const licenseHash = hashLicenseKey(rawLicense);
  const record: LicenseRecord = {
    license_hash: licenseHash,
    polar_order_id: orderId,
    polar_checkout_id: checkoutId,
    entitlement: "core",
    status: "active",
    created_at: new Date().toISOString(),
    revoked_at: null,
  };

  const claimed = await redisCommand<string | null>("SET", orderKey, licenseHash, "NX");
  if (claimed !== "OK") {
    const duplicateHash = await redisCommand<string | null>("GET", orderKey);
    return { created: false, licenseHash: duplicateHash ?? licenseHash };
  }

  await redisCommand("SET", `vyro:license:${licenseHash}`, JSON.stringify(record));
  if (checkoutId) await redisCommand("SET", `vyro:polar:checkout:${checkoutId}`, licenseHash);
  await redisCommand("SET", `vyro:license-claim:${licenseHash}`, rawLicense, "EX", String(CLAIM_TTL_SECONDS), "NX");
  return { created: true, licenseHash };
}

export async function getLicenseHashForCheckout(checkoutId: string) {
  return redisCommand<string | null>("GET", `vyro:polar:checkout:${checkoutId}`);
}

export async function getLicenseRecord(licenseHash: string) {
  const raw = await redisCommand<string | null>("GET", `vyro:license:${licenseHash}`);
  return raw ? (JSON.parse(raw) as LicenseRecord) : null;
}

export function hashDesktopSession(rawSession: string) {
  return createHash("sha256").update(rawSession, "utf8").digest("hex");
}

export async function createDesktopSession(licenseHash: string) {
  const rawSession = randomBytes(32).toString("base64url");
  const sessionHash = hashDesktopSession(rawSession);
  const now = Date.now();
  const record: DesktopSessionRecord = {
    session_hash: sessionHash,
    license_hash: licenseHash,
    entitlement: "core",
    created_at: new Date(now).toISOString(),
    expires_at: new Date(now + DESKTOP_SESSION_TTL_SECONDS * 1000).toISOString(),
  };
  await redisCommand("SET", `vyro:desktop-session:${sessionHash}`, JSON.stringify(record), "EX", String(DESKTOP_SESSION_TTL_SECONDS), "NX");
  return { rawSession, record };
}

export async function getDesktopSession(sessionHash: string) {
  const raw = await redisCommand<string | null>("GET", `vyro:desktop-session:${sessionHash}`);
  return raw ? (JSON.parse(raw) as DesktopSessionRecord) : null;
}

export async function consumeRateLimit(key: string, limit: number, windowSeconds: number) {
  const count = await redisCommand<number>("INCR", key);
  if (count === 1) await redisCommand("EXPIRE", key, String(windowSeconds));
  return count <= limit;
}

export async function consumeLicenseClaim(licenseHash: string) {
  return redisCommand<string | null>("GETDEL", `vyro:license-claim:${licenseHash}`);
}

export const licenseClaimTtlSeconds = CLAIM_TTL_SECONDS;
