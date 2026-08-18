"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "./AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

const aboutCards = [
  {
    title: "No hasi - China Town",
    image: "/images/1.jpg",
  },
  {
    title: "Earth Revival",
    image: "/images/2.jpg",
  },
  {
    title: "No hasi - 110",
    image: "/images/3.jpg",
  },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
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

      tl.from(
        ctaRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.45"
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden py-16 lg:py-16"
    >
      <div className="grid-wrapper mx-auto max-w-[1200px] px-5">
        <div className="stacked-content">
          <div className="content-wrapper">

            {/* Heading */}
            <h2 ref={titleRef} className="about-heading mb-10 text-center text-3xl font-light leading-none uppercase text-white lg:text-[4rem]">
              Our Best Works
            </h2>

            {/* Cards */}
            <div ref={gridRef} className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {aboutCards.map((card, index) => (
                <div
                  key={index}
                  className="
                    about-card
                    group
                    relative
                    top-0
                    aspect-[1/1.2]
                    overflow-hidden
                    border
                    border-transparent
                    transition-[top,border-color,box-shadow]
                    duration-500
                    ease-out
                    hover:top-[-10px]
                    hover:border-[var(--green)]/50
                  "
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      ease-out
                      group-hover:scale-[1.08]
                    "
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading={index === 0 ? "eager" : "lazy"}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Title */}
                  <div className="absolute left-6 top-6 z-20 transition-[top,left] duration-500 ease-out group-hover:left-4 group-hover:top-4">
                    <span className="bg-[var(--green)] px-4 py-2 text-xs font-[600] uppercase tracking-wider text-black">
                      {card.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div ref={ctaRef} className="about-cta mx-auto w-fit pt-5">
              <AnimatedButton
                href=""
                label="View All Works"
                className="w-fit"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;