"use client";

import { useMotionValueEvent } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";

import type { CalloutCopy } from "@/lib/content";

import { Callouts } from "./Callouts";
import {
  easeOut,
  FRAME,
  LEFT_EDGE,
  ramp,
  RIGHT_EDGE,
  useSchematicProgress,
  type LabelSlot,
} from "./schematic";

/**
 * APPLICATIONS — a running system.
 *
 * Web and mobile clients on one side, the core in the middle, and the parts
 * an operation actually depends on around it: data, the admin side, maps,
 * payments, notifications, an assistant. The connections draw in, then
 * requests start moving along them — out to the services and back — so the
 * diagram reads as a system at work rather than a picture of one.
 *
 * Node glyphs are drawn, not lettered: every word on the drawing lives in the
 * callouts, which come from the copy layer.
 */

type PartId = "core" | "admin" | "data" | "maps" | "integrations" | "automation";

interface Edge {
  id: string;
  d: string;
  part: PartId;
  /** Seconds per trip, and where in the cycle the first pulse starts. */
  dur: number;
  begin: number;
  /** A reply travelling back toward the core. */
  back?: boolean;
}

const EDGES: readonly Edge[] = [
  { id: "web", d: "M248 198C276 198 272 270 300 270", part: "core", dur: 2.4, begin: 0 },
  { id: "web-back", d: "M248 198C276 198 272 270 300 270", part: "core", dur: 2.4, begin: 1.2, back: true },
  { id: "mobile", d: "M228 362C272 362 268 292 300 292", part: "core", dur: 2.8, begin: 0.6 },
  { id: "mobile-back", d: "M228 362C272 362 268 292 300 292", part: "core", dur: 2.8, begin: 2, back: true },
  { id: "admin", d: "M360 250L360 144", part: "admin", dur: 2.2, begin: 0.9 },
  { id: "data", d: "M360 310L360 412", part: "data", dur: 1.6, begin: 0.3 },
  { id: "data-back", d: "M360 310L360 412", part: "data", dur: 1.6, begin: 1.1, back: true },
  { id: "maps", d: "M420 262C452 262 452 150 478 150", part: "maps", dur: 2.6, begin: 1.4 },
  { id: "pay", d: "M420 281L478 283", part: "integrations", dur: 1.8, begin: 0.2 },
  { id: "notify", d: "M420 298C452 298 456 352 488 352", part: "integrations", dur: 2.4, begin: 1.7 },
  { id: "ai", d: "M420 306C448 306 450 444 478 444", part: "automation", dur: 3, begin: 0.5 },
  { id: "ai-data", d: "M478 452C446 474 424 446 398 440", part: "automation", dur: 2.6, begin: 2.2 },
];

/** Each edge path is drawn once; the `-back` twins only carry pulses. */
const DRAWN_EDGES = EDGES.filter((e) => !e.back && e.id !== "ai-data").concat(
  EDGES.filter((e) => e.id === "ai-data"),
);

interface Node {
  part: PartId;
  lines: string[];
  strong?: string[];
  /** Strong outline with a filled body, so it sits in front of the lines. */
  solid?: string[];
  accent?: string[];
}

