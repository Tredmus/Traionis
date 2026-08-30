"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useCopy } from "@/lib/locale-context";
import { ButtonLink } from "./ui/Button";
import { HoverLink } from "./ui/HoverLink";
import { LocaleToggle } from "./LocaleToggle";

/**
 * Persistent header.
 *
 * Brand and CTA are here from the first pixel on purpose: the hero asks the
 * value question; the name sits in the chrome. A descent invites length, and
 * a buyer who is already sold must never have to scroll five bands to reach
 * the form.
 *
 * At rest the bar is fully clear so the dusk stars read through it. The first
 * scroll frosts it into dark water-glass: Chromium displaces the backdrop so
 * content passing under the bar warps like thick ice. The chrome itself stays
 * sharp. Ink never changes: every band is light-on-dark.
 */
export function SiteHeader() {
  const copy = useCopy();
  const [glazed, setGlazed] = useState(false);

  useEffect(() => {
    let frame = 0;
    let last = false;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const next = window.scrollY > 2;
        if (next !== last) {
          last = next;
          setGlazed(next);
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={`site-header-glass fixed inset-x-0 top-0 z-40${glazed ? " is-glazed" : ""}`}
      style={{
        height: "var(--header-h)",
        color: "var(--color-ink)",
      }}
    >
      {/* Backdrop displacement lives in defs only — applying `filter` on the
          header itself would warp the type. Chromium reads this via
          backdrop-filter: url(#header-glass). */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden"
      >
        <filter
          id="header-glass"
          x="-5%"
          y="-40%"
          width="110%"
          height="180%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.006 0.035"
            numOctaves="3"
            seed="4"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="0.8" result="ripple" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="ripple"
            scale="32"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl items-center justify-between gap-6 px-6 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="font-display text-[1.05rem] font-bold uppercase tracking-[0.2em]"
          style={{ fontStretch: "125%" }}
        >
          {copy.hero.brand}
        </Link>

        <nav aria-label="Primary" className="ml-auto flex items-center gap-7">
          <ul className="hidden items-center gap-7 text-body sm:flex">
            <li>
              <HoverLink href="/work">{copy.nav.work}</HoverLink>
            </li>
            <li>
              <HoverLink href="/about">{copy.nav.about}</HoverLink>
            </li>
            <li>
              <HoverLink href="/contact">{copy.nav.contact}</HoverLink>
            </li>
          </ul>

          <LocaleToggle />

          <div className="hidden md:block">
            <ButtonLink
              href="/#contact"
              variant="outline"
              className="!h-9 !px-4 text-label uppercase"
            >
              {copy.nav.cta}
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
