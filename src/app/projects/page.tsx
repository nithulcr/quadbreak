import Banner from '@/components/Banner';
import Header from '@/components/Header';
import PortfolioGrid from '@/components/PortfolioGrid';
import Footer from '@/components/Footer';

export default function ProjectPage() {
  return (
    <div>
      <Header />
      <main>
        <Banner title="ALL WORKS" backgroundImage="/images/bg-banner.jpg" />
        <PortfolioGrid />
      </main>
      <Footer />
    </div>
  );
}
