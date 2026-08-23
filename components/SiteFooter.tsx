"use client";

import { DepthZone, ZoneInner } from "./depth/DepthZone";
import { HoverLink } from "./ui/HoverLink";
import { useCopy } from "@/lib/locale-context";

/**
 * The floor. Carries the second placement of the crawlable positioning
 * phrase, so it appears on every route rather than only on the homepage.
 */
export function SiteFooter() {
  const copy = useCopy();
  const year = new Date().getFullYear();

  return (
    <DepthZone
      zone="abyss"
      as="footer"
      padding="none"
      atmosphere={false}
      className="py-20 sm:py-24"
    >
      <ZoneInner>
        <div
          className="grid gap-12 pt-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr]"
          style={{ borderTop: "1px solid var(--zone-line)" }}
        >
          <div className="max-w-lg">
            <p
              className="font-display text-[1.05rem] font-bold uppercase tracking-[0.2em]"
              style={{ fontStretch: "125%" }}
            >
              Traionis
            </p>
            <p className="mt-5 text-body opacity-65">{copy.footer.description}</p>
            <p className="mt-6 text-label uppercase opacity-45">{copy.footer.location}</p>
          </div>

          <div className="flex gap-16">
            {copy.footer.columns.map((column) => (
              <div key={column.heading}>
                <p className="text-label uppercase opacity-45">{column.heading}</p>
                <ul className="mt-5 space-y-3 text-body">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <HoverLink href={link.href}>{link.label}</HoverLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-16 text-label uppercase opacity-35">
          © {year} Traionis. {copy.footer.rights}
        </p>
      </ZoneInner>
    </DepthZone>
  );
}
