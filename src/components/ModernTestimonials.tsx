"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ModernTestimonials = () => {
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
      <div className="max-w-[1400px] mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-white uppercase text-4xl lg:text-6xl leading-none font-light mb-4">
            Client Reviews
          </h2>
        </div>

        {/* Testimonials Grid - 12 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 auto-rows-[110px] gap-5">
          
          {/* Card 1 - Large testimonial with image - col-span-2, row-span-3 */}
          <div className="testimonial-card lg:mb-8 col-span-1 md:col-span-2 lg:col-span-2 row-span-3 rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md hover:border-[var(--green)] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(145,255,106,.15)] p-6 flex flex-col relative overflow-hidden">
           
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 relative rounded-full overflow-hidden">
                <Image
                  src="/images/user.png"
                  alt="Sarah & Robert"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Sarah & Robert</p>
                <p className="text-xs text-gray-400">Game Studio</p>
              </div>
            </div>
            <p className="text-white  font-light mb-2">Highly satisfied with my purchase, thank you! Highly satisfied with my purchase, thank you!</p>
            <div className="mt-auto">
              {renderStars(5)}
              <p className="text-white/60 font-light text-xs mt-2">Fast delivery. Perfect quality. Great service.</p>
            </div>
          </div>

          {/* Card 2 - Rating badge - col-span-4, row-span-1 */}
          <div className="testimonial-card col-span-1 md:col-span-3 lg:col-span-4 row-span-1 rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md hover:border-[var(--green)] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(145,255,106,.15)] p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {renderStars(5)}
              </div>
              <div>
                <p className="text-white font-semibold text-lg">5.0/5.0</p>
                <p className="text-white/60 text-xs">Average Rating</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white text-2xl font-bold">2,847</p>
              <p className="text-white/60 text-xs">Total Reviews</p>
            </div>
          </div>

          {/* Card 3 - Service rating - col-span-3, row-span-1 */}
          <div className="testimonial-card col-span-1 md:col-span-3 lg:col-span-3 row-span-1 rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md hover:border-[var(--green)] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(145,255,106,.15)] p-5 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white text-lg font-semibold">Service Rating</h3>
              <span className="bg-[var(--green)] text-black text-xs font-bold px-3 py-1 rounded-full">99+</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {renderStars(5)}
              </div>
              <span className="text-white/60 text-sm">(5/5) from 4,119 customers</span>
            </div>
          </div>

          {/* Card 4 - Quote testimonial - col-span-3, row-span-2 */}
          <div className="testimonial-card col-span-1 md:col-span-3 lg:col-span-3 row-span-2 rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md hover:border-[var(--green)] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(145,255,106,.15)] p-6 flex flex-col">
            <p className="text-white/60 text-sm italic mb-4 flex-1">
              "I received the product quickly and it was well packaged to ensure its safe arrival. I appreciate the care they took in packaging."
            </p>
            <div className="flex items-center gap-3 mt-auto">
              <div className="w-10 h-10 relative rounded-full overflow-hidden">
                <Image
                  src="/images/user.png"
                  alt="Fiona Donnelly"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Fiona Donnelly</p>
                <p className="text-xs text-gray-400">Art Director</p>
              </div>
            </div>
          </div>

          {/* Card 5 - Large testimonial with stats - col-span-5, row-span-2 */}
          <div className="testimonial-card col-span-1 md:col-span-3 lg:col-span-5 row-span-2 rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md hover:border-[var(--green)] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(145,255,106,.15)] p-6 flex flex-col relative overflow-hidden">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 relative rounded-full overflow-hidden flex-none">
                <Image
                  src="/images/user.png"
                  alt="Matthew Smith"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-white text-4xl font-light mb-2">Prompt and helpful responses to my inquiry!</h3>
                <p className="text-white/60 text-sm">Superb quality, impressed with the results</p>
              </div>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">Matthew Smith</p>
                <p className="text-white/60 text-xs">CEO of OptimaSphere Inc.</p>
              </div>
              <div className="flex gap-1">
                {renderStars(5)}
              </div>
            </div>
          </div>

          {/* Card 6 - Small testimonial - col-span-2, row-span-1 */}
          <div className="testimonial-card col-span-1 md:col-span-3 lg:col-span-2 row-span-1 rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md hover:border-[var(--green)] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(145,255,106,.15)] p-5 flex flex-col justify-center">
            <p className="text-white text-sm mb-2">Incredible service</p>
            <p className="text-white/60 text-xs">Perfect, exceeded expectations</p>
            <div className="flex gap-1 mt-2">
              {renderStars(5)}
            </div>
          </div>

          {/* Card 7 - Large testimonial with image - col-span-3, row-span-3 */}
          <div className="testimonial-card col-span-1 md:col-span-3 lg:col-span-3 row-span-3 rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md hover:border-[var(--green)] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(145,255,106,.15)] p-6 flex flex-col relative overflow-hidden">
            <div className="relative w-full h-40 mb-4 rounded-[20px] overflow-hidden">
              <Image
                src="/images/user.png"
                alt="Professional working"
                fill
                className="object-cover rounded-[20px]"
              />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 relative rounded-full overflow-hidden">
                <Image
                  src="/images/user.png"
                  alt="Emily Johnson"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Emily Johnson</p>
                <p className="text-xs text-gray-400">Product Designer</p>
              </div>
            </div>
            <h3 className="text-white text-2xl font-light mb-2">Incredible service</h3>
            <p className="text-white/60 text-sm mb-3">Perfect, exceeded expectations</p>
            <div className="mt-auto">
              {renderStars(5)}
            </div>
          </div>

          {/* Card 8 - Feedback slider - col-span-4, row-span-1 */}
          <div className="testimonial-card col-span-1 md:col-span-3 lg:col-span-4 row-span-1 rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md hover:border-[var(--green)] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(145,255,106,.15)] p-5 flex items-center justify-between">
            <div>
              <h3 className="text-white text-lg font-semibold mb-1">Your Feedback</h3>
              <p className="text-white/60 text-xs">We value your opinion</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full border-4 border-[var(--green)] flex items-center justify-center">
                <span className="text-white text-xl font-bold">100</span>
              </div>
            </div>
          </div>

          {/* Card 9 - Review counter - col-span-2, row-span-1 */}
          <div className="testimonial-card col-span-1 md:col-span-3 lg:col-span-2 row-span-1 rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md hover:border-[var(--green)] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(145,255,106,.15)] p-5 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-[var(--green)]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              <span className="text-white font-semibold">1,914</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              <span className="text-white/60 text-sm">21.7K views</span>
            </div>
          </div>

          {/* Card 10 - Great offers - col-span-3, row-span-3 */}
          <div className="testimonial-card col-span-1 md:col-span-3 lg:col-span-3 row-span-3 rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md hover:border-[var(--green)] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(145,255,106,.15)] p-6 flex flex-col">
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
            <h3 className="text-white text-3xl font-light mb-3">Great offers</h3>
            <p className="text-white/60 text-sm mb-4 flex-1">
              Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Hendrerit dolor magna, eget est lorem ipsum a. Nisl suscipit adipiscing bibendum est.
            </p>
            <div className="flex items-center justify-between mt-auto">
              {renderStars(5)}
              <span className="text-white/60 text-xs">(5.0) All Client Score</span>
            </div>
          </div>

          {/* Card 11 - Amazing product - col-span-4, row-span-1 */}
          <div className="testimonial-card col-span-1 md:col-span-3 lg:col-span-4 row-span-1 rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md hover:border-[var(--green)] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(145,255,106,.15)] p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 relative rounded-full overflow-hidden">
                <Image
                  src="/images/user.png"
                  alt="Michael Chen"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-white text-xl font-semibold">Amazing Product!</h3>
                <p className="text-white/60 text-xs">When it comes to quality, this product is top-notch.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-[var(--green)]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
                <span className="text-white text-sm">1,914</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                <span className="text-white/60 text-sm">21.7K</span>
              </div>
            </div>
          </div>

          {/* Card 12 - Small testimonial - col-span-2, row-span-1 */}
          <div className="testimonial-card col-span-1 md:col-span-3 lg:col-span-2 row-span-1 rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md hover:border-[var(--green)] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(145,255,106,.15)] p-5 flex flex-col justify-center">
            <p className="text-white text-sm mb-2">Id interdum velit laoreet id. Leo duis ut diam quam nulla porttitor massa.</p>
            <div className="flex items-center gap-2 mt-auto">
              <div className="w-8 h-8 relative rounded-full overflow-hidden">
                <Image
                  src="/images/user.png"
                  alt="Elizabeth Jones"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-white text-xs">Elizabeth Jones</p>
                <p className="text-xs text-gray-400">Sales Director</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ModernTestimonials;