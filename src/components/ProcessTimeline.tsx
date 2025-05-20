import React, { useEffect, useRef } from 'react';
import { Search, Map, Code, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <Search className="h-8 w-8 text-white" />,
    title: 'Discovery',
    description: 'We dive into your business goals and challenges to understand what success looks like for you.',
  },
  {
    icon: <Map className="h-8 w-8 text-white" />,
    title: 'Strategy',
    description: 'Blueprint a comprehensive growth plan that leverages technology to achieve your objectives.',
  },
  {
    icon: <Code className="h-8 w-8 text-white" />,
    title: 'Design & Build',
    description: 'Website & automation development with regular feedback loops to ensure we are on the right track.',
  },
  {
    icon: <Rocket className="h-8 w-8 text-white" />,
    title: 'Launch & Optimize',
    description: 'Go live, analyze performance data, and improve continuously to maximize ROI.',
  },
];

const ProcessTimeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-timeline');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    const steps = timelineRef.current?.querySelectorAll('.step');
    steps?.forEach((step) => observer.observe(step));
    
    return () => {
      steps?.forEach((step) => observer.unobserve(step));
    };
  }, []);
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A structured approach to deliver consistent results for your business.
          </p>
        </div>
        
        <div ref={timelineRef} className="relative">
          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2"></div>
            
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`step relative mb-20 flex opacity-0 ${
                  index % 2 === 0 ? 'justify-end' : ''
                }`}
                style={{ 
                  transitionDelay: `${index * 0.3}s`, 
                  transform: `translateY(40px)`,
                  transition: 'opacity 0.6s ease, transform 0.6s ease'
                }}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
                  <div className="mb-4">
                    <span className="inline-block text-2xl font-bold text-primary">0{index + 1}</span>
                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/3 z-10">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg">
                    {step.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Timeline */}
          <div className="md:hidden">
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200"></div>
            
            {steps.map((step, index) => (
              <div 
                key={index}
                className="step relative mb-12 pl-16 opacity-0"
                style={{ 
                  transitionDelay: `${index * 0.3}s`, 
                  transform: `translateY(40px)`,
                  transition: 'opacity 0.6s ease, transform 0.6s ease'
                }}
              >
                <div className="absolute left-0 top-0 transform -translate-y-1/4 z-10">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary shadow-lg">
                    {React.cloneElement(step.icon as React.ReactElement, { className: 'h-6 w-6 text-white' })}
                  </div>
                </div>
                
                <div className="mb-2">
                  <span className="inline-block text-xl font-bold text-primary">0{index + 1}</span>
                  <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        .animate-timeline {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
};

export default ProcessTimeline;