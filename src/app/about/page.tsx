// src/app/about/page.tsx
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OurStory from "@/components/OurStory";
import Values from "@/components/Values";
import WhatWeDO from "@/components/WhatWeDO";


import TeamSection from '@/components/TeamSection';
import Categories4 from '@/components/Categories4';
// import Categories3 from '@/components/Categories3';







export default function AboutPage() {
  return (
    <div>
      <Header />
      <main>
        
               <OurStory />
               <Values />
               <WhatWeDO/>


               <Categories4 />

   
               <TeamSection />


              
      
               {/* <Categories3 /> */}






      </main>
      <Footer />
    </div>
  );
}
