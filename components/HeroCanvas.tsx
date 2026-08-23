"use client";

import { useEffect, useRef } from "react";

import { PLUNGE_IMPACT_EVENT, PLUNGE_IMPACT_MS, type PlungeImpactDetail } from "@/lib/plunge";

/**
 * Looking out over the water at dusk.
 *
 * The light has gone; what is left is an afterglow on the horizon, a thin
 * field of stars overhead, and the water carrying it. The near edge is not
 * a section seam: the crests become a silhouette, the same water seen in
 * cross-section, and the shallows show through below it. The light is under
 * the surface, not above it.
 *
 * The surface is drawn as a dense set of crest lines in perspective, not as
 * a handful of thick blurred bands: five big soft shapes read as blobs at any
 * real viewport width, and a pointer that displaces one of their outlines
 * reads as a chevron rather than as a disturbance in water. Many thin,
 * nearly-parallel, low-alpha lines resolve into an actual surface and give
 * the ripple something to travel across. It costs roughly the same per frame
 * as the blurred bands did, most of it in path sampling — hence the step
 * sizes below.
 *
 * The far horizon comes from `--hero-horizon`, as a fraction of the first
 * viewport, so the paint and the type block above it stay locked together.
 * The plunge waterline sits at the bottom of the (taller) hero box, below
 * the fold.
 *
 * Scroll lowers the camera: the looking-down sea compresses toward the cut
 * until only a thin water-break ribbon remains, then the page goes under.
 */

interface HeroCanvasProps {
  className?: string;
}

/** The shallows token, --color-zone-shallows. */
const WATER = { r: 31, g: 62, b: 112 };
/** Near-field water — the dimmest part of the sea. */
const WATER_NEAR = { r: 19, g: 41, b: 74 };
/** Water at the horizon, holding the last of the sky. */
const WATER_FAR = { r: 26, g: 54, b: 86 };
const SKY_TOP = { r: 10, g: 20, b: 36 };
const SKY_MID = { r: 18, g: 38, b: 62 };
const SKY_HORIZON = { r: 42, g: 78, b: 112 };

const TAU = Math.PI * 2;
/** Colour stops per crest line. Sets how finely light can vary along a wave. */
const STOPS = 14;

/** Smooth 0→1 with zero slope at both ends. Nothing here may arrive at a corner. */
function smoothstep(edge: number): number {
  const e = edge < 0 ? 0 : edge > 1 ? 1 : edge;
  return e * e * (3 - 2 * e);
}

