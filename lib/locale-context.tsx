"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";

import { resolveCopy, type Locale, type SiteCopy } from "./content";
import { localeFromPath } from "./links";

interface LocaleContextValue {
  locale: Locale;
  copy: SiteCopy;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * The language is the address: `/` is English, `/bg` is Bulgarian. It is read
 * from the path during the server render, so each page's HTML — what Google
 * indexes — is already in its own language. Switching language is a link to
 * the other page, never a client-side swap.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = localeFromPath(usePathname());

  // The root layout renders `lang="en"`; the Bulgarian page corrects it on
  // load. Search engines read hreflang and the content itself for language.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, copy: resolveCopy(locale) }),
    [locale],
  );

  // `data-locale` lets the Bulgarian page lead its font stacks with the
  // Cyrillic faces (see globals.css). `display: contents` keeps it out of
  // layout; custom properties still inherit through it.
  return (
    <LocaleContext.Provider value={value}>
      <div data-locale={locale} className="contents">
        {children}
      </div>
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}

/** Convenience for components that only need strings. */
export function useCopy(): SiteCopy {
  return useLocale().copy;
}
