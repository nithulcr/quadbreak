"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const ValuesItems = [
  {
    title: "Commitment to Quality",
    image: "/images/quality.png",
    description:
      "Every detail matters. Always.",

  },
  {
    title: "Reliability Over Promises",
    image: "/images/promises.png",
     description:
      "We do what we say.",

  },

  {
    title: "Integrity in Everything",
    image: "/images/honest.png",
     description:
      "Honest, transparent, accountable.", 

  },
  {
    title: "Progress Through Innovation",
    image: "/images/innovation.png",
     description:
      "Always finding better ways.", 

  },

];
const Values = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ValuesGridRef = useRef<HTMLDivElement>(null);
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
      gsap.from(ValuesGridRef.current?.children || [], {
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
          trigger: ValuesGridRef.current,
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
      id="Values"
      className="py-8 lg:py-14 relative overflow-hidden "
      ref={sectionRef}
    >
      <div className="grid gap-y-10 max-w-[1450px] mx-auto px-5 lg:px-10 items-center w-full ">
        <div className="flex flex-col  gap-y-5 text-center w-full max-w-[800px] mx-auto   relative ">
         
            <h2
              ref={titleRef}
              className="uppercase w-fit text-white  text-5xl lg:text-[5rem] mx-auto  leading-none font-light  relative"
            >
           Our <span className="text-[var(--green)]">Values</span>
            
            </h2>
          
         
        </div>
        <div
          ref={ValuesGridRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4  mt-5"
        >
          {ValuesItems.map((service, index) => (
            <div
              key={index}
              className="group relative border overflow-hidden border-[var(--green)]/20 rounded-[8px]"
            >
              <div className="absolute inset-0  bg-gradient-to-t from-black/10 via-black/20 to-black/90 transition duration-700" />
              <div className="p-5 sm:p-7 flex flex-col justify-between gap-5 relative z-9">
                  <img
                src={service.image}
                alt={service.title}
                className="w-18 h-15  object-contain  group-hover:opacity-70 group-hover:scale-95 transition duration-700"
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

export default Values;
