"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const WhatWeDOItems = [
  {
    number: "01",
    description:
      "We don’t see ourselves as an external team you hand work to. We become part of your team — working alongside your in-house artists, sharing the same goals, adapting to your pipeline, and collaborating as one. That’s where we believe great work happens.",
  },
  {
    number: "02",
    description:
      "We bring global experience, a passion for great art, and a constant curiosity for new technologies. Our workflow blends artistic expertise, technical know-how, efficient production, and the latest tools to keep things moving without compromising on quality or perfection.",
  },
  {
    number: "03",
    description:
      "We understand that great art also needs to work within real-world budgets and deadlines. That’s why we stay focused on delivering the right quality, on time, and within budget. You give us the goal, trust us with the work, and we take it from there.",
  },
  {
    number: "04",
    description:
      "Because at the end of the day, we’re not here just to deliver assets. We’re here to make your team stronger, your pipeline smoother, and your game better — with passion driving everything we create.",
  },
];

const WhatWeDO = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Items animation
      gsap.from(itemsRef.current?.children || [], {
        opacity: 0,
        x: 50,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: itemsRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="WhatWeDO"
      ref={sectionRef}
      className="relative  py-20 lg:py-28"
    >
      <div className="mx-auto grid w-full max-w-[1450px] grid-cols-1 gap-16 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:px-10">
        {/* LEFT */}
        <div className="relative">
          <div className="sticky top-32">
           
            <div className="flex  items-center gap-3 mb-5">

              <span className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                ART
              </span>
              <span className="w-8 h-[1px] bg-[var(--green)]" />


              <span className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                TECH
              </span>
              <span className="w-8 h-[1px] bg-[var(--green)]" />

              <span className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                PEOPLE
              </span>
              <span className="w-8 h-[1px] bg-[var(--green)]" />

              <span className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                GAMES
              </span>

             
            </div>
             <h2
              ref={titleRef}
              className="max-w-[650px] text-5xl font-light uppercase leading-[0.92] tracking-[-0.03em] text-white md:text-6xl lg:text-[5.5rem]"
            >
              A Partner
              <span className="block text-[var(--green)]">in Art.</span>
            </h2>
             <Image
              src="/images/cartoon.png"
              alt="Quadbreak logo"
              width={300}
              height={80}
              className="brand"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div ref={itemsRef} className="relative">
          {/* Main timeline */}
          <div className="absolute left-[23px] top-5 bottom-5 w-px bg-white/10 lg:left-[31px]" />

          <div className="flex flex-col gap-16 lg:gap-20">
            {WhatWeDOItems.map((item, index) => (
              <div
                key={item.number}
                className="group relative grid grid-cols-[48px_1fr] gap-5 lg:grid-cols-[64px_1fr] lg:gap-8"
              >
                {/* Number / Node */}
                <div className="relative z-10 flex justify-center">
                  <div className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full border border-white/10 bg-[#080808] transition-all duration-500 group-hover:border-[var(--green)] ">
                    <div className="flex h-3 w-3 items-center justify-center rounded-full border border-[var(--green)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_12px_var(--green)]" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex gap-8">
                  {/* Number */}
                  <div className="mb-4 ">
                    <span className="text-4xl font-light leading-none text-white/20 transition-colors duration-300 group-hover:text-[var(--green)]/40 lg:text-5xl">
                      {item.number}
                    </span>

                   
                  </div>

                  {/* Description */}
                  <p className="max-w-[680px] text-[15px] font-light leading-[1.8] text-white/70 transition-colors duration-300 group-hover:text-white/90 md:text-[17px]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDO;
