// src/app/about/page.tsx
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Services from '@/components/Services';
import Banner from '@/components/Banner';

export default function AboutPage() {
  return (
    <div>
      <Header />
      <main>
         <Banner title="About Me" backgroundImage="/images/bg-banner.jpg" />
        <Services />

      </main>
      <Footer />
    </div>
  );
}
