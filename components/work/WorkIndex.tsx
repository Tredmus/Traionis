"use client";

import { DepthZone, ZoneInner } from "@/components/depth/DepthZone";
import { Reveal } from "@/components/motion/Reveal";
import { HoverLink } from "@/components/ui/HoverLink";
import { useCopy } from "@/lib/locale-context";
import { CASE_STUDIES } from "@/lib/work";

/**
 * The work index.
 *
 * Entries are deliberately UNEQUAL in weight. Equal siblings in a grid read
 * as a set, and a set of three reads as a set missing its fourth. A clear
 * hierarchy reads as a choice — which is what it is.
 */
export function WorkIndex() {
  const copy = useCopy();

  return (
    <DepthZone zone="mid" padding="none" className="pb-32 pt-40 sm:pb-44 sm:pt-48">
      <ZoneInner>
        <Reveal as="h1" className="max-w-[16ch] text-display-l font-bold text-balance">
          {copy.work.heading}
        </Reveal>
        <Reveal as="p" index={1} className="mt-8 max-w-[58ch] text-lead opacity-70">
          {copy.work.intro}
        </Reveal>

        <ul className="mt-24 space-y-0">
          {CASE_STUDIES.map((project, index) => (
            <Reveal as="li" key={project.slug} index={index + 2}>
              <article
                className="grid gap-6 py-12 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end"
                style={{ borderTop: "1px solid var(--zone-line)" }}
              >
                <div>
                  <p className="text-label uppercase opacity-45">{project.statusLabel}</p>
                  <h2
                    className={`mt-4 font-display font-bold ${
                      project.featured ? "text-display-m" : "text-[1.75rem] leading-tight"
                    }`}
                    style={{ fontStretch: project.featured ? "118%" : "110%" }}
                  >
                    {project.name}
                  </h2>
                  <p
                    className={`mt-4 max-w-[52ch] ${
                      project.featured ? "text-lead opacity-70" : "text-body opacity-55"
                    }`}
                  >
                    {project.summary}
                  </p>
                </div>

                <HoverLink href={`/work/${project.slug}`} className="text-body font-medium">
                  {copy.work.readMore}
                </HoverLink>
              </article>
            </Reveal>
          ))}
        </ul>
      </ZoneInner>
    </DepthZone>
  );
}
