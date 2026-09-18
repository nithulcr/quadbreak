"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import type { Testimonial } from "@/types/testimonial";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const MIN_LOOP_SLIDES = 10;

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const realCount = testimonials.length;

  const loopSlides = useMemo(() => {
    if (realCount === 0) return [];
    if (realCount >= MIN_LOOP_SLIDES) return testimonials;
    const copies = Math.ceil(MIN_LOOP_SLIDES / realCount);
    return Array.from({ length: copies }, () => testimonials).flat();
  }, [testimonials, realCount]);

  const renderCard = (testimonial: Testimonial) => (
    <div className="testimonial-card bg-white/5 p-4 rounded-4xl group relative">
      {/* Speech bubble */}
      <div
        className="
          relative
          rounded-[26px]
          bg-[var(--green)]
          p-4
          md:p-6
          min-h-[150px]
          flex
          flex-col
          shadow-[0_15px_50px_rgba(145,255,106,0.08)]
          transition-transform
          duration-500
          group-hover:-translate-y-1
        "
      >
        {/* Quote */}
        <p className="text-black/90 font-[400] text-[14px] md:text-[16px] line-clamp-3 italic">
          &ldquo;{testimonial.content}&rdquo;
        </p>
         <div className="min-w-0 pt-3 flex justify-between border-t border-black/20 mt-4">
          <p className="text-black text-[16px] md:text-[18px] leading-tight capitalize">
            {testimonial.title}
          </p>

          {testimonial.designation && (
            <p className="text-black/90 text-[13px] md:text-[14px] font-light mt-1 leading-tight capitalize">
              {testimonial.designation}
            </p>
          )}

         
        </div>

        {/* Speech bubble tail */}
        <div
          className="
            absolute
            left-[56px]
            -bottom-[17px]
            w-0
            h-0
            border-t-[22px]
            border-t-[#91ff6a]
            border-r-[24px]
            border-r-transparent
          "
        />
      </div>

      {/* Client information */}
      <div className="relative flex items-center gap-4 mt-7 px-3">
        {/* Profile image */}
        <div
          className="
            relative
            w-[58px]
            h-[58px]
            md:w-[64px]
            md:h-[64px]
            shrink-0
            rounded-full
            overflow-hidden
            border-[3px]
            border-[var(--background)]
            bg-black
          "
        >
          <Image
            src={testimonial.image?.url || "/images/user.png"}
            alt={testimonial.title}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>

        {/* Client logo */}
        <div className="min-w-0">
          <div className="relative h-8 w-30 shrink-0">
            <Image
              src="/images/logo.png"
              alt={testimonial.title}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[var(--background)]
        py-14
        md:py-24
      "
    >
     

      <div className="relative z-10 ">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 max-w-[1450px] mx-auto px-5 lg:px-10">
          <h2 className="text-white uppercase text-4xl md:text-6xl lg:text-[6rem] leading-none font-light">
            What Our <span className="text-[var(--green)]">Clients Say</span>
          </h2>
        </div>

        {testimonials.length > 0 && (
          <div className="testimonials-swiper">
            <Swiper
              modules={[Autoplay]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              slidesPerView={1.2}
              spaceBetween={16}
              loop={true}
              loopAdditionalSlides={2}
              grabCursor={true}
              centeredSlides={true}
              autoplay={{
                delay: 3200,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              onRealIndexChange={(swiper) => {
                if (realCount === 0) return;
                setActiveIndex(swiper.realIndex % realCount);
              }}
              breakpoints={{
                640: { slidesPerView: 2.2, spaceBetween: 20 },
                990: { slidesPerView: 2.6, spaceBetween: 20 },
              }}
              className="px-5"
            >
              {loopSlides.map((testimonial, index) => (
                <SwiperSlide key={`t-${testimonial.id}-${index}`}>
                  {renderCard(testimonial)}
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="testimonials-pagination mt-10 flex justify-center gap-2">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  type="button"
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === activeIndex}
                  className={`swiper-pagination-bullet ${
                    index === activeIndex ? "swiper-pagination-bullet-active" : ""
                  }`}
                  onClick={() => swiperRef.current?.slideToLoop(index, 600)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;