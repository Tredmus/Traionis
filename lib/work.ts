/**
 * Case studies.
 *
 * EVIDENCE RULES — these are load-bearing, not stylistic:
 *  - No invented clients, logos, testimonials, metrics, or outcomes.
 *  - Anything not yet supplied is TODO, never filled with something plausible.
 *  - `status` decides how a project is labelled. A build that no client ever
 *    adopted is never described as client work.
 *
 * Orvyx is deliberately absent. It is an unstarted ~€350 engagement, not a
 * shipped project, and cannot appear as evidence until it exists.
 */

export type ProjectStatus = "client" | "self-initiated" | "unadopted";

export interface CaseDecision {
  title: string;
  body: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  /** One line. What it is, for whom. */
  summary: string;
  status: ProjectStatus;
  /** Rendered label. Must match reality exactly. */
  statusLabel: string;
  year: string | null;
  stack: readonly string[];
  /** Exactly one project carries the homepage zone. */
  featured: boolean;
  /** The problem → decisions → what it does now structure. */
  problem: readonly string[];
  decisions: readonly CaseDecision[];
  outcome: readonly string[];
  /** TODO slots. Rendered only when populated — never as empty scaffolding. */
  metrics: readonly { label: string; value: string }[];
}

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: "parkqui",
    name: "ParkQui",
    summary:
      "A full-stack parking marketplace built for a 2,000-member community in Bulgaria.",
    // TODO(status): confirm whether ParkQui was a paid client engagement or
    // self-initiated. Until confirmed, the label below claims nothing.
    status: "self-initiated",
    statusLabel: "Full-stack build",
    year: null, // TODO(year)
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Interactive maps", "Auth"],
    featured: true,
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
    slug: "morion-stones",
    name: "Morion Stones",
    summary: "TODO(summary): what Morion Stones is and what it was built to do.",
    status: "unadopted",
    statusLabel: "Built, never launched",
    year: null,
    stack: [], // TODO(stack)
    featured: false,
    problem: [
      "TODO(problem): what the build set out to solve.",
    ],
    decisions: [],
    outcome: [
      "Built and finished, but never adopted by the client it was made for. It is shown here as a build, not as a result.",
    ],
    metrics: [],
  },
];

export const FEATURED_CASE_STUDY =
  CASE_STUDIES.find((project) => project.featured) ?? CASE_STUDIES[0];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((project) => project.slug === slug);
}

export function caseStudySlugs(): string[] {
  return CASE_STUDIES.map((project) => project.slug);
}
