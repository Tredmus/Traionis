/**
 * Shape of every user-facing string on the site.
 *
 * Nothing is hardcoded in JSX. Bulgarian is added by filling in `bg.ts`;
 * anything not yet translated falls back to English automatically, so the
 * site is never half-broken mid-translation.
 *
 * COPY RULE — enforced by review, not by types:
 * no nautical vocabulary anywhere — the only exception is the hero's scroll
 * cue (`hero.ctaContinue`), which literally makes the page dive. No "dive", "deep dive", "go deeper",
 * "surface-level", "navigate", "waters", "current". The descent lives
 * entirely in the visual system. The moment copy names it, the structure
 * becomes a theme, and a theme reads as whimsy to a buyer spending €15k.
 */

export type Locale = "en" | "bg";

export const LOCALES: readonly Locale[] = ["en", "bg"] as const;
export const DEFAULT_LOCALE: Locale = "en";

export interface NavCopy {
  services: string;
  work: string;
  process: string;
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
  /** Small line above the headline — who, where, since when. Crawlable. */
  eyebrow: string;
  /** What the buyer gets — about them, not a slogan about us. */
  headline: string;
  /** What we build. */
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  /** Scroll cue into the next band. The one label allowed to name the descent. */
  ctaContinue: string;
}

/**
 * One capability, attached to a part of the offering's drawing. `anchor` names
 * the part (see components/services) — it is structure, not copy, so a
 * translation changes `text` and leaves `anchor` alone.
 */
export interface CalloutCopy {
  anchor: string;
  text: string;
}

export interface OfferingCopy {
  /** "site" → exploded page drawing; "app" → system diagram. */
  id: "site" | "app";
  /** Framed as an outcome for the buyer, never as a flat service line. */
  title: string;
  body: string;
  /** What the build includes, each pinned to a part of the drawing. */
  callouts: readonly CalloutCopy[];
  /** Proof link to the matching project on the page. */
  proof: { href: string; label: string };
  /** Stated timeline, e.g. "Live in 1–3 weeks". */
  timeline: string;
}

export interface OfferingsCopy {
  heading: string;
  intro: string;
  offerings: readonly OfferingCopy[];
  /** Rebuild line — existing sites are rebuilt from the foundations. */
  rebuild: string;
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
  /** Opens the in-place build breakdown under a plate. */
  readMore: string;
  readLess: string;
  breakdown: { problem: string; decisions: string; outcome: string };
  viewAll: string;
  /** Outbound link to a build that is actually live. */
  visitLive: string;
}

export interface FounderCopy {
  heading: string;
  name: string;
  role: string;
  /** The standard, in one sentence. Set large, in the serif. */
  statement: string;
  /** First person singular — the one place the site says "I". */
  body: readonly string[];
  /** Short checkable facts line, e.g. "Est. 2023 · Varna, Bulgaria". */
  facts: string;
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
  /** Closing line under the list, linking to the brief. */
  more: { prompt: string; link: string };
}

export interface ContactCopy {
  heading: string;
  intro: string;
  /**
   * Three fields: name, email, and the project in the visitor's own words.
   * Timeline and company were cut — the placeholder asks for timing, and an
   * email domain usually names the company. Every extra field makes the
   * brief feel like a test, and a test does not get sent.
   *
   * There is no budget field. Confirmed decision: scope is captured in prose
   * and money comes up on the call.
   */
  fields: {
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    project: { label: string; placeholder: string; help: string };
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
  /** Beside the form: what happens after sending, and the direct lines. */
  next: { heading: string; steps: readonly string[] };
  direct: { heading: string; email: string; call: string };
}

export interface FooterCopy {
  /** Second placement of the crawlable phrase. */
  description: string;
  /** Registered company name, e.g. "Traionis EOOD". */
  legalName: string;
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
