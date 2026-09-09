/**
 * Case studies.
 *
 * EVIDENCE RULES — these are load-bearing, not stylistic:
 *  - No invented clients, logos, testimonials, metrics, or outcomes.
 *  - Anything not yet supplied is TODO, never filled with something plausible.
 *  - `status` decides how a project is labelled. A build that no client ever
 *    adopted is never described as client work.
 *
 * This list is the gallery's content layer. Adding a project here adds a plate
 * to the descent — no layout work, no component surgery. The homepage shows
 * every entry with `inColumn`, in this order, at the depth each one declares.
 */

export type ProjectStatus =
  | "client"
  | "self-initiated"
  | "unadopted"
  /** Built, shipped, commercial arrangement not yet confirmed by Miroslav. */
  | "unconfirmed";

export interface CaseDecision {
  title: string;
  body: string;
}

/** A real capture of the real thing. Never a mock-up, never a rendering. */
export interface ProjectShot {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  /** One line. What it is, for whom. */
  summary: string;
  /**
   * What this build honestly proves — different for each one, and the reason
   * a three-item gallery is not three of the same thing. Kept short enough to
   * read in the beam.
   */
  proves: string;
  status: ProjectStatus;
  /** Rendered label. Must match reality exactly. */
  statusLabel: string;
  year: string | null;
  stack: readonly string[];
  /** Public URL, when the thing is actually live and linkable. */
  live: { href: string; label: string } | null;
  shot: ProjectShot | null;
  /** Position in the water column. A measurement, like every readout here. */
  depth: string;
  /**
   * How much ambient light still reaches this plate, 0–1. Deeper plates sit
   * closer to invisible until the lamp finds them — the same physics the
   * atmosphere already runs on, applied to the evidence.
   */
  ambient: number;
  /** Shown on the homepage gallery. */
  inColumn: boolean;
  /** Whether `/work/<slug>` has a real breakdown behind it. */
  caseStudy: boolean;
  /** The problem → decisions → what it does now structure. */
  problem: readonly string[];
  decisions: readonly CaseDecision[];
  outcome: readonly string[];
  /** TODO slots. Rendered only when populated — never as empty scaffolding. */
  metrics: readonly { label: string; value: string }[];
}

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: "orvyx",
    name: "Orvyx",
    summary:
      "The product site for LifePod 72 — a sealed hard case built to keep someone alive for 72 hours.",
    // Confirmed by Miroslav: nothing about this build was technically hard.
    // It must never be written up as an engineering case study, and it carries
    // no invented decisions, constraints, or difficulty.
    proves:
      "Paid client work, shipped and live. Small scope, fast turnaround, the client's own brand held intact.",
    status: "client",
    statusLabel: "Client project — live",
    year: null, // TODO(year): confirm the delivery date.
    stack: [],
    live: { href: "https://orvyx.tech/", label: "orvyx.tech" },
    shot: {
      src: "/work/orvyx-lifepod.webp",
      width: 1400,
      height: 641,
      alt: "The Orvyx site: “Seventy-two hours of autonomy” set over the LifePod 72 hard case, with a spec row reading 8 modules, IP67 sealed, 72h autonomy.",
    },
    depth: "−224m",
    ambient: 0.58,
    inColumn: true,
    // Deliberately no breakdown page. There is no engineering story to tell
    // here, and inventing one would be the exact failure this file guards.
    caseStudy: false,
    problem: [],
    decisions: [],
    outcome: [],
    metrics: [],
  },
  {
    slug: "parkqui",
    name: "ParkQui",
    summary:
      "A full-stack parking marketplace built for a 2,000-member community in Bulgaria.",
    proves:
      "The engineering one. Roles and permissions, geospatial search, and the admin side that makes a marketplace usable.",
    // TODO(status): confirm whether ParkQui was a paid client engagement or
    // self-initiated. Until confirmed, the label below claims nothing.
    status: "self-initiated",
    statusLabel: "Full-stack build",
    year: null, // TODO(year)
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Interactive maps", "Auth"],
    live: { href: "https://park-qui.vercel.app/", label: "park-qui.vercel.app" },
    shot: {
      src: "/work/parkqui.webp",
      width: 1400,
      height: 641,
      alt: "The ParkQui site: a deep blue marketplace landing page in Bulgarian, with search and listing actions.",
    },
    depth: "−468m",
    ambient: 0.44,
    inColumn: true,
    caseStudy: true,
    problem: [
      "A 2,000-member community was matching parking spaces to drivers by hand, in a group chat. Listings went stale, the same space got promised twice, and there was no way to see what was actually free near you.",
      // TODO(problem): confirm this framing with Miroslav — who asked for it,
      // what specifically was breaking, and what they had tried before.
    ],
    decisions: [
      {
        title: "Listings and availability modelled separately",
        body: "TODO(decision): why availability was split from the listing record, and what that made possible later. This is the kind of detail that proves engineering rather than assembly.",
      },
      {
        title: "Map search backed by real geospatial queries",
        body: "TODO(decision): how map search and filtering were implemented, and what the alternative would have cost in responsiveness.",
      },
      {
        title: "Roles and permissions for owners, drivers and admins",
        body: "TODO(decision): how the three roles were separated, and what moderation the admin dashboard needed to make the marketplace usable day to day.",
      },
    ],
    outcome: [
      "TODO(outcome): what it does now — live, in use, parked, or handed over. State only what is true.",
    ],
    metrics: [
      // TODO(metrics): leave empty unless real numbers exist. An empty array
      // renders nothing, which is correct. Do not invent percentages.
    ],
  },
  {
    slug: "popwrists",
    name: "PopWrists",
    // Both lines below are descriptions of what the live page itself says and
    // shows. Nothing here claims a client, a fee, or an outcome.
    summary:
      "A launch and waitlist site for an unofficial wrist adapter for the AP × Swatch Royal Pop.",
    proves:
      "A product launch page carried entirely by type and colour, with the waitlist as its single action.",
    // TODO(status): Miroslav to confirm what PopWrists actually is — client
    // work, self-initiated, or a test — and whether it stays in the gallery.
    // It is standing in for Morion Stones, whose link and code are lost.
    status: "unconfirmed",
    statusLabel: "Product site",
    year: null,
    stack: [],
    live: { href: "https://popwrists.vercel.app/", label: "popwrists.vercel.app" },
    shot: {
      src: "/work/popwrists.webp",
      width: 1400,
      height: 641,
      alt: "The PopWrists site: oversized black and gradient type on a warm off-white ground, above a waitlist field.",
    },
    depth: "−710m",
    ambient: 0.34,
    inColumn: true,
    caseStudy: false,
    problem: [],
    decisions: [],
    outcome: [],
    metrics: [],
  },
  // Morion Stones — built, never adopted. Its link and source are lost, so it
  // is not published rather than published without evidence. Restore it here
  // if either turns up; the gallery takes it without a layout change.
];

/** The homepage column, in declared order. */
export const COLUMN_PROJECTS = CASE_STUDIES.filter((project) => project.inColumn);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((project) => project.slug === slug);
}

/** Only projects with a real breakdown get a route. */
export function caseStudySlugs(): string[] {
  return CASE_STUDIES.filter((project) => project.caseStudy).map(
    (project) => project.slug,
  );
}
