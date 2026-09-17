"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Project } from "@/types/project";
import { getProjectBySlug } from "@/lib/wordpress";
import ProjectGallery from "./ProjectGallery";
import gsap from "gsap";

type ProjectRouteInfo = {
  slug: string;
  title: string;
  prevSlug: string | null;
  nextSlug: string | null;
};

interface ProjectViewerContextValue {
  register: (info: ProjectRouteInfo) => void;
}

const ProjectViewerContext =
  createContext<ProjectViewerContextValue | null>(null);

export function useProjectViewer() {
  const ctx = useContext(ProjectViewerContext);
  if (!ctx) {
    throw new Error("useProjectViewer must be used inside ProjectViewer");
  }
  return ctx;
}

const NAV_BUTTON_CLASS =
  "flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full text-black bg-white/20 backdrop-blur-xl hover:bg-white hover:border-white transition-all cursor-pointer";

const SLIDE_DURATION = 0.7;
const SLIDE_EASE = "power3.inOut";
const ENTRANCE_DURATION = 0.8;
const ENTRANCE_EASE = "power3.out";
const CLOSE_DURATION = 0.5;
const CLOSE_EASE = "power2.in";

// Clip a layer to the exact slice currently visible in the viewport. Without
// this, translating a tall page up reveals its own off-screen content behind
// the incoming viewport-sized layer (the pre-NEXT leak).
const getViewportClipPath = (el: HTMLElement) => {
  const top = Math.max(0, window.scrollY);
  const viewportHeight = window.innerHeight;
  const totalHeight = Math.max(viewportHeight, el.offsetHeight);
  const bottom = Math.max(0, totalHeight - viewportHeight - top);
  return `inset(${top}px 0 ${bottom}px 0)`;
};

