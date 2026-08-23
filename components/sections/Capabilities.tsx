"use client";

import { ZoneInner } from "@/components/depth/DepthZone";
import { Reveal } from "@/components/motion/Reveal";
import { useCopy } from "@/lib/locale-context";

/**
 * DEEP — −1,000m.
 *
 * The harder capabilities: depth on the page maps to technical complexity.
 * No light reaches this band — the only illumination is the lamp we brought.
 * Automation and integrations live here as evidence inside project work,
 * never as a third headline service.
 *
 * SCAFFOLD: heading and intro. The five capability entries are built in the
 * deep pass.
 */
export function Capabilities() {
  const copy = useCopy();

  return (
    <ZoneInner>
      <Reveal as="h2" className="max-w-[18ch] text-display-m font-bold text-balance">
        {copy.capabilities.heading}
      </Reveal>
      <Reveal as="p" index={1} className="mt-7 max-w-[60ch] text-body opacity-70">
        {copy.capabilities.intro}
      </Reveal>
    </ZoneInner>
  );
}
