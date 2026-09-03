"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const services: ServiceItem[] = [
  {
    id: 1,
    title: "Custom Website Development",
    description:
      "Fully responsive and interactive websites built with modern technologies (HTML5, CSS3, JavaScript, React/Next.js, Shopify, Wordpress).",
    image: "/images/1.jpg",
  },
  {
    id: 2,
    title: "Landing Page Design",
    description:
      "High-converting, fast-loading landing pages tailored for marketing, product launches, or campaigns.",
 image: "/images/2.jpg",
  },
  {
    id: 3,
    title: "UI/UX Implementation",
    description:
      "Bring Figma/Adobe XD/Sketch designs to life with pixel-perfect accuracy and smooth animations.",
   image: "/images/3.jpg",
  },
  {
    id: 4,
    title: "Website Optimization",
    description:
      "Speed, SEO, and performance optimization (Lighthouse audit fixes, lazy loading, code minification, etc.)",
   image: "/images/1.jpg",
  },
  {
    id: 5,
    title: "Portfolio Websites",
    description:
      "Build personal or agency portfolios with creative animations and responsive layouts.",
   image: "/images/2.jpg",
  },
  {
    id: 6,
    title: "E-commerce Frontend",
    description:
      "Custom storefronts, Shopify/WooCommerce themes, and frontend integration for e-commerce platforms.",
   image: "/images/3.jpg",
  },
  {
    id: 7,
    title: "CMS Integration",
    description:
      "Frontend development for CMS platforms like Strapi, Sanity, WordPress REST API, or Contentful.",
   image: "/images/1.jpg",
  },
 
];

const ServiceGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      tl.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
      });

      gsap.from(
        cardsRef.current?.children || [],
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
            trigger: cardsRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-14 lg:py-24 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-6 pt-30">
        <div ref={titleRef} className="mb-8">
          <h2 className="uppercase text-white text-5xl lg:text-[6rem] leading-none font-light">
            Areas of
            <br />
            Expertise
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 md:mt-16"
        >
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative  border border-white/20 aspect-[1/.75] rounded-[8px]"
            >
              <div className=" overflow-hidden">
                <img
                src={service.image}
                alt={service.title}
                className=" w-full h-full object-cover group-hover:opacity-70 group-hover:scale-105 transition duration-700"
              />
                </div>

              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 transition duration-700" /> */}
              <div className="p-5 sm:p-8 flex flex-col justify-between gap-2">
                <div className="flex justify-between items-center gap-3">
                  <h3 className="uppercase md:text-2xl tracking-wide z-10 transition duration-500 group-hover:scale-105">
                    {service.title}
                  </h3>
                  <span className="absolute top-[20px] right-[20px] w-10 h-10 p-2 flex items-center justify-center rounded-full bg-[var(--green)] group-hover:bg-green group-hover:scale-80 transition-all duration-500 ease-in-out z-99 shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
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
                <p className="font-[200] text-white text-[14px] leading-snug">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