export default function ProjectViewer({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const slug = pathname?.match(/^\/portfolio\/([^/]+)/i)?.[1] || null;

  const currentLayerRef = useRef<HTMLDivElement>(null);
  const incomingLayerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const timelineRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(
    null,
  );
  const isTransitioning = useRef(false);
  const isClosing = useRef(false);
  const transitionGeneration = useRef(0);
  const pendingDir = useRef<"next" | "prev">("next");
  const lastPath = useRef<string>("");
  const awaitingRouteChange = useRef(false);
  const entrancePlayed = useRef(false);

  const routeInfoRef = useRef<ProjectRouteInfo | null>(null);

  const [routeInfo, setRouteInfo] = useState<ProjectRouteInfo | null>(null);
  const [displayedProject, setDisplayedProject] = useState<Project | null>(
    null,
  );
  const [incomingProject, setIncomingProject] = useState<Project | null>(null);

  const title =
    routeInfo?.title ?? displayedProject?.title ?? "";

  const register = useCallback((info: ProjectRouteInfo) => {
    setRouteInfo(info);
  }, []);

  const contextValue = useMemo(() => ({ register }), [register]);

  useEffect(() => {
    routeInfoRef.current = routeInfo;
  }, [routeInfo]);

  const killTimeline = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
  }, []);

  const releaseTransition = useCallback(() => {
    isTransitioning.current = false;
    isClosing.current = false;
  }, []);

  // Cancel any active work (fetch, timeline, incoming layer) safely.
  const cancelActiveTransition = useCallback(
    (clearIncoming: boolean) => {
      transitionGeneration.current += 1;
      killTimeline();
      if (clearIncoming) {
        setIncomingProject(null);
        const currentEl = currentLayerRef.current;
        if (currentEl) {
          gsap.set(currentEl, { clearProps: "transform,clipPath" });
        }
      }
      releaseTransition();
    },
    [killTimeline, releaseTransition],
  );

  const startSlide = useCallback(
    (dir: "next" | "prev") => {
      if (isTransitioning.current) return;

      const info = routeInfoRef.current;
      const targetSlug = dir === "next" ? info?.nextSlug : info?.prevSlug;
      if (!targetSlug || targetSlug === info?.slug) return;

      isTransitioning.current = true;
      pendingDir.current = dir;
      const generation = transitionGeneration.current;

      getProjectBySlug(targetSlug)
        .then((nextProject) => {
          if (generation !== transitionGeneration.current) return;
          if (!nextProject) {
            if (isTransitioning.current) {
              isTransitioning.current = false;
            }
            return;
          }
          if (!isTransitioning.current) return;
          setIncomingProject(nextProject);
        })
        .catch(() => {
          if (generation === transitionGeneration.current && isTransitioning.current) {
            isTransitioning.current = false;
          }
        });
    },
    [],
  );

  const handleClose = useCallback(() => {
    if (isClosing.current) return;

    isClosing.current = true;
    transitionGeneration.current += 1;
    killTimeline();
    setIncomingProject(null);
    isTransitioning.current = false;

    const currentEl = currentLayerRef.current;
    if (!currentEl) {
      releaseTransition();
      router.push("/portfolio");
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        timelineRef.current = null;
        releaseTransition();
        router.push("/portfolio");
      },
    });

    tl.to(
      currentEl,
      { y: "0%", duration: 0.15, ease: "power2.out" },
      0,
    ).to(
      currentEl,
      { y: "100vh", duration: CLOSE_DURATION, ease: CLOSE_EASE },
      0.15,
    );

    timelineRef.current = tl;
  }, [killTimeline, releaseTransition, router]);

  const playEntrance = useCallback(() => {
    const el = currentLayerRef.current;
    if (!el) return;
    const tl = gsap.fromTo(
      el,
      { y: "100vh" },
      {
        y: "0%",
        duration: ENTRANCE_DURATION,
        ease: ENTRANCE_EASE,
      },
    );
    timelineRef.current = tl;
  }, []);

  // Route change handling: normalize after our own slide, cancel stale state otherwise.
  useLayoutEffect(() => {
    const pathChanged = lastPath.current !== pathname;
    lastPath.current = pathname;

    if (!slug) {
      // Left the project view entirely: cancel anything in flight.
      cancelActiveTransition(true);
      return;
    }

    if (!pathChanged) return;

    if (awaitingRouteChange.current) {
      // Our own slide finished: the overlay already shows the target, so the
      // swap to the new server-rendered page is invisible. Just clean up.
      awaitingRouteChange.current = false;
      setIncomingProject(null);
      gsap.set(currentLayerRef.current, { clearProps: "transform,clipPath" });
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      releaseTransition();
      return;
    }

    // Externally-triggered change (back/forward, grid, direct URL): cancel any
    // stale transition. Entrance plays only once, on the viewer's first project mount.
    cancelActiveTransition(true);
    if (!entrancePlayed.current) {
      entrancePlayed.current = true;
      playEntrance();
    }
  }, [slug, pathname, cancelActiveTransition, playEntrance, releaseTransition]);

  // Slide animation: started only after the incoming layer is actually mounted.
  useLayoutEffect(() => {
    const incoming = incomingProject;
    if (!incoming) return;

    const currentEl = currentLayerRef.current;
    const incomingEl = incomingLayerRef.current;
    if (!currentEl || !incomingEl) {
      transitionGeneration.current += 1;
      isTransitioning.current = false;
      setIncomingProject(null);
      return;
    }

    const dir = pendingDir.current;
    const generation = transitionGeneration.current;

    killTimeline();

    // Only the on-screen slice of the current page may exit the transition;
    // otherwise the page's taller-than-viewport content leaks behind B.
    gsap.set(currentEl, { clipPath: getViewportClipPath(currentEl) });

    gsap.set(incomingEl, {
      y: dir === "next" ? "100%" : "-100%",
      opacity: 1,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        if (generation !== transitionGeneration.current) return;
        timelineRef.current = null;
        setDisplayedProject(incoming);
        // Keep the lock held until the new route's cleanup branch runs;
        // that branch releases it. This closes the double-click window where
        // routeInfo still points at the old project while the URL is in flight.
        awaitingRouteChange.current = true;
        router.replace(`/portfolio/${incoming.slug}`, { scroll: false });
      },
    });

    tl.to(
      currentEl,
      { y: dir === "next" ? "-100%" : "100%", duration: SLIDE_DURATION, ease: SLIDE_EASE },
      0,
    ).to(
      incomingEl,
      { y: "0%", duration: SLIDE_DURATION, ease: SLIDE_EASE },
      0,
    );

    timelineRef.current = tl;

    return () => killTimeline();
  }, [incomingProject, killTimeline, router]);

  // Unmount cleanup: never leak a timeline.
  useEffect(() => {
    return () => killTimeline();
  }, [killTimeline]);

  if (!slug) {
    return <>{children}</>;
  }

  return (
    <ProjectViewerContext.Provider value={contextValue}>
      <div className="relative">
        <div
          ref={currentLayerRef}
          className="relative z-[100] will-change-transform"
        >
          {children}
        </div>

        {incomingProject && (
          <div
            ref={incomingLayerRef}
            aria-hidden="true"
            className="fixed inset-0 z-[105] overflow-hidden bg-black will-change-transform"
          >
            <div className="min-h-full py-20 md:py-6">
              <ProjectGallery project={incomingProject} />
            </div>
          </div>
        )}

        <div
          ref={controlsRef}
          className="fixed top-0 inset-x-0 z-[120] flex flex-col h-full items-center justify-between gap-4 pointer-events-none"
        >
          <div className="md:ml-auto py-4 px-4 lg:px-6 bg-black md:bg-transparent w-full md:w-fit flex items-center justify-between gap-10 pointer-events-auto">
            <h2 className="uppercase text-white text-sm lg:text-lg font-light tracking-widest truncate md:hidden">
              {title}
            </h2>
            <button
              onClick={handleClose}
              aria-label="Close"
              className="flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full text-black bg-[var(--green)] hover:bg-white transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="w-full flex items-center justify-between gap-4 px-4 lg:px-6 pointer-events-auto">
            {routeInfo?.prevSlug && (
              <button
                onClick={() => startSlide("prev")}
                className={NAV_BUTTON_CLASS}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {routeInfo?.nextSlug && (
              <button
                onClick={() => startSlide("next")}
                className={NAV_BUTTON_CLASS}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
          <span></span>
        </div>
      </div>
    </ProjectViewerContext.Provider>
  );
}