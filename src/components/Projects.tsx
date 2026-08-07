"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AnimatedButton from "@/components/AnimatedButton";
import { makeMediaUrl } from "@/utlis/media";

interface ImageData {
  url: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  tech: string;
  slug?: string;
  url?: string;
  image?: {
    data?: {
      attributes: ImageData;
    };
    url?: string;
  };
}

interface WorksProps {
  limit?: number;
}

const Works = ({ limit }: WorksProps) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/projects?populate=*`
        );
        const data = await res.json();
        console.log("✅ Raw Projects:", data.data);
        setProjects(data.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <div id="works" className="section">
      <div className="shape1 z-[-1]"></div>
      <div className="shape2 z-[-1]"></div>
      <div className="max-w-[1360px] mx-auto px-5">
        <div className="mb-10 sm:mb-20 sm:flex  gap-8 justify-between w-full items-center">
          <div>
            <div className="subtitle text-[11px] tracking-[4px] uppercase text-white">
              Best Websites
            </div>
            <h2 className="heading text-white text-3xl lg:text-[2.3rem] mt-4 mb-4 leading-snug font-medium gradient-text font-monument">
              My Latest Works
            </h2>
          </div>

          <p className="text-white/80 text-[17px] leading-relaxed lg:text-right max-w-[650px]">
            A selection of recent projects showcasing my expertise in responsive design, modern UI/UX, and seamless user interactions. Each project reflects a strong focus on performance, accessibility, and client goals.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full">
            <div
              className={`grid gap-x-8 gap-y-14 sm:grid-cols-3 md:grid-cols-4 w-full ${limit ? " pb-10" : ""
                }`}
            >
              {displayedProjects.map((project) => {
                /* ---------- Resolve image ---------- */
                const rawImageUrl =
                  project.image?.data?.attributes?.url || project.image?.url;
                const imageUrl = makeMediaUrl(rawImageUrl) || "/images/seo.jpg";

                /* ---------- Resolve link ---------- */
                /* ---------- Resolve link safely ---------- */
                const slug = project.slug?.trim();
                const externalUrl = project.url?.trim();

                // Detect external URLs (absolute links)
                const isAbsolute = typeof externalUrl === "string" && /^https?:\/\//i.test(externalUrl);

                let projectLink: string | null = null;
                let isExternal = false;

                if (isAbsolute) {
                  // Use the given external link directly
                  projectLink = externalUrl;
                  isExternal = true;
                } else if (slug) {
                  // Build internal link only if slug is present and not an absolute URL
                  const isSlugAbsolute = /^https?:\/\//i.test(slug);
                  projectLink = isSlugAbsolute ? slug : `/projects/${slug.replace(/^\/+/, "")}`;
                  isExternal = isSlugAbsolute;
                }



                /* ---------- Card content ---------- */
                const CardInner = (
                  <div className="relative">
                    <div className="aspect-[.85/1] w-full overflow-hidden relative">
                      <Image
                        src={imageUrl}
                        alt={project.title || "Project Image"}
                        fill
                        className="h-fit transition-transform duration-500 group-hover:translate-y-[6px] object-contain object-top bg-[#ab010f1c]"
                      />
                    </div>
                    <div className="grid gap-1 text-center absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full backdrop-blur-sm bg-[#16181c73] p-3">
                      <h3 className="text-1xl lg:text-[18px] font-monument">
                        {project.title}
                      </h3>
                      <div className="text-sm">{project.tech}</div>
                      {/* <div className="grid grid-cols-3 gap-2 justify-center items-center text-sm text-gray-200">
                        <div>{project.category}</div>
                        <div className="h-[1px] bg-gray-500 w-12 mx-auto" />
                        <div>{project.tech}</div>
                      </div> */}

                    </div>
                  </div>
                );

                /* ---------- Conditional wrapper ---------- */
                if (projectLink) {
                  return (
                    <a
                      key={project.id}
                      href={projectLink}
                      target={"_blank"}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="grid gap-4 text-white w-full group collection-item"
                    >
                      {CardInner}
                    </a>
                  );
                }

                return (
                  <div
                    key={project.id}
                    className="grid gap-4 text-white w-full group collection-item cursor-default"
                  >
                    {CardInner}
                  </div>
                );
              })}
            </div>

            {limit && (
              <AnimatedButton
                label="View More Projects? "
                className="w-fit ml-auto mr-auto mt-8 md:mt-16"
                href="/projects"
                
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;
