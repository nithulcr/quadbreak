import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectRouteInfo from "@/components/ProjectRouteInfo";
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

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = true;

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

  const seoKeywords = rankMathSeo?.keywords
    ? rankMathSeo.keywords
        .split(/[,|]/)
        .map((keyword) => keyword.trim())
        .filter(Boolean)
    : undefined;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords:
      seoKeywords && seoKeywords.length > 0
        ? seoKeywords
        : undefined,
    alternates: {
      canonical: canonicalUrl(project.slug),
    },
    openGraph: {
      title:
        rankMathSeo?.ogTitle ||
        rankMathSeo?.title ||
        project.title,
      description:
        rankMathSeo?.ogDescription ||
        rankMathSeo?.description ||
        project.shortDescription ||
        toPlainText(project.description),
      images: rankMathSeo?.ogImage
        ? [rankMathSeo.ogImage]
        : project.projectBanner?.url
          ? [project.projectBanner.url]
          : project.image?.url
            ? [project.image.url]
            : [],
      url: canonicalUrl(project.slug),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title:
        rankMathSeo?.twitterTitle ||
        rankMathSeo?.title ||
        project.title,
      description:
        rankMathSeo?.twitterDescription ||
        rankMathSeo?.description ||
        project.shortDescription ||
        toPlainText(project.description),
      images: rankMathSeo?.twitterImage
        ? [rankMathSeo.twitterImage]
        : rankMathSeo?.ogImage
          ? [rankMathSeo.ogImage]
          : project.projectBanner?.url
            ? [project.projectBanner.url]
            : project.image?.url
              ? [project.image.url]
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
  const currentIndex = allProjects.findIndex(
    (p) => p.id === project.id,
  );
  const hasNeighbors = allProjects.length > 1;

  const prevSlug = hasNeighbors
    ? (currentIndex > 0
        ? allProjects[currentIndex - 1]
        : allProjects[allProjects.length - 1]
      ).slug
    : null;

  const nextSlug = hasNeighbors
    ? (currentIndex < allProjects.length - 1
        ? allProjects[currentIndex + 1]
        : allProjects[0]
      ).slug
    : null;

  return (
    <main className="min-h-screen py-20 md:py-6">
      <ProjectGallery project={project} />
      <ProjectRouteInfo
        project={project}
        prevSlug={prevSlug}
        nextSlug={nextSlug}
      />
    </main>
  );
}