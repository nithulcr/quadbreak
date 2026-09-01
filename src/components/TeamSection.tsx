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

    photoUrl: "/images/member1.png",
  },
  {
    id: 2,
    name: "Maya Lopez",
    role: "Lead 3D Character Artist",

    photoUrl: "/images/member1.png",
  },
  {
    id: 3,
    name: "Daniel Kim",
    role: "Environment Artist",

    photoUrl: "/images/member1.png",
  },
  {
    id: 4,
    name: "Priya Sharma",
    role: "Technical Artist",

    photoUrl: "/images/member1.png",
  },
  {
    id: 5,
    name: "Omar Farouk",
    role: "3D Generalist",

    photoUrl: "/images/member1.png",
  },
  {
    id: 6,
    name: "Lena Novak",
    role: "Texture & Lookdev Artist",

    photoUrl: "/images/member1.png",
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
          centeredSlides={true}
          slidesPerView="auto"
          spaceBetween={40}
          loop={true}
          loopAdditionalSlides={6}
          loopPreventsSliding={false}
          watchSlidesProgress={true}
          speed={1000}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;

            // @ts-expect-error Swiper navigation refs
            swiper.params.navigation.prevEl = prevRef.current;

            // @ts-expect-error Swiper navigation refs
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onSwiper={(swiper) => {
            setTimeout(() => {
              swiper.navigation.init();
              swiper.navigation.update();
            });

            const el = swiper.el;

            el.addEventListener("mouseenter", () => {
              swiper.autoplay?.stop();
            });

            el.addEventListener("mouseleave", () => {
              swiper.autoplay?.start();
            });
          }}
          className="team-swiper !overflow-visible"
        >
          {staticTeam.map((member) => (
            <SwiperSlide key={member.id} className="!w-[350px]">
              <div className="team-card group relative overflow-hidden rounded-2xl">
                {/* Image */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    fill
                    sizes="350px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* Member info */}
                <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white px-4 py-3">
                  <h3 className="text-base font-medium text-black">
                    {member.name}
                  </h3>

                  <p className="mt-0.5 text-xs text-black/50">{member.role}</p>
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
