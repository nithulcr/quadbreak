"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Keyboard, Mousewheel } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "./AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

interface SlideData {
  title: string;
  category: string;
  image: string;
}

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

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
  const sliderRef = useRef<any>(null);
  const [currentSlideTitle, setCurrentSlideTitle] = useState(aboutSlides[0].title);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      // Badge animation
      const badge = section.querySelector(".about-badge");
      if (badge) {
        gsap.from(badge, {
          opacity: 0,
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
          opacity: 0,
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
          opacity: 0,
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

      // Stats cards animation with stagger
      const stats = section.querySelectorAll(".stat-card");
      if (stats.length > 0) {
        gsap.from(stats, {
          opacity: 0,
          scale: 0.9,
          y: 30,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stats[0],
            start: "top 75%",
            once: true,
            invalidateOnRefresh: true,
          },
        });
      }

      // Slider reveal animation
      const slider = section.querySelector(".slider-container");
      if (slider) {
        gsap.from(slider, {
          opacity: 0,
          x: -80,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: slider,
            start: "top 75%",
            once: true,
            invalidateOnRefresh: true,
          },
        });
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
    <section ref={sectionRef} id="about" className="py-16 lg:py-30 relative overflow-hidden">
      <div className="grid-wrapper max-w-[1100px] mx-auto px-5">
        <div className="stacked-content">
          <div className="content-wrapper">
            <div className="flex flex-col lg:grid lg:grid-cols-2 items-center">
              
              {/* Left Column - Image Slider */}
              <div className="slider-container w-full relative">
                <Swiper
                  onSwiper={(swiper) => {
                    sliderRef.current = swiper;
                  }}
                  onSlideChange={(swiper) => {
                    const realIndex = swiper.realIndex;
                    setCurrentSlideTitle(aboutSlides[realIndex].title);
                  }}
                  modules={[Autoplay, Pagination, Keyboard, Mousewheel]}
                  spaceBetween={0}
                  slidesPerView={1}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  keyboard={{
                    enabled: true,
                    onlyInViewport: true,
                  }}
                  mousewheel={true}
                  effect="fade"
                  fadeEffect={{
                    crossFade: true,
                  }}
                  speed={1200}
                  className="overflow-hidden"
                >
                  {aboutSlides.map((slide, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative aspect-[1/1] group overflow-hidden">
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
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              {/* Right Column - Content */}
              <div className="flex flex-col gap-5 lg:ml-[-40px]">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;