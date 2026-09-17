"use client";

import { useLayoutEffect } from "react";
import type { Project } from "@/types/project";
import { useProjectViewer } from "./ProjectViewer";

export default function ProjectRouteInfo({
  project,
  prevSlug,
  nextSlug,
}: {
  project: Project;
  prevSlug?: string | null;
  nextSlug?: string | null;
}) {
  const { register } = useProjectViewer();

  // Layout effect so the new page's prev/next slugs are registered before the
  // viewer's route-cleanup releases the transition lock.
  useLayoutEffect(() => {
    register({
      slug: project.slug,
      title: project.title,
      prevSlug: prevSlug ?? null,
      nextSlug: nextSlug ?? null,
    });
  }, [project.slug, project.title, prevSlug, nextSlug, register]);

  return null;
}