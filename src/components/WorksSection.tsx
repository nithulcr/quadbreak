"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type { RecentWork } from "@/types/recentWork";
import Link from "next/link";
import { prefersReducedMotion } from "@/lib/motion";
import { defaultOgImage } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const WorkCard = ({
  card,
  className = "",
}: {
  card: RecentWork;
  className?: string;
}) => (
  <Link
    href="/portfolio"
    className={`about-card bg-gradient-to-t from-[#090909] block  via-[#131313] to-[#141414] group relative top-0 aspect-[1/1.04] overflow-hidden transition-[top,box-shadow] duration-500 ease-out hover:top-[-10px] ${className}`}
  >
    <Image
      src={card.image || defaultOgImage}
      alt={`${card.title || "Recent work"} – 3D game art by Quadbreak Studios`}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.08]"
    />

    <div className="absolute top-6 left-6 z-20 transition-all duration-500 ease-out group-hover:top-[-100px]">
      <span className="bg-[var(--green)] text-black text-xs font-[600] uppercase tracking-wider px-4 py-2">
        {card.title || "Work"}
      </span>
    </div>
    {/* <div className="absolute bottom-[-200px] group-hover:bottom-0 left-0 z-20 transition-all duration-500 ease-out bg-gradient-to-t from-black/80 via-black/40 w-full p-6">
      <h5 className="font-light text-[var(--green)] text-xl md:text-2xl uppercase tracking-wider relative ">
        {card.title}
      </h5>
      <p className="font-[200] text-[14px] max-w-[260px]">
        {card.description || "Recent work"}
      </p>
    </div> */}
  </Link>
);

interface WorksSectionProps {
  recentWorks: RecentWork[];
}

const WorksSection = ({ recentWorks }: WorksSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const workCards = Array.isArray(recentWorks) ? recentWorks.slice(0, 6) : [];

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const heading = section.querySelector(".about-heading");
      if (heading) {
        gsap.from(heading, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 75%",
            once: true,
          },
        });
      }

      const cards = section.querySelectorAll(".about-card");
      if (cards.length > 0) {
        gsap.from(cards, {
          opacity: 0,
          y: 60,
          scale: 0.96,
          duration: 0.9,
          stagger: { each: 0.12, from: "start" },
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
   <section
  ref={sectionRef}
  id="about"
  className="relative overflow-hidden py-16 lg:py-16"
>
  <div className="mx-auto max-w-[1450px] px-5 lg:px-10">

    <h2 className="about-heading mb-10 text-center text-4xl font-light uppercase leading-none text-white lg:mb-15 lg:text-6xl">
      recent works
    </h2>

    {/* Desktop */}
    <div className="hidden grid-cols-3 gap-8 lg:grid">
      {workCards.map((card, i) => (
        <WorkCard key={card.id ?? i} card={card} />
      ))}
    </div>

    {/* Mobile + Tablet */}
    <div className="block w-full  lg:hidden">
      {workCards.length > 0 && (
        <Swiper
          className="w-full"
          slidesPerView={1.3}
          spaceBetween={16}
          loop={workCards.length >= 3}
          watchOverflow
          breakpoints={{
            480: { slidesPerView: 1.5 },
            640: { slidesPerView: 2.2 },
          }}
        >
          {workCards.map((card, i) => (
            <SwiperSlide key={card.id ?? i}>
              <WorkCard card={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>

  </div>
</section>
  );
};

export default WorksSection;
