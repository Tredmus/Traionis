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
    icon: <LineChart className="h-4 w-4 sm:h-5 sm:w-5" />,
    label: 'Marketing',
    title: 'Marketing That Turns Clicks Into Clients',
    description: `Bring in more clients and revenue with full-funnel marketing strategies designed to attract the right traffic, convert leads, and drive real growth.`,
    offerings: [
      'Market & Competitor Research',
      'Full-Funnel Campaign Strategy',
      'Paid Ads Management',
      'Analytics, Reporting & Optimization',
    ],
  },
  {
    id: 'web',
    icon: <Monitor className="h-4 w-4 sm:h-5 sm:w-5" />,
    label: 'Web Design',
    title: 'Websites That Look Great and Convert Even Better',
    description: `Get a beautiful new website, or transform your existing one into a machine that turns visitors into customers. Built to look amazing on all devices and optimized to perform.`,
    offerings: [
      'Custom Website Development',
      'UI/UX Design',
      'Fully Responsive Across Devices',
      'Performance Optimization',
    ],
  },
  {
    id: 'automation',
    icon: <Bot className="h-4 w-4 sm:h-5 sm:w-5" />,
    label: 'Automation & AI',
    title: `Let AI Do the Work You Don't Want To Do`,
    description: `Automate the boring stuff and reclaim your focus. From admin tasks to complex workflows, automation saves you time and helps you scale.`,
    offerings: [
      'Workflow Automation',
      'AI Integration',
      'Process Optimization',
      'Custom Automation Solutions',
    ],
  },
];

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState('web');
  const activeService = services.find((s) => s.id === activeTab);

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8">
            We can help you with:
          </h2>

          {/* Tabs */}
          <div className="flex justify-center mb-6 px-2">
            <div className="flex flex-wrap justify-center bg-white rounded-xl p-2 gap-2 shadow-[0_0_15px_rgba(0,0,0,0.2)] w-full max-w-2xl">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 text-sm sm:text-base ${
                    activeTab === service.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-white transform scale-[1.03] shadow-md'
                      : 'text-gray-600 hover:text-gray-900 bg-white'
                  }`}
                >
                  <span className={`${activeTab === service.id ? 'text-white' : 'text-primary'}`}>
                    {service.icon}
                  </span>
                  <span className={`${activeTab === service.id ? 'font-semibold' : 'font-medium'}`}>
                    {service.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.2)] p-6 sm:p-8 md:p-12">
            {activeService && (
              <div key={activeService.id} className="animate-fade-in">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  {activeService.title}
                </h2>
                <p className="text-base sm:text-lg text-gray-600 mb-8">
                  {activeService.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeService.offerings.map((offering, index) => (
                    <li
                      key={index}
                      className="flex items-center bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-4 transition-all duration-300 hover:shadow-md"
                    >
                      <span className="h-2 w-2 bg-white rounded-full mr-3"></span>
                      <span>{offering}</span>
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
