"use client";

import { useEffect, useRef } from "react";
import AnimatedButton from "./AnimatedButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Journey = () => {
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
        "-=0.45"
      )
      .from(
        text2Ref.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.45"
      )
      .from(
        imgRef.current,
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
    <section id="Journey" className="section overflow-hidden py-14 md:py-20" ref={sectionRef}>
      <img src="/images/journey.png" alt="Journey" className="w-full h-auto" ref={imgRef} />
    </section>
  );
};



export default Journey;