"use client";

import { useEffect, useRef } from "react";
import AnimatedButton from "./AnimatedButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const services = [
  {
    title: "CONCEPT ART & 2D",
    image: "https://media.room8studio.com/wp-content/uploads/2022/01/04201751/service-ca-min.jpg",
  },
  {
    title: "TRAINING AND SIMULATION",
    image: "https://media.room8studio.com/wp-content/uploads/2022/01/04201751/service-ca-min.jpg",
  },
  {
    title: "3D ENVIRONMENT",
    image: "https://media.room8studio.com/wp-content/uploads/2022/01/04201751/service-ca-min.jpg",
  },
  {
    title: "3D CHARACTERS",
    image: "https://media.room8studio.com/wp-content/uploads/2022/01/04201751/service-ca-min.jpg",
  },
  {
    title: "ANIMATION & VFX",
    image: "https://media.room8studio.com/wp-content/uploads/2022/01/04201751/service-ca-min.jpg",
  },
  {
    title: "TRAILERS & CINEMATICS",
    image: "https://media.room8studio.com/wp-content/uploads/2022/01/04201751/service-ca-min.jpg",
  },
];
const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const text1Ref = useRef<HTMLParagraphElement>(null);
  const text2Ref = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLParagraphElement>(null);


  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {

      // Timeline for heading/content
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
      gsap.from(
        servicesGridRef.current?.children || [],
        {
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
        }
      );
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
          "-=0.45"
        )
        .from(
          text2Ref.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.45"
        )
        .from(
          btnRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.45"
        );

      // Cards
      [
        { ref: card1Ref, x: -40, rotation: -6 },
        { ref: card2Ref, x: -40, rotation: -6 },
        { ref: card3Ref, x: 40, rotation: 6 },
        { ref: card4Ref, x: 40, rotation: 6 },
      ].forEach(({ ref, x, rotation }) => {
        gsap.from(ref.current, {
          x,
          rotation,
          opacity: 0,
          scale: 0.96,
          duration: 1.1,
          ease: "power3.out",
          force3D: true,
          transformOrigin: "center center",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();

  }, []);

  return (
    <section id="services" className="py-16 lg:py-30 relative overflow-hidden " ref={sectionRef}>

      <div
        className="grid gap-x-20 items-center w-full "
      >

        <div className="pt-10 lg:pt-0 max-w-[1360px] mx-auto px-5 gap-y-10 flex flex-col lg:flex-row w-full lg:items-end lg:justify-between  mb-8">
          <div className="lg:w-[50%]">

            <h2 ref={titleRef} className="uppercase w-fit text-white heading  text-5xl lg:text-[6rem]  leading-none font-light  relative">
              Our<br />Services
            </h2>

          </div>
          <div className="lg:w-[50%] ml-auto  max-w-[530px] fade-up lg:mt-[-30px]">

            <p ref={text1Ref} className="font-[200] lg:text-right text-white text-[14px] lg:text-[18px] leading-snug">At Quadbreak Studios, we bring game worlds to life with high-quality 3D art, environments, and assets tailored for AAA, indie, and mobile games. At Quadbreak Studios, we bring game worlds to life with high-quality 3D art.</p>
            <div ref={btnRef} className="w-fit lg:ml-auto">
              <AnimatedButton href="about" label="View All Services" className="mt-5 w-fit min-w-[160px]" />
            </div>

          </div>

        </div>
        <div ref={servicesGridRef} className="grid grid-cols-2 lg:grid-cols-3  mt-10 md:mt-24">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative overflow-hidden border border-white/10 aspect-[1.2/1]"
            >
              <span className="absolute top-5 right-5 w-10 h-10 p-2 flex items-center justify-center rounded-full bg-[var(--green)] group-hover:bg-green opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-in-out z-99">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" color="rgb(0, 0, 0)" className="rotate-[-45deg]" style={{ width: '100%', height: '100%' }}><path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"></path></svg>
              </span>
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-70 transition duration-700"
              />

              <div className="absolute inset-0  group-hover:bg-black/40 transition duration-700" />

              <h3 className="absolute inset-0 flex items-center justify-center text-center uppercase md:text-2xl  tracking-wide z-10 transition duration-500 group-hover:scale-105">
                {service.title}
              </h3>
            </div>
          ))}
        </div>


      </div>


    </section>
  );
};



export default Services;