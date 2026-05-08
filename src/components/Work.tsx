'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

const PROJECTS = [
  {
    id: 'parkqui',
    title: 'ParkQui',
    number: '01',
    description:
      'Full-stack parking marketplace built for a 2,000-member Bulgarian community. Interactive maps, authentication, listing management, admin dashboard. Built and live.',
    services: ['Next.js', 'Supabase', 'TypeScript', 'Maps'],
    image: 'https://i.snipboard.io/v9mU34.jpg',
    liveUrl: 'https://park-qui.vercel.app/',
    imageLeft: true,
  },
  {
    id: 'cavitation',
    title: 'Cavitation BG',
    number: '02',
    description:
      'Landing page for a water filtration technology business. Clean messaging, fast load, conversion-focused structure.',
    services: ['Landing Page', 'Web Design'],
    image: 'https://i.snipboard.io/XWcL40.jpg',
    liveUrl: 'https://velvety-faun-415f97.netlify.app/',
    imageLeft: false,
  },
  {
    id: 'morion',
    title: 'Morion',
    number: '03',
    description:
      'Natural stone retailer. Luxury aesthetic, full product catalogue, content management ready for the client to update independently.',
    services: ['Website', 'Catalogue', 'Admin UI'],
    image: 'https://i.snipboard.io/ueD6gF.jpg',
    liveUrl: 'https://marvelous-malabi-482445.netlify.app/',
    imageLeft: true,
  },
];

function SectionHeading({ words, tealDot }: { words: string[]; tealDot?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });

  return (
    <h2
      ref={ref}
      className="font-extrabold text-[#0a1628] leading-[1.05]"
      style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
    >
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            className="inline-block mr-[0.22em] cursor-default"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 22,
              delay: 0.07 * i,
            }}
          >
            {word}
            {isLast && tealDot && <span className="text-[#00c4b4]">.</span>}
          </motion.span>
        );
      })}
    </h2>
  );
}

function ProjectRow({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  const imageVariant = {
    hidden: { opacity: 0, x: project.imageLeft ? -60 : 60 },
    visible: { opacity: 1, x: 0 },
  };

  const infoVariant = {
    hidden: { opacity: 0, x: project.imageLeft ? 60 : -60 },
    visible: { opacity: 1, x: 0 },
  };

  const ImageBlock = (
    <motion.div
      className="relative w-full lg:w-[55%] h-[280px] md:h-[360px] overflow-hidden bg-[#0a1628] flex-shrink-0"
      variants={imageVariant}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.01 }}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover object-top transition-transform duration-700 hover:scale-105"
        sizes="(max-width: 768px) 100vw, 55vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0a1628]/30 hover:bg-[#0a1628]/10 transition-colors duration-300" />

      {/* Teal corner accent */}
      <div className={`absolute top-0 ${project.imageLeft ? 'right-0' : 'left-0'} w-[3px] h-full bg-[#00c4b4]`} />
    </motion.div>
  );

  const InfoBlock = (
    <motion.div
      className="w-full lg:w-[45%] flex flex-col justify-center py-8 lg:py-0 lg:px-12"
      variants={infoVariant}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Number */}
      <span className="text-6xl font-extrabold text-[#00c4b4] leading-none mb-4 select-none">
        {project.number}
      </span>

      {/* Title */}
      <h3
        className="font-extrabold text-[#0a1628] leading-tight mb-4"
        style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-slate-500 leading-relaxed mb-6 text-base md:text-lg">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project.services.map((s) => (
          <span
            key={s}
            className="text-xs bg-[#0a1628] text-[#00c4b4] border border-[#0a1628]/20 px-3 py-1 font-semibold tracking-wide uppercase"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Link */}
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[#0a1628] font-bold text-sm border-b-2 border-[#00c4b4] pb-0.5 hover:text-[#00c4b4] transition-colors w-fit group"
      >
        Visit live site
        <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </a>
    </motion.div>
  );

  return (
    <div
      ref={ref}
      className={`flex flex-col lg:flex-row items-stretch gap-0 border-t border-slate-200 pt-12 pb-12 ${
        !project.imageLeft ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {ImageBlock}
      {InfoBlock}
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="bg-[#f4f5f7] py-24 md:py-32">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <div className="mb-16">
          <SectionHeading words={['Recent', 'Work']} tealDot />
          <motion.p
            className="mt-4 text-lg text-slate-500 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Live projects. Click to visit.
          </motion.p>
        </div>

        {/* Project rows */}
        <div className="flex flex-col">
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}