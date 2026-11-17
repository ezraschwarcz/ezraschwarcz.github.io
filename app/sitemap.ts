import type { MetadataRoute } from "next";
import { getProjects, siteUrl } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [{ url: `${base}/` }, ...getProjects().map((p) => ({ url: `${base}/work/${p.slug}/` }))];
}
