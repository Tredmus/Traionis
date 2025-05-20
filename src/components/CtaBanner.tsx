import React from 'react';
import Button from './Button';

const CtaBanner: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <path d="M169.7,-208.9C215.2,-166,244.8,-110.2,259.3,-52.5C273.9,5.3,273.3,65,250.5,115.7C227.7,166.3,182.8,207.9,129.4,232C76,256.1,14.1,262.7,-39.8,247.9C-93.7,233.1,-139.5,196.9,-184.4,153.3C-229.3,109.7,-273.2,58.7,-282.8,-0.2C-292.4,-59.1,-267.6,-126,-224.7,-171.1C-181.7,-216.2,-120.5,-239.5,-61.2,-242.1C-1.9,-244.7,56.4,-226.7,111.1,-215.5C165.9,-204.3,219.2,-200,258.1,-169.6C297,-139.3,321.6,-82.9,328.1,-23.9C334.7,35.1,323.3,96.8,295.9,149.9C268.5,203.1,225.1,247.8,171.1,265.8C117.2,283.8,52.7,275,2.1,270.8C-48.4,266.6,-85,266.9,-135.2,255.6C-185.3,244.2,-249,221.2,-270.8,178.5C-292.5,135.8,-272.4,73.4,-271.9,13.1C-271.4,-47.2,-290.6,-106.5,-270.3,-149.3C-250,-192.1,-190.2,-218.5,-134.9,-236.9C-79.6,-255.3,-28.7,-265.7,16.7,-257C62,-248.3,101.7,-220.6,140.1,-198.3" transform="translate(400 400)" fill="none" strokeWidth="12" stroke="#ffffff" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to accelerate your business growth?
          </h2>
          <p className="text-xl md:text-2xl text-secondary mb-10">
            Let's build something amazing together using web and AI innovation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-primary/5 border-2 border-white hover:shadow-lg"
            >
              Get Started with a Free Consultation
            </Button>
            <Button 
              size="lg" 
              className="bg-transparent border-2 border-white text-white hover:bg-white/10"
            >
              View Our Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;