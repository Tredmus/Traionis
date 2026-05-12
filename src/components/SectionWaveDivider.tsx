'use client';

import { useId } from 'react';

/**
 * Fill below the curve matches the *next* section’s base tone so the wave reads as a real shoreline,
 * not a random stripe (see SectionAccent mesh colors).
 */
export const WAVE_BRIDGE = {
  services: '#0e2244',
  work: '#0c1f3e',
  problem: '#0f2040',
  process: '#0c203c',
  faq: '#0b182f',
  contact: '#081a2e',
} as const;

export type WaveBridgeTarget = keyof typeof WAVE_BRIDGE;

type SectionWaveDividerProps = {
  to: WaveBridgeTarget;
  className?: string;
};

/**
 * Full-bleed wavy boundary at the **bottom** of a section — the filled region is the next section’s sea tone.
 * Place as the last child inside `<section>`; use `block` + no extra margins on siblings to avoid hairline gaps.
 */
export default function SectionWaveDivider({ to, className = '' }: SectionWaveDividerProps) {
  const gid = useId().replace(/:/g, '');
  const base = WAVE_BRIDGE[to];
  const gradId = `waveBridge-${gid}`;
  const strokeId = `waveStroke-${gid}`;

  return (
    <div
      className={`pointer-events-none relative z-[2] -mb-px w-full shrink-0 leading-[0] ${className}`}
      aria-hidden
    >
      <svg
        className="block w-full text-transparent"
        style={{ height: 'clamp(3rem, 8vw, 5.25rem)' }}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={base} />
            <stop offset="55%" stopColor={base} />
            <stop offset="100%" stopColor={base} stopOpacity="0.88" />
          </linearGradient>
          <linearGradient id={strokeId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-main)" stopOpacity="0.45" />
            <stop offset="45%" stopColor="var(--color-accent)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--color-main)" stopOpacity="0.38" />
          </linearGradient>
        </defs>
        {/* Filled body: flat base + wavy top = water spilling into the next band */}
        <path
          fill={`url(#${gradId})`}
          d="M0,100 L0,46 C120,28 240,62 360,40 C480,18 600,58 720,38 C840,18 960,56 1080,36 C1200,16 1320,52 1440,44 L1440,100 Z"
        />
        {/* Crest highlight */}
        <path
          fill="none"
          stroke={`url(#${strokeId})`}
          strokeWidth="1.75"
          vectorEffect="non-scaling-stroke"
          d="M0,46 C120,28 240,62 360,40 C480,18 600,58 720,38 C840,18 960,56 1080,36 C1200,16 1320,52 1440,44"
        />
        {/* Secondary swell — reads as foam */}
        <path
          fill="none"
          stroke="rgb(from var(--color-accent) r g b / 0.22)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          d="M0,54 C100,38 200,62 320,46 C440,30 560,58 680,44 C800,30 920,56 1040,42 C1160,28 1280,50 1440,40"
        />
      </svg>
    </div>
  );
}
