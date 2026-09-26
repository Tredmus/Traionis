"use client";

import { useMotionValueEvent } from "motion/react";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";

import type { CalloutCopy } from "@/lib/content";

import { Callouts } from "./Callouts";
import {
  easeInOut,
  FRAME,
  LEFT_EDGE,
  ramp,
  RIGHT_EDGE,
  TAU,
  useSchematicProgress,
  type LabelSlot,
} from "./schematic";

/**
 * WEBSITES — an exploded view of a page.
 *
 * Five planes of one page, drawn in isometric and stacked: what the site
 * stands on, how it is structured, what it says, how it looks, how it
 * behaves. Scroll pulls them apart like a product diagram, each capability
 * is pinned to its plane, and at the end they close back into one page.
 *
 * Every plane is authored in its own flat coordinates and projected here,
 * so exploding the stack is a pure vertical translate — strokes never skew.
 */

/** Plane size, in plane units. Portrait: a page is taller than it is wide. */
const U = 180;
const V = 245;
const KX = Math.cos(Math.PI / 6);
const KY = 0.5;
const PLATE_H = (U + V) * KY;
/** Horizontal origin that centres the projected plane in the frame. */
const CX = FRAME.w / 2 - ((U - V) * KX) / 2;
/** Vertical spacing between planes at full explode. */
const GAP = 62;

const LAYERS = ["foundation", "structure", "content", "design", "interaction"] as const;
type LayerId = (typeof LAYERS)[number];
const TOP = LAYERS.length - 1;

function layerY(i: number, explode: number) {
  const base = FRAME.h / 2 - PLATE_H / 2 + (TOP * GAP * explode) / 2;
  return base - i * GAP * explode;
}

// ── Projection helpers (plane u,v → frame x,y relative to the plane origin) ──

function iso(u: number, v: number): [number, number] {
  return [(u - v) * KX, (u + v) * KY];
}
const f = (n: number) => n.toFixed(1);
function pt(u: number, v: number) {
  const [x, y] = iso(u, v);
  return `${f(x)} ${f(y)}`;
}
function line(u1: number, v1: number, u2: number, v2: number) {
  return `M${pt(u1, v1)}L${pt(u2, v2)}`;
}
function poly(points: readonly [number, number][], close = false) {
  return `M${points.map(([u, v]) => pt(u, v)).join("L")}${close ? "Z" : ""}`;
}
function rect(u: number, v: number, w: number, h: number) {
  return poly(
    [
      [u, v],
      [u + w, v],
      [u + w, v + h],
      [u, v + h],
    ],
    true,
  );
}
function circle(cu: number, cv: number, r: number, n = 18) {
  return poly(
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * TAU;
      return [cu + Math.cos(a) * r, cv + Math.sin(a) * r] as [number, number];
    }),
    true,
  );
}
function quad(p0: [number, number], c: [number, number], p1: [number, number], n = 18) {
  return poly(
    Array.from({ length: n + 1 }, (_, i) => {
      const t = i / n;
      const a = (1 - t) * (1 - t);
      const b = 2 * (1 - t) * t;
      const d = t * t;
      return [a * p0[0] + b * c[0] + d * p1[0], a * p0[1] + b * c[1] + d * p1[1]] as [
        number,
        number,
      ];
    }),
  );
}

interface LayerArt {
  faint: string[];
  lines: string[];
  strong: string[];
  accent: string[];
}

const PLATE = rect(0, 0, U, V);

