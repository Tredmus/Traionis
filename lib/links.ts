import type { Locale } from "@/lib/content";

/**
 * One page per language: English at `/`, Bulgarian at `/bg`. Every in-page
 * link is built from here so a Bulgarian visitor never lands back on the
 * English page by following the menu.
 */
export function homePath(locale: Locale): string {
  return locale === "bg" ? "/bg" : "/";
}

/** A section of the home page in the given language, e.g. `/bg#work`. */
export function sectionHref(locale: Locale, id: string): string {
  return locale === "bg" ? `/bg#${id}` : `/#${id}`;
}

/** The locale a path belongs to. Everything under `/bg` is Bulgarian. */
export function localeFromPath(pathname: string | null): Locale {
  return pathname === "/bg" || pathname?.startsWith("/bg/") ? "bg" : "en";
}
