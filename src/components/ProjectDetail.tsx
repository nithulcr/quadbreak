"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Project } from "@/types/project";
import gsap from "gsap";

interface ProjectDetailProps {
  project: Project | null;
  prevSlug?: string | null;
  nextSlug?: string | null;
}

export default function ProjectDetail({
  project,
  prevSlug,
  nextSlug,
}: ProjectDetailProps) {
  const router = useRouter();
  const backdropRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const isNavigating = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(backdropRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      })
        .from(
          contentRef.current,
          {
            y: "100vh",
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.15",
        )
        .from(
          controlsRef.current,
          {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.5",
        );
    });

    return () => ctx.revert();
  }, [project]);

  const go = (url: string | null) => {
    if (!url || isNavigating.current) return;

    isNavigating.current = true;

    if (!contentRef.current || !backdropRef.current) {
      router.push(url);
      return;
    }

    gsap.to(contentRef.current, {
      y: "100vh",
      opacity: 0,
      duration: 0.45,
      ease: "power2.in",
    });
    gsap.to(controlsRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.45,
      ease: "power2.in",
      onComplete: () => router.push(url),
    });
  };

  if (!project) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-6">
        <h1 className="text-white text-4xl font-light">Project Not Found</h1>
        <button
          onClick={() => go("/portfolio")}
          className="border border-[var(--green)] text-white px-6 py-3 rounded-full hover:bg-[var(--green)] hover:text-black transition-colors cursor-pointer"
        >
          Back to Portfolio
        </button>
      </div>
    );
  }

  const prevHref = prevSlug ? `/portfolio/${prevSlug}` : null;
  const nextHref = nextSlug ? `/portfolio/${nextSlug}` : null;

  const navButtonClass =
    "flex items-center  justify-center w-11 h-11 rounded-full border border-white/20 text-white hover:bg-[var(--green)] hover:border-[var(--green)] hover:text-black transition-all cursor-pointer";

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-[90] bg-[var(--background)]"
      />

      {/* Fullscreen content (normal flow so window/Lenis scroll works) */}
      <main
        ref={contentRef}
        className="relative z-[100] min-h-screen pt-24 lg:pt-28 pb-20"
      >
        <div className="max-w-[1450px] mx-auto px-5 lg:px-10 gap-10 grid">
          {project.projectGallery?.map((galleryItem, index) => (
            <div
              key={index}
              className="w-full bg-[#1a1a1a] relative overflow-hidden border border-white/10"
            >
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
      </main>

      {/* Floating controls */}
      <div
        ref={controlsRef}
        className="fixed top-0 inset-x-0 z-[110] flex items-center justify-between gap-4 px-4 lg:px-8 py-4 bg-black/70 backdrop-blur-sm"
      >
        <div className="w-[100px] flex items-center gap-2 lg:gap-3">
          {prevHref && (
            <button onClick={() => go(prevHref)} className={navButtonClass}>
              <ChevronLeft className="w-5 h-5" />
              {/* <span className="hidden sm:inline">Previous</span> */}
            </button>
          )}
          {nextHref && (
            <button onClick={() => go(nextHref)} className={navButtonClass}>
              {/* <span className="hidden sm:inline">Next</span> */}
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        <h2 className="uppercase text-white text-sm lg:text-lg font-light tracking-widest truncate">
          {project.title}
        </h2>

       <div className="w-[100px] ">
         <button
          onClick={() => go("/portfolio")}
          aria-label="Close"
          className="flex items-center ml-auto justify-center w-11 h-11 rounded-full border border-white/20 text-white hover:bg-[var(--green)] hover:border-[var(--green)] hover:text-black transition-all cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>
       </div>
      </div>
    </>
  );
}