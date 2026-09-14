'use client';

import Link from 'next/link';
import {
  Instagram,
  Mail,
  MessageCircleMore,
  Phone,
  Linkedin,
  Facebook,

} from 'lucide-react';

const socialLinks = [
  {
    href: 'https://www.instagram.com/ni_dul_cristiano_dos_santos/',
    label: 'Instagram',
    Icon: Instagram,
  },
  {
    href: 'https://api.whatsapp.com/send?phone=9946844274',
    label: 'WhatsApp',
    Icon: MessageCircleMore,
  },
  {
    href: 'mailto:nithulcr@gmail.com',
    label: 'Gmail',
    Icon: Mail,
  },
  {
    href: 'tel:9946844274',
    label: 'Phone',
    Icon: Phone,
  },
  {
    href: 'https://www.facebook.com/p/nithul-mouvery-100068865098847/?_rdr',
    label: 'Facebook',
    Icon: Facebook,
  },
    {
    href: 'https://www.linkedin.com/in/nithul-kp-894a48234?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    label: 'Linkedin',
    Icon: Linkedin,
  },
   

];

export default function StickySocial() {
  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-0 z-60 flex flex-col w-[140px]">
      {socialLinks.map(({ href, label, Icon }) => (
        <Link
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-[#ffffff2e] backdrop-blur-sm flex items-center  text-white font-semibold text-lg transform translate-x-[105px] md:hover:translate-x-0 transition-transform duration-700 "
        >
          <div className=" p-2 ">
            <Icon size={20} strokeWidth={1} />
          </div>
          <span className="uppercase text-sm font-light">{label}</span>
        </Link>
      ))}
    </div>
  );
}
