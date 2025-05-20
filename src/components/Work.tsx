import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from './Button';

const projects = [
  {
    id: 1,
    title: 'Revamped SaaS Platform',
    result: '45% increase in signups',
    services: ['Web Development', 'Automation', 'Strategy'],
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    color: 'from-blue-600/80',
  },
  {
    id: 2,
    title: 'E-commerce Growth Overdrive',
    result: '2x online sales in 6 months',
    services: ['Website Redesign', 'Marketing Automation'],
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    color: 'from-teal-600/80',
  },
  {
    id: 3,
    title: 'AI Chatbot Deployment',
    result: 'Cut support tickets by 30%',
    services: ['AI Integration', 'Web Chatbot'],
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    color: 'from-purple-600/80',
  },
];

const Work: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="work" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Recent Work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how we've helped businesses like yours achieve remarkable results.
          </p>
        </div>
        
        <div className="relative">
          {/* Desktop View (Carousel) */}
          <div className="hidden md:block">
            <div className="flex transition-all duration-700 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100 / 3}%)` }}>
              {projects.map((project, index) => (
                <div key={project.id} className="w-1/3 flex-shrink-0 px-4">
                  <div className="group relative overflow-hidden rounded-xl shadow-lg h-96 transition-all duration-300 hover:shadow-xl">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.color} to-transparent opacity-90`}></div>
                    <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-lg font-medium mb-4">{project.result}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.services.map((service, i) => (
                          <span key={i} className="text-xs bg-white/20 px-3 py-1 rounded-full">
                            {service}
                          </span>
                        ))}
                      </div>
                      <a href="#" className="inline-flex items-center text-white group-hover:underline">
                        View Case Study 
                        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Carousel Controls */}
            <div className="flex justify-center mt-8 space-x-2">
              {projects.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-3 w-3 rounded-full transition-all ${
                    activeIndex === index ? 'bg-secondary w-10' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
          
          {/* Mobile View (Stacked) */}
          <div className="md:hidden space-y-8">
            {projects.map((project) => (
              <div key={project.id} className="relative overflow-hidden rounded-xl shadow-lg h-80">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.color} to-transparent opacity-90`}></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-base font-medium mb-3">{project.result}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.services.map((service, i) => (
                      <span key={i} className="text-xs bg-white/20 px-3 py-1 rounded-full">
                        {service}
                      </span>
                    ))}
                  </div>
                  <a href="#" className="inline-flex items-center text-white">
                    View Case Study 
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button variant="primary" size="lg">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Work;