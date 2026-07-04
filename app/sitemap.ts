import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://vyrodesk.com/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://vyrodesk.com/security",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://vyrodesk.com/privacy",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
