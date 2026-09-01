"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "@/components/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

interface Category {
  id: number;
  num: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  image: string;
  services: string[];
  cta: string;
  href: string;
}

const categories: Category[] = [
  {
    id: 1,
    num: "01",
    title: "Quadbreak Studio",
    shortTitle: "Studio",
    subtitle: "Game Art & Production",
    description:
      "QuadBreak Studio brings game worlds to life through high-quality 3D assets, environments, characters, animation, VFX and cinematic content.",
    image: "/images/1.jpg",
    services: [
      "3D Environment",
      "3D Characters",
      "Concept Art & 2D",
      "Animation & VFX",
      "Trailers & Cinematics",
      "Game Assets",
    ],
    cta: "Explore Studio",
    href: "/contact",
  },
  {
    id: 2,
    num: "02",
    title: "Quadbreak Simulations",
    shortTitle: "Simulations",
    subtitle: "VR • Training • Simulation",
    description:
      "We create immersive digital environments and production-ready visual assets for training, simulation, VR and interactive experiences.",
    image: "/images/2.jpg",
    services: [
      "VR Experiences",
      "Training Simulation",
      "Simulator Environments",
      "Interactive 3D",
      "Visualization",
      "Digital Twins",
    ],
    cta: "Explore Simulations",
    href: "/contact",
  },
  {
    id: 3,
    num: "03",
    title: "Quadbreak Academy",
    shortTitle: "Academy",
    subtitle: "Learn • Create • Build",
    description:
      "QuadBreak Academy is focused on developing the next generation of artists through practical, production-oriented game art education.",
    image: "/images/3.jpg",
    services: [
      "3D Art Training",
      "Game Art Courses",
      "Mentorship",
      "Workshops",
      "Portfolio Development",
      "Industry Training",
    ],
    cta: "Explore Academy",
    href: "/contact",
  },
];

