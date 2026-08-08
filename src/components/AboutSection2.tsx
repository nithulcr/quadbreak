"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSlideTitle, setCurrentSlideTitle] = useState(aboutSlides[0].title);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);

  const getCardPosition = (index: number, activeIndex: number) => {
    const diff = index - activeIndex;
    const totalSlides = aboutSlides.length;

    // Calculate the shortest distance considering infinite loop
    let normalizedDiff = diff;
    if (diff > totalSlides / 2) normalizedDiff = diff - totalSlides;
    if (diff < -totalSlides / 2) normalizedDiff = diff + totalSlides;

    if (normalizedDiff === 0) return "center";
    if (normalizedDiff === -1 || (activeIndex === 0 && index === totalSlides - 1)) return "left";
    if (normalizedDiff === 1 || (activeIndex === totalSlides - 1 && index === 0)) return "right";
    
    return "hidden";
  };

  const updateCarousel = useCallback((newIndex: number, animate: boolean = true) => {
    if (!cardsContainerRef.current) return;

    const cards = cardsContainerRef.current.querySelectorAll(".carousel-card");
    const duration = animate ? 0.8 : 0;
    const ease = "power3.inOut";

    cards.forEach((card, index) => {
      const position = getCardPosition(index, newIndex);
      const zIndex = position === "center" ? 3 : position === "left" || position === "right" ? 2 : 1;
      
      let x = 0;
      let rotation = 0;
      let scale = 1;
      let opacity = 1;

      switch (position) {
        case "center":
          x = 0;
          rotation = 0;
          scale = 1;
          opacity = 1;
          break;
        case "left":
          x = -55;
          rotation = -12;
          scale = 0.75;
          opacity = 0.8;
          break;
        case "right":
          x = 55;
          rotation = 12;
          scale = 0.75;
          opacity = 0.8;
          break;
        case "hidden":
          x = 0;
          rotation = 0;
          scale = 0.75;
          opacity = 0;
          break;
      }

      if (animate) {
        gsap.to(card, {
          x: `${x}%`,
          rotation: rotation,
          scale: scale,
          opacity: opacity,
          zIndex: zIndex,
          duration: duration,
          ease: ease,
          force3D: true,
          willChange: "transform, opacity",
        });
      } else {
        gsap.set(card, {
          x: `${x}%`,
          rotation: rotation,
          scale: scale,
          opacity: opacity,
          zIndex: zIndex,
          force3D: true,
        });
      }
    });

    // Animate title
    const titleElement = document.querySelector(".carousel-title");
    if (titleElement && animate) {
      gsap.to(titleElement, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setCurrentSlideTitle(aboutSlides[newIndex].title);
          gsap.to(titleElement, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
    }
  }, []);

  const goToSlide = useCallback((newIndex: number) => {
    setCurrentIndex(newIndex);
    updateCarousel(newIndex);
    resetAutoplay();
  }, [updateCarousel]);

  const nextSlide = useCallback(() => {
    const newIndex = (currentIndex + 1) % aboutSlides.length;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    const newIndex = (currentIndex - 1 + aboutSlides.length) % aboutSlides.length;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const resetAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }
    autoplayTimerRef.current = setTimeout(nextSlide, 3500);
  }, [nextSlide]);

  useEffect(() => {
    // Initial setup
    updateCarousel(currentIndex, false);
    
    // Start autoplay
    autoplayTimerRef.current = setTimeout(nextSlide, 3500);

    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, []);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    currentXRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    currentXRef.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    
    const diff = startXRef.current - currentXRef.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    currentXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    
    const diff = startXRef.current - currentXRef.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    isDraggingRef.current = false;
  };

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
      <div className="grid-wrapper mx-auto px-5">
        <div className="stacked-content">
          <div className="content-wrapper">
            <div className="flex flex-col w-full items-center">
              {/* Right Column - Content */}
              <div className="flex flex-col gap-5">
                {/* Heading */}
                <h2 className="about-heading uppercase text-white text-3xl lg:text-[4rem] leading-none font-light">
                  This is what we do best
                </h2>
              </div>

              {/* Left Column - Image Slider */}
              <div className="w-full relative max-w-[460px] my-5">
                <div
                  ref={carouselRef}
                  className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] cursor-grab active:cursor-grabbing select-none"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div
                    ref={cardsContainerRef}
                    className="relative w-full h-full"
                    style={{ perspective: "1200px" }}
                  >
                    {aboutSlides.map((slide, index) => {
                      const position = getCardPosition(index, currentIndex);
                      const isClickable = position === "left" || position === "right";

                      return (
                        <div
                          key={index}
                          className={`carousel-card absolute inset-0 flex items-center justify-center ${
                            isClickable ? "cursor-pointer" : ""
                          }`}
                          onClick={() => {
                            if (isClickable && !isDraggingRef.current) {
                              if (position === "left") {
                                prevSlide();
                              } else if (position === "right") {
                                nextSlide();
                              }
                            }
                          }}
                          style={{
                            transformStyle: "preserve-3d",
                            backfaceVisibility: "hidden",
                          }}
                        >
                          <div
                            className="group relative w-[320px] h-[320px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px] overflow-hidden"
                            style={{
                              willChange: "transform, opacity",
                              transform: "translate3d(0, 0, 0)",
                            }}
                          >
                            <Image
                              src={slide.image}
                              alt={slide.category}
                              fill
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 55vw"
                              loading={index === 0 ? "eager" : "lazy"}
                            />
                            {/* Gradient Overlay */}
                            <div
                              className="absolute inset-0 pointer-events-none"
                              style={{
                                background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 50%)",
                              }}
                            />
                           
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Animated Title */}
              <h2 className="carousel-title uppercase text-white text-2xl lg:text-[3rem] leading-none font-light">
                {currentSlideTitle}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;