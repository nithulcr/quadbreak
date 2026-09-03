"use client";
import React from "react";
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import WorksSection from '@/components/WorksSection';
import CTASection from '@/components/CTASection';


import Services from '@/components/Services';


import Footer from '@/components/Footer';
import ClientsLogoSlider from '@/components/ClientsLogoSlider';
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

        <Services />
               <WorksSection />

               <CTASection />

<Testimonials />


       



        
        <ClientsLogoSlider />
        
      </main>
       
       <Footer />
    </div>
  );
}
