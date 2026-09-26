"use client";

import { useRef } from "react";

import { ZoneInner } from "@/components/depth/DepthZone";
import { Reveal } from "@/components/motion/Reveal";
import { SiteSchematic } from "@/components/services/SiteSchematic";
import { SystemSchematic } from "@/components/services/SystemSchematic";
import { HoverLink } from "@/components/ui/HoverLink";
import type { OfferingCopy } from "@/lib/content";
import { useCopy } from "@/lib/locale-context";

/**
 * SHALLOWS — what we build.
 *
 * Two offerings, both visible, each shown as the thing it is rather than a
 * list of what it includes: a website as an exploded page, an application as
 * a running system. Every capability is a callout pinned to the part of the
 * drawing it describes. On desktop each offering holds the screen while its
 * drawing builds; below `lg` the drawing builds as it scrolls into view.
 */
export function Offerings() {
  const copy = useCopy();

  return (
    <section aria-labelledby="offerings-heading" className="relative">
      <ZoneInner>
        <header className="max-w-2xl">
          <Reveal
            as="h2"
            id="offerings-heading"
            className="font-display text-display-m font-bold leading-[1.08] tracking-[-0.02em] text-balance"
            style={{ fontStretch: "108%" }}
          >
            {copy.offerings.heading}
          </Reveal>
          <Reveal
            as="p"
            index={1}
            className="mt-5 max-w-[52ch] text-lead text-[color-mix(in_srgb,var(--zone-ink)_78%,transparent)]"
          >
            {copy.offerings.intro}
          </Reveal>
        </header>
      </ZoneInner>

      {copy.offerings.offerings.map((offering, i) => (
        <OfferingPanel key={offering.id} offering={offering} flip={i % 2 === 1} />
      ))}

      <ZoneInner>
        <p className="svc-rebuild">{copy.offerings.rebuild}</p>
      </ZoneInner>
    </section>
  );
}

function OfferingPanel({ offering, flip }: { offering: OfferingCopy; flip: boolean }) {
  const track = useRef<HTMLDivElement>(null);
  const Drawing = offering.id === "site" ? SiteSchematic : SystemSchematic;

  return (
    <div ref={track} className="svc-panel" data-kind={offering.id} data-flip={flip}>
      <div className="svc-panel__stage">
        <div className="svc-panel__grid">
          <div className="svc-panel__text">
            <h3 className="svc-panel__title">{offering.title}</h3>
            <p className="svc-panel__body">{offering.body}</p>

            {/* The timeline as a dimension: a measured span, not a promise in
                a badge. */}
            <div className="svc-dim">
              <p className="svc-dim__label">{offering.timeline}</p>
              <span className="svc-dim__rule" aria-hidden="true" />
            </div>

            <div className="mt-9">
              <HoverLink href={offering.proof.href} className="text-body font-medium">
                {offering.proof.label}
              </HoverLink>
            </div>
          </div>

          <div className="svc-panel__drawing">
            <Drawing callouts={offering.callouts} track={track} />
          </div>
        </div>
      </div>
    </div>
  );
}
