'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import SectionAccent from './SectionAccent';
import SectionEyebrow from './SectionEyebrow';
import SectionWaveDivider from './SectionWaveDivider';

const PROJECTS = [
  {
    id: 'parkqui',
    title: 'ParkQui',
    description:
      'Full-stack parking marketplace built for a 2,000-member Bulgarian community. Interactive maps, authentication, listing management, and admin dashboard. Built and live.',
    image: 'https://snipboard.io/Okgrty.jpg',
    liveUrl: 'https://park-qui.vercel.app/',
    url: 'park-qui.vercel.app',
  },
  {
    id: 'cavitation',
    title: 'Cavitation BG',
    description:
      'Landing page for a water filtration technology business. Clean messaging, fast load times, and a conversion-focused structure that guides visitors to act.',
    image: 'https://i.snipboard.io/XWcL40.jpg',
    liveUrl: 'https://velvety-faun-415f97.netlify.app/',
    url: 'cavitationbg.netlify.app',
  },
  {
    id: 'morion',
    title: 'Morion',
    description:
      'Natural stone retailer with a luxury aesthetic, full product catalogue, and a content management setup so the client can update it independently.',
    image: 'https://i.snipboard.io/ueD6gF.jpg',
    liveUrl: 'https://marvelous-malabi-482445.netlify.app/',
    url: 'morion.netlify.app',
  },
];

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

export default function Work() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + PROJECTS.length) % PROJECTS.length);
  };

  const project = PROJECTS[index];

  return (
    <section id="work" className="relative overflow-hidden pb-0 pt-16 md:pt-20 xl:pt-24 2xl:pt-32">
      <SectionAccent variant="lagoon" />
      <div className="container relative z-10 mx-auto px-5 pb-8 sm:px-6 md:pb-10">

        <div className="mb-8 md:mb-10 xl:mb-12 2xl:mb-16">
          <SectionEyebrow>Selected work</SectionEyebrow>
          <SectionHeading words={['Recent', 'Work']} tealDot />
          <motion.p
            className="mt-4 text-base text-white/60 max-w-xl leading-relaxed 2xl:text-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Live projects. Click to visit.
          </motion.p>
        </div>

        {/* Slideshow card */}
        <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.02] shadow-2xl shadow-black/30 ring-1 ring-inset ring-white/5">
          <div className="flex flex-col lg:flex-row lg:items-stretch">

            {/* Left — browser mockup + screenshot */}
            <div className="w-full lg:w-[58%] shrink-0 flex flex-col">
              {/* Browser bar */}
              <div className="flex items-center gap-3 border-b border-white/[0.07] bg-[#080f1e] px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={project.id + '-url'}
                    className="mx-auto flex items-center gap-2 rounded-full bg-white/[0.05] px-4 py-1 text-xs text-white/30 font-mono"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-main" />
                    {project.url}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Screenshot — 16:9 */}
              <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={project.id}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                    <div className="absolute inset-0 bg-navy/20" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right — info panel */}
            <div className="flex w-full flex-col justify-between border-t border-white/10 p-4 sm:p-5 lg:border-l lg:border-t-0 lg:p-6 xl:p-7 2xl:p-10 lg:w-[42%]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.id + '-info'}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-6 flex-1"
                >
                  <h3
                    className="font-extrabold text-white leading-tight"
                    style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)' }}
                  >
                    {project.title}
                  </h3>

                  <p className="text-white/55 leading-relaxed text-sm md:text-base 2xl:text-lg">
                    {project.description}
                  </p>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-main/40 bg-main/10 px-5 py-2.5 text-sm font-bold text-white transition-all hover:border-main/70 hover:bg-main/20 hover:text-main"
                  >
                    Visit live site
                    <ExternalLink className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="mt-7 flex items-center justify-between md:mt-8 xl:mt-10">
                <div className="flex gap-2">
                  {PROJECTS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === index ? 'w-6 bg-main' : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Go to project ${i + 1}`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => go(-1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/50 transition-all hover:border-main/40 hover:bg-main/10 hover:text-main"
                    aria-label="Previous project"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => go(1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/50 transition-all hover:border-main/40 hover:bg-main/10 hover:text-main"
                    aria-label="Next project"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-9 flex justify-center md:mt-10 xl:mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-bold text-white/80 transition-all duration-200 hover:border-main/50 hover:text-main"
          >
            Like what you see? Let&apos;s talk →
          </a>
        </motion.div>

      </div>

      <SectionWaveDivider to="problem" />
    </section>
  );
}