import React, { useState, useEffect } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(2);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 768) {
        setItemsPerSlide(1);
      } else {
        setItemsPerSlide(2);
      }
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  const totalSlides = Math.ceil(projects.length / itemsPerSlide);

  const goToSlide = (index: number) => {
    const slideIndex = Math.floor(index / itemsPerSlide);
    setCurrentSlide(slideIndex);
  };

  const getVisibleProjects = () => {
    const start = currentSlide * itemsPerSlide;
    return projects.slice(start, start + itemsPerSlide);
  };

  return (
    <section id="work" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Recent Work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how we've helped businesses like yours stand out.
          </p>
        </div>

        <div className="relative">
          <div className="flex gap-6 justify-center transition-all duration-500">
            {getVisibleProjects().map((project) => (
              <div
                key={project.id}
                className={`w-full ${
                  itemsPerSlide === 2 ? 'md:w-1/2' : 'w-full'
                } relative group overflow-hidden rounded-xl shadow-lg h-96 cursor-pointer`}
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

          {/* Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition z-10"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition z-10"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>

          {/* Dots: one per project */}
          <div className="flex justify-center mt-6 gap-2">
            {projects.map((_, i) => {
              const slideIndex = Math.floor(i / itemsPerSlide);
              return (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-3 h-3 rounded-full transition ${
                    slideIndex === currentSlide
                      ? 'bg-gray-800 scale-110'
                      : 'bg-gray-400 hover:bg-gray-600'
                  }`}
                ></button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
