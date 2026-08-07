import './globals.css';
import type { Metadata } from 'next';
import ClientLayout from '../components/ClientLayout';
import LenisProvider from '@/components/LenisProvider';
import PreloaderControl from '@/components/PreloaderControl';
import Image from 'next/image';
import { Inter } from 'next/font/google';


import BlobCursor from '@/components/BlobCursor';


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: 'QuadBreak Studios',
  description: 'Evolved from Wrinit, Quadbreak Studios is more than just a game art outsourcing studio.It’s a creative movement. We specialize in high-quality 3D game art, VR,simulator environments.',
   icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>

      <body>
        <BlobCursor />
        {/* Preloader */}
        <div className="preloader">
          <div className="preloader-center">
            <Image
              src="/images/logo.png"
              alt="Terrah logo"
              width={300}
              height={80}
              className="brand"
            />
          </div>
        </div>

        {/* <StickySocial /> */}
        <PreloaderControl />

        <LenisProvider>
          <ClientLayout>{children}</ClientLayout>
        </LenisProvider>
      </body>
    </html>
  );
}