const NODES: readonly Node[] = [
  // Core — the API everything talks through.
  {
    part: "core",
    lines: ["M312 250H408A12 12 0 0 1 420 262V298A12 12 0 0 1 408 310H312A12 12 0 0 1 300 298V262A12 12 0 0 1 312 250Z"],
    strong: [
      "M352 266Q344 266 344 274V276Q344 280 340 280Q344 280 344 284V286Q344 294 352 294",
      "M368 266Q376 266 376 274V276Q376 280 380 280Q376 280 376 284V286Q376 294 368 294",
    ],
  },
  // Web client.
  {
    part: "core",
    lines: [
      "M178 172H242A6 6 0 0 1 248 178V218A6 6 0 0 1 242 224H178A6 6 0 0 1 172 218V178A6 6 0 0 1 178 172Z",
      "M172 184H248",
      "M182 198H222",
      "M182 208H236",
    ],
    accent: ["M181 178m-1.6 0a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0-3.2 0"],
  },
  // Mobile client.
  {
    part: "core",
    lines: [
      "M199 330H221A7 7 0 0 1 228 337V387A7 7 0 0 1 221 394H199A7 7 0 0 1 192 387V337A7 7 0 0 1 199 330Z",
      "M205 337H215",
      "M205 386H215",
      "M199 352H221",
      "M199 360H216",
    ],
  },
  // Admin — the owner's side.
  {
    part: "admin",
    lines: [
      "M322 86H398A6 6 0 0 1 404 92V138A6 6 0 0 1 398 144H322A6 6 0 0 1 316 138V92A6 6 0 0 1 322 86Z",
      "M334 86V144",
      "M322 98H330",
      "M322 108H330",
    ],
    strong: ["M346 134V122", "M360 134V112", "M374 134V104", "M388 134V118"],
  },
  // Data — accounts, roles, records.
  {
    part: "data",
    lines: [
      "M322 414V462",
      "M398 414V462",
      "M322 462A38 9 0 0 0 398 462",
      "M322 438A38 9 0 0 0 398 438",
    ],
    strong: ["M322 414A38 9 0 1 0 398 414A38 9 0 1 0 322 414"],
  },
  // Maps — location search: a folded map with a pin standing on it.
  {
    part: "maps",
    lines: [
      "M480 130L499 123L521 131L540 124V170L521 177L499 169L480 176Z",
      "M499 123V169",
      "M521 131V177",
      "M500 166A10 3.5 0 1 0 520 166A10 3.5 0 1 0 500 166",
    ],
    solid: ["M510 165C500 153 498 147 498 141A12 12 0 0 1 522 141C522 147 520 153 510 165Z"],
    accent: ["M506 141a4 4 0 1 0 8 0a4 4 0 1 0-8 0"],
  },
  // Payments.
  {
    part: "integrations",
    lines: [
      "M484 262H536A6 6 0 0 1 542 268V298A6 6 0 0 1 536 304H484A6 6 0 0 1 478 298V268A6 6 0 0 1 484 262Z",
      "M478 274H542",
      "M514 292H532",
    ],
    accent: ["M488 284h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2z"],
  },
  // Notifications.
  {
    part: "integrations",
    lines: [
      "M488 352A22 22 0 1 0 532 352A22 22 0 1 0 488 352",
      "M500 358H520",
      "M503 358V350A7 7 0 0 1 517 350V358",
    ],
    accent: ["M508 362a2 2 0 1 0 4 0a2 2 0 1 0-4 0"],
  },
  // Assistant / automation.
  {
    part: "automation",
    lines: [
      "M486 420H534A8 8 0 0 1 542 428V460A8 8 0 0 1 534 468H486A8 8 0 0 1 478 460V428A8 8 0 0 1 486 420Z",
    ],
    strong: ["M510 430L513 441L524 444L513 447L510 458L507 447L496 444L507 441Z"],
  },
];

/** Where each capability's leader meets the drawing, and its label slot. */
const ANCHORS: Record<string, { x: number; y: number; slot: LabelSlot }> = {
  admin: { x: 316, y: 115, slot: { side: "left", edge: LEFT_EDGE, y: 115 } },
  data: { x: 322, y: 440, slot: { side: "left", edge: LEFT_EDGE, y: 440 } },
  maps: { x: 542, y: 150, slot: { side: "right", edge: RIGHT_EDGE, y: 150 } },
  integrations: { x: 542, y: 283, slot: { side: "right", edge: RIGHT_EDGE, y: 300 } },
  automation: { x: 542, y: 444, slot: { side: "right", edge: RIGHT_EDGE, y: 444 } },
};

const SLOTS: Record<string, LabelSlot> = Object.fromEntries(
  Object.entries(ANCHORS).map(([id, a]) => [id, a.slot]),
);

const VIEW_DESKTOP = `0 0 ${FRAME.w} ${FRAME.h}`;
const VIEW_MOBILE = "160 72 400 416";

interface Phase {
  nodes: number;
  edges: number;
  labels: number[];
  markers: number[];
  flowing: boolean;
}

function phaseAt(v: number, mode: "pinned" | "flowing" | "still", n: number): Phase {
  if (mode === "still") {
    return { nodes: 1, edges: 1, labels: Array(n).fill(1), markers: Array(n).fill(1), flowing: false };
  }
  if (mode === "pinned") {
    return {
      nodes: easeOut(ramp(v, 0.04, 0.3)),
      edges: easeOut(ramp(v, 0.2, 0.42)),
      labels: Array.from({ length: n }, (_, i) => ramp(v, 0.42 + i * 0.035, 0.48 + i * 0.035)),
      markers: Array(n).fill(0),
      flowing: v > 0.38,
    };
  }
  return {
    nodes: easeOut(ramp(v, 0, 0.4)),
    edges: easeOut(ramp(v, 0.25, 0.65)),
    labels: Array(n).fill(1),
    markers: Array.from({ length: n }, (_, i) => ramp(v, 0.6 + i * 0.06, 0.72 + i * 0.06)),
    flowing: v > 0.6,
  };
}

const f = (n: number) => n.toFixed(1);

