"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GAME_ART_SERVICES } from "@/lib/services";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const ServiceGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
      });

      gsap.from(cardsRef.current?.children || [], {
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
          trigger: cardsRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-14 lg:py-24 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-6 pt-30">
        <div ref={titleRef} className="mb-8 lg:mb-12">
          <h1 className="uppercase text-white text-5xl lg:text-[6rem] leading-none font-light">
            3D Game Art
            <br />
            Services
          </h1>
          <p className="mt-6 max-w-3xl text-sm lg:text-base font-light leading-relaxed text-white/65">
            Quadbreak Studios produces game-ready 3D vehicles, weapons,
            environments, and hard-surface props for AAA, indie, mobile, VR, and
            simulation projects. Every asset is built for real-time performance
            and delivered to your pipeline standards.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 md:mt-16"
        >
          {GAME_ART_SERVICES.map((service, index) => (
            <article
              key={service.id}
              className="group relative  border border-white/20  rounded-[8px] overflow-hidden"
            >
              <div className="relative aspect-[1/.6] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:opacity-70 group-hover:scale-105 transition duration-700"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              <div className="p-4 sm:p-6 flex flex-col justify-between gap-2">
                <div className="flex justify-between items-center gap-3">
                  <h2 className="uppercase md:text-2xl tracking-wide z-10 transition duration-500 group-hover:scale-105">
                    {service.title}
                  </h2>
                </div>
                <p className="font-[200] text-white/75 text-[14px] leading-snug">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 lg:mt-16">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[var(--green)] px-7 py-3 text-sm font-medium uppercase tracking-[0.15em] text-black transition-colors hover:bg-white"
          >
            Discuss your project
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
