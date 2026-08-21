"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    number: "9",
    label: "Years of Experience",
    description: "Building game art excellence",
  },
  {
    number: "500",
    label: "Projects Delivered",
    description: "Across games, VR & simulations",
  },
  {
    number: "50",
    label: "Expert Artists",
    description: "Specialized 3D professionals",
  },
  {
    number: "500",
    label: "Client Satisfaction",
    description: "Trusted by industry leaders",
  },
];

const StatsSection2 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
      className="relative overflow-hidden bg-[var(--background)] pt-10"
    >

      <div className="mx-auto max-w-[1450px]">
        <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {stats.map((stat, index) => (
            <div
              key={index}
             className="stat-item group relative top-0 border border-white/10 p-6 text-center transition-[top,box-shadow] duration-500 hover:top-[-6px] hover:shadow-[0_0_20px_rgba(145,255,106,0.2)]"
            >
              <div
                className="stat-number mb-4 text-5xl font-bold text-[var(--green)]"
                data-target={stat.number}
              >
                {stat.number}+
              </div>

              {/* <span className="underline-span my-4 block"></span> */}

              <h3 className="mb-2  font-light uppercase tracking-wider text-white">
                {stat.label}
              </h3>

              <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[var(--green)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection2;