"use client";

import { ZoneInner } from "@/components/depth/DepthZone";
import { Reveal } from "@/components/motion/Reveal";
import { useCopy } from "@/lib/locale-context";
import { FEATURED_CASE_STUDY } from "@/lib/work";

/**
 * MID-WATER — −200m.
 *
 * One project, full band, explained in depth. Deliberately NOT a grid: a
 * three-column grid holding one item is visibly a grid missing two items,
 * which is what makes a short client list look thin. A single case at full
 * width claims nothing about quantity.
 *
 * SCAFFOLD: heading, intro and the project name. The decision breakdown is
 * built in the mid-water pass, once the TODOs in lib/work.ts are answered.
 */
export function WorkZone() {
  const copy = useCopy();
  const project = FEATURED_CASE_STUDY;

  return (
    <ZoneInner>
      <Reveal as="h2" className="max-w-[18ch] text-display-m font-bold text-balance">
        {copy.work.heading}
      </Reveal>
      <Reveal as="p" index={1} className="mt-7 max-w-[60ch] text-body opacity-70">
        {copy.work.intro}
      </Reveal>

      <Reveal index={2} className="mt-20">
        <p className="text-label uppercase opacity-45">{project.statusLabel}</p>
        <p className="mt-5 font-display text-display-l font-bold" style={{ fontStretch: "118%" }}>
          {project.name}
        </p>
        <p className="mt-6 max-w-[52ch] text-lead opacity-70">{project.summary}</p>
      </Reveal>
    </ZoneInner>
  );
}
