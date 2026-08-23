"use client";

import { ZoneInner } from "@/components/depth/DepthZone";
import { Reveal } from "@/components/motion/Reveal";
import { useCopy } from "@/lib/locale-context";

/**
 * ABYSS — −4,000m. The floor, and the decision.
 *
 * The darkness here reads as instrumentation, not gloom: the lamp is on, and
 * the form is the brightest, most legible object on the site — light brought
 * down, not light lost. If the floor feels oppressive the buyer leaves at the
 * exact moment they were meant to act.
 *
 * SCAFFOLD: heading, intro and the exclusions line. The project-brief form
 * (with the required budget bracket — the site's only filter) is built in the
 * abyss pass. Form is client-side only; endpoint is a marked TODO.
 */
export function Contact() {
  const copy = useCopy();

  return (
    <div id="contact" className="scroll-mt-[var(--header-h)]">
      <ZoneInner>
        <Reveal as="h2" className="max-w-[18ch] text-display-l font-bold text-balance">
          {copy.contact.heading}
        </Reveal>
        <Reveal as="p" index={1} className="mt-8 max-w-[58ch] text-lead opacity-70">
          {copy.contact.intro}
        </Reveal>

        <Reveal
          index={2}
          className="mt-24 max-w-[58ch] pt-10"
          style={{ borderTop: "1px solid var(--zone-line)" }}
        >
          <p className="text-label uppercase opacity-45">{copy.contact.exclusionsHeading}</p>
          <p className="mt-5 text-body opacity-65">{copy.contact.exclusions}</p>
        </Reveal>
      </ZoneInner>
    </div>
  );
}
