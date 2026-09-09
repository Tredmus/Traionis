import type { CSSProperties, ReactNode } from "react";

import { ZONE_BY_ID, type ZoneId } from "@/lib/depth";
import { Atmosphere } from "./Atmosphere";

/**
 * One band of the descent.
 *
 * A plain section with a flat background and a hard edge. There is no
 * scroll-linked interpolation and no fixed backdrop layer — scrolling past
 * the boundary IS the transition. Zero render cost, identical on mobile,
 * and the most anti-gradient implementation available.
 *
 * Each zone republishes `--zone-ink` and `--zone-line` so descendants inherit
 * the correct foreground pairing. The surface band inverts to dark-on-light;
 * everything below it is light-on-dark.
 */

interface DepthZoneProps {
  zone: ZoneId;
  children: ReactNode;
  id?: string;
  className?: string;
  /** Vertical rhythm. `none` for zones that manage their own (the hero). */
  padding?: "default" | "none";
  as?: "section" | "div" | "footer";
  ariaLabel?: string;
  /**
   * The medium. One per band — a band split across two DepthZones would show
   * the atmosphere restart at the seam, so bands are composed as single zones.
   */
  atmosphere?: boolean;
  /** Layout classes for the content layer that sits above the atmosphere. */
  contentClassName?: string;
  /**
   * The band above this one. Its colour bleeds down into the top of this band
   * so the boundary reads as water changing rather than as two rectangles
   * butted together.
   *
   * This is a localised transition — roughly one sixth of a viewport — not a
   * page-length gradient wash. The bands stay flat; only the seam blends.
   */
  blendFrom?: ZoneId;
  /** Blend depth. The plunge off the surface stays tighter than the rest. */
  blendHeight?: string;
  /**
   * The surface band paints past its box so the waterline can sit on the
   * shallows. Clipped everywhere else — atmosphere canvases must not leak.
   */
  overflow?: "hidden" | "visible";
  /** Replaces the zone token. Gradients allowed — the surface fades out so
   *  the waterline can punch through to the band underneath. */
  background?: string;
}

export function DepthZone({
  zone,
  children,
  id,
  className = "",
  padding = "default",
  as: Tag = "section",
  ariaLabel,
  atmosphere = true,
  contentClassName = "",
  blendFrom,
  blendHeight = "clamp(120px, 18vh, 260px)",
  overflow = "hidden",
  background,
}: DepthZoneProps) {
  const config = ZONE_BY_ID[zone];

  const style: CSSProperties = {
    color: config.ink,
    ["--zone-ink" as string]: config.ink,
    ["--zone-line" as string]: config.line,
    ["--zone-line-strong" as string]: config.lineStrong,
  };

  if (background) style.background = background;
  else style.backgroundColor = config.background;

  const paddingClass =
    padding === "none" ? "" : "py-28 sm:py-36 lg:py-48";
  /**
   * `clip`, never `hidden`. Both clip identically, but `overflow: hidden` is a
   * programmatically scrollable box and therefore a scroll container — which
   * makes it the resolution target for every `view()` scroll timeline inside
   * it. Since the band never scrolls, those timelines resolve inactive and
   * their animations silently freeze at their end state. `clip` is not a
   * scroll container, so timelines pass through to the document scroller.
   *
   * The dive profile and the work gallery's mobile plate sweep both depend on
   * this.
   */
  const overflowClass = overflow === "visible" ? "overflow-visible" : "overflow-clip";

  return (
    <Tag
      id={id}
      data-zone={zone}
      aria-label={ariaLabel}
      style={style}
      className={`relative w-full ${overflowClass} ${paddingClass} ${className}`.trim()}
    >
      {atmosphere && <Atmosphere zone={zone} />}

      {blendFrom && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-[5]"
          style={{
            height: blendHeight,
            backgroundImage: `linear-gradient(to bottom, ${ZONE_BY_ID[blendFrom].background} 0%, transparent 100%)`,
          }}
        />
      )}

      <div className={`relative z-10 flex w-full flex-col ${contentClassName}`.trim()}>
        {children}
      </div>
    </Tag>
  );
}

/** Consistent horizontal gutter and max measure for zone content. */
export function ZoneInner({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16 ${className}`.trim()}>
      {children}
    </div>
  );
}
