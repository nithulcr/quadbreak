import Banner from '@/components/Banner';
import Header from '@/components/Header';
import ProjectsSection from '@/components/Projects';
import Footer from '@/components/Footer';


export default function ProjectPage() {
  return (
    <div>
      <Header />
      <main>
        <Banner title="ALL WORKS" backgroundImage="/images/bg-banner.jpg" />
        <ProjectsSection />


      </main>
      <Footer />
    </div>

  );
}
