"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "@/components/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

interface Category {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  services: string[];
  href: string;
  cta: string;
}

const categories: Category[] = [
  {
    number: "01",
    title: "QuadBreak Studio",
    subtitle: "Game Art & Production",
    description:
      "QuadBreak Studio brings game worlds to life through high-quality 3D assets, environments, characters, animation, VFX and cinematic content.",
    image: "/images/environments.png",
    services: [
      "3D Environment",
      "3D Characters",
      "Concept Art & 2D",
      "Animation & VFX",
      "Trailers & Cinematics",
    ],
    href: "/services",
    cta: "Explore Studio",
  },
  {
    number: "02",
    title: "QuadBreak Simulations",
    subtitle: "VR • Training • Simulation",
    description:
      "QuadBreak Simulations creates immersive environments and production-ready visual experiences for VR, training, simulation and interactive applications.",
    image: "/images/works/2.png",
    services: [
      "VR Experiences",
      "Training Simulation",
      "Simulator Environments",
      "Interactive 3D",
      "Visualization",
      "Digital Twins",
    ],
    href: "/services",
    cta: "Explore Simulations",
  },
  {
    number: "03",
    title: "QuadBreak Academy",
    subtitle: "Learn • Create • Build",
    description:
      "QuadBreak Academy focuses on practical, production-oriented education designed to help aspiring artists develop real-world 3D and game-art skills.",
    image: "/images/works/3.png",
    services: [
      "3D Art Training",
      "Game Art Courses",
      "Mentorship",
      "Workshops",
      "Portfolio Development",
      "Industry Training",
    ],
    href: "/services",
    cta: "Explore Academy",
  },
];

