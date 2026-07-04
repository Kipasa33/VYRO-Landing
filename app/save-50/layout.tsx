import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://vyrodesk.com/save-50",
  },
  openGraph: {
    url: "https://vyrodesk.com/save-50",
  },
};

export default function SaveFiftyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}