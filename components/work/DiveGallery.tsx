"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { HoverAnchor } from "@/components/ui/HoverLink";
import { useCopy, useLocale } from "@/lib/locale-context";
import { COLUMN_PROJECTS, localizeProject, type CaseStudy } from "@/lib/work";

/**
 * The work gallery — objects in the water column, and the lamp you carry.
 *
 * The work is always visible: each plate plays a loop of the live site, with
 * its phone view set against the corner. The water takes only the edge off,
 * and the lamp you carry is light laid over it — a pool over the column and a
 * glow across whichever plate it finds.
 *
 * Three light states, decided once on mount:
 *
 *   (unset)  no lamp, no tint. The no-JS render, the reduced-motion render,
 *            and any browser that cannot do better.
 *   "on"     fine pointer — the lamp follows the cursor with a trailing lerp.
 *   "scroll" coarse pointer — the glow lands on each plate as it crosses the
 *            viewport, driven by a scroll timeline off the main thread.
 *
 * PERFORMANCE — the glow is one small gradient per plate, TRANSLATED to the
 * lamp. It moves on the compositor and never repaints the video under it;
 * a mask or a second copy of the media would.
 */

const LAMP_EASE = 0.14;
/** Below this the lamp has arrived; the loop stops rather than idling. */
const LAMP_SETTLE = 0.4;
/** Feather at the band's top and bottom edges so the light has no hard cut. */
const LAMP_EDGE = 260;

type LampMode = "on" | "scroll" | null;

function resolveLampMode(): LampMode {
  if (typeof window === "undefined") return null;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  if (window.matchMedia("(pointer: fine)").matches) return "on";
  if (
    typeof CSS !== "undefined" &&
    CSS.supports?.("animation-timeline: view()")
  ) {
    return "scroll";
  }
  return null;
}

/**
 * Drives the lamp. Returns nothing — it writes custom properties straight to
 * the DOM, because routing 60 frames a second through React state is how a
 * scroll effect turns into a stutter.
 */
function useDiveLamp(
  sectionRef: React.RefObject<HTMLElement | null>,
  plateRefs: React.RefObject<(HTMLElement | null)[]>,
) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mode = resolveLampMode();
    if (!mode) return;
    section.dataset.lamp = mode;

    // The beam lives inside `.plate__window`, so every coordinate handed to it
    // must be measured from the WINDOW's origin, not the plate's. On a plate
    // whose window is the second grid column the two differ by the whole label
    // column, and the light lands that far off the cursor.
    let targets: { plate: HTMLElement; win: HTMLElement }[] = [];

    // Both modes need each window's pixel size, so the beam's counter-transform
    // can keep the lit copy registered with the dark one underneath.
    const measure = () => {
      targets = [];
      for (const plate of plateRefs.current ?? []) {
        const win = plate?.querySelector<HTMLElement>(".plate__window");
        if (!plate || !win) continue;
        targets.push({ plate, win });
        plate.style.setProperty("--pw", `${win.offsetWidth}px`);
        plate.style.setProperty("--ph", `${win.offsetHeight}px`);
      }
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(section);

    if (mode === "scroll") {
      return () => resizeObserver.disconnect();
    }

    const pool = section.querySelector<HTMLElement>(".dive-lamp");
    const rect = section.getBoundingClientRect();
    // Start under the cursor's most likely resting place rather than at 0,0:
    // a lamp that flies in from the corner on first move is a cheap trick.
    let targetX = rect.width / 2;
    let targetY = rect.height / 3;
    let x = targetX;
    let y = targetY;
    // The lamp is already lit when the band arrives; it just has not been
    // pointed anywhere yet. A section that is pitch black until the visitor
    // happens to move the mouse is a dead state, not a discovery.
    let inside = true;
    let lastClientY = 0;
    let frame = 0;

    const paint = () => {
      frame = 0;

      const bounds = section.getBoundingClientRect();
      x += (targetX - x) * LAMP_EASE;
      y += (targetY - y) * LAMP_EASE;

      if (pool) {
        pool.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        // Fade at the band edges. The light belongs to this depth; it must not
        // spill across a boundary the whole system is built on.
        const edge = Math.min(y, bounds.height - y);
        const feather = Math.max(0, Math.min(1, edge / LAMP_EDGE));
        pool.style.opacity = inside ? `${feather}` : "0";
      }

      for (const { plate, win } of targets) {
        const box = win.getBoundingClientRect();
        plate.style.setProperty("--lx", `${x - (box.left - bounds.left)}px`);
        plate.style.setProperty("--ly", `${y - (box.top - bounds.top)}px`);
      }

      const moving =
        Math.abs(targetX - x) > LAMP_SETTLE || Math.abs(targetY - y) > LAMP_SETTLE;
      if (moving) frame = requestAnimationFrame(paint);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = section.getBoundingClientRect();
      lastClientY = event.clientY;
      targetX = event.clientX - bounds.left;
      targetY = event.clientY - bounds.top;
      inside =
        targetY > -LAMP_EDGE * 0.5 && targetY < bounds.height + LAMP_EDGE * 0.5;
      schedule();
    };

    // Scrolling moves the plates under a stationary cursor, which moves the
    // lamp across them just as truly as moving the mouse does.
    const onScroll = () => {
      const bounds = section.getBoundingClientRect();
      targetY = lastClientY - bounds.top;
      inside =
        targetY > -LAMP_EDGE * 0.5 && targetY < bounds.height + LAMP_EDGE * 0.5;
      // Nudge past the settle threshold so a pure scroll still repaints.
      y += (targetY - y) * 0.001;
      schedule();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    paint();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [plateRefs, sectionRef]);
}

