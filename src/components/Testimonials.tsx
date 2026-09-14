"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Testimonial } from "@/types/testimonial";

gsap.registerPlugin(ScrollTrigger);

const desktopSpanClasses = [
  "col-span-3",
  "col-span-4",
  "col-span-3",
  "col-span-4",
  "col-span-3",
  "col-span-3",
  "col-span-3",
  "col-span-3",
  "col-span-4",
];

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      // Cards animation — desktop grid only
      const cards = desktopGridRef.current?.querySelectorAll(".testimonial-card") ?? [];
      if (cards.length > 0) {
        gsap.fromTo(cards,
          {
            opacity: 0,
            y: 60,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 6,
            stagger: {
              each: 0.1,
              ease: "power2.inOut",
            },
            ease: "power3.out",
            scrollTrigger: {
              trigger: cards[0],
              start: "top 85%",
              once: true,
              invalidateOnRefresh: true,
            },
          }
        );

        // Floating animation — desktop only
        const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
        if (isDesktop) {
          cards.forEach((card, index) => {
            gsap.set(card, {
              transformOrigin: "center center",
            });

            const baseDuration = 0.7 + (index % 3) * 0.5;
            const delay = index * 0.15;

            gsap.to(card, {
              keyframes: [
                { x: -80, duration: baseDuration, ease: "sine.inOut" },
                { x: 0, duration: baseDuration, ease: "sine.inOut" },
                { x: 80, duration: baseDuration, ease: "sine.inOut" },
                { x: 0, duration: baseDuration, ease: "sine.inOut" },
              ],
              repeat: -1,
              delay: delay,
            });
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderStars = (count: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < count ? 'text-[#91ff6a]' : 'text-gray-500'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.637a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.084 2.24a1 1 0 00-.364 1.118l1.18 3.637c.3.921-.755 1.688-1.54 1.118l-3.084-2.24a1 1 0 00-1.176 0l-3.084 2.24c-.784.57-1.838-.197-1.539-1.118l1.18-3.637a1 1 0 00-.364-1.118l-3.084-2.24c-.784-.57-.38-1.81.588-1.81h3.812a1 1 0 00.951-.69l1.18-3.637z" />
          </svg>
        ))}
      </div>
    );
  };

  const renderCard = (testimonial: Testimonial, className: string) => (
    <div className={`testimonial-card ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 relative rounded-full overflow-hidden">
          <Image
            src={testimonial.image?.url || "/images/user.png"}
            alt={testimonial.title}
            fill
            sizes="50px"
            className="object-cover"
          />
        </div>
        <div className="font-light">
          <p className="font-medium text-white">{testimonial.title}</p>
          <p className="text-sm flex flex-wrap gap-2 pt-[2px]">
            <span className="text-gray-400">{testimonial.designation || ""}</span>
          </p>
          <div className="mt-2">{renderStars(testimonial.rating)}</div>
        </div>
      </div>
      <div>
        <p className="text-white/80 text-[14px] font-[200]">
          {testimonial.content}
        </p>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="py-14 md:py-24 relative overflow-hidden bg-[var(--background)]">
      <div className="absolute hero-section-video top-0 left-0 w-full h-full opacity-15">
        <img
          src="/images/bg2.png"
          alt="bg"
          className="object-cover h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="max-w-[1450px] mx-auto px-5 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-white uppercase text-4xl lg:text-6xl leading-none font-light mb-4">
            What Our Clients Says
          </h2>
        </div>

        {testimonials.length > 0 && (
          <>
            {/* Mobile + Tablet horizontal slider */}
            <div className="flex lg:hidden gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="snap-center shrink-0 w-[320px]">
                  {renderCard(
                    testimonial,
                    "rounded-[28px] border border-white/10 bg-black/20 backdrop-blur-md transition-all duration-500 p-6 flex flex-col gap-5",
                  )}
                </div>
              ))}
            </div>

            {/* Desktop staggered grid */}
            <div ref={desktopGridRef} className="hidden lg:grid grid-cols-10 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className={desktopSpanClasses[index % desktopSpanClasses.length]}>
                  {renderCard(
                    testimonial,
                    index === 0
                      ? "rounded-[28px] border border-white/5 bg-black/20 backdrop-blur-lg transition-all duration-500 p-6 flex flex-col gap-5"
                      : "rounded-[28px] border border-white/10 bg-black/20 backdrop-blur-md transition-all duration-500 p-6 flex flex-col gap-5",
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Testimonials;