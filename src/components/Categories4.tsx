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
  image: string;
  href: string;
  cta: string;
}

const categories: Category[] = [
  {
    number: "01",

    title: "QuadBreak Studio",
    subtitle: "Game Art & Production",
    description:
      "QuadBreak Studio brings game worlds to life through high-quality 3D assets, environments, characters, animation, VFX and cinematic content. QuadBreak Studio brings game worlds to life through high-quality 3D assets, environments, characters, animation, VFX and cinematic content.",
    image: "/images/environments.png",

    href: "/services",
    cta: "Explore Studio",
  },
  {
    number: "02",

    title: "QuadBreak Simulations",
    subtitle: "VR • Training • Simulation",
    description:
      "QuadBreak Simulations creates immersive digital environments, training experiences and interactive visual solutions for VR, simulation and specialized applications. QuadBreak Studio brings game worlds to life through high-quality 3D assets, environments, characters, animation, VFX and cinematic content.",
    image: "/images/works/2.png",

    href: "/services",
    cta: "Explore Simulations",
  },
  {
    number: "03",

    title: "QuadBreak Academy",
    subtitle: "Learn • Create • Build",
    description:
      "QuadBreak Academy focuses on practical, production-oriented education designed to help aspiring artists develop real-world 3D and game-art skills. QuadBreak Studio brings game worlds to life through high-quality 3D assets, environments, characters, animation, VFX and cinematic content.",
    image: "/images/works/3.png",

    href: "/services",
    cta: "Explore Academy",
  },
];

export default function Categories4() {
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
      id="Categories4"
      className="relative overflow-hidden py-14 md:py-20"
    >
      <div className="mx-auto max-w-[1400px] px-5">
        {/* Section header */}
        <div ref={headerRef} className="mb-12 md:mb-20">
          {/* <p className="cat2-eyebrow mb-4 text-xs uppercase tracking-[0.32em] text-[var(--green)]">
           What We Do
          </p> */}
          <h2 className="text-3xl font-light uppercase leading-[1.02] tracking-tight text-white md:text-5xl lg:text-[3.4rem]">
            Three Worlds.
            <br />
            <span className="text-[var(--green)]">One Creative Vision.</span>
          </h2>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="max-w-[1400px] mx-auto grid gap-14  categories4-border"
        >
          {categories.map((cat, i) => {
            return (
              <article
                key={cat.number}
                className={` group relative grid md:grid-cols-5 overflow-hidden  gap-15 pb-12`}
              >
                {/* Image */}
                <div className="col-span-2 cat4-img relative  aspect-[16/9] w-full overflow-hidden  bg-[#141414]">
                  <Image
                    src={cat.image}
                    alt={`${cat.title} — ${cat.subtitle}`}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1023px) 50vw, (min-width: 1024px) 40vw"
                    className="object-cover transition-transform duration-[0.8s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                </div>
                <div className="col-span-3">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="cat4-card-title text-2xl  uppercase   text-white md:text-3xl">
                        {cat.title}
                      </h3>
                      <span className={`text-xs uppercase tracking-[0.2em] mt-2 font-[200] block`}>
                        {cat.subtitle}
                      </span>

                      {/* Description */}
                      <p className="mt-4  font-light text-medium md:text-lg  max-w-[90%]">
                        {cat.description}
                      </p>
                    </div>

                    <Link
                      href={cat.href}
                      aria-label={`Go to ${cat.title}`}
                      className={`group/arrow inline-flex flex-none h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 `}
                    >
                      <ArrowUpRight
                        className="h-8 w-8 transition-transform duration-300 group-hover/arrow:translate-x-[3px] group-hover/arrow:-translate-y-[3px]"
                        strokeWidth={1}
                      />
                    </Link>
                  </div>
                  {/* Title */}

                  <div className="cat-cta">
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
