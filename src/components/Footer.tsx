"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

interface SocialIconProps {
  className?: string;
}

const FacebookIcon = ({ className }: SocialIconProps) => (
<svg xmlns="http://www.w3.org/2000/svg" focusable="false" viewBox="0 0 24 24" color="var(--green)" style={{
  userSelect: "none",
  width: "35px",
  height: "35px",
  display: "inline-block",
  fill: "var(--green)",
  flexShrink: 0,
}}><path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z"></path></svg>
);
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




const socialLinks = [
  { href: "#", Icon: FacebookIcon, label: "Facebook" },

  { href: "https://www.instagram.com/quadbreak.studios/", Icon: InstagramIcon, label: "Instagram" },
  { href: "https://www.linkedin.com/company/quadbreakstudios", Icon: LinkedInIcon, label: "LinkedIn" },

  { href: "https://www.artstation.com/quadbreakstudios", Icon: ArtstationIcon, label: "Artstation" },
];

export default function Footer() {
  const text = "QUADBREAK";

  return (
    <footer className="relative font-light">
      <span className="block underline-span"></span>

      {/* Hero Watermark Text with Zigzag & Masks */}
      <div className="footer-heading relative w-full overflow-hidden  pt-26  flex items-center justify-center">
        <h2 className=" text-[14vw] xl:text-[14.5rem] leading-none font-semibold opacity-80 tracking-tighter bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-clip-text  uppercase text-center select-none flex items-center justify-center">
          {text.split("").map((char, i) => (
            <span
              key={i}
              className={`inline-block transition-transform text-[var(--green)] duration-300 ${
                i % 2 === 0
                  ? "-translate-y-2 md:-translate-y-4 -rotate-3"
                  : "md:translate-y-4 rotate-3"
              }`}
            >
              {char}
            </span>
          ))}
        </h2>

        {/* Blur Overlays */}
        <div className="absolute opacity-70 left-0 top-0 bottom-0 w-[35%] backdrop-blur-[10px] [mask-image:linear-gradient(to_right,black_20%,transparent_50%)] pointer-events-none z-10" />
        <div className="absolute opacity-70 right-0 top-0 bottom-0 w-[35%] backdrop-blur-[10px] [mask-image:linear-gradient(to_left,black_20%,transparent_50%)] pointer-events-none z-10" />
      </div>

      <div className="max-w-[1450px] mx-auto footer px-5 lg:px-10 md:py-10 py-4">
        {/* Footer Main Grid */}
        <div className="middle grid md:grid-cols-4 lg:grid-cols-13  py-8 gapY-[40px] md:pb-14 md:pt-12">
          {/* Logo + Legal Disclaimer */}
          <div className="md:col-span-1 lg:col-span-4 content-center pr-10 footer-column">
            <div className="relative text-centerc w-fit">
              <Image
                src="/images/logo.png"
                alt="Quadbreak Logo"
                width={230}
                height={50}
                className="w-[280px] content-center"
              />
              <span className="uppercase text-center text-white/50 mx-auto block text-lg pt-1 tracking-[8px]">
                Studios
              </span>
            </div>
            <p className="py-3 font-[200]  opacity-80 max-w-[1000px] xl:max-w-[500px]">
              We are create high quality, real-time optimized assets for
              studios, businesses, and individuals globally. From characters to
              environments, we bring ideaas to life with precision, creativity
              and reliability.
            </p>
          </div>

          {/* Quick Links Column 1 */}
          <div className="md:col-span-1 lg:col-span-3 px-8 footer-column">
            <h2 className="text-lg font-[300] mb-10 footer-head relative uppercase fon">
              Quick Links
            </h2>
            <ul className="flex flex-col gap-3">
              <Link
                href="/"
                className="font-light text-md hover:text-[var(--green)] relative top-0 hover:top-[-2px] transition-all border-b w-full block border-white/10 pb-3 flex justify-between"
              >
                Home
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                  color="rgb(0, 0, 0)"
          
                  className="w-5 text-[var(--green)] font-medium"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>

              <Link
                href="/about"
                className="font-light text-md hover:text-[var(--green)] relative top-0 hover:top-[-2px] transition-all border-b w-full block border-white/10 pb-3 flex justify-between"
              >
                About Us
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                  color="rgb(0, 0, 0)"
          
                  className="w-5 text-[var(--green)] font-medium"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>

              {/* <Link
                href="https://quadbreaksimulations.com/"
                target="_blank"
                className="font-light text-md hover:text-[var(--green)] transition-colors border-b w-full block border-white/10 pb-3 flex justify-between"
              >
                Stimulator Art
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                  color="rgb(0, 0, 0)"
     
                  className="w-5 text-[var(--green)] font-medium"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link> */}

              <Link
                href="/portfolio"
                className="font-light text-md hover:text-[var(--green)] relative top-0 hover:top-[-2px] transition-all border-b w-full block border-white/10 pb-3 flex justify-between"
              >
                Portfolio
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                  color="rgb(0, 0, 0)"
         
                  className="w-5 text-[var(--green)] font-medium"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>

              <Link
                  href="/contact"
                  className="font-light text-md hover:text-[var(--green)] relative top-0 hover:top-[-2px] transition-all border-b w-full block border-white/10 pb-3 flex justify-between"
                >
                  Contact Us 
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      color="rgb(0, 0, 0)"
                     className="w-5 text-[var(--green)] font-medium"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                </Link>
            </ul>
          </div>

          <div className="md:col-span-1 lg:col-span-3 px-8 footer-column">
            <h2 className="text-lg font-[300] mb-10 footer-head relative uppercase">
              Location
            </h2>
            <ul className="flex flex-col gap-5">
              <li className="font-light flex gap-3">
                <span className="flex items-center justify-center bg-[var(--green)]  flex-none w-8 h-8 rounded">
                  <MapPin
                    className=" p-[1px]   text-[var(--background)] flex-none"
                    strokeWidth={1.5}
                  />
                </span>
                <span className="leading-[26px] text-md  mt-[-5px]">
                  Quadbreak Studios Pvt Ltd
                  <br />
                  <span className="opacity-80 font-[200]">
                    2nd Floor, City Center, Iritty, Kannur, Kerala - 670703
                  </span>
                </span>
              </li>
              <a href="tel:+91 94007 69978" className="font-light flex items-center gap-3">
                <span className="flex items-center justify-center bg-[var(--green)] flex-none w-8 h-8 rounded">
                  <Phone
                    className=" p-[1px] text-[var(--background)]  flex-none"
                    strokeWidth={1.5}
                  />
                </span>
                <div className="flex flex-col gap-1 text-md">
                  <span>+91 94007 69978</span>
                </div>
              </a>
              <li className="font-light flex items-center gap-3">
                <span className="flex items-center justify-center bg-[var(--green)] flex-none w-8 h-8 rounded">
                  <Mail
                    className="p-[1px]  text-[var(--background)] flex-none"
                    strokeWidth={1.5}
                  />
                </span>
                <span className="text-md">business@quadbreak.com</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1 lg:col-span-3 pl-10 footer-column">
            <h2 className="text-lg font-[300] mb-10 footer-head relative uppercase fon">
              Follow Our Journey
            </h2>
            <ul className="flex flex-col gap-4">
              {socialLinks.map(({ href, Icon, label }, index) => (
                <li key={index} className="font-light flex items-center">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 "
                  >
                    <Icon
                      className="w-9 h-9 border border-[var(--green)] text-[var(--green)] p-[5px] rounded"
                    />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <span className="block underline-span"></span>

        {/* Bottom Copyright */}
        <div className="bottom pt-4 pb-2  mt-2 flex flex-wrap gap-5 justify-between">
          <p className="text-sm text-white/80">
            © Copyright 2026 All Rights Reserved by Wrinit Games/Quadbreak
            studios.
          </p>
          <ul className="flex items-center gap-4 ">
            {/* <li>
              <Link
                href="/contact"
                className="font-light text-sm text-white/80 hover:text-[var(--green)] transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <span className="opacity-40">|</span> */}
            <li>
              <Link
                href="/privacy-policy"
                className="font-light text-sm text-white/80 hover:text-[var(--green)] transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <span className="opacity-40">|</span>
            <li>
              <Link
                href="/terms"
                className="font-light text-sm text-white/80 hover:text-[var(--green)] transition-colors"
              >
                Terms and Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
