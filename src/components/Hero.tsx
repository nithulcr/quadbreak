"use client";
import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "./AnimatedButton";
import SpinningText from "./spinningText";


gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const initAnimations = () => {
      const section = sectionRef.current;
      if (!section) return;

      const ctx = gsap.context(() => {
        const heroBanner = section.querySelector(".hero-banner");

        // Scroll-linked scale animation for hero banner
        if (heroBanner) {
          gsap.fromTo(
            heroBanner,
            { scale: 1 },
            {
              scale: 1.15,
              ease: "none",
              scrollTrigger: {
                trigger: heroBanner,
                start: "top top",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        }



        // Individual fade-up animations for each element
        const fadeUpElements = gsap.utils.toArray<Element>(section.querySelectorAll(".fade-up"));
        fadeUpElements.forEach((element) => {
          gsap.from(element, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
              invalidateOnRefresh: true,
            },
            force3D: true,
            clearProps: "transform",
          });
        });
      }, section);

      cleanup = () => ctx.revert();

      // Refresh ScrollTrigger after all animations are created
      ScrollTrigger.refresh();
    };

    // Use multiple requestAnimationFrames to ensure DOM is fully laid out
    let rafId2: number | undefined;
    const rafId1 = requestAnimationFrame(() => {
      rafId2 = requestAnimationFrame(() => {
        initAnimations();
      });
    });

    return () => {
      cancelAnimationFrame(rafId1);
      if (rafId2) {
        cancelAnimationFrame(rafId2);
      }
      if (cleanup) {
        cleanup();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero-section relative flex flex-col justify-center overflow-hidden main-hero px-5 lg:px-[4rem] pb-6 pt-15 lg:py-20 min-h-screen">

      <div className="fade-up-css  hero-banner max-w-[1360px] mx-auto z-9  flex flex-col justify-center   pt-20 px-5 w-full gap-5 ">
        <h1 className="text-white uppercase max-w-[800px]   text-[3rem] lg:text-[6rem]  leading-none mb-1 ">
          <span className="text-[3rem] block  mb-3 font-[200]">Welcome to</span>
          Quadbreak Studios
         
        </h1>
         <span className="text-[1.2rem] uppercase font-light text-[var(--green)]">worlds, Vehicles, weapons  — The Best for your Team.</span>
        {/* <p className="text-white text-[16px] md:text-[18px] max-w-[700px]   lg:mx-0 font-[200]">
          From reference to render-ready, we take game art through the full production journey — modeling, texturing, and optimizing so it drops straight into your pipeline. No hand-holding, no rework loops. Just finished, engine-ready art, on schedule.
        </p> */}
        {/* <div className="md:flex items-center justify-center max-w-[1360px] mx-auto  w-full gap-5 fade-up-css">
            <AnimatedButton
              href=""
              label="Explore Our Work"
              className="w-fit"
            />
            <AnimatedButton
              href="s"
              label="Get in Touch"
              className="w-fit"
            />
          </div> */}
        {/* <span className="rounded-full w-7 h-7 border border-gray-300 flex items-center justify-center">
            <ArrowDown className="w-4 h-4 text-gray-300" />
          </span> */}
      </div>


      <div className="absolute hero-section-video top-0 left-0 w-full h-full  z-[-1]">
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
      <div className="absolute bottom-0 z-9 right-0 w-[120px] h-[120px] md:w-[250px] md:h-[250px] ml-auto self-end uppercase">
        <SpinningText
          text="Quadbreak • Gaming Art • Stimulator Art  • "
          image="/images/favicon-t.png"
          size={250}
          mobileSize={180}
          duration={15}

        />
      </div>
    </section>
  );
}