"use client";

import { useReducedMotion, useScroll, useSpring } from "motion/react";
import { useSyncExternalStore, type RefObject } from "react";

/**
 * Shared machinery for the two service drawings.
 *
 * Desktop pins each offering for a stretch of scroll and scrubs the drawing
 * against it (`pinned`, 0→1 across the pin). Below `lg` nothing pins: the
 * drawing builds as the panel rises into view (`flowing`, 0 when it enters,
 * 1 when its centre reaches mid-screen). Reduced motion skips both and shows
 * the finished, annotated state.
 *
 * Both progresses run through a spring before they reach the drawing. Raw
 * scroll arrives in wheel-notch steps, and a figure scrubbed straight off it
 * jumps from pose to pose; the spring lets it glide between them and settle.
 */

const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribeDesktop(onChange: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** Server renders the desktop layout; phones correct it right after hydration. */
export function useIsDesktop() {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => true,
  );
}

export function useSchematicProgress(target: RefObject<HTMLElement | null>) {
  const desktop = useIsDesktop();
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress: pinnedRaw } = useScroll({
    target,
    offset: ["start 0.5", "end end"],
  });
  const { scrollYProgress: flowingRaw } = useScroll({
    target,
    offset: ["start 0.95", "center 0.5"],
  });
  const pinned = useSpring(pinnedRaw, SMOOTH);
  const flowing = useSpring(flowingRaw, SMOOTH);
  return { desktop, reduced, pinned, flowing };
}

/** Soft, slightly slow follow — no overshoot, settles in ~0.6s. */
const SMOOTH = { stiffness: 70, damping: 22, mass: 1, restDelta: 0.0005 } as const;

export const TAU = Math.PI * 2;

export function clamp01(x: number) {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

/** 0 before `a`, 1 after `b`, linear between. */
export function ramp(x: number, a: number, b: number) {
  return clamp01((x - a) / (b - a));
}

export function easeOut(t: number) {
  return 1 - (1 - t) ** 3;
}

export function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

/** Where a callout's label sits on the desktop drawing, in viewBox units. */
export interface LabelSlot {
  side: "left" | "right";
  /** The label's inner edge — the end its leader line meets. */
  edge: number;
  y: number;
}

/** Desktop drawings share one frame; labels live in the side gutters. */
export const FRAME = { w: 720, h: 560, gutter: 150 } as const;

export const LEFT_EDGE = FRAME.gutter;
export const RIGHT_EDGE = FRAME.w - FRAME.gutter;
