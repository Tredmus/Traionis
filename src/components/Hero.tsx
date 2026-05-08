'use client';

import { useEffect, useCallback, useState, type CSSProperties } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

const STATS = [
  { value: '10+', label: 'Projects Delivered' },
  { value: '3+', label: 'Years Building' },
  { value: '100%', label: 'Code Ownership' },
  { value: '0', label: 'Hidden Costs' },
];

const HEADLINE_LINES = [
  { text: 'Built right.', teal: false },
  { text: 'Delivered on time.', teal: true },
  { text: 'Yours to keep.', teal: false },
];

// Fixed dots — no Math.random() to avoid hydration mismatch (sizes in px, visibly readable)
const DOTS = [
  { id: 0, size: 5, left: 8, top: 15, duration: 12, delay: 0 },
  { id: 1, size: 4, left: 23, top: 72, duration: 9, delay: 1.5 },
  { id: 2, size: 6, left: 41, top: 33, duration: 14, delay: 0.8 },
  { id: 3, size: 4, left: 67, top: 58, duration: 11, delay: 2.1 },
  { id: 4, size: 5, left: 85, top: 22, duration: 10, delay: 0.3 },
  { id: 5, size: 4, left: 92, top: 78, duration: 13, delay: 1.8 },
  { id: 6, size: 5, left: 15, top: 88, duration: 8, delay: 0.6 },
  { id: 7, size: 4, left: 55, top: 12, duration: 15, delay: 3.0 },
  { id: 8, size: 6, left: 73, top: 90, duration: 11, delay: 1.2 },
  { id: 9, size: 4, left: 32, top: 50, duration: 9, delay: 2.5 },
  { id: 10, size: 5, left: 48, top: 80, duration: 12, delay: 0.4 },
  { id: 11, size: 4, left: 79, top: 40, duration: 10, delay: 1.9 },
  { id: 12, size: 6, left: 5, top: 55, duration: 14, delay: 0.7 },
  { id: 13, size: 4, left: 62, top: 28, duration: 8, delay: 2.8 },
  { id: 14, size: 5, left: 88, top: 62, duration: 13, delay: 1.1 },
  { id: 15, size: 4, left: 19, top: 38, duration: 11, delay: 3.5 },
  { id: 16, size: 6, left: 95, top: 10, duration: 9, delay: 0.9 },
  { id: 17, size: 4, left: 38, top: 95, duration: 12, delay: 2.2 },
  { id: 18, size: 5, left: 71, top: 5, duration: 10, delay: 1.6 },
  { id: 19, size: 4, left: 50, top: 65, duration: 15, delay: 0.2 },
];

const FLOATING_CARDS = [
  {
    id: 'card1',
    style: { left: '4%', top: '22%' },
    animDelay: '0s',
    animDuration: '5s',
    content: (
      <div className="bg-[#0f2236] border border-white/10 rounded-xl p-3 w-48 shadow-2xl">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-[#00c4b4]" />
          <span className="text-white/60 text-xs">ParkQui</span>
        </div>
        <div className="text-white text-xs font-semibold mb-1">Parking Marketplace</div>
        <div className="flex gap-1 flex-wrap">
          {['Next.js', 'Supabase', 'Maps'].map(t => (
            <span key={t} className="text-[10px] bg-white/10 text-white/60 px-1.5 py-0.5 rounded">{t}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'card2',
    style: { right: '4%', top: '18%' },
    animDelay: '1.5s',
    animDuration: '6s',
    content: (
      <div className="bg-[#0f2236] border border-white/10 rounded-xl p-3 w-44 shadow-2xl">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-green-400 text-xs font-semibold">Delivered ✓</span>
        </div>
        <div className="text-white/60 text-xs">Project launched on schedule</div>
        <div className="mt-2 text-white text-xs font-bold">Morion Stones</div>
      </div>
    ),
  },
  {
    id: 'card3',
    style: { left: '5%', bottom: '28%' },
    animDelay: '0.8s',
    animDuration: '7s',
    content: (
      <div className="bg-[#0f2236] border border-white/10 rounded-xl p-3 w-44 shadow-2xl font-mono">
        <div className="text-[10px] text-white/40 mb-1">stack.ts</div>
        <div className="text-[11px]">
          <span className="text-[#00c4b4]">const</span>
          <span className="text-white"> stack </span>
          <span className="text-white/40">= [</span>
        </div>
        <div className="text-[11px] pl-2 text-green-400">&apos;Next.js&apos;,</div>
        <div className="text-[11px] pl-2 text-green-400">&apos;TypeScript&apos;,</div>
        <div className="text-[11px] text-white/40">]</div>
      </div>
    ),
  },
  {
    id: 'card4',
    style: { right: '4%', bottom: '26%' },
    animDelay: '2s',
    animDuration: '5.5s',
    content: (
      <div className="bg-[#0f2236] border border-white/10 rounded-xl p-3 w-48 shadow-2xl">
        <div className="text-white/40 text-[10px] mb-1 uppercase tracking-wider">Code ownership</div>
        <div className="text-white text-sm font-bold mb-2">100% yours</div>
        <div className="w-full bg-white/10 rounded-full h-1.5">
          <div className="bg-[#00c4b4] h-1.5 rounded-full w-full" />
        </div>
      </div>
    ),
  },
];

function AnimatedChar({
  char, index, teal, onHover,
}: {
  char: string; index: number; teal: boolean; onHover: (i: number) => void;
}) {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 15,
        delay: 0.1 + index * 0.03,
      },
    });
  }, [controls, index]);

  const handleHover = useCallback(() => {
    onHover(index);
    controls.start({
      y: -10,
      transition: { type: 'spring', stiffness: 700, damping: 10 },
    }).then(() => {
      controls.start({
        y: 0,
        transition: { type: 'spring', stiffness: 400, damping: 12 },
      });
    });
  }, [controls, index, onHover]);

  if (char === ' ') return <span className="inline-block">&nbsp;</span>;

  return (
    <motion.span
      className={`inline-block cursor-default select-none ${teal ? 'text-[#00c4b4]' : 'text-white'}`}
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      onMouseEnter={handleHover}
    >
      {char}
    </motion.span>
  );
}

