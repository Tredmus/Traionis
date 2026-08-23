"use client";

import { useCopy } from "@/lib/locale-context";

/** First focusable element on every page. Visible only when focused. */
export function SkipLink() {
  const copy = useCopy();

  return (
    <a
      href="#main"
      className="sr-only rounded-[5px] bg-accent-hi px-5 py-3 text-body font-medium text-ink focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-[60]"
    >
      {copy.nav.skipToContent}
    </a>
  );
}