export function SystemSchematic({
  callouts,
  track,
}: {
  callouts: readonly CalloutCopy[];
  track: RefObject<HTMLElement | null>;
}) {
  const { desktop, reduced, pinned, flowing } = useSchematicProgress(track);
  const uid = useId().replace(/:/g, "");
  const [active, setActive] = useState<string | null>(null);
  // The pulses run on the SVG's own animation clock, held paused until the
  // system has drawn in. Once running it keeps running; scrolling back up
  // does not switch it off mid-request.
  const running = useRef(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const leaderRefs = useRef<(SVGPathElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const markerRefs = useRef<(SVGGElement | null)[]>([]);
  const labelRefs = useRef<(HTMLLIElement | null)[]>([]);

  const apply = useCallback(
    (p: Phase) => {
      const svg = svgRef.current;
      svg?.style.setProperty("--sx-draw", String(p.nodes));
      svg?.style.setProperty("--sx-edges", String(p.edges));
      callouts.forEach((callout, i) => {
        const a = ANCHORS[callout.anchor];
        if (!a) return;
        const vis = p.labels[i] ?? 1;
        const leader = leaderRefs.current[i];
        if (leader) leader.style.strokeDashoffset = String(1 - vis);
        const dot = dotRefs.current[i];
        if (dot) dot.style.opacity = String(vis);
        const marker = markerRefs.current[i];
        if (marker) marker.style.opacity = String(p.markers[i] ?? 1);
        const label = labelRefs.current[i];
        if (label) {
          label.style.opacity = desktop ? String(vis) : "";
          label.style.translate = desktop
            ? `${f((1 - vis) * (a.slot.side === "left" ? 10 : -10))}px 0`
            : "";
        }
      });
      if (p.flowing && !running.current && svg) {
        running.current = true;
        svg.unpauseAnimations();
        svg.dataset.running = "true";
      }
    },
    [callouts, desktop],
  );

  const mode = reduced ? "still" : desktop ? "pinned" : "flowing";

  useEffect(() => {
    if (!running.current) svgRef.current?.pauseAnimations();
  }, []);

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
  const pathId = (id: string) => `sx-${uid}-${id}`;

  return (
    <figure
      className="sx"
      data-active={active ?? undefined}
      style={{ "--sx-ratio": `${vw} / ${vh}`, "--sx-k": vw / vh } as CSSProperties}
    >
      <div className="sx-frame">
        <svg ref={svgRef} className="sx-svg" viewBox={view} aria-hidden="true" focusable="false">
          <g className="sx-edges">
            {DRAWN_EDGES.map((edge) => (
              <path
                key={edge.id}
                id={pathId(edge.id)}
                className="sx-edge"
                data-lit={active === edge.part}
                d={edge.d}
                pathLength={1}
              />
            ))}
          </g>

          {NODES.map((node, i) => (
            <g
              key={i}
              className="sx-part"
              data-lit={active === node.part}
              data-hoverable={node.part in ANCHORS}
              // Parts with a callout answer the pointer the way their label
              // does; the core and the clients have no callout and stay put.
              onPointerEnter={() => {
                if (node.part in ANCHORS) setActive(node.part);
              }}
              onPointerLeave={() => setActive(null)}
            >
              {node.lines.map((d, k) => (
                <path key={`l${k}`} className="sx-stroke sx-node" d={d} pathLength={1} />
              ))}
              {node.strong?.map((d, k) => (
                <path key={`s${k}`} className="sx-stroke sx-stroke--strong" d={d} pathLength={1} />
              ))}
              {node.solid?.map((d, k) => (
                <path
                  key={`o${k}`}
                  className="sx-stroke sx-stroke--strong sx-stroke--solid"
                  d={d}
                  pathLength={1}
                />
              ))}
              {node.accent?.map((d, k) => (
                <path key={`a${k}`} className="sx-accent" d={d} />
              ))}
            </g>
          ))}

          {!reduced && (
            <g className="sx-pulses">
              {EDGES.map((edge) => (
                <circle key={edge.id} className="sx-pulse" data-lit={active === edge.part} r={2.4}>
                  <animateMotion
                    dur={`${edge.dur}s`}
                    begin={`${edge.begin}s`}
                    repeatCount="indefinite"
                    keyPoints={edge.back ? "1;0" : "0;1"}
                    keyTimes="0;1"
                    calcMode="linear"
                  >
                    <mpath href={`#${pathId(edge.back ? edge.id.replace("-back", "") : edge.id)}`} />
                  </animateMotion>
                </circle>
              ))}
            </g>
          )}

          <g className="sx-leaders">
            {callouts.map((callout, i) => {
              const a = ANCHORS[callout.anchor];
              if (!a) return null;
              const { slot } = a;
              const elbow = slot.side === "left" ? slot.edge + 8 : slot.edge - 8;
              return (
                <g key={callout.anchor} data-lit={active === callout.anchor}>
                  <path
                    ref={(node) => {
                      leaderRefs.current[i] = node;
                    }}
                    className="sx-leader"
                    d={`M${a.x} ${a.y}L${elbow} ${slot.y}L${slot.edge} ${slot.y}`}
                    pathLength={1}
                  />
                  <circle
                    ref={(node) => {
                      dotRefs.current[i] = node;
                    }}
                    className="sx-anchor"
                    cx={a.x}
                    cy={a.y}
                    r={2.6}
                  />
                </g>
              );
            })}
          </g>

          <g className="sx-markers">
            {callouts.map((callout, i) => {
              const a = ANCHORS[callout.anchor];
              if (!a) return null;
              return (
                <g
                  key={callout.anchor}
                  ref={(node) => {
                    markerRefs.current[i] = node;
                  }}
                  className="sx-marker"
                  transform={`translate(${a.x} ${a.y})`}
                >
                  <circle r={12} />
                  <text dy="0.35em">{i + 1}</text>
                </g>
              );
            })}
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
