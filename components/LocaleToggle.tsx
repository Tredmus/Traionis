"use client";

import Link from "next/link";

import { LOCALES, type Locale } from "@/lib/content";
import { homePath } from "@/lib/links";
import { useLocale } from "@/lib/locale-context";

const LABELS: Record<Locale, string> = { en: "EN", bg: "BG" };
const NAMES: Record<Locale, string> = { en: "English", bg: "Български" };

/**
 * Language switch. Each language is its own page, so the switch is two links;
 * the current one is marked, not linked.
 */
export function LocaleToggle() {
  const { locale, copy } = useLocale();

  return (
    <nav
      aria-label={copy.nav.localeLabel}
      className="flex h-8 items-center rounded-[4px] sm:h-7"
      style={{ border: "1px solid var(--zone-line-strong)" }}
    >
      {LOCALES.map((option) => {
        const active = option === locale;
        const className =
          "flex h-full items-center px-[0.45rem] text-[0.6875rem] tracking-[0.12em] uppercase transition-opacity duration-300 [transition-timing-function:var(--ease-descent)]";
        const style = {
          backgroundColor: active
            ? "color-mix(in srgb, var(--zone-ink) 12%, transparent)"
            : "transparent",
          opacity: active ? 1 : 0.55,
        };
        return active ? (
          <span key={option} aria-current="page" lang={option} className={className} style={style}>
            {LABELS[option]}
          </span>
        ) : (
          <Link
            key={option}
            href={homePath(option)}
            hrefLang={option}
            lang={option}
            aria-label={NAMES[option]}
            className={`${className} hover:opacity-100`}
            style={style}
          >
            {LABELS[option]}
          </Link>
        );
      })}
    </nav>
  );
}
