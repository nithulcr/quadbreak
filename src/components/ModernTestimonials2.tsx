"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

const testimonials: Testimonial[] = [
  { name: "John Doe", role: "CEO · Quadbreak Studio", text: "Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a." },
  { name: "Jane Smith", role: "CTO · Neon Games", text: "Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a." },
  { name: "Alex Lee", role: "Art Director · Pixel Forge", text: "Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a." },
  { name: "Maria Garcia", role: "Producer · Studio Nova", text: "Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a." },
  { name: "David Chen", role: "Lead Artist · Virtual Edge", text: "Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a." },
  { name: "Sara Ahmed", role: "Director · SimWorks", text: "Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a." },
  { name: "Tom Wright", role: "CEO · GameBridge", text: "Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a." },
  { name: "Priya Nair", role: "Creative Lead · ArtLoop", text: "Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a." },
  { name: "Kai Tanaka", role: "Founder · OmniVR", text: "Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a." },
];

const renderStars = (count: number) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < count ? "text-[#91ff6a]" : "text-gray-500"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.637a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.084 2.24a1 1 0 00-.364 1.118l1.18 3.637c.3.921-.755 1.688-1.54 1.118l-3.084-2.24a1 1 0 00-1.176 0l-3.084 2.24c-.784.57-1.838-.197-1.539-1.118l1.18-3.637a1 1 0 00-.364-1.118l-3.084-2.24c-.784-.57-.38-1.81.588-1.81h3.812a1 1 0 00.951-.69l1.18-3.637z" />
      </svg>
    ))}
  </div>
);

const TestimonialCard = ({
  t,
  className = "",
}: {
  t: Testimonial;
  className?: string;
}) => (
  <div
    className={`testimonial-card rounded-[28px] border border-white/5 bg-black/20 backdrop-blur-md transition-all duration-500 p-6 flex flex-col gap-5 ${className}`}
  >
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 relative rounded-full overflow-hidden">
        <Image src="/images/user.png" alt={t.name} fill sizes="50px" className="object-cover" />
      </div>
      <div className="font-light">
        <p className="font-medium text-white">{t.name}</p>
        <p className="text-sm flex flex-wrap gap-2 pt-[2px]">
          <span className="text-gray-400">{t.role.split("·")[0]?.trim()}</span>
          {t.role.includes("·") && t.role.split("·")[1]?.trim()}
        </p>
        <div className="mt-2">{renderStars(5)}</div>
      </div>
    </div>
    <p className="text-white/80 text-[14px] font-[200]">{t.text}</p>
  </div>
);

const ModernTestimonials2 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const cards = section.querySelectorAll(".testimonial-card");
      if (cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 6,
          stagger: { each: 0.1, ease: "power2.inOut" },
          ease: "power3.out",
          scrollTrigger: {
            trigger: cards[0],
            start: "top 85%",
            once: true,
            invalidateOnRefresh: true,
          },
        },
      );


    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-14 md:py-24 relative overflow-hidden bg-[var(--background)]">
      <div className="absolute hero-section-video top-0 left-0 w-full h-full opacity-15">
        <img src="/images/bg2.png" alt="bg" className="object-cover h-full" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      </div>
      <div className="max-w-[1450px] mx-auto px-5 lg:px-10">
        <div className="text-center mb-10  md:mb-16">
          <h2 className="text-white uppercase text-4xl lg:text-6xl leading-none font-light mb-4">
            What Our Clients Says
          </h2>
        </div>

        {/* Desktop grid — hidden on tablet & mobile */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>

        
      </div>
      {/* Tablet + Mobile slider — hidden on desktop */}
        <div className="block lg:hidden">
          <Swiper
            slidesPerView={1.3}
            spaceBetween={10}
            loop={true}
            loopAdditionalSlides={6}
            breakpoints={{
              640: { slidesPerView: 2.2 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <TestimonialCard t={t} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
    </section>
  );
};

export default ModernTestimonials2;
