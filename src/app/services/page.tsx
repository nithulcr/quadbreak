import Banner from '@/components/Banner';
import HowWeWork from '@/components/HowWeWork';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


export default function ServicesPage() {
  return (
    <div>
      <Header />
      <main>
        <Banner title="My Skills" backgroundImage="/images/bg-banner.jpg" />
        <HowWeWork />

      </main>
      <Footer />
    </div>

  );
}
