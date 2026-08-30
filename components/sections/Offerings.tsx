"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
} from "react";

import { ZoneInner } from "@/components/depth/DepthZone";
import { Reveal } from "@/components/motion/Reveal";
import { HoverLink } from "@/components/ui/HoverLink";
import type { ProblemCopy } from "@/lib/content";
import { useCopy } from "@/lib/locale-context";

/**
 * SHALLOWS — −40m. First half of the band.
 *
 * Content only: the band itself is composed in app/page.tsx so one DepthZone
 * spans the whole depth and the atmosphere runs continuously through it.
 *
 * A diptych, not a card grid. The two problem framings sit either side of a
 * single hairline, each carrying the framing, what it translates into, and the
 * one honest piece of proof behind it. The visitor is meant to recognise which
 * of the two they are — or recognise that they are neither, which the closing
 * line makes easy on purpose.
 *
 * MOTION — one idea, taken from the band itself. At −40m daylight still
 * reaches, so attention is spent as LIGHT: the panel under the pointer takes
 * the shaft and the other recedes into the blue. Nothing resizes, nothing
 * reflows, and every word is legible at rest with no pointer on the page.
 * Where there is no pointer the light follows whichever panel is crossing the
 * middle of the viewport, so scrolling drives the same gesture on a phone.
 */

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Rule-draw trigger. Same contract as Reveal — drawn by default, armed in a
 * layout effect — so the server HTML and a no-JS render show every hairline.
 */
function useDrawIn<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState<"idle" | "pending" | "in">("idle");

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setState("pending");
  }, []);

  useEffect(() => {
    if (state !== "pending") return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setState("in");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -14% 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [state]);

  return { ref, drawn: state !== "pending", armed: state !== "idle" };
}

const POINTER_QUERY = "(hover: hover) and (pointer: fine)";

function readHasPointer() {
  if (typeof window === "undefined") return true;
  return window.matchMedia(POINTER_QUERY).matches;
}

export function Offerings() {
  return (
    <ZoneInner className="pb-28 sm:pb-36">
      <OfferingsContent />
    </ZoneInner>
  );
}

