"use client";

import { ZoneInner } from "@/components/depth/DepthZone";
import { Reveal } from "@/components/motion/Reveal";
import { useCopy } from "@/lib/locale-context";

/**
 * SHALLOWS — −40m. Second half of the band.
 *
 * SCAFFOLD: heading and intro. The four steps get their full treatment in the
 * shallows pass.
 */
export function Process() {
  const copy = useCopy();

  return (
    <ZoneInner>
      <Reveal as="h2" className="max-w-[18ch] text-display-m font-bold text-balance">
        {copy.process.heading}
      </Reveal>
      <Reveal as="p" index={1} className="mt-7 max-w-[60ch] text-body opacity-70">
        {copy.process.intro}
      </Reveal>
    </ZoneInner>
  );
}
