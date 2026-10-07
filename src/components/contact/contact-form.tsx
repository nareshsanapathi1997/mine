"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ENQUIRY_FIELDS,
  emptyEnquiry,
  validateEnquiry,
  type Enquiry,
  type EnquiryField,
  type FieldErrors,
} from "@/lib/enquiry";
import { cn } from "@/lib/cn";

const labels: Record<EnquiryField, string> = {
  name: "Name",
  company: "Company",
  email: "Email",
  phone: "Phone / WhatsApp",
  industry: "Industry",
  need: "What do you need?",
  budget: "Budget",
  message: "Tell us about your workflow.",
};

const hints: Record<EnquiryField, string> = {
  name: "The person we should reply to.",
  company: "Organisation or institution.",
  email: "Where the reply is sent.",
  phone: "A mobile number is enough.",
  industry: "The sector this work is for.",
  need: "The system you want to talk about.",
  budget: "A range is enough.",
  message: "The workflow, the tools you already use, and what a good outcome looks like.",
};

const needOptions = [
  "AI Agent",
  "Voice AI",
  "WhatsApp Automation",
  "Business Automation",
  "Business Software",
  "Website",
  "Mobile App",
  "Cloud & DevOps",
  "Other",
] as const;

export function ContactForm({ defaultNeed = "" }: { defaultNeed?: string }) {
  const formId = useId();
  const successRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef(0);
  const [values, setValues] = useState<Enquiry>(() => emptyEnquiry(defaultNeed));
  const [fax, setFax] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [deliveryNote, setDeliveryNote] = useState<string | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  function update(field: EnquiryField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    const result = validateEnquiry(values);
    if (!result.ok) {
      setErrors(result.errors);
      const first = ENQUIRY_FIELDS.find((field) => result.errors[field]);
      if (first) document.getElementById(`${formId}-${first}`)?.focus();
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, fax, formStartedAt: startedAt.current }),
      });
      const payload = (await response.json()) as {
        ok: boolean;
        delivered?: boolean;
        errors?: FieldErrors;
        message?: string;
      };
      if (!response.ok || !payload.ok) {
        if (payload.errors) {
          setErrors(payload.errors);
          const first = ENQUIRY_FIELDS.find((field) => payload.errors?.[field]);
          if (first) document.getElementById(`${formId}-${first}`)?.focus();
        }
        setFormError(payload.message || "We could not send your enquiry. Please try again.");
        return;
      }
      setDeliveryNote(payload.delivered === false ? (payload.message ?? null) : null);
      setSent(true);
    } catch {
      setFormError("We could not send your enquiry. Please try again, or email us directly.");
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="outline-none">
        <p className="eyebrow text-accent-ink">Enquiry</p>
        <h3 className="text-h3 mt-2 text-ink">{deliveryNote ? "Enquiry received" : "Enquiry sent"}</h3>
        <p className="text-body mt-3 text-muted">
          {deliveryNote ?? "Thank you. We will reply at the email you provided."}
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-6"
          onClick={() => {
            startedAt.current = Date.now();
            setSent(false);
            setDeliveryNote(null);
            setValues(emptyEnquiry(defaultNeed));
            setFax("");
            setErrors({});
          }}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={formError ? `${formId}-form-error` : undefined}>
      <div className="mb-5">
        <h2 className="text-h3 text-ink">Send an enquiry</h2>
        <p className="mt-1 text-small text-muted">
          Name, email, what you need, and the workflow are required.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          name="name"
          required
          label={labels.name}
          hint={hints.name}
          error={errors.name}
          autoComplete="name"
          value={values.name}
          onChange={(value) => update("name", value)}
        />
        <Field
          id={`${formId}-company`}
          name="company"
          label={labels.company}
          hint={hints.company}
          error={errors.company}
          autoComplete="organization"
          value={values.company}
          onChange={(value) => update("company", value)}
        />
        <Field
          id={`${formId}-email`}
          name="email"
          required
          label={labels.email}
          hint={hints.email}
          error={errors.email}
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(value) => update("email", value)}
        />
        <Field
          id={`${formId}-phone`}
          name="phone"
          label={labels.phone}
          hint={hints.phone}
          error={errors.phone}
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(value) => update("phone", value)}
        />
        <SelectField
          id={`${formId}-need`}
          name="need"
          required
          label={labels.need}
          hint={hints.need}
          error={errors.need}
          value={values.need}
          placeholder="Select what you need"
          options={
            values.need && !needOptions.includes(values.need as (typeof needOptions)[number])
              ? [values.need, ...needOptions]
              : needOptions
          }
          onChange={(value) => update("need", value)}
          className="sm:col-span-2"
        />
        <div className="sm:col-span-2">
          <Label htmlFor={`${formId}-message`}>
            {labels.message} <span className="text-danger">*</span>
          </Label>
          <p id={`${formId}-message-hint`} className="mt-1 text-small text-muted">
            {hints.message}
          </p>
          <Textarea
            id={`${formId}-message`}
            name="message"
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? `${formId}-message-error` : `${formId}-message-hint`}
            className="mt-2"
          />
          {errors.message ? (
            <p id={`${formId}-message-error`} className="mt-1.5 text-sm font-medium text-danger">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Fax
          <input
            name="fax"
            tabIndex={-1}
            autoComplete="off"
            value={fax}
            onChange={(event) => setFax(event.target.value)}
          />
        </label>
      </div>

      <p className="mt-5 text-small text-muted">
        We review your requirement and get back to you. By sending this enquiry you agree that we may use these details to reply.{" "}
        <Link href="/privacy" className="inline-flex min-h-11 items-center font-medium text-accent-ink underline decoration-accent-ink/30 underline-offset-4">
          Privacy Policy
        </Link>
      </p>

      {formError ? (
        <p id={`${formId}-form-error`} role="alert" className="mt-3 text-sm font-medium text-danger">
          {formError}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="mt-4 w-full" loading={pending} arrow>
        {pending ? "Sending…" : "Start a Conversation"}
      </Button>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  hint,
  error,
  value,
  onChange,
  type = "text",
  autoComplete,
  className,
  required = false,
}: {
  id: string;
  name: string;
  label: string;
  hint: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  className?: string;
  required?: boolean;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id}>
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </Label>
      <p id={`${id}-hint`} className="mt-1 text-small text-muted">
        {hint}
      </p>
      <Input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        aria-describedby={error ? `${id}-error` : `${id}-hint`}
        className="mt-2"
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  id,
  name,
  label,
  hint,
  error,
  value,
  onChange,
  options,
  placeholder,
  className,
  required = false,
}: {
  id: string;
  name: string;
  label: string;
  hint: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
  className?: string;
  required?: boolean;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id}>
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </Label>
      <p id={`${id}-hint`} className="mt-1 text-small text-muted">
        {hint}
      </p>
      <div className="relative mt-2">
        <select
          id={id}
          name={name}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-required={required || undefined}
          required={required}
          aria-describedby={error ? `${id}-error` : `${id}-hint`}
          className={cn("field h-11 appearance-none bg-surface px-3 pr-10 outline-none", !value && "is-placeholder")}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted" strokeWidth={1.5} aria-hidden />
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