export default function Categories2() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const desktopWrapRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const mobileWrapRef = useRef<HTMLDivElement>(null);
  const centerMRef = useRef<HTMLDivElement>(null);
  const progressMRef = useRef<HTMLDivElement>(null);

  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const connectorRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const mNodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mConnectorRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mContentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mImageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setReduced(reduceMotion);
    if (reduceMotion) return;

    const mm = gsap.matchMedia();

    // ---------- Desktop: alternating zig-zag ----------
    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        const nodes = categories
          .map((_, i) => nodeRefs.current[i])
          .filter((n): n is HTMLSpanElement => !!n);
        const conns = categories
          .map((_, i) => connectorRefs.current[i])
          .filter((n): n is HTMLSpanElement => !!n);
        const panels = categories
          .map((_, i) => contentRefs.current[i])
          .filter((n): n is HTMLDivElement => !!n);

        gsap.set(nodes, { scale: 0.72, opacity: 0.5 });
        gsap.set(conns, { scaleX: 0 });

        const animsOf = (panel: HTMLDivElement) =>
          gsap.utils
            .toArray<HTMLElement>(".cat2-card .cat2-anim")
            .filter((el) => panel.contains(el));

        // Section entrance: intro + timeline + first category
        const eyebrow = eyebrowRef.current;
        const title = titleRef.current;
        const desc = descRef.current;
        const center = centerRef.current;
        if (eyebrow && title && desc && center && panels[0] && nodes[0] && conns[0]) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                once: true,
              },
              defaults: { ease: "power3.out" },
            })
            .from(eyebrow, { opacity: 0, y: 40, duration: 0.8 })
            .from(title, { opacity: 0, y: 40, duration: 0.8 }, "-=0.55")
            .from(desc, { opacity: 0, y: 40, duration: 0.8 }, "-=0.55")
            .fromTo(
              center,
              { opacity: 0 },
              { opacity: 1, duration: 1, ease: "power2.inOut" },
              "-=0.5",
            )
            .fromTo(
              panels[0],
              { x: -60, opacity: 0, y: 20 },
              { x: 0, opacity: 1, y: 0, duration: 1 },
              "-=0.6",
            )
            .fromTo(
              conns[0],
              { scaleX: 0 },
              { scaleX: 1, duration: 0.7 },
              "-=0.55",
            )
            .fromTo(
              nodes[0],
              { scale: 0.7, opacity: 0.5 },
              { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
              "-=0.6",
            )
            .add(() => {
              nodes[0]?.classList.add("is-active");
              conns[0]?.classList.add("is-active");
            })
            .fromTo(
              animsOf(panels[0]),
              { opacity: 0, y: 26 },
              { opacity: 1, y: 0, duration: 0.65, stagger: 0.08 },
              "-=0.5",
            );
        }

        // Steps 2 + 3 reveal as they enter viewport
        for (let i = 1; i < categories.length; i++) {
          const panel = panels[i];
          const conn = conns[i];
          const node = nodes[i];
          if (!panel || !conn || !node) continue;
          const sideX = i % 2 === 1 ? 60 : -60;

          gsap
            .timeline({
              scrollTrigger: {
                trigger: panel,
                start: "top 88%",
                once: true,
              },
              defaults: { ease: "power3.out" },
            })
            .fromTo(
              panel,
              { x: sideX, opacity: 0, y: 20 },
              { x: 0, opacity: 1, y: 0, duration: 1 },
              0,
            )
            .fromTo(conn, { scaleX: 0 }, { scaleX: 1, duration: 0.7 }, "-=0.5")
            .fromTo(
              node,
              { scale: 0.7, opacity: 0.5 },
              { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
              "-=0.6",
            )
            .add(() => {
              node?.classList.add("is-active");
              conn?.classList.add("is-active");
            }, "<")
            .fromTo(
              animsOf(panel),
              { opacity: 0, y: 26 },
              { opacity: 1, y: 0, duration: 0.65, stagger: 0.08 },
              "-=0.5",
            );
        }

        // Timeline progress: fills top → bottom as user scrolls
        if (progressRef.current && desktopWrapRef.current) {
          gsap.fromTo(
            progressRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: desktopWrapRef.current,
                start: "top 55%",
                end: "bottom 35%",
                scrub: 0.6,
              },
            },
          );
        }

        // Active emphasis: the step currently scrolled into view is strong,
        // the others stay muted.
        const setActive = (i: number) => {
          nodes.forEach((n, idx) => {
            if (!n) return;
            n.classList.toggle("is-active", idx === i);
            gsap.to(n, {
              scale: idx === i ? 1 : 0.72,
              opacity: idx === i ? 1 : 0.55,
              duration: 0.5,
              overwrite: "auto",
            });
          });
          conns.forEach((c, idx) => {
            c?.classList.toggle("is-active", idx === i);
          });
          panels.forEach((p, idx) => {
            if (!p) return;
            gsap.to(p, {
              opacity: idx === i ? 1 : 0.55,
              duration: 0.5,
              overwrite: "auto",
            });
          });
        };

        panels.forEach((panel, i) => {
          if (!panel) return;
          ScrollTrigger.create({
            trigger: panel,
            start: "top 55%",
            end: "bottom 35%",
            onEnter: () => setActive(i),
            onEnterBack: () => setActive(i),
          });
        });
      }, section);

      return () => ctx.revert();
    });

    // ---------- Mobile / tablet: single left rail ----------
    mm.add("(max-width: 1023.98px)", () => {
      const ctx = gsap.context(() => {
        const nodes = categories
          .map((_, i) => mNodeRefs.current[i])
          .filter((n): n is HTMLSpanElement => !!n);
        const conns = categories
          .map((_, i) => mConnectorRefs.current[i])
          .filter((n): n is HTMLSpanElement => !!n);
        const panels = categories
          .map((_, i) => mContentRefs.current[i])
          .filter((n): n is HTMLDivElement => !!n);

        gsap.set(nodes, { scale: 0.72, opacity: 0.5 });
        gsap.set(conns, { scaleX: 0 });

        const animsOf = (panel: HTMLDivElement) =>
          gsap.utils
            .toArray<HTMLElement>(".cat2-mcard .cat2-m-anim")
            .filter((el) => panel.contains(el));

        const eyebrow = eyebrowRef.current;
        const title = titleRef.current;
        const desc = descRef.current;
        const center = centerMRef.current;
        if (eyebrow && title && desc && center) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                once: true,
              },
              defaults: { ease: "power3.out" },
            })
            .from(eyebrow, { opacity: 0, y: 40, duration: 0.8 })
            .from(title, { opacity: 0, y: 40, duration: 0.8 }, "-=0.55")
            .from(desc, { opacity: 0, y: 40, duration: 0.8 }, "-=0.55")
            .fromTo(
              center,
              { opacity: 0 },
              { opacity: 1, duration: 1, ease: "power2.inOut" },
              "-=0.5",
            );
        }

        for (let i = 0; i < categories.length; i++) {
          const panel = panels[i];
          const conn = conns[i];
          const node = nodes[i];
          if (!panel || !conn || !node) continue;

          gsap
            .timeline({
              scrollTrigger: {
                trigger: panel,
                start: "top 92%",
                once: true,
              },
              defaults: { ease: "power3.out" },
            })
            .fromTo(
              panel,
              { x: 24, opacity: 0, y: 40 },
              { x: 0, opacity: 1, y: 0, duration: 0.9 },
              0,
            )
            .fromTo(conn, { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, "-=0.4")
            .fromTo(
              node,
              { scale: 0.7, opacity: 0.5 },
              { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.6)" },
              "-=0.5",
            )
            .add(() => {
              node?.classList.add("is-active");
              conn?.classList.add("is-active");
            }, "<")
            .fromTo(
              animsOf(panel),
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 },
              "-=0.45",
            );
        }

        if (progressMRef.current && mobileWrapRef.current) {
          gsap.fromTo(
            progressMRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: mobileWrapRef.current,
                start: "top 55%",
                end: "bottom 35%",
                scrub: 0.6,
              },
            },
          );
        }
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  const steps = (mobile: boolean) =>
    categories.map((cat, i) => {
      const side = i % 2 === 0 ? "left" : "right";
      const animClass = mobile ? "cat2-m-anim" : "cat2-anim";

      const card = (
        <div className={mobile ? "cat2-mcard" : "cat2-card"}>
          <span className={`cat2-num ${animClass}`}>{cat.number}</span>
          <h3 className={`cat2-s-title ${animClass}`}>{cat.title}</h3>
          <p className={`cat2-s-sub ${animClass}`}>{cat.subtitle}</p>
          <p className={`cat2-s-desc ${animClass}`}>{cat.description}</p>
          <div
            ref={(el) => {
              (mobile ? mImageRefs : imageRefs).current[i] = el;
            }}
            className={`cat2-s-img group ${animClass}`}
          >
            <Image
              src={cat.image}
              alt={`${cat.title} — ${cat.subtitle}`}
              fill
              sizes={mobile ? "92vw" : "42vw"}
              priority={i === 0}
              className="object-cover transition-transform duration-[0.7s] ease-out group-hover:scale-[1.04]"
            />
            <div
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/55 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
          <ul className={`cat2-s-services ${animClass}`}>
            {cat.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <div className={`cat2-s-cta ${animClass}`}>
            <AnimatedButton href={cat.href} label={cat.cta} />
          </div>
        </div>
      );

      if (mobile) {
        return (
          <article key={cat.number} className="cat2-mstep">
            <span
              ref={(el) => {
                mNodeRefs.current[i] = el;
              }}
              className="cat2-mnode"
            >
              {cat.number}
            </span>
            <span
              ref={(el) => {
                mConnectorRefs.current[i] = el;
              }}
              className="cat2-mconnector"
              aria-hidden="true"
            />
            <div
              ref={(el) => {
                mContentRefs.current[i] = el;
              }}
            >
              {card}
            </div>
          </article>
        );
      }

      return (
        <article key={cat.number} className="cat2-step">
          <span
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            className="cat2-node"
          >
            {cat.number}
          </span>
          <span
            ref={(el) => {
              connectorRefs.current[i] = el;
            }}
            className={`cat2-connector cat2-connector--${side}`}
            aria-hidden="true"
          />
          <div
            ref={(el) => {
              contentRefs.current[i] = el;
            }}
            className={`cat2-panel cat2-panel--${side}`}
          >
            {card}
          </div>
        </article>
      );
    });

  return (
    <section
      ref={sectionRef}
      id="categories2"
      className="categories2 relative overflow-hidden"
      data-reduced={reduced}
    >
      <div className="mx-auto max-w-[1360px] px-5 lg:px-10">
        <div className="cat2-intro">
          <p ref={eyebrowRef} className="cat2-eyebrow">
            Our World
          </p>
          <h2 ref={titleRef} className="cat2-title">
            Three Worlds.
            <br />
            <span>One Creative Vision.</span>
          </h2>
          <p ref={descRef} className="cat2-desc">
            QuadBreak brings together game art, immersive simulation and
            industry-focused education under one creative ecosystem.
          </p>
        </div>

        {/* Desktop zig-zag */}
        <div ref={desktopWrapRef} className="cat2-roadmap hidden lg:block">
          <div ref={centerRef} className="cat2-line cat2-line--center" aria-hidden="true">
            <span className="cat2-line-track" />
            <span ref={progressRef} className="cat2-line-fill" />
          </div>
          {steps(false)}
        </div>

        {/* Mobile / tablet left rail */}
        <div ref={mobileWrapRef} className="cat2-roadmap-mobile lg:hidden">
          <div ref={centerMRef} className="cat2-line cat2-line--mobile" aria-hidden="true">
            <span className="cat2-line-track" />
            <span ref={progressMRef} className="cat2-line-fill" />
          </div>
          {steps(true)}
        </div>
      </div>
    </section>
  );
}