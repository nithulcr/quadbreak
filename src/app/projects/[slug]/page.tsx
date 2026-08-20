"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedButton from "@/components/AnimatedButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  tech: string;
  description?: string;
  shortDescription?: string;

  slug?: string;
  url?: string;
  image?: { url?: string };
  projectBanner?: { url?: string };
  projectGallery?: { url?: string }[];
}

const staticProjects: Project[] = [
  {
    id: 1,
    title: "Desert Storm",
    category: "3D Vehicles",
    tech: "Blender, Substance Painter, Unreal Engine",
    shortDescription: "High-poly military vehicle modeled and textured for a AAA desert combat game. The project involved creating accurate mechanical details, weathering effects, and material definition for realistic in-engine rendering.",
    description: "High-poly military vehicle modeled and textured for a AAA desert combat game. The project involved creating accurate mechanical details, weathering effects, and material definition for realistic in-engine rendering. High-poly military vehicle modeled and textured for a AAA desert combat game. The project involved creating accurate mechanical details, weathering effects, and material definition for realistic in-engine rendering.",

    slug: "desert-storm",
    image: { url: "/images/works/1.png" },
    projectBanner: { url: "/images/3.jpg" },
    projectGallery: [{ url: "/images/works/3.png" }],
  },
  {
    id: 2,
    title: "Neon Arsenal",
    category: "Weapons",
    tech: "Maya, ZBrush, Quixel Mixer",
 shortDescription: "High-poly military vehicle modeled and textured for a AAA desert combat game. The project involved creating accurate mechanical details, weathering effects, and material definition for realistic in-engine rendering.",
    description: "High-poly military vehicle modeled and textured for a AAA desert combat game. The project involved creating accurate mechanical details, weathering effects, and material definition for realistic in-engine rendering. High-poly military vehicle modeled and textured for a AAA desert combat game. The project involved creating accurate mechanical details, weathering effects, and material definition for realistic in-engine rendering.",
    slug: "neon-arsenal",
    image: { url: "/images/works/2.png" },
    projectBanner: { url: "/images/3.jpg" },
    projectGallery: [{ url: "/images/works/4.png" }],
  },
  {
    id: 3,
    title: "Arctic Outpost",
    category: "3D Environment",
    tech: "Unreal Engine 5, SpeedTree, Substance",
 shortDescription: "High-poly military vehicle modeled and textured for a AAA desert combat game. The project involved creating accurate mechanical details, weathering effects, and material definition for realistic in-engine rendering.",
    description: "High-poly military vehicle modeled and textured for a AAA desert combat game. The project involved creating accurate mechanical details, weathering effects, and material definition for realistic in-engine rendering. High-poly military vehicle modeled and textured for a AAA desert combat game. The project involved creating accurate mechanical details, weathering effects, and material definition for realistic in-engine rendering.",
    slug: "arctic-outpost",
    image: { url: "/images/works/3.png" },
    projectBanner: { url: "/images/3.jpg" },
    projectGallery: [{ url: "/images/works/5.png" }],
  },
  {
    id: 4,
    title: "Jungle Canopy",
    category: "Vegetation",
    tech: "SpeedTree, Blender, UE5",
 shortDescription: "High-poly military vehicle modeled and textured for a AAA desert combat game. The project involved creating accurate mechanical details, weathering effects, and material definition for realistic in-engine rendering.",
    description: "High-poly military vehicle modeled and textured for a AAA desert combat game. The project involved creating accurate mechanical details, weathering effects, and material definition for realistic in-engine rendering. High-poly military vehicle modeled and textured for a AAA desert combat game. The project involved creating accurate mechanical details, weathering effects, and material definition for realistic in-engine rendering.",
    slug: "jungle-canopy",
    image: { url: "/images/works/4.png" },
    projectBanner: { url: "/images/3.jpg" },
    projectGallery: [{ url: "/images/works/6.jpeg" }],
  },
  {
    id: 5,
    title: "Rust & Ruin",
    category: "Props",
    tech: "Blender, Substance Painter",
 shortDescription: "High-poly military vehicle modeled and textured for a AAA desert combat game. The project involved creating accurate mechanical details, weathering effects, and material definition for realistic in-engine rendering.",
    description: "High-poly military vehicle modeled and textured for a AAA desert combat game. The project involved creating accurate mechanical details, weathering effects, and material definition for realistic in-engine rendering. High-poly military vehicle modeled and textured for a AAA desert combat game. The project involved creating accurate mechanical details, weathering effects, and material definition for realistic in-engine rendering.",
    slug: "rust-ruin",
    image: { url: "/images/works/5.png" },
    projectBanner: { url: "/images/3.jpg" },
    projectGallery: [{ url: "/images/works/1.png" }],
  },
  {
    id: 6,
    title: "Fantasy Realm",
    category: "Stylized Art",
    tech: "Blender, Photoshop, Unity",
 shortDescription: "High-poly military vehicle modeled and textured for a AAA desert combat game. The project involved creating accurate mechanical details, weathering effects, and material definition for realistic in-engine rendering.",
    description: "High-poly military vehicle modeled and textured for a AAA desert combat game. The project involved creating accurate mechanical details, weathering effects, and material definition for realistic in-engine rendering. High-poly military vehicle modeled and textured for a AAA desert combat game. The project involved creating accurate mechanical details, weathering effects, and material definition for realistic in-engine rendering.",
    slug: "fantasy-realm",
    image: { url: "/images/works/6.jpeg" },
    projectBanner: { url: "/images/3.jpg" },
    projectGallery: [{ url: "/images/works/2.png" }],
  },
];

