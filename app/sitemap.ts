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
      url: "https://vyrodesk.com/about",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://vyrodesk.com/features",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://vyrodesk.com/blog",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: "https://vyrodesk.com/blog/ai-desktop-companion",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.72,
    },
    {
      url: "https://vyrodesk.com/blog/best-ai-desktop-assistant-windows",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.72,
    },
    {
      url: "https://vyrodesk.com/blog/ai-voice-assistant-for-pc",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.72,
    },
    {
      url: "https://vyrodesk.com/blog/vyro-ai-security",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.72,
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
