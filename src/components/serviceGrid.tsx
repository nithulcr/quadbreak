"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface WorkStep {
  id: number;
  title: string;
  description: string;
  image: string;
}

const steps: WorkStep[] = [
  {
    id: 1,
    title: "Custom Website Development",
    description:
      "Fully responsive and interactive websites built with modern technologies (HTML5, CSS3, JavaScript, React/Next.js, Shopify, Wordpress).",
    image: "/images/work7.png",
  },
  {
    id: 2,
    title: "Landing Page Design",
    description:
      "High-converting, fast-loading landing pages tailored for marketing, product launches, or campaigns.",
    image: "/images/app.png",
  },
  {
    id: 3,
    title: "UI/UX Implementation",
    description:
      "Bring Figma/Adobe XD/Sketch designs to life with pixel-perfect accuracy and smooth animations.",
    image: "/images/figma.jpg",
  },
  {
    id: 4,
    title: "Website Optimization",
    description:
      "Speed, SEO, and performance optimization (Lighthouse audit fixes, lazy loading, code minification, etc.)",
    image: "/images/ecommerce.jpg",
  },
  {
    id: 5,
    title: "E-commerce Frontend",
    description:
      "Build personal or agency portfolios with creative animations and responsive layouts.",
    image: "/images/seo.jpg",
  },
  {
    id: 6,
    title: "E-commerce Frontend",
    description:
      "Custom storefronts, Shopify/WooCommerce themes, and frontend integration for e-commerce platforms.",
    image: "/images/cloud.jpg",
  },
  {
    id: 7,
    title: "CMS Integration (Frontend)",
    description:
      "Frontend development for CMS platforms like Strapi, Sanity, WordPress REST API, or Contentful.",
    image: "/images/brand1.jpg",
  },
  {
    id: 8,
    title: "Animations & Microinteractions",
    description:
      "GSAP, ScrollTrigger, Framer Motion, and other modern animation libraries for engaging UI effects.",
    image: "/images/brand2.jpg",
  },
  {
    id: 9,
    title: "Single Page Applications (SPA)",
    description:
      "React, Next.js or Vue-based SPAs with smooth routing and API integrations.",
    image: "/images/video-editing.jpg",
  },
  {
    id: 10,
    title: "Mobile-Responsive Design",
    description:
      "Full mobile-first development to ensure your site looks and works great on all devices.",
    image: "/images/video-editing.jpg",
  },
  {
    id: 11,
    title: "Frontend Bug Fixing / Maintenance",
    description:
      "Fix layout issues, JavaScript bugs, or broken responsiveness on existing websites.",
    image: "/images/video-editing.jpg",
  },
  {
    id: 12,
    title: "Code Refactoring / Migration",
    description:
      "Convert legacy code (HTML/JS/CSS) to modern stack (React, Tailwind CSS, Next.js, etc.).",
    image: "/images/video-editing.jpg",
  },
  {
    id: 13,
    title: "WordPress Frontend Development",
    description:
      "Custom WordPress themes (from scratch or based on starter themes like Underscores or Hello Elementor)",
    image: "/images/video-editing.jpg",
  },
  {
    id: 14,
    title: "Domain Setup and Hosting",
    description:
      "Free Hosting Setup (Render, Vercel, Netlify, Railway — based on project stack), Domain Setup & Connection (GoDaddy, Namecheap, etc.)",
    image: "/images/video-editing.jpg",
  },
  {
    id: 15,
    title: "Graphic Designing",
    description:
      "Custom logo design, Poster Design, etc... that reflects your company values and creates a strong first impression.",
    image: "/images/logo-design.jpg",
  },
  
];

const serviceGrid = () => {
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
    <section ref={sectionRef} className="max-w-[1450px] mx-auto py-20 px-5 flex flex-col items-center relative serviceGrid">
      <div ref={titleRef} className="uppercase text-[11px] tracking-[4px] mb-16 text-center">
        Areas of expertise
      </div>

      <div ref={cardsRef} className="flex flex-col gap-10">
        {steps.map((step) => (
          <div
            key={step.id}
            className="grid  items-center gap-8 backdrop-blur-[10px] bg-[linear-gradient(90deg,#ff000814,#004a891a)] rounded-[30px] sm:p-10 p-5 card"
          >
            <div className="d-flex flex-column content-end lg:col-span-2">
              <div className="flex items-center gap-5">
                <span className="md:text-7xl sm:text-4xl text-3xl font-bold text-[var(--white)] mb-4">
                {step.id}
              </span>
              <h5 className="md:text-3xl text-2xl font-semibold mb-4 mt-3">
                {step.title}
              </h5>
                </div>
              <p className="sm:text-md text-sm text-gray-400 sm:leading-[24px]">
                {step.description}
              </p>
            </div>

            {/* <div>
              <Image
                src={step.image}
                alt={step.title}
                width={640}
                height={360}
                className="rounded-[20px] aspect-video object-cover"
              />
            </div> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default serviceGrid;
