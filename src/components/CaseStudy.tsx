"use client";

import { useEffect } from "react";
import AnimatedButton from "./AnimatedButton";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);



const CaseStudy = () => {

  useEffect(() => {
    gsap.to(".filling-text .fill", {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".filling-text",
        start: "top 80%",
        end: "bottom 0%",
        scrub: true,
      },
    });

    gsap.utils.toArray(".rotate-traslate-to-right").forEach((elem) => {
      const target = elem as HTMLElement;
      gsap.fromTo(
        target,
        { rotation: -15, transformOrigin: "center center", x: -150, opacity: 0 },
        {
          rotation: 0,
          x: 0,
          opacity: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: target,
            start: "top 95%",
            end: "top 70%",
            scrub: 0.5,
          },
        }
      );
    });

    gsap.utils.toArray(".rotate-traslate-to-left").forEach((elem) => {
      const target = elem as HTMLElement;
      gsap.fromTo(
        target,
        { rotation: 15, transformOrigin: "center center", x: 150, opacity: 0 },
        {
          rotation: 0,
          x: 0,
          opacity: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: target,
            start: "top 95%",
            end: "top 70%",
            scrub: 0.5,
          },
        }
      );
    });


    //     gsap.utils.toArray(".slide-right").forEach((elem, index) => {
    //   const target = elem as HTMLElement;


    //   const startX = index === 1 ? 200 : 150;

    //   gsap.fromTo(
    //     target,
    //     { x: startX, opacity: 0 },
    //     {
    //       x: 0,
    //       opacity: 1,
    //       ease: "power3.out",
    //       scrollTrigger: {
    //         trigger: target,
    //         start: "top 85%",
    //         end: "top 45%",
    //         scrub: true,
    //       },
    //     }
    //   );
    // });

    gsap.utils.toArray(".fade-up").forEach((elem) => {
      const target = elem as HTMLElement;

      gsap.fromTo(
        target,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: target,
            start: "top 85%",
            end: "top 45%",
            scrub: true,
          },
        }
      );
    });




  },
    []);






  return (
    <section id="services" className="section overflow-hidden">
      {/* <div className="shape3 z-[-1]"></div>
      <div className="shape2 z-[-1]"></div> */}
      <div className="grid-wrapper max-w-[1360px] mx-auto px-5">
        <div className="stacked-content">
          <div className="content-wrapper">
            <div className="service-list grid gap-y-10 lg:gap-y-30">

              <div

                className="service-item flex flex-col lg:grid gap-x-20 items-center w-full "
              >


                <div className="service-info gap-y-10 w-full">
                  <div className="lg:w-[50%]">
                    <div className="flex flex-col mb-8">
                      <h2 className="uppercase slide-right  text-white heading filling-text text-5xl lg:text-[7rem]  leading-none font-medium font-monument relative">
                        <span className="fill" aria-hidden="true">
                          Case
                        </span>
                        <span>
                          Case
                        </span>
                      </h2>
                      <h2 className="uppercase slide-right delay-200 text-white heading filling-text text-5xl lg:text-[7rem]  leading-none font-medium font-monument relative">
                        <span className="fill" aria-hidden="true">
                          Study
                        </span>
                        <span>
                          Study
                        </span>
                      </h2>

                    </div>

                  </div>
                  <div className="mt-10  fade-up flex flex-col md:flex-row justify-between gap-10 items-center">

                    <p className="text-[#7ac4b4] text-[20px] leading-snug max-w-[500px]">We roar with creativity, staying updated with the latest tech to make your brand a formidable force in the digital wilderness and deliver exceptional website and app experiences.</p>
                    <div className="hidden md:block">
                      <AnimatedButton href="about" label="View All" className=" w-fit min-w-[160px]" />
                    </div>

                  </div>

                </div>
                <div className="work-row w-full">
                <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 w-full items-center ">

                  <div

                    className="fade-up  flex flex-col"
                  >
                    <h3 className="text-6xl font-monument uppercase">Loftloom</h3>
                    <p className="mt-4 text-xl font-medium uppercase leading-snug  tracking-wide max-w-[360px]">
                      UI Design, UX, Wireframe
                    </p>
                    <div className="hidden md:block">
                    <AnimatedButton href="about" label="View Project" className="mt-10 w-fit min-w-[160px] " />
                    </div>
                  </div>
                  <div

                    className="rotate-traslate-to-left  rounded-2xl aspect-[2/1.1]"
                  >
                    <Image
                      src="/images/left-loom.webp"
                      alt="Loftloom main landscape"
                      fill
                      className="object-cover rounded-xl"
                      priority
                    />
                  </div>


                </div>
                <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 w-full items-center ">
                  <div

                    className="rotate-traslate-to-right  rounded-2xl aspect-[2/1.1]"
                  >
                    <Image
                      src="/images/left-loom.webp"
                      alt="Loftloom main landscape"
                      fill
                      className="object-cover rounded-xl"
                      priority
                    />
                  </div>
                  <div

                    className="fade-up  flex flex-col"
                  >
                    <h3 className="text-6xl font-monument uppercase">Loftloom</h3>
                    <p className="mt-4 text-xl font-medium uppercase leading-snug  tracking-wide max-w-[360px]">
                      UI Design, UX, Wireframe
                    </p>
                     <div className="hidden md:block">
                    <AnimatedButton href="about" label="View Project" className="mt-10 w-fit min-w-[160px] " />
                    </div>
                  </div>



                </div>
                <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 w-full items-center">

                  <div

                    className="fade-up  flex flex-col"
                  >
                    <h3 className="text-6xl font-monument uppercase">Loftloom</h3>
                    <p className="mt-4 text-xl font-medium uppercase leading-snug  tracking-wide max-w-[360px]">
                      UI Design, UX, Wireframe
                    </p>
                     <div className="hidden md:block">
                    <AnimatedButton href="about" label="View Project" className="mt-10 w-fit min-w-[160px] " />
                    </div>
                  </div>
                  <div

                    className="rotate-traslate-to-left  rounded-2xl aspect-[2/1.1]"
                  >
                    <Image
                      src="/images/left-loom.webp"
                      alt="Loftloom main landscape"
                      fill
                      className="object-cover rounded-xl"
                      priority
                    />
                  </div>


                </div>
                </div>

                <div className="md:hidden mt-10">
                  <AnimatedButton href="about" label="View All" className=" w-fit min-w-[160px]" />
                </div>


              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



export default CaseStudy;
