import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

const policySections = [
  {
    title: "Overview",
    body: "This Privacy Policy explains how VYRO may process information when you use the website, purchase VYRO, or use the Windows desktop app. VYRO is designed to feel helpful and visible, while keeping users in control of desktop actions and settings.",
  },
  {
    title: "Information VYRO may process",
    body: "Depending on the features you enable, VYRO may process account or purchase details, license recovery information, app settings, voice command text, user prompts, basic website analytics, and information needed to complete requested desktop actions.",
  },
  {
    title: "Microphone and voice commands",
    body: "VYRO uses microphone access for voice commands when enabled. Voice input may be converted into text so VYRO can understand a request, respond, open apps, or perform visible desktop actions you ask for.",
  },
  {
    title: "Desktop actions and permissions",
    body: "VYRO can help with desktop actions such as opening apps you request. Sensitive actions should remain under user control or confirmation, and desktop actions are intended to stay visible rather than hidden in the background.",
  },
  {
    title: "AI processing",
    body: "Some AI features may send text/transcription or user prompts to external AI services for processing. Do not share passwords, payment card numbers, or other sensitive information in prompts unless you are comfortable with that processing.",
  },
  {
    title: "Payment processing",
    body: "Payments are handled by our payment provider and VYRO does not store full payment card details. Purchase, receipt, and license information may be used to provide access, recover keys, and support your order.",
  },
  {
    title: "Analytics",
    body: "Website analytics may collect basic usage information such as page views, device/browser details, referrers, and approximate usage patterns so we can understand and improve the site.",
  },
  {
    title: "Data retention",
    body: "We keep information only as long as reasonably needed for purchases, support, security, product improvement, and legal or operational requirements. Retention may vary based on the type of information and provider systems involved.",
  },
  {
    title: "User control and settings",
    body: "Users remain in control and can disable features in settings. You can choose whether to enable voice features, manage permissions in Windows, and contact support for help with purchase or license access.",
  },
  {
    title: "Security",
    body: "We use reasonable technical and organizational safeguards to protect VYRO systems and purchase flows. No software or online service can guarantee perfect security, so please use strong account practices and avoid sharing sensitive secrets in prompts.",
  },
  {
    title: "Contact",
    body: "Questions about privacy, purchases, or license access can be sent to support@vyrodesk.com.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <div className="privacy-glow privacy-glow-one" />
      <div className="privacy-glow privacy-glow-two" />
      <nav className="privacy-nav" aria-label="Privacy navigation">
        <Link className="privacy-back" href="/"><ArrowLeft size={16} /> Back to Home</Link>
        <Link className="privacy-logo" href="/">VYRO<sup>&reg;</sup></Link>
      </nav>

      <section className="privacy-hero" aria-labelledby="privacy-title">
        <span className="privacy-kicker"><ShieldCheck size={16} /> Privacy and control</span>
        <h1 id="privacy-title">Privacy Policy</h1>
        <p>
          Clear, careful notes about microphone access, AI processing, payments,
          analytics, and the controls you keep while using VYRO.
        </p>
      </section>

      <section className="privacy-grid" aria-label="Privacy policy sections">
        {policySections.map((section, index) => (
          <article className="privacy-card" key={section.title}>
            <span>0{index + 1}</span>
            <h2>{section.title}</h2>
            <p>
              {section.title === "Contact" ? (
                <>
                  Questions about privacy, purchases, or license access can be sent to{" "}
                  <a href="mailto:support@vyrodesk.com">support@vyrodesk.com</a>.
                </>
              ) : (
                section.body
              )}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