export default function ProjectDetail() {
  const params = useParams();
  const slug = params?.slug as string;

  const project = staticProjects.find((p) => p.slug === slug) || null;
  const allProjects = staticProjects;

  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const relatedHeaderRef = useRef<HTMLDivElement>(null);
  const relatedGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.from(heroRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
      }).from(
        infoRef.current,
        { opacity: 0, y: 30, duration: 0.7, ease: "power2.out" },
        "-=0.45",
      );

      if (galleryRef.current) {
        gsap.from(galleryRef.current, {
          opacity: 0,
          y: 60,
          scale: 0.96,
          duration: 0.9,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }

      if (relatedGridRef.current && relatedGridRef.current.children.length > 0) {
        tl.from(relatedHeaderRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "power2.out",
        }, "-=0.3");

        gsap.from(relatedGridRef.current.children, {
          opacity: 0,
          y: 60,
          scale: 0.96,
          duration: 0.9,
          stagger: { each: 0.12, from: "start" },
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: relatedGridRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [project]);

  const relatedProjects = allProjects
    .filter((p) => p.id !== project?.id)
    .slice(0, 3);

  if (!project) {
    return (
      <div>
        <Header />
        <main className="min-h-screen flex flex-col items-center justify-center gap-6">
          <h1 className="text-white text-4xl font-light">Project Not Found</h1>
          <AnimatedButton href="/projects" label="Back to Portfolio" className="w-fit" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main>
        <section ref={sectionRef}>
          <div>
            {/* Hero Banner */}
            <div ref={heroRef} className="relative">
              <div className="w-full h-[60vh] lg:h-[70vh] relative">
                <Image
                  src={project.projectBanner?.url || project.image?.url || "/images/bg-banner.jpg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
              <div className="max-w-[1400px] mx-auto px-5 w-full absolute bottom-0 left-0 right-0 pb-12 lg:pb-20">
                <h1 className="uppercase text-white text-4xl lg:text-[5rem] leading-none font-light mb-6">
                  {project.title}
                </h1>
                <p className="text-white/80 text-[14px] lg:text-[18px] leading-relaxed font-[200] max-w-[600px]">
                  {project.shortDescription || `A ${project.title} project built with ${project.tech}.`}
                </p>
              </div>
            </div>

            {/* Project Info */}
            <div ref={infoRef} className="max-w-[1400px] mx-auto px-5 py-14 lg:py-24 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-20">
              <div className="lg:col-span-2">
                <h2 className="uppercase text-white text-3xl lg:text-[3rem] leading-none font-light mb-6">
                  About This Project
                </h2>
                <p className="text-white/80 text-[14px] lg:text-[18px] leading-relaxed font-[200] max-w-[800px]">
                  {project.description || `A ${project.title} project built with ${project.tech}. Showcasing our expertise in ${project.category} for modern games and interactive experiences.`}
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-white/40 text-xs uppercase tracking-[3px] mb-2">Category</h3>
                  <p className="text-white text-lg font-light">{project.category}</p>
                </div>
                <div>
                  <h3 className="text-white/40 text-xs uppercase tracking-[3px] mb-2">Technologies</h3>
                  <p className="text-white text-lg font-light">{project.tech}</p>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  {project.url && (
                    <AnimatedButton href={project.url} label="View Live" className="w-fit" />
                  )}
                  <AnimatedButton href="/projects" label="All Projects" className="w-fit" />
                </div>
              </div>
            </div>

            {/* Gallery Images */}
            <div ref={galleryRef} className="max-w-[1400px] mx-auto px-5 pb-12 lg:pb-20 grid md:grid-cols-2 lg:grid-cols-2 gap-6 ">
              {project.image?.url && (
                <div className="w-full aspect-[16/7] relative overflow-hidden rounded-[8px]">
                  <Image
                    src={project.image.url}
                    alt={`${project.title} image`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {project.projectGallery?.map((galleryItem, index) => (
                <div key={index} className="w-full aspect-[16/7] relative overflow-hidden rounded-[8px]">
                  <Image
                    src={galleryItem.url || "/images/seo.jpg"}
                    alt={`${project.title} gallery ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-16 lg:py-24">
            <div className="max-w-[1400px] mx-auto px-5">
              <div ref={relatedHeaderRef} className="mb-10 lg:mb-16 w-fit">
                <h2 className="uppercase text-white heading text-5xl lg:text-[5rem] leading-none font-light">
                  More Works
                </h2>
              </div>

              <div ref={relatedGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((rp, index) => (
                  <Link
                    key={rp.id}
                    href={`/projects/${rp.slug}`}
                    className="text-white block"
                  >
                    <div className="about-card group relative top-0 aspect-[1/1.2] overflow-hidden transition-[top,box-shadow] duration-500 ease-out hover:top-[-10px]">
                      <img
                        src={rp.image?.url || "/images/seo.jpg"}
                        alt={rp.title}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading={index < 3 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                      <div className="absolute top-6 left-6 z-20 transition-all duration-500 ease-out group-hover:top-[-100px]">
                        <span className="bg-[var(--green)] text-black text-xs font-[600] uppercase tracking-wider px-4 py-2">
                          {rp.title}
                        </span>
                      </div>
                      <div className="absolute bottom-[-200px] group-hover:bottom-0 left-0 z-20 transition-all duration-500 ease-out bg-gradient-to-t from-black/80 via-black/40 w-full p-6">
                        <h5 className="font-light text-xl uppercase tracking-wider relative top-0 group-hover:top-[-20px] transition-all duration-500 ease-out">
                          {rp.title}
                        </h5>
                        <p className="font-[200] text-[14px] max-w-[260px]">
                          {rp.tech}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
