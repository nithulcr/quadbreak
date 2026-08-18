"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "./AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

const aboutCards = [
  {
    title: "Vehicles",
    category: "service",
    image: "https://media.room8studio.com/wp-content/uploads/2022/01/04204130/service-trailer.jpg",
  },
  {
    title: "Weapons",
    category: "service",
    image: "https://media.room8studio.com/wp-content/uploads/2022/01/04204136/service-3d.jpg",
  },
  {
    title: "Environments",
    category: "service",
    image: "https://media.room8studio.com/wp-content/uploads/2022/01/04204134/service-animation.jpg",
  },
   {
    title: "Environments",
    category: "service",
    image: "https://media.room8studio.com/wp-content/uploads/2022/01/04204134/service-animation.jpg",
  },
  {
    title: "Vehicles",
    category: "service",
    image: "https://media.room8studio.com/wp-content/uploads/2022/01/04204130/service-trailer.jpg",
  },
  {
    title: "Weapons",
    category: "service",
    image: "https://media.room8studio.com/wp-content/uploads/2022/01/04204136/service-3d.jpg",
  },
 
];

const AboutSectionn = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      // Badge animation
      const badge = section.querySelector(".about-badge");
      if (badge) {
        gsap.from(badge, {
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: badge,
            start: "top 75%",
            once: true,
            invalidateOnRefresh: true,
          },
        });
      }

      // Heading animation
      const heading = section.querySelector(".about-heading");
      if (heading) {
        gsap.from(heading, {
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 75%",
            once: true,
            invalidateOnRefresh: true,
          },
        });
      }

      // Paragraph animation
      const paragraph = section.querySelector(".about-paragraph");
      if (paragraph) {
        gsap.from(paragraph, {
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: paragraph,
            start: "top 75%",
            once: true,
            invalidateOnRefresh: true,
          },
        });
      }

      // Cards animation with stagger
      const cards = section.querySelectorAll(".about-card");

if (cards.length > 0) {
  gsap.fromTo(
    cards,
    {

      y: 30,
      scale: 0.85,
    },
    {

      y: 0,
      scale: 1,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
        once: true,
        invalidateOnRefresh: true,
      },
    }
  );
}

      // CTA Button animation
      const ctaButton = section.querySelector(".about-cta");
      if (ctaButton) {
        gsap.from(ctaButton, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaButton,
            start: "top 75%",
            once: true,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-16 lg:py-16 relative overflow-hidden">
      <div className="grid-wrapper max-w-[1200px] mx-auto px-5">
        <div className="stacked-content">
          <div className="content-wrapper">
            {/* Badge */}
            {/* <div className="about-badge mb-6">
              <div className="font-light mx-auto w-fit text-[14px] tracking-[2px] uppercase text-white flex items-center gap-2">
                <svg width="30" height="30" className="rotate-linear" viewBox="0 0 24 24" fill="#91ff6a" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C12 7.5 10 3 6 3C6 7.5 8 12 12 12Z" />
                  <path d="M12 12C16.5 12 21 10 21 6C16.5 6 12 8 12 12Z" />
                  <path d="M12 12C12 16.5 14 21 18 21C18 16.5 16 12 12 12Z" />
                  <path d="M12 12C7.5 12 3 14 3 18C7.5 18 12 16 12 12Z" />
                </svg>
               Expertise
              </div>
            </div> */}

            {/* Heading */}
            <h2 className="about-heading uppercase text-center text-white text-3xl lg:text-[4rem] leading-none font-light mb-10">
             recent works
            </h2>
{/* 
            <p className="about-paragraph text-[16px] md:text-[18px] leading-snug font-[200] text-white/80 mb-12 max-w-3xl">
              Vehicles, weapons, and environments are asset types that punish shortcuts — mechanical accuracy, panel logic, and wear patterns all show up the moment they're in-engine. It's a specific skill set, and it's the one we have built our pipeline around for nine years. 
            </p> */}

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {aboutCards.map((card, index) => (
                <div key={index} className="about-card group relative top-0 aspect-[1/1.2] overflow-hidden transition-[top,box-shadow] duration-500 ease-out hover:top-[-10px]">
                  
                  <img
                    src={card.image}
                    alt={card.title}
                   className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                
                  {/* Category badge */}
                  <div className="absolute top-6 left-6 z-20 transition-all duration-500 ease-out group-hover:top-[-100px]">
                    <span className="bg-[var(--green)] text-black text-xs font-[600] uppercase tracking-wider px-4 py-2">
                      {card.title}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-[-200px] group-hover:bottom-0 left-0 z-20 transition-all duration-500 ease-out bg-gradient-to-t from-black/80 via-black/40 w-full p-6">
                    <h5 className="font-light text-xl uppercase tracking-wider  relative top-0 group-hover:top-[-20px] transition-all duration-500 ease-out">
                      {card.title}
                    </h5>
                    <p className="font-[200] text-[14px]  max-w-[260px]">the one we have built our pipeline around for nine years</p>
                  </div>
                </div>
              ))}
            </div>

  
            {/* <div className="about-cta">
              <AnimatedButton href="" label="Learn More About Us" className="w-fit" />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionn;