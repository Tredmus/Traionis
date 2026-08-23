"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { DEFAULT_LOCALE, LOCALES, resolveCopy, type Locale, type SiteCopy } from "./content";

const STORAGE_KEY = "traionis:locale";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  copy: SiteCopy;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return value !== null && (LOCALES as readonly string[]).includes(value);
}

/**
 * Server always renders DEFAULT_LOCALE, so the HTML crawlers receive is
 * English — which is what the site's search performance depends on. A stored
 * Bulgarian preference is applied after hydration.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLocale(stored) && stored !== DEFAULT_LOCALE) setLocaleState(stored);
    } catch {
      // Private mode or blocked storage — English is a fine outcome.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Preference just won't persist. Not worth surfacing.
    }
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, copy: resolveCopy(locale) }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
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
