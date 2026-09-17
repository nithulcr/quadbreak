"use client";

import Image from "next/image";
import type { Client } from "@/types/client";

interface ClientsLogoSliderProps {
  clients: Client[];
}

const ClientsLogoSlider = ({
  clients,
}: ClientsLogoSliderProps) => {
  const withImages = clients.filter(
    (client) => client.image?.url,
  );

  return (
    <section className="relative overflow-hidden py-14 md:pt-20 md:pb-30">
      {/* Heading */}
      <div className="max-w-[1450px] mx-auto px-5 lg:px-10 mb-14">
        <h2 className="uppercase py-2 w-fit text-white text-4xl lg:text-[6rem] text-center mx-auto leading-none font-light">
         Who <span className="text-[var(--green)]">we work</span> with
        </h2>

        <p className="text-[14px] md:text-[16px] text-center mx-auto max-w-[780px] leading-snug font-[200] text-white/80">
          We work with game studios that need a reliable outsource
          partner for dedicated production. Our artists embed into
          your pipeline, learn your standards, and deliver like an
          extension of your team.
        </p>
      </div>

      {/* Logo Grid */}
      {withImages.length > 0 && (
        <div className="max-w-[1450px] mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-5">
            {withImages.map((client) => (
              <div
                key={client.id}
                className="
                  group
                  relative
                  h-[120px]
                  md:h-[145px]
                  flex
                  items-center
                  justify-center
                  border
                  border
                  border-white/10
                  overflow-hidden
                  transition-all
                  duration-500
                  hover:bg-white/[0.02]
                "
              >
                {/* Subtle green glow */}
                <div
                  className="client-card
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-0
                    opacity-100
                    transition-opacity
                    duration-500
                    bg-[radial-gradient(circle_at_center,rgba(145,255,106,0.08),transparent_65%)]
                  "
                />

                <Image
                  src={client.image!.url!}
                  alt={client.title}
                  width={180}
                  height={80}
                  className="
                    relative
                    z-10
                    max-w-[140px]
                    md:max-w-[180px]
                    max-h-[55px]
                    md:max-h-[65px]
                    w-auto
                    h-auto
                    object-contain
                    opacity-60
                    grayscale
                    transition-all
                    duration-500
                    group-hover:opacity-100
                    group-hover:grayscale-0
                  "
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