
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SLIDE_INTERVAL = 2500;

const SLIDES = [
  { src: "/images/slides/1.png" },
  { src: "/images/slides/2.png" },
  { src: "/images/slides/3.png" },
  { src: "/images/slides/4.png" },
  { src: "/images/slides/5.png" },
];

type SlideTransition = {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  duration: number;
  ease: string;
};

const FADE_TRANSITION: SlideTransition = {
  from: { autoAlpha: 0, scale: 1 },
  to: { autoAlpha: 1, scale: 0.9 },
  duration: 0.9,
  ease: "power3.out",
};

// Use the same crossfade transition for every slide.
const SLIDE_TRANSITIONS: SlideTransition[] = SLIDES.map(
  () => FADE_TRANSITION
);

const ArtworkSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const goToRef = useRef<(index: number) => void>(() => {});

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const slides = slideRefs.current.filter(
      (slide): slide is HTMLDivElement => slide !== null
    );

    if (slides.length === 0) return;

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const reducedMotion = { current: motionQuery.matches };
    const activeIndexRef = { current: 0 };
    const isAnimating = { current: false };

    const loadedImages = imageRefs.current.filter(
      (image): image is HTMLDivElement => image !== null
    );

    let autoplayTimer: number | undefined;
    let inView = false;
    let timeline: gsap.core.Timeline | null = null;

    const clearAutoplay = () => {
      if (autoplayTimer !== undefined) {
        window.clearTimeout(autoplayTimer);
        autoplayTimer = undefined;
      }
    };

    const startKenBurns = (index: number) => {
      const image = imageRefs.current[index];

      if (!image || reducedMotion.current) return;

      gsap.killTweensOf(loadedImages);

      gsap.fromTo(
        image,
        { scale: 1.045 },
        {
          scale: 1.12,
          duration: 7,
          ease: "none",
          overwrite: true,
        }
      );
    };

    let scheduleNext = () => {};

    const goTo = (nextIndex: number) => {
      if (
        isAnimating.current ||
        nextIndex === activeIndexRef.current ||
        nextIndex < 0 ||
        nextIndex >= slides.length
      ) {
        return;
      }

      const current = slides[activeIndexRef.current];
      const incoming = slides[nextIndex];

      if (!current || !incoming) return;

      clearAutoplay();
      isAnimating.current = true;

      const transition =
        SLIDE_TRANSITIONS[nextIndex % SLIDE_TRANSITIONS.length];

      const duration = reducedMotion.current
        ? 0.01
        : transition.duration;

      // Prepare the incoming slide without changing its stacking order
      // or visibility unexpectedly during the transition.
      gsap.set(incoming, {
        zIndex: 3,
        autoAlpha: 0,
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
        scale: 1,
        clipPath: "inset(0% 0% 0% 0%)",
      });

      const incomingImage = imageRefs.current[nextIndex];

      if (incomingImage) {
        gsap.set(incomingImage, {
          scale: reducedMotion.current ? 1 : 1.045,
        });
      }

      timeline?.kill();

      timeline = gsap.timeline({
        defaults: { overwrite: "auto" },

        onComplete: () => {
          // Hide the previous slide after the crossfade finishes.
          gsap.set(current, {
            autoAlpha: 0,
            zIndex: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
          });

          gsap.set(incoming, { zIndex: 2 });

          isAnimating.current = false;

          startKenBurns(nextIndex);
          scheduleNext();
        },
      });

      // Fade out the current slide.
      timeline.to(
        current,
        {
          autoAlpha: 0,
          scale: 0.98,
          duration,
          ease: transition.ease,
        },
        0
      );

      // Fade in the incoming slide at exactly the same time.
      timeline.fromTo(
        incoming,
        {
          ...transition.from,
          autoAlpha: 0,
        },
        {
          ...transition.to,
          autoAlpha: 1,
          duration,
          ease: transition.ease,
          immediateRender: false,
        },
        0
      );

      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    };

    goToRef.current = goTo;

    scheduleNext = () => {
      clearAutoplay();

      if (
        !inView ||
        reducedMotion.current ||
        isAnimating.current
      ) {
        return;
      }

      autoplayTimer = window.setTimeout(() => {
        goTo((activeIndexRef.current + 1) % slides.length);
      }, SLIDE_INTERVAL);
    };

    // Initial slider setup.
    const ctx = gsap.context(() => {
      gsap.set(slides, {
        autoAlpha: 0,
        zIndex: 0,
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
        scale: 1,
        clipPath: "inset(0% 0% 0% 0%)",
      });

      gsap.set(slides[0], {
        autoAlpha: 1,
        zIndex: 2,
      });

      startKenBurns(0);
    }, slider);

    const handleMotionChange = (
      event: MediaQueryListEvent
    ) => {
      reducedMotion.current = event.matches;

      if (event.matches) {
        clearAutoplay();
      } else if (inView && !isAnimating.current) {
        scheduleNext();
      }
    };

    // Run autoplay only while the slider is visible.
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;

        if (inView) {
          scheduleNext();
        } else {
          clearAutoplay();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(slider);

    motionQuery.addEventListener(
      "change",
      handleMotionChange
    );

    return () => {
      clearAutoplay();
      observer.disconnect();

      motionQuery.removeEventListener(
        "change",
        handleMotionChange
      );

      timeline?.kill();

      gsap.killTweensOf(loadedImages);

      ctx.revert();

      goToRef.current = () => {};
    };
  }, []);

  return (
    <div
      ref={sliderRef}
      className="relative aspect-[16/10] w-full overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Quadbreak 3D artwork showcase"
    >
      <div className="absolute inset-0">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.src}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            className="absolute inset-0 overflow-hidden opacity-0 [will-change:transform,opacity,clip-path]"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${SLIDES.length}`}
            aria-hidden={index !== activeIndex}
          >
            <div
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              className="absolute inset-0 [will-change:transform]"
            >
              <Image
                src={slide.src}
                alt={`Quadbreak Studios 3D artwork ${index + 1}`}
                fill
                sizes="(max-width: 1023px) 100vw, 530px"
                quality={85}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                draggable={false}
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/*
      Optional slide indicators:

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 px-3 pb-3 sm:px-4 sm:pb-4">
        <div className="pointer-events-auto flex items-center gap-1">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goToRef.current(index)}
              aria-label={`Show slide ${index + 1} of ${SLIDES.length}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className="group flex h-7 w-5 items-center justify-center"
            >
              <span
                className={`block h-[2px] transition-all duration-300 ${
                  index === activeIndex
                    ? "w-5 bg-[var(--green)]"
                    : "w-2.5 bg-white/40 group-hover:bg-white/75"
                }`}
              />
            </button>
          ))}
        </div>

        <span className="pointer-events-none select-none font-mono text-[10px] tracking-[0.22em] text-white/60 sm:text-[11px]">
          <span className="text-[var(--green)]">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="px-1 text-white/30">/</span>
          {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>
      */}
    </div>
  );
};

