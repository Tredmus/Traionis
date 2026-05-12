'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from './SectionHeading';
import SectionAccent from './SectionAccent';
import SectionEyebrow from './SectionEyebrow';
import SectionWaveDivider from './SectionWaveDivider';

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
    <div style={{ perspective: '900px', width: '100%', maxWidth: '22rem' }}>
      <motion.div
        className="group cursor-default rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-white/[0.01] p-5 shadow-xl shadow-black/30 ring-1 ring-inset ring-white/[0.06] transition-all duration-300 hover:border-main/30 hover:shadow-[0_0_48px_-16px_rgb(from_var(--color-accent)_r_g_b_/_0.22)] lg:p-6 xl:p-7 2xl:p-8"
        style={{
          transformOrigin: isLeft ? '100% 50%' : '0% 50%',
          transformStyle: 'preserve-3d',
        }}
        initial={{ rotateY: isLeft ? -90 : 90, opacity: 0 }}
        animate={inView ? { rotateY: 0, opacity: 1 } : {}}
        transition={{ duration: 0.15, delay: 0.1, ease: 'easeOut'}}
      >
        <span className="mb-3 block select-none bg-gradient-to-r from-main to-accent bg-clip-text text-3xl font-extrabold leading-none text-transparent 2xl:text-4xl">
          {step.number}
        </span>
        <SectionHeading
          words={step.title.split(/\s+/)}
          size="compact"
          as="h3"
          className="mb-2"
          interactiveGroup
        />
        <p className="text-sm leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/72">
          {step.description}
        </p>
      </motion.div>
    </div>
  );

  /* Single-column layout on mobile/tablet (< lg) */
  return (
    <div ref={ref}>
      {/* Mobile/tablet: left rail + card side-by-side */}
      <div className="flex items-start gap-4 lg:hidden">
        <div className="flex flex-col items-center pt-1">
          <motion.div
            className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-main bg-[#0a1528] shadow-[0_0_0_5px_rgb(from_var(--color-main)_r_g_b_/_0.12),0_0_20px_rgb(from_var(--color-accent)_r_g_b_/_0.3)] ring-2 ring-accent/35"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.35, type: 'spring', stiffness: 320, damping: 22 }}
          >
            <span className="h-2 w-2 rounded-full bg-gradient-to-br from-main to-accent" />
          </motion.div>
        </div>
        <div className="flex-1 pb-2" style={{ perspective: '900px' }}>
          <motion.div
            className="group cursor-default rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-white/[0.01] p-5 shadow-xl shadow-black/30 ring-1 ring-inset ring-white/[0.06] transition-all duration-300 hover:border-main/30"
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
          >
            <span className="mb-3 block select-none bg-gradient-to-r from-main to-accent bg-clip-text text-3xl font-extrabold leading-none text-transparent">
              {step.number}
            </span>
            <SectionHeading
              words={step.title.split(/\s+/)}
              size="compact"
              as="h3"
              className="mb-2"
              interactiveGroup
            />
            <p className="text-sm leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/72">
              {step.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Desktop: alternating two-column */}
      <div className="relative hidden lg:grid lg:grid-cols-[1fr_88px_1fr] items-start">
        <div className="flex justify-end pr-8 pt-2">
          {isLeft ? Card : null}
        </div>

        <div className="flex justify-center pt-2">
          <motion.div
            className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-main bg-[#0a1528] shadow-[0_0_0_6px_rgb(from_var(--color-main)_r_g_b_/_0.12),0_0_24px_rgb(from_var(--color-accent)_r_g_b_/_0.35)] ring-2 ring-accent/35"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.35, type: 'spring', stiffness: 320, damping: 22 }}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-main to-accent" />
          </motion.div>
        </div>

        <div className="flex justify-start pl-8 pt-2">
          {!isLeft ? Card : null}
        </div>
      </div>
    </div>
  );
}

export default function ProcessTimeline() {
  return (
    <section id="process" className="relative overflow-hidden pb-0 pt-16 md:pt-20 xl:pt-24 2xl:pt-32">
      <SectionAccent variant="tidal" />
      <div className="container relative z-10 mx-auto px-5 pb-8 sm:px-6 md:pb-10">

        <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10 xl:mb-12 2xl:mb-20">
          <SectionEyebrow centered>The process</SectionEyebrow>
          <SectionHeading words={['How', 'It', 'Works']} tealDot />
          <motion.p
            className="mt-4 text-base leading-relaxed text-white/55 2xl:text-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Four steps. Clear timeline. No guesswork.
          </motion.p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Soft “water column” glows */}
          <div
            className="pointer-events-none absolute -left-[8%] top-[10%] h-44 w-44 animate-sea-float rounded-full bg-main/20 blur-[52px] motion-reduce:animate-none md:h-56 md:w-56"
            style={{ animationDelay: '0s' }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-[6%] top-[42%] h-36 w-36 animate-sea-float-slow rounded-full bg-accent/25 blur-[48px] motion-reduce:animate-none md:h-48 md:w-48"
            style={{ animationDelay: '1.2s' }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-[8%] left-[20%] h-28 w-28 rounded-full bg-main/15 blur-[40px] md:h-36 md:w-36"
            aria-hidden
          />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.07] bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent py-7 shadow-[0_32px_90px_-36px_rgb(from_var(--color-accent)_r_g_b_/_0.18)] ring-1 ring-inset ring-white/[0.05] md:py-9 xl:py-11 2xl:py-16">
            {/* Shallow caustic shimmer */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                background:
                  'radial-gradient(ellipse 80% 40% at 50% 0%, rgb(from var(--color-main) r g b / 0.5), transparent 70%)',
              }}
              aria-hidden
            />

            <div className="relative px-2 sm:px-4">
              <div
                className="absolute left-[22px] top-8 bottom-8 z-0 w-[2px] rounded-full bg-white/[0.06] pointer-events-none sm:left-[26px] lg:left-1/2 lg:w-2 lg:-translate-x-1/2 lg:top-10 lg:bottom-10"
                aria-hidden
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgb(from var(--color-main) r g b / 0.95), rgb(from var(--color-accent) r g b / 0.75) 42%, rgb(from var(--color-main) r g b / 0.35) 78%, transparent)',
                  }}
                />
              </div>

              <div className="relative z-[1] flex flex-col gap-6 md:gap-8 lg:gap-12 xl:gap-14 2xl:gap-28">
                {STEPS.map((step, i) => (
                  <TimelineStep key={step.number} step={step} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      <SectionWaveDivider to="faq" />
    </section>
  );
}
