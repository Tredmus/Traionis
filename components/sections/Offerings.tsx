"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import { ZoneInner } from "@/components/depth/DepthZone";
import { HoverLink } from "@/components/ui/HoverLink";
import type { ProblemCopy } from "@/lib/content";
import { EASE_DESCENT } from "@/lib/depth";
import { useCopy } from "@/lib/locale-context";

/**
 * SHALLOWS — diagnostic tabs.
 *
 * Reader picks a question; the pane below swaps. Not a services list and not
 * a newspaper column — a recessed instrument plate with a segmented control.
 * Two diagnostics only (app that runs the business / site that earns its place).
 */

const SWAP_MS = 0.38;

export function Offerings() {
  const copy = useCopy();
  const reduced = useReducedMotion();
  const baseId = useId();
  const problems = copy.offerings.problems;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selected = problems[active] ?? problems[0];

  function select(index: number) {
    setActive(index);
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = problems.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = active === last ? 0 : active + 1;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = active === 0 ? last : active - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = last;
    }
    if (next === null) return;
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section
      aria-labelledby="offerings-heading"
      className="relative pb-28 sm:pb-36"
    >
      <ZoneInner className="max-w-5xl">
        <header className="max-w-2xl">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--zone-ink)_55%,transparent)]">
            {copy.offerings.zoneLabel}
          </p>
          <h2
            id="offerings-heading"
            className="mt-5 font-display text-display-m font-bold leading-[1.08] tracking-[-0.02em] text-balance"
            style={{ fontStretch: "108%" }}
          >
            {copy.offerings.heading}
          </h2>
          <p className="mt-5 max-w-[52ch] text-body text-[color-mix(in_srgb,var(--zone-ink)_78%,transparent)]">
            {copy.offerings.intro}
          </p>
        </header>

        <div className="mt-12 sm:mt-14">
          {/* Segmented diagnostic control */}
          <div
            role="tablist"
            aria-label={copy.offerings.heading}
            onKeyDown={onTabKeyDown}
            className="diagnostic-glass-track grid gap-2 rounded-[14px] p-1.5 sm:grid-cols-2"
          >
            {problems.map((problem, index) => {
              const isActive = index === active;
              const tabId = `${baseId}-tab-${problem.id}`;
              const panelId = `${baseId}-panel-${problem.id}`;
              return (
                <button
                  key={problem.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={tabId}
                  aria-selected={isActive}
                  aria-controls={panelId}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(index)}
                  className={`group relative flex min-h-[3.75rem] items-start gap-3 rounded-[10px] px-3.5 py-3 text-left transition-[background-color,color,box-shadow,border-color,backdrop-filter] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-hi)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-zone-shallows)] sm:min-h-[4.25rem] sm:px-4 sm:py-3.5 ${
                    isActive ? "diagnostic-glass-tab-active" : ""
                  }`}
                  style={{
                    transitionDuration: "500ms",
                    transitionTimingFunction: "var(--ease-descent)",
                    backgroundColor: isActive ? undefined : "transparent",
                    border: isActive ? undefined : "1px solid transparent",
                    color: isActive
                      ? "var(--color-ink)"
                      : "color-mix(in srgb, var(--zone-ink) 78%, transparent)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: isActive
                        ? "color-mix(in srgb, var(--color-accent-hi) 22%, transparent)"
                        : "color-mix(in srgb, var(--zone-ink) 8%, transparent)",
                      color: isActive
                        ? "var(--color-accent-hi)"
                        : "color-mix(in srgb, var(--zone-ink) 62%, transparent)",
                      transition:
                        "background-color 500ms var(--ease-descent), color 500ms var(--ease-descent)",
                    }}
                  >
                    <DiagnosticIcon id={problem.id} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.9375rem] font-medium leading-snug tracking-[-0.01em] sm:text-[1rem]">
                      {problem.question}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Swapping content plate — frosted shallows glass */}
          <div className="diagnostic-glass-panel relative mt-3 overflow-hidden rounded-[16px]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent-hi) 40%, transparent), transparent)",
              }}
            />

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selected.id}
                role="tabpanel"
                id={`${baseId}-panel-${selected.id}`}
                aria-labelledby={`${baseId}-tab-${selected.id}`}
                tabIndex={0}
                initial={
                  reduced
                    ? false
                    : { opacity: 0, y: 10, filter: "blur(4px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={
                  reduced
                    ? undefined
                    : { opacity: 0, y: -8, filter: "blur(4px)" }
                }
                transition={{
                  duration: reduced ? 0 : SWAP_MS,
                  ease: EASE_DESCENT,
                }}
                className="relative px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10"
              >
                <DiagnosticPane problem={selected} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </ZoneInner>
    </section>
  );
}

function DiagnosticPane({ problem }: { problem: ProblemCopy }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,0.42fr)] lg:gap-12 lg:items-start">
      <div className="min-w-0">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--zone-ink)_55%,transparent)]">
          {problem.label}
        </p>
        <h3
          className="mt-4 max-w-[22ch] font-display font-bold leading-[1.08] tracking-[-0.02em] text-balance"
          style={{
            fontStretch: "108%",
            fontSize: "clamp(1.55rem, 2.6vw, 2.15rem)",
          }}
        >
          {problem.title}
        </h3>
        <p className="mt-5 max-w-[58ch] text-body text-[color-mix(in_srgb,var(--zone-ink)_82%,transparent)]">
          {problem.body}
        </p>

        <span
          aria-hidden="true"
          className="mt-7 block h-px w-full"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--color-accent-hi) 28%, var(--zone-line))",
          }}
        />

        <ul className="mt-6 flex flex-col gap-3.5">
          {problem.deliverables.map((line) => (
            <li key={line} className="flex gap-3 text-body leading-snug">
              <span
                aria-hidden="true"
                className="mt-[0.55em] size-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: "var(--color-accent-hi)" }}
              />
              <span className="text-[color-mix(in_srgb,var(--zone-ink)_90%,transparent)]">
                {line}
              </span>
            </li>
          ))}
        </ul>

        <HoverLink
          href={problem.proof.href}
          className="mt-8 inline-flex text-body font-medium"
        >
          {problem.proof.label}
        </HoverLink>
      </div>

      <aside className="diagnostic-glass-callout rounded-[12px] px-4 py-4 sm:px-5 sm:py-5 lg:mt-10">
        <p className="text-[0.9375rem] leading-snug text-[color-mix(in_srgb,var(--zone-ink)_68%,transparent)]">
          {problem.disqualifier}
        </p>
      </aside>
    </div>
  );
}

function DiagnosticIcon({ id }: { id: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  // Operation — connected system nodes (the model under the interface).
  if (id === "operation") {
    return (
      <svg {...common}>
        <circle cx="12" cy="6.5" r="2.4" />
        <circle cx="6.5" cy="17" r="2.4" />
        <circle cx="17.5" cy="17" r="2.4" />
        <path d="M10.6 8.2 7.8 14.7M13.4 8.2l2.8 6.5" />
      </svg>
    );
  }

  // Site — browser with a commercial page (hero + CTA).
  return (
    <svg {...common}>
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <path d="M3.5 8h17" />
      <circle cx="6.1" cy="6" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="8.4" cy="6" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="10.7" cy="6" r="0.7" fill="currentColor" stroke="none" />
      <rect x="6.25" y="10.25" width="11.5" height="4" rx="0.7" />
      <path d="M6.25 16.75h6.5" />
    </svg>
  );
}
