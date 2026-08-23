"use client";

import { LOCALES, type Locale } from "@/lib/content";
import { useLocale } from "@/lib/locale-context";

const LABELS: Record<Locale, string> = { en: "EN", bg: "BG" };

/**
 * Manual language switch. Bulgarian is stubbed — untranslated strings fall
 * back to English, so switching never produces a broken page.
 */
export function LocaleToggle() {
  const { locale, setLocale, copy } = useLocale();

  return (
    <div
      role="group"
      aria-label={copy.nav.localeLabel}
      className="flex items-center rounded-[5px]"
      style={{ border: "1px solid var(--zone-line-strong)" }}
    >
      {LOCALES.map((option) => {
        const active = option === locale;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLocale(option)}
            aria-pressed={active}
            className="px-2.5 py-1.5 text-label uppercase transition-opacity duration-300 [transition-timing-function:var(--ease-descent)]"
            style={{
              backgroundColor: active
                ? "color-mix(in srgb, var(--zone-ink) 12%, transparent)"
                : "transparent",
              opacity: active ? 1 : 0.55,
            }}
          >
            {LABELS[option]}
          </button>
        );
      })}
    </div>
  );
}
