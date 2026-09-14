"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { Project } from "@/types/project";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioGridProps {
  limit?: number;
  projects?: Project[];
}

const PortfolioGrid = ({ limit, projects = [] }: PortfolioGridProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const list = limit ? projects.slice(0, limit) : projects;

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
      <div className="max-w-[1450px] mx-auto px-5 lg:px-10">
        <div ref={headerRef} className="pt-30 pb-20  w-full">
       
            <h2 className="uppercase w-fit text-white heading text-5xl lg:text-[6rem] leading-none font-light relative">
              Portfolio
            </h2>
    
         
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {list.map((project, index) => {
            const imageUrl = project.image?.url || "/images/seo.jpg";
            const slug = project.slug?.trim();
            const projectLink = slug ? `/projects/${slug}` : null;

            const CardInner = (
              <div className="about-card group relative top-0 aspect-[1/1.08] border border-white/10 rounded-2xl overflow-hidden  duration-500 ease-out">
                <img
                  src={imageUrl}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.1] group-hover:rotate-2"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading={index < 3 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
               
                <div className="absolute bottom-[0px]  left-0 z-20 transition-all duration-500 ease-out bg-gradient-to-t from-black/80 via-black/40 w-full p-8">
                  <h5 className="font-light text-xl lg:text-2xl pb-1 text-[var(--green)] relative top-0 group-hover:top-[-20px] transition-all duration-500 ease-out">
                    {project.title}
                  </h5>
                  <p className="font-[200] text-[14px] max-w-[260px]">
                    {project.tags}
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
