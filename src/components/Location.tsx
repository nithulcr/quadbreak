"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StatsSection2 from "@/components/StatsSection2";


gsap.registerPlugin(ScrollTrigger);

const Location = () => {
  const sectionRef = useRef<HTMLDivElement>(null);


  const title2Ref = useRef<HTMLHeadingElement>(null);


  const text4Ref = useRef<HTMLParagraphElement>(null);


  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      tl.from(title2Ref.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
      })
       
         .from(
          text4Ref.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.45",
        )
        .from(
          imgRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.45",
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="Location"
      className="section overflow-hidden py-14 md:pt-10  md:pb-18"
      ref={sectionRef}
    >
      {/* <div className="shape3 z-[-1]"></div>
      <div className="shape2 z-[-1]"></div> */}
      <div className="grid-wrapper max-w-[1450px] mx-auto px-5 lg:px-10">
        <div className="stacked-content">
          <div className="content-wrapper pt-30">
            <div className=" grid gap-y-10 lg:gap-y-30">
             
              <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-center mt-10 lg:mt-[-40px]">
                {/* Image */}

                <div className="about-fade relative ">
                  <div className="rounded-xl lg:rounded-2xl border relative border-white/10 side-image">
                    <span className="span1"></span>
                    <span className="span2"></span>


                     <img src="/images/map.png" alt="Quadbreak Studios map"  className="w-full h-[450px] object-cover p-1 lg:p-2 rounded-xl lg:rounded-2xl z-9 relative border-white/10 border" />
                 
                  </div>
                </div>

                {/* Content */}

               <div className="">
                  <div className="flex flex-col mb-6">
                    <h2
                      ref={title2Ref}
                      className="uppercase w-fit text-white  text-4xl lg:text-[4rem]  leading-none font-light  relative"
                    >
                    Location and Journey
                    </h2>
                  </div>
                  <p
                    ref={text4Ref}
                    className="about-paragraph text-[16px] md:text-[20px] leading-snug font-[200] text-white/80 text-justify"
                  >
                   Technology continues to reshape the way digital worlds are created. <span className="text-[var(--green)] italic">At Quadbreak, we actively explore emerging technologies, automation, and AI-assisted workflows to understand how they can improve efficiency and scale across our production.</span>

                   While the tools continue to evolve, our artists remain at the heart of the process — bringing creativity, experience, artistic judgment, and quality control to every project.

                   We believe the future of 3D production will be built through the right balance of human creativity and intelligent technology.
                  </p>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
