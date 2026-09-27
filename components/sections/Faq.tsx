"use client";

import { ZoneInner } from "@/components/depth/DepthZone";
import { Reveal } from "@/components/motion/Reveal";
import { HoverLink } from "@/components/ui/HoverLink";
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
 * One answer open at a time: the items share a `name`, which makes the
 * browser close the open one when another opens — a native exclusive
 * accordion, no script. Browsers without it fall back to independent items.
 *
 * An item with no answer does not render — a plausible-sounding placeholder
 * would be exactly the inflation this site refuses.
 *
 * Desktop sets the heading in a pinned left column with the questions beside
 * it; the list ends on a line that hands the reader to the brief. The same
 * questions ship as FAQPage structured data, so search and AI answers quote
 * them as written.
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

  const structured = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer.join(" ") },
    })),
  };

  return (
    <section aria-labelledby="faq-heading" className="mt-20 sm:mt-28">
      <script
        type="application/ld+json"
        // Escaped so no answer text can close the script element early.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structured).replace(/</g, "\\u003c"),
        }}
      />
      <ZoneInner className="faq-layout">
        <header className="faq-head">
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
        </header>

        <div className="faq-body">
          <div className="faq-list">
            {items.map((item, index) => (
              <Reveal key={item.id} index={index + 2}>
                <details className="faq-item" name="faq">
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

          <p className="faq-more">
            {copy.faq.more.prompt}{" "}
            <HoverLink href="#contact" className="font-medium text-[var(--zone-ink)]">
              {copy.faq.more.link}
            </HoverLink>
          </p>
        </div>
      </ZoneInner>
    </section>
  );
}
