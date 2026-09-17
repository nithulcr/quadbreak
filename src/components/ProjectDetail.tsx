"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Project } from "@/types/project";
import { getProjectBySlug } from "@/lib/wordpress";
import gsap from "gsap";

interface ProjectDetailProps {
  project: Project | null;
  prevSlug?: string | null;
  nextSlug?: string | null;
}

// Module-scope flag: survives the client subtree remount that Next.js performs
// when navigating between SSG dynamic routes, so the arrived page knows it was
// already presented by the slide transition and must NOT replay its entrance.
let skipEntranceSlug: string | null = null;

export default function ProjectDetail({
  project,
  prevSlug,
  nextSlug,
}: ProjectDetailProps) {
  const router = useRouter();
  const backdropRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const incomingRef = useRef<HTMLElement>(null);
  const [incoming, setIncoming] = useState<Project | null>(null);
  const pendingDir = useRef<"next" | "prev">("next");
  const transitioning = useRef(false);

  const renderGallery = (p: Project) => (
    <div className="max-w-[1320px] mx-auto px-5 lg:px-10 gap-10 grid">
      {p.projectGallery?.map((galleryItem, index) => (
        <div
          key={index}
          className="w-full bg-[#1a1a1a] relative overflow-hidden border border-white/10"
        >
          <Image
            src={galleryItem.url || "/images/seo.jpg"}
            alt={`${p.title} gallery ${index + 1}`}
            width={1400}
            height={827}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    setIncoming(null);

    // Arrived via the slide transition: the content is already in place,
    // only clear any leftover transforms and settle before paint.
    if (skipEntranceSlug === project?.slug) {
      skipEntranceSlug = null;
      gsap.set(contentRef.current, { clearProps: "all" });
      gsap.set(controlsRef.current, { clearProps: "all" });
      gsap.fromTo(
        controlsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" },
      );
      return;
    }

    // Direct load: play the entrance once, off-screen (pre-paint).
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(contentRef.current, {
        y: "100vh",
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }).from(
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

  const navigateTo = useCallback(
    (slug: string) => {
      skipEntranceSlug = slug;
      router.replace(`/portfolio/${slug}`, { scroll: false });
    },
    [router],
  );

  useEffect(() => {
    if (!incoming) return;

    const current = contentRef.current;
    const incomingEl = incomingRef.current;
    if (!current || !incomingEl) return;

    const dir = pendingDir.current;

    // next: current slides up/fades, incoming rises from the bottom.
    // prev: current slides down/fades, incoming enters from the top.
    const fromY = dir === "next" ? "100vh" : "-100vh";
    const exitY = dir === "next" ? "-100vh" : "100vh";

    const tl = gsap.timeline({
      onComplete: () => {
        transitioning.current = false;
        navigateTo(incoming.slug);
      },
    });

    tl.fromTo(
      incomingEl,
      { y: fromY, opacity: 0 },
      {
        y: "0px",
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
      },
      0,
    )
      .to(current, {
        y: exitY,
        opacity: 0,
        duration: 0.55,
        ease: "power2.in",
      }, 0)
      .to(controlsRef.current, {
        opacity: 0,
        duration: 0.2,
      }, 0);
  }, [incoming, navigateTo]);

  const animateOut = useCallback((onDone?: () => void) => {
    if (!contentRef.current) {
      onDone?.();
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
    gsap.to(contentRef.current, {
      duration: 0.45,
      onComplete: onDone,
    });
  }, []);

  const go = useCallback(
    (dir: "prev" | "next" | "none") => {
      if (transitioning.current) return;

      const slug = dir === "next" ? nextSlug : dir === "prev" ? prevSlug : null;

      if (!slug) return;

      const url = `/portfolio/${slug}`;

      transitioning.current = true;

      if (dir === "none") {
        animateOut(() => {
          transitioning.current = false;
          router.push("/portfolio");
        });
        return;
      }

      // Keep the current slide on screen while the target loads,
      // so there is never a blank frame between slides.
      getProjectBySlug(slug)
        .then((neighbor) => {
          if (!neighbor) {
            animateOut(() => {
              transitioning.current = false;
              router.push(url);
            });
            return;
          }

          pendingDir.current = dir;
          setIncoming(neighbor);
        })
        .catch(() => {
          animateOut(() => {
            transitioning.current = false;
            router.push(url);
          });
        });
    },
    [nextSlug, prevSlug, animateOut, router],
  );

  if (!project) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-6">
        <h1 className="text-white text-4xl font-light">Project Not Found</h1>
        <button
          onClick={() => go("none")}
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
    "flex items-center  justify-center w-9 h-9 md:w-11 md:h-11 rounded-full  text-black bg-white/20 backdrop-blur-xl hover:bg-white hover:border-white  transition-all cursor-pointer";

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-[90] bg-black"
      />

      {/* Fullscreen content (normal flow so window/Lenis scroll works) */}
      <main
        ref={contentRef}
        className="relative z-[100] min-h-screen py-20  md:py-6"
      >
        {renderGallery(project)}
      </main>

      {/* Incoming slide (rendered on top during prev/next transition) */}
      {incoming && (
        <main
          ref={incomingRef}
          aria-hidden="true"
          className="fixed inset-0 z-[105] min-h-screen overflow-hidden bg-black py-20 md:py-6"
          style={{ transform: "translateY(100vh)", opacity: 0 }}
        >
          {renderGallery(incoming)}
        </main>
      )}

      {/* Floating controls */}
      <div
        ref={controlsRef}
        className="fixed   top-0 inset-x-0 z-[110] flex flex-col h-full items-center justify-between gap-4  "
      >
        <div className="md:ml-auto py-4 px-4 lg:px-6  bg-black md:bg-transparent w-full md:w-fit flex items-center justify-between gap-10">
          <h2 className="uppercase text-white text-sm lg:text-lg font-light tracking-widest truncate md:hidden">
            {project.title}
          </h2>
          <button
            onClick={() => go("none")}
            aria-label="Close"
            className="flex items-center  justify-center w-9 h-9 md:w-11 md:h-11 rounded-full  text-black bg-[var(--green)] hover:bg-white   transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="w-full flex items-center justify-between  gap-4  px-4 lg:px-6">
          {prevHref && (
            <button onClick={() => go("prev")} className={navButtonClass}>
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {nextHref && (
            <button onClick={() => go("next")} className={navButtonClass}>
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
        <span></span>
      </div>
    </>
  );
}