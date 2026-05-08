'use client';

import { motion, useReducedMotion, useInView, useAnimationControls } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';

const PROBLEM_LINES = [
  'The agency that built it? Gone.',
  "You can't edit it yourself.",
  'And you\'re paying "maintenance" fees for nothing.',
];

// Split headline — last word contains the period separately so we can color it
const HEADLINE_PARTS = [
  { text: 'Most', teal: false },
  { text: 'websites', teal: false },
  { text: "don't", teal: false },
  { text: 'actually', teal: false },
  { text: 'work', teal: false, tealDot: true }, // period colored inline
];

function AnimatedWord({
  text,
  teal,
  tealDot,
  index,
  inView,
  reduceMotion,
}: {
  text: string;
  teal: boolean;
  tealDot?: boolean;
  index: number;
  inView: boolean;
  reduceMotion: boolean | null;
}) {
  const controls = useAnimationControls();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 280,
          damping: 22,
          delay: 0.07 * index,
        },
      });
    }
  }, [inView, controls, index]);

  const handleHover = useCallback(() => {
    if (reduceMotion || teal) return;
    setHovered(true);
    controls.start({
      y: -6,
      transition: { type: 'spring', stiffness: 500, damping: 12 },
    }).then(() => {
      controls.start({
        y: 0,
        transition: { type: 'spring', stiffness: 300, damping: 14 },
      });
    });
  }, [controls, reduceMotion, teal]);

  return (
    <motion.span
      className={`inline-block cursor-default select-none mr-[0.22em] ${teal ? 'text-[#00c4b4]' : 'text-[#0a1628]'}`}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={controls}
      onMouseEnter={handleHover}
      onMouseLeave={() => setHovered(false)}
    >
      {text}
      {tealDot ? <span className="text-[#00c4b4]">.</span> : null}
    </motion.span>
  );
}

function ProblemLine({ line, index }: { line: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });

  return (
    <motion.li
      ref={ref}
      className="flex gap-4 items-start cursor-default"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 * index, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.span
        className="shrink-0 font-black text-xl leading-tight mt-0.5"
        animate={{ color: hovered ? '#00c4b4' : 'rgba(255,255,255,0.4)' }}
        transition={{ duration: 0.2 }}
        aria-hidden
      >
        —
      </motion.span>
      <motion.span
        className="text-lg md:text-xl font-semibold leading-snug"
        animate={{ color: hovered ? '#ffffff' : 'rgba(255,255,255,0.8)' }}
        transition={{ duration: 0.2 }}
      >
        {line}
      </motion.span>
    </motion.li>
  );
}

export default function ProblemSection() {
  const reduceMotion = useReducedMotion();
  const headlineRef = useRef(null);
  const headlineInView = useInView(headlineRef, { once: true, margin: '-5% 0px' });
  const pivotRef = useRef(null);
  const pivotInView = useInView(pivotRef, { once: true, margin: '-5% 0px' });
  const bandRef = useRef(null);
  const bandInView = useInView(bandRef, { once: true, margin: '-5% 0px' });

  return (
    <section className="relative bg-white overflow-hidden">

      {/* TOP — white area with headline */}
      <div className="container mx-auto px-6 pt-28 pb-16 relative z-10">
        <div className="max-w-4xl">
          <h2
            ref={headlineRef}
            className="font-extrabold leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
            aria-label="Most websites don't actually work."
          >
            {HEADLINE_PARTS.map((part, i) => (
              <AnimatedWord
                key={i}
                text={part.text}
                teal={part.teal}
                tealDot={part.tealDot}
                index={i}
                inView={headlineInView}
                reduceMotion={reduceMotion}
              />
            ))}
          </h2>

          <motion.p
            className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            They look fine. But they don&apos;t load fast enough. They
            don&apos;t show up on Google. Visitors leave without doing
            anything.
          </motion.p>
        </div>
      </div>

      {/* ANGLED DARK NAVY BAND */}
      <div className="relative">
        {/* Top angled cut */}
        <div
          className="absolute top-0 left-0 right-0 h-16 bg-white z-10"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)' }}
        />

        <motion.div
          ref={bandRef}
          className="relative bg-[#0a1628] py-20"
          style={{ clipPath: 'polygon(0 4rem, 100% 0, 100% calc(100% - 4rem), 0 100%)' }}
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={bandInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">

              {/* Problem lines */}
              <ul className="space-y-6 mb-16">
                {PROBLEM_LINES.map((line, i) => (
                  <ProblemLine key={line} line={line} index={i} />
                ))}
              </ul>

              {/* Pivot */}
              <motion.div
                ref={pivotRef}
                className="border-t border-white/10 pt-10 text-center"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={pivotInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className="font-extrabold text-[#00c4b4]"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
                >
                  We build differently.
                </p>
                <p className="text-white/40 mt-3 text-lg">
                  Here&apos;s what that actually means.
                </p>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}