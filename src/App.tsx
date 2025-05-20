import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import Services from './components/Services';
import Work from './components/Work';
import ValueProps from './components/ValueProps';
import ProcessTimeline from './components/ProcessTimeline';
import Testimonials from './components/Testimonials';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';
import './styles/animations.css';

function App() {
  useEffect(() => {
    // Update document title
    document.title = 'Traionis | Online Business Growth, Delivered';
    
    // Optional: Add favicon
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.setAttribute('href', '/favicon.ico');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <TrustedBy />
        <Services />
        <Work />
        <ValueProps />
        <ProcessTimeline />
        <Testimonials />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}

export default App;