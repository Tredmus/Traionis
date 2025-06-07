import React from 'react';
import { ExternalLink } from 'lucide-react';

//tags - Website, Product Catalog, Landing Page, CRM UI, Corporate, E-commerce

const projects = [
  {
    id: 1,
    title: 'Cavitation System',
    result: 'Clean landing page for innovative water tech',
    services: ['Website', 'Landing Page'],
    image: 'https://i.snipboard.io/XWcL40.jpg',
    liveUrl: 'https://velvety-faun-415f97.netlify.app/',
  },
  {
    id: 2,
    title: 'Morion',
    result: 'Stone catalog with CMS-ready layout',
    services: ['Website', 'Product Catalog', 'CRM UI'],
    image: 'https://snipboard.io/ueD6gF.jpg',
    liveUrl: 'https://marvelous-malabi-482445.netlify.app/',
  },
];

const Work: React.FC = () => {
  return (
    <section id="work" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Recent Work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how we've helped businesses like yours stand out.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative group overflow-hidden rounded-xl shadow-lg h-96 cursor-pointer"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 h-full w-full flex items-center transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out">
                <div className="bg-black/80 text-white p-6 w-full max-w-sm rounded-r-xl">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm font-medium mb-4">{project.result}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.services.map((service, i) => (
                      <span
                        key={i}
                        className="text-xs bg-white/20 px-3 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-white hover:underline"
                  >
                    Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;