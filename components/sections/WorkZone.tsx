"use client";

import { ZoneInner } from "@/components/depth/DepthZone";
import { Reveal } from "@/components/motion/Reveal";
import { HoverLink } from "@/components/ui/HoverLink";
import { DiveGallery } from "@/components/work/DiveGallery";
import { useCopy } from "@/lib/locale-context";

/**
 * MID — the work, hanging in the water column.
 *
 * Not a grid of thumbnails and not a single specimen either: a column of real
 * builds at real depths, each one dark until the lamp finds it. The gallery
 * itself is content-driven (`lib/work.ts`), so a fourth project is an entry in
 * an array, never a layout job.
 *
 * The section header stays inside the normal measure; the gallery spans the
 * full band, because the lamp has to be able to light water as well as work.
 */
export function WorkZone() {
  const copy = useCopy();

  return (
    <section aria-labelledby="work-heading" className="relative">
      <ZoneInner className="max-w-6xl">
        <header className="max-w-2xl">
          <Reveal
            as="h2"
            id="work-heading"
            className="max-w-[18ch] font-display text-display-m font-bold text-balance"
            style={{ fontStretch: "108%" }}
          >
            {copy.work.heading}
          </Reveal>
          <Reveal
            as="p"
            index={1}
            className="mt-7 max-w-[54ch] text-body text-[color-mix(in_srgb,var(--zone-ink)_72%,transparent)]"
          >
            {copy.work.intro}
          </Reveal>
        </header>
      </ZoneInner>

      <div className="mt-14 sm:mt-20 lg:mt-24">
        <DiveGallery />
      </div>

      <ZoneInner className="mt-14 sm:mt-20">
        <div
          className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-6"
          style={{ borderTop: "1px solid var(--zone-line)" }}
        >
          <HoverLink href="/work" className="text-body font-medium">
            {copy.work.viewAll}
          </HoverLink>
        </div>
      </ZoneInner>
    </section>
  );
}
