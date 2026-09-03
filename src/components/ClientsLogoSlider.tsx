"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const clients = [
  { name: "Quadbreak", image: "/images/logo.png" },
  { name: "Quadbreak", image: "/images/logo.png" },
  { name: "Quadbreak", image: "/images/logo.png" },
  { name: "Quadbreak", image: "/images/logo.png" },
  { name: "Quadbreak", image: "/images/logo.png" },
  { name: "Quadbreak", image: "/images/logo.png" },
  { name: "Quadbreak", image: "/images/logo.png" },
  { name: "Quadbreak", image: "/images/logo.png" },
  { name: "Quadbreak", image: "/images/logo.png" },


];

const ClientsLogoSlider = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Duplicate content for seamless infinite loop
    const content = track.innerHTML;
    track.innerHTML = content + content;
  }, []);

  return (
    <section className="relative overflow-hidden py-14 md:pt-20 md:pb-30">
      {/* Heading */}
      <div className="max-w-[1450px] mx-auto px-5 lg:px-10 mb-14">
        <h2 className="uppercase py-2 w-fit text-white heading text-3xl md:text-[4rem] leading-none font-light relative">
          Our Clients
        </h2>
      </div>

      {/* Marquee Track */}
      <div className="relative w-full overflow-hidden">
        {/* Edge fade gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />

        <div
          ref={trackRef}
          className="flex w-max animate-marquee items-center"
          style={{ animationDuration: "50s" }}
        >
          {clients.map((client, index) => (
            <div
              key={index}
              className="mt-10 flex items-center justify-center px-10 md:px-14 opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              <Image
                src={client.image}
                alt={client.name}
                width={120}
                height={60}
                className="h-10 md:h-14 w-auto object-contain grayscale hover:grayscale-0 transition duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsLogoSlider;