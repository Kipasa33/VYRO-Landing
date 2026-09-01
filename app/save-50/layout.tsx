import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VYRO Creator Rewards — Get Up to 100% Back",
  description: "Share VYRO on TikTok, Reels, YouTube Shorts, X, or Facebook. Reach 2,000 views for 50% back, 10,000 for a full refund, or unlock VYRO Pro at 25,000 views.",
  alternates: {
    canonical: "https://vyrodesk.com/save-50",
  },
  openGraph: {
    title: "VYRO Creator Rewards — Get Up to 100% Back",
    description: "Share VYRO and earn up to 100% back — or unlock VYRO Pro free.",
    url: "https://vyrodesk.com/save-50",
  },
};

export default function SaveFiftyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
