"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "./AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const content = section.querySelector(".cta-content");
      const visual = section.querySelector(".cta-visual");
      const shape = section.querySelector(".cta-shape");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      tl.from(shape, {
        opacity: 0,
        scale: 0.8,
        rotate: -8,
        duration: 1.2,
        ease: "power3.out",
      })
        .from(
          content,
          {
            opacity: 0,
            x: -60,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.8",
        )
        .from(
          visual,
          {
            opacity: 0,
            x: 80,
            scale: 0.9,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8",
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative   my-10"
    >
          {/* Soft background glow */}
          <div
            className="
              pointer-events-none
              absolute
              right-[10%]
              top-[10%]
              h-[400px]
              w-[400px]
              rounded-full
              bg-[var(--green)]
              opacity-[0.06]
              blur-[100px]
            "
          />
      <div className="mx-auto max-w-[1400px] px-5">
        <div
          className="
            relative
            grid lg:grid-cols-2 gap-8 

          "
        >


         
          {/* Content */}
          <div
            className="
              cta-content
              relative
              z-20
              flex
              max-w-[600px]
              flex-col
              justify-center 
              pt-14  pb-6 
            "
          >
          

            <h2
              className="
                text-4xl
                font-light
                uppercase
                leading-[0.95]
                tracking-tight
                text-white
                md:text-5xl
                lg:text-[4.5rem]
              "
            >
             The Drive 
              <br />
              Behind <span className="text-[var(--green)]">the Art.</span> 
            </h2>

            <p className="mt-6 max-w-[600px] text-sm font-light leading-relaxed text-white/60 md:text-base">
              Great art starts with a bold vision and the drive to make it happen. Jesto Jose and Mithun Alexander are at the core of Quadbreak — bringing creative vision, years of industry experience, and a deep passion for the craft, while pushing creative boundaries, challenging the ordinary, and inspiring the team to keep raising the bar. Their passion sets the pace, their experience shapes the vision, and their drive keeps Quadbreak moving forward.
            </p>

            <div className="mt-8">
              <AnimatedButton
                href="/contact"
                label="Meet the Team"
                className="w-fit"
              />
            </div>
          </div>

          {/* Visual */}
          <div
            className="
              cta-visual
             relative
            "
          >
         

            {/* Main image */}
            <img
              src="/images/cta-art.png"
              alt=""
              className="
               
                h-full
                w-full
                object-contain
              "
            />

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
