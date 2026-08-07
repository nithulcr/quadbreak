import Banner from '@/components/Banner';
import Header from '@/components/Header';
import ContactForm from '@/components/ContactPage';

import Footer from '@/components/Footer';


export default function ContactPage() {
  return (
    <div>
      <Header />
      <main>
        <Banner title="Contact Us" backgroundImage="/images/bg-banner.jpg" />
        <ContactForm />


      </main>
      <Footer />
    </div>

  );
}
