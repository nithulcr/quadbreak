"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
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
  image?: { url?: string };
  projectBanner?: { url?: string };
  projectGallery?: { url?: string };
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

interface PortfolioGridProps {
  limit?: number;
}

const PortfolioGrid = ({ limit }: PortfolioGridProps) => {
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
    <div ref={sectionRef} className="py-16 lg:py-30">
      <div className="max-w-[1400px] mx-auto px-5">
        <div ref={headerRef} className="pt-30 pb-20  w-full">
       
            <h2 className="uppercase w-fit text-white heading text-5xl lg:text-[6rem] leading-none font-light relative">
              Portfolio
            </h2>
    
         
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const imageUrl = project.image?.url || "/images/seo.jpg";
            const slug = project.slug?.trim();
            const projectLink = slug ? `/projects/${slug}` : null;

            const CardInner = (
              <div className="about-card group relative top-0 aspect-[1/1.2] border border-white/10 rounded-xl overflow-hidden transition-[top,box-shadow] duration-500 ease-out hover:top-[-10px]">
                <img
                  src={imageUrl}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading={index < 3 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
               
                <div className="absolute bottom-[0px]  left-0 z-20 transition-all duration-500 ease-out bg-gradient-to-t from-black/80 via-black/40 w-full p-6">
                  <h5 className="font-light text-xl uppercase tracking-wider relative top-0 group-hover:top-[-20px] transition-all duration-500 ease-out">
                    {project.title}
                  </h5>
                  <p className="font-[200] text-[14px] max-w-[260px]">
                    {project.tech}
                  </p>
                </div>
              </div>
            );

            if (projectLink) {
              return (
                <Link key={project.id} href={projectLink} className="text-white block">
                  {CardInner}
                </Link>
              );
            }

            return (
              <div key={project.id} className="text-white cursor-default">
                {CardInner}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PortfolioGrid;
