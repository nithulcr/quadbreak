import type { Metadata } from "next";
import Header from '@/components/Header';
import PortfolioGrid from '@/components/PortfolioGrid';
import Footer from '@/components/Footer';
import JsonLd from "@/components/JsonLd";
import { getProjects } from '@/lib/wordpress';
import { buildMetadata } from "@/lib/seo";
import { portfolioSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "3D Game Art Portfolio – Quadbreak Studios",
  description:
    "Browse Quadbreak Studios' portfolio of game-ready 3D assets, vehicles, weapons, props, and environment art produced for games and simulation projects.",
  path: "/portfolio",
  keywords: [
    "3D game art portfolio",
    "game-ready 3D assets",
    "3D vehicle modeling",
    "3D weapon modeling",
    "3D environment art",
  ],
});

export default async function ProjectPage() {
  const projects = await getProjects();

  return (
    <div>
      <JsonLd
        data={portfolioSchema(
          projects.map((project) => ({
            title: project.title,
            slug: project.slug,
            image: project.image?.url || project.projectBanner?.url,
          })),
        )}
      />
      <Header />
      <main>
        
        <PortfolioGrid projects={projects} />
      </main>
      <Footer />
    </div>
  );
}
