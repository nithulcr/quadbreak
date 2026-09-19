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
      className="relative  overflow-hidden py-14 md:py-24"
    >
      {/* Soft background glow */}

      <div className="mx-auto max-w-[1400px] px-5">
               <span className="uppercase  font-light w-fit mb-2 block  mx-auto tracking-[4px]">Founders</span>
        <h2
          className="
                font-light
                text-center mx-auto
                uppercase
                leading-[0.95]
                tracking-tight
                text-white
                text-4xl lg:text-6xl xl:text-[5rem]
              "
        >
          The Drive Behind<br/><span className="text-[var(--green)]  xl:text-[6rem]">the Art</span>
        </h2>
        <div
          className="
            relative
            flex flex-col-reverse md:grid md:grid-cols-1 lg:grid-cols-2  mx-auto  lg:gap-[100px]    

          "
        >
          {/* Content */}
          <div
            className="
 
              cta-content
              relative
              z-20
              grid grid-cols-2
               gap-6
        
             
            "
          >
            <div className=" max-w-[600px]">
                     <span className="uppercase text-[var(--green)] font-light w-fit mb-2 block ">Art director</span>
              <h4
                className="font-light
                uppercase
                leading-[0.95]
                tracking-tight
                mb-6
                text-4xl lg:text-6xl xl:text-5xl"
              >
                Jesto's
                <br />
                Experience
              </h4>
              <p className="text-sm md:text-base font-light leading-relaxed text-white/60 ">
                Great art starts with a bold vision and the drive to make it
                happen. Jesto Jose and Mithun Alexander are at the core of
                Quadbreak — bringing creative vision, years of industry
                experience, and a deep passion for the craft, while pushing
                creative boundaries, challenging the ordinary, and inspiring the
                team to keep raising the bar. Their passion sets the pace, their
                experience shapes the vision, and their drive keeps Quadbreak
                moving forward.
              </p>
            </div>
            {/* Visual */}
            <div
              className="
              cta-visual

             relative

            "
            >
              <div
                className="hidden xl:block
              pointer-events-none
              absolute
             left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              h-[250px]
              w-[250px]
              rounded-full
              bg-[var(--green)]
              opacity-[0.2]
              blur-[60px]
            "
              />
              {/* Main image */}
              <img
                src="/images/jesto.png"
                alt=""
                className="
                relative
                z-1
                h-full
                w-full
                object-contain
              "
              />
            </div>
          </div>
          {/* Content */}
          <div
            className="
 
              cta-content
              relative
              z-20
             grid grid-cols-2
             gap-6
           
            "
          >
            {/* Visual */}
            <div
              className="
              cta-visual
    
             relative

            "
            >
              <div
                className="hidden xl:block
              pointer-events-none
              absolute
             left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              h-[250px]
              w-[250px]
              rounded-full
              bg-[var(--green)]
              opacity-[0.2]
              blur-[60px]
            "
              />
              {/* Main image */}
              <img
                src="/images/mithun.png"
                alt=""
                className="
               relative z-1
                h-full
                w-full
                object-contain
              "
              />
            </div>
            <div className=" max-w-[600px]">
              <span className="uppercase text-[var(--green)] font-light w-fit mb-2 block  ml-auto">Creative director</span>
              <h4
                className="font-light text-right
                uppercase
                leading-[0.95]
                tracking-tight
                mb-6
                text-4xl lg:text-6xl xl:text-5xl"
              >
                Mithun's
                <br />
                Experience
              </h4>
              <p className="text-right text-sm md:text-base  font-light leading-relaxed text-white/60">
                Great art starts with a bold vision and the drive to make it
                happen. Jesto Jose and Mithun Alexander are at the core of
                Quadbreak — bringing creative vision, years of industry
                experience, and a deep passion for the craft, while pushing
                creative boundaries, challenging the ordinary, and inspiring the
                team to keep raising the bar. Their passion sets the pace, their
                experience shapes the vision, and their drive keeps Quadbreak
                moving forward.
              </p>
            </div>
          </div>

          <div className="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[80%] bg-gradient-to-b from-[var(--green)]/10 via-[var(--green)] to-[var(--green)]/10 opacity-70"></div>
          <div
            className="
    absolute
    left-1/2
    top-1/2
    -translate-x-1/2
    -translate-y-1/2
    w-28
    h-28
    rounded-full
    flex
    items-center
    justify-center
      bg-[var(--green)]
      hover:scale-[0.9] transition-transform duration-300 cursor-pointer
  "
          >
            {/* Rotating border */}
            <div
              className="
      absolute
    left-1/2
    top-1/2
    -translate-x-1/2
    -translate-y-1/2
      rounded-full
      border-2
       w-32
    h-32
      border-dashed
      border-[var(--green)]
      animate-[spin_8s_linear_infinite]
    
    "
            />

            {/* Static text */}
            <span className="relative z-10 text-black  text-center uppercase leading-tight">
              Meet The Team
            </span>
          </div>
        </div>
        {/* <div className="mt-2">
          <AnimatedButton
            href="/about#meet-the-team"
            label="Meet the Team"
            className="w-fit mx-auto"
          />
        </div> */}
      </div>
    </section>
  );
};

export default CTASection;
