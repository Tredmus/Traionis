import React, { useEffect, useRef } from 'react';
import Button from './Button';
import { ChevronRight } from 'lucide-react';
import FloatingDots from './FloatingDots';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateHero = () => {
      const elements = heroRef.current?.querySelectorAll('.animate-on-load');
      
      elements?.forEach((el, index) => {
        setTimeout(() => {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'translateY(0)';
        }, 200 * (index + 1));
      });
    };

    animateHero();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden"
    >
      {/* Background Animation - Light circuit pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-grid-pattern opacity-10"></div>
      </div>
      
      <FloatingDots />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 animate-on-load opacity-0 transition-all duration-700"
              style={{ transform: 'translateY(20px)' }}
            >
              Don't Fall Behind<br />
               <span className="text-primary">Crush</span> <br />
              The Competition
            </h1>
            <p 
              className="text-xl md:text-2xl text-gray-700 mb-8 animate-on-load opacity-0 transition-all duration-700 delay-200"
              style={{ transform: 'translateY(20px)' }}
            >
             Drive up your revenue and dominate  <br className="hidden md:block" />
              the online space. <br className="hidden md:block" />
              P.S. The website isnt really ready yet, I submited in hopes it would be.
            </p>
            
            <div 
              className="animate-on-load opacity-0 transition-all duration-700 delay-400"
              style={{ transform: 'translateY(20px)' }}
            >
              <Button size="lg" variant="primary" className="mr-4 bg-gradient-to-r from-primary to-secondary">
                Book a Free Strategy Call
                <ChevronRight className="ml-1 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="mt-4 md:mt-0">
                View Our Work
              </Button>
            </div>
          </div>
          
          <div 
            className="w-full lg:w-1/2 animate-on-load opacity-0 transition-all duration-700 delay-500"
            style={{ transform: 'translateY(20px)' }}
          >
            <div className="relative">
              <div className="bg-white p-6 rounded-2xl shadow-xl transform rotate-2 transition-all hover:rotate-0 duration-500">
                <img 
                  src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Business Growth Illustration" 
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-primary text-white p-4 rounded-lg shadow-lg transform rotate-6 transition-all hover:rotate-0 duration-500">
                <p className="font-bold text-xl">+42%</p>
                <p className="text-sm">Average Traffic Growth</p>
              </div>
              <div className="absolute -top-8 -right-8 bg-secondary text-white p-4 rounded-lg shadow-lg transform -rotate-3 transition-all hover:rotate-0 duration-500">
                <p className="font-bold text-xl">$13k+</p>
                <p className="text-sm">Client Revenue Generated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,53.3C840,43,960,21,1080,16C1200,11,1320,21,1380,26.7L1440,32L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;