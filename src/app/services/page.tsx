import type { Metadata } from "next";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceGrid from '@/components/serviceGrid';
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { GAME_ART_SERVICES } from "@/lib/services";
import { servicesSchema } from "@/lib/schema";
import { primaryKeywords } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "3D Game Art Services – Vehicles, Weapons & Environments",
  description:
    "Explore Quadbreak Studios' 3D game art services: game-ready vehicle and weapon modeling, environment art, hard-surface props, and VR and simulator assets.",
  path: "/services",
  keywords: [
    ...primaryKeywords,
    "hard surface 3D modeling",
    "game asset outsourcing",
  ],
});

export default function ServicesPage() {
  return (
    <div>
      <JsonLd data={servicesSchema(GAME_ART_SERVICES)} />
      <Header />
      <main>
      
      <ServiceGrid />

      </main>
      <Footer />
    </div>

  );
}
