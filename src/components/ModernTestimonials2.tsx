"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "./AnimatedButton";


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
            duration: 1,
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

        // Infinite floating animation for each card
        cards.forEach((card, index) => {
          // Set transform origin to center
          gsap.set(card, {
            transformOrigin: "center center",
          });

          // Create circular motion - each card moves in a full circle
          const startAngle = (index * 45) * (Math.PI / 180); // Different starting angles
          const radius = 20;
          const duration = 4 + (index % 3);
          
          // Different rotation for each card (10 degrees) with varied timing and direction
          const rotation = 4;
          const rotationDuration = 2 + (index % 4); // Different rotation timing for each card
          const rotationDirection = index % 2 === 0 ? 1 : -1; // Alternate rotation direction

          // Animate in a circular path with rotation using keyframes
          gsap.to(card, {
            keyframes: [
              { 
                x: Math.cos(startAngle) * radius, 
                y: Math.sin(startAngle) * radius, 
                rotation: rotation * rotationDirection,
                duration: duration / 4 
              },
              { 
                x: Math.cos(startAngle + Math.PI / 2) * radius, 
                y: Math.sin(startAngle + Math.PI / 2) * radius, 
                rotation: -rotation * rotationDirection,
                duration: duration / 4 
              },
              { 
                x: Math.cos(startAngle + Math.PI) * radius, 
                y: Math.sin(startAngle + Math.PI) * radius, 
                rotation: rotation * rotationDirection,
                duration: duration / 4 
              },
              { 
                x: Math.cos(startAngle + Math.PI * 1.5) * radius, 
                y: Math.sin(startAngle + Math.PI * 1.5) * radius, 
                rotation: -rotation * rotationDirection,
                duration: duration / 4 
              },
              { 
                x: Math.cos(startAngle + Math.PI * 2) * radius, 
                y: Math.sin(startAngle + Math.PI * 2) * radius, 
                rotation: rotation * rotationDirection,
                duration: 0 
              },
            ],
            ease: "sine.inOut",
            repeat: -1,
            delay: index * 0.3,
          });

          // Separate rotation animation with different timing and direction
          gsap.to(card, {
            rotation: `+=${4 * rotationDirection}`,
            duration: rotationDuration,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.2,
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
            className={`w-4 h-4 ${i < count ? 'text-yellow-400' : 'text-gray-500'}`}
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
    <section ref={sectionRef} className="py-20 relative overflow-hidden bg-[var(--background)]">
      <div className="max-w-[1360px] mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-white uppercase text-4xl lg:text-6xl leading-none font-light mb-4">
            Client Reviews
          </h2>
        </div>

        {/* Testimonials Grid - 12 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-10  gap-10">
          
          <div className="testimonial-card  col-span-1 md:col-span-3  rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md  transition-all duration-500 hover:-translate-y-2  p-6 flex flex-col gap-5">
            
           <div>
             
            <p className="text-white/60 text-sm mb-4 flex-1">
              Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a.
            </p>
           </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 relative rounded-full overflow-hidden">
                <Image
                  src="/images/user.png"
                  alt="John Doe"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">John Doe</p>
                <p className="text-xs text-gray-400">@JohnDoe • 12h</p>
              </div>
            </div>
              <div>
                {renderStars(5)}
              <span className="text-white/60 text-xs">(5.0) All Client Score</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card  col-span-1 md:col-span-4  rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md  transition-all duration-500 hover:-translate-y-2  p-6 flex flex-col gap-5">
            
           <div>
             
            <p className="text-white/60 text-sm mb-4 flex-1">
              Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a.
            </p>
           </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 relative rounded-full overflow-hidden">
                <Image
                  src="/images/user.png"
                  alt="John Doe"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">John Doe</p>
                <p className="text-xs text-gray-400">@JohnDoe • 12h</p>
              </div>
            </div>
              <div>
                {renderStars(5)}
              <span className="text-white/60 text-xs">(5.0) All Client Score</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card  col-span-1 md:col-span-3  rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md  transition-all duration-500 hover:-translate-y-2  p-6 flex flex-col gap-5">
            
           <div>
             
            <p className="text-white/60 text-sm mb-4 flex-1">
              Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a.
            </p>
           </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 relative rounded-full overflow-hidden">
                <Image
                  src="/images/user.png"
                  alt="John Doe"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">John Doe</p>
                <p className="text-xs text-gray-400">@JohnDoe • 12h</p>
              </div>
            </div>
              <div>
                {renderStars(5)}
              <span className="text-white/60 text-xs">(5.0) All Client Score</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card  col-span-1 md:col-span-4  rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md  transition-all duration-500 hover:-translate-y-2  p-6 flex flex-col gap-5">
            
           <div>
             
            <p className="text-white/60 text-sm mb-4 flex-1">
              Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a.
            </p>
           </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 relative rounded-full overflow-hidden">
                <Image
                  src="/images/user.png"
                  alt="John Doe"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">John Doe</p>
                <p className="text-xs text-gray-400">@JohnDoe • 12h</p>
              </div>
            </div>
              <div>
                {renderStars(5)}
              <span className="text-white/60 text-xs">(5.0) All Client Score</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card  col-span-1 md:col-span-3  rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md  transition-all duration-500 hover:-translate-y-2  p-6 flex flex-col gap-5">
            
           <div>
             
            <p className="text-white/60 text-sm mb-4 flex-1">
              Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a.
            </p>
           </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 relative rounded-full overflow-hidden">
                <Image
                  src="/images/user.png"
                  alt="John Doe"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">John Doe</p>
                <p className="text-xs text-gray-400">@JohnDoe • 12h</p>
              </div>
            </div>
              <div>
                {renderStars(5)}
              <span className="text-white/60 text-xs">(5.0) All Client Score</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card  col-span-1 md:col-span-3  rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md  transition-all duration-500 hover:-translate-y-2  p-6 flex flex-col gap-5">
            
           <div>
             
            <p className="text-white/60 text-sm mb-4 flex-1">
              Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a.
            </p>
           </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 relative rounded-full overflow-hidden">
                <Image
                  src="/images/user.png"
                  alt="John Doe"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">John Doe</p>
                <p className="text-xs text-gray-400">@JohnDoe • 12h</p>
              </div>
            </div>
              <div>
                {renderStars(5)}
              <span className="text-white/60 text-xs">(5.0) All Client Score</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card  col-span-1 md:col-span-3  rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md  transition-all duration-500 hover:-translate-y-2  p-6 flex flex-col gap-5">
            
           <div>
             
            <p className="text-white/60 text-sm mb-4 flex-1">
              Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a.
            </p>
           </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 relative rounded-full overflow-hidden">
                <Image
                  src="/images/user.png"
                  alt="John Doe"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">John Doe</p>
                <p className="text-xs text-gray-400">@JohnDoe • 12h</p>
              </div>
            </div>
              <div>
                {renderStars(5)}
              <span className="text-white/60 text-xs">(5.0) All Client Score</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card  col-span-1 md:col-span-3  rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md  transition-all duration-500 hover:-translate-y-2  p-6 flex flex-col gap-5">
            
           <div>
             
            <p className="text-white/60 text-sm mb-4 flex-1">
              Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a.
            </p>
           </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 relative rounded-full overflow-hidden">
                <Image
                  src="/images/user.png"
                  alt="John Doe"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">John Doe</p>
                <p className="text-xs text-gray-400">@JohnDoe • 12h</p>
              </div>
            </div>
              <div>
                {renderStars(5)}
              <span className="text-white/60 text-xs">(5.0) All Client Score</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card  col-span-1 md:col-span-4  rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md  transition-all duration-500 hover:-translate-y-2  p-6 flex flex-col gap-5">
            
           <div>
             
            <p className="text-white/60 text-sm mb-4 flex-1">
              Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a.
            </p>
           </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 relative rounded-full overflow-hidden">
                <Image
                  src="/images/user.png"
                  alt="John Doe"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">John Doe</p>
                <p className="text-xs text-gray-400">@JohnDoe • 12h</p>
              </div>
            </div>
              <div>
                {renderStars(5)}
              <span className="text-white/60 text-xs">(5.0) All Client Score</span>
              </div>
            </div>
          </div>
          


        </div>
        <div className="w-fit mx-auto mt-12">
              <AnimatedButton href="" label="Write a Review" className="w-fit" />
            </div>
      </div>
    </section>
  );
};

export default ModernTestimonials2;