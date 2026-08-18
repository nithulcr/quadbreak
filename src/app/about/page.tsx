// src/app/about/page.tsx
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatsSection from '@/components/StatsSection';
import WhoWeAre from "@/components/WhoWeAre";
import Banner from '@/components/Banner';

export default function AboutPage() {
  return (
    <div>
      <Header />
      <main>
         <Banner title="About Us" backgroundImage="/images/bg-banner.jpg" />
          <StatsSection />
               <WhoWeAre />

      </main>
      <Footer />
    </div>
  );
}
