"use client";

import { DepthZone, ZoneInner } from "@/components/depth/DepthZone";
import { Reveal } from "@/components/motion/Reveal";
import { HoverLink } from "@/components/ui/HoverLink";
import { useCopy } from "@/lib/locale-context";
import type { CaseStudy } from "@/lib/work";

/**
 * Long-form case study: problem → the decisions and why → what it does now.
 *
 * This structure is the point. Demonstrated thinking is what a short client
 * list can still prove, so the reasoning is the deliverable and the
 * screenshots are not. Set in the serif, because it should read as a document
 * rather than as marketing.
 */
export function CaseStudyView({ project }: { project: CaseStudy }) {
  const copy = useCopy();

  return (
    <DepthZone zone="mid" padding="none" className="pb-32 pt-40 sm:pb-44 sm:pt-48">
      <ZoneInner>
        <Reveal>
          <HoverLink href="/work" className="text-label uppercase opacity-55">
            {copy.work.viewAll}
          </HoverLink>
        </Reveal>

        <Reveal as="p" index={1} className="mt-14 text-label uppercase opacity-45">
          {project.statusLabel}
        </Reveal>
        <Reveal
          as="h1"
          index={2}
          className="mt-5 font-display text-display-l font-bold"
          style={{ fontStretch: "118%" }}
        >
          {project.name}
        </Reveal>
        <Reveal as="p" index={3} className="mt-7 max-w-[52ch] text-lead opacity-70">
          {project.summary}
        </Reveal>

        {project.stack.length > 0 && (
          <Reveal index={4} className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
            {project.stack.map((item) => (
              <span key={item} className="text-label uppercase opacity-45">
                {item}
              </span>
            ))}
          </Reveal>
        )}

        <div className="mt-24 max-w-[68ch] space-y-20">
          <Reveal as="section">
            <h2 className="text-display-m font-bold">The problem</h2>
            <div className="mt-8 space-y-6 font-prose text-prose opacity-80">
              {project.problem.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          {project.decisions.length > 0 && (
            <Reveal as="section">
              <h2 className="text-display-m font-bold">The decisions</h2>
              <div className="mt-8 space-y-12">
                {project.decisions.map((decision) => (
                  <div
                    key={decision.title}
                    className="pt-8"
                    style={{ borderTop: "1px solid var(--zone-line)" }}
                  >
                    <h3 className="text-[1.375rem] font-medium leading-snug">{decision.title}</h3>
                    <p className="mt-4 font-prose text-prose opacity-75">{decision.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal as="section">
            <h2 className="text-display-m font-bold">What it does now</h2>
            <div className="mt-8 space-y-6 font-prose text-prose opacity-80">
              {project.outcome.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {/* Renders nothing when no real numbers exist. Correct by design. */}
            {project.metrics.length > 0 && (
              <dl className="mt-14 grid gap-10 sm:grid-cols-3">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="text-label uppercase opacity-45">{metric.label}</dt>
                    <dd
                      className="mt-3 font-display text-display-m font-bold"
                      style={{ fontStretch: "110%" }}
                    >
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </Reveal>
        </div>
      </ZoneInner>
    </DepthZone>
  );
}
