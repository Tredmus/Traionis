import Header from '@/src/components/Header';
import Hero from '@/src/components/Hero';
import ProblemSection from '@/src/components/ProblemSection';
import Services from '@/src/components/Services';
import WhyUs from '@/src/components/WhyUs';
import Work from '@/src/components/Work';
import ProcessTimeline from '@/src/components/ProcessTimeline';
import FAQ from '@/src/components/FAQ';
import Contact from '@/src/components/Contact';
import Footer from '@/src/components/Footer';
import BackToTop from '@/src/components/BackToTop';
import PageAtmosphere from '@/src/components/PageAtmosphere';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-navy">
      <PageAtmosphere />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Services />
          <Work />
          <ProblemSection />
          <ProcessTimeline />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </div>
  );
}
