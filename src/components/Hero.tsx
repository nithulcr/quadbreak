"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpinningText from "./spinningText";


gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLSpanElement>(null);
  const title1Ref = useRef<HTMLSpanElement>(null);
  const title2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Scroll-linked scale animation for hero banner
      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current,
          { scale: 1 },
          {
            scale: 1.15,
            ease: "none",
            scrollTrigger: {
              trigger: bannerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Timeline for hero content
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      tl.from(welcomeRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
      })
        .from(
          title1Ref.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.45"
        )
        .from(
          title2Ref.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.45"
        )
        .from(
          subtitleRef.current,
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
    <section ref={sectionRef} className="hero-section relative flex flex-col justify-center overflow-hidden main-hero px-5 lg:px-[4rem] pb-6 pt-15 lg:py-20 min-h-screen">

      <div ref={bannerRef} className="hero-banner max-w-[1400px] mx-auto z-9 flex flex-col justify-center pt-20 px-5 w-full gap-5">
        <span ref={welcomeRef} className="text-[2rem] md:text-[3rem] block font-[200] uppercase">Welcome to</span>
        <h1 className="uppercase max-w-[800px] w-min relative flex flex-col gap-4 text-[var(--green)] text-[3rem] lg:text-[6rem] leading-none mb-1">
          <span ref={title1Ref} className="block w-fit">Quadbreak</span> 
          <span ref={title2Ref} className="block w-fit">Studios</span>
        </h1>
        <span ref={subtitleRef} className="text-[1.2rem] uppercase font-light block mt-2">worlds, Vehicles, weapons  — The Best for your Team.</span>
      </div>


      <div className="absolute hero-section-video top-0 left-0 w-full h-full z-[-1]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/images/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="absolute bottom-0 z-9 right-0 w-[140px] h-[140px] md:w-[250px] md:h-[250px] ml-auto self-end uppercase">
        <SpinningText
          text="Quadbreak • Gaming Art • Stimulator Art  • "
          image="/images/favicon-t.png"
          size={250}
          mobileSize={140}
          duration={15}

        />
      </div>
    </section>
  );
}