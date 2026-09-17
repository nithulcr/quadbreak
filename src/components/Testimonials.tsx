"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { Testimonial } from "@/types/testimonial";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const renderStars = (count: number) => {
    return (
      <div className="flex items-center gap-[3px]">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-[14px] h-[14px] ${
              i < count ? "text-[#91ff6a]" : "text-white/20"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.637a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.084 2.24a1 1 0 00-.364 1.118l1.18 3.637c.3.921-.755 1.688-1.54 1.118l-3.084-2.24a1 1 0 00-1.176 0l-3.084 2.24c-.784.57-1.838-.197-1.539-1.118l1.18-3.637a1 1 0 00-.364-1.118l-3.084-2.24c-.784-.57-.38-1.81.588-1.81h3.812a1 1 0 00.951-.69l1.18-3.637z" />
          </svg>
        ))}
      </div>
    );
  };

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
        <p className="text-black/90 font-light text-[14px] md:text-[16px] line-clamp-3">
          "{testimonial.content}"
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

        {/* Name / designation / rating */}
        <div className="min-w-0">
          <img src="/images/logo.png" className="w-30" />
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
          <div
            className="testimonials-swiper"
            style={
              {
                "--swiper-pagination-color": "var(--green)",
              } as CSSProperties
            }
          >
            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={1.2}
              spaceBetween={16}
              loop={true}
              loopAdditionalSlides={6}
              grabCursor={true}
              centeredSlides={true}
              autoplay={{
                delay: 3200,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                el: ".testimonials-pagination",
                clickable: true,
              }}
              breakpoints={{
                640: { slidesPerView: 2.4, spaceBetween: 20 },
                990: { slidesPerView: 2.4, spaceBetween: 20 },
                1300: { slidesPerView: 3.4, spaceBetween: 24,  },
              }}
              className="px-5"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  {renderCard(testimonial)}
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="testimonials-pagination mt-10 flex justify-center gap-2" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;