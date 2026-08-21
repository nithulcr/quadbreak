"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import AnimatedButton from "@/components/AnimatedButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  tech: string;
  description?: string;
  slug?: string;
  url?: string;
  image?: { url?: string };
}

const staticProjects: Project[] = [
  {
    id: 1,
    title: "Desert Storm",
    category: "3D Vehicles",
    tech: "Blender, Substance Painter, Unreal Engine",
    description: "High-poly military vehicle modeled and textured for a AAA desert combat game.",
    slug: "desert-storm",
    image: { url: "/images/works/1.png" },
  },
  {
    id: 2,
    title: "Neon Arsenal",
    category: "Weapons",
    tech: "Maya, ZBrush, Quixel Mixer",
    description: "Sci-fi weapon set created for a cyberpunk FPS title.",
    slug: "neon-arsenal",
    image: { url: "/images/works/2.png" },
  },
  {
    id: 3,
    title: "Arctic Outpost",
    category: "3D Environment",
    tech: "Unreal Engine 5, SpeedTree, Substance",
    description: "Full environment build for a survival game set in the Arctic.",
    slug: "arctic-outpost",
    image: { url: "/images/works/3.png" },
  },
  {
    id: 4,
    title: "Jungle Canopy",
    category: "Vegetation",
    tech: "SpeedTree, Blender, UE5",
    description: "Dense jungle vegetation pack for an open-world adventure game.",
    slug: "jungle-canopy",
    image: { url: "/images/works/4.png" },
  },
  {
    id: 5,
    title: "Rust & Ruin",
    category: "Props",
    tech: "Blender, Substance Painter",
    description: "Post-apocalyptic prop collection for an indie horror game.",
    slug: "rust-ruin",
    image: { url: "/images/works/5.png" },
  },
  {
    id: 6,
    title: "Fantasy Realm",
    category: "Stylized Art",
    tech: "Blender, Photoshop, Unity",
    description: "Stylized environment and props for a mobile RPG.",
    slug: "fantasy-realm",
    image: { url: "/images/works/6.jpeg" },
  },
];

interface WorksProps {
  limit?: number;
}

const Works = ({ limit }: WorksProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const projects = limit ? staticProjects.slice(0, limit) : staticProjects;

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.from(headerRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
      });

      gsap.from(gridRef.current?.children || [], {
        opacity: 0,
        y: 60,
        scale: 0.96,
        duration: 0.9,
        stagger: { each: 0.12, from: "start" },
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} id="works" className="section">
      <div className="shape1 z-[-1]"></div>
      <div className="shape2 z-[-1]"></div>
      <div className="max-w-[1450px] mx-auto px-5 lg:px-10">
        <div ref={headerRef} className="mb-10 sm:mb-20 sm:flex gap-8 justify-between w-full items-center">
          <div>
            <div className="subtitle text-[11px] tracking-[4px] uppercase text-white">
              Best Websites
            </div>
            <h2 className="heading text-white text-3xl lg:text-[2.3rem] mt-4 mb-4 leading-snug font-medium gradient-text font-monument">
              My Latest Works
            </h2>
          </div>
          <p className="text-white/80 text-[17px] leading-relaxed lg:text-right max-w-[650px]">
            A selection of recent projects showcasing my expertise in responsive design, modern UI/UX, and seamless user interactions.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full">
            <div
              ref={gridRef}
              className={`grid gap-x-8 gap-y-14 sm:grid-cols-3 md:grid-cols-4 w-full ${limit ? "pb-10" : ""}`}
            >
              {projects.map((project) => {
                const imageUrl = project.image?.url || "/images/seo.jpg";
                const slug = project.slug?.trim();
                const projectLink = slug ? `/projects/${slug}` : null;

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
                    </div>
                  </div>
                );

                if (projectLink) {
                  return (
                    <a
                      key={project.id}
                      href={projectLink}
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