const ART: Record<LayerId, LayerArt> = {
  // What it stands on: the repository and the keys to it.
  foundation: {
    faint: [rect(8, 8, U - 16, V - 16)],
    lines: [
      line(18, 26, 62, 26),
      line(22, 30, 22, 64),
      line(22, 40, 30, 40),
      line(22, 52, 30, 52),
      line(22, 64, 30, 64),
      line(34, 40, 80, 40),
      line(34, 52, 66, 52),
      line(34, 64, 74, 64),
      circle(140, 200, 8),
      line(148, 200, 168, 200),
      line(162, 200, 162, 207),
      line(168, 200, 168, 206),
    ],
    strong: [
      poly([
        [74, 112],
        [62, 124],
        [74, 136],
      ]),
      poly([
        [106, 112],
        [118, 124],
        [106, 136],
      ]),
      line(96, 108, 84, 140),
    ],
    accent: [],
  },
  // The skeleton search engines read: grid and sections.
  structure: {
    faint: [30, 60, 90, 120, 150].map((u) => line(u, 0, u, V)),
    lines: [
      rect(10, 10, 160, 22),
      rect(10, 42, 160, 70),
      rect(10, 122, 75, 58),
      rect(95, 122, 75, 58),
      rect(10, 190, 160, 44),
    ],
    strong: [],
    accent: [],
  },
  // What it says — in more than one language.
  content: {
    faint: [],
    lines: [
      line(20, 74, 150, 74),
      line(20, 84, 140, 84),
      line(20, 94, 108, 94),
      line(20, 156, 160, 156),
      line(20, 166, 148, 166),
      line(20, 176, 126, 176),
      line(20, 200, 150, 200),
      line(20, 210, 120, 210),
      rect(144, 16, 22, 12),
    ],
    strong: [line(20, 58, 118, 58), line(20, 142, 84, 142)],
    accent: [rect(118, 16, 22, 12)],
  },
  // How it looks: imagery, colour, the one action.
  design: {
    faint: [],
    lines: [
      rect(20, 18, 140, 72),
      poly([
        [28, 82],
        [58, 52],
        [78, 70],
        [100, 46],
        [152, 82],
      ]),
      circle(134, 36, 7),
      rect(20, 136, 64, 86),
      rect(96, 136, 64, 86),
      line(28, 200, 72, 200),
      line(104, 200, 148, 200),
      circle(126, 112, 5),
      circle(141, 112, 5),
    ],
    strong: [],
    accent: [rect(20, 104, 58, 16), circle(111, 112, 5)],
  },
  // How it behaves: motion, input, and frames that arrive on time.
  interaction: {
    faint: [line(20, 228, 160, 228)],
    lines: [
      quad([28, 204], [40, 72], [150, 58]),
      poly([
        [138, 52],
        [150, 58],
        [140, 68],
      ]),
      poly(
        [
          [96, 118],
          [96, 140],
          [102, 134],
          [107, 144],
          [111, 142],
          [106, 132],
          [114, 132],
        ],
        true,
      ),
      circle(100, 124, 15),
    ],
    strong: Array.from({ length: 10 }, (_, k) => line(24 + k * 14, 228, 24 + k * 14, 218)),
    accent: [],
  },
};

/** Where a leader line meets its plane: the plane's outer corner on that side. */
const LEFT_CORNER = iso(0, V);
const RIGHT_CORNER = iso(U, 0);

function sideOf(i: number): "left" | "right" {
  return i % 2 === 0 ? "left" : "right";
}

function anchorPoint(i: number, explode: number) {
  const [dx, dy] = sideOf(i) === "left" ? LEFT_CORNER : RIGHT_CORNER;
  return { x: CX + dx, y: layerY(i, explode) + dy };
}

const SLOTS: Record<string, LabelSlot> = Object.fromEntries(
  LAYERS.map((id, i) => {
    const side = sideOf(i);
    return [
      id,
      { side, edge: side === "left" ? LEFT_EDGE : RIGHT_EDGE, y: anchorPoint(i, 1).y },
    ];
  }),
);

/** Mobile crops to the drawing itself; the labels are a list underneath. */
const VIEW_DESKTOP = `0 0 ${FRAME.w} ${FRAME.h}`;
const VIEW_MOBILE = "160 36 400 488";

