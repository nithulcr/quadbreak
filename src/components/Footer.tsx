import Image from 'next/image';
import CurvedMarquee from '@/components/CurvedMarquee';

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

    Icon: Instagram,
  },
  {
    href: '',

    Icon: MessageCircleMore,
  },

  {
    href: '',

    Icon: Facebook,
  },
  {
    href: '',

    Icon: Linkedin,
  },
];

const Footer = () => (
  <footer className=" md:pt-[60px] pt-[0px] relative  font-light">
    <CurvedMarquee
      text="Game Art ✦ Stimulator Art ✦ 3d Studio ✦  "
      speed={1}
      color="#b4b4b4"
    />
    <div className="max-w-[1360px] mx-auto footer md:p-5 p-4 ">



      {/* Footer Main Grid */}
      <div className="middle  grid md:grid-cols-7  py-8  gap-[50px]    md:py-20">
        {/* Logo + Address Section */}
        <div className="col-span-3 content-center lg:pr-15">
          <Image src="/images/logo.png" alt="" width={230} height={50} className="w-[230px] content-center" />
          <p className='py-4 font-light'>All company names, brand names, trademarks, logos, illustrations, videos and any other intellectual property (Intellectual Property) published on this website are the property of their respective owners. Any non-authorized usage of Intellectual Property is strictly prohibited and any violation will be prosecuted under the law.</p>

          <ul className="flex gap-4 mt-4">
            {socialLinks.map(({ href, Icon }, index) => (
              <li key={index} className="font-light flex items-center gap-4">
                <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                  <Icon className="w-7 h-7 text-[var(--green)]" strokeWidth={1} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links Section */}

        <div className="col-span-2 ">
          <h2 className="text-2xl font-medium mb-6">Quick Links</h2>
          <ul className="flex flex-col gap-3">
            <li><Link href="/" className="font-light text-md">Home</Link></li>
            <li><Link href="" className="font-light text-md">About Us</Link></li>
            <li><Link href="" className="font-light text-md">Game Art</Link></li>
            <li><Link href="" className="font-light text-md">Simulator Art</Link></li>

            <li><Link href="" className="font-light text-md">My Projects</Link></li>

            <li><Link href="" className="font-light text-md">Contact Me</Link></li>


          </ul>
        </div>
        <div className="col-span-2 ">
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
              <span className="text-md">quadbreak@gmail.com</span>
            </li>
          </ul>

        </div>

        {/* Skills Section */}


      </div>
      <span className="block underline-span"></span>
      {/* Bottom Copyright */}
      <div className="bottom pt-4 pb-2 text-center md:px-5 px-4 mt-2">
        <p className=" text-md text-white">
          Copyright © 2026 Quadbreak. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
