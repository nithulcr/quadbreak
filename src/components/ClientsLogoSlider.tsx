"use client";

import Image from "next/image";
import type { Client } from "@/types/client";

interface ClientsLogoSliderProps {
  clients: Client[];
}

const ClientsLogoSlider = ({ clients }: ClientsLogoSliderProps) => {
  const withImages = clients.filter(
    (client) => client.image?.url,
  );
  const marqueeClients = [...withImages, ...withImages];

  return (
    <section className="relative overflow-hidden py-14 md:pt-20 md:pb-30">
      {/* Heading */}
      <div className="max-w-[1450px] mx-auto px-5 lg:px-10 mb-14">
        <h2 className="uppercase py-2 w-fit text-white heading text-3xl md:text-[4rem] leading-none font-light relative">
          Our Clients
        </h2>
      </div>

      {/* Marquee Track */}
      {clients.length > 0 && (
        <div className="relative w-full overflow-hidden">
        {/* Edge fade gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />

        <div
          className="flex w-max animate-marquee items-center"
          style={{ animationDuration: "50s" }}
        >
          {marqueeClients.map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="mt-10 flex items-center justify-center px-10 md:px-14 opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                <Image
                  src={client.image!.url!}
                  alt={client.title}
                  width={120}
                  height={60}
                  className="h-10 md:h-14 w-auto object-contain grayscale hover:grayscale-0 transition duration-500"
                />
              </div>
            ))}
        </div>
        </div>
      )}
    </section>
  );
};

export default ClientsLogoSlider;