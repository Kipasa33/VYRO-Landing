const RESEND_API_URL = "https://api.resend.com/emails";

export async function sendCoreLicenseEmail(to: string, license: string) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!apiKey || !from) throw new Error("Email delivery is not configured");

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: "Your VYRO Core license",
      text: `Thanks for purchasing VYRO Core.\n\nYour license key:\n${license}\n\nUse this key to activate VYRO on your Windows PC.\n\nKeep this license key somewhere safe.\n\nVYRO Core\nhttps://vyrodesk.com`,
    }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Email delivery failed: ${response.status}`);
}
