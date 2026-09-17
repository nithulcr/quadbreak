"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedButton from "@/components/AnimatedButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from 'next/image';

import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);



interface SocialIconProps {
  className?: string;
}



const InstagramIcon = ({ className }: SocialIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" focusable="false" viewBox="0 0 24 24" color="var(--green)" style={{
  userSelect: "none",
  width: "35px",
  height: "35px",
  display: "inline-block",
  fill: "var(--green)",
  flexShrink: 0,
}}><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>
);
const LinkedInIcon = ({ className }: SocialIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" focusable="false" viewBox="0 0 24 24" color="var(--green)" style={{
  userSelect: "none",
  width: "35px",
  height: "35px",
  display: "inline-block",
  fill: "var(--green)",
  flexShrink: 0,
}}><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path></svg>
);
const ArtstationIcon = ({ className }: SocialIconProps) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" color="var(--green)" style={{
  userSelect: "none",
  width: "35px",
  height: "35px",
  display: "inline-block",
  fill: "var(--green)",
  flexShrink: 0,
}}><path d="M66.1 441.4L109.1 515.7C113.4 524.2 119.9 531.4 128 536.4C136.1 541.4 145.4 544 155 544L440.4 544L381.2 441.4L66.1 441.4zM565.9 414L399.7 123.3C395.3 115.1 388.8 108.2 380.8 103.3C372.8 98.4 363.7 96 354.4 96L266 96L523.3 543.6L564 473.1C565.9 469.9 585 443.4 566 414zM339.2 368.5L223.7 168.5L108.2 368.5L339.2 368.5z"/></svg>
);
const WhatsappIcon = ({ className }: SocialIconProps) => (
<svg xmlns="http://www.w3.org/2000/svg" focusable="false" viewBox="0 0 24 24" color="var(--green)" style={{
  userSelect: "none",
  width: "35px",
  height: "30px",
  display: "inline-block",
  fill: "var(--green)",
  flexShrink: 0,
}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
);




const socialLinks = [

  { href: "https://www.linkedin.com/company/quadbreakstudios", Icon: LinkedInIcon, label: "LinkedIn" },

  { href: "https://www.artstation.com/quadbreakstudios", Icon: ArtstationIcon, label: "Artstation" },
  
  { href: "https://www.instagram.com/quadbreak.studios/", Icon: InstagramIcon, label: "Instagram" },

  { href: "https://wa.me/919400769978", Icon: WhatsappIcon, label: "Whatsapp" },

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
    <section className="pt-16 lg:pt-30 pb-14 lg:pb-24">
      <div className="max-w-[1450px] mx-auto px-5 lg:px-10 pt-30 w-full">
        <h1 className="uppercase text-white  text-4xl md:text-[6rem]    mb-6">
            Email Us a<br />
            Digital <span className="text-[var(--green)]">Note</span>
          </h1>
        <p className="text-white/80 text-[14px] lg:text-[16px] leading-relaxed font-[300] max-w-[420px] mt-6">
          Interested in joining our 3D world? Drop us a line and tell us what
          you need and more.
        </p>
      </div>
      <div className="max-w-[1450px] mx-auto px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20  pt-6">
        <div className=" flex-1 min-w-0 bg- relative">
          {/* <h2 className="uppercase text-white  text-4xl md:text-5xl    mb-6">
            Email Us a<br />
            Digital <span className="text-[var(--green)]">Note</span>
          </h2>
          <p className="text-white/50 text-[14px] lg:text-[16px] leading-relaxed font-[200] max-w-[360px]">
            Interested in joining our 3D world? Drop us a line and tell us what
            you need and more.
          </p> */}
          <div className="pb-6">
            <h4 className="text-[var(--green)] uppercase  uppercase tracking-[3px] mb-2 text-[14px]">
              Headquarters
            </h4>
            <p className="text-white font-[200]">
              Kochi, Kerala, India
              <span className="text-white/30 font-normal text-[11px] tracking-[2px] block mt-1">
                QUADBREAK STUDIO
              </span>
            </p>
          </div>
           <div className="pb-6">
            <p className="text-white font-[200]">
              <span className="text-[var(--green)] uppercase font-normal  tracking-[2px] block mb-2 text-[14px]">
                Operating Studio
              </span>
              2nd Floor, City Center, Iritty, <br />
              Kannur Kerala - 670703
            </p>
          </div>
          <div className="pb-6">
            <p className="text-white font-[200]">
              <span className="text-[var(--green)] uppercase font-normal  tracking-[2px] block mb-2 text-[14px]">
               Email Address
              </span>
            business@quadbreak.com
            </p>
          </div>
          <div className="pb-6">
            <p className="text-white font-[200]">
              <span className="text-[var(--green)] uppercase font-normal  tracking-[2px] block mb-2 text-[14px]">
                Contact Number
              </span>
             +91 94007 69978
            </p>
          </div>
          
          <div>
            {/* <h4 className="text-white/30 text-xs uppercase tracking-[3px] mb-3">
              Follow Social Media
            </h4> */}
            <ul className="flex  items-center gap-4 mt-2">
              {socialLinks.map(({ href, Icon }, index) => (
                <li key={index} className="font-light flex items-center relative top-0 hover:top-[-2px] transition-all">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 "
                  >
                    <Icon
                      className="w-9 h-9 border border-[var(--green)] text-[var(--green)] p-[5px] rounded"
                    />
                   
                  </a>
                </li>
              ))}
            </ul>
          </div>
           <Image
                        src="/images/cartoon.png"
                        alt="Quadbreak logo"
                        width={420}
                        height={420}
                        className="hidden xl:block absolute right-0 bottom-[-30px]"
                      />
        </div>

        <div className="flex-[0_0_650px] max-lg:flex-none max-lg:w-full lg:mt-[-100px]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 lg:gap-8">
           <div className="flex flex-col gap-3">
               
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  className=" border-b border-white/30  py-3 focus:px-5 text-white text-[14px] font-[200] outline-none transition-all focus:border-[var(--green)]/30 focus:shadow-[0_0_0_2px_rgba(145,255,106,.08)] placeholder:text-white/30 placeholder:font-[200]"
                />
              </div>
           <div className="flex flex-col gap-3">
               
                <input
                  type="email"
                  placeholder="Your email"
                   required
                  className=" border-b border-white/30  py-3 focus:px-5 text-white text-[14px] font-[200] outline-none transition-all focus:border-[var(--green)]/30 focus:shadow-[0_0_0_2px_rgba(145,255,106,.08)] placeholder:text-white/30 placeholder:font-[200]"
                />
              </div>
            <div className="flex flex-col gap-3">
                
                <input
                  type="text"
                  placeholder="ph. Number"
                   required
                  className=" border-b border-white/30  py-3 focus:px-5 text-white text-[14px] font-[200] outline-none transition-all focus:border-[var(--green)]/30 focus:shadow-[0_0_0_2px_rgba(145,255,106,.08)] placeholder:text-white/30 placeholder:font-[200]"
                />
              </div>
            <div className="flex flex-col gap-3">
            
              <textarea
                rows={5}
                placeholder="Tell us about your project..."
                 required
                className=" border-b border-white/30  py-3 focus:px-5 text-white text-[14px] font-[200] outline-none transition-all focus:border-[var(--green)]/30 focus:shadow-[0_0_0_2px_rgba(145,255,106,.08)] placeholder:text-white/30 placeholder:font-[200] resize-vertical min-h-[100px]"
              />
            </div>
            <AnimatedButton
              type="submit"
              label={submitting ? "SENDING..." : "Send a message"}
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

       
      </main>
      <Footer />
    </div>
  );
}
