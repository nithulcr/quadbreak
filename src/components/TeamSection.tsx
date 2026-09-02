"use client";

import Image from "next/image";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

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
    photoUrl: "/images/member2.jpg",
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
    photoUrl: "/images/member2.jpg",
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
    photoUrl: "/images/member2.jpg",
  },
];

const TeamSection = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-[1424px] px-5 py-12 md:py-20">
        <div className="mb-6 flex flex-col justify-between gap-8 md:mb-16">
          <div className="flex flex-col text-center mx-auto">
           
            <h2 className="font-monument text-5xl font-medium leading-none uppercase text-white md:text-7xl">
              Meet Our 
             
              <span className="text-[var(--green)] pl-4">Team</span>
            </h2>
             <p className="text-xl  tracking-[0.2em] font-light mt-5">
             Executeive Leadership
            </p>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          loopAdditionalSlides={6}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
            // @ts-expect-error Swiper navigation refs
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-expect-error Swiper navigation refs
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          className="team-swiper cursor-grab"
        >
          {staticTeam.map((member) => (
            <SwiperSlide key={member.id}>
              <div className="group relative">
                <div className="relative aspect-[1/1.1] w-full overflow-hidden border-5 border border-[#101010]">
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <div className="text-center px-4 py-3">
                  <h3 className="text-2xl font-[200]">{member.name}</h3>
                  <p className="mt-1 font-light text-white/50">{member.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
{/* 
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
        </div> */}
      </div>
    </section>
  );
};

export default TeamSection;
