import React from 'react';
import { Monitor, Notebook as Robot, LineChart } from 'lucide-react';
import Button from './Button';

const services = [
  {
    icon: <Monitor className="h-12 w-12 text-primary" />,
    title: 'Web Design & Development',
    description: 'Stunning, conversion-optimized websites for your brand. We build sites that not only look great but drive results.',
    features: ['Responsive Design', 'SEO Optimization', 'UX-Focused Development'],
  },
  {
    icon: <Robot className="h-12 w-12 text-primary" />,
    title: 'AI & Workflow Automation',
    description: 'Intelligent bots and workflows that save you time and money. Let AI handle repetitive tasks while you focus on growth.',
    features: ['Custom Chatbots', 'Process Automation', 'Integration with APIs'],
  },
  {
    icon: <LineChart className="h-12 w-12 text-primary" />,
    title: 'Growth Strategy & Support',
    description: 'Data-driven marketing and business development that scales with you. Turn insights into actionable growth plans.',
    features: ['Traffic Analysis', 'Conversion Optimization', 'Ongoing Support'],
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to grow your business online, delivered by experts who care about your success.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" size="md">
                Learn More
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button variant="primary" size="lg" className="mx-auto">
            See All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;