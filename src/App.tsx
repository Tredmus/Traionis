import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import TrustedBy from './components/TrustedBy';
import Services from './components/Services';
import ValueProps from './components/ValueProps';
import ProcessTimeline from './components/ProcessTimeline';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
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
        <PainPoints />
        <TrustedBy />
        <Services />
        <ValueProps />
        <ProcessTimeline />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;