function OfferingsContent() {
  const copy = useCopy();
  const problems = copy.offerings.problems;

  const { ref: diptychRef, drawn, armed } = useDrawIn<HTMLDivElement>();

  /** Which panel holds the light. null = rest, both lit equally. */
  const [active, setActive] = useState<number | null>(null);
  /**
   * A real pointer drives the light; otherwise the viewport centre does.
   * Read at init rather than in an effect — `active` starts null either way, so
   * the first client render is byte-identical to the server's.
   */
  const [hasPointer, setHasPointer] = useState(readHasPointer);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);

  // Plugging in a mouse, or picking up a tablet, swaps which gesture is live.
  useEffect(() => {
    const query = window.matchMedia(POINTER_QUERY);
    const onChange = () => {
      setHasPointer(query.matches);
      setActive(null);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Touch and coarse pointers: the light follows the panel crossing the middle
  // of the viewport. Scrolling is the gesture, so nothing has to be tapped.
  useEffect(() => {
    if (hasPointer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = panelRefs.current.filter(
      (node): node is HTMLElement => node !== null,
    );
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = nodes.indexOf(entry.target as HTMLElement);
          if (index !== -1) setActive(index);
        }
      },
      // A narrow band across the middle of the viewport. Only one panel can
      // occupy it at a time, so the light never flickers between the two.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [hasPointer]);

  return (
    <>
      <Reveal as="h2" className="max-w-[18ch] text-display-l font-bold text-balance">
        {copy.offerings.heading}
      </Reveal>
      <Reveal as="p" index={1} className="mt-8 max-w-[60ch] text-lead opacity-70">
        {copy.offerings.intro}
      </Reveal>

      <div ref={diptychRef} className="relative mt-16 sm:mt-24">
        {/* The seam. Draws downward on entry — the one motion in this section
            that reads as descent rather than as arrival. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px md:block"
          style={{
            // Brightest where the light enters and gone by the bottom — the
            // seam obeys the same rule as everything else in the descent.
            backgroundImage:
              "linear-gradient(to bottom, var(--zone-line-strong) 0%, var(--zone-line) 58%, transparent 100%)",
            transformOrigin: "top center",
            transform: drawn ? "scaleY(1)" : "scaleY(0)",
            transition: armed
              ? "transform 1100ms var(--ease-descent) 140ms"
              : undefined,
          }}
        />

        {/* Three shared rows — framing, deliverables, evidence — so both
            columns rule off at exactly the same heights however long the copy
            runs, in either language. Title and body travel in one row: a
            two-line title should leave its air at the foot of the block, not
            stranded between the heading and the paragraph. */}
        <div className="grid gap-y-14 md:grid-cols-2 md:grid-rows-[auto_auto_auto] md:gap-y-0">
          {problems.map((problem, index) => (
            <Reveal
              key={problem.id}
              index={index}
              delay={0.06}
              className="relative flex flex-col md:row-span-3 md:grid md:grid-rows-subgrid"
            >
              <ProblemPanel
                panelRef={(node) => {
                  panelRefs.current[index] = node;
                }}
                problem={problem}
                buildsLabel={copy.offerings.buildsLabel}
                evidenceLabel={copy.offerings.evidenceLabel}
                side={index === 0 ? "left" : "right"}
                drawn={drawn}
                armed={armed}
                state={active === null ? "rest" : active === index ? "lit" : "dim"}
                onEnter={() => hasPointer && setActive(index)}
                onLeave={() => hasPointer && setActive(null)}
              />
            </Reveal>
          ))}
        </div>
      </div>

      {/* The third case. Filtering the wrong buyer out is this section's job as
          much as attracting the right one. */}
      <Reveal
        index={2}
        delay={0.1}
        className="mt-16 flex max-w-[68ch] items-start gap-5 sm:mt-20"
      >
        <span
          aria-hidden="true"
          className="mt-[0.72em] block h-px w-10 shrink-0"
          style={{ backgroundColor: "var(--zone-line-strong)" }}
        />
        <p className="text-body opacity-65">{copy.offerings.filter}</p>
      </Reveal>
    </>
  );
}

type PanelState = "rest" | "lit" | "dim";

interface ProblemPanelProps {
  panelRef: (node: HTMLElement | null) => void;
  problem: ProblemCopy;
  buildsLabel: string;
  evidenceLabel: string;
  side: "left" | "right";
  drawn: boolean;
  armed: boolean;
  state: PanelState;
  onEnter: () => void;
  onLeave: () => void;
}

/** Shaft strength per state. Rest is deliberately mid — nothing is ever "off". */
const LIGHT: Record<PanelState, { opacity: number; scaleY: number }> = {
  rest: { opacity: 0.55, scaleY: 0.88 },
  lit: { opacity: 1, scaleY: 1 },
  dim: { opacity: 0.14, scaleY: 0.8 },
};

function ProblemPanel({
  panelRef,
  problem,
  buildsLabel,
  evidenceLabel,
  side,
  drawn,
  armed,
  state,
  onEnter,
  onLeave,
}: ProblemPanelProps) {
  const lit = state === "lit";
  const light = LIGHT[state];

  // Horizontal air lives on the rows, not on the panel: the shaft and the top
  // rule have to reach the seam, and padding on a subgrid box would pull the
  // shared row tracks out of alignment with the other column.
  const row = side === "left" ? "md:pr-10 lg:pr-16" : "md:pl-10 lg:pl-16";
  const rowStyle = {
    // Recession is the light's job. The dim never goes far enough to drop body
    // copy under 4.5:1 — both panels stay readable in every state.
    opacity: state === "dim" ? 0.88 : 1,
    transition: "opacity 640ms var(--ease-descent)",
  } as const;

  function handleBlur(event: FocusEvent<HTMLElement>) {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    onLeave();
  }

  return (
    <article
      ref={panelRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={handleBlur}
      className="relative flex flex-col md:row-span-3 md:grid md:grid-rows-subgrid"
    >
      {/* The shaft. Daylight still reaches −40m, so attention is spent as light
          rather than as a border, a shadow or a lift. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          // Both layers are radial and both reach zero before the panel's own
          // edges. A linear wash here would give the light a straight vertical
          // side, and a rectangle of light is a card by another name.
          backgroundImage: [
            "radial-gradient(72% 46% at 50% -2%, rgb(196 228 255 / 0.22), rgb(196 228 255 / 0) 68%)",
            "radial-gradient(58% 92% at 50% 0%, rgb(146 200 255 / 0.115), rgb(146 200 255 / 0) 70%)",
          ].join(","),
          opacity: light.opacity,
          transformOrigin: "top center",
          transform: `scaleY(${light.scaleY})`,
          transition:
            "opacity 640ms var(--ease-descent), transform 760ms var(--ease-descent)",
        }}
      />

      {/* Continuous across the seam on md, and the divider between the two on a
          phone. The accent overlay is the site's one hover gesture — the same
          1px sweep the buttons carry. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px"
        style={{
          backgroundColor: "var(--zone-line)",
          transformOrigin: side === "right" ? "right center" : "left center",
          transform: drawn ? "scaleX(1)" : "scaleX(0)",
          transition: armed ? "transform 820ms var(--ease-descent)" : undefined,
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px origin-left"
        style={{
          backgroundColor: "var(--color-accent-hi)",
          opacity: lit ? 0.9 : 0,
          transform: lit ? "scaleX(1)" : "scaleX(0)",
          transition:
            "transform 620ms var(--ease-descent), opacity 320ms var(--ease-descent)",
        }}
      />

      <div className={`relative z-10 pt-9 sm:pt-10 ${row}`} style={rowStyle}>
        <h3
          className="max-w-[19ch] font-display text-[clamp(1.5rem,2.9vw,2.2rem)] font-bold leading-[1.04] tracking-[-0.02em] text-balance"
          style={{ fontStretch: "106%" }}
        >
          {problem.title}
        </h3>

        <p className="mt-6 max-w-[52ch] text-body opacity-72">{problem.body}</p>
      </div>

      <div className={`relative z-10 mt-11 ${row}`} style={rowStyle}>
        <div className="flex items-center gap-4">
          <span className="text-label uppercase opacity-45">{buildsLabel}</span>
          <span
            aria-hidden="true"
            className="h-px flex-1"
            style={{ backgroundColor: "var(--zone-line)" }}
          />
        </div>

        <ul className="mt-6 flex flex-col gap-4">
          {problem.builds.map((item, index) => (
            <li key={item} className="flex items-start gap-1">
              {/* Calibration. The ticks extend and take the accent when the
                  panel holds the light — a measurement being read, not a
                  bullet being decorated. */}
              <span aria-hidden="true" className="flex w-8 shrink-0 pt-[0.72em]">
                <span
                  className="block h-px w-4 origin-left"
                  style={{
                    backgroundColor: lit
                      ? "var(--color-accent-hi)"
                      : "var(--zone-line-strong)",
                    transform: lit ? "scaleX(1.8)" : "scaleX(1)",
                    transition: `transform 520ms var(--ease-descent) ${index * 55}ms, background-color 420ms var(--ease-descent) ${index * 55}ms`,
                  }}
                />
              </span>
              <span className="max-w-[42ch] text-body opacity-80">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`relative z-10 mt-12 pt-7 ${row}`}
        style={{ ...rowStyle, borderTop: "1px solid var(--zone-line)" }}
      >
        <p className="text-label uppercase opacity-45">{evidenceLabel}</p>
        <p className="mt-4 max-w-[48ch] text-body opacity-72">
          {problem.evidence.body}
        </p>
        {problem.evidence.href && problem.evidence.linkLabel && (
          <HoverLink
            href={problem.evidence.href}
            className="mt-5 text-body font-medium"
          >
            {/* HoverLink hands its children to one inline span, so the arrow
                would break to its own line. Keep label and arrow on one row. */}
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              {problem.evidence.linkLabel}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
                className="shrink-0"
              >
                <path
                  d="M3 7h8m0 0L7.25 3.25M11 7l-3.75 3.75"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
              </svg>
            </span>
          </HoverLink>
        )}
      </div>
    </article>
  );
}
