// src/app/about/page.tsx
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OurStory from "@/components/OurStory";
import TeamSection from '@/components/TeamSection';
import Categories from '@/components/Categories';
import Categories3 from '@/components/Categories3';
import Categories4 from '@/components/Categories4';






export default function AboutPage() {
  return (
    <div>
      <Header />
      <main>
        
               <OurStory />
               <Categories4 />
   


               <Categories />
      
               <Categories3 />


               <TeamSection />




      </main>
      <Footer />
    </div>
  );
}
