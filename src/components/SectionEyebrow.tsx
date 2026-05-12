'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type SectionEyebrowProps = {
  children: ReactNode;
  /** Extra classes (e.g. mb-6, text-center) */
  className?: string;
  /** Center the label (hero / process / contact headers) */
  centered?: boolean;
};

/**
 * Small uppercase label above section titles — matches ProblemSection “How we work” styling.
 */
export default function SectionEyebrow({ children, className = '', centered = false }: SectionEyebrowProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.p
      className={`text-main text-sm font-semibold uppercase tracking-widest mb-5 ${
        centered ? 'block w-full text-center' : ''
      } ${className}`.trim()}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.p>
  );
}
