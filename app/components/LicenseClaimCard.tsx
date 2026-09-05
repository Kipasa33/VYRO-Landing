"use client";
import { useEffect, useState } from "react";
type ClaimState = "loading" | "pending" | "ready" | "claimed" | "invalid" | "error";
export default function LicenseClaimCard() {
  const [state, setState] = useState<ClaimState>("loading");
  const [license, setLicense] = useState("");
  const [copied, setCopied] = useState(false);
  const [retryNonce, setRetryNonce] = useState(0);
  useEffect(() => {
    const checkoutId = new URLSearchParams(window.location.search).get("checkout_id")?.trim();
    if (!checkoutId) { setState("invalid"); return; }
    let cancelled = false;
    const claim = async (attempt: number) => {
      try {
        const response = await fetch("/api/license/claim", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ checkout_id: checkoutId }), cache: "no-store", credentials: "same-origin" });
        if (cancelled) return;
        if (response.ok) { const payload = await response.json() as { license?: unknown }; if (typeof payload.license === "string" && payload.license) { setLicense(payload.license); setState("ready"); } else setState("error"); return; }
        if (response.status === 404 && attempt < 5) { setState("pending"); window.setTimeout(() => { if (!cancelled) void claim(attempt + 1); }, 2000); return; }
        setState(response.status === 409 ? "claimed" : response.status === 400 || response.status === 403 ? "invalid" : "error");
      } catch { if (!cancelled) setState("error"); }
    };
    void claim(0);
    return () => { cancelled = true; };
  }, [retryNonce]);
  if (state === "invalid") return <div className="license-claim-card"><h2>License key unavailable</h2><p>Open this page from your completed purchase to retrieve your VYRO Core key.</p></div>;
  if (state === "claimed") return <div className="license-claim-card"><h2>License key already claimed</h2><p>This key was already shown once. Use the recovery page if you need it again.</p><a href="/recover-key">Recover License Key</a></div>;
  if (state === "error") return <div className="license-claim-card"><h2>We’re still preparing your key</h2><p>Please try again shortly or use the recovery page.</p><button type="button" onClick={() => { setState("loading"); setRetryNonce((value) => value + 1); }}>Retry</button><a href="/recover-key">Recover License Key</a></div>;
  return <div className="license-claim-card"><h2>VYRO Core is yours</h2>{state === "ready" ? <><p>Your license key:</p><code>{license}</code><button type="button" onClick={() => { void navigator.clipboard?.writeText(license); setCopied(true); }}>{copied ? "Copied" : "Copy License Key"}</button><p>Save this key. You’ll use it once to activate VYRO on your PC.</p></> : <p>{state === "pending" ? "Your key is being prepared…" : "Preparing your license key…"}</p>}</div>;
}
