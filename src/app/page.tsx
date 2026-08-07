"use client";
import React from "react";
import Header from '@/components/Header';
import Hero from '@/components/Hero';

import AboutSection from '@/components/AboutSection';

import Services from '@/components/Services';




import CaseStudy from '@/components/CaseStudy';




import Footer from '@/components/Footer';
import Testimonials from "@/components/Testimonials";


export default function HomePage() {




  return (
    <div>
      <Header />
      <main>
        <Hero />
               <AboutSection />

        <Services />

       



        {/* <CaseStudy />

        <Testimonials /> */}
      </main>
       <Footer />
    </div>
  );
}
