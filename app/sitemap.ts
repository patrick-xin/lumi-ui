import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = siteConfig.url;

  const docs = source.getPages().map((page) => ({
    url: `${url}${page.url}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...docs,
  ];
}
