"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "@/components/AnimatedButton";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Category {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  img: string;
  href: string;
  cta: string;
}

const categories: Category[] = [
  {
    number: "01",

    title: "QuadBreak Studios",
    subtitle: "Game Art & Production",
    img: "/images/logo.png",

    description:
      "Quadbreak Studios is a 3D game art production and outsourcing studio that partners with game developers to create high-quality, production-ready 3D content. Our expertise spans environments, props, vehicles, hard-surface assets, and complete game-ready scenes.",

    href: "/portfolio",
    cta: "Explore Studio",
  },
  {
    number: "02",

    title: "QuadBreak Simulations",
    subtitle: "VR • Training • Simulation",
    img: "/images/quadbreak_simulations.png",
    description:
      "Quadbreak Simulations is a dedicated 3D art team built exclusively for the simulation industry. We are partnering with simulation companies around the world, adding production capacity and delivering real-time 3D content that fits their pipelines and performance targets.",

    href: "https://quadbreaksimulations.com/",
    cta: "Explore Simulations",
  },
  {
    number: "03",

    title: "QuadBreak Academy",
    subtitle: "Learn • Create • Build",
    img: "/images/quadbreak_academy.png",

    description:
      "Quadbreak runs training programs for young people from Kerala who want to build careers in 3D art and game development. Students learn the same pipeline and quality standards used on real Disney and simulation projects — and the best of them join the studio team. We're not just hiring artists. We're making them.",

    href: "/",
    cta: "Explore Academy",
  },
];

export default function Categories() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const cards = Array.from(cardsRef.current?.children || []);

      if (reduceMotion) {
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      const mm = gsap.matchMedia();

      // Header reveal
      gsap.from(headerRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      // Desktop — center card sits higher; entrance + GSAP-driven hover lift
      mm.add("(min-width: 1024px)", () => {
        const baseY = [0, -10, 0];
        cards.forEach((card, i) => {
          gsap.set(card, { y: baseY[i] ?? 0, scale: 1, opacity: 1 });
        });

        gsap.from(cards, {
          opacity: 0,
          y: 60,
          scale: 0.96,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            once: true,
          },
        });

        const handlers: Array<{
          el: Element;
          enter: EventListener;
          leave: EventListener;
        }> = [];

        cards.forEach((card, i) => {
          const base = baseY[i] ?? 0;
          const enter: EventListener = () => {
            gsap.to(card, {
              y: base - 6,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
              force3D: true,
            });
          };
          const leave: EventListener = () => {
            gsap.to(card, {
              y: base,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
              force3D: true,
            });
          };
          card.addEventListener("mouseenter", enter);
          card.addEventListener("mouseleave", leave);
          handlers.push({ el: card, enter, leave });
        });

        return () => {
          handlers.forEach(({ el, enter, leave }) => {
            el.removeEventListener("mouseenter", enter);
            el.removeEventListener("mouseleave", leave);
          });
        };
      });

      // Cards reveal — mobile / tablet (stacked, simpler fade-up)
      mm.add("(max-width: 1023.98px)", () => {
        cards.forEach((card) => {
          gsap.set(card, { y: 0, scale: 1, opacity: 1 });
        });

        gsap.from(cards, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="Categories"
      className="relative overflow-hidden py-14 md:py-20 "
    >
      <div className="mx-auto max-w-[1400px] px-5">
        {/* Section header */}
        <div ref={headerRef} className="mb-12 md:mb-20">
          {/* <p className="cat2-eyebrow mb-4 text-xs uppercase tracking-[0.32em] text-[var(--green)]">
           What We Do
          </p> */}
          <h2 className="text-3xl font-light uppercase leading-[1.02] tracking-tight text-white md:text-5xl lg:text-[5rem]">
            Three Worlds
            <br />
            <span className="text-[var(--green)]">One Creative Vision</span>
          </h2>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="max-w-[1400px] mx-auto grid gap-14  Categories-border"
        >
          {categories.map((cat, i) => {
            return (
              <article
                key={cat.number}
                className={` group relative grid grid-cols-1  gap-7   pb-12`}
              >
                <div className="lg:col-span-3">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="cat4-card-title text-2xl  uppercase   text-white md:text-3xl">
                        {cat.title}
                      </h3>
                      <span
                        className={`text-xs uppercase tracking-[0.2em] mt-2 font-[200] block`}
                      >
                        {cat.subtitle}
                      </span>

                      {/* Description */}
                      <p className="mt-4  font-light text-[14px] xl:text-lg  xl:max-w-[80%]">
                        {cat.description}
                      </p>
                      <Image
                        src={cat.img}
                        alt={cat.title}
                        width={250}
                        height={100}
                        className="mt-6 w-full max-w-[250px] object-cover"
                      />
                    </div>
                    <Link
                      href={cat.href}
                      aria-label={`Go to ${cat.title}`}
                      className={` group/arrow hidden lg:inline-flex flex-none h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 `}
                    >
                      <ArrowUpRight
                        className="h-8 w-8 transition-transform duration-300 group-hover/arrow:translate-x-[3px] group-hover/arrow:-translate-y-[3px]"
                        strokeWidth={1}
                      />
                    </Link>
                  </div>
                </div>

                <div>
                  <div className="cat-cta pt-2">
                    <AnimatedButton
                      label={cat.cta}
                      href={cat.href}
                      className="w-fit"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
