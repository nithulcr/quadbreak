// src/app/about/page.tsx
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OurStory from "@/components/OurStory";
import Banner from '@/components/Banner';

export default function AboutPage() {
  return (
    <div>
      <Header />
      <main>
         <Banner title="About Us" backgroundImage="/images/bg-banner.jpg" />
               <OurStory />


      </main>
      <Footer />
    </div>
  );
}
