import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = siteConfig.url;

  const docs = source.getPages().map((page) => ({
    changeFrequency: "weekly" as const,
    lastModified: new Date(),
    priority: 0.8,
    url: `${url}${page.url}`,
  }));

  return [
    {
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 1,
      url: url,
    },
    ...docs,
  ];
}
