"use client";
import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "./AnimatedButton";

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
        const video = section.querySelector(".video-shrink video");

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

        // Scroll-linked scale animation for video
        if (window.innerWidth > 990 && video) {
          gsap.fromTo(
            video,
            { scale: 0.1 },
            {
              scale: 1,
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
    <section ref={sectionRef} className="relative flex flex-col overflow-hidden main-hero px-5 lg:px-[4rem] pb-6 pt-15 lg:py-20 ">
      <img src="/images/bg.png" alt="Shape 1" className="absolute top-0 left-0 w-full opacity-50 z-[-1]" />
      <div className="relative hero-banner w-full flex flex-col items-start justify-between bg-cover bg-no-repeat bg-center hero-bg-img">
        <div className="fade-up-css flex items-center flex-col justify-center max-w-[1360px] mx-auto pt-20 px-5 w-full gap-5 min-h-[calc(100vh-260px)]">
          <h1 className="text-white uppercase  max-w-5xl text-center text-[3rem] lg:text-[6rem]  leading-none mb-1">
            We&rsquo;re smart
            and crazy
            with art
          </h1>
          <p className="text-white text-[16px] md:text-[18px] max-w-2xl text-center mx-auto lg:mx-0 font-light">
            Evolved from Wrinit, Quadbreak Studios extends your team with expertly crafted 3D assets and environments — built for games, virtual reality, and simulation projects. Creative, reliable, and production-ready
          </p>
          <span className="rounded-full w-7 h-7 border border-gray-300 flex items-center justify-center">
            <ArrowDown className="w-4 h-4 text-gray-300" />
          </span>
        </div>
        
        <div className="md:flex items-center hidden justify-between max-w-[1360px] mx-auto pt-10 lg:pt-15 w-full gap-5 fade-up-css">
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
        </div>
      </div>
      <div className="video-shrink mt-[-75px] flex justify-start items-start" style={{ width: "100%", height: "100%" }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="rounded-14px] lg:rounded-[40px] origin-top"
        >
          <source src="/images/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}