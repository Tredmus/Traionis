import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * The site's one hover pattern, in its inline form: a 1px accent rule draws
 * left to right beneath the label while the label shifts 3px right.
 *
 * Used for navigation, inline links, case entries and footer links — every
 * text-level interactive element on the site. Nothing else hovers.
 */

const BASE =
  "group relative inline-flex items-center gap-2 pb-1 transition-opacity duration-300 [transition-timing-function:var(--ease-descent)]";

function Inner({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="transition-transform duration-[280ms] [transition-timing-function:var(--ease-descent)] group-hover:translate-x-[3px]">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent-hi transition-transform duration-[280ms] [transition-timing-function:var(--ease-descent)] group-hover:scale-x-100"
      />
    </>
  );
}

export function HoverLink({
  className = "",
  children,
  ...rest
}: ComponentPropsWithoutRef<typeof Link> & { children: ReactNode }) {
  return (
    <Link {...rest} className={`${BASE} ${className}`.trim()}>
      <Inner>{children}</Inner>
    </Link>
  );
}

export function HoverAnchor({
  className = "",
  children,
  ...rest
}: ComponentPropsWithoutRef<"a"> & { children: ReactNode }) {
  return (
    <a {...rest} className={`${BASE} ${className}`.trim()}>
      <Inner>{children}</Inner>
    </a>
  );
}
