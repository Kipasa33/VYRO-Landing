import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VYRO - AI Desktop Companion for Windows",
    short_name: "VYRO",
    description:
      "Talk to your desktop. It talks back. VYRO is an AI desktop companion for Windows.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#15151a",
    theme_color: "#22d3ee",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
