'use client';

import { useEffect, useCallback, useState, useRef, type CSSProperties } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import SectionEyebrow from './SectionEyebrow';
import SectionWaveDivider from './SectionWaveDivider';

const BUILD_START_YEAR = 2023;
const BUILD_START_MONTH = 2; // March (0-based)
const BUILD_START_DAY = 1;

function getYearsBuilding(date: Date) {
  let years = date.getFullYear() - BUILD_START_YEAR;
  const anniversaryThisYear = new Date(date.getFullYear(), BUILD_START_MONTH, BUILD_START_DAY);
  if (date < anniversaryThisYear) years -= 1;
  return Math.max(years, 0);
}

const HEADLINE_LINES = [
  { text: 'Built right.', teal: false },
  { text: 'Built to convert.', teal: true },
  { text: 'Built to grow.', teal: false },
];

/** Branded glow dots — deterministic layout (SSR-safe), more count + varied timing. */
const DOTS = Array.from({ length: 52 }, (_, i) => ({
  id: i,
  size: 4 + (i % 4),
  left: ((i * 23 + 7) % 88) + 5,
  top: ((i * 31 + 13) % 86) + 6,
  duration: 6 + (i % 8),
  delay: (i % 12) * 0.24,
}));

/** Tiny “star” specks — deterministic layout (SSR-safe). */
const STARS = Array.from({ length: 120 }, (_, i) => ({
  id: `star-${i}`,
  left: ((i * 37 + 11) % 94) + 3,
  top: ((i * 59 + 5) % 92) + 4,
  size: i % 7 === 0 ? 2 : 1,
  opacity: 0.12 + (i % 9) * 0.045,
  duration: 3.2 + (i % 6) * 0.55,
  delay: (i % 11) * 0.22,
}));

/** Canvas drift layer — velocity + edge bounce (client-only, respects reduced motion). */
function HeroDriftCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) return;

    type P = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    };
    let particles: P[] = [];
    const COUNT = 100;

    const initParticles = (width: number, height: number) => {
      particles = [];
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.55,
          vy: (Math.random() - 0.5) * 0.55,
          size: Math.random() * 2.1 + 0.75,
          opacity: Math.random() * 0.38 + 0.14,
        });
      }
    };

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      if (w < 1 || h < 1) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(w, h);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const tick = () => {
      if (particles.length && w > 0 && h > 0) {
        ctx.clearRect(0, 0, w, h);
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          p.x = Math.min(Math.max(p.x, 0), w);
          p.y = Math.min(Math.max(p.y, 0), h);

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(160, 220, 255, ${p.opacity})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 z-0">
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" aria-hidden />
    </div>
  );
}

