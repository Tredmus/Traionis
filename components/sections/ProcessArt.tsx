/**
 * What each stage leaves in the client's hands, drawn in the same hairline
 * language as the service drawings. Each figure draws itself when the
 * jellyfish reaches its station (the row's `data-reached`); with no JS the
 * row carries no attribute and the figure is simply there.
 *
 * Drawn, not lettered — the words live in the step copy beside it. Keyed by
 * step id; an unknown id draws nothing, so the process can grow a step
 * without a drawing and still render.
 */

import type { CSSProperties } from "react";

type Stroke = { d: string; kind?: "strong" | "faint" | "accent" };

const ART: Record<string, readonly Stroke[]> = {
  // Discovery call — two people on a call, the clock running.
  call: [
    { d: "M22 14H218A10 10 0 0 1 228 24V126A10 10 0 0 1 218 136H22A10 10 0 0 1 12 126V24A10 10 0 0 1 22 14Z" },
    { d: "M12 34H228", kind: "faint" },
    { d: "M28 46H112A6 6 0 0 1 118 52V104A6 6 0 0 1 112 110H28A6 6 0 0 1 22 104V52A6 6 0 0 1 28 46Z" },
    { d: "M128 46H212A6 6 0 0 1 218 52V104A6 6 0 0 1 212 110H128A6 6 0 0 1 122 104V52A6 6 0 0 1 128 46Z", kind: "accent" },
    { d: "M70 70A9 9 0 1 0 70.01 70", kind: "strong" },
    { d: "M52 104C54 92 60 86 70 86C80 86 86 92 88 104", kind: "strong" },
    { d: "M170 70A9 9 0 1 0 170.01 70", kind: "strong" },
    { d: "M152 104C154 92 160 86 170 86C180 86 186 92 188 104", kind: "strong" },
    { d: "M103 123A5 5 0 1 0 103.01 123" },
    { d: "M121 123A5 5 0 1 0 121.01 123" },
    { d: "M137 123A5 5 0 1 0 137.01 123" },
    { d: "M210 24A6 6 0 1 0 210.01 24", kind: "faint" },
    { d: "M210 20V24L213 26", kind: "faint" },
  ],
  // Scope and fixed price — the document, the figure, the signature.
  scope: [
    { d: "M66 6H158L180 28V140A6 6 0 0 1 174 146H66A6 6 0 0 1 60 140V12A6 6 0 0 1 66 6Z" },
    { d: "M158 6V28H180", kind: "faint" },
    { d: "M74 22H130", kind: "strong" },
    { d: "M74 42L78 46L85 38", kind: "accent" },
    { d: "M92 42H160" },
    { d: "M74 56L78 60L85 52", kind: "accent" },
    { d: "M92 56H150" },
    { d: "M74 70L78 74L85 66", kind: "accent" },
    { d: "M92 70H156" },
    { d: "M74 84H82", kind: "faint" },
    { d: "M92 84H138", kind: "faint" },
    { d: "M74 100H166", kind: "faint" },
    { d: "M74 112H104" },
    { d: "M136 112H166", kind: "strong" },
    { d: "M76 134C82 124 86 124 88 130C90 136 94 136 98 126C101 120 104 122 104 128C104 133 110 132 116 126", kind: "strong" },
    { d: "M74 138H126", kind: "faint" },
  ],
  // Built in the open — the preview link, live, and the page filling in.
  build: [
    { d: "M22 14H218A10 10 0 0 1 228 24V126A10 10 0 0 1 218 136H22A10 10 0 0 1 12 126V24A10 10 0 0 1 22 14Z" },
    { d: "M12 38H228", kind: "faint" },
    { d: "M56 20H184A6 6 0 0 1 190 26V26A6 6 0 0 1 184 32H56A6 6 0 0 1 50 26V26A6 6 0 0 1 56 20Z" },
    { d: "M70 26H150", kind: "faint" },
    { d: "M60 26A3.2 3.2 0 1 0 60.01 26", kind: "accent" },
    { d: "M28 52H132", kind: "strong" },
    { d: "M28 64H116" },
    { d: "M28 74H104" },
    { d: "M28 88H70A4 4 0 0 1 74 92V96A4 4 0 0 1 70 100H28A4 4 0 0 1 24 96V92A4 4 0 0 1 28 88Z", kind: "accent" },
    { d: "M148 50H206A4 4 0 0 1 210 54V100A4 4 0 0 1 206 104H148A4 4 0 0 1 144 100V54A4 4 0 0 1 148 50Z" },
    { d: "M150 96L166 78L178 90L188 80L204 96", kind: "faint" },
    { d: "M28 116H96", kind: "faint" },
    { d: "M108 116H210", kind: "faint" },
  ],
  // Launch and handover — the keys, and what they open: code, hosting, domain.
  handover: [
    { d: "M38 52A20 20 0 1 0 78 52A20 20 0 1 0 38 52", kind: "strong" },
    { d: "M50 52A8 8 0 1 0 66 52A8 8 0 1 0 50 52", kind: "accent" },
    { d: "M78 52H176", kind: "strong" },
    { d: "M150 52V64", kind: "strong" },
    { d: "M162 52V60", kind: "strong" },
    { d: "M176 52V66", kind: "strong" },
    { d: "M58 72V92H200V100", kind: "faint" },
    { d: "M58 92V100", kind: "faint" },
    { d: "M129 92V100", kind: "faint" },
    { d: "M36 100H80A6 6 0 0 1 86 106V132A6 6 0 0 1 80 138H36A6 6 0 0 1 30 132V106A6 6 0 0 1 36 100Z" },
    { d: "M52 112L45 119L52 126M64 112L71 119L64 126" },
    { d: "M107 100H151A6 6 0 0 1 157 106V132A6 6 0 0 1 151 138H107A6 6 0 0 1 101 132V106A6 6 0 0 1 107 100Z" },
    { d: "M115 110H143V117H115ZM115 121H143V128H115Z" },
    { d: "M178 100H222A6 6 0 0 1 228 106V132A6 6 0 0 1 222 138H178A6 6 0 0 1 172 132V106A6 6 0 0 1 178 100Z" },
    { d: "M200 107A12 12 0 1 0 200.01 107M188 119H212M200 107C194 112 194 126 200 131C206 126 206 112 200 107" },
  ],
};

export function ProcessArt({ id }: { id: string }) {
  const strokes = ART[id];
  if (!strokes) return null;
  return (
    <svg
      className="process-art"
      viewBox="0 0 240 150"
      aria-hidden="true"
      focusable="false"
    >
      {strokes.map((s, i) => (
        <path
          key={i}
          d={s.d}
          pathLength={1}
          className={`process-art__stroke${s.kind ? ` process-art__stroke--${s.kind}` : ""}`}
          style={{ "--i": i } as CSSProperties}
        />
      ))}
    </svg>
  );
}
