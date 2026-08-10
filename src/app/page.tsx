"use client";
import React from "react";
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import whoWeAre from '@/components/WhoWeAre';
import AboutSection from '@/components/AboutSection';
import AboutSectionn from '@/components/AboutSectionn';


import AboutSection2 from '@/components/AboutSection2';
import AboutSection3 from '@/components/AboutSection3';



import Services from '@/components/Services';




import CaseStudy from '@/components/CaseStudy';




import Footer from '@/components/Footer';
import Testimonials from "@/components/Testimonials";
import WhoWeAre from "@/components/WhoWeAre";


export default function HomePage() {




  return (
    <div>
      <Header />
      <main>
        <Hero />
        <StatsSection />
               <WhoWeAre />
               <AboutSection />
               <AboutSectionn />

{/* 
               <AboutSection2 />
               <AboutSection3 /> */}



        <Services />

       



        {/* <CaseStudy />

        <Testimonials /> */}
      </main>
       <Footer />
    </div>
  );
}
