'use client';

import { motion, useInView, useReducedMotion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef, useCallback, createElement, type ReactNode } from 'react';

type SecondLine = { words: string[]; tealDot?: boolean };

type SectionHeadingProps = {
  words: string[];
  tealDot?: boolean;
  secondLine?: SecondLine;
  /** Smaller type scale — e.g. timeline step titles */
  size?: 'section' | 'compact';
  as?: 'h2' | 'h3';
  className?: string;
  /** With a parent `group`, words pick up main on hover (timeline cards) */
  interactiveGroup?: boolean;
};

function AnimatedWord({
  word,
  index,
  inView,
  reduceMotion,
  isLast,
  tealDot,
  compact,
  interactiveGroup,
}: {
  word: string;
  index: number;
  inView: boolean;
  reduceMotion: boolean;
  isLast: boolean;
  tealDot?: boolean;
  compact?: boolean;
  interactiveGroup?: boolean;
}) {
  const controls = useAnimationControls();
  const handleHover = useCallback(() => {
    if (reduceMotion) return;
    controls
      .start({
        y: -6,
        transition: { type: 'spring', stiffness: 500, damping: 12 },
      })
      .then(() => {
        controls.start({
          y: 0,
          transition: { type: 'spring', stiffness: 300, damping: 14 },
        });
      });
  }, [controls, reduceMotion]);

  useEffect(() => {
    if (!inView || reduceMotion) return;
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
  }, [controls, inView, index, reduceMotion]);

  return (
    <motion.span
      className={`inline-block cursor-default select-none text-white ${compact ? 'mr-[0.18em]' : 'mr-[0.22em]'} ${
        interactiveGroup ? 'transition-colors duration-300 group-hover:text-main' : ''
      }`}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={controls}
      onMouseEnter={handleHover}
    >
      {word}
      {isLast && tealDot ? <span className="text-main">.</span> : null}
    </motion.span>
  );
}

export default function SectionHeading({
  words,
  tealDot,
  secondLine,
  size = 'section',
  as = 'h2',
  className = '',
  interactiveGroup = false,
}: SectionHeadingProps) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });
  const reduceMotion = useReducedMotion();
  const compact = size === 'compact';
  const fontSize =
    size === 'compact' ? 'clamp(1.1rem, 2.6vw, 1.65rem)' : 'clamp(2.4rem, 5vw, 4rem)';
  const leading = size === 'compact' ? 'leading-snug' : 'leading-[1.05]';

  const firstLineTealDot = secondLine ? false : !!tealDot;

  const children: ReactNode[] = [
    ...words.map((word, index) => (
      <AnimatedWord
        key={`l1-${index}`}
        word={word}
        index={index}
        inView={!!inView}
        reduceMotion={!!reduceMotion}
        isLast={!secondLine && index === words.length - 1}
        tealDot={firstLineTealDot}
        compact={compact}
        interactiveGroup={interactiveGroup}
      />
    )),
  ];

  if (secondLine) {
    children.push(<br key="heading-linebreak" />);
    secondLine.words.forEach((word, index) => {
      children.push(
        <AnimatedWord
          key={`l2-${index}`}
          word={word}
          index={words.length + index}
          inView={!!inView}
          reduceMotion={!!reduceMotion}
          isLast={index === secondLine.words.length - 1}
          tealDot={!!secondLine.tealDot}
          compact={compact}
          interactiveGroup={interactiveGroup}
        />,
      );
    });
  }

  return createElement(
    as,
    {
      ref,
      className: `font-extrabold text-white ${leading} ${className}`.trim(),
      style: { fontSize },
    },
    children,
  );
}
