"use client";

import { ZoneInner } from "@/components/depth/DepthZone";
import { Reveal } from "@/components/motion/Reveal";
import { useCopy } from "@/lib/locale-context";

/**
 * DEEP — −1,000m. What working together actually involves.
 *
 * Capabilities says what gets built; this says how the arrangement works; then
 * the descent reaches the floor and the visitor decides. Objection handling
 * before the decision rather than at it, so the abyss keeps doing one job.
 *
 * Built on native `<details>` / `<summary>`:
 *  - keyboard and screen-reader behaviour is the platform's, not a hand-rolled
 *    `aria-expanded` imitation of it;
 *  - the answers stay in the DOM while closed, so a crawler reads all of them
 *    — preserving search performance is a hard requirement on this site;
 *  - it works with JavaScript off.
 *
 * Items open independently rather than exclusively (no shared `name`): someone
 * comparing "how long does it take" against "what happens after launch" should
 * not lose one to read the other.
 *
 * An item with no answer does not render. Four of them are waiting on facts
 * only Miroslav has, and a plausible-sounding placeholder would be exactly the
 * inflation this site refuses.
 */
function Marker() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 14 14"
      className="faq-mark"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    >
      <path d="M1.5 7h11" />
      <path className="faq-mark__stem" d="M7 1.5v11" />
    </svg>
  );
}

export function Faq() {
  const copy = useCopy();
  const items = copy.faq.items.filter((item) => item.answer.length > 0);

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading" className="mt-32 sm:mt-44">
      <ZoneInner>
        <Reveal
          as="h2"
          id="faq-heading"
          className="max-w-[20ch] font-display text-display-m font-bold text-balance"
          style={{ fontStretch: "108%" }}
        >
          {copy.faq.heading}
        </Reveal>
        <Reveal
          as="p"
          index={1}
          className="mt-7 max-w-[54ch] text-body text-[color-mix(in_srgb,var(--zone-ink)_72%,transparent)]"
        >
          {copy.faq.intro}
        </Reveal>

        <div className="faq-list mt-16 sm:mt-20">
          {items.map((item, index) => (
            <Reveal key={item.id} index={index + 2}>
              <details className="faq-item">
                <summary className="faq-summary">
                  <span className="faq-question">{item.question}</span>
                  <Marker />
                </summary>
                <div className="faq-answer">
                  {item.answer.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </ZoneInner>
    </section>
  );
}
