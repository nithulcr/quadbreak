import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";
import { getCategoryLabel } from "@/lib/categories";
import { defaultOgImage } from "@/lib/site";

export default function ProjectGallery({ project }: { project: Project }) {
  const tags = project.tags
    .split(/[,|]/)
    .map((tag) => tag.trim())
    .filter(Boolean);

  return (
    <article className="max-w-[1320px] mx-auto px-5 lg:px-10">
      <nav aria-label="Breadcrumb" className="pb-6 text-xs uppercase tracking-[0.2em] text-white/50">
        <Link href="/portfolio" className="transition-colors hover:text-[var(--green)]">
          Portfolio
        </Link>
        <span aria-hidden="true" className="px-2">/</span>
        <span aria-current="page" className="text-white/80">{project.title}</span>
      </nav>

      <header className="pb-10 lg:pb-14">
        <h1 className="uppercase text-white text-4xl lg:text-6xl leading-none font-light">
          {project.title}
        </h1>

        {/* {description && (
          <p className="mt-6 max-w-3xl text-sm lg:text-base font-light leading-relaxed text-white/70">
            {description}
          </p>
        )} */}

        {(project.category.length > 0 || tags.length > 0) && (
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Project details">
            {project.category.map((category) => (
              <li
                key={category}
                className="border border-[var(--green)]/40 px-3 py-1 text-xs uppercase tracking-[0.15em] text-[var(--green)]"
              >
                {getCategoryLabel(category)}
              </li>
            ))}
            {tags.map((tag) => (
              <li
                key={tag}
                className="border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.15em] text-white/60"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>

      <div className="grid gap-10">
        {(project.projectGallery || []).map((galleryItem, index) => (
          <div
            key={`${galleryItem.url ?? "gallery"}-${index}`}
            className="w-full bg-[#1a1a1a] relative overflow-hidden border border-white/10"
          >
            <Image
              src={galleryItem.url || defaultOgImage}
              alt={`${project.title} – 3D game art production image ${index + 1}`}
              width={1400}
              height={827}
              sizes="(max-width: 1320px) 100vw, 1280px"
              className="h-auto w-full object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </article>
  );
}
