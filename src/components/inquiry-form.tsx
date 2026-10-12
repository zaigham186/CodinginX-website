"use client";

import { Arrow } from "@/components/ui";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { siteConfig } from "@/config/siteConfig";
import {
  budgetOptions,
  contactSchema,
  serviceOptions,
  stageOptions,
  timelineOptions,
} from "@/lib/validation";
import { trackEvent } from "./analytics";

const formSchema = contactSchema.omit({ submissionId: true }).extend({
  privacy: z
    .boolean()
    .refine(Boolean, "Please acknowledge the privacy notice."),
});
type FormValues = z.input<typeof formSchema>;
type FormResult = z.output<typeof formSchema>;
type Status = {
  kind: "error" | "success";
  message: string;
  reference?: string;
} | null;

export function InquiryForm({
  initialService,
  initialProject,
}: {
  initialService?: (typeof serviceOptions)[number];
  initialProject?: "lead" | "operations";
}) {
  const initialDetails =
    initialProject === "lead"
      ? "I'd like to discuss a lead intake or automation workflow. "
      : initialProject === "operations"
        ? "I'd like to discuss a service operations workflow. "
        : "";
  const defaults = {
    name: "",
    email: "",
    company: "",
    website: "",
    service: initialService,
    details: initialDetails,
    privacy: false,
    websiteTrap: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues, unknown, FormResult>({
    resolver: zodResolver(formSchema),
    defaultValues: defaults,
    mode: "onTouched",
  });
  const [status, setStatus] = useState<Status>(null);
  const [pending, setPending] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);
  const submitLock = useRef(false);
  const started = useRef(false);
  const attempt = useRef<{ fingerprint: string; id: string } | null>(null);
  const request = useRef<AbortController | null>(null);

  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => {
    if (status) messageRef.current?.focus();
  }, [status]);

  async function submit(values: FormResult) {
    if (submitLock.current) return;
    submitLock.current = true;
    setPending(true);
    setStatus(null);
    const fingerprint = JSON.stringify(values);
    if (attempt.current?.fingerprint !== fingerprint)
      attempt.current = { fingerprint, id: crypto.randomUUID() };
    const controller = new AbortController();
    request.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 45_000);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        signal: controller.signal,
        body: JSON.stringify({ ...values, submissionId: attempt.current.id }),
      });
      const result: unknown = await response.json().catch(() => null);
      const data =
        result && typeof result === "object"
          ? (result as Record<string, unknown>)
          : {};
      if (!response.ok || data.ok !== true) {
        if (data.fieldErrors && typeof data.fieldErrors === "object") {
          for (const [field, value] of Object.entries(data.fieldErrors)) {
            if (field in formSchema.shape && typeof value === "string")
              setError(field as keyof FormValues, { message: value });
          }
        }
        setStatus({
          kind: "error",
          message:
            typeof data.message === "string"
              ? data.message.slice(0, 500)
              : "We could not send your inquiry. Your details are still here. Please try again or email us directly.",
          reference:
            typeof data.requestId === "string" ? data.requestId : undefined,
        });
        return;
      }
      trackEvent("form_submitted", { source: "contact" });
      setStatus({
        kind: "success",
        message:
          data.acknowledgement === "sent"
            ? "Your inquiry was accepted for delivery to CodinginX. A confirmation email was also accepted for delivery."
            : "Your inquiry was accepted for delivery to CodinginX. We could not confirm the acknowledgement email.",
        reference:
          typeof data.requestId === "string" ? data.requestId : undefined,
      });
    } catch {
      setStatus({
        kind: "error",
        message: controller.signal.aborted
          ? "The request timed out, so we could not confirm delivery. Your details are still here. Retry with the same details to safely check this inquiry, or email us directly."
          : "We could not reach the inquiry service. Your details are still here. Check your connection and try again, or email us directly.",
      });
    } finally {
      window.clearTimeout(timeout);
      request.current = null;
      submitLock.current = false;
      setPending(false);
    }
  }

  function fieldError(field: keyof FormValues) {
    const error = errors[field];
    if (!error) return null;
    const message = ["service", "stage", "budget", "timeline"].includes(field)
      ? "Choose an option to continue."
      : error.message;
    return (
      <span id={`${field}-error`} className="field-error">
        {message}
      </span>
    );
  }
  function fieldProps(field: keyof FormValues) {
    return {
      "aria-invalid": !!errors[field],
      "aria-describedby": errors[field] ? `${field}-error` : undefined,
    };
  }
  const busy = pending || isSubmitting;

  return (
    <div className="inquiry-form">
      {status && (
        <div
          ref={messageRef}
          tabIndex={-1}
          className={`form-message form-message-${status.kind}`}
          role={status.kind === "error" ? "alert" : "status"}
        >
          <h2>
            {status.kind === "success"
              ? "Inquiry submitted."
              : "Your inquiry needs another step."}
          </h2>
          <p>{status.message}</p>
          {status.kind === "error" && (
            <p>
              <a href={`mailto:${siteConfig.emails.general}`}>
                Email {siteConfig.emails.general}
              </a>
            </p>
          )}
          {status.reference && (
            <p className="form-reference">Reference: {status.reference}</p>
          )}
          {status.kind === "success" && (
            <button
              type="button"
              className="button button-secondary"
              onClick={() => {
                reset(defaults);
                setStatus(null);
                attempt.current = null;
                started.current = false;
              }}
            >
              Start another inquiry
            </button>
          )}
        </div>
      )}
      {status?.kind !== "success" && (
        <form
          noValidate
          onSubmit={(event) => {
            void handleSubmit(submit)(event);
          }}
          onFocusCapture={() => {
            if (!started.current) {
              started.current = true;
              trackEvent("form_started", { source: "contact" });
            }
          }}
        >
          <p className="form-intro">
            All fields are required unless marked optional. An early idea is
            enough to begin.
          </p>
          <fieldset disabled={busy} className="form-fieldset">
            <legend className="sr-only">Project inquiry</legend>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="name">Your name</label>
                <input
                  id="name"
                  autoComplete="name"
                  maxLength={100}
                  {...register("name")}
                  {...fieldProps("name")}
                />
                {fieldError("name")}
              </div>
              <div className="form-field">
                <label htmlFor="email">Work email</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  {...register("email")}
                  {...fieldProps("email")}
                />
                {fieldError("email")}
              </div>
              <div className="form-field">
                <label htmlFor="company">Company or startup</label>
                <input
                  id="company"
                  autoComplete="organization"
                  maxLength={150}
                  {...register("company")}
                  {...fieldProps("company")}
                />
                <span className="field-hint">
                  Still at the idea stage? Tell us the working name.
                </span>
                {fieldError("company")}
              </div>
              <div className="form-field">
                <label htmlFor="website">
                  Website <span>(optional)</span>
                </label>
                <input
                  id="website"
                  type="url"
                  autoComplete="url"
                  placeholder="https://"
                  maxLength={300}
                  {...register("website")}
                  {...fieldProps("website")}
                />
                {fieldError("website")}
              </div>
              {(
                [
                  ["service", "What do you need built?", serviceOptions],
                  ["stage", "Project stage", stageOptions],
                  ["budget", "Approximate budget", budgetOptions],
                  ["timeline", "Desired timeline", timelineOptions],
                ] as const
              ).map(([field, label, options]) => (
                <div key={field} className="form-field">
                  <label htmlFor={field}>{label}</label>
                  <select
                    id={field}
                    {...register(field)}
                    {...fieldProps(field)}
                    defaultValue={
                      field === "service" ? initialService || "" : ""
                    }
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {fieldError(field)}
                </div>
              ))}
              <div className="form-field form-field-full">
                <label htmlFor="details">Tell us about the project</label>
                <textarea
                  id="details"
                  rows={6}
                  maxLength={5000}
                  placeholder="What would you like to build or improve? Who will use it, and what needs to work better?"
                  {...register("details")}
                  {...fieldProps("details")}
                />
                <span className="field-hint">
                  30–5,000 characters. Please leave out passwords, credentials
                  and sensitive personal information.
                </span>
                {fieldError("details")}
              </div>
            </div>
            <div className="form-honeypot" aria-hidden="true">
              <label htmlFor="websiteTrap">Leave this field empty</label>
              <input
                id="websiteTrap"
                tabIndex={-1}
                autoComplete="off"
                {...register("websiteTrap")}
              />
            </div>
            <div className="form-consent">
              <label htmlFor="privacy">
                <input
                  id="privacy"
                  type="checkbox"
                  {...register("privacy")}
                  {...fieldProps("privacy")}
                />
                <span>
                  I have read the <Link href="/privacy">Privacy Policy</Link>{" "}
                  and understand that CodinginX will use these details to
                  respond to my inquiry.
                </span>
              </label>
              {fieldError("privacy")}
            </div>
            <div className="form-submit">
              <button
                type="submit"
                className="button"
                disabled={busy}
                aria-busy={busy}
              >
                {busy ? "Sending your inquiry…" : "Send Project Inquiry"}
                <Arrow />
              </button>
              <span className="field-hint">
                Budget and timing help frame the conversation. They are not a
                quote or commitment.
              </span>
            </div>
          </fieldset>
        </form>
      )}
    </div>
  );
}

export default InquiryForm;
