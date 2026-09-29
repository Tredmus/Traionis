"use client";

import type { CSSProperties } from "react";

import { DepthZone, ZoneInner } from "@/components/depth/DepthZone";
import { HeroCanvas } from "@/components/HeroCanvas";
import { PlungeControl } from "@/components/sections/PlungeControl";
import { ButtonLink } from "@/components/ui/Button";
import { sectionHref } from "@/lib/links";
import { useLocale } from "@/lib/locale-context";

/**
 * SURFACE — 0m. Standing at the water, last light.
 *
 * The canvas owns the whole viewport: dusk sky in the air band, a living water
 * surface through the lower half. The value question sits in the air, hard
 * above the horizon — brand lives in the header from the first pixel.
 * Scrolling past continues into the same shallows blue.
 *
 * The far horizon is `--hero-horizon` — one value, read here for the type
 * block and by the canvas for the paint. The plunge waterline sits below
 * the first viewport, in the extra band, so the first screen is looking-
 * down water only. It drops on short viewports, and the type scales
 * against height as well as width, so the block always clears the header
 * instead of growing up underneath it.
 */
export function Hero() {
  const { copy, locale } = useLocale();

  return (
    <DepthZone
      zone="surface"
      padding="none"
      atmosphere={false}
      overflow="visible"
      background="linear-gradient(to bottom, var(--color-zone-surface) 0%, var(--color-zone-surface) calc(100% - var(--hero-waterline-overlap)), transparent 100%)"
      className="z-20 h-[calc(100dvh+var(--hero-waterline-overlap))] min-h-[calc(100dvh+var(--hero-waterline-overlap))]"
      contentClassName="relative h-full"
      ariaLabel={copy.nav.introLabel}
    >
      <HeroCanvas className="absolute inset-x-0 top-0 z-[1] h-[calc(100%+3rem)] w-full" />

      <ZoneInner className="absolute inset-x-0 top-0 z-10 flex flex-col justify-end overflow-visible pb-2 pt-[calc(var(--header-h)+0.5rem)] sm:pb-3 bottom-[var(--hero-content-bottom)]">
        {/* CSS-only entrance: runs from first paint, never waits on
            hydration. The headline only rises — it is never transparent, so
            it paints (and counts as LCP) immediately. */}
        <p className="hero-in hero-eyebrow flex flex-wrap gap-y-1" style={{ "--i": 0 } as CSSProperties}>
          {/* Breaks only between segments, never inside "Varna, Bulgaria". */}
          {copy.hero.eyebrow.split(" · ").map((part, i, parts) => (
            <span key={part} className="whitespace-nowrap">
              {part}
              {i < parts.length - 1 && (
                <span aria-hidden="true" className="mx-[0.6em] opacity-60">·</span>
              )}
            </span>
          ))}
        </p>

        <h1
          data-hero-reflect
          className="hero-in hero-in--solid mt-[min(1rem,2dvh)] font-display text-[length:var(--hero-brand)] font-bold leading-[0.95] tracking-[-0.02em]"
          style={{ fontStretch: "110%", "--i": 0 } as CSSProperties}
        >
          {/* One sentence per line — the two halves of the deal. */}
          {copy.hero.headline.split(/(?<=\.)\s+/).map((sentence) => (
            <span key={sentence} className="block">
              {sentence}
            </span>
          ))}
        </h1>

        <p
          className="hero-in mt-[min(0.875rem,1.8dvh)] max-w-[48ch] text-balance text-[length:var(--hero-lead)] leading-relaxed sm:mt-[min(1.1rem,2dvh)]"
          style={
            {
              // Tinted from the water, never grey.
              color: "color-mix(in srgb, var(--color-ink) 68%, rgb(58 104 148))",
              "--i": 1,
            } as CSSProperties
          }
        >
          {copy.hero.lead}
        </p>

        <div
          className="hero-in mt-[min(1.25rem,2.6dvh)] flex flex-col gap-3 sm:mt-[min(1.5rem,3dvh)] sm:flex-row sm:items-center sm:gap-4"
          style={{ "--i": 2 } as CSSProperties}
        >
          <ButtonLink href={sectionHref(locale, "contact")} style={{ height: "var(--hero-cta-h)" }}>
            {copy.hero.ctaPrimary}
          </ButtonLink>
          <ButtonLink href={sectionHref(locale, "work")} variant="outline" style={{ height: "var(--hero-cta-h)" }}>
            {copy.hero.ctaSecondary}
          </ButtonLink>
        </div>
      </ZoneInner>

      {/* On the near water, clear of the fold — sounding line into the plunge. */}
      <div
        data-hero-floor
        className="hero-in absolute inset-x-0 z-10 flex justify-center"
        style={
          {
            bottom: "calc(var(--hero-waterline-overlap) + 4rem)",
            "--i": 4,
          } as CSSProperties
        }
      >
        <PlungeControl />
      </div>
    </DepthZone>
  );
}
