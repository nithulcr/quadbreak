"use client";

import Image from "next/image";
import { useRef, useState } from "react";


interface TeamMember {
  id: number;
  name: string;
  role: string;
  photoUrl: string;
}

const staticTeam: TeamMember[] = [
  {
    id: 1,
    name: "Joshmi Maria",
    role: "Director of Finance",
    photoUrl: "/images/member1.webp",
  },
  {
    id: 2,
    name: "Titto",
    role: "Business Development Manger",
    photoUrl: "/images/member2.webp",
  },
  {
    id: 3,
    name: "Mohammed Shaz",
    role: "Lead Artist",
    photoUrl: "/images/member3.webp",
  },
  {
    id: 4,
    name: "Sagar Savale",
    role: "Lead Game Artist",
    photoUrl: "/images/member4.webp",
  },
  {
    id: 5,
    name: "Benitto Babu",
    role: "Talant Acquisition Manager",
    photoUrl: "/images/member5.webp",
  },
   {
    id: 6,
    name: "Anju Hareendran",
    role: "Project manager",
    photoUrl: "/images/member6.webp",
  },
   {
    id: 7,
    name: "Meenakshi",
    role: "Project Manager",
    photoUrl: "/images/member7.webp",
  },
  {
    id: 8,
    name: "Neethu. M",
    role: "HR Manager",
    photoUrl: "/images/member8.webp",
  },

];

const TeamSection = () => {
 
  const [ready, setReady] = useState(false);

  return (
    <section id="meet-the-team" className="relative overflow-hidden">
      <div className="mx-auto max-w-[1424px] px-5 py-12 md:py-20 ">
        <div className="mb-6 flex flex-col justify-between gap-8 md:mb-16">
          <div className="flex flex-col text-center mx-auto">
            <h2 className="font-monument text-5xl font-medium leading-none uppercase text-white md:text-7xl">
              Meet Our
              <span className="text-[var(--green)] pl-4">Team</span>
            </h2>
            <p className="text-xl  tracking-[0.2em] font-[200] mt-5">
              Executeive Leadership
            </p>
          </div>
        </div>

       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {staticTeam.map((member) => (
            <div  key={member.id}>
              <div className="group relative">
                {/* Image Container with default filters and hover removal */}
                <div className="relative aspect-[1/1.4] w-full overflow-hidden border border-[#101010] transition-all duration-500 ease-in-out">
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="text-center px-4 py-3">
                  <h3 className="text-lg md:text-2xl font-[200]">{member.name}</h3>
                  <p className="mt-1 text-[12px] md:text-[16px] font-light text-white/50">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
          </div>
      
      </div>
    </section>
  );
};

export default TeamSection;