"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    number: "9",
    label: "Years of Experience",
    description: "Building game art excellence"
  },
  {
    number: "500",
    label: "Projects Delivered",
    description: "Across games, VR & simulations"
  },
  {
    number: "50",
    label: "Expert Artists",
    description: "Specialized 3D professionals"
  },
  {
    number: "500",
    label: "Client Satisfaction",
    description: "Trusted by industry leaders"
  }
];

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      // Stats counter animation
      const statItems = section.querySelectorAll(".stat-item");
      if (statItems.length > 0) {
        gsap.fromTo(statItems,
          {
            opacity: 0,
            y: 30,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statItems[0],
              start: "top 85%",
              once: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Number animation with counting effect
      const numbers = section.querySelectorAll(".stat-number");
      numbers.forEach((number) => {
        const target = number.getAttribute("data-target");
        if (target) {
          gsap.fromTo(number,
            { textContent: 0 },
            {
              textContent: target,
              duration: 2,
              ease: "power2.out",
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: number,
                start: "top 85%",
                once: true,
                invalidateOnRefresh: true,
              },
              onUpdate: function() {
                const current = Math.round(this.targets()[0].textContent);
                if (target.includes("+")) {
                  number.textContent = String(current) + "+";
                } else if (target.includes("%")) {
                  number.textContent = String(current) + "%";
                } else {
                  number.textContent = String(current);
                }
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pb-20 pt-36 relative overflow-hidden bg-[var(--background)]">
      <div className="max-w-[1360px] mx-auto px-5">
       

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item group relative  border border-white/10 p-8 text-center top-0 hover:top-[-6px]  ease-out  transition-all duration-500 hover:shadow-[0_0_20px_rgba(145,255,106,0.2)]"
            >
              {/* Number */}
              <div className="stat-number text-5xl lg:text-6xl font-bold text-[var(--green)] mb-4" data-target={stat.number.replace(/[^0-9]/g, '')}>
                {stat.number}+
              </div>
<span className="block underline-span my-4"></span>
              {/* Label */}
              <h3 className="text-white text-lg font-light mb-2 uppercase tracking-wider">
                {stat.label}
              </h3>

             
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--green)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;