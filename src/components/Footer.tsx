import Image from 'next/image';
import Link from "next/link";
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
  {
    href: '',
    label: 'Instagram',
    Icon: Instagram,
  },
  {
    href: '',
    label: 'WhatsApp',
    Icon: MessageCircleMore,
  },

  {
    href: '',
    label: 'Facebook',
    Icon: Facebook,
  },
  {
    href: '',
    label: 'Linkedin',
    Icon: Linkedin,
  },
];

const Footer = () => (
  <footer className=" md:pt-[60px] pt-[0px] relative ">
    {/* Decorative shapes */}
    {/* <div className="shape1 z-[-1]" />
    <div className="shape2 z-[-1]" /> */}

    <div className="max-w-[1360px] mx-auto footer md:p-5 p-4 ">

      {/* Scrolling Text */}
      {/* <div className="scrolling-text bg-[#004a891a] backdrop-blur-[10px]">
        <div className="scrolling-text_inner direction-left">
          <div>
            <div className="scrolling-text__item sm:text-[4vw] text-[5vw]">Design, Develop, Deliver.</div>
            <div className="scrolling-text__item sm:text-[4vw] text-[5vw]">Pixel-Perfect. Code-Clean.</div>
            <div className="scrolling-text__item sm:text-[4vw] text-[5vw]">Ideas to Interface.</div>
            <div className="scrolling-text__item sm:text-[4vw] text-[5vw]">Design, Develop, Deliver.</div>
            <div className="scrolling-text__item sm:text-[4vw] text-[5vw]">Pixel-Perfect. Code-Clean.</div>
            <div className="scrolling-text__item sm:text-[4vw] text-[5vw]">Ideas to Interface.</div>
            <div className="scrolling-text__item sm:text-[4vw] text-[5vw]">Design, Develop, Deliver.</div>
            <div className="scrolling-text__item sm:text-[4vw] text-[5vw]">Pixel-Perfect. Code-Clean.</div>
            <div className="scrolling-text__item sm:text-[4vw] text-[5vw]">Ideas to Interface.</div>
          </div>
        </div>
      </div> */}

      {/* Footer Main Grid */}
      <div className="middle xl:flex grid sm:grid-cols-2 grid-cols-1 py-8 border-gray-600 gap-[50px]  px-12 rounded-[40px] md:py-20 p-7 bg-[var(--background2)] backdrop-blur-[10px]">
        {/* Logo + Address Section */}
        <div className="xl:w-1/4 content-center">
                    <Image src="/images/logo2.png" alt="" width={230} height={50} className="w-[230px] content-center" />

        </div>

        {/* Quick Links Section */}
        <div className="xl:w-1/4 ">
          <h2 className="text-2xl font-medium mb-6">Find Me</h2>
          <ul className="flex flex-col gap-4">
            <li className="font-light flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-1 text-primary flex-none" strokeWidth={1} />
              <span className="leading-[26px] text-md">Kannur, Kerala, India</span>
            </li>
            <li className="font-light flex items-start gap-3">
              <Phone className="w-5 h-5 mt-1 text-primary" strokeWidth={1} />
              <div className="flex flex-col gap-1 text-md">
                <span>+91 99 99 9999 99</span>
                <span>+91 85 999 999 99</span>
              </div>
            </li>
            <li className="font-light flex items-start gap-3 ">
              <Mail className="w-5 h-5 mt-1 text-primary" strokeWidth={1} />
              <span className="text-md">twelfth@gmail.com</span>
            </li>
          </ul>
          
        </div>
        <div className="xl:w-1/4 ">
          <h2 className="text-2xl font-medium mb-6">Quick Links</h2>
          <ul className="flex flex-col gap-3">
            <li><Link href="/" className="font-light text-md">Home</Link></li>
            <li><Link href="" className="font-light text-md">About Me</Link></li>
            <li><Link href="" className="font-light text-md">My Projects</Link></li>
            <li><Link href="" className="font-light text-md">Contact Me</Link></li>
          </ul>
        </div>

        {/* Skills Section */}


        {/* Connect with us Section */}
        <div className="xl:w-[22%] ">
          <h2 className="text-2xl font-medium mb-6">Connect with Me</h2>
          <ul className="flex flex-col gap-4">
            {socialLinks.map(({ href, label, Icon }, index) => (
              <li key={label + index} className="font-light flex items-center gap-4">
                <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                  <Icon className="w-5 h-5" strokeWidth={1} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bottom pt-4 text-center">
        <p className=" text-md text-white">
          Copyright © 2025 TwelthOrigin. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
