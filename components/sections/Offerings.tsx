"use client";

import { ZoneInner } from "@/components/depth/DepthZone";
import { Reveal } from "@/components/motion/Reveal";
import { useCopy } from "@/lib/locale-context";

/**
 * SHALLOWS — −40m. First half of the band.
 *
 * Content only: the band itself is composed in app/page.tsx so one DepthZone
 * spans the whole depth and the atmosphere runs continuously through it.
 *
 * SCAFFOLD: heading and intro. Full treatment of the two problem framings
 * comes in the shallows pass.
 */
export function Offerings() {
  return (
    <ZoneInner className="pb-28 sm:pb-36">
      <OfferingsContent />
    </ZoneInner>
  );
}

function OfferingsContent() {
  const copy = useCopy();

  return (
    <>
      <Reveal as="h2" className="max-w-[18ch] text-display-l font-bold text-balance">
        {copy.offerings.heading}
      </Reveal>
      <Reveal as="p" index={1} className="mt-8 max-w-[60ch] text-lead opacity-70">
        {copy.offerings.intro}
      </Reveal>
    </>
  );
}
