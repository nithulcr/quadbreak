"use client";

import Image from "next/image";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { Swiper as SwiperClass } from "swiper";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  photoUrl: string;
}

const staticTeam: TeamMember[] = [
  {
    id: 1,
    name: "Alex Carter",
    role: "Founder & Art Director",

    photoUrl: "/images/member1.jpg",
  },
  {
    id: 2,
    name: "Maya Lopez",
    role: "Lead 3D Character Artist",

    photoUrl: "/images/member1.jpg",
  },
  {
    id: 3,
    name: "Daniel Kim",
    role: "Environment Artist",

    photoUrl: "/images/member1.jpg",
  },
  {
    id: 4,
    name: "Priya Sharma",
    role: "Technical Artist",

    photoUrl: "/images/member1.jpg",
  },
  {
    id: 5,
    name: "Omar Farouk",
    role: "3D Generalist",

    photoUrl: "/images/member1.jpg",
  },
  {
    id: 6,
    name: "Lena Novak",
    role: "Texture & Lookdev Artist",

    photoUrl: "/images/member1.jpg",
  },
];

const TeamSection = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <section className="relative overflow-hidden bg-white/3">
      <div className="mx-auto max-w-[1424px] px-5 py-20 md:py-24">
        <div className="mb-6 flex flex-col justify-between gap-8 md:mb-14">
          <div className="flex flex-col text-center mx-auto">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--green)] mb-4">
              The Team
            </p>
            <h2 className="font-monument text-5xl font-medium leading-none uppercase text-white md:text-7xl">
              Meet Our
              <br />
              <span className="text-[var(--green)]">Creators</span>
            </h2>
          </div>

          
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          speed={1500}
          loop
          navigation={{
            prevEl: prevRef.current!,
            nextEl: nextRef.current!,
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
            // @ts-expect-error assigning navigation refs
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-expect-error assigning navigation refs
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          onSwiper={(swiper) => {
            const el = swiper.el;
            el.addEventListener("mouseenter", () => swiper.autoplay?.stop());
            el.addEventListener("mouseleave", () => swiper.autoplay?.start());
          }}
        >
          {staticTeam.map((member) => (
            <SwiperSlide key={member.id}>
              <div className="group flex h-full flex-col overflow-hidden shadow-md transition-all duration-300 cursor-grab">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col pt-4">
                  <h3 className="text-xl font-medium text-white">{member.name}</h3>
                  <p className="mt-1 text-sm font-light text-[var(--green)]">{member.role}</p>
                  
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="hidden gap-2 md:flex justify-center mt-14">
            <button
              ref={prevRef}
              aria-label="Previous team members"
              className="cursor-pointer rounded-lg border border-white/15 px-4 py-2 text-[24px] leading-none text-[var(--white)] transition-colors hover:border-[var(--green)] hover:text-[var(--green)]"
            >
              ←
            </button>
            <button
              ref={nextRef}
              aria-label="Next team members"
              className="cursor-pointer rounded-lg border border-white/15 px-4 py-2 text-[24px] leading-none text-[var(--white)] transition-colors hover:border-[var(--green)] hover:text-[var(--green)]"
            >
              →
            </button>
          </div>
      </div>
    </section>
  );
};

export default TeamSection;
