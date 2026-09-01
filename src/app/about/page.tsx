// src/app/about/page.tsx
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OurStory from "@/components/OurStory";
import TeamSection from '@/components/TeamSection';
import Categories from '@/components/Categories';
import Categories2 from '@/components/Categories2';


export default function AboutPage() {
  return (
    <div>
      <Header />
      <main>
        
               <OurStory />
               <Categories />
               <Categories2 />

               <TeamSection />




      </main>
      <Footer />
    </div>
  );
}
