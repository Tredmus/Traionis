"use client";

import { ZoneInner } from "@/components/depth/DepthZone";
import { Reveal } from "@/components/motion/Reveal";
import { useCopy } from "@/lib/locale-context";

/**
 * ABYSS — the floor, first half.
 *
 * The pronoun drop. The site speaks as "we" the whole way down and resolves
 * here to one named person. The person on the left — name, role, the
 * checkable facts; the standard on the right, set large in the serif as the
 * one sentence the whole site is built to prove, with the background under
 * it. Facts only — see PRODUCT.md for what this section may and may not say.
 */
export function Founder() {
  const copy = useCopy();
  const { founder } = copy;

  return (
    <ZoneInner className="founder pb-16 sm:pb-24">
      <div className="founder__person">
        <Reveal as="h2" className="text-display-m font-bold text-balance">
          {founder.heading}
        </Reveal>
        <Reveal index={1} className="mt-10 lg:mt-14">
          {/* display-m sets line-height 1.02, which pulls descenders into the
              label below it. Names need the leading; the scale does not. */}
          <p
            className="font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-bold leading-[1.12]"
            style={{ fontStretch: "118%" }}
          >
            {founder.name}
          </p>
          <p className="mt-4 text-label uppercase opacity-55">{founder.role}</p>
          <p className="founder__facts">
            {/* Breaks only between facts, never inside one. */}
            {founder.facts.split(" · ").map((fact, i, all) => (
              <span key={fact} className="whitespace-nowrap">
                {fact}
                {i < all.length - 1 && (
                  <span aria-hidden="true" className="mx-[0.6em] opacity-60">·</span>
                )}
              </span>
            ))}
          </p>
        </Reveal>
      </div>

      <div className="founder__words">
        <Reveal as="blockquote" index={2} className="founder__statement">
          <p>{founder.statement}</p>
        </Reveal>
        <Reveal index={3} className="mt-8 flex max-w-[56ch] flex-col gap-5">
          {founder.body.map((paragraph) => (
            <p key={paragraph} className="text-body opacity-75">
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>
    </ZoneInner>
  );
}
