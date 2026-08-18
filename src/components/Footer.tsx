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
      <div className="footer-heading relative w-full overflow-hidden  pt-26 flex items-center justify-center">
        <h2 className=" text-[14vw] xl:text-[14rem] leading-none font-semibold opacity-80 tracking-tighter bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-clip-text  uppercase text-center select-none flex items-center justify-center">
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

      <div className="max-w-[1360px] mx-auto footer md:p-5 p-4">
        {/* Footer Main Grid */}
        <div className="middle grid md:grid-cols-9 py-8 gap-[50px] md:pb-14 md:pt-12">
          
          {/* Logo + Legal Disclaimer */}
          <div className="col-span-3 content-center lg:pr-5">
            <Image
              src="/images/logo.png"
              alt="Quadbreak Logo"
              width={230}
              height={50}
              className="w-[230px] content-center"
            />
            <p className="py-4 font-light text-sm opacity-80 leading-relaxed">
              All company names, brand names, trademarks, logos, illustrations, videos and any other intellectual property published on this website are the property of their respective owners. Any non-authorized usage of Intellectual Property is strictly prohibited and any violation will be prosecuted under the law.
            </p>
          </div>

          {/* Quick Links Column 1 */}
          <div className="col-span-2">
            <h2 className="text-2xl font-medium mb-6">Quick Links</h2>
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
            <h2 className="text-2xl font-medium mb-6">Legal</h2>
            <ul className="flex flex-col gap-3">
              <li><Link href="/privacy-policy" className="font-light text-md hover:text-[var(--green)] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="font-light text-md hover:text-[var(--green)] transition-colors">Terms and Conditions</Link></li>
              <li><Link href="/contact" className="font-light text-md hover:text-[var(--green)] transition-colors">Contact Us</Link></li>
            </ul>

            <ul className="flex gap-4 mt-6">
              {socialLinks.map(({ href, Icon }, index) => (
                <li key={index} className="font-light flex items-center">
                  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-40 bg-[var(--green)] p-1 rounded transition-opacity">
                    <Icon className="w-6 h-6 text-black" strokeWidth={1.5} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-span-2">
            <h2 className="text-2xl font-medium mb-6">Find Me</h2>
            <ul className="flex flex-col gap-4">
              <li className="font-light flex items-center gap-3">
                <span className='flex items-center justify-center bg-[var(--green)] flex-none w-8 h-8 p-1 rounded'><MapPin className="w-5 h-5 mt-1 text-black flex-none" strokeWidth={1.5} /></span>
                <span className="leading-[26px] text-md">Kannur, Kerala, India</span>
              </li>
              <li className="font-light flex items-start gap-3">
                <span className='flex items-center justify-center bg-[var(--green)] flex-none w-8 h-8 p-1 rounded'><Phone className="w-5 h-5 mt-1 text-black flex-none" strokeWidth={1.5} /></span>
                <div className="flex flex-col gap-1 text-md">
                  <span>+91 99 99 9999 99</span>
                  <span>+91 85 999 999 99</span>
                </div>
              </li>
              <li className="font-light flex items-center gap-3">
                <span className='flex items-center justify-center bg-[var(--green)] flex-none w-8 h-8 p-1 rounded'><Mail className="w-5 h-5 mt-1 text-black flex-none" strokeWidth={1.5} /></span>
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