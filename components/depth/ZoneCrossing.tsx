"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed threshold at the top of a depth band.
 *
 * A 1px steel rule draws across the viewport as the band's edge enters
 * the reading line. Flat colour on both sides — the line is the crossing,
 * not a gradient wash.
 */
export function ZoneCrossing() {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDrawn(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "-22% 0px -72% 0px", threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-[6] h-px origin-left"
      style={{
        backgroundColor: "var(--zone-line-strong)",
        transform: drawn ? "scaleX(1)" : "scaleX(0)",
        transition: "transform 720ms var(--ease-descent)",
      }}
    />
  );
}
