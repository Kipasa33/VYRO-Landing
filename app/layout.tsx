import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://vyrodesk.com"),
  title: "VYRO - AI Desktop Companion for Windows",
  description:
    "Talk to your desktop. It talks back. VYRO is an AI desktop companion with voice commands, focus mode, emotions, and productivity tools.",
  keywords: [
    "VYRO",
    "AI Desktop Companion",
    "Desktop Assistant",
    "Voice Assistant",
    "Windows AI Assistant",
  ],
  alternates: {
    canonical: "https://vyrodesk.com",
  },
  openGraph: {
    title: "VYRO - AI Desktop Companion for Windows",
    description:
      "Talk to your desktop. It talks back. VYRO is an AI desktop companion with voice commands, focus mode, emotions, and productivity tools.",
    url: "https://vyrodesk.com",
    siteName: "VYRO",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "VYRO - AI Desktop Companion for Windows",
    description:
      "Talk to your desktop. It talks back. VYRO is an AI desktop companion with voice commands, focus mode, emotions, and productivity tools.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
