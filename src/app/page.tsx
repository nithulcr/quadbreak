import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import WorksSection from '@/components/WorksSection';
import CTASection from '@/components/CTASection';
import Journey from '@/components/Journey';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import ClientsLogoSlider from '@/components/ClientsLogoSlider';
import Testimonials from "@/components/Testimonials";
import WhoWeAre from "@/components/WhoWeAre";
import {
  getServices,
  getClients,
  getTestimonials,
  getProjects,
} from "@/lib/wordpress";

export default async function HomePage() {
  const [services, clients, testimonials, projects] = await Promise.all([
    getServices(),
    getClients(),
    getTestimonials(),
    getProjects(),
  ]);

  return (
    <div>
      <Header />
      <main>
        <Hero />
        <StatsSection />
        <WhoWeAre />
        <Journey />

        <Services services={services} />
        <WorksSection projects={projects} />

        <CTASection />

        <Testimonials testimonials={testimonials} />

        <ClientsLogoSlider clients={clients} />
      </main>

      <Footer />
    </div>
  );
}