"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Mail,
  MessageCircleMore,
  Phone,
  Linkedin,
  Facebook,
  MapPin,
} from "lucide-react";

const socialLinks = [
  { href: "#", Icon: Instagram, label: "Instagram" },
  { href: "#", Icon: MessageCircleMore, label: "Community" },
  { href: "#", Icon: Facebook, label: "Facebook" },
  { href: "#", Icon: Linkedin, label: "LinkedIn" },
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
        <div className="middle grid md:grid-cols-4 lg:grid-cols-10  py-8 gapY-[40px] md:pb-14 md:pt-12">
          {/* Logo + Legal Disclaimer */}
          <div className="md:col-span-1 lg:col-span-3 content-center pr-10 footer-column">
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
          <div className="md:col-span-1 lg:col-span-2 px-8 footer-column">
            <h2 className="text-lg font-[300] mb-10 footer-head relative uppercase fon">
              Quick Links
            </h2>
            <ul className="flex flex-col gap-3">
              <Link
                href="/"
                className="font-light text-md hover:text-[var(--green)] transition-colors border-b w-full block border-white/10 pb-3 flex justify-between"
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
                className="font-light text-md hover:text-[var(--green)] transition-colors border-b w-full block border-white/10 pb-3 flex justify-between"
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

              <Link
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
              </Link>

              <Link
                href="/portfolio"
                className="font-light text-md hover:text-[var(--green)] transition-colors border-b w-full block border-white/10 pb-3 flex justify-between"
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

              {/* <Link
                  href="/contact"
                  className="font-light text-md hover:text-[var(--green)] transition-colors border-b w-full block border-white/10 pb-3 flex justify-between"
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
                </Link> */}
            </ul>
          </div>

          <div className="md:col-span-1 lg:col-span-3 px-8 footer-column">
            <h2 className="text-lg font-[300] mb-10 footer-head relative uppercase">
              Location
            </h2>
            <ul className="flex flex-col gap-5">
              <li className="font-light flex gap-3">
                <span className="flex items-center justify-center border border-[var(--green)] flex-none w-9 h-9 p-1 rounded">
                  <MapPin
                    className=" p-[2px]  text-[var(--green)] flex-none"
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
              <li className="font-light flex items-center gap-3">
                <span className="flex items-center justify-center border border-[var(--green)] flex-none w-9 h-9 p-1 rounded">
                  <Phone
                    className=" p-[3px] text-[var(--green)]  flex-none"
                    strokeWidth={1.5}
                  />
                </span>
                <div className="flex flex-col gap-1 text-md">
                  <span>+91 99 99 9999 99</span>
                </div>
              </li>
              <li className="font-light flex items-center gap-3">
                <span className="flex items-center justify-center border border-[var(--green)] flex-none w-9 h-9 p-1 rounded">
                  <Mail
                    className="p-[3px]   text-[var(--green)] flex-none"
                    strokeWidth={1.5}
                  />
                </span>
                <span className="text-md">business@quadbreak.com</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1 lg:col-span-2 pl-10 footer-column">
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
                      strokeWidth={1.5}
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
            <li>
              <Link
                href="/contact"
                className="font-light text-sm text-white/80 hover:text-[var(--green)] transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <span className="opacity-40">|</span>
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
