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

export interface ProblemCopy {
  id: string;
  /**
   * Diagnostic tab question — the reader self-selects.
   * e.g. "Do you need an application that runs the business?"
   */
  question: string;
  /** Small mono label — "THE OPERATION" / "THE SITE". */
  label: string;
  /** Framed as a problem the buyer has, never as a service we sell. */
  title: string;
  body: string;
  /** Exactly three deliverable lines. */
  deliverables: readonly [string, string, string];
  /** Proof link — destination may be provisional until the case page exists. */
  proof: { href: string; label: string };
  /** Muted one-liner that filters the wrong buyer out. */
  disqualifier: string;
}

export interface OfferingsCopy {
  /** Zone name alone — never a numeric depth reading. */
  zoneLabel: string;
  heading: string;
  intro: string;
  problems: readonly ProblemCopy[];
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
  /** Outbound link to a build that is actually live. */
  visitLive: string;
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

export interface FaqItemCopy {
  id: string;
  question: string;
  /**
   * Empty array = not answered yet, and the item does not render at all.
   * Every answer here is a factual claim about how the studio operates, so an
   * unanswered question waits rather than getting something plausible. Same
   * rule as `lib/work.ts`.
   */
  answer: readonly string[];
}

export interface FaqCopy {
  heading: string;
  intro: string;
  items: readonly FaqItemCopy[];
}

export interface ContactCopy {
  heading: string;
  intro: string;
  /**
   * Declaration order is the render order, and it leads with the work rather
   * than the person. Asking for a name first says "identify yourself"; asking
   * what they are building says "tell me about the work" — and anyone without
   * a project to describe stalls on the first field, which is the filter doing
   * its job without a gate.
   *
   * There is no budget field. Confirmed decision: scope is captured in prose
   * and money comes up on the call. A bracket selector reads as a price gate,
   * and there is no floor for it to enforce.
   */
  fields: {
    project: { label: string; placeholder: string; help: string };
    timeline: { label: string; placeholder: string };
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    company: { label: string; placeholder: string; optional: string };
  };
  submit: string;
  submitting: string;
  successHeading: string;
  success: string;
  errorRequired: string;
  errorEmail: string;
  /** Shown when the form service refuses the POST or the network fails. */
  errorSubmit: string;
  /** Build-time guard. Rendered only when no endpoint is configured. */
  errorUnconfigured: string;
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
  faq: FaqCopy;
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
