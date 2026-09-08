"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const JourneyItems = [
  {
    title: "Experienced Artists",
    image: "/images/1.png",
    description:
      "Creative decisions remain human-led.",

  },
  {
    title: "mart Production",
    image: "/images/2.png",
     description:
      "Modern tools help improve efficiency.",

  },

  {
    title: "AI-Assisted Workflows",
    image: "/images/3.png",
     description:
      "We explore new technologies to support artists and production.", 

  },
  {
    title: "Quality Control",
    image: "/images/4.png",
     description:
      "Every deliverable follows professional production and QA standards.", 

  },

];
const Journey = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const JourneyGridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLParagraphElement>(null);


  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
      gsap.from(JourneyGridRef.current?.children || [], {
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
          trigger: JourneyGridRef.current,
          start: "top 80%",
          once: true,
        },
      });
      tl.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
      })
       
        .from(
          text2Ref.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.45",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="Journey"
      className="py-10 lg:py-20 relative overflow-hidden "
      ref={sectionRef}
    >
      <div className="grid gap-y-10 max-w-[1450px] mx-auto px-5 lg:px-10 items-center w-full ">
        <div className="flex flex-col  gap-y-5 text-center w-full  mx-auto  mb-8 relative pb-12">
         
            <h2
              ref={titleRef}
              className="uppercase w-fit text-white  text-5xl lg:text-[4vw] mx-auto  leading-none font-light  relative"
            >
            Built for <span className="text-[var(--green)]">Modern Game</span> Production
            
            </h2>
            <img alt="Quadbreak Studios Logo" className="w-full max-w-[60%] mx-auto left-[50%] translate-x-[-50%] absolute bottom-[-20px] left-0" src="/images/underline.png"></img>
            {/* <p  ref={text2Ref} className="text-[14px] md:text-[16px] max-w-[800px] mx-auto leading-snug font-[200] text-white/80">Game development is evolving. At Quadbreak Studios, we combine experienced artists, proven production workflows, and emerging technologies to build efficient and scalable game art pipelines.</p>
         
          */}
        </div>
        <div
          ref={JourneyGridRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4  mt-5"
        >
          {JourneyItems.map((service, index) => (
            <div
              key={index}
              className="group relative border overflow-hidden border-[var(--green)]/20 rounded-[8px]"
            >
              

              <div className="absolute inset-0  bg-gradient-to-t from-black/10 via-black/20 to-black/90 transition duration-700" />
              <div className="p-5 sm:p-7 flex flex-col justify-between gap-5 relative z-9">
                  <img
                src={service.image}
                alt={service.title}
                className="w-18 h-18  object-cover  group-hover:opacity-70 group-hover:scale-95 transition duration-700"
              />
                 <div className="transition duration-500 group-hover:scale-105">
                  
                  <h3 className="uppercase text-lg md:text-[18px]  tracking-wide z-10 ">
                    {service.title}
                  </h3>
                  
               
                <p className="font-[200]  text-white text-[13px] md:text-[14px] mt-2 leading-snug">
                  {service.description}
                </p>
                  </div>
              </div>
            </div>
          ))}
        </div>
       
      </div>
    </section>
  );
};

export default Journey;