/**
 * Outbound marker. Drawn, not a unicode arrow borrowed from the font.
 *
 * `inline-block` is load-bearing: Tailwind's preflight sets `svg { display:
 * block }`, which drops the arrow onto its own line inside a text link no
 * matter what `white-space` says.
 */
function LiveMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className="ml-[0.4em] inline-block h-[0.7em] w-[0.7em] shrink-0 [vertical-align:-0.02em]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.4 8.6 8.6 3.4" />
      <path d="M4.6 3.4h4v4" />
    </svg>
  );
}

/** Recession into the column. Nearest plate first; five is the practical floor. */
const PLATE_WIDTHS = ["100%", "92%", "84%", "79%", "75%"];

/**
 * A breakdown is published only when every line of it is real. Any TODO left
 * in the problem, the decisions or the outcome keeps the whole thing hidden —
 * half an engineering story is worse than none.
 */
function hasBreakdown(project: CaseStudy) {
  if (!project.caseStudy || project.decisions.length === 0) return false;
  const text = [
    ...project.problem,
    ...project.decisions.flatMap((d) => [d.title, d.body]),
    ...project.outcome,
  ];
  return text.length > 0 && text.every((line) => line.trim() && !line.includes("TODO"));
}

/**
 * The live site, playing. Loads nothing until the plate comes near, plays
 * only while it is on screen, and never plays at all under reduced motion —
 * the poster (the loop's own first frame) stands in.
 */
function PlateLoop({ project }: { project: CaseStudy }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "120px 0px", threshold: 0.2 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const loop = project.loop!;
  return (
    <video
      ref={ref}
      className="plate__shot"
      poster={loop.poster}
      width={loop.width}
      height={loop.height}
      muted
      loop
      playsInline
      preload="none"
      aria-label={project.shot?.alt ?? project.name}
    >
      <source src={loop.src} type="video/mp4" />
    </video>
  );
}

function Breakdown({ project, id }: { project: CaseStudy; id: string }) {
  const copy = useCopy();
  return (
    <div id={id} className="plate__breakdown">
      <div className="plate__breakdown-inner">
        <section>
          <h4 className="plate__breakdown-head">{copy.work.breakdown.problem}</h4>
          {project.problem.map((line) => (
            <p key={line} className="plate__breakdown-body">
              {line}
            </p>
          ))}
        </section>
        <section>
          <h4 className="plate__breakdown-head">{copy.work.breakdown.decisions}</h4>
          <ol className="plate__decisions">
            {project.decisions.map((decision) => (
              <li key={decision.title}>
                <p className="plate__decision-title">{decision.title}</p>
                <p className="plate__breakdown-body">{decision.body}</p>
              </li>
            ))}
          </ol>
        </section>
        <section>
          <h4 className="plate__breakdown-head">{copy.work.breakdown.outcome}</h4>
          {project.outcome.map((line) => (
            <p key={line} className="plate__breakdown-body">
              {line}
            </p>
          ))}
        </section>
      </div>
    </div>
  );
}

