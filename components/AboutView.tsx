"use client";

import { DepthZone, ZoneInner } from "@/components/depth/DepthZone";
import { Reveal } from "@/components/motion/Reveal";
import { useCopy } from "@/lib/locale-context";

/**
 * SCAFFOLD: carries the founder record and the crawlable positioning phrase.
 * Full treatment follows once the bio direction is chosen.
 */
export function AboutView() {
  const copy = useCopy();

  return (
    <DepthZone zone="deep" padding="none" className="pb-32 pt-40 sm:pb-44 sm:pt-48">
      <ZoneInner>
        <Reveal as="h1" className="max-w-[16ch] text-display-l font-bold text-balance">
          {copy.founder.heading}
        </Reveal>

        <Reveal index={1} className="mt-14">
          <p className="font-display text-display-m font-bold" style={{ fontStretch: "118%" }}>
            {copy.founder.name}
          </p>
          <p className="mt-3 text-label uppercase opacity-45">{copy.founder.role}</p>
        </Reveal>

        <Reveal index={2} className="mt-12 max-w-[68ch] space-y-6 font-prose text-prose opacity-80">
          {copy.founder.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal
          as="p"
          index={3}
          className="mt-20 max-w-[62ch] pt-10 text-body opacity-65"
          style={{ borderTop: "1px solid var(--zone-line)" }}
        >
          {copy.footer.description}
        </Reveal>
      </ZoneInner>
    </DepthZone>
  );
}
