import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import {
  canonicalUrl,
  getProjectBySlug,
  getProjects,
  getRankMathSeo,
  toPlainText,
} from "@/lib/wordpress";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  const rankMathSeo = project.wordpressUrl
    ? await getRankMathSeo(project.wordpressUrl)
    : null;

  const seoTitle =
    rankMathSeo?.title?.trim() || project.title;

  const seoDescription =
    rankMathSeo?.description?.trim() ||
    project.shortDescription ||
    toPlainText(project.description);

  const seoImage =
    rankMathSeo?.ogImage ||
    rankMathSeo?.twitterImage ||
    project.projectBanner?.url ||
    project.image?.url ||
    "";

  const seoKeywords =
    rankMathSeo?.keywords
      ? rankMathSeo.keywords
          .split(/[,|]/)
          .map((keyword) => keyword.trim())
          .filter(Boolean)
      : [project.category, project.tags]
          .map((keyword) => (keyword || "").trim())
          .filter(Boolean);

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords.length ? seoKeywords : undefined,
    alternates: {
      canonical: canonicalUrl(project.slug),
    },
    openGraph: {
      title: rankMathSeo?.ogTitle || seoTitle,
      description:
        rankMathSeo?.ogDescription || seoDescription,
      images: rankMathSeo?.ogImage
        ? [rankMathSeo.ogImage]
        : seoImage
          ? [seoImage]
          : [],
      url: canonicalUrl(project.slug),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: rankMathSeo?.twitterTitle || seoTitle,
      description:
        rankMathSeo?.twitterDescription || seoDescription,
      images: rankMathSeo?.twitterImage
        ? [rankMathSeo.twitterImage]
        : seoImage
          ? [seoImage]
          : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getProjects();
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  return (
    <ProjectDetail project={project} relatedProjects={relatedProjects} />
  );
}