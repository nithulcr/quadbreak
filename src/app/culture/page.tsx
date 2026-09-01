// src/app/about/page.tsx
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OurStory2 from "@/components/OurStory2";
import CTASection from '@/components/CTASection';


export default function AboutPage() {
  return (
    <div>
      <Header />
      <main>
        
               <OurStory2 />
            
      </main>
      <Footer />
    </div>
  );
}
