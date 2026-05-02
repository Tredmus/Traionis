import Header from '@/src/components/Header';
import Hero from '@/src/components/Hero';
import CtaBanner from '@/src/components/CtaBanner';
import Services from '@/src/components/Services';
import WhyUs from '@/src/components/WhyUs';
import Work from '@/src/components/Work';
import ProcessTimeline from '@/src/components/ProcessTimeline';
import SecurityTrust from '@/src/components/SecurityTrust';
import IntegrationsMarquee from '@/src/components/IntegrationsMarquee';
import Testimonials from '@/src/components/Testimonials';
import FAQ from '@/src/components/FAQ';
import Contact from '@/src/components/Contact';
import Footer from '@/src/components/Footer';
import BackToTop from '@/src/components/BackToTop';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <CtaBanner />
        <Services />
        <WhyUs />
        <Work />
        <ProcessTimeline />
        <SecurityTrust />
        <IntegrationsMarquee />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
