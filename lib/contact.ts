/**
 * The project brief submission.
 *
 * There is no backend, no database and no API route — a deliberate constraint.
 * The brief therefore POSTs to a third-party form endpoint, which is the one
 * constraint the client chose to reverse in order to keep the submit inside
 * the page. The endpoint URL is public by nature (it accepts anonymous POSTs),
 * so it lives in a `NEXT_PUBLIC_` variable rather than a secret.
 *
 * If the variable is unset the form refuses to pretend: the submit is disabled
 * and says so. A form that accepts a brief and silently drops it is the worst
 * bug this site could ship, on a site whose entire argument is craft.
 */

/** Set in the deploy environment. See `.env.example`. */
export const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "";

export const CONTACT_CONFIGURED = CONTACT_ENDPOINT.length > 0;

/**
 * Direct lines, beside the form. Both optional: each one renders only once it
 * is set, so the page never shows an address or a link that goes nowhere.
 */
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";
/** A booking page for the discovery call (e.g. a Cal.com event link). */
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "";

/** Three fields, on purpose: a short form gets sent; a long one gets closed. */
export interface ContactBrief {
  name: string;
  email: string;
  project: string;
}

/**
 * Deliberately permissive. The purpose is to catch a typo before the visitor
 * loses the brief they just wrote, not to adjudicate RFC 5322 — over-strict
 * client-side email rules reject real addresses and the server sees it anyway.
 */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export async function sendBrief(brief: ContactBrief): Promise<void> {
  if (!CONTACT_CONFIGURED) {
    throw new Error("Contact endpoint is not configured.");
  }

  const response = await fetch(CONTACT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Form services return an HTML redirect without this, which a fetch
      // cannot act on. Asking for JSON keeps the visitor on the page.
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: brief.name,
      email: brief.email,
      project: brief.project,
      // Most form services read this to set the reply-to address, so hitting
      // reply in the inbox answers the person rather than the service.
      _replyto: brief.email,
      _subject: `Project brief — ${brief.name}`,
      // FormSubmit: a readable table in the inbox, and no captcha page (its
      // AJAX endpoint cannot show one anyway). Other services ignore these.
      _template: "table",
      _captcha: "false",
    }),
  });

  if (!response.ok) {
    throw new Error(`Form endpoint returned ${response.status}`);
  }

  // Some services (FormSubmit among them) answer 200 with a failure in the
  // body — e.g. an endpoint not yet activated. Treat that as a failure, so the
  // visitor is told rather than shown a success that never arrived.
  const data: unknown = await response.json().catch(() => null);
  if (
    data &&
    typeof data === "object" &&
    "success" in data &&
    String((data as { success: unknown }).success) === "false"
  ) {
    throw new Error("Form endpoint refused the submission.");
  }
}
