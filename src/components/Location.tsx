"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StatsSection2 from "@/components/StatsSection2";

gsap.registerPlugin(ScrollTrigger);

const Location = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const title2Ref = useRef<HTMLHeadingElement>(null);

  const text4Ref = useRef<HTMLParagraphElement>(null);

  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      tl.from(title2Ref.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
      })

        .from(
          text4Ref.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.45",
        )
        .from(
          imgRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.45",
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="Location"
      className="section overflow-hidden py-14  md:py-24"
      ref={sectionRef}
    >
      {/* <div className="shape3 z-[-1]"></div>
      <div className="shape2 z-[-1]"></div> */}
      <div className="grid-wrapper max-w-[1450px] mx-auto px-5 lg:px-10">
        <div className="stacked-content">
          <div className="content-wrapper">
            <div className=" mb-12 lg:mb-20">
              <h2
                ref={title2Ref}
                className="uppercase w-fit text-white  text-4xl lg:text-[5rem]  leading-none font-light  relative  mx-auto"
              >
                Location and Journey
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-center mt-10 lg:mt-[-40px]">
              {/* Image */}

              <div className="sticky top-0">
                <div className="rounded-xl lg:rounded-2xl border relative border-white/10 side-image">
                  <span className="span1"></span>
                  <span className="span2"></span>

                  <img
                    src="/images/map.png"
                    alt="Quadbreak Studios map"
                    className="w-full max-h-[calc(100vh-140px)] object-cover p-1 lg:p-2 rounded-xl lg:rounded-2xl z-9 relative border-white/10 border"
                  />
                  <div className="absolute bottom-0 p-8 z-9 flex flex-col gap-3">
                    <div>
                      <h4 className="text-3xl">IRITTY</h4>
                      <p>Kannur, Kerala</p>
                    </div>
                    <div className="font-light">
                      <p>
                        Iritty, Kannur, Kerala - 670703
                        <br />
                        2nd Floor, City Center, Iritty
                      </p>
                      <p>11.2588° N, 75.9729° E</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}

              <div className="flex flex-col gap-4">
                <h3 className="uppercase w-fit text-white  text-4xl lg:text-[3rem]   font-light  relative">
                  We stayed when
                  <br />
                  <span className="text-[var(--green)]">others left.</span>
                </h3>
                <p className=" text-[16px] md:text-[18px] leading-snug font-[200] text-white/80 text-justify">
                  Most studios in India are in Bangalore, Hyderabad, or Pune.
                  That's where the game industry is, people said. That's where
                  you need to be.
                </p>
                <p className="pl-4 py-2 border-l-3 border-[var(--green)] text-[16px] md:text-[20px] leading-snug font-[200] text-white text-justify">
                  We built Quadbreak in Iritty because we believed world-class
                  art doesn’t need a city. It needs the right people.
                </p>
                <p
                  ref={text4Ref}
                  className=" text-[16px] md:text-[18px] leading-snug font-[200] text-white/80 text-justify"
                >
                  Jesto Jose returned to his hometown after years in Bangalore's
                  game industry — at Blue Papillon and Dhruva Interactive, where
                  the team worked on titles including Forza Horizon, Halo, and
                  Prey. He came back to build something permanent. Something
                  that would give other talented people from Kerala a reason to
                  stay too.
                  <span className="block h-3"></span>
                  Today, Quadbreak Studios works with game studios and
                  simulation companies across Europe and North America —
                  delivering AAA-quality 3D art from a town most of our clients
                  can't find on a map. That's the point.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
