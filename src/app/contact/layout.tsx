import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Quadbreak Studios – Start a 3D Art Project",
  description:
    "Contact Quadbreak Studios to discuss 3D game art outsourcing, vehicle and weapon modeling, environment art, or VR and simulator asset production.",
  path: "/contact",
  keywords: [
    "game asset outsourcing",
    "3D game art studio",
    "3D vehicle modeling",
    "3D weapon modeling",
    "contact Quadbreak Studios",
  ],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
