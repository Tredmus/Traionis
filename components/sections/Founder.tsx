"use client";

import { ZoneInner } from "@/components/depth/DepthZone";
import { Reveal } from "@/components/motion/Reveal";
import { useCopy } from "@/lib/locale-context";

/**
 * ABYSS — −4,000m. First half of the band.
 *
 * The pronoun drop. The site speaks as "we" the whole way down and resolves
 * here to one named person, which is what makes the direct-builder-access
 * claim concrete rather than rhetorical.
 *
 * SCAFFOLD: name and role are real; the bio is TODO pending Miroslav's chosen
 * direction. See lib/content/en.ts → founder.body.
 */
export function Founder() {
  const copy = useCopy();

  return (
    <ZoneInner className="pb-28 sm:pb-36">
      <Reveal as="h2" className="max-w-[18ch] text-display-m font-bold text-balance">
        {copy.founder.heading}
      </Reveal>
      <Reveal index={1} className="mt-12">
        {/* display-m sets line-height 1.02, which pulls descenders into the
            label below it. Names need the leading; the scale does not. */}
        <p
          className="font-display text-display-m font-bold leading-[1.12]"
          style={{ fontStretch: "118%" }}
        >
          {copy.founder.name}
        </p>
        <p className="mt-5 text-label uppercase opacity-45">{copy.founder.role}</p>
      </Reveal>
    </ZoneInner>
  );
}
