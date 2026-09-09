"use client";

import { useId, useRef, useState, type ChangeEvent } from "react";

import { Button } from "@/components/ui/Button";
import {
  CONTACT_CONFIGURED,
  isValidEmail,
  sendBrief,
  type ContactBrief,
} from "@/lib/contact";
import { useCopy } from "@/lib/locale-context";

/**
 * The project brief, at −4,000m.
 *
 * No card and no panel: everything on this site is hairlines on flat bands, so
 * a bordered box floating on the abyss would be the one component that did not
 * belong to its own system. The fields are baseline rules in the dark.
 *
 * The light is the section's argument. Above, in the work band, the visitor
 * carries the lamp and sweeps it over evidence that stays dark. Here that
 * inverts — the form is the lit object, and it lights further as it is used:
 * a rule ignites left to right on focus, and burns steady once the field holds
 * something. All of it is CSS `:focus-within` and `:not(:placeholder-shown)`,
 * so it survives JavaScript being off and collapses to plain colour states
 * under `prefers-reduced-motion`.
 *
 * Light goes on the interactive parts only. Headings, labels and body copy
 * stay plain ink — neon type is the cheap version of this idea and would wreck
 * contrast at the exact moment someone is trying to write to you.
 */

type FieldName = keyof ContactBrief;
type Status = "idle" | "sending" | "sent" | "error";

const EMPTY: ContactBrief = {
  project: "",
  timeline: "",
  name: "",
  email: "",
  company: "",
};

/** Company is the only optional field. */
const REQUIRED: readonly FieldName[] = ["project", "timeline", "name", "email"];

interface FieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  help?: string;
  optional?: string;
  multiline?: boolean;
  type?: string;
  autoComplete?: string;
  disabled?: boolean;
}

function Field({
  id,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  help,
  optional,
  multiline,
  type = "text",
  autoComplete,
  disabled,
}: FieldProps) {
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;
  const describedBy =
    [help ? helpId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

  const shared = {
    id,
    name: id,
    value,
    placeholder,
    disabled,
    autoComplete,
    "aria-describedby": describedBy,
    "aria-invalid": error ? (true as const) : undefined,
    className: `abyss-field__control${multiline ? " abyss-field__control--area" : ""}`,
    onBlur,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(event.target.value),
  };

  return (
    <div className="abyss-field" data-invalid={error ? "true" : undefined}>
      <label className="abyss-field__label" htmlFor={id}>
        {label}
        {optional && <span className="abyss-field__optional">{optional}</span>}
      </label>

      <div className="abyss-field__line">
        {multiline ? (
          <textarea {...shared} rows={5} />
        ) : (
          <input {...shared} type={type} />
        )}
      </div>

      {help && (
        <p className="abyss-field__help" id={helpId}>
          {help}
        </p>
      )}
      {error && (
        <p className="abyss-field__error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const copy = useCopy();
  const uid = useId();
  const [brief, setBrief] = useState<ContactBrief>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLParagraphElement>(null);

  const fieldId = (name: FieldName) => `${uid}-${name}`;

  function validate(name: FieldName, value: string): string {
    const trimmed = value.trim();
    if (REQUIRED.includes(name) && !trimmed) return copy.contact.errorRequired;
    if (name === "email" && trimmed && !isValidEmail(trimmed)) {
      return copy.contact.errorEmail;
    }
    return "";
  }

  function update(name: FieldName, value: string) {
    setBrief((current) => ({ ...current, [name]: value }));
    // Clear an existing error as soon as it is fixed, but never introduce one
    // mid-keystroke — validating while someone types is nagging, not helping.
    if (errors[name] && !validate(name, value)) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
  }

  function check(name: FieldName) {
    const message = validate(name, brief[name]);
    setErrors((current) => ({ ...current, [name]: message || undefined }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const found: Partial<Record<FieldName, string>> = {};
    for (const name of REQUIRED) {
      const message = validate(name, brief[name]);
      if (message) found[name] = message;
    }
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Send focus to the first field that needs attention rather than making
      // the visitor hunt for the red line.
      const first = REQUIRED.find((name) => found[name]);
      if (first) document.getElementById(fieldId(first))?.focus();
      return;
    }

    // Filled only by something that cannot see. Report success and send
    // nothing — a bot that learns it failed just tries again.
    if (honeypotRef.current?.value) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      await sendBrief(brief);
      setStatus("sent");
      requestAnimationFrame(() => doneRef.current?.focus());
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="abyss-done" role="status">
        <p
          className="font-display text-display-m font-bold"
          style={{ fontStretch: "112%" }}
          ref={doneRef}
          tabIndex={-1}
        >
          {copy.contact.successHeading}
        </p>
        <p className="mt-6 max-w-[46ch] text-lead opacity-70">
          {copy.contact.success}
        </p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form className="abyss-form" onSubmit={onSubmit} noValidate>
      <Field
        id={fieldId("project")}
        label={copy.contact.fields.project.label}
        placeholder={copy.contact.fields.project.placeholder}
        help={copy.contact.fields.project.help}
        value={brief.project}
        onChange={(value) => update("project", value)}
        onBlur={() => check("project")}
        error={errors.project}
        disabled={sending}
        multiline
      />

      <Field
        id={fieldId("timeline")}
        label={copy.contact.fields.timeline.label}
        placeholder={copy.contact.fields.timeline.placeholder}
        value={brief.timeline}
        onChange={(value) => update("timeline", value)}
        onBlur={() => check("timeline")}
        error={errors.timeline}
        disabled={sending}
      />

      <div className="abyss-form__pair">
        <Field
          id={fieldId("name")}
          label={copy.contact.fields.name.label}
          placeholder={copy.contact.fields.name.placeholder}
          value={brief.name}
          onChange={(value) => update("name", value)}
          onBlur={() => check("name")}
          error={errors.name}
          autoComplete="name"
          disabled={sending}
        />
        <Field
          id={fieldId("email")}
          label={copy.contact.fields.email.label}
          placeholder={copy.contact.fields.email.placeholder}
          value={brief.email}
          onChange={(value) => update("email", value)}
          onBlur={() => check("email")}
          error={errors.email}
          type="email"
          autoComplete="email"
          disabled={sending}
        />
      </div>

      <Field
        id={fieldId("company")}
        label={copy.contact.fields.company.label}
        placeholder={copy.contact.fields.company.placeholder}
        optional={copy.contact.fields.company.optional}
        value={brief.company}
        onChange={(value) => update("company", value)}
        onBlur={() => check("company")}
        autoComplete="organization"
        disabled={sending}
      />

      {/* Not display:none — some bots skip anything hidden that way. */}
      <div className="abyss-form__trap" aria-hidden="true">
        <label htmlFor={`${uid}-gotcha`}>Leave this field empty</label>
        <input id={`${uid}-gotcha`} name="_gotcha" type="text" tabIndex={-1} ref={honeypotRef} />
      </div>

      <div className="abyss-form__send">
        <Button
          type="submit"
          className="abyss-emitter"
          disabled={sending || !CONTACT_CONFIGURED}
        >
          {sending ? copy.contact.submitting : copy.contact.submit}
        </Button>

        {status === "error" && (
          <p className="abyss-field__error" role="alert">
            {copy.contact.errorSubmit}
          </p>
        )}
        {!CONTACT_CONFIGURED && (
          <p className="abyss-field__error">{copy.contact.errorUnconfigured}</p>
        )}
      </div>
    </form>
  );
}
