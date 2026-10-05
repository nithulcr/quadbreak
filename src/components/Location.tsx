"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
            y: 20,
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
      className="section py-14  md:py-24"
      ref={sectionRef}
    >
      
      <div className="max-w-[1450px] mx-auto px-5 lg:px-10">
        
            <div className=" mb-8 lg:mb-14">
              <h2
                ref={title2Ref}
                className="uppercase w-fit text-white  text-4xl lg:text-[5rem]  leading-none font-light  relative  mx-auto"
              >
                Location and Journey
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-14  mt-10">
              {/* Image */}

              <div className="lg:sticky lg:top-[100px] h-fit">
                <div  ref={imgRef} className="rounded-xl lg:rounded-2xl border relative border-white/10 side-image ">
                  <span className="span1"></span>
                  <span className="span2"></span>

                  <img
                   
                    src="/images/map.png"
                    alt="Quadbreak Studios map"
                    className="w-full max-h-[calc(100vh-130px)] xl:max-h-[500px] object-cover p-1 lg:p-2 rounded-xl lg:rounded-2xl z-9 relative border-white/10 border"
                  />
                  <div className="absolute bottom-0 p-5 lg:p-8 z-9 flex flex-col gap-3">
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

              <div  ref={text4Ref} className="flex flex-col gap-4">
                <h3  className="uppercase w-fit text-white  text-4xl lg:text-[3rem]   font-light  relative">
                  We stayed when
                  <br />
                  <span className="text-[var(--green)]">others left.</span>
                </h3>
                <p className=" text-[16px] md:text-[18px] leading-snug font-[200] text-white/80 text-justify">
                  Most studios in India are in Bangalore, Hyderabad, or Pune.
                  That&apos;s where the game industry is, people said. That&apos;s where
                  you need to be.
                </p>
                <p className="pl-4 py-2 border-l-3 border-[var(--green)] text-[16px] md:text-[20px] leading-snug font-[200] text-white text-justify">
                  We built Quadbreak in Iritty because we believed world-class
                  art doesn’t need a city. It needs the right people.
                </p>
                <p
                 
                  className=" text-[16px] md:text-[18px] leading-snug font-[200] text-white/80 text-justify"
                >
                  Jesto Jose returned to his hometown after years in Bangalore&apos;s
                  game industry — at Blue Papillon and Dhruva Interactive, where
                  the team worked on titles including Forza Horizon, Halo, and
                  Prey. He came back to build something permanent. Something
                  that would give other talented people from Kerala a reason to
                  stay too.
                  <span className="block h-3"></span>
                  Today, Quadbreak Studios works with game studios and
                  simulation companies across Europe and North America —
                  delivering AAA-quality 3D art from a town most of our clients
                  can&apos;t find on a map. That&apos;s the point.
                </p>
              </div>
            </div>
          </div>
       
    </section>
  );
};

export default Location;
