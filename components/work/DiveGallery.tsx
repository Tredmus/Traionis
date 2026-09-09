"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { HoverAnchor, HoverLink } from "@/components/ui/HoverLink";
import { useCopy } from "@/lib/locale-context";
import { COLUMN_PROJECTS, type CaseStudy } from "@/lib/work";

/**
 * The work gallery — objects in the water column, and the lamp you carry.
 *
 * The evidence is dark by default. Ambient light has almost run out at this
 * depth, so each plate sits at the brightness its own depth allows, and full
 * colour only arrives where the lamp falls. Reading the portfolio is the act
 * of searching for it, which is the one thing a grid of thumbnails can never
 * be.
 *
 * Three light states, decided once on mount:
 *
 *   (unset)  no lamp — every plate fully lit. The no-JS render, the
 *            reduced-motion render, and any browser that cannot do better.
 *            The section is completely coherent here; nothing is hidden
 *            behind an effect.
 *   "on"     fine pointer — the lamp follows the cursor with a trailing lerp.
 *   "scroll" coarse pointer — the lamp lands on each plate as it crosses the
 *            viewport, driven by a scroll timeline off the main thread.
 *
 * PERFORMANCE — the reason this is built the way it is:
 *
 * The lit copy of each shot lives inside a fixed-size masked box (`__beam`)
 * that is TRANSLATED to the lamp, with the image counter-translated by the
 * same amount inside it (`__carry`) so it stays registered with the plate
 * underneath. Both are transforms, so the beam moves entirely on the
 * compositor: the radial mask is rasterised once and never re-rasterised.
 * Animating `mask-image` position instead — the obvious implementation —
 * repaints a full-width image every frame, and that is what fails on a phone.
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
  const side = index % 2 === 0 ? "left" : "right";
  const width = PLATE_WIDTHS[Math.min(index, PLATE_WIDTHS.length - 1)];
  const headingId = `plate-${project.slug}`;

  // The plate-wide click target goes to the deepest thing that exists: the
  // breakdown when there is one, the live build otherwise.
  const primary = project.caseStudy
    ? { href: `/work/${project.slug}`, external: false }
    : project.live
      ? { href: project.live.href, external: true }
      : null;

  const name = primary ? (
    primary.external ? (
      <a
        className="plate__link"
        href={primary.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {project.name}
      </a>
    ) : (
      <a className="plate__link" href={primary.href}>
        {project.name}
      </a>
    )
  ) : (
    project.name
  );

  return (
    <article
      ref={innerRef}
      aria-labelledby={headingId}
      className="plate"
      data-side={side}
      style={
        {
          "--ambient": project.ambient,
          "--plate-w": width,
        } as React.CSSProperties
      }
    >
      <figure className="plate__figure">
        <span className="plate__depth" aria-hidden="true">
          {project.depth}
        </span>

        <div className="plate__window">
          {project.shot && (
            <>
              <div className="plate__base">
                <Image
                  src={project.shot.src}
                  alt={project.shot.alt}
                  width={project.shot.width}
                  height={project.shot.height}
                  sizes="(min-width: 1024px) 62vw, 92vw"
                  className="plate__shot"
                />
              </div>
              <span className="plate__veil" aria-hidden="true" />

              {/* The lit copy. Aligned to the plate by counter-translation. */}
              <div className="plate__beam" aria-hidden="true">
                <div className="plate__carry">
                  <Image
                    src={project.shot.src}
                    alt=""
                    width={project.shot.width}
                    height={project.shot.height}
                    sizes="(min-width: 1024px) 62vw, 92vw"
                    className="plate__shot plate__shot--lit"
                  />
                </div>
              </div>
            </>
          )}

          {project.live && (
            <figcaption className="plate__tag">
              <span>{project.live.label}</span>
              <LiveMark />
            </figcaption>
          )}
        </div>
      </figure>

      <div className="plate__label">
        <h3
          id={headingId}
          className="plate__name font-display font-bold"
          style={{ fontStretch: "116%" }}
        >
          {name}
        </h3>

        <p className="plate__status">{project.statusLabel}</p>

        <p className="mt-6 max-w-[42ch] text-body text-[color-mix(in_srgb,var(--zone-ink)_82%,transparent)]">
          {project.summary}
        </p>

        <p className="mt-4 max-w-[42ch] text-body text-[color-mix(in_srgb,var(--zone-ink)_58%,transparent)]">
          {project.proves}
        </p>

        <div className="plate__links">
          {project.caseStudy && (
            <HoverLink
              href={`/work/${project.slug}`}
              className="text-body font-medium"
            >
              {copy.work.readMore}
            </HoverLink>
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
    </article>
  );
}

export function DiveGallery() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const plateRefs = useRef<(HTMLElement | null)[]>([]);

  useDiveLamp(sectionRef, plateRefs);

  return (
    <div ref={sectionRef} className="dive-column">
      <span className="dive-lamp" aria-hidden="true" />

      <div className="dive-column__plates">
        {COLUMN_PROJECTS.map((project, index) => (
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
