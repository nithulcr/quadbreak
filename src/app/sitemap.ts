import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/wordpress";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/studio"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/portfolio"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/privacy-policy"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: absoluteUrl("/terms-and-conditions"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((project) => project.slug?.trim())
    .map((project) => ({
      url: absoluteUrl(`/portfolio/${project.slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...projectRoutes];
}
