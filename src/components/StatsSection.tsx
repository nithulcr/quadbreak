"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    number: "10",
    label: "Years of Creativity",
    description: "Building 3D art since 2016.",
  },
  {
    number: "30+",
    label: "Creative Minds",
    description: "One Team. Diverse Skills. In-House.",
  },
  {
    number: "100+",
    label: "Happy Partnership",
    description: "Studios, teams and creators worldwide.",
  },
  {
    number: "15+",
    label: "Countries Reached",
    description: "Clients across the globe",
  },
];

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(
        gridRef.current?.children || [],
        {
          opacity: 0,
          y: 60,
          scale: 0.96,
          duration: 0.9,
          stagger: {
            each: 0.12,
            from: "start",
          },
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--background)] pt-14 pb-10 md:pt-30"
    >

      <div className="mx-auto max-w-[1450px] px-5">
        <h2 className="sr-only">Quadbreak Studios in numbers</h2>

        <div ref={gridRef} className="grid  gap-4 md:gap-8 grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
             className="stat-item group relative top-0 border border-white/10 p-5 md:p-8 text-center transition-[top,box-shadow] duration-500 hover:top-[-6px] hover:shadow-[0_0_20px_rgba(145,255,106,0.2)]"
            >
              <div
                className="stat-number mb-4 text-4xl md:text-5xl font-bold text-[var(--green)] lg:text-6xl"
                data-target={stat.number}
              >
                {stat.number}
              </div>

              <span className="underline-span my-4 block"></span>

              <h3 className="mb-2 md:text-lg font-light uppercase tracking-wider text-white">
                {stat.label}
              </h3>

              <p className="text-sm font-light text-white/60">
                {stat.description}
              </p>

              <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[var(--green)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;