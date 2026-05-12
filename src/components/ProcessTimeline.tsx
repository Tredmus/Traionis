'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from './SectionHeading';
import SectionAccent from './SectionAccent';
import SectionEyebrow from './SectionEyebrow';

const STEPS = [
  {
    number: '01',
    title: 'Discovery Call',
    description:
      'A short conversation — what you sell, who your client is, what needs to happen online.',
  },
  {
    number: '02',
    title: 'Scope & Quote',
    description:
      "We come back with exactly what's included, what's not, a delivery timeline, and a price. If we're not the right fit, we'll tell you that too.",
  },
  {
    number: '03',
    title: 'Build & Review',
    description:
      'We build in stages with visible progress. You see the site before anything goes live - we iterate based on your feedback to make it right.',
  },
  {
    number: '04',
    title: 'Launch & Handover',
    description:
      'Hosting, domain, analytics, backups - whatever was agreed. You get all logins, all code, and a short doc explaining how to work with the system. Everything is yours.',
  },
];

function TimelineStep({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const isLeft = index % 2 === 0;

  const Card = (
    /* Perspective wrapper — this is what makes rotateY look 3D */
    <div style={{ perspective: '900px', width: '100%', maxWidth: '22rem' }}>
      <motion.div
        className="group cursor-default rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 shadow-xl shadow-black/25 ring-1 ring-inset ring-white/5 transition-colors duration-300 hover:border-main/25 hover:bg-white/[0.04] md:p-8"
        style={{
          transformOrigin: isLeft ? '100% 50%' : '0% 50%',
          transformStyle: 'preserve-3d',
        }}
        initial={{ rotateY: isLeft ? -90 : 90, opacity: 0 }}
        animate={inView ? { rotateY: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="block text-4xl font-extrabold text-main leading-none mb-3 select-none">
          {step.number}
        </span>
        <SectionHeading
          words={step.title.split(/\s+/)}
          size="compact"
          as="h3"
          className="mb-2"
          interactiveGroup
        />
        <p className="text-white/50 text-sm md:text-base leading-relaxed group-hover:text-white/70 transition-colors duration-300">
          {step.description}
        </p>
      </motion.div>
    </div>
  );

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_72px_1fr] items-start md:grid-cols-[1fr_88px_1fr]">

      {/* Left slot */}
      <div className="flex justify-end pr-5 md:pr-8 pt-2">
        {isLeft ? Card : null}
      </div>

      {/* Center node */}
      <div className="flex justify-center pt-2">
        <motion.div
          className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-main bg-[#0d1f3c] shadow-[0_0_18px_rgb(from_var(--color-main)_r_g_b_/_0.3)]"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.35, type: 'spring', stiffness: 320, damping: 22 }}
        >
          <span className="h-2 w-2 rounded-full bg-main" />
        </motion.div>
      </div>

      {/* Right slot */}
      <div className="flex justify-start pl-5 md:pl-8 pt-2">
        {!isLeft ? Card : null}
      </div>

    </div>
  );
}

export default function ProcessTimeline() {
  return (
    <section id="process" className="relative py-28 md:py-36">
      <SectionAccent variant="soft" />
      <div className="container relative z-10 mx-auto px-6">

        <div className="mb-20 text-center">
          <SectionEyebrow centered>The process</SectionEyebrow>
          <SectionHeading words={['How', 'It', 'Works']} tealDot />
          <motion.p
            className="mt-4 text-lg text-white/50 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Four steps. Clear timeline. No guesswork.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-4xl">

          {/* Spine */}
          <div
            className="absolute left-1/2 top-6 bottom-6 -translate-x-1/2 w-px pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgb(from var(--color-main) r g b / 0.7), rgb(from var(--color-main) r g b / 0.15) 85%, transparent)',
            }}
          />

          <div className="flex flex-col gap-16 md:gap-24">
            {STEPS.map((step, i) => (
              <TimelineStep key={step.number} step={step} index={i} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}