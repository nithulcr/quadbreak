"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

const workCards = [
  {
    title: "Vehicles",
    image: "https://media.room8studio.com/wp-content/uploads/2022/01/04204130/service-trailer.jpg",
  },
  {
    title: "Weapons",
    image: "https://media.room8studio.com/wp-content/uploads/2022/01/04204136/service-3d.jpg",
  },
  {
    title: "Environments",
    image: "https://media.room8studio.com/wp-content/uploads/2022/01/04204134/service-animation.jpg",
  },
  {
    title: "Environments",
    image: "https://media.room8studio.com/wp-content/uploads/2022/01/04204134/service-animation.jpg",
  },
  {
    title: "Vehicles",
    image: "https://media.room8studio.com/wp-content/uploads/2022/01/04204130/service-trailer.jpg",
  },
  {
    title: "Weapons",
    image: "https://media.room8studio.com/wp-content/uploads/2022/01/04204136/service-3d.jpg",
  },
];

const WorkCard = ({
  card,
  className = "",
}: {
  card: (typeof workCards)[number];
  className?: string;
}) => (
  <div
    className={`about-card group relative top-0 aspect-[1/1.08] overflow-hidden transition-[top,box-shadow] duration-500 ease-out hover:top-[-10px] ${className}`}
  >
    <img
      src={card.image}
      alt={card.title}
      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
    <div className="absolute top-6 left-6 z-20 transition-all duration-500 ease-out group-hover:top-[-100px]">
      <span className="bg-[var(--green)] text-black text-xs font-[600] uppercase tracking-wider px-4 py-2">
        {card.title}
      </span>
    </div>
    <div className="absolute bottom-[-200px] group-hover:bottom-0 left-0 z-20 transition-all duration-500 ease-out bg-gradient-to-t from-black/80 via-black/40 w-full p-6">
      <h5 className="font-light text-[var(--green)] text-xl md:text-2xl uppercase tracking-wider relative top-0 group-hover:top-[-20px] transition-all duration-500 ease-out">
        {card.title}
      </h5>
      <p className="font-[200] text-[14px] max-w-[260px]">
        the one we have built our pipeline around for nine years
      </p>
    </div>
  </div>
);

const WorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

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
          },
        });
      }

      const cards = section.querySelectorAll(".about-card");
      if (cards.length > 0) {
        gsap.from(cards, {
          opacity: 0,
          y: 60,
          scale: 0.96,
          duration: 0.9,
          stagger: { each: 0.12, from: "start" },
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-16 lg:py-16 relative overflow-hidden">
      <div className="max-w-[1450px] mx-auto px-5 lg:px-10">
        <h2 className="about-heading uppercase text-center text-white text-3xl lg:text-[4rem] leading-none font-light mb-10">
          recent works
        </h2>

        {/* Desktop grid — hidden on tablet & mobile */}
        <div className="hidden lg:grid grid-cols-3 gap-8 ">
          {workCards.map((card, i) => (
            <WorkCard key={i} card={card} />
          ))}
        </div>

        
      </div>
      {/* Tablet + Mobile slider — hidden on desktop */}
        <div className="block lg:hidden">
          <Swiper
            slidesPerView={1.3}
            spaceBetween={16}
            loop={true}
            loopAdditionalSlides={6}
            breakpoints={{
              640: { slidesPerView: 2.2 },
            }}
          >
            {workCards.map((card, i) => (
              <SwiperSlide key={i}>
                <WorkCard card={card} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
    </section>
  );
};

export default WorksSection;
