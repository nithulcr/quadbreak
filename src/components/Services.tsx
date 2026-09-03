"use client";

import { useEffect, useRef } from "react";
import AnimatedButton from "./AnimatedButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const services = [
  {
    title: "Vehicles",
    image: "/images/works/3.png",
  },
  {
    title: "Weapons",
    image: "/images/works/1.png",
  },

  {
    title: "Environments",
    image: "/images/works/6.jpeg",
  },
  {
    title: "Vegetations",
    image: "/images/works/4.png",
  },
  {
    title: "Props",
    image: "/images/works/5.png",
  },
  {
    title: "Stylized",
    image: "/images/works/2.png",
  },
];
const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const text1Ref = useRef<HTMLParagraphElement>(null);
  const text2Ref = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
      gsap.from(servicesGridRef.current?.children || [], {
        opacity: 0,
        y: 60,
        scale: 0.96,
        duration: 0.9,
        stagger: {
          each: 0.12,
          from: "start",
        },
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: servicesGridRef.current,
          start: "top 80%",
          once: true,
        },
      });
      tl.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
      })
        .from(
          text1Ref.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.45",
        )
        .from(
          text2Ref.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.45",
        )
        .from(
          btnRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.45",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      className="py-10 lg:py-20 relative overflow-hidden "
      ref={sectionRef}
    >
      <div className="grid gap-x-20 max-w-[1450px] mx-auto px-5 lg:px-10 items-center w-full ">
        <div className="  gap-y-10 flex flex-col lg:flex-row w-full lg:items-end lg:justify-between  mb-8">
          <div className="lg:w-[50%]">
            <h2
              ref={titleRef}
              className="uppercase w-fit text-white heading  text-5xl lg:text-[6rem]  leading-none font-light  relative"
            >
              Our
              <br />
              Services
            </h2>
          </div>
          <div className="lg:w-[50%] ml-auto  max-w-[530px] fade-up lg:mt-[-30px]">
            <p
              ref={text1Ref}
              className="font-[200] lg:text-right text-white text-[14px] lg:text-[18px] leading-snug"
            >
              At Quadbreak Studios, we bring game worlds to life with
              high-quality 3D art, environments, and assets tailored for AAA,
              indie, and mobile games. At Quadbreak Studios, we bring game
              worlds to life with high-quality 3D art.
            </p>
            <div ref={btnRef} className="hidden md:flex w-fit lg:ml-auto">
              <AnimatedButton
                href=""
                label="View All Services"
                className="mt-5 w-fit min-w-[160px]"
              />
            </div>
          </div>
        </div>
        <div
          ref={servicesGridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4  mt-5 md:mt-16"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-cards group relative overflow-hidden border border-white/20 aspect-[1/.75] rounded-[8px]"
            >
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover  group-hover:opacity-70 group-hover:scale-105 transition duration-700"
              />

              <div className="absolute inset-0  bg-gradient-to-t from-black/90 via-black/60 to-black/30 transition duration-700" />
              <div className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-between gap-5">
                <div className="flex justify-between items-center gap-3 ">
                  <h3 className="uppercase md:text-2xl  tracking-wide z-10 transition duration-500 group-hover:scale-105">
                    {service.title}
                  </h3>
                  <span className=" w-10 h-10 p-2 flex items-center justify-center rounded-full bg-[var(--green)] group-hover:bg-green  group-hover:scale-80 transition-all duration-500 ease-in-out z-99">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      color="rgb(0, 0, 0)"
                      className="rotate-[-45deg]"
                      style={{ width: "100%", height: "100%" }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </div>
                <p className="font-[200]  text-white text-[13px] md:text-[16px]  leading-snug">
                  At Quadbreak Studios, we bring game worlds to life with
                  high-quality 3D art, environments, and assets tailored for
                  AAA, indie, and mobile games.{" "}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div ref={btnRef} className="w-fit lg:ml-auto md:hidden">
          <AnimatedButton
            href="/about"
            label="View All Services"
            className="mt-5 w-fit min-w-[160px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