const WhoWeAre = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const text1Ref = useRef<HTMLParagraphElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
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
          imgRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.45"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="WhoWeAre"
      className="section overflow-hidden py-14 md:py-20"
      ref={sectionRef}
    >
      {/*
      <div className="shape3 z-[-1]"></div>
      <div className="shape2 z-[-1]"></div>
      */}

      <div className="grid-wrapper mx-auto max-w-[1450px] px-5 lg:px-10">
        <div className="stacked-content">
          <div className="content-wrapper">
            <div className="grid gap-y-10 lg:gap-y-30">
              <div className="service-item flex w-full flex-col items-center gap-x-20 lg:grid">
                <div className="service-info gap-y-10">
                  <div className="lg:w-[50%]">
                    <div className="mb-8 flex flex-col">
                      {/*
                      <h2
                        ref={titleRef}
                        className="relative w-fit text-5xl font-light uppercase leading-none text-white lg:text-[5rem]"
                      >
                        <span className="block pl-10">Vehicles</span>
                        <span className="flex items-center gap-2 pl-20">
                          <svg
                            width="80"
                            height="80"
                            className="rotate-linear"
                            viewBox="0 0 24 24"
                            fill="#91ff6a"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 12C12 7.5 10 3 6 3C6 7.5 8 12 12 12Z" />
                            <path d="M12 12C16.5 12 21 10 21 6C16.5 6 12 8 12 12Z" />
                            <path d="M12 12C12 16.5 14 21 18 21C18 16.5 16 12 12 12Z" />
                            <path d="M12 12C7.5 12 3 14 3 18C7.5 18 12 16 12 12Z" />
                          </svg>
                          Weapons
                        </span>
                        <span className="block">Environments</span>
                      </h2>
                      */}

                      <h2
                        ref={titleRef}
                        className="relative w-fit text-5xl font-light uppercase leading-none text-white lg:text-[5rem]"
                      >
                        This is what we do best
                      </h2>
                    </div>

                    <p
                      ref={text1Ref}
                      className="about-paragraph text-[16px] font-[200] leading-snug text-white/80 md:text-[20px]"
                    >
                      Vehicles, weapons, and environments are asset types
                      that punish shortcuts — mechanical accuracy, panel
                      logic, and wear patterns all show up the moment
                      they&apos;re in-engine. It&apos;s a specific skill
                      set, and it&apos;s the one we&apos;ve built our
                      pipeline around for nine years.
                    </p>

                    <Image
                      ref={imgRef}
                      src="/images/signature.png"
                      alt="Signature"
                      width={300}
                      height={100}
                      className="mt-6 h-auto w-[300px]"
                    />

                    {/*
                    <div ref={btnRef}>
                      <AnimatedButton
                        href="/about"
                        label="Learn More"
                        className="mt-10 w-fit min-w-[160px]"
                      />
                    </div>
                    */}
                  </div>

                  <div className="fade-up ml-auto mt-10 max-w-[530px] lg:mt-[-350px] lg:w-[50%]">
                    <h2
                      ref={text2Ref}
                      className="relative mb-10 w-fit text-right text-[3rem] font-light italic leading-none text-white/60 uppercase lg:ml-auto"
                    >
                      Lets Create
                      <br />
                      Magic Together
                    </h2>

                    {/*
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover"
                    >
                      <source src="/images/home-video.mp4" />
                      Your browser does not support the video tag.
                    </video>
                    */}

                    <div className="image-slider">
                      <ArtworkSlider />
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
