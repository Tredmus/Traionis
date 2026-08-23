/**
 * Light shafts crossing the waterline.
 *
 * The hero canvas paints the half above the boundary and the shallows band
 * paints the half below it. They are two canvases in two sections, so the
 * column geometry, the drift and the alpha where they meet all have to come
 * from one place — otherwise the light restarts at the section edge, and
 * light restarting at an edge IS the seam.
 *
 * Numbers are literal rather than tokens for the same reason the atmosphere
 * colours are: canvas cannot read custom properties without a getComputedStyle
 * round trip.
 *
 * Light lives on the right (same afterglow as the hero), so columns lean left
 * as they fall — the opposite of a sun high on the left.
 */

export const SHAFT_COLUMNS = 5;

/** Blur radius at 1x, applied once when the texture is built. Never per frame. */
export const SHAFT_BLUR = 38;

export interface ShaftColumn {
  /** Centre of the column where it enters the water. */
  originX: number;
  /** Half-width at entry. */
  spread: number;
  /**
   * Sideways travel from the top of a band to its bottom.
   * Negative = lean left (light entering from the right).
   */
  lean: number;
}

export function shaftColumn(index: number, width: number): ShaftColumn {
  return {
    originX: width * (0.08 + index * 0.21),
    spread: width * (0.05 + (index % 3) * 0.022),
    // From the right-hand afterglow — beams fall away to the left.
    lean: -width * (0.12 + (index % 2) * 0.03),
  };
}

/**
 * One clock for both canvases. They mount separately and their loops start and
 * stop independently as bands scroll in and out, so elapsed time cannot come
 * from either component's own start or the two halves drift apart.
 */
const EPOCH = typeof performance === "undefined" ? 0 : performance.now();

export function shaftElapsed(now: number): number {
  return (now - EPOCH) / 1000;
}

/** Slow vertical breathe of the field. */
export function shaftBob(elapsed: number, height: number): number {
  return Math.sin(elapsed * 0.09 + 0.6) * height * 0.008;
}

/**
 * Independent pendulum angle for one column (radians).
 * Tops stay near their entry; bottoms swing side to side like real shafts.
 */
export function shaftPendulum(index: number, elapsed: number): number {
  const phase = index * 1.37 + 0.55;
  const speed = 0.17 + (index % 3) * 0.045;
  const amp = 0.055 + (index % 2) * 0.018;
  return (
    Math.sin(elapsed * speed + phase) * amp +
    Math.sin(elapsed * speed * 0.61 + phase * 1.9) * amp * 0.38
  );
}

/** Soft drift of where the beam enters — surface chop, not the swing itself. */
export function shaftEntryDrift(index: number, elapsed: number, width: number): number {
  const phase = index * 0.91 + 0.2;
  return (
    Math.sin(elapsed * 0.085 + phase) * width * 0.011 +
    Math.sin(elapsed * 0.13 + phase * 1.4) * width * 0.004
  );
}

/** Slow breathing of its strength. */
export function shaftShimmer(elapsed: number): number {
  return 0.78 + Math.sin(elapsed * 0.15) * 0.14 + Math.sin(elapsed * 0.31 + 1.2) * 0.08;
}

/** Lateral drift of the whole light field — kept for any shared overlays. */
export function shaftSway(elapsed: number, width: number): number {
  return (
    Math.sin(elapsed * 0.11) * width * 0.024 +
    Math.sin(elapsed * 0.071 + 1.7) * width * 0.011
  );
}

/** Secondary interference drift. */
export function shaftSwaySecondary(elapsed: number, width: number): number {
  return Math.sin(elapsed * 0.17 + 2.4) * width * 0.014;
}

/** Rewrite the alpha of an `rgb(r g b / a)` string, keeping the hue. */
export function withAlpha(color: string, alpha: number): string {
  return color.replace(/\/\s*[\d.]+\s*\)\s*$/, `/ ${alpha})`);
}

/** Read the alpha back out, so ramps can be expressed as a fraction of it. */
export function alphaOf(color: string): number {
  const match = color.match(/\/\s*([\d.]+)\s*\)\s*$/);
  return match ? Number(match[1]) : 1;
}

/**
 * Strength of the shafts exactly at a band's top edge, as a fraction of full.
 *
 * Not zero and not full. Beams are only legible once you are under the
 * surface looking along them, so they arrive faint at the boundary and open
 * up as you descend — but they have to arrive at SOME strength, because the
 * band above paints the same value at its bottom edge. That shared number is
 * what makes the two canvases meet without a line.
 */
export const SHAFT_ENTRY = 0.22;

/** How far into a band the shafts take to reach full strength. */
export const SHAFT_ENTRY_RUN = 0.2;
