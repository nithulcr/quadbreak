import './globals.css';
import type { Metadata, Viewport } from 'next';
import ClientLayout from '../components/ClientLayout';
import LenisProvider from '@/components/LenisProvider';
import PreloaderControl from '@/components/PreloaderControl';
import JsonLd from '@/components/JsonLd';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import {
  defaultDescription,
  defaultOgImage,
  defaultTitle,
  ogImageHeight,
  ogImageWidth,
  siteKeywords,
  siteName,
  siteUrl,
} from '@/lib/site';
import { siteSchemaGraph } from '@/lib/schema';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultTitle,
  description: defaultDescription,
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  keywords: siteKeywords,
  category: "Game Art",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    locale: "en_US",
    images: [
      {
        url: defaultOgImage,
        width: ogImageWidth,
        height: ogImageHeight,
        alt: `${siteName} – 3D game art and asset production`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>

      <body>
        <JsonLd data={siteSchemaGraph()} />

        <div className="preloader hidden" aria-hidden="true">
          <div className="preloader-center">
            <Image
              src="/images/logo.png"
              alt="Quadbreak Studios logo"
              width={300}
              height={80}
              className="brand"
            />
          </div>
        </div>


        <PreloaderControl />

        <LenisProvider>
          <ClientLayout>{children}</ClientLayout>
        </LenisProvider>
      </body>
    </html>
  );
}
