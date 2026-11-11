import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Quadbreak Studios – 3D Art Production Team",
  description:
    "Meet the team behind Quadbreak Studios, a AAA game art outsourcing studio producing game-ready vehicles, weapons, props and environment art since 2016.",
  path: "/studio",
  keywords: [
    "3D game art studio",
    "AAA game art production",
    "game asset outsourcing",
    "hard surface 3D modeling",
    "3D environment art",
  ],
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
