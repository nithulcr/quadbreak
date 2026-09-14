import Header from '@/components/Header';
import PortfolioGrid from '@/components/PortfolioGrid';
import Footer from '@/components/Footer';
import { getProjects } from '@/lib/wordpress';

export default async function ProjectPage() {
  const projects = await getProjects();

  return (
    <div>
      <Header />
      <main>
        
        <PortfolioGrid projects={projects} />
      </main>
      <Footer />
    </div>
  );
}