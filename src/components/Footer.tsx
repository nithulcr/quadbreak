import Image from 'next/image';
import Link from 'next/link';
import {
  Instagram,
  Mail,
  MessageCircleMore,
  Phone,
  Linkedin,
  Facebook,
  MapPin,
} from 'lucide-react';

const socialLinks = [
  { href: '#', Icon: Instagram },
  { href: '#', Icon: MessageCircleMore },
  { href: '#', Icon: Facebook },
  { href: '#', Icon: Linkedin },
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
                  ? "-translate-y-4 -rotate-3"
                  : "translate-y-4 rotate-3"
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
        <div className="middle grid md:grid-cols-9 py-8 gap-[60px] md:pb-14 md:pt-12">
          
          {/* Logo + Legal Disclaimer */}
          <div className="col-span-3 content-center lg:pr-5">
            <Image
              src="/images/logo.png"
              alt="Quadbreak Logo"
              width={230}
              height={50}
              className="w-[230px] content-center"
            />
            <p className="py-3 font-[200]  opacity-80 max-w-[360px]">
              We are a game art outsourcing studio delivering high-quality 3D assets for games, simulations and virtual  experiences.
            </p>
            <p className='text-[var(--green)] font-[200]  pb-2' >Quality, Performance, Artistry</p>
            <ul className="flex gap-4 mt-2">
              {socialLinks.map(({ href, Icon }, index) => (
                <li key={index} className="font-light flex items-center">
                  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-40 border border-[var(--green)] p-1 rounded transition-opacity">
                    <Icon className="w-6 h-6 p-[2px] text-[var(--green)]" strokeWidth={1.5} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column 1 */}
          <div className="col-span-2">
            <h2 className="text-xl font-medium mb-8 footer-head relative uppercase relative uppercase">Quick Links</h2>
            <ul className="flex flex-col gap-3">
              <li><Link href="/" className="font-light text-md hover:text-[var(--green)] transition-colors">Home</Link></li>
              <li><Link href="/about" className="font-light text-md hover:text-[var(--green)] transition-colors">About Us</Link></li>
              <li><Link href="/game-art" className="font-light text-md hover:text-[var(--green)] transition-colors">Game Art</Link></li>
              <li><Link href="/simulator-art" className="font-light text-md hover:text-[var(--green)] transition-colors">Simulator Art</Link></li>
              <li><Link href="/projects" className="font-light text-md hover:text-[var(--green)] transition-colors">My Projects</Link></li>
            </ul>
          </div>

          {/* Quick Links Column 2 + Social Icons */}
          <div className="col-span-2">
            <h2 className="text-xl font-medium mb-8 footer-head relative uppercase relative uppercase">Legal</h2>
            <ul className="flex flex-col gap-3">
              <li><Link href="/privacy-policy" className="font-light text-md hover:text-[var(--green)] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="font-light text-md hover:text-[var(--green)] transition-colors">Terms and Conditions</Link></li>
              <li><Link href="/contact" className="font-light text-md hover:text-[var(--green)] transition-colors">Contact Us</Link></li>
            </ul>

            
          </div>

          {/* Contact Details */}
          <div className="col-span-2">
            <h2 className="text-xl font-medium mb-8 footer-head relative uppercase relative uppercase">Location</h2>
            <ul className="flex flex-col gap-5">
              <li className="font-light flex items-center gap-3">
                <span className='flex items-center justify-center border border-[var(--green)] flex-none w-8 h-8 p-1 rounded'><MapPin className="w-6 h-6 p-[3px]  text-[var(--green)] flex-none" strokeWidth={1.5} /></span>
                <span className="leading-[26px] text-md">Kannur, Kerala, India</span>
              </li>
              <li className="font-light flex items-start gap-3">
                <span className='flex items-center justify-center border border-[var(--green)] flex-none w-8 h-8 p-1 rounded'><Phone className="w-6 h-6 p-[3px]  text-[var(--green)] flex-none" strokeWidth={1.5} /></span>
                <div className="flex flex-col gap-1 text-md">
                  <span>+91 99 99 9999 99</span>

                </div>
              </li>
              <li className="font-light flex items-center gap-3">
                <span className='flex items-center justify-center border border-[var(--green)] flex-none w-8 h-8 p-1 rounded'><Mail className="w-6 h-6 p-[3px]  text-[var(--green)] flex-none" strokeWidth={1.5} /></span>
                <span className="text-md">quadbreak@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        <span className="block underline-span"></span>

        {/* Bottom Copyright */}
        <div className="bottom pt-4 pb-2 text-center md:px-5 px-4 mt-2">
          <p className="text-md text-white/80">
            Copyright © 2026 Quadbreak. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}