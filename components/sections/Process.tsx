"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { ZoneInner } from "@/components/depth/DepthZone";
import { Reveal } from "@/components/motion/Reveal";
import { useCopy } from "@/lib/locale-context";

/**
 * MID — how we work, as a current through the water.
 *
 * Four stations alternate left → right → left → right. A single path snakes
 * between them and draws as you scroll. A small line-weight jellyfish rides
 * the tip of that path — the living lead of the line, not a progress bead.
 *
 * Geometry is measured from the stations after layout, so three, four or five
 * steps stay a content edit. Reduced-motion and no-JS get the finished path
 * with the jellyfish settled on the last station.
 *
 * Motion is applied imperatively (refs) so React re-renders from resize /
 * content don’t snap the jelly between scroll samples.
 */

const useIsoLayout =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type Point = { x: number; y: number };

/** SVG jelly faces −Y; +90 maps travel direction onto that heading. Down = 180. */
const ANGLE_DOWN = 180;

function buildPath(points: Point[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const midY = (a.y + b.y) / 2;
    // Soft S: leave A vertically, arrive at B vertically — joins stay clean.
    d += ` C ${a.x.toFixed(1)} ${midY.toFixed(1)}, ${b.x.toFixed(1)} ${midY.toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }
  return d;
}

function tangentAngle(path: SVGPathElement, dist: number, len: number) {
  const pad = Math.min(14, Math.max(6, len * 0.018));
  const a = path.getPointAtLength(Math.max(0, dist - pad));
  const b = path.getPointAtLength(Math.min(len, dist + pad));
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (dx === 0 && dy === 0) return ANGLE_DOWN;
  return (Math.atan2(dy, dx) * 180) / Math.PI + 90;
}

/** Shortest-path angle blend (degrees). */
function lerpAngle(from: number, to: number, t: number) {
  const delta = ((((to - from) % 360) + 540) % 360) - 180;
  return from + delta * t;
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function fallbackStops(count: number) {
  if (count <= 1) return [0];
  return Array.from({ length: count }, (_, i) => i / (count - 1));
}

/** True arc-length progress for each station along the drawn path. */
function measureArcStops(path: SVGPathElement, points: Point[]) {
  const len = path.getTotalLength();
  if (len <= 0 || points.length === 0) return [0];
  if (points.length === 1) return [0];

  const samples = Math.max(120, Math.ceil(len * 2));
  const stops: number[] = [];

  for (let i = 0; i < points.length; i++) {
    if (i === 0) {
      stops.push(0);
      continue;
    }
    if (i === points.length - 1) {
      stops.push(1);
      continue;
    }

    const pt = points[i];
    const lo = stops[i - 1] * len;
    const hi = len;
    let best = lo;
    let bestDist = Infinity;
    const steps = Math.max(40, Math.ceil(((hi - lo) / len) * samples));
    for (let s = 0; s <= steps; s++) {
      const d = lo + ((hi - lo) * s) / steps;
      const p = path.getPointAtLength(d);
      const dist = (p.x - pt.x) ** 2 + (p.y - pt.y) ** 2;
      if (dist < bestDist) {
        bestDist = dist;
        best = d;
      }
    }
    stops.push(best / len);
  }

  return stops;
}

/**
 * Map viewport mid through station centers → path progress.
 * When a station sits on the mid-line, progress is exactly that stop.
 */
function progressFromStations(
  mid: number,
  centers: number[],
  stops: number[],
) {
  if (centers.length === 0) return 0;
  if (centers.length === 1 || mid <= centers[0]) return stops[0];
  if (mid >= centers[centers.length - 1]) return stops[stops.length - 1];

  for (let i = 0; i < centers.length - 1; i++) {
    if (mid > centers[i + 1]) continue;
    const span = centers[i + 1] - centers[i];
    const u = span <= 0 ? 0 : (mid - centers[i]) / span;
    return stops[i] + (stops[i + 1] - stops[i]) * clamp01(u);
  }
  return stops[stops.length - 1];
}

function nearestStop(progress: number, stops: number[]) {
  let best = stops[0] ?? 0;
  let bestDist = Infinity;
  for (const stop of stops) {
    const d = Math.abs(progress - stop);
    if (d < bestDist) {
      bestDist = d;
      best = stop;
    }
  }
  return { stop: best, dist: bestDist };
}

function headingAt(path: SVGPathElement, progress: number, len: number) {
  let heading = tangentAngle(path, progress * len, len);
  // Gentle upright settle on the last beat — no sideways snap at the tip.
  if (progress > 0.88) {
    const finish = (progress - 0.88) / 0.12;
    heading = lerpAngle(heading, ANGLE_DOWN, finish * finish);
  }
  return heading;
}

export function Process() {
  const copy = useCopy();
  const steps = copy.process.steps;
  const stepCount = steps.length;

  const trailRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const jellyRef = useRef<SVGGElement>(null);
  const stationRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const stationPointsRef = useRef<Point[]>([]);

  const [pathD, setPathD] = useState("");
  const [size, setSize] = useState({ w: 0, h: 0 });

  const motion = useRef({
    current: 0,
    target: 0,
    angle: ANGLE_DOWN,
    pathLen: 0,
    stops: fallbackStops(stepCount),
    reduced: false,
    raf: 0,
    lastTs: 0,
    lastScrollY: 0,
    velocity: 0,
    settleStop: null as number | null,
  });

  const paint = useCallback((progress: number, angle: number) => {
    const path = pathRef.current;
    const len = motion.current.pathLen;
    if (!path || len <= 0) return;

    const pt = path.getPointAtLength(progress * len);
    const jelly = jellyRef.current;
    const line = lineRef.current;

    if (jelly) {
      jelly.setAttribute(
        "transform",
        `translate(${pt.x} ${pt.y}) rotate(${angle}) scale(1.35)`,
      );
      jelly.style.opacity = "1";
    }
    if (line) line.style.strokeDashoffset = String(1 - progress);

    const stops = motion.current.stops;
    let activeIndex = -1;
    for (let i = 0; i < stops.length; i++) {
      // Only once the jelly has reached the station checkpoint.
      if (progress >= stops[i] - 0.008) activeIndex = i;
      else break;
    }

    stationRefs.current.forEach((node, i) => {
      if (!node) return;
      const stop = stops[i] ?? 0;
      const reached = progress >= stop - 0.008;
      node.dataset.lit = reached ? "true" : "false";
      const step = node.closest(".process-trail__step");
      if (step instanceof HTMLElement) {
        step.dataset.current = i === activeIndex ? "true" : "false";
      }
    });
  }, []);

  const measure = useCallback(() => {
    const trail = trailRef.current;
    if (!trail) return;
    const root = trail.getBoundingClientRect();
    const points: Point[] = [];

    for (const node of stationRefs.current) {
      if (!node) continue;
      const r = node.getBoundingClientRect();
      points.push({
        x: r.left + r.width / 2 - root.left,
        y: r.top + r.height / 2 - root.top,
      });
    }

    stationPointsRef.current = points;
    setSize({ w: trail.scrollWidth, h: trail.scrollHeight });
    setPathD(buildPath(points));
  }, []);

  useIsoLayout(() => {
    measure();
    const trail = trailRef.current;
    if (!trail) return;

    const ro = new ResizeObserver(() => measure());
    ro.observe(trail);
    for (const node of stationRefs.current) {
      if (node) ro.observe(node);
    }
    return () => ro.disconnect();
  }, [measure, stepCount]);

  // After path geometry (or any React paint) lands, re-sync length + jelly.
  useIsoLayout(() => {
    const path = pathRef.current;
    if (!path || !pathD) return;

    const len = path.getTotalLength();
    motion.current.pathLen = len;
    motion.current.stops = measureArcStops(path, stationPointsRef.current);
    motion.current.reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (len <= 0) return;

    if (motion.current.reduced) {
      motion.current.current = 1;
      motion.current.target = 1;
      motion.current.angle = ANGLE_DOWN;
      paint(1, ANGLE_DOWN);
      return;
    }

    paint(motion.current.current, motion.current.angle);
  }, [pathD, paint]);

  useEffect(() => {
    if (motion.current.reduced) return;
    const trail = trailRef.current;
    const path = pathRef.current;
    if (!trail || !path) return;

    motion.current.lastScrollY = window.scrollY;

    const readTarget = () => {
      const mid = window.innerHeight * 0.5;
      const centers: number[] = [];
      for (let i = 0; i < stepCount; i++) {
        const node = stationRefs.current[i];
        if (!node) return;
        const r = node.getBoundingClientRect();
        centers.push(r.top + r.height / 2);
      }

      const scrollY = window.scrollY;
      const m = motion.current;
      m.velocity = scrollY - m.lastScrollY;
      m.lastScrollY = scrollY;

      const stops = m.stops;
      let next = progressFromStations(mid, centers, stops);
      const near = nearestStop(next, stops);
      const moving = Math.abs(m.velocity) > 0.35;

      // Any real scroll cancels settle — otherwise the idle pass pulls
      // the jelly back onto the station it just left.
      if (moving) {
        m.settleStop = null;
      } else {
        const towardStop = Math.sign(near.stop - m.current);
        const towardNext = Math.sign(next - m.current);
        const approaching =
          towardStop !== 0 && towardStop === towardNext;
        const alreadyOnStop = near.dist < 0.012;

        if (
          near.dist < 0.05 &&
          Math.abs(m.current - near.stop) < 0.1 &&
          (approaching || alreadyOnStop)
        ) {
          m.settleStop = near.stop;
        } else if (near.dist > 0.08 || towardStop !== towardNext) {
          m.settleStop = null;
        }
      }

      if (m.settleStop != null) next = m.settleStop;
      m.target = next;
    };

    const tick = (ts: number) => {
      const m = motion.current;
      m.raf = 0;
      const pathEl = pathRef.current;
      if (!pathEl || m.pathLen <= 0) return;

      const dt = m.lastTs ? Math.min(48, ts - m.lastTs) : 16;
      m.lastTs = ts;

      // Soft underwater lag — lower rates = more glide, less chase.
      const follow = 1 - Math.exp((-dt / 1000) * 6.5);
      const turn = 1 - Math.exp((-dt / 1000) * 5);

      m.current += (m.target - m.current) * follow;
      if (Math.abs(m.target - m.current) < 0.00035) m.current = m.target;

      const heading = headingAt(pathEl, m.current, m.pathLen);
      m.angle = lerpAngle(m.angle, heading, turn);
      paint(m.current, m.angle);

      const angleErr = Math.abs((((heading - m.angle) % 360) + 540) % 360 - 180);
      if (Math.abs(m.target - m.current) > 0.00035 || angleErr > 0.2) {
        m.raf = requestAnimationFrame(tick);
      }
    };

    let settleTimer = 0;

    const kick = () => {
      readTarget();
      const m = motion.current;
      if (!m.raf) {
        m.lastTs = 0;
        m.raf = requestAnimationFrame(tick);
      }
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        motion.current.velocity = 0;
        readTarget();
        const next = motion.current;
        if (!next.raf) {
          next.lastTs = 0;
          next.raf = requestAnimationFrame(tick);
        }
      }, 140);
    };

    readTarget();
    const m = motion.current;
    const pathEl = pathRef.current;
    if (pathEl && m.pathLen > 0) {
      if (m.current === 0 && m.target === 0) {
        m.angle = headingAt(pathEl, 0, m.pathLen);
      }
      paint(m.current, m.angle);
    }
    kick();

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      window.clearTimeout(settleTimer);
      if (motion.current.raf) cancelAnimationFrame(motion.current.raf);
      motion.current.raf = 0;
    };
  }, [pathD, paint, stepCount]);

  return (
    <section aria-labelledby="process-heading" className="mt-32 sm:mt-44">
      <ZoneInner>
        <Reveal
          as="h2"
          id="process-heading"
          className="max-w-[18ch] font-display text-display-m font-bold text-balance"
          style={{ fontStretch: "108%" }}
        >
          {copy.process.heading}
        </Reveal>
        <Reveal
          as="p"
          index={1}
          className="mt-7 max-w-[60ch] text-body text-[color-mix(in_srgb,var(--zone-ink)_72%,transparent)]"
        >
          {copy.process.intro}
        </Reveal>

        <div ref={trailRef} className="process-trail relative mt-14 sm:mt-20">
          <svg
            className="process-trail__svg pointer-events-none absolute inset-0 z-0 overflow-visible"
            width={size.w || "100%"}
            height={size.h || "100%"}
            aria-hidden="true"
          >
            <path d={pathD} className="process-trail__ghost" fill="none" />
            <path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke="none"
              aria-hidden="true"
            />
            <path
              ref={lineRef}
              d={pathD}
              className="process-trail__line"
              fill="none"
              pathLength={1}
            />

            <g ref={jellyRef} className="process-jelly" style={{ opacity: 0 }}>
              <JellyfishMark />
            </g>
          </svg>

          <ol className="process-trail__list relative z-10 m-0 list-none p-0">
            {steps.map((step, i) => {
              const side = i % 2 === 0 ? "left" : "right";
              const copyBlock = (
                <Reveal className="process-trail__copy" index={i + 2}>
                  <h3 className="process-trail__title font-display text-[1.2rem] font-semibold leading-snug tracking-[-0.015em] text-balance sm:text-[1.35rem]">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-[42ch] text-body text-[color-mix(in_srgb,var(--zone-ink)_72%,transparent)]">
                    {step.body}
                  </p>
                </Reveal>
              );
              const station = (
                <span
                  ref={(node) => {
                    stationRefs.current[i] = node;
                  }}
                  className="process-trail__station"
                  aria-hidden="true"
                  data-lit="false"
                />
              );

              return (
                <li
                  key={step.id}
                  className={`process-trail__step process-trail__step--${side}`}
                >
                  {side === "left" ? (
                    <>
                      {copyBlock}
                      {station}
                    </>
                  ) : (
                    <>
                      {station}
                      {copyBlock}
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </ZoneInner>
    </section>
  );
}

/** Line-weight jellyfish — bell + a few trailing filaments. */
function JellyfishMark() {
  return (
    <g className="process-jelly__mark">
      <circle className="process-jelly__glow" cx="0" cy="-2" r="11" />
      <path
        className="process-jelly__bell"
        d="M-7.5 0 C-7.5 -8.5 -4.2 -12 0 -12 C4.2 -12 7.5 -8.5 7.5 0 C5 1.6 2.5 2.2 0 2.2 C-2.5 2.2 -5 1.6 -7.5 0 Z"
      />
      <path
        className="process-jelly__shine"
        d="M-3.2 -7.2 C-1.4 -9.2 1.4 -9.2 3.2 -7.2"
      />
      <path
        className="process-jelly__tendril"
        d="M-3.5 2.2 C-4.5 7 -2.5 10 -3.8 14"
      />
      <path
        className="process-jelly__tendril process-jelly__tendril--mid"
        d="M0 2.4 C0.4 8 -0.6 11 0.3 15.5"
      />
      <path
        className="process-jelly__tendril process-jelly__tendril--late"
        d="M3.5 2.2 C4.6 7 2.8 10.5 4 14.5"
      />
    </g>
  );
}
