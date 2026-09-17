import Image from "next/image";
import type { Project } from "@/types/project";

export default function ProjectGallery({ project }: { project: Project }) {
  return (
    <div className="max-w-[1320px] mx-auto px-5 lg:px-10 gap-10 grid">
      {project.projectGallery?.map((galleryItem, index) => (
        <div
          key={index}
          className="w-full bg-[#1a1a1a] relative overflow-hidden border border-white/10"
        >
          <Image
            src={galleryItem.url || "/images/seo.jpg"}
            alt={`${project.title} gallery ${index + 1}`}
            width={1400}
            height={827}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}