export function HeroCanvas({ className = "" }: HeroCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let width = 0;
    let height = 0;
    /** The hero box, in device px — taller than the first viewport by the plunge. */
    let heroHeight = 0;
    /** The first viewport, in device px. Horizon and type live in this. */
    let viewHeight = 0;
    let dpr = 1;
    /** True when the far-field wavelength is too short for the wide-canvas step. */
    let dense = false;
    /** Far horizon at rest, as a fraction of the first viewport. Owned by CSS. */
    let horizonFrac = 0.47;
    /** 0 = elevated looking-down sea; 1 = water-break, surface almost gone. */
    let descent = 0;
    /** Live far-horizon Y in device px — rest horizon eased toward the cut. */
    let liveHorizon = 0;

    /** Where the pointer is, and where the water thinks it is — water lags. */
    let pointerRawX = -1;
    let pointerRawY = -1;
    let pointerX = -1;
    let pointerY = -1;
    let pointerStrength = 0;
    let pointerTarget = 0;
    let pointerReleaseFrom = 0;
    let pointerReleasedAt = 0;
    const POINTER_RELEASE_MS = 500;

    /** Button-only surface break — never armed by ordinary scroll or hover. */
    let impactX = -1;
    let impactY = -1;
    let impactStrength = 0;
    let impactStartedAt = 0;
    const IMPACT_MS = PLUNGE_IMPACT_MS;

    interface Star {
      x: number;
      y: number;
      r: number;
      base: number;
      twinkle: number;
      phase: number;
      speed: number;
    }

    let stars: Star[] = [];

    let raf = 0;
    let visible = true;
    let running = false;
    const start = performance.now();

    /** Deterministic 0→1 from a seed. Same layout every resize of the same size. */
    function hash(n: number) {
      const s = Math.sin(n * 12.9898) * 43758.5453;
      return s - Math.floor(s);
    }

    function seedStars() {
      // Seed for the tallest sky the descent can open (horizon dropping toward
      // the cut). drawStars clips to the live horizon so they don't sit on water.
      const skyCeil = Math.max(viewHeight * horizonFrac, heroHeight * 0.9);
      if (skyCeil < 8) {
        stars = [];
        return;
      }

      // Sparse dusk sky — enough to read as stars, not a glitter field.
      const area = (width * skyCeil) / (dpr * dpr);
      const count = Math.min(
        coarse ? 48 : 90,
        Math.max(18, Math.round(area / (coarse ? 14000 : 9000))),
      );

      stars = Array.from({ length: count }, (_, i) => {
        const a = hash(i * 19.17 + 1.1);
        const b = hash(i * 7.33 + 2.4);
        const c = hash(i * 3.91 + 0.7);
        // Bias upward: more stars in the dark overhead than in the afterglow.
        const yNorm = b * b;
        return {
          x: a * width,
          y: yNorm * skyCeil * 0.92,
          r: (0.35 + c * 1.15) * dpr,
          base: 0.18 + c * 0.42,
          // Only some glisten — the rest hold steady.
          twinkle: hash(i * 11.3 + 4.2) > 0.62 ? 0.22 + hash(i * 5.1) * 0.38 : 0,
          phase: hash(i * 2.7 + 0.3) * TAU,
          speed: 0.35 + hash(i * 8.8 + 1.6) * 1.1,
        };
      });
    }

    function resize() {
      const rect = wrap!.getBoundingClientRect();
      const parent = wrap!.parentElement?.getBoundingClientRect();

      // One far-horizon for the whole hero: the type block is positioned off
      // the same custom property, so a viewport-height breakpoint moves both.
      const declared = parseFloat(
        getComputedStyle(wrap!).getPropertyValue("--hero-horizon"),
      );
      if (Number.isFinite(declared)) horizonFrac = declared / 100;

      // Phones are 2–3x. Capping them at 1.5 (or even 2 on a 3x screen) scaled
      // a soft bitmap up over sharp type, which is exactly the stair-stepped
      // crests. Wide layouts stay capped at 2 so the desktop paint is unchanged.
      dpr = Math.min(window.devicePixelRatio || 1, rect.width < 768 ? 3 : 2);
      width = Math.max(1, Math.round(rect.width * dpr));
      height = Math.max(1, Math.round(rect.height * dpr));
      viewHeight = Math.max(1, Math.round(window.innerHeight * dpr));
      heroHeight = Math.max(
        1,
        Math.round((parent?.height ?? rect.height) * dpr),
      );
      // Wavelength scales with canvas width. On a phone the far field is
      // ~35–50px; the wide-canvas step then yields two segments per crest.
      const desktopStep = Math.max(10, Math.round(9 * dpr));
      dense = (width * 0.045) / desktopStep < 6;
      canvas!.width = width;
      canvas!.height = height;
      canvas!.style.width = `${rect.width}px`;
      canvas!.style.height = `${rect.height}px`;
      seedStars();
      updateDescent();
      liveHorizon = horizonForDescent();
    }

    /**
     * How far the camera has dropped toward the water. Driven by where the
     * plunge cut sits in the viewport — not by a pinned scrub — so ordinary
     * scroll and the Continue control share the same altitude.
     */
    function updateDescent() {
      if (reduced) {
        descent = 0;
        return;
      }
      const parent = wrap!.parentElement;
      if (!parent || viewHeight <= 0) {
        descent = 0;
        return;
      }
      const box = parent.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh + Math.max(0, box.height - vh);
      // Water-break: cut near the upper fifth — surface is a thin ribbon.
      const end = vh * 0.2;
      const raw = (start - box.bottom) / Math.max(1, start - end);
      descent = smoothstep(Math.min(1, Math.max(0, raw)));
    }

    /** Rest horizon eased toward the cut as descent rises. */
    function horizonForDescent() {
      const rest = viewHeight * horizonFrac;
      const surfaceRest = Math.max(1, heroHeight - rest);
      // Leave a readable water-break ribbon — not a hard wipe to the cut.
      const ribbon = Math.max(32 * dpr, surfaceRest * 0.07);
      const waterBreak = heroHeight - ribbon;
      // Already smoothstepped in updateDescent — keep the drop linear so each
      // scroll tick thins the sea instead of holding the elevated view too long.
      return rest + (waterBreak - rest) * descent;
    }

    function drawStars(t: number, horizon: number) {
      if (stars.length === 0) return;

      for (const star of stars) {
        if (star.y > horizon * 0.98) continue;
        // Fade toward the afterglow so they don't sit on the lit horizon.
        const depth = 1 - star.y / Math.max(horizon, 1);
        const fade = smoothstep(depth * 1.35);
        if (fade < 0.02) continue;

        let alpha = star.base * fade;
        if (!reduced && star.twinkle > 0) {
          // Soft pulse, not a blink — peaks are rare and brief.
          const pulse = 0.5 + 0.5 * Math.sin(t * star.speed + star.phase);
          const glisten = pulse * pulse * pulse;
          alpha += star.twinkle * glisten * fade;
        }

        ctx!.globalAlpha = Math.min(0.95, alpha);
        ctx!.fillStyle = "rgb(220 234 252)";
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.r, 0, TAU);
        ctx!.fill();

        // A few of the brighter glints get a short cross of light.
        if (!reduced && star.twinkle > 0.35 && alpha > 0.55) {
          const reach = star.r * (2.2 + alpha);
          ctx!.globalAlpha = (alpha - 0.45) * 0.35;
          ctx!.strokeStyle = "rgb(230 242 255)";
          ctx!.lineWidth = Math.max(0.6, 0.55 * dpr);
          ctx!.beginPath();
          ctx!.moveTo(star.x - reach, star.y);
          ctx!.lineTo(star.x + reach, star.y);
          ctx!.moveTo(star.x, star.y - reach);
          ctx!.lineTo(star.x, star.y + reach);
          ctx!.stroke();
        }
      }
      ctx!.globalAlpha = 1;
    }

    /** Shared disturbance — pointer rings and the button-only plunge splash. */
    function rippleDelta(x: number, y: number, t: number, gain: number) {
      if (gain <= 0) return 0;
      let delta = 0;

      if (pointerStrength > 0.01 && pointerX >= 0) {
        const rippleR = width * 0.16;
        const dx = (x - pointerX) / rippleR;
        const dy = (y - pointerY) / (rippleR * 0.42);
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 1) {
          const env = 0.5 - 0.5 * Math.cos((1 - d) * Math.PI);
          delta +=
            Math.sin(d * TAU * 1.7 - t * 3) *
            env *
            env *
            gain *
            2.2 *
            pointerStrength;
        }
      }

      if (impactStrength > 0.01 && impactX >= 0) {
        const age = impactStartedAt > 0 ? (performance.now() - impactStartedAt) / 1000 : 0;
        // Expanding break — starts tight under the control, opens as you go under.
        const rippleR = width * (0.1 + age * 0.32);
        const dx = (x - impactX) / rippleR;
        const dy = (y - impactY) / (rippleR * 0.48);
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 1) {
          const env = 0.5 - 0.5 * Math.cos((1 - d) * Math.PI);
          // Two concentric rings read as a strike, not a hover caress.
          const rings =
            Math.sin(d * TAU * 2.1 - age * 9) * 0.7 +
            Math.sin(d * TAU * 3.4 - age * 14) * 0.3;
          delta += rings * env * env * gain * 3.4 * impactStrength;
        }
      }

      return delta;
    }

    /**
     * The surface. Crest lines from the horizon down, spaced and scaled in
     * perspective: crowded, flat and faint far away; open, tall and brighter
     * near the viewer.
     *
     * Adjacent rows carry almost the same phase on purpose — real crests run
     * roughly parallel, and rows that each got their own random phase both
     * tangle into each other and read as noise. The line spacing sets the
     * amplitude ceiling: waves taller than the gap to the next row would
     * cross it, which is exactly what "rough" looks like.
     */
    function drawSurface(t: number, horizon: number, depthBelow: number, sunX: number) {
      const rows = coarse ? 32 : 42;
      // Sampling step, device px. On a wide canvas the shortest wavelength is
      // ~110px and lines are 1–3px, so ~10 samples per wave is already smooth;
      // going finer just doubles the path work on a 2500px canvas. Dense
      // (phone) canvases sample the shortest train ~16× and stroke with
      // quadratics; wide canvases keep the original step and lineTo.
      const desktopStep = Math.max(10, Math.round(9 * dpr));
      const farWl = width * 0.045;
      const stepX = dense ? Math.max(2, Math.round(farWl / 16)) : desktopStep;
      const rippleR = width * 0.16;
      const pointerLit =
        pointerStrength > 0.01 && pointerX >= 0 && pointerY > horizon;
      const impactLit = impactStrength > 0.01 && impactX >= 0 && impactY > horizon;

      ctx!.lineCap = dense ? "round" : "butt";
      ctx!.lineJoin = dense ? "round" : "miter";
      const edgeAmp = silhouetteAmp();

      for (let i = 0; i < rows; i += 1) {
        const p = (i + 0.5) / rows;
        // Perspective. Rows bunch up toward the horizon, and the exponent also
        // sets how much room the near rows have: waves can only be as tall as
        // the gap to the next line.
        const q = p ** 2;
        const y = horizon + depthBelow * q;

        // Far field keeps the dense looking-across texture. Toward the
        // plunge those trains give way to the shared silhouette, so the
        // last crests are the same water as the cut, not a foreign wave.
        const towardEdge = smoothstep((q - 0.42) / 0.58);
        const amp = depthBelow * (0.0018 + 0.017 * q);
        const wl1 = width * (0.045 + 0.17 * q);
        const wl2 = wl1 * 0.38;
        // Two trains. The second turns its phase over much faster from row to
        // row, so it crosses the first at an angle instead of marching with
        // it — that interference is what stops the surface reading as hatching.
        const phase = t * (0.3 + 0.7 * q) + q * 5.2;
        const phase2 = t * (0.5 + 0.9 * q) + q * 13;
        const lineWidth = Math.max(1, (0.6 + 1.9 * q) * dpr);

        // Swell groups: bands of rows run brighter than their neighbours and
        // the grouping drifts. Without it every crest carries identical weight
        // and the surface reads as engraving rather than water.
        const group = 0.72 + 0.28 * Math.sin(q * 7.5 - t * 0.45);

        // Fade in off the far horizon so the water dissolves into the haze.
        const alpha = (0.065 + 0.1 * q) * group * smoothstep(p * 6);

        // One gradient per row carries everything that varies along it: the
        // reflection column under the afterglow, and slow patches where the
        // crests catch more light than their neighbours. Modulating the line
        // brightness is what patchy water looks like — a translucent shape
        // laid over the water is a shape, and it reads as one.
        //
        // Sampled across the full width rather than at the ends: two stops
        // make a ramp that dims half the sea, not a patch.
        const sunU = sunX / width;
        // Gaussian width of the reflection column. Never narrower than the
        // stop spacing below, or the column samples badly and flickers.
        const su = 0.075 + 0.2 * q;
        const shimmer = reduced ? 1 : 0.85 + Math.sin(t * 0.9 + q * 4) * 0.15;
        const peak = Math.min(0.3, alpha * 2.4 * shimmer);

        const paint = ctx!.createLinearGradient(0, 0, width, 0);
        for (let s = 0; s <= STOPS; s += 1) {
          const u = s / STOPS;
          const patch = alpha * (0.8 + 0.2 * Math.sin(u * 9 + q * 3.4 - t * 0.22));
          // Reflection as a gaussian around the afterglow: no edge at any
          // width, and it dies out well before the sides of the canvas.
          const k = (u - sunU) / su;
          const bump = peak * Math.exp(-k * k);
          const w = peak > 0 ? bump / peak : 0;
          paint.addColorStop(
            u,
            `rgb(${(150 + 48 * w) | 0} ${(192 + 34 * w) | 0} ${(232 + 20 * w) | 0} / ${
              patch + bump
            })`,
          );
        }

        ctx!.strokeStyle = paint;
        ctx!.lineWidth = lineWidth;
        ctx!.beginPath();

        const crestAt = (x: number) => {
          const texture =
            Math.sin((x / wl1) * TAU + phase) * amp +
            Math.sin((x / wl2) * TAU - phase2) * amp * 0.4;
          return (
            y +
            texture * (1 - towardEdge) * (1 - towardEdge) +
            waveShape(x, t) * edgeAmp * towardEdge +
            rippleDelta(x, y, t, amp)
          );
        };

        if (dense) {
          let prevX = 0;
          let prevY = 0;
          let started = false;
          for (let x = -stepX; x <= width + stepX; x += stepX) {
            const yy = crestAt(x);
            if (!started) {
              ctx!.moveTo(x, yy);
              prevX = x;
              prevY = yy;
              started = true;
            } else {
              ctx!.quadraticCurveTo(
                prevX,
                prevY,
                (prevX + x) / 2,
                (prevY + yy) / 2,
              );
              prevX = x;
              prevY = yy;
            }
          }
          ctx!.lineTo(prevX, prevY);
        } else {
          for (let x = -stepX; x <= width + stepX; x += stepX) {
            const yy = crestAt(x);
            if (x === -stepX) ctx!.moveTo(x, yy);
            else ctx!.lineTo(x, yy);
          }
        }

        ctx!.stroke();

        // What the pointer lights up: the disturbed crests themselves, as a
        // second pass over the same path. A radial gradient laid on top of the
        // water instead would be a soft circle sitting on the surface — which
        // is exactly what it looked like.
        if (pointerLit) {
          const rowFall = 1 - Math.abs(y - pointerY) / (rippleR * 0.55);
          if (rowFall > 0) {
            const lit = rowFall * rowFall * pointerStrength;
            const reach = rippleR * 1.15;
            const halo = ctx!.createLinearGradient(pointerX - reach, 0, pointerX + reach, 0);
            halo.addColorStop(0, "rgb(198 226 252 / 0)");
            halo.addColorStop(0.5, `rgb(204 230 255 / ${0.2 * lit})`);
            halo.addColorStop(1, "rgb(198 226 252 / 0)");
            ctx!.strokeStyle = halo;
            ctx!.stroke();
          }
        }

        if (impactLit) {
          const age =
            impactStartedAt > 0 ? (performance.now() - impactStartedAt) / 1000 : 0;
          const impactR = width * (0.1 + age * 0.32);
          const rowFall = 1 - Math.abs(y - impactY) / (impactR * 0.62);
          if (rowFall > 0) {
            const lit = rowFall * rowFall * impactStrength;
            const reach = impactR * 1.2;
            const halo = ctx!.createLinearGradient(impactX - reach, 0, impactX + reach, 0);
            halo.addColorStop(0, "rgb(18 168 212 / 0)");
            halo.addColorStop(0.5, `rgb(120 220 255 / ${0.34 * lit})`);
            halo.addColorStop(1, "rgb(18 168 212 / 0)");
            ctx!.strokeStyle = halo;
            ctx!.lineWidth = lineWidth + 0.6 * dpr;
            ctx!.stroke();
          }
        }
      }
    }

    /** Unit displacement of the plunge silhouette. Shared with the near crests. */
    function waveShape(x: number, t: number) {
      const u = x / Math.max(width, 1);
      return (
        Math.sin(u * TAU * 0.82 + t * 0.26 + 0.55) * 0.7 +
        Math.sin(u * TAU * 2.15 - t * 0.48 + 1.1) * 0.22 +
        Math.sin(u * TAU * 6.4 + t * 0.85) * 0.08
      );
    }

    function silhouetteAmp() {
      return Math.min(heroHeight * 0.046, 42 * dpr);
    }

    function waterlineY(x: number, t: number, baseY: number, amp: number) {
      const y = baseY + waveShape(x, t) * amp;
      // Quieter than the crest rings — the cut is a silhouette, not a field of lines.
      return y + rippleDelta(x, baseY, t, amp * 0.28);
    }

    function strokeWave(pts: { x: number; y: number }[]) {
      ctx!.beginPath();
      ctx!.moveTo(pts[0]!.x, pts[0]!.y);
      for (let i = 1; i < pts.length - 1; i += 1) {
        const curr = pts[i]!;
        const next = pts[i + 1]!;
        ctx!.quadraticCurveTo(curr.x, curr.y, (curr.x + next.x) / 2, (curr.y + next.y) / 2);
      }
      const lastPt = pts[pts.length - 1]!;
      ctx!.lineTo(lastPt.x, lastPt.y);
    }

    /**
     * The plunge. Looking-down water is clipped to a side-view silhouette,
     * and the shallows show through below it.
     */
    function drawWaterline(t: number, baseY: number, sunX: number) {
      const amp = silhouetteAmp();
      // 24 samples on the shortest silhouette cycle (6.4 across the width).
      // Wide canvases keep the original step so the cut does not change.
      const step = dense
        ? Math.max(2, Math.round(width / (6.4 * 24)))
        : Math.max(4, Math.round(3 * dpr));
      const rippleR = width * 0.16;
      const pointerLit =
        pointerStrength > 0.01 &&
        pointerX >= 0 &&
        Math.abs(pointerY - baseY) < rippleR * 0.7;
      const impactLit = impactStrength > 0.01 && impactX >= 0;

      const pts: { x: number; y: number }[] = [];
      for (let x = 0; x <= width; x += step) {
        pts.push({ x, y: waterlineY(x, t, baseY, amp) });
      }
      if (pts[pts.length - 1]!.x < width) {
        pts.push({ x: width, y: waterlineY(width, t, baseY, amp) });
      }
      if (pts.length < 3) return;

      const fillBelow = () => {
        strokeWave(pts);
        ctx!.lineTo(width, height + 2);
        ctx!.lineTo(0, height + 2);
        ctx!.closePath();
      };

      fillBelow();
      ctx!.save();
      ctx!.globalCompositeOperation = "destination-out";
      ctx!.fillStyle = "#000";
      ctx!.fill();
      ctx!.restore();

      ctx!.lineJoin = "round";
      ctx!.lineCap = "round";

      ctx!.save();
      fillBelow();
      ctx!.clip();
      strokeWave(pts);
      ctx!.strokeStyle = "rgb(186 224 255 / 0.06)";
      ctx!.lineWidth = 10 * dpr;
      ctx!.stroke();

      const n = coarse ? 12 : 24;
      ctx!.fillStyle = "rgb(232 246 255)";
      for (let i = 0; i < n; i += 1) {
        const seed = i * 12.9898;
        const x = (Math.sin(seed * 4.331) * 0.5 + 0.5) * width;
        const yWave = waterlineY(x, t, baseY, amp);
        const local = (yWave - baseY) / amp;
        if (local > 0.12) continue;
        const depth = (5 + (Math.sin(seed * 7.1) * 0.5 + 0.5) * 24) * dpr;
        const r = (0.5 + (Math.sin(seed * 3.7) * 0.5 + 0.5) * 1.6) * dpr;
        const bob = reduced ? 0 : Math.sin(t * 0.85 + seed) * 2 * dpr;
        ctx!.globalAlpha = 0.15 + (1 - depth / (32 * dpr)) * 0.26;
        ctx!.beginPath();
        ctx!.arc(x, yWave + depth + bob, r, 0, TAU);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      ctx!.restore();

      const sunU = sunX / Math.max(width, 1);
      const skin = ctx!.createLinearGradient(0, 0, width, 0);
      skin.addColorStop(0, "rgb(186 220 246 / 0.07)");
      skin.addColorStop(Math.max(0, sunU - 0.22), "rgb(210 234 252 / 0.16)");
      skin.addColorStop(sunU, "rgb(236 248 255 / 0.34)");
      skin.addColorStop(Math.min(1, sunU + 0.18), "rgb(210 234 252 / 0.18)");
      skin.addColorStop(1, "rgb(186 220 246 / 0.08)");
      strokeWave(pts);
      ctx!.strokeStyle = skin;
      ctx!.lineWidth = 1.8 * dpr;
      ctx!.stroke();

      const glint = ctx!.createLinearGradient(0, 0, width, 0);
      glint.addColorStop(0, "rgb(230 244 255 / 0)");
      glint.addColorStop(sunU, "rgb(255 255 255 / 0.22)");
      glint.addColorStop(1, "rgb(230 244 255 / 0)");
      strokeWave(pts);
      ctx!.strokeStyle = glint;
      ctx!.lineWidth = 0.9 * dpr;
      ctx!.stroke();

      // Pointer light on the cut — a soft catch, not a flare.
      if (pointerLit) {
        const rowFall = 1 - Math.abs(baseY - pointerY) / (rippleR * 0.7);
        if (rowFall > 0) {
          const lit = rowFall * rowFall * pointerStrength;
          const reach = rippleR * 1.05;
          const halo = ctx!.createLinearGradient(pointerX - reach, 0, pointerX + reach, 0);
          halo.addColorStop(0, "rgb(198 226 252 / 0)");
          halo.addColorStop(0.5, `rgb(210 236 255 / ${0.12 * lit})`);
          halo.addColorStop(1, "rgb(198 226 252 / 0)");
          strokeWave(pts);
          ctx!.strokeStyle = halo;
          ctx!.lineWidth = 1.6 * dpr;
          ctx!.stroke();
        }
      }

      if (impactLit) {
        const age =
          impactStartedAt > 0 ? (performance.now() - impactStartedAt) / 1000 : 0;
        const impactR = width * (0.1 + age * 0.32);
        const lit = impactStrength;
        const reach = impactR * 1.15;
        const halo = ctx!.createLinearGradient(impactX - reach, 0, impactX + reach, 0);
        halo.addColorStop(0, "rgb(18 168 212 / 0)");
        halo.addColorStop(0.5, `rgb(140 226 255 / ${0.28 * lit})`);
        halo.addColorStop(1, "rgb(18 168 212 / 0)");
        strokeWave(pts);
        ctx!.strokeStyle = halo;
        ctx!.lineWidth = 2.2 * dpr;
        ctx!.stroke();
      }
    }

    function draw(now: number) {
      const t = reduced ? 0 : (now - start) / 1000;
      if (pointerTarget > 0.5) {
        pointerReleasedAt = 0;
        pointerStrength += (1 - pointerStrength) * 0.14;
      } else if (pointerStrength > 0.002) {
        if (pointerReleasedAt === 0) {
          pointerReleasedAt = now;
          pointerReleaseFrom = pointerStrength;
        }
        const u = Math.min(1, (now - pointerReleasedAt) / POINTER_RELEASE_MS);
        const remaining = 1 - u * u * (3 - 2 * u);
        pointerStrength = pointerReleaseFrom * remaining;
        if (u >= 1) pointerStrength = 0;
      } else {
        pointerStrength = 0;
        pointerReleasedAt = 0;
      }

      if (impactStartedAt > 0) {
        const u = Math.min(1, (now - impactStartedAt) / IMPACT_MS);
        if (u >= 1) {
          impactStrength = 0;
          impactStartedAt = 0;
        } else if (u < 0.08) {
          impactStrength = u / 0.08;
        } else {
          const rest = (u - 0.08) / 0.92;
          impactStrength = 1 - rest * rest * (3 - 2 * rest);
        }
      }

      if (pointerRawX >= 0) {
        pointerX += (pointerRawX - pointerX) * 0.09;
        pointerY += (pointerRawY - pointerY) * 0.09;
      }

      updateDescent();
      const horizon = horizonForDescent();
      liveHorizon = horizon;
      const depthBelow = Math.max(1, heroHeight - horizon);

      ctx!.clearRect(0, 0, width, height);

      // Sky — dusk, darkest overhead.
      const sky = ctx!.createLinearGradient(0, 0, 0, horizon + heroHeight * 0.02);
      sky.addColorStop(0, `rgb(${SKY_TOP.r} ${SKY_TOP.g} ${SKY_TOP.b})`);
      sky.addColorStop(0.55, `rgb(${SKY_MID.r} ${SKY_MID.g} ${SKY_MID.b})`);
      sky.addColorStop(1, `rgb(${SKY_HORIZON.r} ${SKY_HORIZON.g} ${SKY_HORIZON.b})`);
      ctx!.fillStyle = sky;
      ctx!.fillRect(0, 0, width, heroHeight);

      // Afterglow. The sun is already down: a low, narrow bloom sitting on the
      // far horizon, not a disc in the sky.
      const sunX = width * 0.72;
      const glowY = horizon - heroHeight * 0.01;
      const glow = ctx!.createRadialGradient(sunX, glowY, 0, sunX, glowY, heroHeight * 0.42);
      glow.addColorStop(0, "rgb(168 206 240 / 0.3)");
      glow.addColorStop(0.28, "rgb(110 160 205 / 0.13)");
      glow.addColorStop(1, "rgb(90 140 190 / 0)");
      ctx!.fillStyle = glow;
      ctx!.fillRect(0, 0, width, horizon + heroHeight * 0.04);

      // Sea mass. One continuous lift from the dim far water into the near
      // field — the light is under the surface, not above it. Painted past
      // the hero box so troughs of the silhouette still carry water, not sky.
      const sea = ctx!.createLinearGradient(0, horizon, 0, heroHeight);
      sea.addColorStop(0, `rgb(${WATER_FAR.r} ${WATER_FAR.g} ${WATER_FAR.b})`);
      sea.addColorStop(0.22, `rgb(${WATER_NEAR.r} ${WATER_NEAR.g} ${WATER_NEAR.b})`);
      sea.addColorStop(0.72, "rgb(25 51 92)");
      sea.addColorStop(1, `rgb(${WATER.r} ${WATER.g} ${WATER.b})`);
      ctx!.fillStyle = sea;
      ctx!.fillRect(0, horizon - 2, width, height - horizon + 4);

      // Horizon haze — dissolves the far cut into atmosphere.
      const haze = ctx!.createLinearGradient(
        0,
        horizon - heroHeight * 0.08,
        0,
        horizon + heroHeight * 0.1,
      );
      haze.addColorStop(0, "rgb(52 92 130 / 0)");
      haze.addColorStop(0.45, "rgb(52 92 130 / 0.45)");
      haze.addColorStop(0.7, "rgb(38 72 106 / 0.2)");
      haze.addColorStop(1, "rgb(28 56 88 / 0)");
      ctx!.fillStyle = haze;
      ctx!.fillRect(0, horizon - heroHeight * 0.08, width, heroHeight * 0.18);

      drawSurface(t, horizon, depthBelow, sunX);

      // Night closing in overhead, so the header sits on darkness.
      const overhead = ctx!.createLinearGradient(0, 0, 0, heroHeight * 0.3);
      overhead.addColorStop(0, "rgb(3 9 18 / 0.5)");
      overhead.addColorStop(1, "rgb(3 9 18 / 0)");
      ctx!.fillStyle = overhead;
      ctx!.fillRect(0, 0, width, heroHeight * 0.3);

      // Pressure at the sides — the same closing-in the deeper bands use.
      const sides = ctx!.createLinearGradient(0, 0, width, 0);
      sides.addColorStop(0, "rgb(3 9 18 / 0.3)");
      sides.addColorStop(0.28, "rgb(3 9 18 / 0)");
      sides.addColorStop(0.74, "rgb(3 9 18 / 0)");
      sides.addColorStop(1, "rgb(3 9 18 / 0.26)");
      ctx!.fillStyle = sides;
      ctx!.fillRect(0, 0, width, height);

      // Stars sit in the night sky after the overhead darkens it. They fade
      // before the afterglow so the lit horizon stays empty.
      drawStars(t, horizon);

      // Horizon lip — soft haze only, no stroked silhouette.
      const lip = ctx!.createLinearGradient(
        0,
        horizon - heroHeight * 0.018,
        0,
        horizon + heroHeight * 0.028,
      );
      lip.addColorStop(0, "rgb(150 192 232 / 0)");
      lip.addColorStop(0.45, "rgb(150 192 232 / 0.18)");
      lip.addColorStop(1, "rgb(110 160 205 / 0)");
      ctx!.fillStyle = lip;
      ctx!.fillRect(0, horizon - heroHeight * 0.018, width, heroHeight * 0.046);

      drawWaterline(t, heroHeight, sunX);
    }

    function loop(now: number) {
      draw(now);
      raf = requestAnimationFrame(loop);
    }

    function startLoop() {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }

    function stopLoop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    function setPointerFromEvent(event: PointerEvent) {
      if (coarse || reduced) return;
      const rect = canvas!.getBoundingClientRect();
      const inside =
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom &&
        event.clientX >= rect.left &&
        event.clientX <= rect.right;

      const nextX = (event.clientX - rect.left) * dpr;
      const nextY = (event.clientY - rect.top) * dpr;

      // Armed over the looking-down surface and through the plunge cut.
      // The silhouette straddles heroHeight, so the band has to reach past it.
      const cutReach = silhouetteAmp() + width * 0.06;
      const armed =
        inside &&
        nextY > liveHorizon &&
        nextY < heroHeight + cutReach;

      pointerTarget = armed ? 1 : 0;
      if (!armed) return;

      pointerRawX = nextX;
      pointerRawY = nextY;
      if (pointerX < 0) {
        pointerX = pointerRawX;
        pointerY = pointerRawY;
      }
    }

    function onPointerMove(event: PointerEvent) {
      setPointerFromEvent(event);
    }

    function onPointerLeave() {
      if (coarse || reduced) return;
      pointerTarget = 0;
    }

    function onPlungeImpact(event: Event) {
      if (reduced) return;
      const detail = (event as CustomEvent<PlungeImpactDetail>).detail;
      if (!detail) return;
      const rect = canvas!.getBoundingClientRect();
      impactX = (detail.clientX - rect.left) * dpr;
      let nextY = (detail.clientY - rect.top) * dpr;
      const floor = (liveHorizon || viewHeight * horizonFrac) + 10 * dpr;
      const ceiling = heroHeight - 6 * dpr;
      impactY = Math.max(floor, Math.min(ceiling, nextY));
      impactStartedAt = performance.now();
      impactStrength = 1;
      if (visible && !document.hidden && !running) startLoop();
    }

    function onScroll() {
      if (!visible) return;
      // The rAF loop samples descent every frame while running; when paused
      // (reduced motion, or offscreen restart) still repaint on scroll.
      if (!running) draw(performance.now());
    }

    function onVisibility() {
      if (document.hidden) stopLoop();
      else if (visible) startLoop();
    }

    resize();
    draw(performance.now());

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    resizeObserver.observe(wrap);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible = entry.isIntersecting;
          if (visible && !document.hidden) startLoop();
          else stopLoop();
        }
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener(PLUNGE_IMPACT_EVENT, onPlungeImpact);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener(PLUNGE_IMPACT_EVENT, onPlungeImpact);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" className={`pointer-events-none ${className}`.trim()}>
      <canvas ref={canvasRef} className="block h-full w-full" style={{ pointerEvents: "none" }} />
    </div>
  );
}
