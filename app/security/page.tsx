import type { Metadata } from "next";
import Link from "next/link";

const title = "Is VYRO Safe? Security, Privacy & Permissions Explained";
const description = "Is VYRO safe to use? Learn how VYRO handles privacy, microphone permissions, app control, data, and Windows security.";
const pageUrl = "https://vyrodesk.com/security";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: pageUrl },
  robots: { index: true, follow: true },
  openGraph: { title, description, url: pageUrl, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const securitySections = [
  ["safe-to-install", "Install", "Is VYRO safe to install?", "VYRO is a Windows desktop companion designed to respond to supported commands you give it. For the safest setup, download VYRO only from the official website and keep Windows up to date."],
  ["permissions", "Permissions", "What permissions does VYRO use?", "Permissions depend on the features you enable. Windows controls microphone permission, and VYRO settings let you choose whether to enable features such as voice control. Review Windows prompts and settings before enabling a feature."],
  ["microphone", "Voice", "Does VYRO use the microphone?", "VYRO uses microphone access for voice commands when voice features are enabled. Voice input may be converted to text so VYRO can understand a request; you can manage microphone access through Windows."],
  ["data", "Data", "What data does VYRO collect?", "Depending on the features you use, VYRO may process purchase or account details, app settings, voice-command text, prompts, website analytics, and information needed for requested desktop actions. Retention can vary by information type and provider."],
  ["computer-control", "Control", "Can VYRO control my computer?", "VYRO can help with supported actions such as opening apps you request or starting Focus Mode. These actions are intended to be user-triggered and visible, with sensitive actions remaining under your control or confirmation."],
  ["background", "Visibility", "Does VYRO run in the background?", "VYRO is designed to be visible rather than hidden while it helps with desktop actions. You can quit or close VYRO when you do not need it, and review enabled features and permissions in its settings and Windows."],
  ["privacy-protection", "Privacy", "How VYRO protects user privacy", "VYRO is designed around clear permissions and user control. Some AI features may send text, transcriptions, or prompts to external AI services for processing, so avoid sharing passwords, payment card numbers, or other sensitive information in prompts unless you are comfortable with that processing."],
  ["stay-safe", "Good practice", "How to stay safe when using VYRO", "Install VYRO from the official site, review permissions before enabling voice features, keep Windows updated, and use only the features you understand."],
] as const;

const faqs = [
  ["Is VYRO safe?", "VYRO is designed as a user-controlled AI desktop companion for Windows. It is intended to respond to supported commands you give it, with desktop actions visible and sensitive actions under your control or confirmation."],
  ["Is VYRO malware?", "VYRO is presented as a Windows desktop companion. As with any software, download it only from the official VYRO website and keep Windows up to date."],
  ["Does VYRO listen to my microphone all the time?", "VYRO uses microphone access for voice commands when voice features are enabled. You can manage microphone permission through Windows and choose whether voice features are enabled."],
  ["Does VYRO collect personal data?", "Depending on the features you use, VYRO may process purchase or account details, settings, voice-command text, prompts, analytics, and information needed for requested desktop actions. Some AI features may use external AI services for processing."],
  ["Can VYRO access my files?", "The current product information does not document general file browsing or file access. Review Windows permission prompts and feature settings before enabling a feature, and see the Privacy Policy for the current processing details."],
  ["Can I disable VYRO permissions?", "Yes. You can choose whether to enable features in VYRO settings and manage permissions, including microphone access, through Windows."],
] as const;

const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://vyrodesk.com/" }, { "@type": "ListItem", position: 2, name: "Security", item: pageUrl }] };

export default function SecurityPage() {
  return (
    <main className="privacy-page security-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <header className="policy-topbar">
        <Link className="policy-brand" href="/" aria-label="VYRO home">VYRO</Link>
        <nav className="policy-nav-links" aria-label="Main navigation"><Link href="/">Home</Link><Link href="/#demo">Demo</Link><Link href="/privacy">Privacy</Link><Link href="/recover-key">Recover Key</Link></nav>
        <Link className="policy-nav-cta" href="/#pricing">Get VYRO</Link>
      </header>

      <section className="security-hero" aria-labelledby="security-title">
        <p className="policy-kicker">VYRO AI security</p>
        <h1 id="security-title">Is VYRO Safe?</h1>
        <p>VYRO is designed with privacy and user control in mind. It uses the permissions needed for enabled features, and you remain in control of what VYRO can access and do on your PC.</p>
      </section>

      <section className="security-shell" aria-label="VYRO security and privacy information">
        <div className="security-grid">
          {securitySections.map(([id, label, sectionTitle, body]) => (
            <article className="security-card" id={id} key={id}>
              <span>{label}</span><h2>{sectionTitle}</h2>
              <p>{id === "data" ? <>Depending on the features you use, VYRO may process purchase or account details, app settings, voice-command text, prompts, website analytics, and information needed for requested desktop actions. Retention can vary by information type and provider; see the <Link href="/privacy">Privacy Policy</Link> for details.</> : id === "privacy-protection" ? <>VYRO is designed around clear permissions and user control. Some AI features may send text, transcriptions, or prompts to external AI services for processing, so avoid sharing passwords, payment card numbers, or other sensitive information in prompts unless you are comfortable with that processing. Learn more about VYRO&apos;s <Link href="/ai-assistant-for-pc">Windows assistant</Link>.</> : id === "stay-safe" ? <>Install VYRO from the official site, review permissions before enabling voice features, keep Windows updated, and use only the features you understand. Explore supported capabilities on the <Link href="/features">features page</Link>, and review the <Link href="/privacy">Privacy Policy</Link> for detailed processing and retention information.</> : body}</p>
            </article>
          ))}
        </div>

        <section className="security-faq" aria-labelledby="security-faq-title">
          <p className="policy-kicker">Security FAQ</p><h2 id="security-faq-title">VYRO safety questions</h2>
          <div className="security-faq-list">
            {faqs.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{question === "Can VYRO access my files?" ? <>The current product information does not document general file browsing or file access. Review Windows permission prompts and feature settings before enabling a feature, and see the <Link href="/privacy">Privacy Policy</Link> for the current processing details.</> : answer}</p></article>)}
          </div>
        </section>

        <section className="security-faq" aria-labelledby="security-resources-title">
          <p className="policy-kicker">Learn more</p><h2 id="security-resources-title">Product and privacy resources</h2>
          <p>Read the <Link href="/blog/vyro-ai-security">VYRO AI security guide</Link>, explore <Link href="/features">product features</Link>, or learn how VYRO works as an <Link href="/ai-assistant-for-pc">AI assistant for PC</Link>.</p>
        </section>
      </section>

      <footer className="site-footer professional-footer">
        <div className="site-footer-brand"><Link className="site-footer-logo" href="/">VYRO</Link><p>AI desktop companion for Windows.</p></div>
        <div className="site-footer-column"><h3>Company</h3><Link href="/">Home</Link><Link href="/#demo">Demo</Link><Link href="/#pricing">Pricing</Link><Link href="/security">Security</Link><Link href="/privacy">Privacy Policy</Link><Link href="/recover-key">Recover Key</Link></div>
        <div className="site-footer-column"><h3>Support</h3><a href="mailto:support@vyrodesk.com">support@vyrodesk.com</a><Link href="/recover-key">Recover license key</Link></div>
      </footer>
    </main>
  );
}
