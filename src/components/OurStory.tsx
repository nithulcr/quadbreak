"use client";

import { useEffect, useRef } from "react";
import AnimatedButton from "./AnimatedButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StatsSection2 from '@/components/StatsSection2';

gsap.registerPlugin(ScrollTrigger);

const OurStory = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const text1Ref = useRef<HTMLParagraphElement>(null);
  const text2Ref = useRef<HTMLParagraphElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const btnRef = useRef<HTMLParagraphElement>(null);

  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
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

      tl.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
      })
        .from(
          text1Ref.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.45",
        )
        .from(
          text2Ref.current,
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
      id="OurStory"
      className="section overflow-hidden py-14 md:py-24"
      ref={sectionRef}
    >
      {/* <div className="shape3 z-[-1]"></div>
      <div className="shape2 z-[-1]"></div> */}
      <div className="grid-wrapper max-w-[1360px] mx-auto px-5">
        <div className="stacked-content">
          <div className="content-wrapper">
            <div className="service-list grid gap-y-10 lg:gap-y-30">
              <div className="service-item flex flex-col lg:grid lg:grid-cols-2 gap-x-20 items-start w-full ">
                
                  <div className="">
                    <div className="flex flex-col mb-8">
                      <h2
                        ref={titleRef}
                        className="uppercase w-fit text-white  text-5xl lg:text-[5rem]  leading-none font-light  relative"
                      >
                        Our Story
                      </h2>
                    </div>
                    <p
                      ref={text1Ref}
                      className="about-paragraph text-[16px] md:text-[20px] leading-snug font-[200] text-white/80"
                    >
                      In 2016, we started from a single desk, driven by a deep passion for game art. With a strong foundation in the industry but limited resources, we built everything from scratch, seizing every opportunity to grow. Over time, we expanded beyond game art into VR and simulator art, delivering high-quality visuals across industries. What began as Wrinit evolved into Quadbreak Studios, carrying forward the same commitment to creativity, collaboration, and innovation. Today, we continue to push boundaries, embracing new challenges and staying true to our core values.
                    </p>
                             <StatsSection2 />

                  </div>
                  <div className="ml-auto lg:mt-[200px]  max-w-[530px] fade-up">
                    <h2
                      ref={text2Ref}
                      className="uppercase w-fit text-white/60  text-right italic mb-10 text-[3rem]  leading-none font-light  relative"
                    >
                     Since <span className="text-[var(--green)]">2026</span> It's been a <span className="text-[var(--green)]">cool journey,</span> and <span className="text-[var(--green)]">we're</span> not <span className="text-[var(--green)]">turning back!</span>
                    </h2>
                    <p
                      ref={text1Ref}
                      className="about-paragraph text-[16px] lg:text-right mb-10 md:text-[20px] leading-snug font-[200] text-white/80"
                    >
                     Long-term business success depends, above all, on the quality of the team providing the leadership, direction, and vision. We are one such. All of us have a solid foundation and a strong passion for realizing projects. 
                    </p>
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src="https://media.room8studio.com/wp-content/uploads/2022/06/04202038/r8s.mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
               
              </div>
               <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover rounded-4xl"
                    >
                      <source src="https://framerusercontent.com/assets/OUVEqXJstuoVaA0uIIMedXrPuo.webm" />
                      Your browser does not support the video tag.
                    </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