function ProjectPlate({
  project,
  index,
  innerRef,
}: {
  project: CaseStudy;
  index: number;
  innerRef: (node: HTMLElement | null) => void;
}) {
  const copy = useCopy();
  const [open, setOpen] = useState(false);
  const side = index % 2 === 0 ? "left" : "right";
  const width = PLATE_WIDTHS[Math.min(index, PLATE_WIDTHS.length - 1)];
  const headingId = `plate-${project.slug}`;
  const breakdownId = `${headingId}-breakdown`;
  const breakdown = hasBreakdown(project);

  const name = project.live ? (
    <a className="plate__link" href={project.live.href} target="_blank" rel="noopener noreferrer">
      {project.name}
    </a>
  ) : (
    project.name
  );

  return (
    <article
      ref={innerRef}
      aria-labelledby={headingId}
      className="plate"
      data-side={side}
      data-open={open}
      style={{ "--plate-w": width } as React.CSSProperties}
    >
      <figure className="plate__figure">
        <div className="plate__window">
          {project.loop ? (
            <PlateLoop project={project} />
          ) : (
            project.shot && (
              <Image
                src={project.shot.src}
                alt={project.shot.alt}
                width={project.shot.width}
                height={project.shot.height}
                sizes="(min-width: 1024px) 62vw, 92vw"
                className="plate__shot"
              />
            )
          )}
          <span className="plate__veil" aria-hidden="true" />
          <span className="plate__beam" aria-hidden="true" />

          {project.live && (
            <a
              className="plate__tag"
              href={project.live.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{project.live.label}</span>
              <LiveMark />
            </a>
          )}
        </div>

        {project.phone && (
          <div className="plate__phone">
            <div className="plate__phone-screen">
              <span className="plate__phone-status" aria-hidden="true" />
              <Image
              src={project.phone.src}
              alt={project.phone.alt}
              width={project.phone.width}
              height={project.phone.height}
              sizes="(min-width: 1024px) 12rem, 30vw"
                className="plate__phone-shot"
              />
            </div>
          </div>
        )}
      </figure>

      <div className="plate__label">
        <h3
          id={headingId}
          className="plate__name font-display font-bold"
          style={{ fontStretch: "116%" }}
        >
          {name}
        </h3>
        <p className="plate__status">{project.kind}</p>

        <p className="mt-6 max-w-[42ch] text-body text-[color-mix(in_srgb,var(--zone-ink)_82%,transparent)]">
          {project.summary}
        </p>

        <p className="mt-4 max-w-[42ch] text-body text-[color-mix(in_srgb,var(--zone-ink)_58%,transparent)]">
          {project.proves}
        </p>

        <div className="plate__links">
          {breakdown && (
            <button
              type="button"
              className="plate__toggle text-body font-medium"
              aria-expanded={open}
              aria-controls={breakdownId}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? copy.work.readLess : copy.work.readMore}
              <span className="plate__toggle-mark" aria-hidden="true" />
            </button>
          )}
          {project.live && (
            <HoverAnchor
              href={project.live.href}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap text-body text-[color-mix(in_srgb,var(--zone-ink)_70%,transparent)]"
            >
              {copy.work.visitLive}
              <LiveMark />
            </HoverAnchor>
          )}
        </div>
      </div>

      {breakdown && <Breakdown project={project} id={breakdownId} />}
    </article>
  );
}

export function DiveGallery() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const plateRefs = useRef<(HTMLElement | null)[]>([]);
  const { locale } = useLocale();

  useDiveLamp(sectionRef, plateRefs);

  return (
    <div ref={sectionRef} className="dive-column">
      <span className="dive-lamp" aria-hidden="true" />

      <div className="dive-column__plates">
        {COLUMN_PROJECTS.map((source) => localizeProject(source, locale)).map((project, index) => (
          <ProjectPlate
            key={project.slug}
            project={project}
            index={index}
            innerRef={(node) => {
              plateRefs.current[index] = node;
            }}
          />
        ))}
      </div>
    </div>
  );
}
