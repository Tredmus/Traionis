"use client";

import { motion, useScroll, useSpring } from "motion/react";

import { ZONES } from "@/lib/depth";

/**
 * Orientation for a long scroll.
 *
 * This is the ONE scroll-linked element on the site, and it animates a single
 * transform on a single element — which the compositor handles without ever
 * touching the main thread. Everything else reveals via IntersectionObserver.
 * That division is what keeps the descent at 60fps on a mid-range phone.
 *
 * Desktop gets a vertical rail with a tick per band. Below `md` there is no
 * gutter to spare, so it degrades to a 2px bar across the top.
 */
export function DepthRail() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Mobile: top bar */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] md:hidden"
        style={{ backgroundColor: "rgb(245 244 247 / 0.08)" }}
      >
        <motion.div
          className="h-full origin-left bg-accent-hi"
          style={{ scaleX: progress }}
        />
      </div>

      {/* Desktop: right-edge rail */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-6 top-1/2 z-50 hidden h-[38vh] w-px -translate-y-1/2 md:block lg:right-9"
        style={{ backgroundColor: "rgb(245 244 247 / 0.14)" }}
      >
        <motion.div
          className="absolute inset-x-0 top-0 h-full origin-top bg-accent-hi"
          style={{ scaleY: progress }}
        />
        {ZONES.map((zone, index) => (
          <span
            key={zone.id}
            className="absolute -left-[3px] h-px w-[7px]"
            style={{
              top: `${(index / (ZONES.length - 1)) * 100}%`,
              backgroundColor: "rgb(245 244 247 / 0.3)",
            }}
          />
        ))}
      </div>
    </>
  );
}
