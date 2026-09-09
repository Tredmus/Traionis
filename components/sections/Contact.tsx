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
 *
 * The exclusions line sits BESIDE the form rather than after it. It is the
 * actual qualifier now that the budget bracket is gone, so a wrong-fit visitor
 * should meet it before typing, not after sending. Filter, not funnel.
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

          <Reveal index={4} className="abyss-contact__aside">
            <p className="text-label uppercase opacity-45">
              {copy.contact.exclusionsHeading}
            </p>
            <p className="mt-5 max-w-[38ch] text-body opacity-65">
              {copy.contact.exclusions}
            </p>
          </Reveal>
        </div>
      </ZoneInner>
    </div>
  );
}
