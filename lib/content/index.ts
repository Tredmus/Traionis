import { bg } from "./bg";
import { en } from "./en";
import { DEFAULT_LOCALE, type DeepPartial, type Locale, type SiteCopy } from "./types";

export * from "./types";
export { en, bg };

const OVERRIDES: Record<Locale, DeepPartial<SiteCopy> | null> = {
  en: null,
  bg,
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Deep-merge an override over the English base.
 *
 * Arrays replace wholesale — a partially translated list would render as a
 * mix of two languages, which is worse than showing the English one.
 */
function merge<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;
  if (!isPlainObject(base) || !isPlainObject(override)) return override as T;

  const out: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) continue;
    out[key] = merge((base as Record<string, unknown>)[key], value);
  }
  return out as T;
}

const CACHE = new Map<Locale, SiteCopy>();

/** Resolved copy for a locale, with English filling any gap. */
export function resolveCopy(locale: Locale = DEFAULT_LOCALE): SiteCopy {
  const cached = CACHE.get(locale);
  if (cached) return cached;

  const resolved = merge(en, OVERRIDES[locale]);
  CACHE.set(locale, resolved);
  return resolved;
}
