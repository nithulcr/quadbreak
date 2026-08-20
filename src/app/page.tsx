"use client";
import React from "react";
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import AboutSection from '@/components/AboutSection';
import AboutSectionn from '@/components/AboutSectionn';
import CTASection from '@/components/CTASection';



import AboutSection2 from '@/components/AboutSection2';
import AboutSection3 from '@/components/AboutSection3';



import Services from '@/components/Services';
import Servicess from '@/components/Services2';





import CaseStudy from '@/components/CaseStudy';




import Footer from '@/components/Footer';
import ClientsLogoSlider from '@/components/ClientsLogoSlider';
import Testimonials from "@/components/Testimonials";
import ModernTestimonials from "@/components/ModernTestimonials";
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
               <AboutSectionn />

{/* 
               <AboutSection2 />
               <AboutSection3 /> */}



        {/* <Services /> */}
        <Servicess />
               <AboutSection />
               <CTASection />

<ModernTestimonials />
<ModernTestimonials2 />


       



        {/* <CaseStudy />

        <Testimonials /> */}
        
      </main>
       <ClientsLogoSlider />
       <Footer />
    </div>
  );
}
