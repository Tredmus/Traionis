/**
 * TODO(screenshot): replace with a real ParkQui capture.
 *
 * Built as a product surface, not a decorated rectangle, so the mid-water
 * band is composed against the volume of an actual interface.
 */
export function ParkQuiShot({
  lit = false,
  caption = true,
}: {
  /** Bioluminescent map pin pulse — mid-water specimen entrance. */
  lit?: boolean;
  caption?: boolean;
}) {
  return (
    <figure className="w-full">
      <div
        className="overflow-hidden"
        style={{ borderBottom: "1px solid var(--zone-line)" }}
      >
        <div
          className="flex h-10 items-center justify-between px-4 text-label uppercase tracking-[0.14em]"
          style={{
            borderBottom: "1px solid var(--zone-line)",
            backgroundColor: "#07080c",
          }}
        >
          <span className="font-display font-bold tracking-[0.16em] opacity-80">
            ParkQui
          </span>
          <span className="hidden gap-5 sm:flex">
            <span style={{ color: "var(--color-accent-hi)" }}>Map</span>
            <span className="opacity-40">Listings</span>
            <span className="opacity-40">Admin</span>
          </span>
        </div>

        <div className="grid min-h-[280px] sm:min-h-[360px] lg:min-h-[440px] lg:grid-cols-[minmax(0,1fr)_17rem]">
          <MapPlane lit={lit} />
          <ListingRail />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 text-label uppercase opacity-35">
          TODO — screenshot
        </figcaption>
      )}
    </figure>
  );
}

function MapPlane({ lit }: { lit: boolean }) {
  return (
    <div className="relative min-h-[220px] overflow-hidden" style={{ backgroundColor: "#07080c" }}>
      <svg
        viewBox="0 0 640 420"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="640" height="420" fill="#07080c" />
        <path
          d="M0 310 C 80 292 140 340 220 328 C 320 312 380 360 480 348 C 560 338 610 370 640 358 L 640 420 L 0 420 Z"
          fill="#12151c"
        />
        <path
          d="M0 310 C 80 292 140 340 220 328 C 320 312 380 360 480 348 C 560 338 610 370 640 358"
          fill="none"
          stroke="rgba(242,246,250,0.08)"
          strokeWidth="1"
        />

        <g stroke="rgba(242,246,250,0.16)" strokeWidth="1" fill="none">
          <path d="M40 20 V 300" />
          <path d="M118 0 V 318" />
          <path d="M210 0 V 332" />
          <path d="M302 0 V 320" />
          <path d="M398 0 V 348" />
          <path d="M486 0 V 350" />
          <path d="M574 0 V 360" />
          <path d="M0 62 H 640" />
          <path d="M0 128 H 640" />
          <path d="M0 196 H 640" />
          <path d="M0 258 H 620" />
        </g>

        <g fill="rgba(242,246,250,0.07)" stroke="rgba(242,246,250,0.12)" strokeWidth="1">
          <rect x="52" y="36" width="52" height="72" />
          <rect x="132" y="28" width="64" height="86" />
          <rect x="224" y="40" width="58" height="64" />
          <rect x="316" y="22" width="66" height="92" />
          <rect x="412" y="34" width="54" height="78" />
          <rect x="500" y="18" width="60" height="96" />
          <rect x="58" y="148" width="48" height="36" />
          <rect x="138" y="140" width="70" height="44" />
          <rect x="230" y="152" width="52" height="32" />
          <rect x="324" y="136" width="62" height="48" />
          <rect x="418" y="144" width="48" height="40" />
          <rect x="68" y="214" width="40" height="28" />
          <rect x="146" y="208" width="56" height="34" />
          <rect x="238" y="218" width="44" height="24" />
          <rect x="332" y="204" width="50" height="38" />
        </g>

        <g>
          <rect x="154" y="96" width="8" height="8" fill="rgba(242,246,250,0.45)" />
          <rect x="246" y="168" width="8" height="8" fill="rgba(242,246,250,0.45)" />
          <rect x="428" y="88" width="8" height="8" fill="rgba(242,246,250,0.45)" />
          <rect x="340" y="230" width="8" height="8" fill="rgba(242,246,250,0.45)" />
          <g className={lit ? "specimen-pin-lit" : undefined}>
            <circle cx="516" cy="154" r="14" fill="rgba(18,168,212,0.12)" />
            <circle cx="516" cy="154" r="7" fill="rgba(18,168,212,0.22)" />
            <rect x="512" y="150" width="8" height="8" fill="#12a8d4" />
          </g>
        </g>
      </svg>
    </div>
  );
}

const LISTINGS = [
  { name: "Covered garage", meta: "Residential · 2 min", state: "Free" },
  { name: "Private courtyard", meta: "Mixed use · 6 min", state: "Held" },
  { name: "Open lot", meta: "Office district · 4 min", state: "Free" },
] as const;

function ListingRail() {
  return (
    <ul
      className="flex h-full flex-col border-t lg:border-t-0 lg:border-l"
      style={{
        backgroundColor: "#0a0b0e",
        borderColor: "var(--zone-line)",
      }}
    >
      {LISTINGS.map((item, index) => (
        <li
          key={item.name}
          className="flex flex-1 items-center justify-between gap-4 px-4 py-3.5 lg:border-t-0 lg:py-0"
          style={{
            borderTop: index === 0 ? undefined : "1px solid var(--zone-line)",
            backgroundColor:
              index === 2
                ? "color-mix(in srgb, var(--color-accent-hi) 10%, transparent)"
                : undefined,
          }}
        >
          <div>
            <p className="text-[0.9375rem] font-medium leading-snug">{item.name}</p>
            <p className="mt-1 text-label uppercase opacity-40">{item.meta}</p>
          </div>
          <p
            className="text-label uppercase"
            style={{ opacity: item.state === "Free" ? 0.7 : 0.35 }}
          >
            {item.state}
          </p>
        </li>
      ))}
    </ul>
  );
}
