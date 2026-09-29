"use client";

import { ButtonLink } from "@/components/ui/Button";
import { homePath } from "@/lib/links";
import { useLocale } from "@/lib/locale-context";

/**
 * 404 — the floor, with nothing on it.
 *
 * A sonar keeps pinging from a single point of light and finds nothing to
 * return; the way out is one button back up. Rings are CSS only and stand
 * still under reduced motion.
 */
export function NotFoundView() {
  const { copy, locale } = useLocale();
  const { notFound } = copy;

  return (
    <section className="lost" aria-labelledby="lost-heading">
      <div className="lost__sonar" aria-hidden="true">
        <span className="lost__ring" />
        <span className="lost__ring" />
        <span className="lost__ring" />
        <span className="lost__core" />
      </div>

      <div className="lost__copy">
        <p className="lost__code">404</p>
        <h1 id="lost-heading" className="lost__heading">
          {notFound.heading}
        </h1>
        <p className="lost__body">{notFound.body}</p>
        <ButtonLink href={homePath(locale)} className="mt-10">
          {notFound.cta}
        </ButtonLink>
      </div>
    </section>
  );
}
