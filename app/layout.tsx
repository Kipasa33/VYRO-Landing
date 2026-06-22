import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-sans" });

const siteUrl = "https://vyrodesk.com";
const title = "VYRO - AI Desktop Companion for Windows";
const description =
  "Talk to your desktop. It talks back. VYRO AI is an AI desktop companion and Windows AI companion with voice commands, focus mode, emotions, and productivity tools.";
const socialDescription =
  "Talk to your desktop. It talks back. VYRO AI is a playful AI assistant for Windows with voice commands, focus mode, emotions, and productivity tools.";
const socialImage = `${siteUrl}/vyro-mascot-clean.png`;
const siteIcon = `${siteUrl}/icon-512x512.png`;

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "VYRO",
  url: siteUrl,
  category: "AI Desktop Assistant",
  operatingSystem: "Windows",
  applicationCategory: "ProductivityApplication",
  description,
  image: socialImage,
  offers: {
    "@type": "Offer",
    price: "19",
    priceCurrency: "USD",
    url: siteUrl,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VYRO",
  url: siteUrl,
  logo: siteIcon,
  sameAs: [siteUrl],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "VYRO",
    "VYRO AI",
    "VYRO Desktop Assistant",
    "AI Desktop Companion",
    "AI Assistant for Windows",
    "Desktop Assistant",
    "Desktop AI Robot",
    "Voice Assistant",
    "Windows AI Companion",
    "Windows AI Assistant",
  ],
  alternates: {
    canonical: siteUrl,
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title,
    description: socialDescription,
    url: siteUrl,
    siteName: "VYRO",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "VYRO AI desktop companion mascot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: socialDescription,
    images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${mono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
