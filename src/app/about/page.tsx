// src/app/about/page.tsx
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OurStory from "@/components/OurStory";
import TeamSection from '@/components/TeamSection';
import Categories from '@/components/Categories';
import Categories2 from '@/components/Categories2';
import Categories3 from '@/components/Categories3';
import Categories4 from '@/components/Categories4';
import Categories5 from '@/components/Categories5';





export default function AboutPage() {
  return (
    <div>
      <Header />
      <main>
        
               <OurStory />
               <Categories4 />
               <Categories5/>


               <Categories />
               <Categories2 />
               <Categories3 />


               <TeamSection />




      </main>
      <Footer />
    </div>
  );
}
