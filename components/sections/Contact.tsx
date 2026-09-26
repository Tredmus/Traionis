"use client";

import { ZoneInner } from "@/components/depth/DepthZone";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { useCopy } from "@/lib/locale-context";

/**
 * ABYSS — −4,000m. The floor, and the decision.
 *
 * The darkness here reads as instrumentation, not gloom: the lamp is on, and
 * the form is the brightest, most legible object on the site — light brought
 * down, not light lost. If the floor feels oppressive the buyer leaves at the
 * exact moment they were meant to act.
 *
 * So the band is lifted just enough to announce itself — one lit rule under
 * the heading, and hairlines that carry a cyan tint instead of the neutral
 * white-alpha every other band uses — while the heading itself stays plain ink
 * and the submit keeps the only real emission. Arrival, without the button
 * having to compete with its own surroundings.
 */
export function Contact() {
  const copy = useCopy();

  return (
    <div id="contact" className="abyss-contact scroll-mt-[var(--header-h)]">
      <ZoneInner>
        <Reveal as="h2" className="max-w-[18ch] text-display-l font-bold text-balance">
          {copy.contact.heading}
        </Reveal>

        <Reveal index={1}>
          <span aria-hidden="true" className="abyss-contact__rule" />
        </Reveal>

        <Reveal as="p" index={2} className="mt-8 max-w-[52ch] text-lead opacity-70">
          {copy.contact.intro}
        </Reveal>

        <div className="abyss-contact__body">
          <Reveal index={3} className="abyss-contact__form">
            <ContactForm />
          </Reveal>
        </div>
      </ZoneInner>
    </div>
  );
}
