import { ZONE_BY_ID, type ZoneId } from "@/lib/depth";
import { ZoneInner } from "./DepthZone";

/**
 * The boundary between two bands.
 *
 * A hairline and a depth readout. The readout is a measurement — it encodes
 * where you are in the descent, which is real information — and is therefore
 * not a decorative section counter. It is deliberately NOT an eyebrow: it
 * belongs to the threshold, spatially separate from any heading below it.
 *
 * Zone names ("Shallows", "Abyss") are internal vocabulary and never render.
 * Putting them on screen would turn a structure into a theme.
 */
export function ZoneThreshold({ zone }: { zone: ZoneId }) {
  const config = ZONE_BY_ID[zone];

  return (
    <ZoneInner>
      <div
        className="flex items-center gap-5 pb-16 sm:pb-24"
        style={{ borderTop: "1px solid var(--zone-line)" }}
      >
        <span
          aria-hidden="true"
          className="mt-5 block h-px w-10 shrink-0"
          style={{ backgroundColor: "var(--zone-line-strong)" }}
        />
        <span
          className="mt-4 text-label uppercase opacity-55"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {config.readout}
        </span>
      </div>
    </ZoneInner>
  );
}
