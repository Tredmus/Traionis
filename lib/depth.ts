/**
 * The descent.
 *
 * Five flat colour bands. Depth maps to technical complexity, not decoration:
 * the further down the page, the harder the thing being described.
 *
 * Deliberately NOT a scroll-linked gradient. Each zone is an ordinary section
 * with a solid background and a hard boundary — scrolling past the edge IS the
 * transition. That costs nothing to render, behaves identically on mobile, and
 * is the most anti-gradient implementation available.
 *
 * `label` values are internal vocabulary and are NEVER rendered. The visible
 * marker is `readout` — a depth measurement, which encodes real information
 * (position in the descent) rather than decorating the section with a counter.
 */

export type ZoneId = "surface" | "shallows" | "mid" | "deep" | "abyss";

export interface Zone {
  id: ZoneId;
  /** Internal name only. Never rendered — rendering these makes it a theme park. */
  label: string;
  /** Flat background. No gradients. */
  background: string;
  /** Foreground paired to the background. */
  ink: string;
  /** Hairline colour paired to the background. */
  line: string;
  lineStrong: string;
  /** Visible depth marker. Measurement, not a section number. */
  readout: string;
}

export const ZONES: readonly Zone[] = [
  {
    id: "surface",
    label: "Surface",
    background: "var(--color-zone-surface)",
    ink: "var(--color-ink)",
    line: "var(--line)",
    lineStrong: "var(--line-strong)",
    readout: "0m",
  },
  {
    id: "shallows",
    label: "Shallows",
    background: "var(--color-zone-shallows)",
    // Light still reaches here: secondary text stays close to full strength.
    ink: "var(--color-ink)",
    line: "var(--line)",
    lineStrong: "var(--line-strong)",
    readout: "−40m",
  },
  {
    id: "mid",
    label: "Mid-water",
    background: "var(--color-zone-mid)",
    ink: "var(--color-ink)",
    line: "var(--line)",
    lineStrong: "var(--line-strong)",
    readout: "−200m",
  },
  {
    id: "deep",
    label: "Deep",
    background: "var(--color-zone-deep)",
    ink: "var(--color-ink)",
    line: "var(--line)",
    lineStrong: "var(--line-strong)",
    readout: "−1,000m",
  },
  {
    id: "abyss",
    label: "Abyss",
    background: "var(--color-zone-abyss)",
    ink: "var(--color-ink)",
    line: "var(--line)",
    lineStrong: "var(--line-strong)",
    readout: "−4,000m",
  },
] as const;

export const ZONE_BY_ID = Object.fromEntries(
  ZONES.map((zone) => [zone.id, zone]),
) as Record<ZoneId, Zone>;

/**
 * Atmosphere per band.
 *
 * Depth is a MEDIUM, not a colour. Light shafts reach the top bands and die
 * out with depth; particulate thickens; pressure darkening closes in; and in
 * the deepest bands artificial light becomes the only light source, because
 * artificial light is all there is down there.
 *
 * Colours are literal rgba here rather than CSS vars — canvas cannot read
 * custom properties without a getComputedStyle round trip per frame. They
 * mirror the tokens in globals.css; change both together.
 */
export interface ZoneAtmosphere {
  /** Suspended particulate. 0 = none. */
  motes: number;
  moteColor: string;
  /** Downward drift, px/second at 1x. */
  drift: number;
  /** Light penetrating from above. 0 = no light reaches here. */
  shafts: number;
  shaftColor: string;
  /** Pressure darkening at the edges. */
  vignette: number;
  vignetteColor: string;
  /** Artificial light pool — the light you brought. */
  lamp: number;
  lampColor: string;
}

export const ZONE_ATMOSPHERE: Record<ZoneId, ZoneAtmosphere> = {
  surface: {
    // Open air above the waterline at dusk — the last of the light, no
    // particulate. Dim enough that the water below is the brighter thing.
    motes: 0,
    moteColor: "rgb(216 234 255 / 0.4)",
    drift: 0,
    shafts: 0.16,
    shaftColor: "rgb(150 190 230 / 0.28)",
    vignette: 0.3,
    vignetteColor: "rgb(2 8 18 / 0.5)",
    lamp: 0,
    lampColor: "rgb(150 205 255 / 0.2)",
  },
  shallows: {
    motes: 0.48,
    moteColor: "rgb(216 234 255 / 0.78)",
    drift: 9,
    shafts: 1,
    shaftColor: "rgb(188 224 255 / 0.46)",
    vignette: 0.35,
    vignetteColor: "rgb(4 12 26 / 0.55)",
    lamp: 0,
    lampColor: "rgb(150 205 255 / 0.2)",
  },
  mid: {
    motes: 0.85,
    moteColor: "rgb(202 226 250 / 0.58)",
    drift: 6.5,
    shafts: 0.42,
    shaftColor: "rgb(148 198 246 / 0.3)",
    vignette: 0.6,
    vignetteColor: "rgb(2 8 18 / 0.7)",
    lamp: 0,
    lampColor: "rgb(150 205 255 / 0.2)",
  },
  deep: {
    motes: 1,
    moteColor: "rgb(190 218 246 / 0.45)",
    drift: 4.2,
    shafts: 0,
    shaftColor: "rgb(150 205 255 / 0)",
    vignette: 0.82,
    // A dive lamp is cold white, not brand cyan. Keeping the lamp blue-white
    // is what stops the deep bands reading as accent colour instead of water.
    vignetteColor: "rgb(1 4 10 / 0.85)",
    lamp: 0.55,
    lampColor: "rgb(146 200 255 / 0.2)",
  },
  abyss: {
    motes: 0.55,
    moteColor: "rgb(178 208 240 / 0.3)",
    drift: 2.2,
    shafts: 0,
    shaftColor: "rgb(150 205 255 / 0)",
    vignette: 0.95,
    vignetteColor: "rgb(0 0 0 / 0.9)",
    lamp: 0.85,
    lampColor: "rgb(140 196 255 / 0.22)",
  },
};

/** Shared stagger step for reveals, in seconds. */
export const STAGGER_STEP = 0.07;

/** The only easing curve in the codebase, as a JS array for motion. */
export const EASE_DESCENT = [0.22, 1, 0.36, 1] as const;
