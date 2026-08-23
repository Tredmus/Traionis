"use client";

import { useEffect, useRef } from "react";

import { ZONE_ATMOSPHERE, type ZoneId } from "@/lib/depth";
import {
  SHAFT_BLUR,
  SHAFT_COLUMNS,
  shaftBob,
  shaftColumn,
  shaftElapsed,
  shaftEntryDrift,
  shaftPendulum,
  shaftShimmer,
} from "@/lib/shafts";

/**
 * The medium.
 *
 * Each band renders its own atmosphere: light shafts from above, suspended
 * particulate, pressure darkening, and — in the deepest bands — a pool of
 * artificial light. Together they are what makes the descent legible as a
 * descent rather than as a set of coloured rectangles.
 *
 * Cost discipline, because this runs behind real content:
 *  - Each shaft is baked ONCE into its own offscreen canvas (blur once).
 *    Per frame we only drawImage + a cheap rotate around the entry point so
 *    bottoms pendulum side to side independently — real shafts, not a slide.
 *  - Gradients for the vignette and lamp are built once per resize and cached.
 *  - Only bands intersecting the viewport animate. Everything else is stopped,
 *    so at most two of these loops exist at any moment.
 *  - Mote counts scale with area and are roughly halved on touch devices.
 *  - prefers-reduced-motion renders one static frame and never starts a loop.
 */

interface AtmosphereProps {
  zone: ZoneId;
  className?: string;
}

interface Mote {
  x: number;
  y: number;
  r: number;
  /** Vertical drift, px/s at 1x. Positive sinks; negative rises (bubbles). */
  speed: number;
  sway: number;
  swaySpeed: number;
  phase: number;
  alpha: number;
  twinkle: number;
}

interface ShaftSprite {
  canvas: HTMLCanvasElement;
  /** X in the texture where the beam's top centre sits. */
  anchorX: number;
  /** Rest entry X in the band. */
  originX: number;
  index: number;
}

