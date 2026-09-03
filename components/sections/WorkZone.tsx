"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

import { ZoneInner } from "@/components/depth/DepthZone";
import { ParkQuiShot } from "@/components/work/ParkQuiShot";
import { HoverLink } from "@/components/ui/HoverLink";
import { EASE_DESCENT, STAGGER_STEP } from "@/lib/depth";
import { useCopy } from "@/lib/locale-context";
import { FEATURED_CASE_STUDY } from "@/lib/work";

/**
 * MID — portfolio as a single specimen under a lamp.
 *
 * One build, full band. Not a grid of thumbnails (a short list looks thinner
 * in a grid). The product surface is the evidence; the name sits on it like a
 * museum label carved into the artifact; the dossier below holds only what is
 * true today — no TODO scaffolding, no invented metrics.
 */

function publishable(lines: readonly string[]) {
  return lines.filter((line) => !/^\s*TODO\b/i.test(line));
}

export function WorkZone() {
  const copy = useCopy();
  const project = FEATURED_CASE_STUDY;
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.18 });
  const entered = inView || !!reduced;

  const problem = publishable(project.problem);
  const decisions = project.decisions.filter(
    (d) => d.body && !/^\s*TODO\b/i.test(d.body),
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="work-heading"
      className="relative"
    >
      <ZoneInner className="max-w-6xl">
        <header className="max-w-2xl">
          <motion.h2
            id="work-heading"
            className="max-w-[18ch] font-display text-display-m font-bold text-balance"
            style={{ fontStretch: "108%" }}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={entered ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: reduced ? 0 : 0.55, ease: EASE_DESCENT }}
          >
            {copy.work.heading}
          </motion.h2>
          <motion.p
            className="mt-7 max-w-[54ch] text-body text-[color-mix(in_srgb,var(--zone-ink)_72%,transparent)]"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={entered ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: reduced ? 0 : 0.55,
              delay: reduced ? 0 : STAGGER_STEP,
              ease: EASE_DESCENT,
            }}
          >
            {copy.work.intro}
          </motion.p>
        </header>

        <motion.article
          className="specimen-glass relative mt-14 overflow-hidden rounded-[18px] sm:mt-[4.5rem]"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={entered ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: reduced ? 0 : 0.7,
            delay: reduced ? 0 : 0.12,
            ease: EASE_DESCENT,
          }}
        >
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 top-0 z-20 h-px origin-left sm:inset-x-10"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--color-accent-hi), transparent)",
              boxShadow:
                "0 0 18px color-mix(in srgb, var(--color-accent-hi) 55%, transparent)",
            }}
            initial={reduced ? false : { scaleX: 0, opacity: 0 }}
            animate={entered ? { scaleX: 1, opacity: 1 } : undefined}
            transition={{
              duration: reduced ? 0 : 0.9,
              delay: reduced ? 0 : 0.2,
              ease: EASE_DESCENT,
            }}
          />

          <div className="relative">
            <ParkQuiShot lit={entered && !reduced} caption={false} />

            {/* Desktop: name carved over the artifact. Mobile: sits under the shot. */}
            <div className="relative z-10 border-t border-[color:var(--zone-line)] bg-[rgb(3_7_15_/_0.55)] px-5 py-5 sm:px-8 sm:py-6 lg:absolute lg:inset-x-0 lg:bottom-0 lg:border-t-0 lg:bg-gradient-to-t lg:from-[rgb(3_7_15_/_0.92)] lg:via-[rgb(3_7_15_/_0.55)] lg:to-transparent lg:px-10 lg:pb-9 lg:pt-24">
              <motion.p
                className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--zone-ink)_55%,transparent)]"
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={entered ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: reduced ? 0 : 0.45,
                  delay: reduced ? 0 : 0.35,
                  ease: EASE_DESCENT,
                }}
              >
                {project.statusLabel}
              </motion.p>
              <motion.h3
                className="mt-2 font-display font-bold leading-[0.92] tracking-[-0.03em]"
                style={{
                  fontStretch: "118%",
                  fontSize: "clamp(2.4rem, 9vw, 6.5rem)",
                }}
                initial={
                  reduced ? false : { opacity: 0, y: 22, filter: "blur(6px)" }
                }
                animate={
                  entered
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : undefined
                }
                transition={{
                  duration: reduced ? 0 : 0.75,
                  delay: reduced ? 0 : 0.4,
                  ease: EASE_DESCENT,
                }}
              >
                {project.name}
              </motion.h3>
            </div>
          </div>

          <div className="grid gap-10 border-t border-[color:var(--zone-line)] px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14 lg:px-10 lg:py-12">
            <div>
              <p className="max-w-[48ch] text-lead text-[color-mix(in_srgb,var(--zone-ink)_82%,transparent)]">
                {project.summary}
              </p>

              {problem.map((para) => (
                <p
                  key={para.slice(0, 32)}
                  className="mt-6 max-w-[58ch] text-body text-[color-mix(in_srgb,var(--zone-ink)_78%,transparent)]"
                >
                  {para}
                </p>
              ))}

              {decisions.length > 0 && (
                <ul className="mt-10 flex flex-col gap-6">
                  {decisions.map((decision) => (
                    <li key={decision.title}>
                      <p className="font-display text-[1.05rem] font-semibold tracking-[-0.015em]">
                        {decision.title}
                      </p>
                      <p className="mt-2 max-w-[52ch] text-body text-[color-mix(in_srgb,var(--zone-ink)_72%,transparent)]">
                        {decision.body}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <HoverLink
                  href={`/work/${project.slug}`}
                  className="text-body font-medium"
                >
                  {copy.work.readMore}
                </HoverLink>
                <HoverLink
                  href="/work"
                  className="text-body text-[color-mix(in_srgb,var(--zone-ink)_70%,transparent)]"
                >
                  {copy.work.viewAll}
                </HoverLink>
              </div>
            </div>

            {project.stack.length > 0 && (
              <aside className="lg:border-l lg:border-[color:var(--zone-line)] lg:pl-10">
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-[6px] px-2.5 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em]"
                      style={{
                        border: "1px solid var(--zone-line-strong)",
                        backgroundColor: "rgb(3 7 15 / 0.35)",
                        color:
                          "color-mix(in srgb, var(--zone-ink) 78%, transparent)",
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </motion.article>
      </ZoneInner>
    </section>
  );
}
