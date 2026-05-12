'use client';

import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import SectionAccent from './SectionAccent';
import SectionWaveDivider from './SectionWaveDivider';
import SectionEyebrow from './SectionEyebrow';
import SectionHeading from './SectionHeading';

const TERMINAL_LINES = [
  { text: '$ npx create-traionis-app my-project', color: 'text-white/70', delay: 0 },
  { text: '✓ Scaffolding Next.js 14 + TypeScript', color: 'text-main', delay: 600 },
  { text: '✓ Setting up Tailwind + design system', color: 'text-main', delay: 1200 },
  { text: '✓ Configuring Supabase auth & database', color: 'text-main', delay: 1900 },
  { text: '✓ Adding SEO, sitemap, analytics', color: 'text-main', delay: 2600 },
  { text: '$ npm run build', color: 'text-white/70', delay: 3400 },
  { text: '  Compiled successfully in 2.3s', color: 'text-white/40', delay: 3900 },
  { text: '$ vercel deploy --prod', color: 'text-white/70', delay: 4600 },
  { text: '✓ Live at your-domain.com', color: 'text-main', delay: 5400 },
  { text: '  Your site is yours. Forever.', color: 'text-white/40', delay: 5900 },
];

function Terminal({ inView }: { inView: boolean }) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [cursorLine, setCursorLine] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView || started) return;
    setStarted(true);

    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
        setCursorLine(i);
      }, line.delay);
    });
  }, [inView, started]);

  // Restart loop
  useEffect(() => {
    if (!started) return;
    const total = TERMINAL_LINES[TERMINAL_LINES.length - 1].delay + 2000;
    const timer = setTimeout(() => {
      setVisibleLines([]);
      setCursorLine(0);
      setStarted(false);
    }, total);
    return () => clearTimeout(timer);
  }, [started]);

  return (
    <div className="relative w-full rounded-2xl border border-white/10 bg-[#080f1e] shadow-2xl shadow-black/40 overflow-hidden">
      {/* Terminal header bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.07] bg-white/[0.03]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-white/30 font-mono">bash — traionis-build</span>
      </div>

      {/* Terminal body */}
      <div className="p-4 min-h-[200px] font-mono text-[11px] leading-5 sm:p-5 sm:min-h-[240px] sm:text-xs sm:leading-6 xl:min-h-[270px] 2xl:min-h-[320px]">
        {TERMINAL_LINES.map((line, i) => (
          <div key={i} className="flex items-center gap-1">
            <span
              className={`transition-opacity duration-300 ${visibleLines.includes(i) ? 'opacity-100' : 'opacity-0'} ${line.color}`}
            >
              {line.text}
            </span>
            {/* Blinking cursor on current line */}
            {visibleLines.includes(i) && cursorLine === i && !visibleLines.includes(i + 1) && (
              <motion.span
                className="inline-block w-[2px] h-[1.1em] bg-main ml-0.5 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProblemSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, margin: '-10% 0px' });

  return (
    <section ref={sectionRef} className="relative overflow-hidden pb-0 pt-16 md:pt-20 xl:pt-24 2xl:pt-32">
      <SectionAccent variant="teal" />
      <div className="container relative z-10 mx-auto px-5 pb-8 sm:px-6 md:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-14 2xl:gap-24 items-center">

          {/* Left — copy */}
          <div>
            <SectionEyebrow>How we work</SectionEyebrow>

            <SectionHeading
              words={['Built', 'properly.']}
              secondLine={{ words: ['From', 'day', 'one'], tealDot: true }}
              className="mb-6"
            />

            <motion.p
              className="text-white/55 text-base leading-relaxed mb-6 md:mb-8 2xl:text-lg"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              No templates. No shortcuts. Every project starts with a clear
              scope, gets built on a modern stack, and ships with clean code
              that you own entirely.
            </motion.p>

            <motion.ul
              className="space-y-3"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {[
                'Modern stack — Next.js, TypeScript, Supabase',
                'You get all the code and all the logins',
                'Clear scope agreed before any work starts',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/70">
                  <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-main" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right — terminal */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Terminal inView={inView} />
          </motion.div>

        </div>
      </div>

      <SectionWaveDivider to="process" />
    </section>
  );
}