"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

import { STAGGER_STEP } from "@/lib/depth";

/**
 * Scroll reveal, built on IntersectionObserver rather than scroll-linked
 * animation.
 *
 * Two things matter here:
 *
 * 1. The default state is VISIBLE. The hidden state is applied in a layout
 *    effect, which only ever runs on the client and always before paint. So
 *    the server HTML is fully visible content, no-JS and crawler renders show
 *    everything, and there is still no flash of content before it hides.
 *
 * 2. It animates transform and opacity only, once, then disconnects. Nothing
 *    here runs on the scroll thread, which is why the descent holds 60fps on
 *    a mid-range phone.
 */

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type RevealState = "idle" | "pending" | "in";

interface RevealProps {
  children: ReactNode;
  /** Position within a stagger group. Multiplied by STAGGER_STEP. */
  index?: number;
  /** Additional delay in seconds, added after the stagger offset. */
  delay?: number;
  /** Travel distance in px. Keep small — this is punctuation, not choreography. */
  distance?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

export function Reveal({
  children,
  index = 0,
  delay = 0,
  distance = 14,
  as: Tag = "div",
  className,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<RevealState>("idle");

  // Arm before paint, so the element is never seen in its visible state first.
  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setState("pending");
  }, []);

  useEffect(() => {
    if (state !== "pending") return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setState("in");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [state]);

  const hidden = state === "pending";

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: hidden ? 0 : 1,
        transform: hidden ? `translate3d(0, ${distance}px, 0)` : "translate3d(0, 0, 0)",
        transition:
          state === "idle"
            ? undefined
            : `opacity 620ms var(--ease-descent) ${index * STAGGER_STEP + delay}s, transform 620ms var(--ease-descent) ${index * STAGGER_STEP + delay}s`,
        willChange: state === "in" ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
