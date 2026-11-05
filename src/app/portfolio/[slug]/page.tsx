import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectRouteInfo from "@/components/ProjectRouteInfo";
import JsonLd from "@/components/JsonLd";
import {
  getProjectBySlug,
  getProjects,
  getRankMathSeo,
  toPlainText,
} from "@/lib/wordpress";
import { getCategoryLabel } from "@/lib/categories";
import { truncateDescription } from "@/lib/seo";
import { absoluteUrl, defaultOgImage, siteName } from "@/lib/site";
import { projectSchema } from "@/lib/schema";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = true;

function resolveImageUrl(image?: string): string | undefined {
  if (!image) return undefined;

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  return absoluteUrl(image);
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

  const plainDescription = toPlainText(project.description);
  const fallbackDescription =
    project.shortDescription ||
    plainDescription ||
    `Explore ${project.title}, a game-ready 3D asset project by ${siteName} for real-time games and simulation.`;

  const rawRankMathTitle = rankMathSeo?.title?.trim();
  const rankMathTitle =
    rawRankMathTitle && !/quadbreak\s*cms/i.test(rawRankMathTitle)
      ? rawRankMathTitle
      : undefined;

  const seoTitle =
    rankMathTitle ||
    `${project.title} – 3D Game Art Project | ${siteName}`;

  const seoDescription = truncateDescription(
    rankMathSeo?.description?.trim() || fallbackDescription,
  );

  const categoryLabels = project.category.map(getCategoryLabel);
  const tagKeywords = project.tags
    .split(/[,|]/)
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  const rankMathKeywords = rankMathSeo?.keywords
    ? rankMathSeo.keywords
        .split(/[,|]/)
        .map((keyword) => keyword.trim())
        .filter(Boolean)
    : [];

  const keywords = Array.from(
    new Set([
      ...rankMathKeywords,
      ...categoryLabels,
      ...tagKeywords,
      project.title,
    ]),
  );

  const image =
    resolveImageUrl(rankMathSeo?.ogImage) ||
    resolveImageUrl(project.projectBanner?.url) ||
    resolveImageUrl(project.image?.url) ||
    absoluteUrl(defaultOgImage);

  const canonical = absoluteUrl(`/portfolio/${project.slug}`);

  const rawOgTitle = rankMathSeo?.ogTitle?.trim();
  const ogTitle =
    rawOgTitle && !/quadbreak\s*cms/i.test(rawOgTitle)
      ? rawOgTitle
      : rankMathTitle || project.title;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      title: ogTitle,
      description:
        rankMathSeo?.ogDescription ||
        seoDescription,
      images: [
        {
          url: image,
          alt: `${project.title} – 3D game art by ${siteName}`,
        },
      ],
      url: canonical,
      siteName,
    },
    twitter: {
      card: "summary_large_image",
      title:
        rankMathSeo?.twitterTitle ||
        ogTitle,
      description:
        rankMathSeo?.twitterDescription ||
        seoDescription,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
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

  const description =
    project.shortDescription ||
    toPlainText(project.description) ||
    `A game-ready 3D asset project by ${siteName} for real-time games and simulation.`;

  const images = [
    project.projectBanner?.url,
    project.image?.url,
    ...project.projectGallery.map((image) => image.url),
  ]
    .filter((url): url is string => Boolean(url))
    .map((url) => resolveImageUrl(url))
    .filter((url): url is string => Boolean(url));

  return (
    <main className="min-h-screen py-20 md:py-6">
      <JsonLd
        data={projectSchema({
          title: project.title,
          description,
          slug: project.slug,
          images,
          categories: project.category.map(getCategoryLabel),
          tags: project.tags,
        })}
      />
      <ProjectGallery project={project} />
      <ProjectRouteInfo
        project={project}
        prevSlug={prevSlug}
        nextSlug={nextSlug}
      />
    </main>
  );
}
