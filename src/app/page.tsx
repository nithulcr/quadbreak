"use client";
import React from "react";
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import AboutSectionn from '@/components/AboutSectionn';
import CTASection from '@/components/CTASection';


import Servicess from '@/components/Services2';


import Footer from '@/components/Footer';
import ClientsLogoSlider from '@/components/ClientsLogoSlider';
import ModernTestimonials2 from "@/components/ModernTestimonials2";

import WhoWeAre from "@/components/WhoWeAre";


export default function HomePage() {




  return (
    <div>
      <Header />
      <main>
        <Hero />
        <StatsSection />
               <WhoWeAre />

{/* 
            
        {/* <Services /> */}
        <Servicess />
               <AboutSectionn />

               <CTASection />

<ModernTestimonials2 />


       



        {/* <CaseStudy />

        <Testimonials /> */}
        <ClientsLogoSlider />
        
      </main>
       
       <Footer />
    </div>
  );
}
