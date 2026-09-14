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

  const rankMathSeo = await getRankMathSeo(project.slug);

  const seoTitle =
    rankMathSeo?.title || project.title;
  const seoDescription =
    rankMathSeo?.description ||
    project.shortDescription ||
    toPlainText(project.description);

  const seoImage = project.projectBanner?.url || project.image?.url || "";

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: canonicalUrl(project.slug),
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: seoImage ? [seoImage] : [],
      url: canonicalUrl(project.slug),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: seoImage ? [seoImage] : [],
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