interface Phase {
  draw: number;
  /** Per layer, bottom to top: 0 resting in the stack, 1 fully lifted. */
  explode: number[];
  labels: number[];
  markers: number[];
}

const ALL_LIFTED = LAYERS.map(() => 1);

function phaseAt(v: number, mode: "pinned" | "flowing" | "still", n: number): Phase {
  if (mode === "still") {
    return { draw: 1, explode: ALL_LIFTED, labels: Array(n).fill(1), markers: Array(n).fill(1) };
  }
  if (mode === "pinned") {
    // Draws while the panel rises. Once pinned the sheets lift off one at a
    // time from the top, like pages taken off a stack; every capability is
    // labelled; then they are set back down from the bottom up, the top
    // sheet landing last, and the panel releases a single finished page.
    const fadeLabels = 1 - ramp(v, 0.8, 0.85);
    return {
      draw: easeInOut(ramp(v, 0.02, 0.38)),
      explode: LAYERS.map((_, i) => {
        const lift = TOP - i;
        const open = easeInOut(ramp(v, 0.28 + lift * 0.035, 0.48 + lift * 0.035));
        const close = easeInOut(ramp(v, 0.83 + i * 0.018, 0.93 + i * 0.014));
        return open * (1 - close);
      }),
      labels: Array.from(
        { length: n },
        (_, i) => ramp(v, 0.52 + i * 0.03, 0.59 + i * 0.03) * fadeLabels,
      ),
      markers: Array(n).fill(0),
    };
  }
  return {
    draw: easeInOut(ramp(v, 0, 0.45)),
    explode: LAYERS.map((_, i) => {
      const lift = TOP - i;
      return easeInOut(ramp(v, 0.3 + lift * 0.06, 0.62 + lift * 0.06));
    }),
    labels: Array(n).fill(1),
    markers: Array.from({ length: n }, (_, i) => ramp(v, 0.7 + i * 0.05, 0.8 + i * 0.05)),
  };
}

