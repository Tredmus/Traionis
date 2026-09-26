"use client";

import { ZoneInner } from "@/components/depth/DepthZone";
import { Reveal } from "@/components/motion/Reveal";
import { useCopy } from "@/lib/locale-context";

/**
 * ABYSS — −4,000m. First half of the band.
 *
 * The pronoun drop. The site speaks as "we" the whole way down and resolves
 * here to one named person, speaking as "I". Facts only — see PRODUCT.md for
 * what this section may and may not say.
 */
export function Founder() {
  const copy = useCopy();

  return (
    <ZoneInner className="pb-16 sm:pb-24">
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
      <Reveal index={2} className="mt-10 flex max-w-[60ch] flex-col gap-5">
        {copy.founder.body.map((paragraph) => (
          <p key={paragraph} className="text-lead opacity-80">
            {paragraph}
          </p>
        ))}
        <p className="mt-3 text-label uppercase opacity-45">{copy.founder.facts}</p>
      </Reveal>
    </ZoneInner>
  );
}
