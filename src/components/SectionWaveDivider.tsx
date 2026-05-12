'use client';

import { useId } from 'react';

/**
 * Opaque fill under the wave crest — must match the **receiving** section’s top base
 * (`SectionAccent` base gradient / Contact `from-*`), not a single global navy.
 */
export const WAVE_SECTION_FILL = {
  services: '#0e2244',
  work: '#0c1f3e',
  problem: '#0f2040',
  process: '#0c203c',
  faq: '#0b182f',
  contact: '#081a2e',
} as const;

export type WaveBridgeTarget = keyof typeof WAVE_SECTION_FILL;

type SectionWaveDividerProps = {
  to: WaveBridgeTarget;
  className?: string;
};

/**
 * Full-bleed wavy boundary between coastal sections. Fill is always a solid hex (no alpha).
 */
export default function SectionWaveDivider({ to, className = '' }: SectionWaveDividerProps) {
  const gid = useId().replace(/:/g, '');
  const fill = WAVE_SECTION_FILL[to];
  const strokeId = `waveStroke-${gid}`;

  return (
    <div
      className={`pointer-events-none relative z-[2] -mb-px w-full shrink-0 leading-[0] ${className}`}
      aria-hidden
      data-wave-to={to}
    >
      <svg
        className="block w-full text-transparent"
        style={{ height: 'clamp(3rem, 8vw, 5.25rem)' }}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={strokeId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-main)" stopOpacity="0.45" />
            <stop offset="45%" stopColor="var(--color-accent)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--color-main)" stopOpacity="0.38" />
          </linearGradient>
        </defs>
        <path
          fill={fill}
          d="M0,100 L0,46 C120,28 240,62 360,40 C480,18 600,58 720,38 C840,18 960,56 1080,36 C1200,16 1320,52 1440,44 L1440,100 Z"
        />
        <path
          fill="none"
          stroke={`url(#${strokeId})`}
          strokeWidth="1.75"
          vectorEffect="non-scaling-stroke"
          d="M0,46 C120,28 240,62 360,40 C480,18 600,58 720,38 C840,18 960,56 1080,36 C1200,16 1320,52 1440,44"
        />
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
