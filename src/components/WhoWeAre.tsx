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
    <section id="WhoWeAre" className="section overflow-hidden" ref={sectionRef}>
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
                      <h2 ref={titleRef} className="uppercase w-fit text-white heading  text-5xl lg:text-[6rem]  leading-none font-light  relative">
                        Who<br />We Are
                      </h2>

                    </div>
                    <p ref={text1Ref} className="font-light text-white text-[18px] lg:text-[24px] leading-snug">In 2016, we started from a single desk, driven by a deep passion for game art. With a strong foundation in the industry but limited resources, we built everything from scratch, seizing every opportunity to grow. Over time, we expanded beyond game art into VR and simulator art, delivering high-quality visuals across industries.</p>

                  </div>
                  <div className="lg:w-[50%] ml-auto mt-10 lg:mt-20 max-w-[530px] fade-up lg:mt-[-30px]">

                    <p ref={text2Ref} className="font-light text-[18px] lg:text-[20px] leading-snug ">What began as Wrinit evolved into Quadbreak Studios, carrying forward the same commitment to creativity, collaboration, and innovation. Today, we continue to push boundaries, embracing new challenges and staying true to our core values.</p>
                    <div  ref={btnRef}>
                      <AnimatedButton href="about" label="About Us" className="mt-10 w-fit min-w-[160px]" />
                    </div>

                  </div>

                </div>
                <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mt-20  w-full">

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


                </div>


              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



export default WhoWeAre;