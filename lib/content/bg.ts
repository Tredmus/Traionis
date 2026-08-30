import type { DeepPartial, SiteCopy } from "./types";

/**
 * Bulgarian — STUB.
 *
 * Anything omitted here falls back to English automatically (see `resolveCopy`),
 * so this file can be filled in incrementally and the site is never broken
 * halfway through a translation pass.
 *
 * Only navigation is populated, to prove the fallback path works end to end.
 * Everything else is TODO. Do not machine-translate the positioning copy —
 * the spine and the exclusions line have to land in Bulgarian on their own
 * terms, not as a literal rendering of the English.
 */
export const bg: DeepPartial<SiteCopy> = {
  nav: {
    work: "Проекти",
    about: "За нас",
    contact: "Контакти",
    cta: "Започнете проект",
    skipToContent: "Към съдържанието",
    localeLabel: "Език",
  },

  // TODO(bg): meta — title and description, written for Bulgarian search, not translated.
  // TODO(bg): hero — headline and lead. The spine must work idiomatically.
  // TODO(bg): offerings — zone label, heading, intro, both diagnostics (questions, labels, titles, bodies, deliverables, proof, disqualifiers).
  // TODO(bg): process — four steps.
  // TODO(bg): work — section heading and intro.
  // TODO(bg): capabilities — five items.
  // TODO(bg): founder — heading and bio, once the English bio is chosen.
  // TODO(bg): contact — all field labels, budget options, and the exclusions line.
  // TODO(bg): footer — description and location.
};
