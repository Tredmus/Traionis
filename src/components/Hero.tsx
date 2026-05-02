'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Button from './Button';
import FloatingDots from './FloatingDots';

const PILLARS = [
  { title: 'Ясна оферта', desc: 'Цена и обем преди да платите нещо сериозно.' },
  { title: 'Собственост върху кода', desc: 'Вие държите репото и достъпа — не някой „затворен“ конструктор.' },
  { title: 'Срокове, не обещания', desc: 'План с етапи. Ако закъснеем, говорим открито защо.' },
  { title: 'След пускане', desc: 'Поддръжка и развитие, когато бизнесът ви поиска следваща стъпка.' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const yVisual = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 80]);
  const yText = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 36]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);

  return (
    <section
      ref={sectionRef}
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-slate-50 via-white to-white overflow-hidden"
    >
      <motion.div className="absolute inset-0 bg-grid-pattern opacity-[0.35]" style={{ opacity: opacityBg }} />
      <FloatingDots />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-10 lg:items-stretch">
          <motion.div className="w-full lg:w-[52%] lg:pr-4" style={{ y: yText }}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              За български фирми
            </p>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-[3.5rem] leading-[1.05] text-slate-900 mb-6">
              Уебсайт и софтуер,
              <span className="block text-primary">които вършат работа.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed mb-8">
              Правим сайтове и уеб приложения за местен бизнес — без празни фрази и без „магически“ пакети.
              Код, който държите вие. Комуникация на български. Изпълнение като при строител: план, изпълнение,
              приемане.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary border-0 shadow-lg">
                  Опишете проекта си
                  <ChevronRight className="ml-1 h-5 w-5" aria-hidden />
                </Button>
              </a>
              <a href="#work">
                <Button size="lg" variant="outline" className="border-slate-300 text-slate-800">
                  Вижте реализациите
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div className="w-full lg:w-[48%] relative" style={{ y: yVisual }}>
            <div className="relative mx-auto max-w-xl">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-3xl blur-2xl" />
              <div className="relative bg-white p-3 md:p-5 rounded-2xl shadow-section border border-slate-200/80 rotate-1 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="https://snipboard.io/v9mU34.jpg"
                  alt=""
                  width={900}
                  height={700}
                  className="rounded-xl w-full h-auto"
                  priority
                />
              </div>
              <div className="absolute -bottom-5 -left-2 md:-left-4 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs md:text-sm max-w-[200px]">
                <p className="font-display font-bold text-secondary text-base md:text-lg">Стек</p>
                <p className="text-slate-200 mt-0.5">Next.js · TypeScript · стабилен хостинг</p>
              </div>
              <div className="absolute -top-4 -right-2 md:-right-4 bg-white border border-slate-200 px-4 py-3 rounded-xl shadow-lg text-xs md:text-sm max-w-[220px]">
                <p className="font-display font-bold text-primary">База в България</p>
                <p className="text-slate-600 mt-0.5">Договор, фактура, ясни отговорници.</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 md:mt-20 border border-slate-200/80 rounded-2xl bg-white/90 backdrop-blur-sm shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            {PILLARS.map((p) => (
              <div key={p.title} className="p-6 md:p-8 hover:bg-slate-50/80 transition-colors">
                <p className="font-display font-bold text-slate-900 text-lg">{p.title}</p>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" className="w-full text-white" aria-hidden>
          <path
            fill="currentColor"
            d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,53.3C840,43,960,21,1080,16C1200,11,1320,21,1380,26.7L1440,32L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z"
          />
        </svg>
      </div>
    </section>
  );
}
