import React, { useState } from 'react';
import { LineChart, Monitor, Bot } from 'lucide-react';

interface ServiceTab {
  id: string;
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
  offerings: string[];
}

const services: ServiceTab[] = [
  {
    id: 'growth',
    icon: <LineChart className="h-6 w-6" />,
    label: 'Marketing',
    title: 'Marketing That Turns Clicks Into Clients',
    description: `Bring in more clients and revenue with full-funnel marketing strategies designed to attract the right traffic, convert leads, and drive real growth. From paid campaigns to conversion optimization, everything is tailored to deliver results you can actually see - whether you're launching or scaling`,
    offerings: [
      'Market & Competitor Research',
      'Full-Funnel Campaign Strategy',
      'Paid Ads Management (Meta, Google & more)',
      'Analytics, Reporting & Optimization'
    ]
  },
  {
    id: 'web',
    icon: <Monitor className="h-6 w-6" />,
    label: 'Web Design',
    title: 'Websites That Look Great and Convert Even Better',
    description: `Get a beautiful new website, or transform your existing one into a machine that turns visitors into customers.
Built to look amazing on all devices, load fast, and customized to reflect your brand. From clean UI/UX to custom features, everything is focused on creating an experience that sells.`,
    offerings: [
      'Custom Website Development',
      'UI/UX Design',
      'Fully Responsive Across Devices',
      'Performance Optimization'
    ]
  },
  {
    id: 'automation',
    icon: <Bot className="h-6 w-6" />,
    label: 'Automation & AI',
    title: `Let AI Do the Work You Don't Want To Do`,
    description: `Too much work and not enough time?
Automate the boring stuff and reclaim your focus. From repetitive admin tasks to complex workflows, automation solutions save you hours and headaches - so you can scale faster and do what really matters.`,
    offerings: [
      'Workflow Automation',
      'AI Integration',
      'Process Optimization',
      'Custom Automation Solutions'
    ]
  }
];

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState('growth');

  const activeService = services.find(service => service.id === activeTab);

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Grow your business with:
          </h2>
          
          {/* Tabs */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex bg-white rounded-xl p-2 shadow-lg">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === service.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-white transform scale-105 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className={`${activeTab === service.id ? 'text-white' : 'text-primary'}`}>
                    {service.icon}
                  </span>
                  <span className={`ml-2 font-medium ${
                    activeTab === service.id ? 'font-semibold' : ''
                  }`}>
                    {service.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {activeService && (
              <div
                key={activeService.id}
                className="animate-fade-in"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {activeService.title}
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  {activeService.description}
                </p>
                <ul className="grid md:grid-cols-2 gap-4">
                  {activeService.offerings.map((offering, index) => (
                    <li
                      key={index}
                      className="flex items-center bg-gray-50 rounded-lg p-4 transition-all duration-300 hover:shadow-md"
                    >
                      <span className="h-2 w-2 bg-primary rounded-full mr-3"></span>
                      <span className="text-gray-800">{offering}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Services;