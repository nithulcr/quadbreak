"use client";

import { useEffect } from "react";
import AnimatedButton from "./AnimatedButton";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const aboutsections = [
  {
    title: "Vehicles, weapons, environments ",
    subtitle: "This is what we do best",
    description:
      "Vehicles, weapons, and environments are asset types that punish shortcuts — mechanical accuracy, panel logic, and wear patterns all show up the moment they're in-engine. It's a specific skill set, and it's the one we've built our pipeline around for nine years. ",
    videoSrc: "/images/video.mp4",
    bgClassLeft: "eight",
    bgClassRight: "seven",
    reverse: false,
  },
  {
    title: "About Us",
    subtitle: "Who We Are",
    description:
      "In 2016, we started from a single desk, driven by a deep passion for game art. With a strong foundation in the industry but limited resources, we built everything from scratch, seizing every opportunity to grow. Over time, we expanded beyond game art into VR and simulator art, delivering high-quality visuals across industries.",
    videoSrc: "/images/video.mp4",
    bgClassLeft: "seven",
    bgClassRight: "eight",
    reverse: true,
    marquee: [
      "Game Art",
      "Stimulator Art",
      "3d Studio",
    ],
  },
];

const AboutSections_old = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      document
        .querySelectorAll<HTMLElement>(".large-growing-images.small")
        .forEach((wrapper) => {
          const left = wrapper.querySelector<HTMLElement>(".growing-image.small");
          const right = wrapper.querySelector<HTMLElement>(".growing-image.right");

          if (!left || !right) return;

          // Use scale instead of width to avoid layout thrashing
          // Calculate scale factors: 80% -> 35% = 0.4375, 20% -> 65% = 3.25
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapper,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          tl.fromTo(
            left,
            { scaleX: 1 },
            { scaleX: 0.4375, ease: "none", force3D: true },
            0
          ).fromTo(
            right,
            { scaleX: 1 },
            { scaleX: 3.25, ease: "none", force3D: true },
            0
          );
        });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="aboutSections" className="py-16 lg:py-30 relative overflow-hidden">
      <div className="grid-wrapper max-w-[1400px] mx-auto px-5">
        <div className="stacked-content">
          <div className="content-wrapper">
            <div className="service-list grid gap-y-10 lg:gap-y-30">
              {aboutsections.map((service, idx) => (
                <div
                  key={idx}
                  className={`service-item flex flex-col lg:grid gap-x-20 items-center w-full  ${service.reverse
                      ? "lg:grid-cols-[1fr_50%] flex-col-reverse"
                      : "lg:grid-cols-[50%_1fr] "
                    }`}
                >
                  {!service.reverse && (
                    <ServiceMedia
                      videoSrc={service.videoSrc}
                      bgClassLeft={service.bgClassLeft}
                      bgClassRight={service.bgClassRight}
                    />
                  )}

                  <div className="max-w-[600px]  gap-y-10">
                    <div className="overflow-hidden">
                      <div className="mb-6">
                        <div className="font-light text-[14px] tracking-[2px] uppercase text-white mb-6 flex items-center gap-2">
                          <svg width="30" height="30" className="rotate-linear" viewBox="0 0 24 24" fill="#91ff6a" xmlns="http://www.w3.org/2000/svg">

                            <path d="M12 12C12 7.5 10 3 6 3C6 7.5 8 12 12 12Z" />

                            <path d="M12 12C16.5 12 21 10 21 6C16.5 6 12 8 12 12Z" />

                            <path d="M12 12C12 16.5 14 21 18 21C18 16.5 16 12 12 12Z" />

                            <path d="M12 12C7.5 12 3 14 3 18C7.5 18 12 16 12 12Z" />
                          </svg> 
                          {service.title}
                        </div>
                        <h2 className="uppercase w-fit text-white  text-4xl lg:text-[5rem]  leading-none font-light  relative">
                          {service.subtitle}
                        </h2>
                      </div>
                      
                      <div className="max-w-[calc(100vw-40px)] mb-4">
                        {service.marquee && (
                        <ul className="text-[var(--green)] mt-4 list-disc text-[17px] list-inside flex gap-4 font-[200]">
                          {service.marquee.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )}
                      </div>
                      <p className="text-[16px] md:text-[18px] leading-snug font-[200] max-w-[500px]">
                        {service.description}
                      </p>
                    </div>
                    <AnimatedButton href="/" label="More About Us" className="mt-8 w-fit" />
                  </div>

                  {service.reverse && (
                    <ServiceMedia
                      videoSrc={service.videoSrc}
                      bgClassLeft={service.bgClassLeft}
                      bgClassRight={service.bgClassRight}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const ServiceMedia = ({
  videoSrc,
  bgClassLeft,
  bgClassRight,
}: {
  videoSrc: string;
  bgClassLeft: string;
  bgClassRight: string;
}) => (
  <div className="service-image w-full">
    <div className="large-growing-images small flex gap-4 w-full">
      <div className="growing-image small relative" style={{ width: "80%" }}>
        <div className={`growing-background ${bgClassLeft} absolute inset-0`}>
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="growing-image right relative" style={{ width: "20%" }}>
        <div className={`growing-background ${bgClassRight} absolute inset-0`} />
      </div>
    </div>
  </div>
);

export default AboutSections_old;
