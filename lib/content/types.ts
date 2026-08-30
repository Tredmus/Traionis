/**
 * Shape of every user-facing string on the site.
 *
 * Nothing is hardcoded in JSX. Bulgarian is added by filling in `bg.ts`;
 * anything not yet translated falls back to English automatically, so the
 * site is never half-broken mid-translation.
 *
 * COPY RULE — enforced by review, not by types:
 * no nautical vocabulary anywhere. No "dive", "deep dive", "go deeper",
 * "surface-level", "navigate", "waters", "current". The descent lives
 * entirely in the visual system. The moment copy names it, the structure
 * becomes a theme, and a theme reads as whimsy to a buyer spending €15k.
 */

export type Locale = "en" | "bg";

export const LOCALES: readonly Locale[] = ["en", "bg"] as const;
export const DEFAULT_LOCALE: Locale = "en";

export interface NavCopy {
  work: string;
  about: string;
  contact: string;
  /** Persistent escape hatch — a ready buyer should never have to scroll. */
  cta: string;
  skipToContent: string;
  localeLabel: string;
}

export interface HeroCopy {
  /**
   * Brand mark — lives in the header from the first pixel.
   * Proper name, not translated. Kept on hero for shared access.
   */
  brand: string;
  /** Value question — the outcome the buyer wants. */
  headline: string;
  /**
   * What they get + the structure claim. Must contain, verbatim and crawlable:
   * "web development and digital automation agency based in Varna, Bulgaria"
   */
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  /** Scroll cue into the next band. Neutral — never names the descent. */
  ctaContinue: string;
}

export interface ProblemEvidenceCopy {
  /** What proves the claim above. Never a testimonial, never a metric. */
  body: string;
  /** Omitted when the proof is this page itself and there is nowhere to go. */
  href?: string;
  linkLabel?: string;
}

export interface ProblemCopy {
  id: string;
  /** Framed as a problem the buyer has, never as a service we sell. */
  title: string;
  body: string;
  /**
   * What the framing above translates into. Specification lines, not feature
   * bullets: each one has to be a thing a buyer could hold us to.
   */
  builds: readonly string[];
  evidence: ProblemEvidenceCopy;
}

export interface OfferingsCopy {
  heading: string;
  intro: string;
  /** Labels the deliverable list. Sits below the body — never above a heading. */
  buildsLabel: string;
  evidenceLabel: string;
  problems: readonly ProblemCopy[];
  /**
   * The third case: neither problem is yours. Stated plainly, because
   * filtering the wrong buyer out early is the point of this section.
   */
  filter: string;
}

export interface ProcessStepCopy {
  id: string;
  title: string;
  body: string;
}

export interface ProcessCopy {
  heading: string;
  intro: string;
  steps: readonly ProcessStepCopy[];
}

export interface WorkSectionCopy {
  heading: string;
  intro: string;
  readMore: string;
  viewAll: string;
}

export interface CapabilityCopy {
  id: string;
  title: string;
  body: string;
}

export interface CapabilitiesCopy {
  heading: string;
  intro: string;
  items: readonly CapabilityCopy[];
}

export interface FounderCopy {
  heading: string;
  /** TODO(bio): awaiting Miroslav's chosen direction. */
  name: string;
  role: string;
  body: readonly string[];
}

export interface BudgetOptionCopy {
  value: string;
  label: string;
}

export interface ContactCopy {
  heading: string;
  intro: string;
  fields: {
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    company: { label: string; placeholder: string; optional: string };
    project: { label: string; placeholder: string; help: string };
    timeline: { label: string; placeholder: string };
    budget: { label: string; help: string; options: readonly BudgetOptionCopy[] };
  };
  submit: string;
  submitting: string;
  success: string;
  errorRequired: string;
  errorEmail: string;
  /** The filtering line. Honest, not defensive. */
  exclusionsHeading: string;
  exclusions: string;
}

export interface FooterCopy {
  /** Second placement of the crawlable phrase. */
  description: string;
  location: string;
  rights: string;
  columns: readonly { heading: string; links: readonly { label: string; href: string }[] }[];
}

export interface MetaCopy {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}

export interface SiteCopy {
  meta: MetaCopy;
  nav: NavCopy;
  hero: HeroCopy;
  offerings: OfferingsCopy;
  process: ProcessCopy;
  work: WorkSectionCopy;
  capabilities: CapabilitiesCopy;
  founder: FounderCopy;
  contact: ContactCopy;
  footer: FooterCopy;
}

/** Arrays are replaced wholesale, never merged element-wise. */
export type DeepPartial<T> = T extends readonly unknown[]
  ? T
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;