export function Atmosphere({ zone, className = "" }: AtmosphereProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const config = ZONE_ATMOSPHERE[zone];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let motes: Mote[] = [];
    let shaftSprites: ShaftSprite[] = [];
    let vignette: CanvasGradient | null = null;
    let lamp: CanvasGradient | null = null;

    let raf = 0;
    let running = false;
    let last = performance.now();

    /**
     * One blurred sprite per column. Drawn each frame with a rotate around the
     * surface entry so the beam pendulums — bottoms swing, tops mostly hold.
     */
    function buildShafts() {
      shaftSprites = [];
      if (config.shafts <= 0) return;

      const blur = Math.round(SHAFT_BLUR * dpr);
      for (let i = 0; i < SHAFT_COLUMNS; i += 1) {
        const col = shaftColumn(i, width);
        const leanAbs = Math.abs(col.lean);
        const bottomHalf = col.spread * 2.4 + leanAbs;
        const halfW = Math.ceil(
          Math.max(col.spread, bottomHalf) + blur * 2 + width * 0.05,
        );
        const texW = halfW * 2;
        const off = document.createElement("canvas");
        off.width = texW;
        off.height = height;
        const octx = off.getContext("2d");
        if (!octx) continue;

        const ax = halfW;
        const gradient = octx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, config.shaftColor);
        gradient.addColorStop(0.55, config.shaftColor.replace(/[\d.]+\)$/, "0.06)"));
        gradient.addColorStop(1, "rgb(0 0 0 / 0)");

        octx.filter = `blur(${blur}px)`;
        octx.fillStyle = gradient;
        octx.beginPath();
        octx.moveTo(ax - col.spread, 0);
        octx.lineTo(ax + col.spread, 0);
        octx.lineTo(ax + col.spread * 2.4 + col.lean, height);
        octx.lineTo(ax - col.spread * 2.4 + col.lean, height);
        octx.closePath();
        octx.fill();
        octx.filter = "none";

        shaftSprites.push({
          canvas: off,
          anchorX: ax,
          originX: col.originX,
          index: i,
        });
      }
    }

    function buildGradients() {
      if (config.vignette > 0) {
        vignette = ctx!.createRadialGradient(
          width * 0.5,
          height * 0.42,
          Math.min(width, height) * 0.16,
          width * 0.5,
          height * 0.5,
          Math.max(width, height) * 0.78,
        );
        vignette.addColorStop(0, "rgb(0 0 0 / 0)");
        vignette.addColorStop(1, config.vignetteColor);
      } else {
        vignette = null;
      }

      if (config.lamp > 0) {
        lamp = ctx!.createRadialGradient(
          width * 0.5,
          height * 0.34,
          0,
          width * 0.5,
          height * 0.34,
          Math.max(width, height) * 0.48,
        );
        lamp.addColorStop(0, config.lampColor);
        lamp.addColorStop(1, "rgb(0 0 0 / 0)");
      } else {
        lamp = null;
      }
    }

    function seedMotes() {
      if (config.motes <= 0) {
        motes = [];
        return;
      }

      const area = (width * height) / (dpr * dpr);
      const base = Math.round((area / 22000) * config.motes);
      const count = Math.min(coarse ? 110 : 260, Math.max(16, coarse ? base * 0.55 : base));

      motes = Array.from({ length: count }, (_, i) => {
        // A few rise — bubbles / lift — so the field isn't only sinking dust.
        const rises = i % 7 === 0 && config.drift > 0;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: (0.55 + Math.random() * 1.9) * dpr,
          speed: rises
            ? -(0.4 + Math.random() * 0.9) * config.drift * dpr
            : (0.4 + Math.random() * 1.15) * config.drift * dpr,
          sway: (6 + Math.random() * 22) * dpr,
          swaySpeed: 0.18 + Math.random() * 0.35,
          phase: Math.random() * Math.PI * 2,
          alpha: 0.22 + Math.random() * 0.78,
          twinkle: Math.random() > 0.55 ? 0.2 + Math.random() * 0.45 : 0,
        };
      });
    }

    function resize() {
      const rect = wrap!.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
      width = Math.max(1, Math.round(rect.width * dpr));
      height = Math.max(1, Math.round(rect.height * dpr));
      canvas!.width = width;
      canvas!.height = height;
      canvas!.style.width = `${rect.width}px`;
      canvas!.style.height = `${rect.height}px`;

      buildShafts();
      buildGradients();
      seedMotes();
    }

    function draw(now: number) {
      const elapsed = shaftElapsed(now);
      const dt = reduced ? 0 : Math.min((now - last) / 1000, 0.05);
      last = now;

      ctx!.clearRect(0, 0, width, height);

      // Light from above — each column pendulums on its own clock.
      if (shaftSprites.length > 0) {
        const shimmer = reduced ? 1 : shaftShimmer(elapsed);
        const bob = reduced ? 0 : shaftBob(elapsed, height);
        ctx!.globalAlpha = config.shafts * shimmer;
        for (const shaft of shaftSprites) {
          const angle = reduced ? 0 : shaftPendulum(shaft.index, elapsed);
          const drift = reduced
            ? 0
            : shaftEntryDrift(shaft.index, elapsed, width);
          ctx!.save();
          ctx!.translate(shaft.originX + drift, bob);
          ctx!.rotate(angle);
          ctx!.drawImage(shaft.canvas, -shaft.anchorX, 0);
          ctx!.restore();
        }
        ctx!.globalAlpha = 1;
      }

      // Artificial light, beneath the particulate so motes read as lit.
      if (lamp) {
        ctx!.globalAlpha = config.lamp;
        ctx!.fillStyle = lamp;
        ctx!.fillRect(0, 0, width, height);
        ctx!.globalAlpha = 1;
      }

      // Suspended particulate — drifts, sways, and a few twinkle.
      if (motes.length > 0) {
        ctx!.fillStyle = config.moteColor;
        for (const mote of motes) {
          if (!reduced) {
            mote.y += mote.speed * dt;
            mote.x += Math.sin(elapsed * 0.12 + mote.phase) * mote.speed * 0.08 * dt;
            if (mote.speed >= 0 && mote.y - mote.r > height) {
              mote.y = -mote.r;
              mote.x = Math.random() * width;
            } else if (mote.speed < 0 && mote.y + mote.r < 0) {
              mote.y = height + mote.r;
              mote.x = Math.random() * width;
            }
            if (mote.x < -mote.sway) mote.x = width + mote.sway;
            if (mote.x > width + mote.sway) mote.x = -mote.sway;
          }
          const x =
            mote.x + Math.sin(elapsed * mote.swaySpeed + mote.phase) * mote.sway;
          let alpha = mote.alpha;
          if (!reduced && mote.twinkle > 0) {
            const pulse = 0.5 + 0.5 * Math.sin(elapsed * (1.1 + mote.twinkle) + mote.phase);
            alpha *= 0.65 + mote.twinkle * pulse;
          }
          ctx!.globalAlpha = Math.min(1, alpha);
          ctx!.beginPath();
          ctx!.arc(x, mote.y, mote.r, 0, Math.PI * 2);
          ctx!.fill();
        }
        ctx!.globalAlpha = 1;
      }

      // Pressure closing in.
      if (vignette) {
        ctx!.fillStyle = vignette;
        ctx!.fillRect(0, 0, width, height);
      }
    }

    function loop(now: number) {
      draw(now);
      raf = requestAnimationFrame(loop);
    }

    function startLoop() {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    }

    function stopLoop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    function onVisibility() {
      if (document.hidden) stopLoop();
    }

    resize();
    draw(performance.now());

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    resizeObserver.observe(wrap);

    // Only bands on screen animate.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !document.hidden) startLoop();
          else stopLoop();
        }
      },
      { threshold: 0, rootMargin: "10% 0px" },
    );
    io.observe(wrap);

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [zone]);

  // Shafts and particulate are strongest at the top of a band and must not be
  // sliced off at the bottom edge — a hard clip reads as a cut, not as depth.
  // The top edge is handled by the incoming band's blend overlay instead, so
  // light entering from above keeps its full strength.
  const fade =
    "linear-gradient(to bottom, rgb(0 0 0) 0%, rgb(0 0 0) 84%, rgb(0 0 0 / 0) 100%)";

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
      style={{ maskImage: fade, WebkitMaskImage: fade }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
