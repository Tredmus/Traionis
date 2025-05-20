import React from 'react';
import { TrendingUp, Lightbulb, Users } from 'lucide-react';

const values = [
  {
    icon: <TrendingUp className="h-12 w-12 text-blue-600" />,
    title: 'Growth-Focused',
    description: 'Everything we build is aimed at increasing your revenue and efficiency.',
  },
  {
    icon: <Lightbulb className="h-12 w-12 text-blue-600" />,
    title: 'Innovation-Driven',
    description: 'We leverage AI and the latest tech so you stay ahead of the curve.',
  },
  {
    icon: <Users className="h-12 w-12 text-blue-600" />,
    title: 'Partner Approach',
    description: 'Consider us part of your team – we strategize and win together.',
  },
];

const ValueProps: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Element - Decorative Circuit Pattern */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
        <div className="w-full h-full bg-circuit-pattern"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Traionis
          </h2>
          <p className="text-xl text-gray-600">
            We're not just another agency. We're your strategic partner in leveraging technology for business growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="mb-6">
                {value.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-8 bg-gradient-to-r from-primary to-secondary rounded-2xl text-white">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0 md:w-2/3">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Ready to transform your online presence?</h3>
              <p className="text-blue-100">Our team is ready to help you achieve your business goals.</p>
            </div>
            <a 
              href="#contact" 
              className="inline-block bg-white text-secondary hover:bg-blue-50 transition-colors px-8 py-3 rounded-full font-medium"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProps;