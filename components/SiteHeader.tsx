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
 * Over the dusk surface band the header is transparent and floats on the sky.
 * Past the hero it commits to the floor colour. One threshold crossing, one
 * state change — the scroll handler does no work on the vast majority of
 * frames. Ink never changes: every band is light-on-dark.
 */
export function SiteHeader() {
  const copy = useCopy();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    let last = false;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const next = window.scrollY > window.innerHeight * 0.6;
        if (next !== last) {
          last = next;
          setScrolled(next);
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
      className="fixed inset-x-0 top-0 z-40 transition-colors duration-500 [transition-timing-function:var(--ease-descent)]"
      style={{
        height: "var(--header-h)",
        backgroundColor: scrolled ? "var(--color-zone-abyss)" : "transparent",
        color: "var(--color-ink)",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between gap-6 px-6 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="font-display text-[1.05rem] font-bold uppercase tracking-[0.2em] transition-opacity duration-500 [transition-timing-function:var(--ease-descent)]"
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
              className="h-11 px-5 text-label uppercase"
            >
              {copy.nav.cta}
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
