"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedButton from "@/components/AnimatedButton";
import type { Project } from "@/types/project";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailProps {
  project: Project | null;
  relatedProjects: Project[];
}

export default function ProjectDetail({
  project,
  relatedProjects,
}: ProjectDetailProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const relatedHeaderRef = useRef<HTMLDivElement>(null);
  const relatedGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.from(heroRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
      }).from(
        infoRef.current,
        { opacity: 0, y: 30, duration: 0.7, ease: "power2.out" },
        "-=0.45",
      );

      if (galleryRef.current) {
        gsap.from(galleryRef.current, {
          opacity: 0,
          y: 60,
          scale: 0.96,
          duration: 0.9,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }

      if (relatedGridRef.current && relatedGridRef.current.children.length > 0) {
        tl.from(relatedHeaderRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "power2.out",
        }, "-=0.3");

        gsap.from(relatedGridRef.current.children, {
          opacity: 0,
          y: 60,
          scale: 0.96,
          duration: 0.9,
          stagger: { each: 0.12, from: "start" },
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: relatedGridRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div>
        <Header />
        <main className="min-h-screen flex flex-col items-center justify-center gap-6">
          <h1 className="text-white text-4xl font-light">Project Not Found</h1>
          <AnimatedButton href="/projects" label="Back to Portfolio" className="w-fit" />
        </main>
        <Footer />
      </div>
    );
  }

  const hasButton = Boolean(project.buttonName && project.buttonUrl);

  return (
    <div>
      <Header />
      <main>
        <section ref={sectionRef}>
          <div>
            {/* Hero Banner */}
            <div ref={heroRef} className="relative">
              <div className="w-full h-[60vh] lg:h-[70vh] relative">
                <Image
                  src={project.projectBanner?.url || project.image?.url || "/images/bg-banner.jpg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
              <div className="max-w-[1450px] mx-auto px-5 lg:px-10 w-full absolute bottom-0 left-0 right-0 pb-12 lg:pb-20">
                <h1 className="uppercase text-white text-4xl lg:text-[5rem] leading-none font-light mb-6">
                  {project.title}
                </h1>
                <p className="text-white/80 text-[14px] lg:text-[18px] leading-relaxed font-[200] max-w-[600px]">
                  {project.shortDescription || `A ${project.title} project built with ${project.tags}.`}
                </p>
              </div>
            </div>

            {/* Project Info */}
            <div ref={infoRef} className="max-w-[1450px] mx-auto px-5 lg:px-10 py-14 lg:py-24 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-20">
              <div className="lg:col-span-2">
                <h2 className="uppercase text-white text-3xl lg:text-[3rem] leading-none font-light mb-6">
                  About This Project
                </h2>
                <div
                  className="text-white/80 text-[14px] lg:text-[18px] leading-relaxed font-[200] max-w-[800px]"
                  dangerouslySetInnerHTML={{
                    __html: project.description || `A ${project.title} project built with ${project.tags}. Showcasing our expertise in ${project.category} for modern games and interactive experiences.`,
                  }}
                />
              </div>

              <div className="flex flex-col gap-6">
                {project.category && (
                  <div>
                    <h3 className="text-white/40 text-xs uppercase tracking-[3px] mb-2">Category</h3>
                    <p className="text-white text-lg font-light">{project.category}</p>
                  </div>
                )}
                {project.tags && (
                  <div>
                    <h3 className="text-white/40 text-xs uppercase tracking-[3px] mb-2">Tags</h3>
                    <p className="text-white text-lg font-light">{project.tags}</p>
                  </div>
                )}
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  {hasButton && (
                    <AnimatedButton href={project.buttonUrl as string} label={project.buttonName as string} className="w-fit" />
                  )}
                  <AnimatedButton href="/projects" label="All Projects" className="w-fit" />
                </div>
              </div>
            </div>

            {/* Gallery Images */}
            <div ref={galleryRef} className="max-w-[1450px] mx-auto px-5 lg:px-10 pb-12 lg:pb-20 grid  gap-10 ">
              {project.image?.url && (
                <div className="w-full  bg-[#1a1a1a] relative overflow-hidden border border-white/10">
                  <Image
                    src={project.image.url}
                    alt={`${project.title} image`}
                    width={1450}
                    height={827}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              {project.projectGallery?.map((galleryItem, index) => (
                <div key={index} className="w-full  bg-[#1a1a1a] relative overflow-hidden border border-white/10">
                  <Image
                    src={galleryItem.url || "/images/seo.jpg"}
                    alt={`${project.title} gallery ${index + 1}`}
                    width={1450}
                    height={827}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-16 lg:py-24">
            <div className="max-w-[1450px] mx-auto px-5 lg:px-10">
              <div ref={relatedHeaderRef} className="mb-10 lg:mb-16 w-fit">
                <h2 className="uppercase text-white heading text-5xl lg:text-[5rem] leading-none font-light">
                  More Works
                </h2>
              </div>

              <div ref={relatedGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((rp, index) => (
                  <Link
                    key={rp.id}
                    href={`/projects/${rp.slug}`}
                    className="text-white block"
                  >
                    <div className="about-card group relative border border-white/10 rounded-xl top-0 aspect-[1/1.08] overflow-hidden transition-[top,box-shadow] duration-500 ease-out hover:top-[-10px]">
                      <img
                        src={rp.image?.url || "/images/seo.jpg"}
                        alt={rp.title}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading={index < 3 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                      
                      <div className="absolute bottom-[0px]  left-0 z-20 transition-all duration-500 ease-out bg-gradient-to-t from-black/80 via-black/40 w-full p-6">
                        <h5 className="font-light text-xl uppercase tracking-wider relative top-0 group-hover:top-[-20px] transition-all duration-500 ease-out">
                          {rp.title}
                        </h5>
                        <p className="font-[200] text-[14px] max-w-[260px]">
                          {rp.tags}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}