export default function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const busyRef = useRef(false);

  const [mobileOpen, setMobileOpen] = useState<number | null>(0);
  const mobileBodyRefs = useRef<(HTMLDivElement | null)[]>([]);

  const animateTo = useCallback((nextIdx: number) => {
    const container = tabsRef.current;
    if (!container) return;

    const prevIdx = activeIndexRef.current;
    if (prevIdx === nextIdx) return;
    busyRef.current = true;

    const panels = Array.from(
      container.querySelectorAll<HTMLElement>(".cat-panel"),
    );

    const prevPanel = panels[prevIdx];
    const nextPanel = panels[nextIdx];
    if (!prevPanel || !nextPanel) return;

    const tl = gsap.timeline({
      onComplete: () => {
        activeIndexRef.current = nextIdx;
        setActiveIndex(nextIdx);
        busyRef.current = false;
      },
    });

    const prevContent = prevPanel.querySelector(".cat-content");
    const prevTab = prevPanel.querySelector(".cat-tab");
    const nextContent = nextPanel.querySelector(".cat-content");
    const nextTab = nextPanel.querySelector(".cat-tab");

    tl.to(prevContent, { opacity: 0, duration: 0.2, ease: "power2.in" }, 0);

    tl.to(
      prevPanel,
      { flexBasis: "20%", duration: 0.8, ease: "power3.inOut" },
      0.08,
    );
    tl.to(
      nextPanel,
      { flexBasis: "60%", duration: 0.8, ease: "power3.inOut" },
      0.08,
    );

    tl.to(prevTab, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0.35);
    tl.to(nextTab, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0.35);

    tl.set(nextContent, { opacity: 1 }, 0.6);

    const img = nextContent?.querySelector(".cat-media img");
    const head = nextContent?.querySelector(".cat-head");
    const services = nextContent?.querySelectorAll(".cat-service");
    const desc = nextContent?.querySelector(".cat-desc");
    const cta = nextContent?.querySelector(".cat-cta");

    if (img) {
      tl.fromTo(
        img,
        { scale: 1.05 },
        { scale: 1, duration: 0.8, ease: "power2.out" },
        0.6,
      );
    }
    if (head) {
      tl.from(
        head,
        { y: 24, opacity: 0, duration: 0.6, ease: "power2.out" },
        0.72,
      );
    }
    if (desc) {
      tl.from(
        desc,
        { opacity: 0, y: 16, duration: 0.5, ease: "power2.out" },
        0.84,
      );
    }
    if (services) {
      tl.from(
        services,
        { opacity: 0, y: 16, stagger: 0.06, duration: 0.5, ease: "power2.out" },
        0.9,
      );
    }
    if (cta) {
      tl.from(
        cta,
        { opacity: 0, y: 12, duration: 0.5, ease: "power2.out" },
        1.08,
      );
    }
  }, []);

  // Scroll reveal entrance
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector(".categories-reveal"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Mobile accordion GSAP open/close
  useEffect(() => {
    categories.forEach((_, i) => {
      const body = mobileBodyRefs.current[i];
      if (!body) return;
      const open = mobileOpen === i;
      const inner = body.firstElementChild as HTMLElement;

      if (open) {
        gsap.to(body, {
          height: inner?.offsetHeight || "auto",
          duration: 0.6,
          ease: "power3.inOut",
        });
      } else {
        gsap.to(body, { height: 0, duration: 0.5, ease: "power3.inOut" });
      }
    });
  }, [mobileOpen]);

  const handleTabClick = (idx: number) => {
    if (busyRef.current) return;
    animateTo(idx);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    idx: number,
  ) => {
    const target = e.currentTarget;
    const dir =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? -1
          : 0;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleTabClick(idx);
      return;
    }

    if (dir !== 0) {
      e.preventDefault();
      const next = (idx + dir + categories.length) % categories.length;
      const nextBtn =
        tabsRef.current?.querySelectorAll<HTMLButtonElement>(".cat-tab")[next];
      nextBtn?.focus();
      handleTabClick(next);
    }
  };

  const toggleMobile = (idx: number) => {
    setMobileOpen((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pb-14 md:pb-24 pt-4 md:pt-10 "
      id="categories"
    >
      <div className="categories-reveal mx-auto max-w-[1450px] px-5 lg:px-10">
        {/* Two-column desktop layout: left intro, right tabs */}
        <div className="lg:grid lg:grid-cols-[40%_60%]">
          <div className="mb-12 flex flex-col justify-center lg:mb-0 lg:pr-10">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[var(--green)]">
              What We Do
            </p>
            <h2 className="font-light uppercase leading-[0.95] tracking-tight text-white text-4xl md:text-5xl lg:text-[3.4rem]">
              Three Worlds.
              <br />
              <span className="text-[var(--green)]">One Creative Vision.</span>
            </h2>
            <p className="mt-6 max-w-[440px] text-sm font-light leading-relaxed text-white/60 md:text-base">
              QuadBreak operates across game art, simulation and education,
              crafting immersive digital experiences from concept to creation.
            </p>
            <div className="mt-8">
              <AnimatedButton
                label="Explore QuadBreak"
                href="/contact"
                className="w-fit"
              />
            </div>
          </div>

          {/* Desktop vertical tab system */}
          <div className="lg:pl-14">
            <div
              role="tablist"
              aria-label="QuadBreak categories"
              className="categories-grid-desktop"
              ref={tabsRef}
            >
              {categories.map((cat, i) => {
                const active = i === activeIndex;
                return (
                  <div
                    key={cat.id}
                    className="cat-panel"
                    data-active={active}
                    role="tabpanel"
                    id={`panel-${cat.id}`}
                    aria-labelledby={`tab-${cat.id}`}
                  >
                    <button
                      id={`tab-${cat.id}`}
                      role="tab"
                      aria-selected={active}
                      aria-controls={`panel-${cat.id}`}
                      tabIndex={active ? 0 : -1}
                      className="cat-tab"
                      onClick={() => handleTabClick(i)}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                    >
                      <span className="cat-num">{cat.num}</span>
                      <span className="cat-label">{cat.title}</span>
                      <span className="cat-plus">+</span>
                    </button>

                    <div className="cat-content">
                      <div className="cat-head">
                        <div>
                          <h3>{cat.title}</h3>
                          <p className="cat-sub">{cat.subtitle}</p>
                        </div>
                        <span className="cat-number-badge">{cat.num}</span>
                      </div>

                      <div className="cat-media">
                        <Image
                          src={cat.image}
                          alt={cat.title}
                          fill
                          sizes="(min-width: 1280px) 640px, 480px"
                          priority={active}
                        />
                      </div>

                      <p className="cat-desc">{cat.description}</p>

                      <ul className="cat-services">
                        {cat.services.map((s) => (
                          <li key={s} className="cat-service">
                            {s}
                          </li>
                        ))}
                      </ul>

                      <div className="cat-cta">
                        <AnimatedButton label={cat.cta} href={cat.href} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