export function SiteSchematic({
  callouts,
  track,
}: {
  callouts: readonly CalloutCopy[];
  track: RefObject<HTMLElement | null>;
}) {
  const { desktop, reduced, pinned, flowing } = useSchematicProgress(track);
  const [active, setActive] = useState<string | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);
  const layerRefs = useRef<(SVGGElement | null)[]>([]);
  const leaderRefs = useRef<(SVGPathElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const markerRefs = useRef<(SVGGElement | null)[]>([]);
  const labelRefs = useRef<(HTMLLIElement | null)[]>([]);

  const apply = useCallback(
    (p: Phase) => {
      svgRef.current?.style.setProperty("--sx-draw", String(p.draw));
      LAYERS.forEach((_, i) => {
        layerRefs.current[i]?.setAttribute(
          "transform",
          `translate(${f(CX)} ${f(layerY(i, p.explode[i] ?? 1))})`,
        );
      });
      callouts.forEach((callout, i) => {
        const li = LAYERS.indexOf(callout.anchor as LayerId);
        if (li < 0) return;
        const slot = SLOTS[callout.anchor]!;
        const a = anchorPoint(li, p.explode[li] ?? 1);
        const vis = p.labels[i] ?? 1;
        const elbow = slot.side === "left" ? slot.edge + 8 : slot.edge - 8;

        const leader = leaderRefs.current[i];
        if (leader) {
          leader.setAttribute(
            "d",
            `M${f(a.x)} ${f(a.y)}L${f(elbow)} ${f(slot.y)}L${f(slot.edge)} ${f(slot.y)}`,
          );
          leader.style.strokeDashoffset = String(1 - vis);
        }
        const dot = dotRefs.current[i];
        if (dot) {
          dot.setAttribute("cx", f(a.x));
          dot.setAttribute("cy", f(a.y));
          dot.style.opacity = String(vis);
        }
        const marker = markerRefs.current[i];
        if (marker) {
          marker.setAttribute("transform", `translate(${f(a.x)} ${f(a.y)})`);
          marker.style.opacity = String(p.markers[i] ?? 1);
        }
        const label = labelRefs.current[i];
        if (label) {
          label.style.opacity = desktop ? String(vis) : "";
          label.style.translate = desktop
            ? `${f((1 - vis) * (slot.side === "left" ? 10 : -10))}px 0`
            : "";
        }
      });
    },
    [callouts, desktop],
  );

  const mode = reduced ? "still" : desktop ? "pinned" : "flowing";

  useLayoutEffect(() => {
    const v = mode === "pinned" ? pinned.get() : flowing.get();
    apply(phaseAt(v, mode, callouts.length));
  }, [apply, mode, pinned, flowing, callouts.length]);

  useMotionValueEvent(pinned, "change", (v) => {
    if (mode === "pinned") apply(phaseAt(v, mode, callouts.length));
  });
  useMotionValueEvent(flowing, "change", (v) => {
    if (mode === "flowing") apply(phaseAt(v, mode, callouts.length));
  });

  const view = desktop ? VIEW_DESKTOP : VIEW_MOBILE;
  const [, , vw, vh] = view.split(" ").map(Number);

  return (
    <figure
      className="sx"
      data-active={active ?? undefined}
      style={{ "--sx-ratio": `${vw} / ${vh}`, "--sx-k": vw / vh } as CSSProperties}
    >
      <div className="sx-frame">
        <svg
          ref={svgRef}
          className="sx-svg"
          viewBox={view}
          aria-hidden="true"
          focusable="false"
        >
          {LAYERS.map((id, i) => {
            const art = ART[id];
            return (
              <g
                key={id}
                ref={(node) => {
                  layerRefs.current[i] = node;
                }}
                className="sx-part"
                data-lit={active === id}
                data-hoverable={callouts.some((c) => c.anchor === id)}
                onPointerEnter={() => {
                  if (callouts.some((c) => c.anchor === id)) setActive(id);
                }}
                onPointerLeave={() => setActive(null)}
                transform={`translate(${f(CX)} ${f(layerY(i, 1))})`}
              >
                <path className="sx-plate" d={PLATE} pathLength={1} />
                {art.faint.map((d, k) => (
                  <path key={`f${k}`} className="sx-stroke sx-stroke--faint" d={d} pathLength={1} />
                ))}
                {art.lines.map((d, k) => (
                  <path key={`l${k}`} className="sx-stroke" d={d} pathLength={1} />
                ))}
                {art.strong.map((d, k) => (
                  <path key={`s${k}`} className="sx-stroke sx-stroke--strong" d={d} pathLength={1} />
                ))}
                {art.accent.map((d, k) => (
                  <path key={`a${k}`} className="sx-accent" d={d} />
                ))}
              </g>
            );
          })}

          <g className="sx-leaders">
            {callouts.map((callout, i) => (
              <g key={callout.anchor} data-lit={active === callout.anchor}>
                <path
                  ref={(node) => {
                    leaderRefs.current[i] = node;
                  }}
                  className="sx-leader"
                  pathLength={1}
                />
                <circle
                  ref={(node) => {
                    dotRefs.current[i] = node;
                  }}
                  className="sx-anchor"
                  r={2.6}
                />
              </g>
            ))}
          </g>

          <g className="sx-markers">
            {callouts.map((callout, i) => (
              <g
                key={callout.anchor}
                ref={(node) => {
                  markerRefs.current[i] = node;
                }}
                className="sx-marker"
              >
                <circle r={12} />
                <text dy="0.35em">{i + 1}</text>
              </g>
            ))}
          </g>
        </svg>

        <Callouts
          callouts={callouts}
          slots={SLOTS}
          active={active}
          onActive={setActive}
          labelRefs={labelRefs}
        />
      </div>
    </figure>
  );
}