const FLOATING_CARDS = [
  {
    id: 'card1',
    style: { left: '4%', top: '22%' },
    animDelay: '0s',
    animDuration: '5s',
    content: (
      <div className="w-48 rounded-2xl border border-white/10 bg-navy-deep p-3 shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-main" />
          <span className="text-white/60 text-xs">ParkQui</span>
        </div>
        <div className="text-white text-xs font-semibold mb-1">Parking Marketplace</div>
        <div className="flex gap-1 flex-wrap">
          {['Next.js', 'Supabase', 'Maps'].map(t => (
            <span key={t} className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] text-white/60">{t}</span>
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
      <div className="w-44 rounded-2xl border border-white/10 bg-navy-deep p-3 shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/10">
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
      <div className="w-44 rounded-2xl border border-white/10 bg-navy-deep p-3 font-mono shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/10">
        <div className="text-[10px] text-white/40 mb-1">stack.ts</div>
        <div className="text-[11px]">
          <span className="text-main">const</span>
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
      <div className="w-48 rounded-2xl border border-white/10 bg-navy-deep p-3 shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/10">
        <div className="text-white/40 text-[10px] mb-1 uppercase tracking-wider">Code ownership</div>
        <div className="text-white text-sm font-bold mb-2">100% yours</div>
        <div className="w-full bg-white/10 rounded-full h-1.5">
          <div className="bg-main h-1.5 rounded-full w-full" />
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
      className={`inline-block cursor-default select-none ${teal ? 'text-main' : 'text-white'}`}
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
  const yearsBuilding = getYearsBuilding(new Date());
  const stats = [
    { value: '24h', label: 'Response Time' },
    { value: String(yearsBuilding)+'+', label: 'Years Building' },
    { value: '100%', label: 'Code Ownership' },
    { value: '0', label: 'Hidden Costs' },
  ];

  useEffect(() => { setMounted(true); }, []);

  const handleCharHover = useCallback((_i: number) => {}, []);

  const charOffsets = HEADLINE_LINES.reduce<number[]>((acc, line, i) => {
    const prev = i === 0 ? 0 : acc[i - 1] + HEADLINE_LINES[i - 1].text.length;
    return [...acc, prev];
  }, []);

  return (
    <section className="relative isolate flex min-h-screen flex-col items-center overflow-hidden bg-gradient-to-b from-[#1a3358] via-navy to-[#0a1628]">

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

      {/* Local spotlight — lifts headline off the gradient (Easyweb-style) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-[38%] h-[min(100vw,720px)] w-[min(100vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07)_0%,transparent_62%)] blur-[2px]" />
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-main/10 blur-[120px]" />
      </div>

      {/* Dot grid + fine grain */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 0.5px, transparent 0.5px)',
          backgroundSize: '24px 24px',
        }}
      />

      <HeroDriftCanvas />

      {/* Star specks */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-visible">
        {STARS.map((s) => (
          <motion.span
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              width: s.size,
              height: s.size,
              left: `${s.left}%`,
              top: `${s.top}%`,
            }}
            animate={{
              opacity: [s.opacity * 0.58, s.opacity * 1.42, s.opacity * 0.58],
              x: [0, 12, -8, 0],
              y: [0, -10, 14, 0],
            }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Floating particles — above glow; fixed positions = SSR-safe */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-visible">
        {DOTS.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute rounded-full bg-main shadow-[0_0_10px_rgb(from_var(--color-main)_r_g_b_/_0.55)]"
            style={{
              width: dot.size,
              height: dot.size,
              left: `${dot.left}%`,
              top: `${dot.top}%`,
            }}
            initial={{ opacity: 0.5, x: 0, y: 0 }}
            animate={{
              x: [-22, 22],
              y: [-32, 32],
              opacity: [0.3, 0.98, 0.3],
            }}
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

      {/* Main content — flex-1 keeps the wave strip pinned to the viewport bottom on tall screens */}
      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center px-6 pb-16 pt-32 text-center md:pb-20">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center">

        <SectionEyebrow centered className="mb-6">
          Web & app development
        </SectionEyebrow>

        <h1
          className="mb-6 font-extrabold leading-[1.15]"
          style={{
            fontSize: 'clamp(2.6rem, 6.5vw, 5rem)',
            filter: 'drop-shadow(0 4px 48px rgb(from var(--color-main) r g b / 0.2))',
          }}
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
          Websites and applications designed and built to convert - and become the digital center of your business.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <a
            href="#contact"
            className="btn-cta-gradient rounded-full px-8 py-4 text-base font-bold text-navy"
          >
            Start a Project →
          </a>
          <a
            href="#work"
            className="rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white transition-all hover:border-white/45 hover:bg-white/5 active:scale-[0.98]"
          >
            See Our Work
          </a>
        </motion.div>

        <motion.div
          className="mt-16 grid w-full grid-cols-2 divide-y divide-white/10 rounded-3xl border border-white/12 bg-white/[0.06] shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/10 backdrop-blur-md md:grid-cols-4 md:divide-x md:divide-y-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {stats.map((s) => (
            <div key={s.label} className="py-8 flex flex-col items-center gap-1">
              <span className="text-4xl font-extrabold text-white">{s.value}</span>
              <span className="text-main text-xs font-semibold uppercase tracking-widest">{s.label}</span>
            </div>
          ))}
        </motion.div>
        </div>
      </div>

      <SectionWaveDivider to="services" />
    </section>
  );
}