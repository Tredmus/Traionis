'use client';

import { motion, useInView, useReducedMotion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef, useCallback } from 'react';

type SectionHeadingProps = {
  words: string[];
  tealDot?: boolean;
};

function AnimatedWord({
  word,
  index,
  inView,
  reduceMotion,
  isLast,
  tealDot,
}: {
  word: string;
  index: number;
  inView: boolean;
  reduceMotion: boolean;
  isLast: boolean;
  tealDot?: boolean;
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
      className="inline-block cursor-default select-none mr-[0.22em] text-white"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={controls}
      onMouseEnter={handleHover}
    >
      {word}
      {isLast && tealDot ? <span className="text-main">.</span> : null}
    </motion.span>
  );
}

export default function SectionHeading({ words, tealDot }: SectionHeadingProps) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });
  const reduceMotion = useReducedMotion();

  return (
    <h2
      ref={ref}
      className="font-extrabold leading-[1.05] text-white"
      style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
    >
      {words.map((word, index) => (
        <AnimatedWord
          key={index}
          word={word}
          index={index}
          inView={!!inView}
          reduceMotion={!!reduceMotion}
          isLast={index === words.length - 1}
          tealDot={tealDot}
        />
      ))}
    </h2>
  );
}
