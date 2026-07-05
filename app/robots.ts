import type { MetadataRoute } from "next";

const allowedCrawlers = [
  "*",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "CCBot",
  "Google-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: allowedCrawlers.map((userAgent) => ({
      userAgent,
      allow: "/",
    })),
    sitemap: "https://vyrodesk.com/sitemap.xml",
  };
}
