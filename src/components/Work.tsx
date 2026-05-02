'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { FadeIn } from './motion/FadeIn';

const projects = [
  {
    id: 1,
    title: 'Cavitation System',
    result: 'Лендинг за инженерна технология — ясно послание, бързо зареждане.',
    services: ['Сайт', 'Лендинг'],
    image: 'https://i.snipboard.io/XWcL40.jpg',
    liveUrl: 'https://velvety-faun-415f97.netlify.app/',
  },
  {
    id: 2,
    title: 'Morion',
    result: 'Каталог с подготовка за управление на съдържание.',
    services: ['Сайт', 'Каталог', 'Админ UI'],
    image: 'https://i.snipboard.io/ueD6gF.jpg',
    liveUrl: 'https://marvelous-malabi-482445.netlify.app/',
  },
];

export default function Work() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(2);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      setItemsPerSlide(window.innerWidth < 768 ? 1 : 2);
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

  const visible = projects.slice(currentSlide * itemsPerSlide, currentSlide * itemsPerSlide + itemsPerSlide);

  return (
    <section id="work" className="py-20 md:py-28 bg-slate-50 border-t border-slate-200/80">
      <div className="container mx-auto px-6">
        <FadeIn className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-slate-900 mb-4">Реализации</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Работи, които са онлайн и се ползват — не макети за портфолио. Кликнете за живия сайт.
          </p>
        </FadeIn>

        <FadeIn delay={0.06}>
          <div className="relative max-w-6xl mx-auto">
            <div className="flex gap-6 justify-center transition-all duration-500">
              {visible.map((project) => (
                <div
                  key={project.id}
                  className={`w-full ${itemsPerSlide === 2 ? 'md:w-1/2' : ''} relative group overflow-hidden rounded-2xl shadow-section border border-slate-200/80 h-[22rem] md:h-[26rem]`}
                >
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300">
                    <h3 className="font-display font-bold text-xl mb-2">{project.title}</h3>
                    <p className="text-sm text-white/90 mb-4 leading-relaxed">{project.result}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.services.map((service) => (
                        <span key={service} className="text-xs bg-white/15 px-3 py-1 rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center font-semibold text-secondary hover:text-white transition-colors"
                    >
                      Към сайта <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {totalSlides > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
                  className="hidden md:flex absolute top-1/2 left-0 -translate-y-1/2 -translate-x-2 bg-white shadow-md rounded-full p-2.5 hover:bg-slate-50 transition z-10 border border-slate-200"
                  aria-label="Предишен слайд"
                >
                  <ChevronLeft className="h-6 w-6 text-slate-800" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
                  className="hidden md:flex absolute top-1/2 right-0 -translate-y-1/2 translate-x-2 bg-white shadow-md rounded-full p-2.5 hover:bg-slate-50 transition z-10 border border-slate-200"
                  aria-label="Следващ слайд"
                >
                  <ChevronRight className="h-6 w-6 text-slate-800" />
                </button>
              </>
            )}

            <div className="flex justify-center mt-8 gap-2">
              {projects.map((_, i) => {
                const slideIndex = Math.floor(i / itemsPerSlide);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goToSlide(i)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      slideIndex === currentSlide ? 'bg-primary scale-125' : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Слайд ${slideIndex + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
