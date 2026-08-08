"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "./AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

interface SlideData {
  title: string;
  category: string;
  image: string;
}


const aboutSlides: SlideData[] = [
  {
    title: "Vehicles",
    category: "service",
    image: "/images/vehicles.png",
  },
  {
    title: "Weapons",
    category: "service",
    image: "/images/weapons.png",
  },
  {
    title: "Environments",
    category: "service",
    image: "/images/environments.png",
  },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentSlideTitle, setCurrentSlideTitle] = useState(aboutSlides[0].title);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const leftColumn = leftColumnRef.current;
      const rightColumn = rightColumnRef.current;
      
      if (!section || !leftColumn || !rightColumn) return;

      // Initial animations for left column content
      const badge = section.querySelector(".about-badge");
      const heading = section.querySelector(".about-heading");
      const paragraph = section.querySelector(".about-paragraph");
      const ctaButton = section.querySelector(".about-cta");

      if (badge) {
        gsap.from(badge, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        });
      }

      if (heading) {
        gsap.from(heading, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        });
      }

      if (paragraph) {
        gsap.from(paragraph, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        });
      }

      if (ctaButton) {
        gsap.from(ctaButton, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        });
      }

      // Pin the left column while right column scrolls
      // Unpin when the right column bottom reaches 10% from viewport bottom
      const images = rightColumn.querySelectorAll(".image-item");
      const imageCount = images.length;
      const scrollDistance = window.innerHeight;

      ScrollTrigger.create({
        trigger: rightColumn,
        start: "top top",
        end: "bottom 10%",
        pin: leftColumn,
        pinSpacing: false,
        anticipatePin: 1,
      });

      // Update title based on which image is centered in viewport
      // Use a wider trigger zone for better timing
      images.forEach((image, index) => {
        ScrollTrigger.create({
          trigger: image,
          start: "top 40%",
          end: "bottom 60%",
          onEnter: () => setCurrentSlideTitle(aboutSlides[index].title),
          onEnterBack: () => setCurrentSlideTitle(aboutSlides[index].title),
        });
      });

      // Animate images in right column with proper timing
      images.forEach((image, index) => {
        if (index === 0) {
          // First image is already visible
          gsap.set(image, { opacity: 1, y: 0 });
          return;
        }

        // Each image animates in as it scrolls into the center position
        // Animation starts before center and completes at center
        gsap.fromTo(
          image,
          { opacity: 0, y: 200 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: `top+=${(index - 0.5) * scrollDistance} top`,
              end: `top+=${index * scrollDistance} top`,
              scrub: false,
            },
          }
        );
      });

      // Set initial title
      setCurrentSlideTitle(aboutSlides[0].title);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-16 lg:py-30 relative overflow-hidden">
      <div className="grid-wrapper max-w-[1100px] mx-auto px-5">
        <div className="stacked-content">
          <div className="content-wrapper">
            <div className="flex flex-col lg:grid lg:grid-cols-2 items-start gap-8">
              {/* Left Column - Pinned Content */}
              <div ref={leftColumnRef} className="pin-top flex flex-col gap-5  lg:sticky lg:top-30">
                {/* Badge */}
                <div className="about-badge">
                  <div className="font-light text-[14px] tracking-[2px] uppercase text-white  flex items-center gap-2">
                    <svg width="30" height="30" className="rotate-linear" viewBox="0 0 24 24" fill="#91ff6a" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12C12 7.5 10 3 6 3C6 7.5 8 12 12 12Z" />
                      <path d="M12 12C16.5 12 21 10 21 6C16.5 6 12 8 12 12Z" />
                      <path d="M12 12C12 16.5 14 21 18 21C18 16.5 16 12 12 12Z" />
                      <path d="M12 12C7.5 12 3 14 3 18C7.5 18 12 16 12 12Z" />
                    </svg>
                   This is what we do best
                  </div>
                </div>
                {/* Heading */}
                <h2 className="about-heading uppercase text-white text-3xl lg:text-[4rem] leading-none font-light">
                  {currentSlideTitle}
                </h2>
                {/* Paragraph */}
                <p className="about-paragraph text-[16px] md:text-[18px] leading-snug font-[200] text-white/80">
                 Vehicles, weapons, and environments are asset types that punish shortcuts — mechanical accuracy, panel logic, and wear patterns all show up the moment they're in-engine. It's a specific skill set, and it's the one we've built our pipeline around for nine years. 
                </p>               
                {/* CTA Button */}
                <div className="about-cta mt-4">
                  <AnimatedButton href="" label="Learn More About Us" className="w-fit" />
                </div>
              </div>
              {/* Right Column - Scrolling Images */}
              <div ref={rightColumnRef} className="right-section w-full relative flex flex-col gap-8">
                {aboutSlides.map((slide, index) => (
                  <div
                    key={index}
                    ref={(el) => { imageRefs.current[index] = el; }}
                    className="image-item relative  flex items-center justify-center"
                  >
                    <div className="relative aspect-[1/1] w-full max-w-[600px] group overflow-hidden">
                      <Image
                        src={slide.image}
                        alt={slide.category}
                        fill
                        className="object-cover transition-transform duration-800 ease-out group-hover:scale-108"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 55vw"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-black/20 z-10" />
                      
                      {/* Category badge */}
                      <div className="absolute bottom-6 left-6 z-20">
                        <span className="bg-[var(--green)] text-black text-xs font-bold uppercase tracking-wider px-4 py-2">
                          {slide.title}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;