"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const ModernTestimonials2 = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      // Cards animation with stagger
      const cards = section.querySelectorAll(".testimonial-card");
      if (cards.length > 0) {
        gsap.fromTo(cards,
          {
            opacity: 0,
            y: 60,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 6,
            stagger: {
              each: 0.1,
              ease: "power2.inOut",
            },
            ease: "power3.out",
            scrollTrigger: {
              trigger: cards[0],
              start: "top 85%",
              once: true,
              invalidateOnRefresh: true,
            },
          }
        );

        // Infinite floating animation for each card - X axis only with 3-position swing
        cards.forEach((card, index) => {
          // Set transform origin to center
          gsap.set(card, {
            transformOrigin: "center center",
          });

          const baseDuration = 0.7 + (index % 3) * 0.5; // Different timing for each card (0.6-1.1s)
          const delay = index * 0.15; // Different delay for each card

          // Three-position animation: -20px → 0 → 20px → 0 → -20px
          gsap.to(card, {
            keyframes: [
              { x: -80, duration: baseDuration, ease: "sine.inOut" },
              { x: 0, duration: baseDuration, ease: "sine.inOut" },
              { x: 80, duration: baseDuration, ease: "sine.inOut" },
              { x: 0, duration: baseDuration, ease: "sine.inOut" },
            ],
            repeat: -1,
            delay: delay,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderStars = (count: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < count ? 'text-[#91ff6a]' : 'text-gray-500'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.637a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.084 2.24a1 1 0 00-.364 1.118l1.18 3.637c.3.921-.755 1.688-1.54 1.118l-3.084-2.24a1 1 0 00-1.176 0l-3.084 2.24c-.784.57-1.838-.197-1.539-1.118l1.18-3.637a1 1 0 00-.364-1.118l-3.084-2.24c-.784-.57-.38-1.81.588-1.81h3.812a1 1 0 00.951-.69l1.18-3.637z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="py-14 md:py-24 relative overflow-hidden bg-[var(--background)]">
      <div className="absolute hero-section-video top-0 left-0 w-full h-full opacity-15">
        <img
          src="/images/bg2.png"
          alt="bg"
          className="object-cover h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="max-w-[1450px] mx-auto px-5 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-white uppercase text-4xl lg:text-6xl leading-none font-light mb-4">
            What Our Clients Says
          </h2>
        </div>

        {/* Testimonials Grid - 12 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-10  gap-8">

          <div className="testimonial-card  col-span-1 md:col-span-3  rounded-[28px] border border-white/5 bg-black/20 backdrop-blur-lg  transition-all duration-500  p-6 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative rounded-full overflow-hidden">
                <Image
                  src="/images/user.png"
                  alt="John Doe"
                  fill
                  sizes="50px"
                  className="object-cover"
                />
              </div>
              <div className="font-light">
                <p className="font-medium text-white">John Doe</p>
                <p className="text-sm flex flex-wrap gap-2 pt-[2px]"><span className="text-gray-400">CEO</span> Quadbreak Studio</p>
                <div className="mt-2">
                {renderStars(5)}
              </div>
              </div>
            </div>


            <div>

              <p className="text-white/80 text-[14px] font-[200] ">
                Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a.
              </p>
            </div>

          </div>
          <div className="testimonial-card  col-span-1 md:col-span-4  rounded-[28px] border border-white/10 bg-black/20 backdrop-blur-md  transition-all duration-500  p-6 flex flex-col gap-5">

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative rounded-full overflow-hidden">
                <Image
                  src="/images/user.png"
                  alt="John Doe"
                  fill
                  sizes="50px"
                  className="object-cover"
                />
              </div>
              <div className="font-light">
                <p className="font-medium text-white">John Doe</p>
                <p className="text-sm flex flex-wrap gap-2 pt-[2px]"><span className="text-gray-400">CEO</span> Quadbreak Studio</p>
                <div className="mt-2">
                {renderStars(5)}
              </div>
              </div>
            </div>


            <div>

              <p className="text-white/80 text-[14px] font-[200] ">
                Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a.
              </p>
            </div>
          </div>
          <div className="testimonial-card  col-span-1 md:col-span-3  rounded-[28px] border border-white/10 bg-black/20 backdrop-blur-md  transition-all duration-500  p-6 flex flex-col gap-5">

           <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative rounded-full overflow-hidden">
                <Image
                  src="/images/user.png"
                  alt="John Doe"
                  fill
                  sizes="50px"
                  className="object-cover"
                />
              </div>
              <div className="font-light">
                <p className="font-medium text-white">John Doe</p>
                <p className="text-sm flex flex-wrap gap-2 pt-[2px]"><span className="text-gray-400">CEO</span> Quadbreak Studio</p>
                <div className="mt-2">
                {renderStars(5)}
              </div>
              </div>
            </div>


            <div>

              <p className="text-white/80 text-[14px] font-[200] ">
                Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a.
              </p>
            </div>
          </div>
          <div className="testimonial-card  col-span-1 md:col-span-4  rounded-[28px] border border-white/10 bg-black/20 backdrop-blur-md  transition-all duration-500  p-6 flex flex-col gap-5">

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative rounded-full overflow-hidden">
                <Image
                  src="/images/user.png"
                  alt="John Doe"
                  fill
                  sizes="50px"
                  className="object-cover"
                />
              </div>
              <div className="font-light">
                <p className="font-medium text-white">John Doe</p>
                <p className="text-sm flex flex-wrap gap-2 pt-[2px]"><span className="text-gray-400">CEO</span> Quadbreak Studio</p>
                <div className="mt-2">
                {renderStars(5)}
              </div>
              </div>
            </div>


            <div>

              <p className="text-white/80 text-[14px] font-[200] ">
                Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a.
              </p>
            </div>
          </div>
          <div className="testimonial-card  col-span-1 md:col-span-3  rounded-[28px] border border-white/10 bg-black/20 backdrop-blur-md  transition-all duration-500  p-6 flex flex-col gap-5">

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative rounded-full overflow-hidden">
                <Image
                  src="/images/user.png"
                  alt="John Doe"
                  fill
                  sizes="50px"
                  className="object-cover"
                />
              </div>
              <div className="font-light">
                <p className="font-medium text-white">John Doe</p>
                <p className="text-sm flex flex-wrap gap-2 pt-[2px]"><span className="text-gray-400">CEO</span> Quadbreak Studio</p>
                <div className="mt-2">
                {renderStars(5)}
              </div>
              </div>
            </div>


            <div>

              <p className="text-white/80 text-[14px] font-[200] ">
                Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a.
              </p>
            </div>
          </div>
          <div className="testimonial-card  col-span-1 md:col-span-3  rounded-[28px] border border-white/10 bg-black/20 backdrop-blur-md  transition-all duration-500  p-6 flex flex-col gap-5">

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative rounded-full overflow-hidden">
                <Image
                  src="/images/user.png"
                  alt="John Doe"
                  fill
                  sizes="50px"
                  className="object-cover"
                />
              </div>
              <div className="font-light">
                <p className="font-medium text-white">John Doe</p>
                <p className="text-sm flex flex-wrap gap-2 pt-[2px]"><span className="text-gray-400">CEO</span> Quadbreak Studio</p>
                <div className="mt-2">
                {renderStars(5)}
              </div>
              </div>
            </div>


            <div>

              <p className="text-white/80 text-[14px] font-[200] ">
                Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a.
              </p>
            </div>
          </div>
          <div className="testimonial-card  col-span-1 md:col-span-3  rounded-[28px] border border-white/10 bg-black/20 backdrop-blur-md  transition-all duration-500  p-6 flex flex-col gap-5">

           <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative rounded-full overflow-hidden">
                <Image
                  src="/images/user.png"
                  alt="John Doe"
                  fill
                  sizes="50px"
                  className="object-cover"
                />
              </div>
              <div className="font-light">
                <p className="font-medium text-white">John Doe</p>
                <p className="text-sm flex flex-wrap gap-2 pt-[2px]"><span className="text-gray-400">CEO</span> Quadbreak Studio</p>
                <div className="mt-2">
                {renderStars(5)}
              </div>
              </div>
            </div>


            <div>

              <p className="text-white/80 text-[14px] font-[200] ">
                Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a.
              </p>
            </div>
          </div>
          <div className="testimonial-card  col-span-1 md:col-span-3  rounded-[28px] border border-white/10 bg-black/20 backdrop-blur-md  transition-all duration-500  p-6 flex flex-col gap-5">

           <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative rounded-full overflow-hidden">
                <Image
                  src="/images/user.png"
                  alt="John Doe"
                  fill
                  sizes="50px"
                  className="object-cover"
                />
              </div>
              <div className="font-light">
                <p className="font-medium text-white">John Doe</p>
                <p className="text-sm flex flex-wrap gap-2 pt-[2px]"><span className="text-gray-400">CEO</span> Quadbreak Studio</p>
                <div className="mt-2">
                {renderStars(5)}
              </div>
              </div>
            </div>


            <div>

              <p className="text-white/80 text-[14px] font-[200] ">
                Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a.
              </p>
            </div>
          </div>
          <div className="testimonial-card  col-span-1 md:col-span-4  rounded-[28px] border border-white/10 bg-black/20 backdrop-blur-md  transition-all duration-500  p-6 flex flex-col gap-5">

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative rounded-full overflow-hidden">
                <Image
                  src="/images/user.png"
                  alt="John Doe"
                  fill
                  sizes="50px"
                  className="object-cover"
                />
              </div>
              <div className="font-light">
                <p className="font-medium text-white">John Doe</p>
                <p className="text-sm flex flex-wrap gap-2 pt-[2px]"><span className="text-gray-400">CEO</span> Quadbreak Studio</p>
                <div className="mt-2">
                {renderStars(5)}
              </div>
              </div>
            </div>


            <div>

              <p className="text-white/80 text-[14px] font-[200] ">
                Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a.
              </p>
            </div>
          </div>

        </div>
       
      </div>
    </section>
  );
};

export default ModernTestimonials2;