"use client";

import type { CSSProperties, MutableRefObject } from "react";

import type { CalloutCopy } from "@/lib/content";

import { FRAME, type LabelSlot } from "./schematic";

interface CalloutsProps {
  callouts: readonly CalloutCopy[];
  slots: Readonly<Record<string, LabelSlot>>;
  active: string | null;
  onActive: (anchor: string | null) => void;
  labelRefs: MutableRefObject<(HTMLLIElement | null)[]>;
}

/**
 * The capabilities, as real text. One list, two layouts: below `lg` it is a
 * numbered list under the drawing (numbers match the markers on it); from
 * `lg` each item is lifted into the drawing's side gutter at its slot, and
 * the drawing draws the leader line to it.
 */
export function Callouts({ callouts, slots, active, onActive, labelRefs }: CalloutsProps) {
  return (
    <ol className="sx-callouts">
      {callouts.map((callout, i) => {
        const slot = slots[callout.anchor];
        const style = slot
          ? ({
              "--sx-x": `${(slot.edge / FRAME.w) * 100}%`,
              "--sx-y": `${(slot.y / FRAME.h) * 100}%`,
              "--sx-w": `${((FRAME.gutter - 8) / FRAME.w) * 100}%`,
            } as CSSProperties)
          : undefined;
        return (
          <li
            key={callout.anchor}
            ref={(node) => {
              labelRefs.current[i] = node;
            }}
            className="sx-callout"
            data-side={slot?.side}
            data-lit={active === callout.anchor}
            style={style}
            onPointerEnter={() => onActive(callout.anchor)}
            onPointerLeave={() => onActive(null)}
          >
            <span className="sx-callout__n" aria-hidden="true">
              {i + 1}
            </span>
            <span className="sx-callout__text">{callout.text}</span>
          </li>
        );
      })}
    </ol>
  );
}
