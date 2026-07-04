import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://vyrodesk.com/success",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    url: "https://vyrodesk.com/success",
  },
};

export default function SuccessLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}