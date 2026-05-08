'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const SERVICES = [
  {
    number: '01',
    title: 'Websites',
    description:
      'Your online presence built to convert. Fast, responsive, and optimized — not just pretty. Visitors understand what you do in seconds and know how to reach you.',
    offerings: [
      'Business sites & landing pages',
      'Mobile-first, fast by default',
      'Built to convert visitors to contacts',
      'You own the code and the domain',
    ],
  },
  {
    number: '02',
    title: 'Web Applications',
    description:
      "If you can describe it, we can build it. Custom platforms, admin dashboards, client portals, booking systems — built on a modern stack you won't outgrow.",
    offerings: [
      'Custom platforms & dashboards',
      'Client portals & booking systems',
      'CRM, payment & API integrations',
      'Scalable architecture from day one',
    ],
  },
  {
    number: '03',
    title: 'Automations & AI',
    description:
      "Chatbots, voice agents, workflow automation. We connect your tools and add intelligence where it makes sense — not as a buzzword, but as a real time-saver.",
    offerings: [
      'AI chatbots & voice agents',
      'Workflow & notification automation',
      'Tool integrations where APIs exist',
      "Scoped per project — ask us what's possible",
    ],
  },
];

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });

  return (
    <motion.div
      ref={ref}
      className="relative bg-[#0a1628] border border-white/10 p-8 md:p-10 flex flex-col gap-5 cursor-default overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.12 * index, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Teal gradient sweep on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(0,196,180,0.08) 0%, transparent 60%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Always-on teal left border */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#00c4b4]" />

      {/* Top glow — stronger on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, #00c4b4, transparent)',
        }}
        animate={{ opacity: hovered ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
      />

      {/* Number — always full teal, scales on hover */}
      <motion.span
        className="text-6xl font-extrabold leading-none select-none text-[#00c4b4]"
        animate={{ scale: hovered ? 1.08 : 1, x: hovered ? 4 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {service.number}
      </motion.span>

      {/* Title — shifts slightly on hover */}
      <motion.h3
        className="text-2xl md:text-3xl font-extrabold text-white leading-tight"
        animate={{ x: hovered ? 4 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {service.title}
      </motion.h3>

      <p className="text-white/50 leading-relaxed text-base md:text-lg">
        {service.description}
      </p>

      <div className="border-t border-white/10" />

      <ul className="space-y-3 mt-auto">
        {service.offerings.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm md:text-base text-white/70">
            <motion.span
              className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00c4b4]"
              animate={{ scale: hovered ? 1.4 : 1 }}
              transition={{ duration: 0.2 }}
            />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

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
            {isLast && tealDot && (
              <span className="text-[#00c4b4]">.</span>
            )}
          </motion.span>
        );
      })}
    </h2>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-white py-24 md:py-32">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <div className="mb-16">
          <SectionHeading words={['What', 'We', 'Build']} tealDot />
          <motion.p
            className="mt-4 text-lg text-slate-500 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Three services. One way of working — clear scope, real deadlines,
            no surprises.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="shadow-[0_0_0_1px_rgba(10,22,40,0.08)]"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/0">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}