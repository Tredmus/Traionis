import React, { useEffect, useRef } from 'react';

// Client logo data
const clients = [
  { name: 'TechNova', value: null },
  { name: 'ACME Co.', value: null },
  { name: 'FusionLabs', value: null },
  { name: 'GrowthGenius', value: null },
  { name: 'Velocitron', value: null },
];

// Stats data
const stats = [
  { value: 42, label: 'Avg. Traffic Growth', suffix: '%', prefix: '+' },
  { value: 13, label: 'Client Revenue Generated', suffix: 'k+', prefix: '$' },
  { value: 1200, label: 'Hours Automated', suffix: '+', prefix: '' },
  { value: 96, label: 'Client Satisfaction', suffix: '%', prefix: '' },
];

const TrustedBy: React.FC = () => {
  const countersRef = useRef<HTMLDivElement>(null);
  const isCounterAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isCounterAnimated.current) {
        animateCounters();
        isCounterAnimated.current = true;
      }
    }, { threshold: 0.1 });

    if (countersRef.current) {
      observer.observe(countersRef.current);
    }

    return () => {
      if (countersRef.current) {
        observer.unobserve(countersRef.current);
      }
    };
  }, []);

  const animateCounters = () => {
    const counters = document.querySelectorAll('.counter-value');
    
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target') || '0', 10);
      let count = 0;
      
      const updateCounter = () => {
        const increment = target / 50; // Speed of counting
        
        if (count < target) {
          count += increment;
          counter.textContent = Math.floor(count).toString();
          setTimeout(updateCounter, 20);
        } else {
          counter.textContent = target.toString();
        }
      };
      
      updateCounter();
    });
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div ref={countersRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="flex items-center justify-center text-3xl md:text-4xl font-bold text-primary">
                <span>{stat.prefix}</span>
                <span className="counter-value" data-target={stat.value}>0</span>
                <span>{stat.suffix}</span>
              </p>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
        
        {/* <div className="mt-16">
          <p className="text-center text-gray-500 text-sm uppercase tracking-wider mb-8">Trusted by companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {clients.map((client, index) => (
              <div key={index} className="grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                <p className="font-bold text-xl text-gray-400">{client.name}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default TrustedBy;