function AnimatedLine({ text, teal, charOffset, onCharHover }: {
  text: string; teal: boolean; charOffset: number; onCharHover: (i: number) => void;
}) {
  return (
    <div aria-label={text} className="block">
      {text.split('').map((char, i) => (
        <AnimatedChar
          key={i}
          char={char}
          index={charOffset + i}
          teal={teal}
          onHover={onCharHover}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleCharHover = useCallback((_i: number) => {}, []);

  const charOffsets = HEADLINE_LINES.reduce<number[]>((acc, line, i) => {
    const prev = i === 0 ? 0 : acc[i - 1] + HEADLINE_LINES[i - 1].text.length;
    return [...acc, prev];
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0a1628] flex flex-col items-center justify-center overflow-hidden">

      {/* CSS for card float — injected once */}
      <style>{`
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float-card {
          animation: floatCard var(--dur, 5s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }
      `}</style>

      {/* Teal glow — behind floating dots so particles stay visible */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#00c4b4]/8 blur-[140px]" />
      </div>

      {/* Dot grid background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Floating particles — above glow; fixed positions = SSR-safe */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {DOTS.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute rounded-full bg-[#00c4b4] shadow-[0_0_10px_rgba(0,196,180,0.55)]"
            style={{
              width: dot.size,
              height: dot.size,
              left: `${dot.left}%`,
              top: `${dot.top}%`,
            }}
            initial={{ opacity: 0.45, y: 0 }}
            animate={{ y: [-12, 12], opacity: [0.35, 0.95, 0.35] }}
            transition={{
              duration: dot.duration,
              delay: dot.delay,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Floating cards — xl only, CSS animated for smoothness */}
      {mounted && (
        <div className="hidden xl:block">
          {FLOATING_CARDS.map((card) => (
            <motion.div
              key={card.id}
              className="absolute z-10 float-card"
              style={
                {
                  ...card.style,
                  '--dur': card.animDuration,
                  '--delay': card.animDelay,
                } as CSSProperties & { '--dur': string; '--delay': string }
              }
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: parseFloat(card.animDelay) * 0.5 + 0.3 }}
            >
              {card.content}
            </motion.div>
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-24 w-full max-w-4xl mx-auto">

        <motion.p
          className="text-[#00c4b4] text-xs font-bold uppercase tracking-[0.25em] mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Web & App Development
        </motion.p>

        <h1
          className="font-extrabold leading-[1.15] mb-6"
          style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5rem)' }}
        >
          {HEADLINE_LINES.map((line, lineIndex) => (
            <AnimatedLine
              key={lineIndex}
              text={line.text}
              teal={line.teal}
              charOffset={charOffsets[lineIndex]}
              onCharHover={handleCharHover}
            />
          ))}
        </h1>

        <motion.p
          className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Websites and web applications built on modern technology.
          Clear scope. Real deadlines. You own everything when we&apos;re done.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <a
            href="#contact"
            className="bg-[#00c4b4] hover:bg-[#00b4a6] text-[#0a1628] font-bold px-8 py-4 rounded-full text-base transition-colors"
          >
            Start a Project →
          </a>
          <a
            href="#work"
            className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-full text-base transition-colors"
          >
            See Our Work
          </a>
        </motion.div>

        <motion.div
          className="mt-16 w-full border border-white/10 rounded-2xl grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="py-8 flex flex-col items-center gap-1">
              <span className="text-4xl font-extrabold text-white">{s.value}</span>
              <span className="text-[#00c4b4] text-xs font-semibold uppercase tracking-widest">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}