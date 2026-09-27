"use client";

import { ZoneInner } from "@/components/depth/DepthZone";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { HoverAnchor } from "@/components/ui/HoverLink";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/contact";
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

        <Reveal as="p" index={2} className="mt-6 max-w-[52ch] text-lead opacity-70">
          {copy.contact.intro}
        </Reveal>

        <div className="abyss-contact__body">
          <Reveal index={3} className="abyss-contact__form">
            <ContactForm />
          </Reveal>

          {/* Beside the form: the answer to "and then what?", and a way in
              for anyone who would rather talk than write. Each direct line
              renders only once it is configured. */}
          <Reveal index={4} as="aside" className="abyss-contact__aside">
            <h3 className="abyss-contact__aside-head">{copy.contact.next.heading}</h3>
            <ol className="abyss-next">
              {copy.contact.next.steps.map((step, i) => (
                <li key={step}>
                  <span className="abyss-next__n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            {(CONTACT_EMAIL || BOOKING_URL) && (
              <div className="abyss-direct">
                <h3 className="abyss-contact__aside-head">{copy.contact.direct.heading}</h3>
                <ul className="abyss-direct__list">
                  {BOOKING_URL && (
                    <li>
                      <HoverAnchor
                        href={BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-body font-medium"
                      >
                        {copy.contact.direct.call}
                      </HoverAnchor>
                    </li>
                  )}
                  {CONTACT_EMAIL && (
                    <li>
                      <span className="abyss-direct__label">{copy.contact.direct.email}</span>
                      <HoverAnchor href={`mailto:${CONTACT_EMAIL}`} className="text-body font-medium">
                        {CONTACT_EMAIL}
                      </HoverAnchor>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </Reveal>
        </div>
      </ZoneInner>
    </div>
  );
}
