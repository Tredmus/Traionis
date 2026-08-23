import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";

/**
 * Large, flat, high-contrast rectangles. Radius 5px. No pills, no gradients,
 * no glow, no shadow.
 *
 * Carries the site's single hover pattern: a 1px rule sweeps across the top
 * edge and the label shifts 3px right. Every interactive element on the site
 * uses this same gesture — see HoverLink for the inline-text version.
 */

type Variant = "solid" | "outline";

const BASE =
  "group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-[5px] px-8 text-body font-medium tracking-tight transition-colors duration-300 [transition-timing-function:var(--ease-descent)]";

const VARIANTS: Record<Variant, string> = {
  solid: "bg-accent-hi text-ink hover:bg-[#0e8fb8]",
  outline: "bg-transparent hover:bg-[color-mix(in_srgb,var(--zone-ink)_7%,transparent)]",
};

function Inner({ children }: { children: ReactNode }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-current opacity-40 transition-transform duration-[280ms] [transition-timing-function:var(--ease-descent)] group-hover:scale-x-100"
      />
      <span className="translate-x-0 transition-transform duration-[280ms] [transition-timing-function:var(--ease-descent)] group-hover:translate-x-[3px]">
        {children}
      </span>
    </>
  );
}

interface ButtonLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: Variant;
  children: ReactNode;
}

export function ButtonLink({
  variant = "solid",
  className = "",
  children,
  ...rest
}: ButtonLinkProps) {
  const outlineStyle =
    variant === "outline" ? { border: "1px solid var(--zone-line-strong)" } : undefined;

  return (
    <Link
      {...rest}
      style={{ ...outlineStyle, ...rest.style }}
      className={`${BASE} ${VARIANTS[variant]} ${className}`.trim()}
    >
      <Inner>{children}</Inner>
    </Link>
  );
}

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({
  variant = "solid",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const outlineStyle =
    variant === "outline" ? { border: "1px solid var(--zone-line-strong)" } : undefined;

  return (
    <button
      {...rest}
      style={{ ...outlineStyle, ...rest.style }}
      className={`${BASE} ${VARIANTS[variant]} disabled:cursor-not-allowed disabled:opacity-45 ${className}`.trim()}
    >
      <Inner>{children}</Inner>
    </button>
  );
}
