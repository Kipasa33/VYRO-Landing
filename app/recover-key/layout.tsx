import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://vyrodesk.com/recover-key",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    url: "https://vyrodesk.com/recover-key",
  },
};

export default function RecoverKeyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}