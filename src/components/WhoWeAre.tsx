"use client";

import { useEffect, useRef } from "react";
import AnimatedButton from "./AnimatedButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhoWeAre = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section id="WhoWeAre" className="section overflow-hidden py-20" ref={sectionRef}>
      {/* <div className="shape3 z-[-1]"></div>
      <div className="shape2 z-[-1]"></div> */}
      <div className="grid-wrapper max-w-[1360px] mx-auto px-5">
        <div className="stacked-content">
          <div className="content-wrapper">
            <div className="service-list grid gap-y-10 lg:gap-y-30">

              <div
                className="service-item flex flex-col lg:grid gap-x-20 items-center w-full "
              >

                <div className="service-info pt-10 lg:pt-0 gap-y-10">
                  <div className="lg:w-[50%]">
                    <div className="flex flex-col mb-8">
                      {/* <h2 ref={titleRef} className="uppercase w-fit text-white  text-5xl lg:text-[5rem]  leading-none font-light  relative">
                        <span className="block pl-10">Vehicles</span>
                        <span className="flex items-center gap-2 pl-20">
                          <svg width="80" height="80" className="rotate-linear" viewBox="0 0 24 24" fill="#91ff6a" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12C12 7.5 10 3 6 3C6 7.5 8 12 12 12Z" />
                            <path d="M12 12C16.5 12 21 10 21 6C16.5 6 12 8 12 12Z" />
                            <path d="M12 12C12 16.5 14 21 18 21C18 16.5 16 12 12 12Z" />
                            <path d="M12 12C7.5 12 3 14 3 18C7.5 18 12 16 12 12Z" />
                          </svg>
                          Weapons
                        </span>
                        <span className="block">Environments </span>
                      </h2> */}
                      <h2 ref={titleRef} className="uppercase w-fit text-white  text-5xl lg:text-[5rem]  leading-none font-light  relative">
                        This is what we do best
                      </h2>

                    </div>
                    <p ref={text1Ref} className="about-paragraph text-[16px] md:text-[20px] leading-snug font-[200] text-white/80">
                      Vehicles, weapons, and environments are asset types that punish shortcuts — mechanical accuracy, panel logic, and wear patterns all show up the moment they&apos;re in-engine. It&apos;s a specific skill set, and it&apos;s the one we&apos;ve built our pipeline around for nine years.
                    </p>
                    <img
                    src="/images/signature.png"
                    alt="signature"
                    className="w-[300px] mt-6"
                  />
                     {/* <div  ref={btnRef}>
                      <AnimatedButton href="about" label="Learn More" className="mt-10 w-fit min-w-[160px]" />
                    </div> */}
                  </div>
                  <div className="lg:w-[50%] ml-auto mt-10 lg:mt-[-350px] max-w-[530px] fade-up">
                    <h2 ref={text2Ref} className="uppercase w-fit text-white/60  text-right italic mb-10 text-[3rem]  leading-none font-light  relative">
                     Lets Create <br />Magic Together
                    </h2>
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src="https://media.room8studio.com/wp-content/uploads/2022/06/04202038/r8s.mp4" />
                      Your browser does not support the video tag.
                    </video>

                  </div>

                </div>
                {/* <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-10  w-full">

                  <div className="flex flex-col gap-10">
                    <div ref={card1Ref}
                      className="bg-[#26957d] md:bg-[var(--background2)] hover:bg-[#26957d]    p-8 flex flex-col justify-between  "
                    >
                      <h3 className="text-7xl font-monument">5000+</h3>
                      <p className="text-2xl font-medium uppercase leading-snug text-right tracking-wide max-w-[200px] ml-auto mt-20">
                        3d <br></br>Assets
                      </p>
                    </div>
                    <div ref={card2Ref}
                      className=" bg-[#e5484d] md:bg-[var(--background2)] hover:bg-[#e5484d]    p-8 flex flex-col justify-between  "
                    >
                      <h3 className="text-7xl font-monument">50+</h3>
                      <p className="text-2xl font-medium uppercase leading-snug text-right tracking-wide max-w-[200px] ml-auto mt-20">
                        Clients <br></br>minds
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-10 md:mt-20">
                    <div ref={card3Ref}
                      className=" bg-[#6f8f10] md:bg-[var(--background2)] hover:bg-[#6f8f10]    p-8 flex flex-col justify-between  "
                    >
                      <h3 className="text-7xl font-monument">120+</h3>
                      <p className="text-2xl font-medium uppercase leading-snug text-right tracking-wide max-w-[200px] ml-auto mt-20">
                        projects<br></br>completed
                      </p>
                    </div>
                    <div ref={card4Ref}
                      className=" bg-[#348bf1] md:bg-[var(--background2)] hover:bg-[#348bf1]    p-8 flex flex-col justify-between  "
                    >
                      <h3 className="text-7xl font-monument">9+</h3>
                      <p className="text-2xl font-medium uppercase leading-snug text-right tracking-wide max-w-[200px] ml-auto mt-20">
                        years of<br></br>experience
                      </p>
                    </div>
                  </div>


                </div> */}


              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



export default WhoWeAre;