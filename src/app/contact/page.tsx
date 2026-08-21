"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedButton from "@/components/AnimatedButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import {
  Instagram,
  Mail,
  MessageCircleMore,
  Phone,
  Linkedin,
  Facebook,
  MapPin,
} from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);
const socialLinks = [
  { href: '#', Icon: Instagram },
  { href: '#', Icon: MessageCircleMore },
  { href: '#', Icon: Facebook },
  { href: '#', Icon: Linkedin },
];

function TopContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSuccess(true);
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSuccess(false), 3000);
    }, 500);
  };

  return (
    <section className="py-16 lg:py-30">
      <div className="max-w-[1450px] mx-auto px-5 lg:px-10 pt-30 pb-20  w-full">
        <h2 className="uppercase w-fit text-white heading text-5xl lg:text-[6rem] leading-none font-light relative">
          Contact Us
        </h2>
      </div>
      <div className="max-w-[1450px] mx-auto px-5 lg:px-10 pt-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-30">
        <div className="flex-1 min-w-0 bg-white/5 p-7 lg:p-10 rounded-xl">
          <h1 className="uppercase text-white  text-4xl lg:text-[3.2rem]   mb-6">
            EMAIL US A<br />
            DIGITAL <span className="text-[var(--green)]">NOTE</span>
          </h1>
          <p className="text-white/50 text-[14px] lg:text-[16px] leading-relaxed font-[200] max-w-[360px]">
            Interested in joining our 3D world? Drop us a line and tell us what
            you need and more.
          </p>
           <div className="py-8">
            <h4 className="text-white/40 text-xs uppercase tracking-[3px] mb-3">
              Headquarters
            </h4>
            <p className="text-white text-[13px] font-medium uppercase tracking-[2px] leading-relaxed">
              KOCHI, KERALA, INDIA
              <span className="text-white/40 font-normal text-[11px] tracking-[2px] block mt-1">
                QUADBREAK STUDIO
              </span>
            </p>
          </div>
          <div className="pb-8">

            <p className="text-white text-[13px] font-medium uppercase tracking-[2px] leading-relaxed">
              <span className="text-white/40 font-normal text-[11px] tracking-[2px] block my-1">
                QUADBREAK STUDIO
              </span>
              2nd Floor, City Center, Iritty, <br />Kannur Kerala - 670703
            </p>
          </div>
          <div>
            {/* <h4 className="text-white/40 text-xs uppercase tracking-[3px] mb-3">
              Follow Social Media
            </h4> */}
            <ul className="flex gap-4">
              {socialLinks.map(({ href, Icon }, index) => (
                <li key={index} className="font-light flex items-center">
                  <a href={href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-white/10 rounded transition-all hover:border-[var(--green)]/30 hover:bg-[var(--green)]/10">
                    <Icon className="text-white/40 p-1 text-[10px] font-medium transition-colors hover:text-[var(--green)]" strokeWidth={1.5} />
                  </a>
                </li>
              ))}
            </ul>
            
          </div>
        </div>

        <div className="flex-[0_0_650px] max-lg:flex-none max-lg:w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-white/40 text-xs uppercase tracking-[3px]">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="border-b border-white/10 py-3 focus:px-4 text-white text-[14px] font-[200] outline-none transition-all focus:border-[var(--green)]/30 focus:shadow-[0_0_0_2px_rgba(145,255,106,.08)] placeholder:text-white/20 placeholder:font-[200]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white/40 text-xs uppercase tracking-[3px]">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Your email"
                  className="border-b border-white/10 py-3 focus:px-4 text-white text-[14px] font-[200] outline-none transition-all focus:border-[var(--green)]/30 focus:shadow-[0_0_0_2px_rgba(145,255,106,.08)] placeholder:text-white/20 placeholder:font-[200]"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-white/40 text-xs uppercase tracking-[3px]">
                  Contact Number
                </label>
                <input
                  type="text"
                  placeholder="ph. Number"
                  className="border-b border-white/10 py-3 focus:px-4 text-white text-[14px] font-[200] outline-none transition-all focus:border-[var(--green)]/30 focus:shadow-[0_0_0_2px_rgba(145,255,106,.08)] placeholder:text-white/20 placeholder:font-[200]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white/40 text-xs uppercase tracking-[3px]">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Company name"
                  className="border-b border-white/10 py-3 focus:px-4 text-white text-[14px] font-[200] outline-none transition-all focus:border-[var(--green)]/30 focus:shadow-[0_0_0_2px_rgba(145,255,106,.08)] placeholder:text-white/20 placeholder:font-[200]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white/40 text-xs uppercase tracking-[3px]">
                Your message here
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your project..."
                className="border-b border-white/10 py-3 focus:px-4 text-white text-[14px] font-[200] outline-none transition-all focus:border-[var(--green)]/30 focus:shadow-[0_0_0_2px_rgba(145,255,106,.08)] placeholder:text-white/20 placeholder:font-[200] resize-vertical min-h-[100px]"
              />
            </div>
            <AnimatedButton
              type="submit"
              label={submitting ? "SENDING..." : "SUBMIT"}
              className="md:mt-4 mt-2 w-fit"
            />
            {success && (
              <p className="text-[var(--green)] text-[13px] font-[200] mt-1">
                Message sent successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function FreeArtTestHeader() {
  return (
    <section className="pt-20 pb-0">
      <div className="max-w-[1360px] mx-auto px-5 lg:px-10 flex items-end justify-between gap-10">
        <h2 className="uppercase text-white  text-5xl lg:text-[5rem] leading-none tracking-[4px]">
          <span className="block text-white/50 font-light">
            EXPERIENCE OUR QUALITY
          </span>
          <span className="block">
            <span className="text-[var(--green)]">FREE</span> ART TEST
          </span>
        </h2>
      </div>
    </section>
  );
}

function FreeArtTestBody() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSuccess(true);
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSuccess(false), 3000);
    }, 500);
  };

  return (
    <section className="pt-12 pb-0">
      <div className="max-w-[1360px] mx-auto px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-white/40 text-xs uppercase tracking-[3px]">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="border-b border-white/10 py-3 focus:px-4 text-white text-[14px] font-[200] outline-none transition-all focus:border-[var(--green)]/30 focus:shadow-[0_0_0_2px_rgba(145,255,106,.08)] placeholder:text-white/20 placeholder:font-[200]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white/40 text-xs uppercase tracking-[3px]">
              Email
            </label>
            <input
              type="email"
              placeholder="Your email"
              className="border-b border-white/10 py-3 focus:px-4 text-white text-[14px] font-[200] outline-none transition-all focus:border-[var(--green)]/30 focus:shadow-[0_0_0_2px_rgba(145,255,106,.08)] placeholder:text-white/20 placeholder:font-[200]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white/40 text-xs uppercase tracking-[3px]">
              Company Name
            </label>
            <input
              type="text"
              placeholder="Company name"
              className="border-b border-white/10 py-3 focus:px-4 text-white text-[14px] font-[200] outline-none transition-all focus:border-[var(--green)]/30 focus:shadow-[0_0_0_2px_rgba(145,255,106,.08)] placeholder:text-white/20 placeholder:font-[200]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white/40 text-xs uppercase tracking-[3px]">
              Select a Service
            </label>
            <select
              defaultValue=""
              className="border-b border-white/10 py-3 focus:px-4 text-white/40 text-[14px] font-[200] outline-none transition-all focus:border-[var(--green)]/30 focus:shadow-[0_0_0_2px_rgba(145,255,106,.08)] appearance-none cursor-pointer"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23ffffff40'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 16px center",
              }}
            >
              <option value="" disabled>
                Choose a service
              </option>
              <option>3D Modeling</option>
              <option>Texturing</option>
              <option>Environment Art</option>
              <option>Character Art</option>
              <option>Hard Surface</option>
              <option>Props &amp; Weapons</option>
              <option>Concept Art</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white/40 text-xs uppercase tracking-[3px]">
              Project Details
            </label>
            <textarea
              rows={6}
              placeholder="Tell us about your project, art style, technical requirements..."
              className="border-b border-white/10 py-3 focus:px-4 text-white text-[14px] font-[200] outline-none transition-all focus:border-[var(--green)]/30 focus:shadow-[0_0_0_2px_rgba(145,255,106,.08)] placeholder:text-white/20 placeholder:font-[200] resize-vertical min-h-[120px]"
            />
          </div>
          <AnimatedButton
            type="submit"
            label={submitting ? "SENDING..." : "SUBMIT"}
            className="md:mt-4 mt-2 w-fit"
          />
          {success && (
            <p className="text-[var(--green)] text-[13px] font-[200] mt-1">
              Message sent successfully!
            </p>
          )}
        </form>

        <div>
          <h3 className="uppercase text-white text-3xl lg:text-[2rem] leading-none font-light mb-5">
            Try Before You Commit
          </h3>
          <p className="text-white/80 text-[14px] lg:text-[16px] leading-relaxed font-[200] max-w-[520px] mb-8">
            At QuadBreak Studio, we believe in earning your trust through
            results. That&apos;s why we offer a free art test for select
            projects. Whether you&apos;re a new client or an established studio,
            we&apos;ll work on a small sample to demonstrate our quality,
            attention to detail, and ability to match your project&apos;s
            requirements.
          </p>
          <h4 className="uppercase text-white text-lg font-light tracking-[2px] mb-4">
            Why Choose Our Free Art Test?
          </h4>
          <ul className="flex flex-col gap-3">
            {[
              "Quality You Can See — Get a production-ready, real-time optimized asset tailored to your needs.",
              "Seamless Collaboration — Experience our clear communication and structured workflow.",
              "Tailored to Your Project — Whether you're an indie studio, AAA developer, or animation company, we'll build an asset that fits your vision and pipeline.",
              "No Risk, All Reward — There's no commitment or cost, and you get to see exactly what we can do.",
            ].map((text, i) => (
              <li
                key={i}
                className="relative pl-5 text-white/50 text-[14px] leading-relaxed font-[200]"
              >
                <span className="absolute left-0 top-[9px] w-[5px] h-[5px] bg-[var(--green)] rotate-45 opacity-60" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function BottomInfo() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-[1360px] mx-auto px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <h3 className="uppercase text-white text-lg font-light tracking-[2px] mb-5">
            How It Works
          </h3>
          <ol className="flex flex-col gap-4 list-none">
            {[
              "Submit Your Request — Fill out our quick form with project details.",
              "We Create a Test Asset — Await our high-quality 3D model or texture.",
              "Review & Feedback — See how our work fits your project's needs.",
              "Decide with Confidence — If you like it, let's move forward with your project.",
            ].map((text, i) => (
              <li
                key={i}
                className="relative pl-8 text-white/50 text-[14px] leading-relaxed font-[200]"
              >
                <span className="absolute left-0 top-0 w-5 h-5 border border-[var(--green)]/30 rounded  text-[11px] text-[var(--green)] flex items-center justify-center">
                  {i + 1}
                </span>
                {text}
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="uppercase text-white text-lg font-light tracking-[2px] mb-5">
            General Requirements for Our Test Eligibility
          </h3>
          <ul className="flex flex-col gap-3 list-none">
            {[
              "Game Studios — Looking for long-term outsourcing partnerships.",
              "Indie Developers — Needing high-quality art on a budget.",
              "VR/Simulation Companies — Requiring real-time optimized assets.",
            ].map((text, i) => (
              <li
                key={i}
                className="relative pl-5 text-white/50 text-[14px] leading-relaxed font-[200]"
              >
                <span className="absolute left-0 top-[9px] w-[5px] h-[5px] bg-[var(--green)] rotate-45 opacity-60" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      const els = pageRef.current!.querySelectorAll(".reveal-section");
      els.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div>
      <Header />
      <main ref={pageRef}>
        <div className="reveal-section">
          <TopContactSection />
        </div>

        <div className="reveal-section">
          <FreeArtTestHeader />
        </div>
        <div className="reveal-section">
          <FreeArtTestBody />
        </div>
        <div className="reveal-section">
          <BottomInfo />
        </div>
      </main>
      <Footer />
    </div>
  );
}
