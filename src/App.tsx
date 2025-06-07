import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Work from './components/Work';
import ProcessTimeline from './components/ProcessTimeline';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CtaBanner from './components/CtaBanner';
import './styles/animations.css';

function App() {
  useEffect(() => {
    // Update document title
    document.title = 'Traionis | Websites, AI & Automation for Business Growth';
    
    // Optional: Add favicon
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.setAttribute('href', '/favicon.png');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <CtaBanner />
        <Services />
        <Work />
        <ProcessTimeline />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;