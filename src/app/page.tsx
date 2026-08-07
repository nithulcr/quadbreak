"use client";
import React from "react";
import Header from '@/components/Header';
import Hero from '@/components/Hero';

import Services from '@/components/Services';
import CaseStudy from '@/components/CaseStudy';




import Footer from '@/components/Footer';
import Testimonials from "@/components/Testimonials";
import ExperienceSection from "@/components/Experience";


export default function HomePage() {
  
  
  

  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Services />
        {/* <CaseStudy />

        <ExperienceSection />
        <Testimonials /> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
